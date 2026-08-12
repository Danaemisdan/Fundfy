import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: { session } } = await supabase.auth.signInWithPassword({
    email: 'admin@test.com', // wait, do we know the admin email?
    password: 'password'
  });
  
  const { data: regs, error } = await supabase.from('registrations').select('*').limit(2);
  console.log('Regs as anon:', regs, error?.message);
}
run();
