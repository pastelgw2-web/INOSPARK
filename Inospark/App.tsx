
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import NewsSlider from './components/NewsSlider';
import ProjectDetail from './pages/ProjectDetail';
import AdminCMS from './pages/AdminCMS';
import Auth from './pages/Auth';
import CollaborationHub from './pages/CollaborationHub';
import Innovate from './pages/Innovate';
import UserDashboard from './pages/UserDashboard';
import StoryPortal from './pages/StoryPortal';
import { Project, User, UserRole, ProjectCategory, ProjectStatus, Donation, SiteSettings, VolunteerApplication } from './types';
import { MOCK_PROJECTS, MOCK_USERS, MOCK_ANNOUNCEMENTS, MOCK_CHALLENGES } from './constants';

// Fixed: Moved PageWrapper outside the App component and used React.FC to properly handle the children prop in TypeScript
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-24 md:pb-12 animate-in fade-in duration-500">
    {children}
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteerApps, setVolunteerApps] = useState<VolunteerApplication[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    platformName: 'InnoSpark',
    primaryColor: '#10b981', 
    logoUrl: ''
  });

  const [currentView, setView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleNavigate = (view: string) => {
    setSelectedProjectId(null);
    setSelectedStoryId(null);
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStory = (id: string) => {
    setSelectedStoryId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalBack = () => {
    if (selectedProjectId || selectedStoryId) {
      setSelectedProjectId(null);
      setSelectedStoryId(null);
    } else if (currentView !== 'home') {
      setView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--primary-hover', settings.primaryColor + 'EE');
    document.title = `${settings.platformName} - Elevate Innovation`;
  }, [settings]);

  const handleDonation = (projectId: string, amount: number, isRecurring: boolean) => {
    const newDonation: Donation = {
      id: `d-${Date.now()}`,
      projectId,
      amount,
      donorName: user?.name || 'Public Donor',
      isRecurring,
      timestamp: new Date().toISOString()
    };
    setDonations([...donations, newDonation]);
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, currentFunding: p.currentFunding + amount, donorsCount: p.donorsCount + 1 } : p
    ));
    alert(`Terima kasih! Dukungan Rp ${amount.toLocaleString('id-ID')} berhasil disalurkan.`);
  };

  const handleUpdateUserRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
      alert(`Account Updated: You are now a ${newRole}. Enjoy full access!`);
    }
  };

  const renderContent = () => {
    if (selectedProjectId) {
      const p = projects.find(proj => proj.id === selectedProjectId);
      return p ? (
        <PageWrapper>
          <ProjectDetail 
            project={p} 
            user={user} 
            onBack={() => setSelectedProjectId(null)} 
            onDonation={(amount, isRecurring) => handleDonation(p.id, amount, isRecurring)} 
            onVolunteer={(sid, pitch) => alert('Application Sent!')}
          />
        </PageWrapper>
      ) : null;
    }

    if (selectedStoryId || currentView === 'news') {
      const news = selectedStoryId ? MOCK_ANNOUNCEMENTS.find(n => n.id === selectedStoryId) : null;
      return (
        <PageWrapper>
          <StoryPortal 
            story={news} 
            onBack={handleGlobalBack} 
            onStartInnovation={() => handleNavigate('innovate')} 
          />
        </PageWrapper>
      );
    }

    switch(currentView) {
      case 'dashboard':
        return user ? (
          <PageWrapper>
            <UserDashboard user={user} projects={projects} donations={donations} volunteerApps={volunteerApps} onViewProject={handleOpenProject} />
          </PageWrapper>
        ) : (
          <PageWrapper>
            <StoryPortal onBack={() => handleNavigate('home')} onStartInnovation={() => handleNavigate('innovate')} />
          </PageWrapper>
        );
      case 'admin':
        return <AdminCMS projects={projects} users={users} donations={donations} volunteerApps={volunteerApps} settings={settings} onUpdateProject={(id, s) => {}} onUpdateUser={() => {}} onUpdateVolunteerApp={() => {}} onSaveBranding={setSettings} />;
      case 'innovate':
        return <PageWrapper><Innovate user={user} onSubmit={(d) => {}} onLoginRedirect={() => setView('login')} /></PageWrapper>;
      case 'corporate':
        return (
          <PageWrapper>
            <CollaborationHub 
              challenges={MOCK_CHALLENGES} 
              user={user} 
              onLoginRedirect={() => setView('login')} 
              onRoleUpdate={handleUpdateUserRole}
            />
          </PageWrapper>
        );
      case 'login':
      case 'register':
        return <PageWrapper><Auth mode={currentView as any} onAuthSuccess={(u) => { setUser(u); setView('dashboard'); }} onSwitchMode={setView} /></PageWrapper>;
      default:
        return (
          <PageWrapper>
            <div className="mt-2 md:mt-0">
              <NewsSlider 
                announcements={MOCK_ANNOUNCEMENTS} 
                onStartInnovation={() => handleNavigate('innovate')}
                onViewStory={handleOpenStory}
              />
            </div>
            
            <div className="flex flex-col space-y-6 md:space-y-10 mb-16 pt-8 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Innovations</h2>
                  <p className="text-slate-500 text-sm font-medium">Explore and support the next generation of solutions.</p>
                </div>
                <div className="grid grid-cols-2 md:flex md:items-center gap-3">
                    <button 
                      onClick={() => handleNavigate('innovate')}
                      className="whitespace-nowrap px-6 py-4 bg-emerald-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-2xl active-tap shadow-lg shadow-emerald-500/10"
                    >
                      START PROJECT
                    </button>
                    <button 
                      onClick={() => handleNavigate('corporate')}
                      className="whitespace-nowrap px-6 py-4 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-2xl active-tap"
                    >
                      COLLABORATE
                    </button>
                </div>
              </div>

              <div className="w-full relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search for innovations..." 
                  className="w-full pl-16 pr-6 py-4.5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm font-bold text-slate-700 shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === 'All' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'
                  }`}
                >
                  ALL
                </button>
                {Object.values(ProjectCategory).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                      selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {projects
                .filter(p => p.status === ProjectStatus.ACTIVE)
                .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(p => <ProjectCard key={p.id} project={p} onClick={() => handleOpenProject(p.id)} />)
              }
            </div>
          </PageWrapper>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] selection:bg-emerald-500 selection:text-white relative">
      <Navigation 
        user={user} 
        currentView={currentView} 
        settings={settings}
        setView={handleNavigate} 
        onLogout={() => { setUser(null); handleNavigate('home'); }} 
      />
      
      {renderContent()}

      {(selectedProjectId || selectedStoryId || currentView !== 'home') && (
        <div className="fixed bottom-24 right-6 z-[100] md:bottom-10 md:left-10">
          <button 
            onClick={handleGlobalBack}
            className="w-12 h-12 bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-2xl flex items-center justify-center text-slate-400 active-tap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
