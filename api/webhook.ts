import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Disable default body parser so we can compute the signature over the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Read raw body
  const rawBody = await new Promise<string>((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', reject);
  });

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is missing");
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const signature = req.headers['x-razorpay-signature'];
  
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error("Invalid signature");
    return res.status(400).json({ message: 'Invalid signature' });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;
  
  if (event === 'payment.captured' || event === 'payment_link.paid') {
    let email = null;
    let phone = null;
    let paymentId = null;
    let referenceId = null;
    
    if (event === 'payment_link.paid') {
      email = payload.payload?.payment_link?.entity?.customer?.email;
      phone = payload.payload?.payment_link?.entity?.customer?.contact;
      referenceId = payload.payload?.payment_link?.entity?.reference_id;
      paymentId = payload.payload?.payment?.entity?.id || payload.payload?.payment_link?.entity?.id;
    } else if (event === 'payment.captured') {
      email = payload.payload?.payment?.entity?.email;
      phone = payload.payload?.payment?.entity?.contact;
      referenceId = payload.payload?.payment?.entity?.notes?.reference_id;
      paymentId = payload.payload?.payment?.entity?.id;
    }

    console.log(`Webhook received: event=${event}, referenceId=${referenceId}, email=${email}, paymentId=${paymentId}`);

    if (!paymentId) {
      return res.status(400).json({ message: 'Missing payment_id in payload' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
       console.error("Supabase service key missing");
       return res.status(500).json({ message: 'Supabase config missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if this payment_id is already recorded (idempotency)
    const { data: existing } = await supabase
      .from('registrations')
      .select('id')
      .eq('payment_id', paymentId)
      .single();

    if (existing) {
      console.log(`Payment ${paymentId} already recorded, skipping.`);
      return res.status(200).json({ status: 'already_recorded' });
    }

    // MATCH BY REFERENCE_ID (BULLETPROOF!)
    let pendingReg = null;

    if (referenceId) {
      const { data } = await supabase
        .from('registrations')
        .select('*')
        .eq('registration_id', referenceId)
        .eq('payment_id', 'PENDING')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      pendingReg = data;
      if (pendingReg) console.log(`✅ Matched PENDING entry by exact referenceId: ${referenceId}`);
    }

    // Fallback: match by email or phone just in case (legacy links)
    if (!pendingReg && email) {
      const { data } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_email', email)
        .eq('payment_id', 'PENDING')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      pendingReg = data;
      if (pendingReg) console.log(`Matched PENDING entry by email: ${email}`);
    }

    if (!pendingReg && phone) {
      const normalizedPhone = phone.replace(/^\+91/, '').replace(/\s/g, '');
      const { data: allPending } = await supabase
        .from('registrations')
        .select('*')
        .eq('payment_id', 'PENDING')
        .order('created_at', { ascending: false });

      if (allPending) {
        pendingReg = allPending.find((r: any) => {
          const storedPhone = (r.user_phone || '').split(' || PWD:')[0].replace(/^\+91/, '').replace(/\s/g, '');
          return storedPhone === normalizedPhone;
        }) || null;
        if (pendingReg) console.log(`Matched PENDING entry by phone: ${phone}`);
      }
    }

    if (!pendingReg) {
      // Still can't match — insert a minimal record so admin can see it flagged for review
      console.log(`No PENDING match found for referenceId=${referenceId}. Inserting unmatched record.`);
      await supabase.from('registrations').insert({
        user_name: `Unknown - verify manually (${email || phone})`,
        user_email: email || 'unknown@unknown.com',
        user_phone: phone || '',
        amount_paid: 100,
        payment_id: paymentId,
        referral_code: null,
        registration_id: referenceId || `UNKNOWN-${paymentId}`
      });
      return res.status(200).json({ message: 'Unmatched payment recorded for manual review' });
    }

    // Update the PENDING entry to paid with real payment_id
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        payment_id: paymentId,
        amount_paid: 100
      })
      .eq('id', pendingReg.id);

    if (updateError) {
      console.error("Failed to update registration", updateError);
      return res.status(500).json({ message: 'Database update failed' });
    }

    console.log(`✅ Successfully verified payment ${paymentId} for ${email || phone}!`);
    return res.status(200).json({ status: 'ok', message: 'Payment verified successfully' });
  }

  return res.status(200).json({ status: 'ignored' });
}
