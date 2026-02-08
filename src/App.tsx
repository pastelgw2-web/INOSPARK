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
import { Project, User, Donation, SiteSettings, VolunteerApplication } from './types';
// Import data MOCK dengan proteksi fallback array kosong
import { MOCK_PROJECTS, MOCK_USERS, MOCK_ANNOUNCEMENTS, MOCK_CHALLENGES } from './constants';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-24 md:pb-12 animate-in fade-in duration-500">
    {children}
  </div>
);

const App: React.FC = () => {
  // PENGAMAN: Jika konstanta tidak ditemukan, aplikasi tidak akan crash
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS || []);
  const [users] = useState<User[]>(MOCK_USERS || []);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteerApps] = useState<VolunteerApplication[]>([]);
  
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

  const renderContent = () => {
    if (selectedProjectId) {
      const p = projects.find(proj => proj.id === selectedProjectId);
      return p ? (
        <PageWrapper>
          <ProjectDetail project={p} user={user} onBack={() => setSelectedProjectId(null)} onDonation={() => {}} onVolunteer={() => {}} />
        </PageWrapper>
      ) : null;
    }

    if (selectedStoryId || currentView === 'news') {
      const news = selectedStoryId ? (MOCK_ANNOUNCEMENTS || []).find(n => n.id === selectedStoryId) : null;
      return (
        <PageWrapper>
          <StoryPortal story={news} onBack={handleGlobalBack} onStartInnovation={() => handleNavigate('innovate')} />
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
            <AdminCMS projects={projects} users={users} donations={donations} volunteerApps={volunteerApps} settings={settings} onUpdateProject={() => {}} onUpdateUser={() => {}} onUpdateVolunteerApp={() => {}} onSaveBranding={setSettings} />
          </div>
        );
      case 'innovate':
        return <PageWrapper><Innovate user={user} onSubmit={() => {}} onLoginRedirect={() => setView('login')} /></PageWrapper>;
      case 'corporate':
        return (
          <PageWrapper>
            <CollaborationHub challenges={MOCK_CHALLENGES || []} user={user} onJoinChallenge={() => {}} />
          </PageWrapper>
        );
      case 'login':
        return <PageWrapper><Auth onLogin={(u) => { setUser(u); setView('home'); }} onBack={() => setView('home')} /></PageWrapper>;
      default:
        // PENGAMAN: Filter hanya berjalan jika projects ada
        const filteredProjects = (projects || []).filter(p => 
          (selectedCategory === 'All' || p.category === selectedCategory) &&
          (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return (
          <>
            <NewsSlider items={MOCK_ANNOUNCEMENTS || []} onOpenStory={handleOpenStory} />
            <PageWrapper>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Cari inovasi..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[var(--primary-color)]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {['All', 'Technology', 'Social', 'Environment', 'Education'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-xl font-medium transition-all ${selectedCategory === cat ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => handleOpenProject(project.id)} />
                ))}
              </div>
            </PageWrapper>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation user={user} onNavigate={handleNavigate} platformName={settings.platformName} logoUrl={settings.logoUrl} />
      <main className="transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
