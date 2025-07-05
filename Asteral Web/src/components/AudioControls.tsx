import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const AudioControls: React.FC = () => {
  const { soundEnabled, toggleSound, musicVolume, setMusicVolume } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(soundEnabled);

  useEffect(() => {
    setIsPlaying(soundEnabled);
  }, [soundEnabled]);

  const handlePlayPause = () => {
    toggleSound();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setMusicVolume(newVolume);
  };

  return (
    <div className="fixed bottom-6 right-20 z-30">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-600/50 shadow-2xl p-4 w-64"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center space-x-2">
                  <Music className="w-4 h-4 text-blue-400" />
                  <span>Ambient Music</span>
                </h3>
                <button
                  onClick={handlePlayPause}
                  className={`p-2 rounded-lg transition-colors ${
                    isPlaying ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={musicVolume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    disabled={!soundEnabled}
                  />
                  <span className="text-white text-sm w-12">{Math.round(musicVolume * 100)}%</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleVolumeChange(0.1)}
                    className="py-1 px-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-xs transition-colors"
                    disabled={!soundEnabled}
                  >
                    Low
                  </button>
                  <button
                    onClick={() => handleVolumeChange(0.3)}
                    className="py-1 px-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-xs transition-colors"
                    disabled={!soundEnabled}
                  >
                    Med
                  </button>
                  <button
                    onClick={() => handleVolumeChange(0.6)}
                    className="py-1 px-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-xs transition-colors"
                    disabled={!soundEnabled}
                  >
                    High
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center">
                Peaceful cosmic ambient music
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Audio Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          soundEnabled 
            ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-green-500/25' 
            : 'bg-gray-600/80 text-gray-300 hover:bg-gray-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Audio controls"
      >
        {soundEnabled ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default AudioControls;