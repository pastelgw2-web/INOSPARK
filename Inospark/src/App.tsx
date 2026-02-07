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
  
  // Perbaikan: Inisialisasi settings dengan placeholder agar tidak blank
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
    // Perbaikan: Pengecekan safety untuk menghindari error CSS Variable
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
                <div className="relative flex