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
    logoUrl: 'https://placehold.co/200x50?text=InnoSpark'
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
    if (settings) {
      const color = settings.primaryColor || '#10b981';
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--primary-hover', color + 'EE');
      document.title = `${settings.platformName || 'InnoSpark'} - Elevate Innovation`;
    }
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
        return (
          <div className="pt-20">
            <AdminCMS projects={projects} users={users} donations={donations} volunteerApps={volunteerApps} settings={settings} onUpdateProject={(id, s) => {}} onUpdateUser={() => {}} onUpdateVolunteerApp={() => {}} onSaveBranding={setSettings} />
          </div>
        );
      case 'innovate':
        return <PageWrapper><Innovate user={user} onSubmit={(d) => {}} onLoginRedirect={() => setView('login')} /></PageWrapper>;
      case 'corporate':
        return (
          <PageWrapper>
            <CollaborationHub challenges={MOCK_CHALLENGES} user={user} onJoinChallenge={(id) => alert('Joined!')} />
          </PageWrapper>
        );
      case 'login':
        return <PageWrapper><Auth onLogin={(u) => { setUser(u); setView('home'); }} onBack={() => setView('home')} /></PageWrapper>;
      default:
        const filteredProjects = projects.filter(p => 
          (selectedCategory === 'All' || p.category === selectedCategory) &&
          (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return (
          <>
            <NewsSlider items={MOCK_ANNOUNCEMENTS} onOpenStory={handleOpenStory} />
            <PageWrapper>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Cari inovasi..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[var(--primary-color)] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {['All', 'Technology', 'Social', 'Green', 'Creative'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-[var(--primary-color)] text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => handleOpenProject(project.id)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                  <div className="text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ditemukan hasil</h3>
                  <p className="text-gray-500">Coba gunakan kata kunci atau kategori lain.</p>
                </div>
              )}
            </PageWrapper>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation 
        user={user} 
        onNavigate={handleNavigate} 
        platformName={settings.platformName}
        logoUrl={settings.logoUrl}
      />
      
      <main className="transition-all duration-300">
        {renderContent()}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => handleNavigate('home')} className={`p-2 ${currentView === 'home' ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button onClick={() => handleNavigate('innovate')} className="p-3 bg-[var(--primary-color)] text-white rounded-2xl shadow-lg -translate-y-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
        <button onClick={() => handleNavigate('dashboard')} className={`p-2 ${currentView === 'dashboard' ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
