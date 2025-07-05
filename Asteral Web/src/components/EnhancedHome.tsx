import React, { useState, useEffect } from 'react';
import { Calendar, Bot, Clock, Telescope, Sun, Star, Globe, Sparkles, Rocket, Zap, Eye, TrendingUp, Users, Award, Activity, Target, Brain, Map } from 'lucide-react';
import ScrollParallax from './ScrollParallax';
import TiltCard from './TiltCard';
import ParticleTrailNav from './ParticleTrailNav';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCosmicAnimations } from '../hooks/useFramerMotion';
import { useAppContext } from '../contexts/AppContext';

interface EnhancedHomeProps {
  setActiveSection?: (section: string) => void;
}

const EnhancedHome: React.FC<EnhancedHomeProps> = ({ setActiveSection }) => {
  const { staggerContainer, fadeInUp } = useCosmicAnimations();
  const { user } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    activeUsers: 1247,
    eventsToday: 12,
    totalDiscoveries: 45892,
    ongoingMissions: 8
  });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulate live stats updates
    const statsTimer = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        eventsToday: prev.eventsToday,
        totalDiscoveries: prev.totalDiscoveries + Math.floor(Math.random() * 3),
        ongoingMissions: prev.ongoingMissions
      }));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(statsTimer);
    };
  }, []);

  const todaysHighlights = [
    {
      id: 1,
      title: "Mars Rover Discovers Ancient Water Evidence",
      description: "Perseverance finds compelling evidence of ancient water activity in Jezero Crater",
      time: "2 hours ago",
      type: "discovery",
      image: "https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "ISS Crew Conducts Spacewalk",
      description: "Astronauts complete 6-hour EVA to upgrade station's solar arrays",
      time: "5 hours ago",
      type: "mission",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Webb Telescope Captures Distant Galaxy",
      description: "New images reveal galaxy formation from 13.1 billion years ago",
      time: "1 day ago",
      type: "observation",
      image: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Artemis II Launch Window",
      date: "Nov 2024",
      description: "Crewed mission around the Moon",
      countdown: "45 days",
      priority: "high"
    },
    {
      id: 2,
      title: "Europa Clipper Launch",
      date: "Oct 2024",
      description: "Mission to Jupiter's icy moon",
      countdown: "12 days",
      priority: "medium"
    },
    {
      id: 3,
      title: "Solar Eclipse",
      date: "Apr 2024",
      description: "Total solar eclipse visible from North America",
      countdown: "156 days",
      priority: "low"
    }
  ];

  const personalizedRecommendations = [
    {
      id: 1,
      title: "Complete Space History Quiz",
      description: "Test your knowledge of Apollo missions",
      action: "Take Quiz",
      icon: Brain,
      progress: 0,
      onClick: () => setActiveSection?.('quiz')
    },
    {
      id: 2,
      title: "Explore 3D Timeline",
      description: "Discover the Space Race era",
      action: "Explore",
      icon: Clock,
      progress: 65,
      onClick: () => setActiveSection?.('timeline')
    },
    {
      id: 3,
      title: "Chat with Space AI",
      description: "Ask about Mars exploration",
      action: "Chat",
      icon: Bot,
      progress: 30,
      onClick: () => setActiveSection?.('chatbot')
    }
  ];

  const handleCardClick = (section: string) => {
    if (setActiveSection) {
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Live Data */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </motion.div>

        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y2 }}
        >
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Live Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-6 bg-white/5 backdrop-blur-xl rounded-full px-8 py-4 border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">Live</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-gray-300 text-sm">
                {currentTime.toLocaleTimeString()} UTC
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-blue-400 text-sm font-medium">
                {liveStats.activeUsers.toLocaleString()} explorers online
              </div>
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cosmic
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Explorer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Your real-time gateway to space exploration, discoveries, and cosmic adventures
            </p>

            {user && (
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-full px-8 py-4 border border-blue-500/30">
                <span className="text-blue-300">Welcome back,</span>
                <span className="text-white font-semibold text-lg">{user.username}</span>
                <Rocket className="w-5 h-5 text-blue-400" />
              </div>
            )}
          </motion.div>

          {/* Live Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{liveStats.activeUsers.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Active Explorers</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{liveStats.eventsToday}</div>
              <div className="text-gray-400 text-sm">Events Today</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{liveStats.totalDiscoveries.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Discoveries</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{liveStats.ongoingMissions}</div>
              <div className="text-gray-400 text-sm">Active Missions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Today's Space Highlights */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Today's Space Highlights
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest discoveries, missions, and cosmic events happening right now
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {todaysHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard className="h-full">
                  <div className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group">
                    {/* Background Image */}
                    <img 
                      src={highlight.image} 
                      alt={highlight.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          highlight.type === 'discovery' ? 'bg-green-500/20 text-green-300' :
                          highlight.type === 'mission' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {highlight.type}
                        </span>
                        <span className="ml-2 text-gray-400 text-xs">{highlight.time}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                        {highlight.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events & Personal Recommendations */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Clock className="w-8 h-8 text-blue-400" />
                <span>Upcoming Events</span>
              </h3>
              
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {event.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        event.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {event.countdown}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{event.description}</p>
                    <p className="text-blue-400 font-medium">{event.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personal Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Target className="w-8 h-8 text-purple-400" />
                <span>Recommended for You</span>
              </h3>
              
              <div className="space-y-6">
                {personalizedRecommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group cursor-pointer"
                      onClick={rec.onClick}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {rec.title}
                          </h4>
                          <p className="text-gray-300 mb-4">{rec.description}</p>
                          
                          {rec.progress > 0 && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{rec.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${rec.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                          
                          <button className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                            {rec.action} →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Explore the Universe?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Start your cosmic journey with today's space events or dive into our interactive timeline
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCardClick('today')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Explore Today's Events</span>
              </button>
              
              <button
                onClick={() => handleCardClick('timeline')}
                className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 flex items-center justify-center space-x-2 border border-white/20"
              >
                <Clock className="w-5 h-5" />
                <span>3D Timeline</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-gray-300 italic leading-relaxed mb-6"
          >
            "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
          </motion.blockquote>
          <motion.cite
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 font-medium"
          >
            — Carl Sagan
          </motion.cite>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;