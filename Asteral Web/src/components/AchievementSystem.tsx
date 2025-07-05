import React, { useState, useEffect } from 'react';
import { Trophy, Star, Medal, Award, Target, Zap } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const allAchievements: Achievement[] = [
  {
    id: 'welcome',
    title: 'Welcome Explorer',
    description: 'Join the Cosmic Explorer community',
    icon: Star,
    rarity: 'common',
    points: 10,
    unlocked: false
  },
  {
    id: 'first_quiz',
    title: 'Knowledge Seeker',
    description: 'Complete your first space quiz',
    icon: Target,
    rarity: 'common',
    points: 25,
    unlocked: false
  },
  {
    id: 'perfect_score',
    title: 'Space Expert',
    description: 'Get a perfect score on a quiz',
    icon: Trophy,
    rarity: 'rare',
    points: 100,
    unlocked: false
  },
  {
    id: 'space_enthusiast',
    title: 'Space Enthusiast',
    description: 'Score 80% or higher on a quiz',
    icon: Medal,
    rarity: 'common',
    points: 50,
    unlocked: false
  },
  {
    id: 'event_explorer',
    title: 'Event Explorer',
    description: 'Explore 10 historical space events',
    icon: Award,
    rarity: 'rare',
    points: 75,
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'time_traveler',
    title: 'Time Traveler',
    description: 'Use the 3D timeline for 5 minutes',
    icon: Zap,
    rarity: 'epic',
    points: 150,
    unlocked: false
  }
];

interface AchievementSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ isOpen, onClose }) => {
  const { user, achievements: unlockedAchievements } = useAppContext();
  const [achievements, setAchievements] = useState<Achievement[]>(allAchievements);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  useEffect(() => {
    const updatedAchievements = allAchievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedAchievements.includes(achievement.id)
    }));
    setAchievements(updatedAchievements);
  }, [unlockedAchievements]);

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/30';
      case 'rare': return 'border-blue-500/30';
      case 'epic': return 'border-purple-500/30';
      case 'legendary': return 'border-yellow-500/30';
      default: return 'border-gray-500/30';
    }
  };

  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

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
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>Achievements</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{unlockedCount}</div>
            <div className="text-sm text-gray-300">Unlocked</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{totalPoints}</div>
            <div className="text-sm text-gray-300">Points</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
            <div className="text-sm text-gray-300">Complete</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          {['all', 'unlocked', 'locked'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 ${getRarityBorder(achievement.rarity)} hover:scale-105`
                    : 'bg-gray-700/30 border-gray-600/30 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    achievement.unlocked
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                      : 'bg-gray-600/50'
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{achievement.title}</h3>
                      <span className="text-sm font-medium text-yellow-400">
                        {achievement.points} pts
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-2">
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        achievement.rarity === 'common' ? 'bg-gray-500/20 text-gray-300' :
                        achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                        achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {achievement.rarity}
                      </span>
                      
                      {achievement.unlocked && (
                        <span className="text-xs text-green-400 font-medium">
                          ✓ Unlocked
                        </span>
                      )}
                    </div>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No achievements found for this filter.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AchievementSystem;