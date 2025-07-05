import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, Star, Brain, Rocket, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  achievements: number;
  country: string;
  avatar?: string;
}

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'exploration' | 'achievements'>('quiz');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  // Mock leaderboard data
  const mockData = {
    quiz: [
      { id: '1', username: 'SpaceExplorer42', score: 2850, achievements: 15, country: 'USA' },
      { id: '2', username: 'CosmicWanderer', score: 2720, achievements: 12, country: 'Canada' },
      { id: '3', username: 'StarGazer99', score: 2680, achievements: 18, country: 'UK' },
      { id: '4', username: 'AstroNinja', score: 2540, achievements: 10, country: 'Japan' },
      { id: '5', username: 'GalaxyHunter', score: 2420, achievements: 14, country: 'Germany' },
      { id: '6', username: 'NebulaSeeker', score: 2380, achievements: 11, country: 'France' },
      { id: '7', username: 'OrbitMaster', score: 2340, achievements: 16, country: 'Australia' },
      { id: '8', username: 'CometChaser', score: 2290, achievements: 9, country: 'Brazil' },
      { id: '9', username: 'PlanetHopper', score: 2250, achievements: 13, country: 'India' },
      { id: '10', username: 'VoidWalker', score: 2180, achievements: 8, country: 'Russia' }
    ],
    exploration: [
      { id: '1', username: 'CosmicWanderer', score: 3200, achievements: 12, country: 'Canada' },
      { id: '2', username: 'StarGazer99', score: 3150, achievements: 18, country: 'UK' },
      { id: '3', username: 'SpaceExplorer42', score: 3080, achievements: 15, country: 'USA' },
      { id: '4', username: 'GalaxyHunter', score: 2950, achievements: 14, country: 'Germany' },
      { id: '5', username: 'OrbitMaster', score: 2890, achievements: 16, country: 'Australia' }
    ],
    achievements: [
      { id: '1', username: 'StarGazer99', score: 18, achievements: 18, country: 'UK' },
      { id: '2', username: 'OrbitMaster', score: 16, achievements: 16, country: 'Australia' },
      { id: '3', username: 'SpaceExplorer42', score: 15, achievements: 15, country: 'USA' },
      { id: '4', username: 'GalaxyHunter', score: 14, achievements: 14, country: 'Germany' },
      { id: '5', username: 'PlanetHopper', score: 13, achievements: 13, country: 'India' }
    ]
  };

  useEffect(() => {
    setLeaderboardData(mockData[activeTab]);
  }, [activeTab, timeFilter]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'bg-gray-700/50 border-gray-600/30';
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'quiz': return Brain;
      case 'exploration': return Rocket;
      case 'achievements': return Star;
      default: return Brain;
    }
  };

  const getScoreLabel = (tab: string) => {
    switch (tab) {
      case 'quiz': return 'Quiz Points';
      case 'exploration': return 'Exploration Score';
      case 'achievements': return 'Achievements';
      default: return 'Score';
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'UK': '🇬🇧',
      'Japan': '🇯🇵',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'India': '🇮🇳',
      'Russia': '🇷🇺'
    };
    return flags[country] || '🌍';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="cosmic-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Users className="w-6 h-6 text-purple-400" />
            <span>Global Leaderboard</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {(['quiz', 'exploration', 'achievements'] as const).map((tab) => {
            const Icon = getTabIcon(tab);
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Time Filter */}
        <div className="flex space-x-2 mb-6">
          {(['weekly', 'monthly', 'all-time'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === filter
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="space-y-3">
          {leaderboardData.map((entry, index) => {
            const rank = index + 1;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-102 ${getRankBg(rank)}`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {getRankIcon(rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-bold text-white truncate">{entry.username}</h3>
                      <span className="text-lg">{getCountryFlag(entry.country)}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-gray-400 text-sm">{entry.country}</span>
                      <span className="text-blue-400 text-sm">
                        {entry.achievements} achievements
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {getScoreLabel(activeTab)}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-sm text-gray-400">Countries Represented</div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">45,892</div>
            <div className="text-sm text-gray-400">Active Explorers</div>
          </div>
          
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1.2M</div>
            <div className="text-sm text-gray-400">Total Achievements</div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-yellow-300 font-semibold mb-2">How Rankings Work</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Quiz scores are based on accuracy and speed</li>
            <li>• Exploration points earned by discovering new content</li>
            <li>• Achievement rankings show total badges earned</li>
            <li>• Rankings update in real-time</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;