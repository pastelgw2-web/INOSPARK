import { createClient } from '@supabase/supabase-js';

// Menggunakan URL dan Anon Key milikmu
const supabaseUrl = 'https://ejlqpmhqscwgvsrdqkwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbHFwbWhxc2N3Z3ZzcmRxa3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjQ2NTMsImV4cCI6MjA4NTg0MDY1M30.dL7zicQzvJeqN8VVrXAw5QK4-2o8UqUxPQYDm2O4UYg';

export const supabase = createClient(supabaseUrl, supabaseKey);
