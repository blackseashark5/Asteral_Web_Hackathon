import React, { useState } from 'react';
import { Home, Calendar, Bot, Clock, Telescope, Sun, ExternalLink, Menu, X, Star, Globe, User, Trophy, Rocket, Video, Brain, Settings, Gamepad2, Users, Map, Headphones, Zap, Award, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onShowAuth: () => void;
  onShowQuiz: () => void;
  onShowFutureMissions: () => void;
  onShowAchievements: () => void;
  onShowSpacecraft: (spacecraft: string) => void;
  onShowLiveFeeds: () => void;
  onShowMissionJourney: () => void;
  onShowMissionControl: () => void;
  onShowAvatarCustomizer: () => void;
  onShowLeaderboard: () => void;
  onShowGames: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  setActiveSection,
  onShowAuth,
  onShowQuiz,
  onShowFutureMissions,
  onShowAchievements,
  onShowSpacecraft,
  onShowLiveFeeds,
  onShowMissionJourney,
  onShowMissionControl,
  onShowAvatarCustomizer,
  onShowLeaderboard,
  onShowGames
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, theme, toggleTheme } = useAppContext();

  const navItems = [
    { id: 'home', label: 'Mission Control', icon: Home, type: 'internal' },
    { id: 'today', label: 'Today\'s Events', icon: Calendar, type: 'internal', tutorial: 'today-events' },
    { id: 'charts', label: 'Astronomical Charts', icon: BarChart3, type: 'internal', tutorial: 'charts' },
    { id: 'skymap', label: 'Sky Map', icon: Map, type: 'internal', tutorial: 'skymap' },
    { id: 'timeline', label: '3D Timeline', icon: Clock, type: 'internal', tutorial: 'timeline' },
    { id: 'chatbot', label: 'Space AI', icon: Bot, type: 'internal', tutorial: 'chatbot' },
    { id: 'galaxy', label: 'Galaxy', icon: Telescope, type: 'internal' },
    { id: 'solar-system', label: 'Solar System', icon: Sun, type: 'internal' },
  ];

  const externalLinks = [
    { 
      id: 'constellation-explorer', 
      label: 'Constellation Explorer', 
      icon: Star, 
      url: 'https://extraordinary-licorice-8c4294.netlify.app/',
      type: 'external'
    },
    { 
      id: 'earth-explorer', 
      label: 'Earth Explorer', 
      icon: Globe, 
      url: 'https://scintillating-liger-0ff9a4.netlify.app/',
      type: 'external'
    },
    { 
      id: 'planet-explorer', 
      label: 'Planet Explorer', 
      icon: Telescope, 
      url: 'https://helpful-sprinkles-3ea672.netlify.app/',
      type: 'external'
    },
  ];

  const interactiveTools = [
    { id: 'quiz', label: 'Space Quiz', icon: Brain, action: onShowQuiz },
    { id: 'games', label: 'Space Games', icon: Gamepad2, action: onShowGames },
    { id: 'missions', label: 'Future Missions', icon: Rocket, action: onShowFutureMissions },
    { id: 'achievements', label: 'Achievements', icon: Trophy, action: onShowAchievements },
    { id: 'live-feeds', label: 'Live Feeds', icon: Video, action: onShowLiveFeeds },
    { id: 'mission-journey', label: 'Mission Journeys', icon: Gamepad2, action: onShowMissionJourney },
    { id: 'mission-control', label: 'Mission Control', icon: Settings, action: onShowMissionControl },
    { id: 'avatar-customizer', label: 'Astronaut Avatar', icon: User, action: onShowAvatarCustomizer },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users, action: onShowLeaderboard },
  ];

  const spacecraftModels = [
    { id: 'spacecraft-iss', label: '3D ISS Model', icon: Settings, action: () => onShowSpacecraft('iss') },
    { id: 'spacecraft-apollo', label: '3D Apollo Model', icon: Rocket, action: () => onShowSpacecraft('apollo') },
    { id: 'spacecraft-rover', label: '3D Mars Rover', icon: Map, action: () => onShowSpacecraft('mars-rover') },
  ];

  const handleNavigation = (item: any) => {
    if (item.type === 'external') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.action) {
      item.action();
    } else {
      setActiveSection(item.id);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(item);
    }
  };

  return (
    <>
      {/* Top Header Bar - Mobile Only */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-blue-500/20">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Star className="w-7 h-7 text-blue-400 animate-pulse" aria-hidden="true" />
            <span className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cosmic Explorer
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Left Sidebar - Desktop */}
      <motion.nav 
        className={`hidden lg:flex fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-blue-500/20 shadow-2xl z-50 flex-col transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-80'
        }`}
        role="navigation" 
        aria-label="Main navigation"
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className={`p-6 border-b border-gray-700/50 ${isCollapsed ? 'px-4' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
              <Star className="w-8 h-8 text-blue-400 animate-pulse" aria-hidden="true" />
              {!isCollapsed && (
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Cosmic Explorer
                </span>
              )}
            </div>
            {!isCollapsed && (
              <p className="text-sm text-gray-400">Journey through the infinite cosmos</p>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <div className="p-4 border-b border-gray-700/50">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Search and Controls */}
          {!isCollapsed && (
            <div className="p-4 space-y-4 border-b border-gray-700/50">
              <SearchBar onNavigate={setActiveSection} />
              <div className="flex items-center justify-between">
                <LanguageSelector />
                <button
                  onClick={onShowAuth}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 text-gray-300 hover:bg-purple-600/50 hover:text-white"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{user ? user.username : 'Account'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Collapsed Controls */}
          {isCollapsed && (
            <div className="p-2 space-y-2 border-b border-gray-700/50">
              <button
                onClick={onShowAuth}
                className="w-full flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-purple-600/50 hover:text-white transition-colors"
                title={user ? user.username : 'Account'}
              >
                <User className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Navigation Sections */}
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} space-y-6`}>
            {/* Core Navigation */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">Main Sections</h3>
              )}
              <div className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      className={`w-full text-left ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'} rounded-lg text-sm font-semibold transition-all duration-300 flex items-center ${isCollapsed ? '' : 'space-x-3'} ${
                        activeSection === item.id
                          ? 'bg-blue-600/90 text-white shadow-lg border border-blue-500/50'
                          : 'text-gray-300 hover:bg-blue-600/50 hover:text-white border border-transparent hover:border-blue-500/30'
                      }`}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      data-tutorial={item.tutorial}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Tools */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">Interactive Tools</h3>
              )}
              <div className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
                {interactiveTools.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      className={`w-full text-left ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'} rounded-lg text-sm font-semibold transition-all duration-300 flex items-center ${isCollapsed ? '' : 'space-x-3'} text-gray-300 hover:bg-green-600/50 hover:text-white border border-transparent hover:border-green-500/30`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3D Models */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">3D Models</h3>
              )}
              <div className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
                {spacecraftModels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      className={`w-full text-left ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'} rounded-lg text-sm font-semibold transition-all duration-300 flex items-center ${isCollapsed ? '' : 'space-x-3'} text-gray-300 hover:bg-purple-600/50 hover:text-white border border-transparent hover:border-purple-500/30`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* External Links */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">External Explorers</h3>
              )}
              <div className={`space-y-1 ${isCollapsed ? 'space-y-2' : ''}`}>
                {externalLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      className={`w-full text-left ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'} rounded-lg text-sm font-semibold transition-all duration-300 flex items-center ${isCollapsed ? '' : 'space-x-3'} text-gray-300 hover:bg-indigo-600/50 hover:text-white group border border-transparent hover:border-indigo-500/30`}
                      aria-label={`${item.label} (opens in new tab)`}
                      title={isCollapsed ? `${item.label} (opens in new tab)` : undefined}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-700/50">
            <p className="text-xs text-gray-400 text-center">
              Cosmic Explorer v2.0.0 (2025)
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Exploring the universe, one discovery at a time
            </p>
          </div>
        )}
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 h-full w-full max-w-sm bg-gray-900/98 backdrop-blur-xl border-r border-blue-500/20 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-blue-400" />
                    <span className="text-xl font-bold text-white">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Search and Controls */}
                  <div className="p-4 space-y-4 border-b border-gray-700/50">
                    <SearchBar onNavigate={setActiveSection} />
                    <div className="flex flex-col space-y-2">
                      <LanguageSelector />
                      <button
                        onClick={() => {
                          onShowAuth();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center space-x-3 text-gray-300 hover:bg-purple-600/50 hover:text-white border border-gray-600/30 hover:border-purple-500/50"
                      >
                        <User className="w-5 h-5" aria-hidden="true" />
                        <span>{user ? user.username : 'Account'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Navigation Sections */}
                  <div className="p-4 space-y-6">
                    {/* Core Navigation */}
                    <div>
                      <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 px-2">Main Sections</h3>
                      <div className="space-y-2">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavigation(item)}
                              onKeyDown={(e) => handleKeyDown(e, item)}
                              className={`w-full text-left px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center space-x-3 border ${
                                activeSection === item.id
                                  ? 'bg-blue-600/90 text-white shadow-lg border-blue-500/50'
                                  : 'text-gray-300 hover:bg-blue-600/50 hover:text-white border-gray-600/30 hover:border-blue-500/50'
                              }`}
                              aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Interactive Tools */}
                    <div>
                      <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 px-2">Interactive Tools</h3>
                      <div className="space-y-2">
                        {interactiveTools.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                item.action();
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center space-x-3 text-gray-300 hover:bg-green-600/50 hover:text-white border border-gray-600/30 hover:border-green-500/50"
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* 3D Models */}
                    <div>
                      <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 px-2">3D Models</h3>
                      <div className="space-y-2">
                        {spacecraftModels.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                item.action();
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center space-x-3 text-gray-300 hover:bg-purple-600/50 hover:text-white border border-gray-600/30 hover:border-purple-500/50"
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* External Links */}
                    <div>
                      <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 px-2">External Explorers</h3>
                      <div className="space-y-2">
                        {externalLinks.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavigation(item)}
                              onKeyDown={(e) => handleKeyDown(e, item)}
                              className="w-full text-left px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center space-x-3 text-gray-300 hover:bg-indigo-600/50 hover:text-white group border border-gray-600/30 hover:border-indigo-500/50"
                              aria-label={`${item.label} (opens in new tab)`}
                            >
                              <Icon className="w-5 h-5" aria-hidden="true" />
                              <span className="flex-1">{item.label}</span>
                              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400 text-center">
                    Cosmic Explorer v2.0.0 (2025)
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Exploring the universe, one discovery at a time
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;