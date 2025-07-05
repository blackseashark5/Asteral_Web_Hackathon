import React from 'react';
import { Calendar, Bot, Clock, Telescope, Sun, Star, Globe, Sparkles } from 'lucide-react';

interface HomeProps {
  setActiveSection?: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const handleCardClick = (section: string) => {
    if (setActiveSection) {
      setActiveSection(section);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="text-center z-10 max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="section-heading animate-pulse text-shadow-glow">
              Cosmic Explorer
            </h1>
            <p className="section-subheading px-4 max-w-4xl mx-auto">
              Journey through the infinite cosmos with real-time data and immersive experiences
            </p>
          </header>

          <section aria-label="Navigation Cards" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => handleCardClick('today')}
              role="button"
              tabIndex={0}
              aria-label="Today's Events - Live space history"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick('today');
                }
              }}
            >
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:animate-bounce transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Today's Events</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Live space history</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => window.open('https://extraordinary-licorice-8c4294.netlify.app/', '_blank')}
              role="button"
              tabIndex={0}
              aria-label="Constellations - Interactive star maps (opens in new tab)"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open('https://extraordinary-licorice-8c4294.netlify.app/', '_blank');
                }
              }}
            >
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-4 group-hover:animate-spin transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Constellations</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Interactive star maps</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => window.open('https://helpful-sprinkles-3ea672.netlify.app/', '_blank')}
              role="button"
              tabIndex={0}
              aria-label="Planets - Explore worlds (opens in new tab)"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open('https://helpful-sprinkles-3ea672.netlify.app/', '_blank');
                }
              }}
            >
              <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mx-auto mb-4 group-hover:animate-pulse transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Planets</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Explore worlds</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => window.open('https://scintillating-liger-0ff9a4.netlify.app/', '_blank')}
              role="button"
              tabIndex={0}
              aria-label="Earth Explorer - Our home planet (opens in new tab)"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.open('https://scintillating-liger-0ff9a4.netlify.app/', '_blank');
                }
              }}
            >
              <Telescope className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Earth Explorer</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Our home planet</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => handleCardClick('timeline')}
              role="button"
              tabIndex={0}
              aria-label="3D Timeline - Immersive history"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick('timeline');
                }
              }}
            >
              <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400 mx-auto mb-4 group-hover:animate-spin transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">3D Timeline</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Immersive history</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer"
              onClick={() => handleCardClick('chatbot')}
              role="button"
              tabIndex={0}
              aria-label="Space AI - Virtual historian"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick('chatbot');
                }
              }}
            >
              <Bot className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400 mx-auto mb-4 group-hover:animate-pulse transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Space AI</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Virtual historian</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer opacity-75"
              onClick={() => handleCardClick('galaxy')}
              role="button"
              tabIndex={0}
              aria-label="Galaxy - Coming soon"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick('galaxy');
                }
              }}
            >
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-amber-400 mx-auto mb-4 group-hover:animate-pulse transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Galaxy</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Coming soon</p>
            </article>
            
            <article 
              className="cosmic-card cosmic-glow group cursor-pointer opacity-75"
              onClick={() => handleCardClick('solar-system')}
              role="button"
              tabIndex={0}
              aria-label="Solar System - Coming soon"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick('solar-system');
                }
              }}
            >
              <Sun className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-4 group-hover:animate-bounce transition-all duration-300" aria-hidden="true" />
              <h3 className="text-white font-bold mb-2 text-sm sm:text-base">Solar System</h3>
              <p className="descriptive-text-secondary text-xs sm:text-sm">Coming soon</p>
            </article>
          </section>

          {/* Featured Today Section */}
          <section className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-8 sm:p-10 mb-12 cosmic-glow">
            <header className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 animate-pulse" aria-hidden="true" />
                <span>Today in Space History</span>
              </h2>
              <p className="descriptive-text text-lg leading-relaxed max-w-3xl mx-auto">
                Discover what happened on this day in space exploration history, view NASA's Astronomy Picture of the Day, and get real-time astronomical events for your location.
              </p>
            </header>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-blue-600/30 text-blue-200 px-6 py-3 rounded-full text-sm font-semibold border border-blue-500/30">
                🚀 Historical Events
              </span>
              <span className="bg-purple-600/30 text-purple-200 px-6 py-3 rounded-full text-sm font-semibold border border-purple-500/30">
                📸 NASA APOD
              </span>
              <span className="bg-green-600/30 text-green-200 px-6 py-3 rounded-full text-sm font-semibold border border-green-500/30">
                🌅 Sky Events
              </span>
              <span className="bg-amber-600/30 text-amber-200 px-6 py-3 rounded-full text-sm font-semibold border border-amber-500/30">
                📅 Calendar Export
              </span>
            </div>
            
            <button
              onClick={() => handleCardClick('today')}
              className="cosmic-button text-lg px-8 py-4"
              aria-label="Explore Today's Events"
            >
              Explore Today's Events
            </button>
          </section>

          <div className="cosmic-separator"></div>

          <footer className="space-y-6 px-4">
            <blockquote className="text-center">
              <p className="descriptive-text text-lg sm:text-xl italic leading-relaxed">
                "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
              </p>
              <cite className="descriptive-text-secondary text-base sm:text-lg font-medium block mt-4">
                — Carl Sagan
              </cite>
            </blockquote>
          </footer>
        </div>

        {/* Enhanced floating cosmic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-20 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 left-10 w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-10 w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-float"></div>
        </div>
      </main>
    </>
  );
};

export default Home;