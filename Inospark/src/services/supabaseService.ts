import { createClient } from '@supabase/supabase-js';

// Menggunakan URL dan Anon Key yang sudah kamu temukan
const supabaseUrl = 'https://ejlqpmhqscwgvsrdqkwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbHFwbWhxc2N3Z3ZzcmRxa3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjQ2NTMsImV4cCI6MjA4NTg0MDY1M30.dL7zicQzvJeqN8VVrXAw5QK4-2o8UqUxPQYDm2O4UYg';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * FUNGSI UNTUK START PROJECT
 * Memasukkan data proyek baru ke tabel 'projects' di Supabase
 */
export const createNewProject = async (projectData: any) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([
      { 
        ...projectData, 
        id: crypto.randomUUID(), // Membuat ID unik otomatis
        status: 'active',
        currentFunding: 0,
        donorsCount: 0,
        createdAt: new Date().toISOString()
      }
    ])
    .select();
  
  if (error) {
    console.error('Gagal menyimpan proyek:', error.message);
    throw error;
  }
  return data;
};

/**
 * FUNGSI UNTUK MENGAMBIL DATA
 * Digunakan oleh CMS atau Halaman Utama untuk menampilkan proyek dari database
 */
export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) throw error;
  return data;
};
