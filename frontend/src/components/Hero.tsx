export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
            <span className="text-2xl">🗽</span>
            <span className="text-white/90 font-medium">Discover NYC</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight">
          NYC
          <br />
          <span className="text-4xl md:text-6xl font-light">Curated</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
          179+ personally curated spots across New York City
          <br />
          <span className="text-lg text-white/60">From hidden gems to iconic landmarks</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => document.getElementById('places-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <span className="relative z-10">Explore Places</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <div className="flex items-center space-x-4 text-white/70">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">☕</span>
              <span>Coffee</span>
            </div>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍕</span>
              <span>Food</span>
            </div>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎭</span>
              <span>Culture</span>
            </div>
          </div>
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