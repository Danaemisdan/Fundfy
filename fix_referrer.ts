import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fix() {
  const email = 'rohithdevarakonda2005@gmail.com';
  
  // Find the profile
  const { data: profile } = await supabase.from('profiles').select('*').eq('email', email).single();
  
  if (profile) {
    await supabase.from('profiles').update({ role: 'user', referral_code: null, commission_rate: null }).eq('id', profile.id);
    console.log(`Fixed ${email}, changed role back to user.`);
  } else {
    console.log("Not found in profiles");
  }
}

fix();
