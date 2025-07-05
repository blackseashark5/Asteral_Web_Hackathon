import React, { useState } from 'react';
import { Gamepad2, ExternalLink, Star, Rocket, Target, Trophy, Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpaceGame {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: 'action' | 'puzzle' | 'simulation' | 'educational';
  difficulty: 'easy' | 'medium' | 'hard';
  features: string[];
  isExternal?: boolean;
}

const spaceGames: SpaceGame[] = [
  {
    id: 'space-adventure',
    title: 'Space Adventure Game',
    description: 'An exciting space exploration adventure where you pilot your spacecraft through asteroid fields, discover new planets, and complete challenging missions.',
    url: 'https://enchanting-beijinho-223d90.netlify.app/',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'action',
    difficulty: 'medium',
    features: ['3D Graphics', 'Multiple Levels', 'Power-ups', 'Leaderboard'],
    isExternal: true
  },
  {
    id: 'asteroid-dodge',
    title: 'Asteroid Dodge Challenge',
    description: 'Test your reflexes as you navigate through dangerous asteroid fields. Collect power-ups and survive as long as possible in this thrilling space survival game.',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'action',
    difficulty: 'hard',
    features: ['Endless Gameplay', 'High Scores', 'Particle Effects', 'Sound Effects']
  },
  {
    id: 'planet-builder',
    title: 'Planet Builder Simulator',
    description: 'Create and manage your own planet ecosystem. Balance resources, develop civilizations, and explore the cosmos in this strategic simulation game.',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'simulation',
    difficulty: 'medium',
    features: ['Resource Management', 'City Building', 'Research Tree', 'Multiple Planets']
  },
  {
    id: 'constellation-puzzle',
    title: 'Constellation Puzzle',
    description: 'Connect the stars to form famous constellations in this educational puzzle game. Learn about mythology and astronomy while solving challenging puzzles.',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'puzzle',
    difficulty: 'easy',
    features: ['Educational Content', '88 Constellations', 'Mythology Stories', 'Progressive Difficulty']
  },
  {
    id: 'rocket-launch',
    title: 'Rocket Launch Simulator',
    description: 'Design, build, and launch your own rockets in this realistic space simulation. Master orbital mechanics and complete various mission objectives.',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'simulation',
    difficulty: 'hard',
    features: ['Realistic Physics', 'Rocket Designer', 'Mission Objectives', 'Orbital Mechanics']
  },
  {
    id: 'space-trivia',
    title: 'Space Knowledge Trivia',
    description: 'Test your space knowledge with hundreds of questions about astronomy, space missions, and cosmic phenomena. Perfect for space enthusiasts of all ages.',
    url: '#',
    thumbnail: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'educational',
    difficulty: 'medium',
    features: ['500+ Questions', 'Multiple Categories', 'Difficulty Levels', 'Learning Mode']
  }
];

interface SpaceGamesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpaceGames: React.FC<SpaceGamesProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', 'action', 'puzzle', 'simulation', 'educational'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredGames = spaceGames.filter(game => {
    const categoryMatch = selectedCategory === 'all' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'action': return 'text-red-400 bg-red-500/20';
      case 'puzzle': return 'text-purple-400 bg-purple-500/20';
      case 'simulation': return 'text-blue-400 bg-blue-500/20';
      case 'educational': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handlePlayGame = (game: SpaceGame) => {
    if (game.isExternal) {
      window.open(game.url, '_blank', 'noopener,noreferrer');
    } else {
      // For internal games, we would navigate to the game component
      console.log(`Playing ${game.title}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="cosmic-card max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <span>Space Games Collection</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full cosmic-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full cosmic-input"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/50 rounded-xl overflow-hidden border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)}`}>
                    {game.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>
                {game.isExternal && (
                  <div className="absolute top-3 right-3">
                    <ExternalLink className="w-5 h-5 text-white bg-black/50 rounded p-1" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {game.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {game.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePlayGame(game)}
                    className="flex-1 cosmic-button py-2 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play Game</span>
                  </button>
                  
                  <button
                    className="bg-gray-600/50 text-white px-4 py-2 rounded-lg hover:bg-gray-600/70 transition-colors"
                    title="Game info"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{spaceGames.length}</div>
            <div className="text-sm text-gray-400">Total Games</div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {spaceGames.filter(g => g.category === 'simulation').length}
            </div>
            <div className="text-sm text-gray-400">Simulations</div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {spaceGames.filter(g => g.category === 'educational').length}
            </div>
            <div className="text-sm text-gray-400">Educational</div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {spaceGames.filter(g => g.category === 'action').length}
            </div>
            <div className="text-sm text-gray-400">Action Games</div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-blue-300 font-semibold mb-3 flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>About Space Games</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Our collection of space games combines entertainment with education, offering immersive experiences 
            that teach real space science concepts. From realistic rocket simulations to fun puzzle games, 
            there's something for every space enthusiast. All games are designed to be both engaging and 
            educational, helping you learn about astronomy, physics, and space exploration while having fun.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SpaceGames;