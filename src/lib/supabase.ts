import { createClient } from '@supabase/supabase-js';

// These are PUBLIC keys — the anon key is intentionally client-side and
// is protected by Supabase Row Level Security, not by being secret.
// Fallbacks ensure the app never crashes if Vercel env vars aren't set.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://bmemodyjiphvkisbocuq.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1vZHlqaXBodmtpc2JvY3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMDUxMTIsImV4cCI6MjEwMTc4MTExMn0.4F30XCRspgXMx6U05xF4JOEFB7XyodYMddIqt6GhROI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
