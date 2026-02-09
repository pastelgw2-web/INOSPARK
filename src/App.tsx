/* BUILD_ID: REFRESH_SYSTEM_V2_2026 */
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import NewsSlider from './components/NewsSlider';
import ProjectDetail from './pages/ProjectDetail';
import Auth from './pages/Auth';
import CollaborationHub from './pages/CollaborationHub';
import Innovate from './pages/Innovate';
import { Project, User } from './types';

// Import data dari file mockData yang sudah Anda buat tadi
import { MOCK_PROJECTS, MOCK_ANNOUNCEMENTS, MOCK_CHALLENGES } from './mockData';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
    {children}
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setView] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // JAMINAN ARRAY: Kode ini memastikan 'length' tidak akan pernah undefined
  const projects = Array.isArray(MOCK_PROJECTS) ? MOCK_PROJECTS : [];
  const announcements = Array.isArray(MOCK_ANNOUNCEMENTS) ? MOCK_ANNOUNCEMENTS : [];
  const challenges = Array.isArray(MOCK_CHALLENGES) ? MOCK_CHALLENGES : [];

  const renderContent = () => {
    if (selectedProjectId) {
      const p = projects.find(proj => proj.id === selectedProjectId);
      return p ? <ProjectDetail project={p} onBack={() => setSelectedProjectId(null)} /> : null;
    }

    switch (currentView) {
      case 'corporate':
        return <PageWrapper><CollaborationHub challenges={challenges} user={user} onJoinChallenge={() => {}} /></PageWrapper>;
      case 'innovate':
        return <PageWrapper><Innovate user={user} onSubmit={() => {}} onLoginRedirect={() => setView('login')} /></PageWrapper>;
      case 'login':
        return <PageWrapper><Auth onLogin={(u) => { setUser(u); setView('home'); }} onBack={() => setView('home')} /></PageWrapper>;
      default:
        // FILTER DENGAN PROTEKSI TOTAL
        const filtered = projects.filter(p => {
          const title = p && p.title ? String(p.title) : "";
          return title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return (
          <>
            <NewsSlider items={announcements} onOpenStory={() => {}} />
            <PageWrapper>
              <div className="mb-8">
                <input 
                  type="text" 
                  placeholder="Cari inovasi di InnoSpark..." 
                  className="w-full p-4 rounded-2xl border shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filtered.length > 0 ? (
                  filtered.map(p => (
                    <ProjectCard key={p.id} project={p} onClick={() => setSelectedProjectId(p.id)} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-20 text-gray-400">
                    Belum ada data proyek tersedia saat ini.
                  </div>
                )}
              </div>
            </PageWrapper>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation onNavigate={setView} platformName="InnoSpark" />
      <main>{renderContent()}</main>
    </div>
  );
};

export default App;
