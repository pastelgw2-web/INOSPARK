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
    // Menambahkan pengecekan agar tidak error jika settings kosong
    if (settings) {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor || '#10b981');
      document.documentElement.style.setProperty('--primary-hover', (settings.primaryColor || '#10b981') + 'EE');
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
        return <AdminCMS projects={projects} users={users} donations={donations} volunteerApps={volunteerApps} settings={settings} onUpdateProject={(id, s) => {}} onUpdateUser={() => {}} onUpdateVolunteerApp={() => {}} onSaveBranding={setSettings} />;
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
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search innovation..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {['All', 'Social', 'Technology', 'Environment', 'Art'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} onClick={() => handleOpenProject(project.id)} />
                ))}
              </div>
            </PageWrapper>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PERBAIKAN: Menambahkan settings={settings} agar data terkirim ke Navigation */}
      <Navigation 
        user={user} 
        settings={settings}
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onLogout={() => { setUser(null); setView('home'); }} 
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
