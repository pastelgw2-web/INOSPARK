import { createClient } from '@supabase/supabase-js';

// Mengambil kunci dari Environment Variables yang sudah kamu pasang di Cloudflare
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * FUNGSI UNTUK START PROJECT
 * Memasukkan data proyek baru ke tabel 'projects'
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
 * FUNGSI UNTUK CMS / DASHBOARD
 * Mengambil semua data proyek terbaru dari database
 */
export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('createdAt', { ascending: false });
    
  if (error) throw error;
  return data;
};
