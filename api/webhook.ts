import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'FundfySecureWebhook2026';
  const signature = req.headers['x-razorpay-signature'];

  // Verify the webhook signature securely
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (expectedSignature !== signature) {
    console.error('Invalid signature');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // We only care about successful payments
  if (req.body.event === 'payment.captured' || req.body.event === 'payment_link.paid') {
    const payment = req.body.payload.payment.entity;
    const email = payment.email;
    const amount = payment.amount / 100; // Razorpay amounts are in paise
    const paymentId = payment.id;

    console.log(`Webhook received: Successful payment of ${amount} for ${email}`);

    // Initialize Supabase with the Service Role Key for Admin privileges
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://bmemodyjiphvkisbocuq.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      // 1. Check if the frontend already processed this payment
      const { data: existingRegs } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_email', email)
        .order('created_at', { ascending: false })
        .limit(1);
      let existingReg = existingRegs?.[0];

      // If they used a different email on Razorpay, try finding them by phone number
      if (!existingReg && payment.contact) {
        // Get the last 10 digits of the phone number (to ignore country codes like +91)
        const cleanPhone = payment.contact.replace(/\D/g, '').slice(-10);
        if (cleanPhone.length >= 10) {
          const { data: phoneRegs } = await supabase
            .from('registrations')
            .select('*')
            .ilike('user_phone', `%${cleanPhone}%`)
            .order('created_at', { ascending: false })
            .limit(1);
          existingReg = phoneRegs?.[0];
        }
      }

      if (existingReg && existingReg.payment_id && existingReg.payment_id !== 'PENDING' && existingReg.payment_id !== 'unknown_payment_id') {
        console.log(`Payment already processed by frontend for ${email}. Skipping webhook.`);
        return res.status(200).json({ status: 'already_processed' });
      }

      // 2. If it hasn't been processed (e.g., user closed browser), we process it here!
      // This is our ultimate safety net.
      
      let password = 'FundfySecure2026!'; // Fallback password
      let userName = 'Participant';

      if (existingReg) {
        // If frontend created a PENDING record, we can extract their requested password
        const phoneStr = existingReg.user_phone || '';
        const pwdMatch = phoneStr.match(/PWD:(.+)$/);
        if (pwdMatch) password = pwdMatch[1];
        userName = existingReg.user_name || userName;
        
        // Update the existing pending registration to PAID
        await supabase.from('registrations')
          .update({ amount_paid: amount, payment_id: paymentId })
          .eq('user_email', email);
      } else {
        // If no pending record exists, we forcefully insert a recovery record so they don't lose their payment
        await supabase.from('registrations').insert({
          registration_id: `REG-REC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          user_name: 'Recovered User',
          user_email: email,
          user_phone: payment.contact || `PWD:${password}`,
          contest_name: 'Unknown (Recovered)',
          amount_paid: amount,
          payment_id: paymentId,
          referral_code: 'RECOVERED_BY_WEBHOOK'
        });
      }

      // 3. Create the Auth User securely using Admin API
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { first_name: userName.split(' ')[0] }
      });
      if (authError && authError.message !== 'User already registered') {
        console.error('Failed to create auth user', authError);
      }

      // **CRITICAL FIX**: Database trigger assigns 'referrer' role by default. Force it to 'user'.
      // We MUST wait 1.5 seconds for the database trigger to finish creating the profile before we update it.
      await new Promise(r => setTimeout(r, 1500));

      let targetUserId = authUser?.user?.id;
      if (!targetUserId) {
        const { data: existingProfile } = await supabase.from('profiles').select('id').eq('email', email).single();
        if (existingProfile) targetUserId = existingProfile.id;
      }
      if (targetUserId) {
        await supabase.from('profiles').update({ role: 'user', referral_code: null, commission_rate: 0, referral_price: 0 }).eq('id', targetUserId);
      }

      // 4. Send EmailJS Receipt via REST API (since @emailjs/browser is frontend only)
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Optional, but recommended for REST

      if (serviceId && templateId && publicKey) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            accessToken: privateKey,
            template_params: {
              to_name: userName,
              to_email: email,
              payment_id: paymentId,
              registration_id: existingReg?.registration_id || paymentId,
              amount: amount,
              custom_message: "Your payment was securely verified by our automated systems. You can now log in!"
            }
          })
        });
        console.log(`Recovery email sent to ${email}`);
      }

      return res.status(200).json({ status: 'success', recovered: true });
    } catch (err) {
      console.error('Webhook processing error', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(200).json({ status: 'ignored' });
}
