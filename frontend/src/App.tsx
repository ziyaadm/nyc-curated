import { useState, useMemo, useEffect } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { PlaceCard } from './components/PlaceCard';
import { FilterBar } from './components/FilterBar';
import { Hero } from './components/Hero';
import type { PlacesFilters } from './types';

function App() {
  const [filters, setFilters] = useState<PlacesFilters>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const { data, isLoading, error } = usePlaces(filters);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Client-side search filtering for places
  const filteredPlaces = useMemo(() => {
    if (!data?.places || !filters.search) return data?.places || [];
    
    const searchTerm = filters.search.toLowerCase();
    return data.places.filter(place => 
      place.name.toLowerCase().includes(searchTerm) ||
      place.note.toLowerCase().includes(searchTerm) ||
      place.neighborhood.toLowerCase().includes(searchTerm)
    );
  }, [data?.places, filters.search]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-white/80">Failed to load places. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🗽</span>
              </div>
              <h1 className="text-xl font-bold text-white">NYC Curated</h1>
            </div>
            <div className="text-sm text-white/70">
              {data?.total || 179} spots
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          categories={data?.categories || []}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-transparent border-t-purple-400 border-r-pink-400"></div>
              <p className="mt-4 text-white/80 text-lg">Discovering amazing places...</p>
            </div>
          </div>
        )}

        {/* Places Grid */}
        {!isLoading && filteredPlaces && (
          <>
            <div className="mb-8 text-center">
              <p className="text-white/80 text-lg">
                Showing <span className="text-purple-300 font-semibold">{filteredPlaces.length}</span> places
                {filters.category && (
                  <span className="text-pink-300">{` in ${filters.category}`}</span>
                )}
                {filters.search && (
                  <span className="text-yellow-300">{` matching "${filters.search}"`}</span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {filteredPlaces.map((place, index) => (
                <div 
                  key={place.placeId} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No places found</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Try adjusting your search or filters to discover more amazing spots.
                  </p>
                  <button 
                    onClick={() => setFilters({})}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-105 transition-all duration-300 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative mt-20">
        <div className="bg-black/20 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🗽</span>
                </div>
                <span className="text-white font-semibold">NYC Curated</span>
              </div>
              <p className="text-white/80 mb-2">Made with ❤️ for friends and family exploring NYC</p>
              <p className="text-white/60 text-sm">
                🤖 Generated with{' '}
                <a 
                  href="https://claude.ai/code" 
                  className="text-purple-300 hover:text-purple-200 transition-colors duration-200"
                >
                  Claude Code
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;