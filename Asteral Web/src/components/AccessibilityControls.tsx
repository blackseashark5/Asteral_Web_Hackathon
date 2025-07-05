import React, { useState } from 'react';
import { Accessibility, Eye, Volume2, VolumeX, Sun, Moon, Type, Contrast, Music } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityControls: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    soundEnabled, 
    toggleSound,
    musicVolume,
    setMusicVolume,
    highContrast, 
    toggleHighContrast 
  } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const handleVolumeChange = (newVolume: number) => {
    setMusicVolume(newVolume);
    // Update any playing audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.volume = newVolume;
    });
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-600/90 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700/90 transition-colors z-40"
        aria-label="Accessibility controls"
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800/95 backdrop-blur-xl rounded-l-xl border-l border-t border-b border-gray-600/50 shadow-2xl z-50 w-80 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Accessibility className="w-5 h-5 text-blue-400" />
                <span>Accessibility</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div>
                <label className="block text-white font-medium mb-3">Theme</label>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </div>
                </button>
              </div>

              {/* High Contrast */}
              <div>
                <label className="block text-white font-medium mb-3">Contrast</label>
                <button
                  onClick={toggleHighContrast}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    highContrast 
                      ? 'bg-blue-600/50 border border-blue-500/50' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Contrast className="w-5 h-5 text-white" />
                    <span className="text-white">High Contrast</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 ${
                    highContrast ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                  }`}>
                    {highContrast && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>
              </div>

              {/* Audio Controls */}
              <div>
                <label className="block text-white font-medium mb-3">Audio</label>
                
                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors mb-3 ${
                    soundEnabled 
                      ? 'bg-green-600/50 border border-green-500/50' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {soundEnabled ? (
                      <Music className="w-5 h-5 text-green-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-white">Ambient Music</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 ${
                    soundEnabled ? 'bg-green-500 border-green-500' : 'border-gray-400'
                  }`}>
                    {soundEnabled && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>

                {/* Volume Control */}
                {soundEnabled && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={musicVolume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-white text-sm w-12">{Math.round(musicVolume * 100)}%</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVolumeChange(0.1)}
                        className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                      >
                        Low
                      </button>
                      <button
                        onClick={() => handleVolumeChange(0.3)}
                        className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                      >
                        Medium
                      </button>
                      <button
                        onClick={() => handleVolumeChange(0.6)}
                        className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                      >
                        High
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-white font-medium mb-3">Font Size</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Type className="w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-white text-sm w-8">{fontSize}px</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFontSizeChange(14)}
                      className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                    >
                      Small
                    </button>
                    <button
                      onClick={() => handleFontSizeChange(16)}
                      className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => handleFontSizeChange(20)}
                      className="flex-1 py-2 px-3 bg-gray-700/50 hover:bg-gray-600/50 rounded text-white text-sm transition-colors"
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>

              {/* Keyboard Navigation Info */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Keyboard Navigation</span>
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Tab: Navigate between elements</li>
                  <li>• Enter/Space: Activate buttons</li>
                  <li>• Escape: Close modals</li>
                  <li>• Arrow keys: Navigate lists</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityControls;