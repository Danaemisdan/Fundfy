require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('registrations')
    .delete()
    .eq('user_email', 'test@test.com');
    
  if (error) {
    console.error('Error deleting:', error);
  } else {
    console.log('Deleted successfully', data);
  }
}

run();
