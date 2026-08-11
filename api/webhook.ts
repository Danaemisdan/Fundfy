import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function to handle Razorpay Webhooks
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body;

    // Fast-fail if there's no body
    if (!body || !body.event) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    // Initialize Supabase Admin client to bypass RLS
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1vZHlqaXBodmtpc2JvY3VxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjIwNTExMiwiZXhwIjoyMTAxNzgxMTEyfQ.qkh-82GlTyOy5pAN7wJSOJ4nXqLUcp25OcaoNmYzDUk';
    
    if (!supabaseUrl) {
      console.error("Missing Supabase URL");
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    console.log(`Received Razorpay Webhook: ${body.event}`);

    // Handle payment.captured or payment_link.paid
    let email = null;
    let phone = null;
    let paymentId = null;
    let amount = 0;

    if (body.event === 'payment.captured') {
      const payment = body.payload.payment.entity;
      email = payment.email;
      phone = payment.contact;
      paymentId = payment.id;
      amount = payment.amount / 100; // Convert from paise
    } else if (body.event === 'payment_link.paid') {
      const paymentLink = body.payload.payment_link.entity;
      const payment = body.payload.payment.entity;
      email = paymentLink.customer?.email || payment.email;
      phone = paymentLink.customer?.contact || payment.contact;
      paymentId = payment.id;
      amount = payment.amount / 100;
    } else {
      // Ignore other events
      return res.status(200).json({ status: 'ignored' });
    }

    if (!paymentId) {
      return res.status(400).json({ message: 'Missing payment ID' });
    }

    console.log(`Processing Payment: ${paymentId}, Email: ${email}, Phone: ${phone}, Amount: ${amount}`);

    // Try to find a PENDING registration by email or phone
    let query = supabaseAdmin.from('registrations').select('*').eq('payment_id', 'PENDING');
    
    // Using an OR condition for email and phone. PostgREST allows this via .or()
    let orConditions = [];
    if (email) orConditions.push(`user_email.ilike.%${email}%`);
    if (phone) {
      // Phone could have +91 or just 10 digits
      let cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
         let last10 = cleanPhone.slice(-10);
         orConditions.push(`user_phone.ilike.%${last10}%`);
      }
    }
    
    if (orConditions.length > 0) {
       query = query.or(orConditions.join(','));
    }

    const { data: pendingRegs, error: fetchError } = await query.order('created_at', { ascending: false }).limit(1);

    if (fetchError) {
      console.error("Error fetching pending registrations:", fetchError);
      return res.status(500).json({ message: 'Database query failed' });
    }

    if (!pendingRegs || pendingRegs.length === 0) {
      console.log(`No PENDING registration found for Email/Phone: ${email} / ${phone}`);
      // Even if not found, we should return 200 so Razorpay doesn't keep retrying.
      // We could ideally insert a brand new row here, but we lack the Contest info.
      return res.status(200).json({ status: 'no_pending_found' });
    }

    const targetReg = pendingRegs[0];

    // Update the PENDING registration to the real payment ID and paid status
    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        payment_id: paymentId,
        amount_paid: amount > 0 ? amount : 100 // fallback to 100
      })
      .eq('id', targetReg.id);

    if (updateError) {
      console.error("Error updating registration:", updateError);
      return res.status(500).json({ message: 'Update failed' });
    }

    console.log(`Successfully verified registration ${targetReg.id} with payment ${paymentId}`);
    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
