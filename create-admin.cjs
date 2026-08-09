require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  const email = 'dannyk.virtualex@gmail.com';
  const password = 'AdminPassword123!';

  console.log('Signing up...');
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error && error.message !== 'User already registered') {
    console.error('Signup error:', error);
  }
  
  // Get the user ID (either from signup or existing)
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  const user = signInData?.user || data?.user;
  
  if (!user) {
    console.error('Failed to get user details. Check if email confirmation is required.');
    // If email confirmation is required, we won't get a user from signInWithPassword.
    // We can get it from the signup data though!
    if (data?.user) {
      console.log('Updating role to admin for user:', data.user.id);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', data.user.id);
      if (updateError) console.error('Update error:', updateError);
      else console.log('Successfully set admin role for ' + email);
    }
    return;
  }

  console.log('Updating role to admin for user:', user.id);
  const { data: updateData, error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (updateError) {
    console.error('Update error (probably RLS):', updateError);
  } else {
    console.log('Success! Admin account created/updated for:', email);
  }
}
main();
