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
    let paymentId = null;
    
    if (event === 'payment_link.paid') {
      email = payload.payload?.payment_link?.entity?.customer?.email;
      paymentId = payload.payload?.payment?.entity?.id || payload.payload?.payment_link?.entity?.id;
    } else if (event === 'payment.captured') {
      email = payload.payload?.payment?.entity?.email;
      paymentId = payload.payload?.payment?.entity?.id;
    }

    if (!email || !paymentId) {
      return res.status(400).json({ message: 'Missing email or payment_id in payload' });
    }

    // Use Service Role Key to safely bypass Row Level Security
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
       console.error("Supabase service key missing");
       return res.status(500).json({ message: 'Supabase config missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the pending registration by email
    const { data: pendingReg, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_email', email)
      .eq('payment_id', 'PENDING')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !pendingReg) {
      console.log(`No PENDING registration found for email ${email}`);
      return res.status(200).json({ message: 'No pending registration found, ignoring' });
    }

    // Update the pending registration to paid
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

    console.log(`✅ Successfully verified payment for ${email}!`);
    return res.status(200).json({ status: 'ok', message: 'Payment updated successfully' });
  }

  return res.status(200).json({ status: 'ignored' });
}
