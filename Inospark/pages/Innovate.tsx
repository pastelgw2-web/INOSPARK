
import React, { useState } from 'react';
import { ProjectCategory, User } from '../types';

interface InnovateProps {
  user: User | null;
  onSubmit: (project: any) => void;
  onLoginRedirect: () => void;
}

const Innovate: React.FC<InnovateProps> = ({ user, onSubmit, onLoginRedirect }) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ProjectCategory>(ProjectCategory.TECHNOLOGY);
  const [fundingGoal, setFundingGoal] = useState<number>(50000000);
  const [description, setDescription] = useState('');

  const guidanceSteps = [
    {
      step: "01",
      title: "Conceptualization",
      desc: "Pastikan ide Anda memiliki prototipe awal atau rencana teknis yang solid (Minimum Viable Product).",
      icon: "💡"
    },
    {
      step: "02",
      title: "Data Preparation",
      desc: "Siapkan dokumentasi visual, estimasi biaya, dan roadmap pengembangan untuk 6-12 bulan ke depan.",
      icon: "📁"
    },
    {
      step: "03",
      title: "Submission",
      desc: "Isi formulir pengajuan dengan detail teknis yang komprehensif untuk memudahkan proses verifikasi.",
      icon: "📝"
    }
  ];

  const slaItems = [
    { label: "Curation Screening", time: "24-48 Working Hours", desc: "Tim ahli kami akan melakukan verifikasi awal terhadap kelayakan proposal." },
    { label: "Technical Review", time: "5-7 Working Days", desc: "Review mendalam oleh mitra industri atau akademisi terkait validitas solusi." },
    { label: "Public Launch", time: "Instant after Approval", desc: "Proyek langsung tayang dan dapat menerima dukungan dana serta relawan." }
  ];

  const valueProps = [
    { 
      title: "Milestone-Based Funding", 
      desc: "Dana dicairkan hanya setelah pencapaian target tertentu (milestone) tercapai, memberikan rasa aman 100% bagi donor.",
      target: "For Donors",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100"
    },
    { 
      title: "IP Protection & Legal Hub", 
      desc: "Kami memfasilitasi perlindungan Hak Kekayaan Intelektual (HAKI) agar kolaborator korporasi dapat berinvestasi dengan tenang.",
      target: "For Collaborators",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100"
    },
    { 
      title: "Impact Reporting Real-time", 
      desc: "Dashboard transparan yang melaporkan setiap Rupiah yang disalurkan secara visual dan terdokumentasi.",
      target: "Transparency",
      color: "bg-amber-50 text-amber-700 border-amber-100"
    }
  ];

  const HeaderSection = () => (
    <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
      <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Innovation Lab</span>
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-none">Bring Your <span className="text-emerald-600">Vision to Life.</span></h1>
      <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
        Kami menghubungkan ide revolusioner Anda dengan modal finansial, keahlian teknis, dan jaringan industri global.
      </p>
    </div>
  );

  const GuidanceSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {guidanceSteps.map((s, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-slate-50 font-black text-6xl group-hover:text-emerald-50/50 transition-colors">{s.step}</div>
          <div className="relative z-10">
            <div className="text-3xl mb-4">{s.icon}</div>
            <h3 className="text-lg font-black text-slate-900 mb-3">{s.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const SLASection = () => (
    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white mb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h2 className="text-3xl font-black tracking-tight">Curation & Launch <span className="text-emerald-500">SLA</span></h2>
          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Efficiency Guarantee</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {slaItems.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-emerald-500 font-black text-xl mb-1">{item.time}</span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{item.label}</span>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TrustSection = () => (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Mengapa InnoSpark Berbeda?</h2>
        <p className="text-slate-500 font-medium text-sm">Strategi kami untuk mengamankan dukungan donor dan kolaborator industri.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {valueProps.map((vp, idx) => (
          <div key={idx} className={`p-8 rounded-[2rem] border ${vp.color} transition-all hover:shadow-lg`}>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-3 block">{vp.target}</span>
            <h3 className="text-lg font-black mb-3 leading-tight">{vp.title}</h3>
            <p className="text-sm font-medium leading-relaxed opacity-80">{vp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      tagline,
      category,
      targetFunding: fundingGoal,
      description,
      innovatorId: user?.id
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <HeaderSection />
        <GuidanceSection />
        <SLASection />
        <TrustSection />
        
        <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Siap Mengubah Dunia?</h2>
          <p className="text-emerald-100 text-lg font-medium mb-10 max-w-xl mx-auto">Masuk atau daftar sekarang untuk mulai mengajukan proposal inovasi Anda ke jaringan kami.</p>
          <button 
            onClick={onLoginRedirect}
            className="px-10 py-5 bg-white text-emerald-600 font-black rounded-2xl shadow-xl hover:bg-emerald-50 transition-all uppercase tracking-widest text-xs"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <HeaderSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Proposal Form</h2>
            <p className="text-slate-500 text-sm font-medium">Lengkapi detail inovasi Anda untuk proses verifikasi ahli.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Project Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Robot Pembersih Terumbu Karang Otonom"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/5 outline-none font-bold text-slate-800 transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Catchy Tagline</label>
                <input 
                  type="text" 
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Satu kalimat yang akan menarik perhatian donor dalam 3 detik."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/5 outline-none font-medium text-slate-700 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/5 outline-none font-bold text-slate-700 bg-white"
                >
                  {Object.values(ProjectCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Funding Goal (IDR)</label>
                <input 
                  type="number" 
                  required
                  value={fundingGoal}
                  onChange={(e) => setFundingGoal(Number(e.target.value))}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/5 outline-none font-bold text-emerald-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Full Roadmap & Technology Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="Jelaskan masalah, solusi teknis, dan rencana alokasi dana secara bertahap (milestone)."
                  className="w-full px-5 py-5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-emerald-500/5 outline-none font-medium text-slate-700 leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row gap-4">
              <button 
                type="submit"
                className="flex-1 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/10 hover:bg-emerald-700 transition-all active-tap uppercase tracking-widest text-xs"
              >
                Launch Proposal
              </button>
              <button 
                type="button"
                className="px-10 py-5 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all active-tap uppercase tracking-widest text-xs"
              >
                Draft
              </button>
            </div>
          </form>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
           <SLASection />
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Tips for Success</h3>
             <ul className="space-y-4">
               {[
                 "Gunakan foto/video prototipe nyata, bukan sekadar render 3D.",
                 "Breakdown penggunaan dana menjadi minimal 3 milestone utama.",
                 "Jelaskan dampak sosial atau lingkungan secara kuantitatif.",
                 "Identifikasi risiko teknis dan bagaimana Anda memitigasinya."
               ].map((tip, i) => (
                 <li key={i} className="flex gap-4 items-start">
                   <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">✓</div>
                   <p className="text-sm font-medium text-slate-600 leading-relaxed">{tip}</p>
                 </li>
               ))}
             </ul>
           </div>
           <TrustSection />
        </div>
      </div>
    </div>
  );
};

export default Innovate;
