import React, { useState } from 'react';
// 1. Memanggil pelayan yang kamu buat di folder services
import { createNewProject } from '../services/supabaseService'; 
import { ProjectCategory, ProjectStatus } from '../types';

interface InnovateProps {
  user: any;
  onLoginRedirect: () => void;
}

const Innovate: React.FC<InnovateProps> = ({ user, onLoginRedirect }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ProjectCategory.TECH,
    goal: 0,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLoginRedirect();
      return;
    }

    setIsSubmitting(true);
    try {
      // 2. Mengirim data ke tabel 'projects' di Supabase
      await createNewProject({
        ...formData,
        authorId: user.id,
        status: ProjectStatus.ACTIVE
      });
      
      alert('Hore! Proyek kamu berhasil didaftarkan ke database.');
      // Kamu bisa menambahkan fungsi navigasi ke home di sini
    } catch (error) {
      console.error(error);
      alert('Gagal mengirim proyek. Pastikan nama tabel di Supabase adalah "projects" dan RLS Policy sudah diaktifkan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Sisa kode tampilan Form kamu tetap sama ---
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Start Your Innovation</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Project Title</label>
          <input 
            type="text" 
            className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold"
            placeholder="e.g. Eco-Friendly Power Cell"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
          <textarea 
            className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold min-h-[150px]"
            placeholder="Tell the world about your idea..."
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Funding Goal (IDR)</label>
            <input 
              type="number" 
              className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold"
              placeholder="e.g. 50000000"
              onChange={(e) => setFormData({...formData, goal: parseInt(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
            <select 
              className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold appearance-none"
              onChange={(e) => setFormData({...formData, category: e.target.value as ProjectCategory})}
            >
              {Object.values(ProjectCategory).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active-tap disabled:opacity-50"
        >
          {isSubmitting ? 'UPLOADING...' : 'LAUNCH PROJECT'}
        </button>
      </form>
    </div>
  );
};

export default Innovate;
