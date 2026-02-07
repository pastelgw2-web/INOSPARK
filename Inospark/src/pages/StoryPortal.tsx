
import React, { useState } from 'react';
import { Announcement, ProjectCategory } from '../types';
import { MOCK_ANNOUNCEMENTS, MOCK_PROJECTS } from '../constants';

interface StoryPortalProps {
  story?: Announcement | null;
  onBack: () => void;
  onStartInnovation: () => void;
}

const StoryPortal: React.FC<StoryPortalProps> = ({ story, onBack, onStartInnovation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Aggregating Data for Infographics
  const categoryStats = Object.values(ProjectCategory).map(cat => {
    const catProjects = MOCK_PROJECTS.filter(p => p.category === cat);
    const raised = catProjects.reduce((sum, p) => sum + p.currentFunding, 0);
    const donors = catProjects.reduce((sum, p) => sum + p.donorsCount, 0);
    // Mocking Innovators and Collaborators based on project counts for realistic visual
    const innovators = Math.ceil(catProjects.length * 0.7) + 2;
    const collaborators = Math.ceil(catProjects.length * 0.4) + 1;
    const disbursed = Math.floor(raised * 0.88); // Assuming 88% is typically disbursed

    return { 
      cat, 
      raised, 
      disbursed, 
      donors, 
      innovators, 
      collaborators,
      icon: cat === ProjectCategory.TECHNOLOGY ? '🚀' : 
            cat === ProjectCategory.ENVIRONMENT ? '🌿' :
            cat === ProjectCategory.SOCIAL ? '🤝' :
            cat === ProjectCategory.EDUCATION ? '🎓' : '🏥'
    };
  });

  const totalRaised = categoryStats.reduce((sum, s) => sum + s.raised, 0);
  const totalDisbursed = categoryStats.reduce((sum, s) => sum + s.disbursed, 0);

  const allNews: Announcement[] = [
    ...MOCK_ANNOUNCEMENTS,
    {
      id: 'n3',
      title: 'Startup EV Lokal Menembus Pasar Global',
      content: 'Berkat kolaborasi dengan AutoParts Global, motor listrik buatan anak bangsa kini siap diekspor ke 3 negara.',
      imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      link: '#',
      active: true
    },
    {
      id: 'n4',
      title: 'Penerimaan Relawan Batch 5 Dibuka',
      content: 'Kami mencari 200+ ahli teknis untuk mendukung 45 proyek inovasi sosial baru di tahun ini.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      link: '#',
      active: true
    },
    {
      id: 'n5',
      title: 'Teknologi Desalinasi Portabel di Pulau Komodo',
      content: 'Warga desa kini dapat menikmati air bersih setiap hari berkat alat desalinasi bertenaga surya hasil crowdfunding.',
      imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&w=800&q=80',
      link: '#',
      active: true
    },
    {
      id: 'n6',
      title: 'Inovasi Bioplastik Dari Rumput Laut',
      content: 'Inovator asal Makassar berhasil menciptakan kemasan ramah lingkungan yang larut dalam air dalam 24 jam.',
      imageUrl: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=800&q=80',
      link: '#',
      active: true
    }
  ];

  const categories = ['All', 'Impact', 'Technology', 'Collaboration', 'Community'];

  if (story) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FD] via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={onBack}
                className="mb-8 flex items-center gap-3 text-white/90 hover:text-white font-black text-xs uppercase tracking-widest transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                </div>
                Back to News Hub
              </button>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">{story.title}</h1>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="prose prose-xl prose-slate max-w-none">
            <p className="text-2xl font-medium text-slate-600 leading-relaxed mb-10 border-l-4 border-emerald-500 pl-8">{story.content}</p>
            <div className="space-y-6 text-slate-700 text-lg leading-loose">
              <p>Misi utama kami adalah memastikan setiap inovasi mendapatkan panggung yang layak. Artikel ini menjelaskan detail progres dan bagaimana kontribusi Anda telah membuat perbedaan nyata di lapangan.</p>
              <p>Tim InnoSpark terus melakukan monitoring berkala untuk memastikan dana dan keahlian yang disalurkan tepat sasaran dan berkelanjutan.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hub Header */}
      <div className="text-center mb-12 pt-6">
        <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Innovation Pulse</span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-none">News & <span className="text-emerald-600">Impact Stories.</span></h1>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Kisah sukses, update teknologi, dan laporan dampak terbaru dari ekosistem InnoSpark.</p>
      </div>

      {/* NEW: IMPACT INFOGRAPHICS SECTION */}
      <section className="mb-20 space-y-8">
        {/* Global Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[80px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 block">Total Capital Flow</span>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Rp {(totalRaised / 1e9).toFixed(1)}B</h2>
                  <span className="text-emerald-500 font-bold text-xs">Himpun</span>
                </div>
                <div className="mt-4 flex items-center gap-4">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase">Disalurkan</span>
                      <span className="text-lg font-black text-slate-200">Rp {(totalDisbursed / 1e9).toFixed(1)}B</span>
                   </div>
                   <div className="w-px h-8 bg-slate-800"></div>
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase">Efisiensi</span>
                      <span className="text-lg font-black text-emerald-500">{( (totalDisbursed/totalRaised) * 100 ).toFixed(0)}%</span>
                   </div>
                </div>
              </div>
              <div className="hidden md:block w-32 h-32 bg-white/5 rounded-3xl backdrop-blur-md p-6 border border-white/10">
                <svg viewBox="0 0 36 36" className="w-full h-full text-emerald-500 stroke-current fill-none">
                  <path strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="88, 100" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col justify-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Our Global Ecosystem</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-slate-900">{categoryStats.reduce((sum, s) => sum + s.donors, 0).toLocaleString()}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Donors</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-2xl md:text-3xl font-black text-emerald-600">{categoryStats.reduce((sum, s) => sum + s.innovators, 0).toLocaleString()}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Innovators</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-slate-900">{categoryStats.reduce((sum, s) => sum + s.collaborators, 0).toLocaleString()}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Partners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Specific Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoryStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.cat}</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-slate-900">{stat.donors}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Donors</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[14px] font-black text-emerald-600">{stat.innovators}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Inovator</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[14px] font-black text-slate-900">{stat.collaborators}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Kollab</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center mb-1.5">
                   <span className="text-[9px] font-black text-slate-500">FUNDS: {((stat.disbursed/stat.raised)*100).toFixed(0)}% Disbursed</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(stat.disbursed/stat.raised)*100}%` }}></div>
                </div>
                <div className="flex justify-between mt-2">
                   <span className="text-[9px] font-bold text-slate-400">Rp {(stat.raised/1e6).toFixed(0)}jt</span>
                   <span className="text-[9px] font-bold text-emerald-600">Rp {(stat.disbursed/1e6).toFixed(0)}jt</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between border-t border-slate-100 pt-12">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
           <input 
            type="text" 
            placeholder="Search stories..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 font-bold text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
           />
           <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {allNews
          .filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item, idx) => (
          <div key={item.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                  {idx === 0 ? 'Featured' : 'Latest'}
                </span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">{item.content}</p>
              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">5 Min Read</span>
                <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured CTA */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-10 blur-[100px] rounded-full"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Punya Kisah Inovasi Luar Biasa?</h2>
          <p className="text-slate-400 text-lg font-medium mb-10">Jadilah bagian dari News Hub kami. Kirimkan progres inovasi Anda untuk diliput dan dipromosikan ke seluruh jaringan investor kami.</p>
          <button 
            onClick={onStartInnovation}
            className="px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 active-tap uppercase tracking-widest text-xs"
          >
            Submit Story Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryPortal;
