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
// Import data MOCK
import { MOCK_PROJECTS, MOCK_USERS, MOCK_ANNOUNCEMENTS, MOCK_CHALLENGES } from './constants';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-24 md:pb-12">
    {children}
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  // Gunakan fallback array kosong [] jika data undefined
  const [projects] = useState<Project[]>(MOCK_PROJECTS || []);
  const [currentView, setView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const renderContent = () => {
    if (selectedProjectId) {
      const p = projects.find(proj => proj.id === selectedProjectId);
      return p ? <ProjectDetail project={p} onBack={() => setSelectedProjectId(null)} /> : null;
    }

    if (currentView === 'corporate') {
      return (
        <PageWrapper>
          <CollaborationHub challenges={MOCK_CHALLENGES || []} user={user} onJoinChallenge={() => {}} />
        </PageWrapper>
      );
    }

    // PENGAMAN: Gunakan ?.length atau pastikan array tersedia
    const filtered = (projects || []).filter(p => 
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <NewsSlider items={MOCK_ANNOUNCEMENTS || []} onOpenStory={() => {}} />
        <PageWrapper>
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Cari..." 
              className="w-full p-3 rounded-xl border"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map(p => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelectedProjectId(p.id)} />
              ))
            ) : (
              <p className="text-center col-span-3">Tidak ada proyek ditemukan.</p>
            )}
          </div>
        </PageWrapper>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={(v) => setView(v)} platformName="InnoSpark" />
      <main>{renderContent()}</main>
    </div>
  );
};

export default App;
