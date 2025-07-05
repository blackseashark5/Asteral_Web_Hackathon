import React, { useState } from 'react';
import { User, Palette, Award, Save, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface AvatarCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ isOpen, onClose }) => {
  const [suitColor, setSuitColor] = useState('#ffffff');
  const [helmetStyle, setHelmetStyle] = useState('standard');
  const [patches, setPatches] = useState<string[]>(['nasa']);
  const [nameTag, setNameTag] = useState('ASTRONAUT');

  const suitColors = [
    { name: 'Classic White', value: '#ffffff' },
    { name: 'NASA Blue', value: '#0B3D91' },
    { name: 'Space Gray', value: '#4A5568' },
    { name: 'Mission Orange', value: '#FF6B35' },
    { name: 'Deep Space Black', value: '#1A202C' },
    { name: 'Cosmic Purple', value: '#6B46C1' }
  ];

  const helmetStyles = [
    { id: 'standard', name: 'Standard EVA', description: 'Classic spacewalk helmet' },
    { id: 'apollo', name: 'Apollo Style', description: 'Vintage lunar mission helmet' },
    { id: 'modern', name: 'Modern IVA', description: 'Advanced crew helmet' },
    { id: 'mars', name: 'Mars Mission', description: 'Future Mars exploration helmet' }
  ];

  const availablePatches = [
    { id: 'nasa', name: 'NASA', description: 'Official NASA patch' },
    { id: 'iss', name: 'ISS', description: 'International Space Station' },
    { id: 'apollo', name: 'Apollo Program', description: 'Moon landing missions' },
    { id: 'mars', name: 'Mars Mission', description: 'Red planet exploration' },
    { id: 'artemis', name: 'Artemis', description: 'Return to the Moon' },
    { id: 'spacex', name: 'SpaceX', description: 'Commercial spaceflight' },
    { id: 'flag', name: 'Country Flag', description: 'Your national flag' },
    { id: 'custom', name: 'Custom Mission', description: 'Personal mission patch' }
  ];

  const togglePatch = (patchId: string) => {
    setPatches(prev => 
      prev.includes(patchId) 
        ? prev.filter(p => p !== patchId)
        : [...prev, patchId]
    );
  };

  const saveAvatar = () => {
    const avatarConfig = {
      suitColor,
      helmetStyle,
      patches,
      nameTag,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('cosmic-explorer-avatar', JSON.stringify(avatarConfig));
    
    // Show success message
    alert('Avatar saved successfully!');
  };

  const resetAvatar = () => {
    setSuitColor('#ffffff');
    setHelmetStyle('standard');
    setPatches(['nasa']);
    setNameTag('ASTRONAUT');
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
            <User className="w-6 h-6 text-blue-400" />
            <span>Astronaut Avatar Customizer</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 text-center">
              <h3 className="text-white font-semibold mb-6">Avatar Preview</h3>
              
              {/* Simplified Astronaut Visualization */}
              <div className="relative mx-auto w-48 h-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-gray-600">
                {/* Helmet */}
                <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-gray-300 ${
                  helmetStyle === 'apollo' ? 'bg-gradient-to-b from-gray-200 to-gray-400' :
                  helmetStyle === 'modern' ? 'bg-gradient-to-b from-blue-100 to-blue-200' :
                  helmetStyle === 'mars' ? 'bg-gradient-to-b from-orange-100 to-orange-200' :
                  'bg-gradient-to-b from-gray-100 to-gray-200'
                }`}>
                  <div className="absolute inset-2 rounded-full bg-black/20"></div>
                </div>
                
                {/* Suit Body */}
                <div 
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-lg border-2 border-gray-400"
                  style={{ backgroundColor: suitColor }}
                >
                  {/* Chest Control Panel */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-800 rounded border border-gray-600">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Patches */}
                  <div className="absolute top-4 right-2 space-y-1">
                    {patches.slice(0, 3).map((patch, index) => (
                      <div key={patch} className="w-6 h-4 bg-blue-600 rounded text-xs text-white flex items-center justify-center">
                        {patch.slice(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                  
                  {/* Name Tag */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                    {nameTag.slice(0, 8)}
                  </div>
                </div>
                
                {/* Arms */}
                <div 
                  className="absolute top-28 left-2 w-8 h-16 rounded-lg border border-gray-400"
                  style={{ backgroundColor: suitColor }}
                ></div>
                <div 
                  className="absolute top-28 right-2 w-8 h-16 rounded-lg border border-gray-400"
                  style={{ backgroundColor: suitColor }}
                ></div>
                
                {/* Legs */}
                <div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-x-4 w-8 h-20 rounded-lg border border-gray-400"
                  style={{ backgroundColor: suitColor }}
                ></div>
                <div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-x-4 w-8 h-20 rounded-lg border border-gray-400"
                  style={{ backgroundColor: suitColor }}
                ></div>
              </div>
              
              <p className="text-gray-300 text-sm mt-4">
                Your custom astronaut will appear in 3D model viewers
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={saveAvatar}
                className="flex-1 cosmic-button py-3 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Avatar</span>
              </button>
              <button
                onClick={resetAvatar}
                className="bg-gray-600/50 text-white px-6 py-3 rounded-lg hover:bg-gray-600/70 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Suit Color */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <span>Suit Color</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {suitColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSuitColor(color.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      suitColor === color.value 
                        ? 'border-blue-400 bg-blue-500/20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded mb-2 border border-gray-400"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <p className="text-white text-sm font-medium">{color.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Helmet Style */}
            <div>
              <h3 className="text-white font-semibold mb-4">Helmet Style</h3>
              <div className="space-y-3">
                {helmetStyles.map((helmet) => (
                  <button
                    key={helmet.id}
                    onClick={() => setHelmetStyle(helmet.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      helmetStyle === helmet.id
                        ? 'border-blue-400 bg-blue-500/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{helmet.name}</h4>
                        <p className="text-gray-400 text-sm">{helmet.description}</p>
                      </div>
                      {helmetStyle === helmet.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mission Patches */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Mission Patches</span>
              </h3>
              <p className="text-gray-400 text-sm mb-4">Select up to 4 patches for your suit</p>
              <div className="grid grid-cols-2 gap-3">
                {availablePatches.map((patch) => (
                  <button
                    key={patch.id}
                    onClick={() => togglePatch(patch.id)}
                    disabled={!patches.includes(patch.id) && patches.length >= 4}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      patches.includes(patch.id)
                        ? 'border-yellow-400 bg-yellow-500/20'
                        : patches.length >= 4
                        ? 'border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium text-sm">{patch.name}</h4>
                        <p className="text-gray-400 text-xs">{patch.description}</p>
                      </div>
                      {patches.includes(patch.id) && (
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Tag */}
            <div>
              <h3 className="text-white font-semibold mb-4">Name Tag</h3>
              <input
                type="text"
                value={nameTag}
                onChange={(e) => setNameTag(e.target.value.toUpperCase().slice(0, 12))}
                className="w-full cosmic-input"
                placeholder="Enter your astronaut name"
                maxLength={12}
              />
              <p className="text-gray-400 text-sm mt-2">
                Maximum 12 characters, will appear on your suit
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AvatarCustomizer;