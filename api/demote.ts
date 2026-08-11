import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    // Initialize Supabase with the Service Role Key for Admin privileges (bypasses RLS)
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://bmemodyjiphvkisbocuq.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    
    if (!supabaseKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables. Please add it and redeploy.');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from('profiles')
      .update({ role: 'user', referral_code: null, commission_rate: 0, referral_price: 0 })
      .eq('id', userId);

    if (error) throw error;

    return res.status(200).json({ status: 'success' });
  } catch (err: any) {
    console.error('Demote error', err);
    return res.status(500).json({ error: err.message || JSON.stringify(err) });
  }
}
