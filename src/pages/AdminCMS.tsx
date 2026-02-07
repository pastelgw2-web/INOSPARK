
import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectStatus, User, Donation, SiteSettings, VolunteerApplication } from '../types';

interface AdminCMSProps {
  projects: Project[];
  users: User[];
  donations: Donation[];
  volunteerApps: VolunteerApplication[];
  settings: SiteSettings;
  onUpdateProject: (id: string, status: ProjectStatus) => void;
  onUpdateUser: (id: string, updates: any) => void;
  onUpdateVolunteerApp: (id: string, status: 'Approved' | 'Rejected') => void;
  onSaveBranding: (settings: SiteSettings) => void;
}

const AdminCMS: React.FC<AdminCMSProps> = ({ 
  projects, users, donations, volunteerApps, settings, 
  onUpdateProject, onUpdateUser, onUpdateVolunteerApp, onSaveBranding 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [brandForm, setBrandForm] = useState<SiteSettings>(settings);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBrandForm(settings);
  }, [settings]);

  const totalFunds = donations.reduce((sum, d) => sum + d.amount, 0);
  const pendingProjects = projects.filter(p => p.status === ProjectStatus.PENDING);
  const pendingApps = volunteerApps.filter(a => a.status === 'Pending');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandForm({ ...brandForm, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCommitBranding = () => {
    onSaveBranding(brandForm);
    alert('Branding Updated Successfully! Changes are now live across the platform.');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'curation', label: 'Curation', icon: '💎', badge: pendingProjects.length },
    { id: 'talents', label: 'Talents', icon: '🤝', badge: pendingApps.length },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'branding', label: 'Branding', icon: '🎨' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col xl:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex w-72 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 overflow-hidden border border-white/50">
              {brandForm.logoUrl ? (
                <img src={brandForm.logoUrl} className="w-full h-full object-cover" alt="Logo" />
              ) : (
                <span className="font-black italic text-lg">{brandForm.platformName.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Command Center</p>
              <h2 className="text-sm font-black text-slate-800 truncate">{brandForm.platformName}</h2>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                {item.badge ? (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${activeTab === item.id ? 'bg-white text-primary' : 'bg-red-500 text-white'}`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 xl:p-12 pb-24 xl:pb-12">
        <div className="max-w-6xl mx-auto">
          
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">Command Center</h1>
                  <p className="text-slate-500 mt-3 font-medium text-lg">Real-time platform performance for <span className="text-primary font-bold">{brandForm.platformName}</span>.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Platform Value', value: `Rp ${totalFunds.toLocaleString()}`, color: 'bg-emerald-50 text-emerald-600', icon: '💰' },
                  { label: 'Proposals', value: pendingProjects.length, color: 'bg-blue-50 text-blue-600', icon: '💎' },
                  { label: 'Talent Pool', value: users.length, color: 'bg-purple-50 text-purple-600', icon: '🤝' },
                  { label: 'Conversion', value: '14.2%', color: 'bg-orange-50 text-orange-600', icon: '📈' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-6 ${stat.color}`}>{stat.icon}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-4xl font-black mb-12 text-slate-900">Identity <span className="text-primary">& Visuals</span></h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Branding Editor Form */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Platform App Name</label>
                    <input 
                      type="text" 
                      value={brandForm.platformName} 
                      onChange={(e) => setBrandForm({...brandForm, platformName: e.target.value})}
                      className="w-full px-6 py-5 bg-[#F8FAFC] border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 font-bold text-slate-800 text-lg transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Platform Logo</label>
                    <div className="flex items-center gap-6 p-6 bg-[#F8FAFC] rounded-[2rem] border border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-inner overflow-hidden border border-slate-200">
                        {brandForm.logoUrl ? (
                          <img src={brandForm.logoUrl} className="w-full h-full object-cover" alt="Logo Preview" />
                        ) : (
                          <span className="text-slate-300 text-[10px] font-black uppercase text-center p-2">No Logo Uploaded</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleLogoUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all mb-2"
                        >
                          Choose New File
                        </button>
                        <p className="text-[9px] text-slate-400 font-medium">PNG/JPG. Square ratio works best.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Primary Brand Color</label>
                    <div className="flex items-center gap-8 p-6 bg-[#F8FAFC] rounded-[2rem] border border-slate-100">
                      <input 
                        type="color" 
                        value={brandForm.primaryColor} 
                        onChange={(e) => setBrandForm({...brandForm, primaryColor: e.target.value})}
                        className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none"
                      />
                      <div className="flex-1">
                        <p className="font-mono text-xl font-black text-slate-700 uppercase tracking-tighter mb-1">{brandForm.primaryColor}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hex Code</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleCommitBranding}
                    className="w-full py-6 bg-primary text-white font-black rounded-[1.5rem] shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all text-lg uppercase tracking-widest"
                  >
                    Commit Changes
                  </button>
                </div>

                {/* Live Preview Card */}
                <div className="bg-white/50 rounded-[3rem] border border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[550px]">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-12">Dynamic Preview</p>
                  
                  <div className="relative mb-10 scale-125">
                    <div className="w-36 h-36 bg-white rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-6xl transition-all duration-500 overflow-hidden border-4 border-slate-50">
                      {brandForm.logoUrl ? (
                        <img src={brandForm.logoUrl} className="w-full h-full object-cover" alt="Logo" />
                      ) : (
                        <span className="font-black italic transition-colors duration-500" style={{ color: brandForm.primaryColor }}>
                          {brandForm.platformName.slice(0,2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full blur-xl opacity-30" style={{ backgroundColor: brandForm.primaryColor }}></div>
                  </div>
                  
                  <h4 className="text-4xl font-black text-slate-900 mb-4">{brandForm.platformName}</h4>
                  <p className="text-slate-500 text-sm max-w-[300px] leading-relaxed font-medium">
                    Changes will be updated instantly across all dashboards, emails, and reporting modules.
                  </p>
                  
                  <div className="mt-12 flex gap-4">
                    <button className="px-7 py-4 rounded-xl text-[10px] font-black text-white shadow-xl shadow-primary/20" style={{ backgroundColor: brandForm.primaryColor }}>GET STARTED</button>
                    <button className="px-7 py-4 rounded-xl text-[10px] font-black border-2 bg-white" style={{ borderColor: brandForm.primaryColor, color: brandForm.primaryColor }}>LEARN MORE</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminCMS;
