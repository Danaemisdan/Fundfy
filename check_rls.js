import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'jagadeeshkesana1213@gmail.com',
    password: '123#Realme'
  });
  console.log("Sign in:", session?.user?.email, signInError?.message);

  if (session) {
    const { data: regs, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_email', session.user.email);
    console.log('Regs fetched as user:', regs, error?.message);
  }
}
run();
