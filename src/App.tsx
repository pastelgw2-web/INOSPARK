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

      {/* Mobile Navigation Bar */}
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
