// @ts-nocheck
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, regId } = req.body;
  if (!action || !regId) {
    return res.status(400).json({ error: 'Missing action or regId' });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://bmemodyjiphvkisbocuq.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    
    if (!supabaseKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables.');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (action === 'verify') {
      const { error } = await supabase
        .from('registrations')
        .update({ amount_paid: 100, payment_id: 'MANUAL_VERIFIED' })
        .eq('id', regId);
      
      if (error) throw error;
      return res.status(200).json({ status: 'success' });
    } 
    
    else if (action === 'delete') {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', regId);
        
      if (error) throw error;
      return res.status(200).json({ status: 'success' });
    }
    
    else {
      return res.status(400).json({ error: 'Invalid action' });
    }

  } catch (err: any) {
    console.error('Admin Registration Action Error', err);
    return res.status(500).json({ error: err.message || JSON.stringify(err) });
  }
}
