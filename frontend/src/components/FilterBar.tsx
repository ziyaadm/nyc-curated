import { useState, useEffect } from 'react';
import type { PlacesFilters } from '../types';

interface FilterBarProps {
  filters: PlacesFilters;
  onFiltersChange: (filters: PlacesFilters) => void;
  categories: string[];
}

const categoryConfig: Record<string, { emoji: string; color: string }> = {
  coffee: { emoji: '☕', color: 'from-amber-400 to-orange-500' },
  food: { emoji: '🍕', color: 'from-red-400 to-pink-500' },
  parks: { emoji: '🌳', color: 'from-green-400 to-emerald-500' },
  culture: { emoji: '🎭', color: 'from-purple-400 to-violet-500' },
  drinks: { emoji: '🍸', color: 'from-blue-400 to-cyan-500' },
  shopping: { emoji: '🛍️', color: 'from-pink-400 to-rose-500' },
  other: { emoji: '📍', color: 'from-gray-400 to-slate-500' },
};

export const FilterBar = ({ filters, onFiltersChange, categories }: FilterBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Consider "scrolled" after hero section (roughly 100vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div id="places-section" className={`sticky top-20 z-40 transition-all duration-300 ${
      isScrolled ? 'mb-6' : 'mb-12'
    }`}>
      {/* Glass Container */}
      <div className={`bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl transition-all duration-300 ${
        isScrolled ? 'p-4 rounded-2xl' : 'p-6 rounded-3xl'
      }`}>
        <div className={`transition-all duration-300 ${
          isScrolled ? 'space-y-3' : 'space-y-6'
        }`}>
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className={`text-white/60 fill-none stroke-currentColor viewBox-0-0-24-24 ${
                isScrolled ? 'h-4 w-4' : 'h-5 w-5'
              }`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0314 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={isScrolled ? "Search..." : "Search places, notes, or neighborhoods..."}
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full pr-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:bg-white/15 focus:border-white/40 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 ${
                isScrolled 
                  ? 'pl-10 py-2.5 rounded-xl text-sm' 
                  : 'pl-12 py-4 rounded-2xl'
              }`}
            />
            {filters.search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors duration-200"
              >
                <svg className={`fill-none stroke-currentColor viewBox-0-0-24-24 ${
                  isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                }`}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div>
            {!isScrolled && (
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">🏷️</span>
                Explore by Category
              </h3>
            )}
            <div className={`flex flex-wrap transition-all duration-300 ${
              isScrolled ? 'gap-2' : 'gap-3'
            }`}>
              {/* All Categories Button */}
              <button
                onClick={clearFilters}
                className={`group relative font-semibold transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'px-3 py-1.5 rounded-xl text-sm' 
                    : 'px-6 py-3 rounded-2xl'
                } ${
                  !filters.category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/15 hover:border-white/30'
                }`}
              >
                <span className={`relative z-10 flex items-center ${
                  isScrolled ? 'space-x-1' : 'space-x-2'
                }`}>
                  <span className={isScrolled ? 'text-xs' : ''}>✨</span>
                  <span>All</span>
                </span>
                {!filters.category && (
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur opacity-20 ${
                    isScrolled ? 'rounded-xl' : 'rounded-2xl'
                  }`} />
                )}
              </button>

              {/* Category Buttons */}
              {categories.map((category) => {
                const config = categoryConfig[category] || categoryConfig.other;
                const isActive = filters.category === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`group relative font-semibold transition-all duration-300 hover:scale-105 capitalize ${
                      isScrolled 
                        ? 'px-3 py-1.5 rounded-xl text-sm' 
                        : 'px-6 py-3 rounded-2xl'
                    } ${
                      isActive
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                        : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/15 hover:border-white/30'
                    }`}
                  >
                    <span className={`relative z-10 flex items-center ${
                      isScrolled ? 'space-x-1' : 'space-x-2'
                    }`}>
                      <span className={isScrolled ? 'text-sm' : 'text-lg'}>{config.emoji}</span>
                      <span>{category}</span>
                    </span>
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${config.color} blur opacity-20 ${
                        isScrolled ? 'rounded-xl' : 'rounded-2xl'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.search || filters.category) && (
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <span className="text-white/70 text-sm">Active filters:</span>
                <div className="flex items-center space-x-2">
                  {filters.search && (
                    <span className="px-3 py-1 bg-yellow-400/20 text-yellow-200 rounded-full text-sm border border-yellow-400/30">
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters.category && (
                    <span className="px-3 py-1 bg-purple-400/20 text-purple-200 rounded-full text-sm border border-purple-400/30 capitalize">
                      Category: {filters.category}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};