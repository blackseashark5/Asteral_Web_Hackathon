import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const spaceFacts = [
  "A day on Venus is longer than its year! Venus rotates so slowly that it takes 243 Earth days to complete one rotation, but only 225 Earth days to orbit the Sun.",
  "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
  "The footprints left by Apollo astronauts on the Moon will last for millions of years because there's no wind or water to erode them.",
  "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years and is larger than Earth.",
  "One million Earths could fit inside the Sun, but the Sun is considered an average-sized star.",
  "Saturn's moon Titan has lakes and rivers, but they're made of liquid methane and ethane instead of water.",
  "The Milky Way galaxy is on a collision course with the Andromeda galaxy, but don't worry - it won't happen for about 4.5 billion years.",
  "Astronauts can grow up to 2 inches taller in space due to the lack of gravity compressing their spine.",
  "The coldest place in the universe that we know of is the Boomerang Nebula, where temperatures drop to -458°F (-272°C).",
  "A single bolt of lightning contains enough energy to power a 100-watt light bulb for more than 3 months."
];

const DidYouKnow: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % spaceFacts.length);
    }, 10000); // Change fact every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const nextFact = () => {
    setCurrentFact(prev => (prev + 1) % spaceFacts.length);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed bottom-6 left-6 max-w-sm z-30"
        >
          <div className="cosmic-card border-yellow-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white">Did You Know?</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={nextFact}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  title="Next fact"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleVisibility}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  title="Hide"
                >
                  ×
                </button>
              </div>
            </div>
            
            <motion.p
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-gray-300 text-sm leading-relaxed mb-3"
            >
              {spaceFacts[currentFact]}
            </motion.p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {spaceFacts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFact ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </motion.div>
      )}
      
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleVisibility}
          className="fixed bottom-6 left-6 bg-yellow-600/80 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700/80 transition-colors z-30"
          title="Show space facts"
        >
          <Lightbulb className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default DidYouKnow;