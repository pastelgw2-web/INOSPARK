import { createClient } from '@supabase/supabase-client';

// Ganti URL dan KEY ini dengan yang ada di Settings -> API Supabase kamu
const supabaseUrl = 'https://xyzyourproject.supabase.co';
const supabaseKey = 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseKey);
