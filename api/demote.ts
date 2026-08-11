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
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables on server.');
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
