# Hero Component Code

```tsx
import { useState, useEffect } from 'react';

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Free NYC images from Unsplash (all have proper attribution and are free to use)
  const nycImages = [
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&h=1080&fit=crop&auto=format&q=80', // NYC skyline
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920&h=1080&fit=crop&auto=format&q=80', // Brooklyn Bridge
    'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=1920&h=1080&fit=crop&auto=format&q=80', // NYC at night
    'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1920&h=1080&fit=crop&auto=format&q=80', // Manhattan Bridge
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop&auto=format&q=80', // Central Park
    'https://images.unsplash.com/photo-1485871981521-5b1fd3805b6d?w=1920&h=1080&fit=crop&auto=format&q=80', // Times Square
    'https://images.unsplash.com/photo-1494982300860-e8dc6c9c7a4e?w=1920&h=1080&fit=crop&auto=format&q=80', // Brooklyn brownstones
    'https://images.unsplash.com/photo-1577729842275-a6b6b70b1db9?w=1920&h=1080&fit=crop&auto=format&q=80', // Brooklyn Heights promenade
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % nycImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [nycImages.length]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* NYC Background Images */}
      <div className="absolute inset-0">
        {nycImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        
        {/* Enhanced overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-3 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 mb-6 shadow-2xl">
            <span className="text-2xl">🗽</span>
            <span className="text-white font-medium">Discover NYC</span>
          </div>
        </div>
        
        {/* Enhanced title with better contrast */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl -m-4"></div>
          <h1 className="relative text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">NYC</span>
            <br />
            <span className="text-4xl md:text-6xl font-light drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Curated</span>
          </h1>
        </div>
        
        {/* Enhanced description with background */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl -m-3"></div>
          <p className="relative text-xl md:text-2xl text-white mb-0 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            <span className="font-semibold">179+ personally curated spots</span> across New York City
            <br />
            <span className="text-lg text-white/90 drop-shadow-md">From hidden gems to iconic landmarks</span>
          </p>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => document.getElementById('places-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <span className="relative z-10">Explore Places</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
```