
import React from 'react';
import { ProjectCategory } from '../types';

const GlobalImpact: React.FC = () => {
  const categoryImpacts = [
    {
      category: ProjectCategory.TECHNOLOGY,
      icon: '🚀',
      progress: 78,
      achievements: "15 Prototype Terintegrasi Industri",
      newsSummary: "Inovasi baterai solid-state lokal mencapai tahap uji coba pangkalan militer.",
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      category: ProjectCategory.EDUCATION,
      icon: '🎓',
      progress: 92,
      achievements: "12rb Siswa Terjangkau Digital",
      newsSummary: "Kurikulum coding untuk anak pesisir resmi diadopsi oleh 5 kabupaten.",
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-700"
    },
    {
      category: ProjectCategory.HEALTH,
      icon: '🩺',
      progress: 64,
      achievements: "8 Alat Medis Terakreditasi",
      newsSummary: "Detektor malaria berbasis AI mulai digunakan di 12 puskesmas terpencil NTT.",
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-700"
    },
    {
      category: ProjectCategory.SOCIAL,
      icon: '🤝',
      progress: 85,
      achievements: "40 Komunitas Berdaya Ekonomi",
      newsSummary: "Platform inklusi disabilitas mencatatkan 200+ penempatan kerja remote bulan ini.",
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      category: ProjectCategory.ENVIRONMENT,
      icon: '🌿',
      progress: 70,
      achievements: "4.5 Ton Plastik Terdaur Ulang",
      newsSummary: "Robot pembersih sungai otonom berhasil menurunkan tingkat limbah di Ciliwung sebesar 15%.",
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    }
  ];

  return (
    <div className="space-y-12 mb-24">
      {/* Platform Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Inovator Didukung</span>
          <p className="text-4xl font-black text-slate-900">1,240+</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Ide yang bertransformasi menjadi aksi</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Kolaborasi</span>
          <p className="text-4xl font-black text-emerald-600">85</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Kemitraan korporasi & riset aktif</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dana Tersalurkan</span>
          <p className="text-4xl font-black text-slate-900">Rp 12.8B</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Dukungan publik & filantropi</p>
        </div>
      </div>

      {/* Category Infographics */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Capaian Dampak Inovasi</h2>
        <p className="text-slate-500 font-medium mt-2">Progres real-time dari setiap pilar vertikal inovasi kami.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categoryImpacts.map((item, idx) => (
          <div key={idx} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-xl">
            <div className={`absolute top-0 right-0 w-24 h-24 ${item.lightColor} blur-[50px] opacity-40 -mr-10 -mt-10 rounded-full`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-14 h-14 ${item.lightColor} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner`}>
                {item.icon}
              </div>
              
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{item.category}</h3>
              <p className={`text-[10px] font-black uppercase tracking-tight ${item.textColor} mb-6 leading-tight h-8`}>
                {item.achievements}
              </p>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">PROGRES TARGET</span>
                  <span className="text-xs font-black text-slate-900">{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">LATEST IMPACT NEWS</p>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-3 italic">
                  "{item.newsSummary}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalImpact;
