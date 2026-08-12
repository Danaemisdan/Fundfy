import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: regs, error } = await supabase
    .from('registrations')
    .select('*')
    .ilike('user_email', '%jagadeeshkesana1213@gmail.com%');
  console.log('Regs fetched as admin:', regs, error?.message);
}
run();
