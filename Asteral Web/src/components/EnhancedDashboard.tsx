import React, { useState, useEffect } from 'react';
import { Calendar, Bot, Clock, Telescope, Sun, Star, Globe, Sparkles, Rocket, Zap, Eye, TrendingUp, Users, Award, Activity, Target, Brain, Map, BarChart3, PieChart, LineChart } from 'lucide-react';
import ScrollParallax from './ScrollParallax';
import TiltCard from './TiltCard';
import ParticleTrailNav from './ParticleTrailNav';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCosmicAnimations } from '../hooks/useFramerMotion';
import { useAppContext } from '../contexts/AppContext';

interface EnhancedDashboardProps {
  setActiveSection?: (section: string) => void;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ setActiveSection }) => {
  const { staggerContainer, fadeInUp } = useCosmicAnimations();
  const { user } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    activeUsers: 1247,
    eventsToday: 12,
    totalDiscoveries: 45892,
    ongoingMissions: 8,
    satellitesTracked: 2847,
    dataPoints: 156789
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
        ongoingMissions: prev.ongoingMissions,
        satellitesTracked: prev.satellitesTracked + Math.floor(Math.random() * 5) - 2,
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 50) + 10
      }));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(statsTimer);
    };
  }, []);

  const quickActions = [
    {
      id: 'charts',
      title: 'Astronomical Charts',
      description: 'Interactive data visualization',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      action: () => setActiveSection?.('charts')
    },
    {
      id: 'skymap',
      title: 'Sky Map',
      description: 'Real-time night sky view',
      icon: Map,
      color: 'from-purple-500 to-pink-500',
      action: () => setActiveSection?.('skymap')
    },
    {
      id: 'timeline',
      title: '3D Timeline',
      description: 'Immersive space history',
      icon: Clock,
      color: 'from-green-500 to-teal-500',
      action: () => setActiveSection?.('timeline')
    },
    {
      id: 'chatbot',
      title: 'AI Assistant',
      description: 'Space knowledge expert',
      icon: Bot,
      color: 'from-orange-500 to-red-500',
      action: () => setActiveSection?.('chatbot')
    }
  ];

  const liveDataFeeds = [
    {
      title: 'Solar Activity',
      value: '142',
      unit: 'sunspots',
      trend: '+5.2%',
      color: 'text-yellow-400',
      icon: Sun
    },
    {
      title: 'ISS Position',
      value: '408.2',
      unit: 'km altitude',
      trend: 'Stable',
      color: 'text-blue-400',
      icon: Rocket
    },
    {
      title: 'Near-Earth Objects',
      value: '23',
      unit: 'tracked today',
      trend: '+2',
      color: 'text-purple-400',
      icon: Target
    },
    {
      title: 'Space Weather',
      value: 'Quiet',
      unit: 'conditions',
      trend: 'Normal',
      color: 'text-green-400',
      icon: Activity
    }
  ];

  const missionUpdates = [
    {
      id: 1,
      mission: 'James Webb Space Telescope',
      status: 'Operational',
      update: 'Captured new images of distant galaxies',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      mission: 'Perseverance Mars Rover',
      status: 'Active',
      update: 'Collected new rock samples from Jezero Crater',
      time: '6 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      mission: 'Artemis Program',
      status: 'In Development',
      update: 'Successful SLS engine test completed',
      time: '1 day ago',
      priority: 'high'
    },
    {
      id: 4,
      mission: 'International Space Station',
      status: 'Operational',
      update: 'Crew-8 mission preparations underway',
      time: '2 days ago',
      priority: 'medium'
    }
  ];

  const analyticsData = [
    { name: 'Jan', events: 45, discoveries: 12 },
    { name: 'Feb', events: 52, discoveries: 18 },
    { name: 'Mar', events: 48, discoveries: 15 },
    { name: 'Apr', events: 61, discoveries: 22 },
    { name: 'May', events: 55, discoveries: 19 },
    { name: 'Jun', events: 67, discoveries: 25 }
  ];

  const handleCardClick = (section: string) => {
    if (setActiveSection) {
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Enhanced Live Data */}
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
          {/* Enhanced Live Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-6 bg-white/5 backdrop-blur-xl rounded-full px-8 py-4 border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">Live Data</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-gray-300 text-sm">
                {currentTime.toLocaleTimeString()} UTC
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-blue-400 text-sm font-medium">
                {liveStats.activeUsers.toLocaleString()} explorers online
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="text-purple-400 text-sm font-medium">
                {liveStats.dataPoints.toLocaleString()} data points
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
                Mission
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Control
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Real-time space mission monitoring, data analytics, and cosmic exploration dashboard
            </p>

            {user && (
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-full px-8 py-4 border border-blue-500/30">
                <span className="text-blue-300">Mission Commander</span>
                <span className="text-white font-semibold text-lg">{user.username}</span>
                <Rocket className="w-5 h-5 text-blue-400" />
              </div>
            )}
          </motion.div>

          {/* Enhanced Live Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 max-w-6xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{liveStats.activeUsers.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">Active Users</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{liveStats.eventsToday}</div>
              <div className="text-gray-400 text-xs">Events Today</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{liveStats.totalDiscoveries.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">Discoveries</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-orange-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{liveStats.ongoingMissions}</div>
              <div className="text-gray-400 text-xs">Active Missions</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{liveStats.satellitesTracked.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">Satellites</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-pink-400/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{(liveStats.dataPoints / 1000).toFixed(0)}K</div>
              <div className="text-gray-400 text-xs">Data Points</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Section */}
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
                Mission Control Center
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access advanced space exploration tools and real-time mission data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="h-full">
                    <div 
                      className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={action.action}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                      
                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                            {action.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Data Feeds & Mission Updates */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Live Data Feeds */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Activity className="w-8 h-8 text-green-400" />
                <span>Live Data Feeds</span>
              </h3>
              
              <div className="space-y-6">
                {liveDataFeeds.map((feed, index) => {
                  const Icon = feed.icon;
                  return (
                    <motion.div
                      key={feed.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{feed.title}</h4>
                            <p className="text-gray-400 text-sm">{feed.unit}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${feed.color}`}>
                            {feed.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {feed.trend}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Mission Updates */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Rocket className="w-8 h-8 text-blue-400" />
                <span>Mission Updates</span>
              </h3>
              
              <div className="space-y-4">
                {missionUpdates.map((update, index) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{update.mission}</h4>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          update.status === 'Operational' ? 'bg-green-500/20 text-green-300' :
                          update.status === 'Active' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {update.status}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        update.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {update.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3 leading-relaxed">{update.update}</p>
                    <p className="text-blue-400 text-sm font-medium">{update.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
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
              Advanced Space Analytics
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Dive deep into astronomical data with our comprehensive charts and visualization tools
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => handleCardClick('charts')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Charts</span>
              </button>
              
              <button
                onClick={() => handleCardClick('skymap')}
                className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 flex items-center justify-center space-x-2 border border-white/20"
              >
                <Map className="w-5 h-5" />
                <span>Sky Map</span>
              </button>
            </div>

            {/* Mini Analytics Preview */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                <LineChart className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-gray-400">Solar Events</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                <PieChart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-gray-400">Mission Success</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">+23%</div>
                <div className="text-sm text-gray-400">Data Growth</div>
              </div>
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
            "Space exploration is a force of nature unto itself that no other force in society can rival."
          </motion.blockquote>
          <motion.cite
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 font-medium"
          >
            — Neil deGrasse Tyson
          </motion.cite>
        </div>
      </section>
    </div>
  );
};

export default EnhancedDashboard;