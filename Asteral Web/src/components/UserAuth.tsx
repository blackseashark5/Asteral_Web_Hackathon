import React, { useState } from 'react';
import { User, Mail, Lock, Star, X, LogIn, UserPlus } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface UserAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ isOpen, onClose }) => {
  const { user, setUser, addAchievement } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in production, this would call a real API
    const newUser = {
      id: Date.now().toString(),
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      preferences: {
        theme: 'dark' as const,
        language: 'en',
        soundEnabled: true,
        highContrast: false
      },
      favorites: [],
      achievements: ['welcome'],
      progress: {
        eventsExplored: 0,
        constellationsViewed: 0,
        planetsVisited: 0,
        quizzesCompleted: 0
      }
    };

    setUser(newUser);
    addAchievement('welcome');
    onClose();
    
    // Reset form
    setFormData({ username: '', email: '', password: '' });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cosmic-explorer-user');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="cosmic-card max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <User className="w-6 h-6 text-blue-400" />
              <span>{user ? 'Account' : isLogin ? 'Sign In' : 'Sign Up'}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {user ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{user.username}</h3>
                <p className="text-gray-400">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{user.progress.eventsExplored}</div>
                  <div className="text-sm text-gray-400">Events Explored</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{user.achievements.length}</div>
                  <div className="text-sm text-gray-400">Achievements</div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Recent Achievements</span>
                </h4>
                <div className="space-y-2">
                  {user.achievements.slice(-3).map((achievement, index) => (
                    <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="text-yellow-400 font-medium capitalize">{achievement.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600/80 text-white py-3 rounded-lg hover:bg-red-700/80 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-white font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 cosmic-input"
                      placeholder="Choose a username"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 cosmic-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 cosmic-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cosmic-button py-3 flex items-center justify-center space-x-2"
              >
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserAuth;