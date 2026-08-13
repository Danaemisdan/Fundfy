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

  // ✅ ONLY process confirmed, captured payments. Everything else (failed, timed out, invalid pin) is ignored.
  if (event !== 'payment.captured' && event !== 'payment_link.paid') {
    console.log(`Ignoring non-payment event: ${event}`);
    return res.status(200).json({ status: 'ignored' });
  }

  let paymentId: string | null = null;
  let referenceId: string | null = null;
  let amountPaid: number = 100;

  if (event === 'payment_link.paid') {
    const linkEntity = payload.payload?.payment_link?.entity;
    const paymentEntity = payload.payload?.payment?.entity;
    referenceId = linkEntity?.reference_id || null;
    paymentId = paymentEntity?.id || linkEntity?.id || null;
    amountPaid = Math.round((paymentEntity?.amount || linkEntity?.amount || 10000) / 100);
  } else if (event === 'payment.captured') {
    const paymentEntity = payload.payload?.payment?.entity;
    referenceId = paymentEntity?.notes?.registrationId || null;
    paymentId = paymentEntity?.id || null;
    amountPaid = Math.round((paymentEntity?.amount || 10000) / 100);
  }

  console.log(`Webhook: event=${event}, paymentId=${paymentId}, referenceId=${referenceId}, amount=₹${amountPaid}`);

  if (!paymentId) {
    return res.status(400).json({ message: 'Missing payment_id in payload' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://bmemodyjiphvkisbocuq.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseServiceKey) {
     console.error("SUPABASE_SERVICE_ROLE_KEY missing from Vercel env vars");
     return res.status(500).json({ message: 'SUPABASE_SERVICE_ROLE_KEY not set in Vercel Environment Variables' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Idempotency: if this payment_id is already recorded, skip.
  const { data: alreadyRecorded } = await supabase
    .from('registrations')
    .select('id')
    .eq('payment_id', paymentId)
    .maybeSingle();

  if (alreadyRecorded) {
    console.log(`Payment ${paymentId} already recorded, skipping.`);
    return res.status(200).json({ status: 'already_recorded' });
  }

  // Find the PENDING row by reference_id (our registrationId) — this is bulletproof since we generated it.
  if (referenceId) {
    const { data: pendingReg } = await supabase
      .from('registrations')
      .select('id')
      .eq('registration_id', referenceId)
      .eq('payment_id', 'PENDING')
      .maybeSingle();

    if (pendingReg) {
      // ✅ FOUND: Update the PENDING row → mark as paid with real amount
      const { error } = await supabase
        .from('registrations')
        .update({ payment_id: paymentId, amount_paid: amountPaid })
        .eq('id', pendingReg.id);

      if (error) {
        console.error("Failed to update PENDING registration:", error);
        return res.status(500).json({ message: 'Database update failed' });
      }

      console.log(`✅ Payment confirmed. Updated PENDING row (registration_id=${referenceId}) → payment_id=${paymentId}, amount=₹${amountPaid}`);
      return res.status(200).json({ status: 'ok', message: 'Payment verified successfully' });
    }
  }

  // Fallback: PENDING row not found (e.g. legacy payment links without our system).
  // Log it so admin can investigate — do NOT silently ignore real money.
  console.warn(`⚠️ Could not find PENDING row for referenceId=${referenceId}, paymentId=${paymentId}. This may need manual review.`);
  return res.status(200).json({ status: 'no_pending_match', message: 'Payment captured but no matching PENDING row found — check logs.' });
}
