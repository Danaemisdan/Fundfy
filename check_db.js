import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Checking Vakiti...");
  const { data, error } = await supabase.from('registrations').select('*').eq('payment_id', 'pay_TOUjgUrUkaQnDV');
  console.log('Real payment id:', data, error);
  const { data: d2 } = await supabase.from('registrations').select('*').ilike('user_email', '%vakitianeshkumar4227%');
  console.log('Email match:', d2);
  const { data: d3 } = await supabase.from('registrations').select('*').eq('user_name', 'Participant');
  console.log('Participant match:', d3);
  
  const { data: d4 } = await supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Recent 5 entries:', d4);
}
run();
