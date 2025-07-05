import React, { useState, Suspense } from 'react';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import DynamicParticleBackground from './components/DynamicParticleBackground';
import EnhancedDashboard from './components/EnhancedDashboard';
import TodaysEvents from './components/TodaysEvents';
import SpaceChatbot from './components/SpaceChatbot';
import AstronomicalCharts from './components/AstronomicalCharts';
import SkyMap from './components/SkyMap';
import Footer from './components/Footer';
import Tutorial from './components/Tutorial';
import SearchBar from './components/SearchBar';
import UserAuth from './components/UserAuth';
import Quiz from './components/Quiz';
import FeedbackButton from './components/FeedbackButton';
import FutureMissions from './components/FutureMissions';
import AchievementSystem from './components/AchievementSystem';
import OfflineIndicator from './components/OfflineIndicator';
import SpacecraftViewer from './components/SpacecraftViewer';
import LiveFeeds from './components/LiveFeeds';
import DidYouKnow from './components/DidYouKnow';
import LanguageSelector from './components/LanguageSelector';
import AccessibilityControls from './components/AccessibilityControls';
import AudioControls from './components/AudioControls';
import MissionJourney from './components/MissionJourney';
import MissionControl from './components/MissionControl';
import AvatarCustomizer from './components/AvatarCustomizer';
import Leaderboard from './components/Leaderboard';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PushNotificationManager from './components/PushNotificationManager';
import MicroInteractions from './components/MicroInteractions';
import LazyLoadWrapper, { LazyTimeline3D } from './components/LazyLoadWrapper';
import SEOMetaTags from './components/SEOMetaTags';
import CustomCursor from './components/CustomCursor';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import DriftSnapSidebar from './components/DriftSnapSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useCosmicAnimations } from './hooks/useFramerMotion';
import { Settings, MessageCircle, Star, Volume2, Accessibility } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFutureMissions, setShowFutureMissions] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSpacecraft, setShowSpacecraft] = useState(false);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState('iss');
  const [showLiveFeeds, setShowLiveFeeds] = useState(false);
  const [showMissionJourney, setShowMissionJourney] = useState(false);
  const [showMissionControl, setShowMissionControl] = useState(false);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { pageTransition } = useCosmicAnimations();

  const getParticleMode = () => {
    switch (activeSection) {
      case 'home': return 'nebula';
      case 'today': return 'aurora';
      case 'timeline': return 'solar-wind';
      case 'chatbot': return 'stars';
      case 'charts': return 'comet';
      case 'skymap': return 'stars';
      default: return 'stars';
    }
  };

  const getSEOData = () => {
    switch (activeSection) {
      case 'today':
        return {
          title: "Today's Space Events",
          description: "Discover what happened on this day in space history, view NASA's Astronomy Picture of the Day, and explore current astronomical events.",
          keywords: ['space events', 'NASA APOD', 'astronomy', 'space history', 'today']
        };
      case 'timeline':
        return {
          title: "3D Space Timeline",
          description: "Explore space history in an immersive 3D timeline. Navigate through major space milestones and discoveries.",
          keywords: ['3D timeline', 'space history', 'interactive', 'missions', 'exploration']
        };
      case 'chatbot':
        return {
          title: "Space AI Assistant",
          description: "Chat with our AI space historian about missions, discoveries, and cosmic events. Get instant answers about space exploration.",
          keywords: ['AI assistant', 'space chatbot', 'space questions', 'astronomy help']
        };
      case 'charts':
        return {
          title: "Astronomical Charts",
          description: "Interactive astronomical data visualization with real-time charts and analytics for space exploration.",
          keywords: ['astronomical charts', 'space data', 'visualization', 'analytics', 'real-time']
        };
      case 'skymap':
        return {
          title: "Interactive Sky Map",
          description: "Real-time night sky view with constellations, planets, and satellites from your location.",
          keywords: ['sky map', 'constellations', 'night sky', 'astronomy', 'stargazing']
        };
      default:
        return {};
    }
  };

  // Sidebar items configuration
  const sidebarItems = [
    {
      id: 'feedback',
      icon: MessageCircle,
      label: 'Send Feedback',
      action: () => {/* Trigger feedback modal */},
      color: 'bg-blue-600/80 hover:bg-blue-700/80'
    },
    {
      id: 'favorites',
      icon: Star,
      label: 'Favorites',
      action: () => {/* Show favorites */},
      color: 'bg-yellow-600/80 hover:bg-yellow-700/80'
    },
    {
      id: 'audio',
      icon: Volume2,
      label: 'Audio Controls',
      action: () => {/* Toggle audio panel */},
      color: 'bg-green-600/80 hover:bg-green-700/80'
    },
    {
      id: 'accessibility',
      icon: Accessibility,
      label: 'Accessibility',
      action: () => {/* Show accessibility panel */},
      color: 'bg-purple-600/80 hover:bg-purple-700/80'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      action: () => setShowAuth(true),
      color: 'bg-gray-600/80 hover:bg-gray-700/80'
    }
  ];

  const renderSection = () => {
    const sectionProps = {
      ...pageTransition,
      key: activeSection
    };

    switch (activeSection) {
      case 'home':
        return (
          <motion.div {...sectionProps}>
            <EnhancedDashboard setActiveSection={setActiveSection} />
          </motion.div>
        );
      case 'today':
        return (
          <motion.div {...sectionProps}>
            <TodaysEvents />
          </motion.div>
        );
      case 'chatbot':
        return (
          <motion.div {...sectionProps}>
            <SpaceChatbot />
          </motion.div>
        );
      case 'charts':
        return (
          <motion.div {...sectionProps}>
            <AstronomicalCharts />
          </motion.div>
        );
      case 'skymap':
        return (
          <motion.div {...sectionProps}>
            <SkyMap />
          </motion.div>
        );
      case 'timeline':
        return (
          <motion.div {...sectionProps}>
            <LazyLoadWrapper>
              <LazyTimeline3D />
            </LazyLoadWrapper>
          </motion.div>
        );
      case 'galaxy':
        return (
          <motion.div {...sectionProps}>
            <div className="min-h-screen content-wrapper flex items-center justify-center">
              <div className="text-center cosmic-card max-w-2xl mx-4">
                <h1 className="section-heading mb-6">Galaxy Explorer</h1>
                <p className="descriptive-text text-lg">Coming soon - Explore distant galaxies and nebulae in stunning detail</p>
              </div>
            </div>
          </motion.div>
        );
      case 'solar-system':
        return (
          <motion.div {...sectionProps}>
            <div className="min-h-screen content-wrapper flex items-center justify-center">
              <div className="text-center cosmic-card max-w-2xl mx-4">
                <h1 className="section-heading mb-6">Solar System</h1>
                <p className="descriptive-text text-lg">Coming soon - Interactive 3D solar system model with real-time planetary positions</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div {...sectionProps}>
            <EnhancedDashboard setActiveSection={setActiveSection} />
          </motion.div>
        );
    }
  };

  return (
    <AppProvider>
      <SEOMetaTags {...getSEOData()} />
      <CustomCursor />
      
      <div className="relative min-h-screen overflow-x-hidden">
        <DynamicParticleBackground mode={getParticleMode()} intensity={0.8} />
        <OfflineIndicator />
        
        {/* Fixed positioning for scroll progress to avoid overlap */}
        <div className="floating-component-bottom-right">
          <ScrollProgressIndicator showBackToTop={false} rocketAnimation={true} />
        </div>
        
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          onShowAuth={() => setShowAuth(true)}
          onShowQuiz={() => setShowQuiz(true)}
          onShowFutureMissions={() => setShowFutureMissions(true)}
          onShowAchievements={() => setShowAchievements(true)}
          onShowSpacecraft={(spacecraft) => {
            setSelectedSpacecraft(spacecraft);
            setShowSpacecraft(true);
          }}
          onShowLiveFeeds={() => setShowLiveFeeds(true)}
          onShowMissionJourney={() => setShowMissionJourney(true)}
          onShowMissionControl={() => setShowMissionControl(true)}
          onShowAvatarCustomizer={() => setShowAvatarCustomizer(true)}
          onShowLeaderboard={() => setShowLeaderboard(true)}
        />
        
        {/* Main Content Area with Responsive Layout */}
        <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''} content-wrapper relative z-10`}>
          <div className="responsive-container">
            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
          </div>
        </main>
        
        {/* Footer with responsive layout */}
        <div className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
          <Footer />
        </div>
        
        {/* Enhanced Floating Components with proper positioning */}
        <div className="floating-stack-1">
          <MicroInteractions type="button" soundEffect="notification">
            <FeedbackButton />
          </MicroInteractions>
        </div>
        
        <div className="floating-stack-2">
          <MicroInteractions type="button" soundEffect="click">
            <AudioControls />
          </MicroInteractions>
        </div>
        
        {/* Back to top button positioned separately */}
        <div className="floating-component-bottom-left">
          <ScrollProgressIndicator showBackToTop={true} rocketAnimation={false} />
        </div>
        
        <DidYouKnow />
        <AccessibilityControls />
        <PWAInstallPrompt />
        <PushNotificationManager />
        
        {/* Drift and Snap Sidebar positioned to avoid overlap */}
        <div className="floating-component-middle-right">
          <DriftSnapSidebar 
            items={sidebarItems}
            position="right"
            autoHideDelay={3000}
          />
        </div>
        
        {/* Enhanced Modals with Animations */}
        <Tutorial />
        
        <AnimatePresence>
          {showAuth && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UserAuth isOpen={showAuth} onClose={() => setShowAuth(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Quiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <FutureMissions isOpen={showFutureMissions} onClose={() => setShowFutureMissions(false)} />
        <AchievementSystem isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
        
        <Suspense fallback={<div>Loading...</div>}>
          <SpacecraftViewer 
            isOpen={showSpacecraft} 
            onClose={() => setShowSpacecraft(false)}
            spacecraft={selectedSpacecraft}
          />
        </Suspense>
        
        <LiveFeeds isOpen={showLiveFeeds} onClose={() => setShowLiveFeeds(false)} />
        <MissionJourney isOpen={showMissionJourney} onClose={() => setShowMissionJourney(false)} />
        <MissionControl isOpen={showMissionControl} onClose={() => setShowMissionControl(false)} />
        <AvatarCustomizer isOpen={showAvatarCustomizer} onClose={() => setShowAvatarCustomizer(false)} />
        <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
      </div>
    </AppProvider>
  );
}

export default App;