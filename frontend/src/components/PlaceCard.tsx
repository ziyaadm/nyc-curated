import type { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

const categoryConfig: Record<string, { color: string; gradient: string; icon: string }> = {
  coffee: { 
    color: 'from-amber-400 to-orange-500', 
    gradient: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30', 
    icon: '☕' 
  },
  food: { 
    color: 'from-red-400 to-pink-500', 
    gradient: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30', 
    icon: '🍕' 
  },
  parks: { 
    color: 'from-green-400 to-emerald-500', 
    gradient: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30', 
    icon: '🌳' 
  },
  culture: { 
    color: 'from-purple-400 to-violet-500', 
    gradient: 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 border-purple-400/30', 
    icon: '🎭' 
  },
  drinks: { 
    color: 'from-blue-400 to-cyan-500', 
    gradient: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30', 
    icon: '🍸' 
  },
  shopping: { 
    color: 'from-pink-400 to-rose-500', 
    gradient: 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-400/30', 
    icon: '🛍️' 
  },
  other: { 
    color: 'from-gray-400 to-slate-500', 
    gradient: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-400/30', 
    icon: '📍' 
  },
};

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const config = categoryConfig[place.category] || categoryConfig.other;

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
      
      {/* Main Card - Fixed Height */}
      <div className="relative h-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 hover:bg-white/15 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/30 flex flex-col">
        
        {/* Header Section - Fixed Height */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${config.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-sm">{config.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1 mb-0.5">
                {Array.from({ length: place.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${config.gradient} text-white capitalize`}>
                {place.category}
              </span>
            </div>
          </div>
        </div>

        {/* Place Name - Fixed Height */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 h-14 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 leading-tight">
          {place.name}
        </h3>
        
        {/* Neighborhood - Fixed Height */}
        <div className="flex items-center space-x-2 mb-3 h-6">
          <span className="text-white/60 text-xs">📍</span>
          <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20 truncate">
            {place.neighborhood}
          </span>
        </div>

        {/* Content Area - Flexible Height */}
        <div className="flex-1 mb-3 min-h-0">
          {/* Personal Note - Always Reserve Space */}
          <div className="h-20 mb-2">
            {place.note ? (
              <div className="h-full p-2.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl border border-yellow-400/30 overflow-hidden">
                <div className="flex items-start space-x-2 h-full">
                  <span className="text-yellow-300 text-xs mt-0.5 flex-shrink-0">💭</span>
                  <p className="text-yellow-100 text-xs font-medium leading-tight line-clamp-4 overflow-hidden">
                    {place.note}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-white/30 text-xs italic">No personal note</span>
              </div>
            )}
          </div>

          {/* Distance - Always Reserve Space */}
          <div className="h-5 flex items-center">
            {place.distance ? (
              <div className="flex items-center space-x-2">
                <span className="text-blue-300 text-xs">🚶‍♂️</span>
                <span className="text-white/70 text-xs">
                  {place.distance.toFixed(1)} miles away
                </span>
              </div>
            ) : (
              <span className="text-white/30 text-xs italic">Distance unknown</span>
            )}
          </div>
        </div>

        {/* Action Button - Fixed Height at Bottom */}
        <a
          href={place.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 text-sm"
        >
          <span className="mr-2">View on Maps</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          
          {/* Button Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
        </a>
      </div>
    </div>
  );
};