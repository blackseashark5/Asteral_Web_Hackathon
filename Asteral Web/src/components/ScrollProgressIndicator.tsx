import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Rocket, ArrowUp } from 'lucide-react';

interface ScrollProgressIndicatorProps {
  showBackToTop?: boolean;
  rocketAnimation?: boolean;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  showBackToTop = true,
  rocketAnimation = true
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showButton, setShowButton] = useState(false);
  const [isBlastOff, setIsBlastOff] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setShowButton(latest > 0.2);
      
      // Trigger blast off animation when reaching 100%
      if (latest >= 0.99 && !isBlastOff) {
        setIsBlastOff(true);
        setTimeout(() => setIsBlastOff(false), 2000);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, isBlastOff]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Circular Progress with Rocket */}
      {rocketAnimation && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="relative w-16 h-16">
            {/* Progress Circle */}
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress
                }}
                initial={{ pathLength: 0 }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Rocket Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isBlastOff ? {
                y: -200,
                scale: 0.5,
                rotate: 45,
                opacity: 0
              } : {
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              transition={{
                duration: isBlastOff ? 1.5 : 0.3,
                ease: isBlastOff ? "easeIn" : "easeOut"
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket className="w-6 h-6 text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Blast off particles */}
            {isBlastOff && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos(i * 45 * Math.PI / 180) * 50,
                      y: Math.sin(i * 45 * Math.PI / 180) * 50,
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}

            {/* Percentage Text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: useSpring(scrollYProgress) }}
            >
              <motion.span
                className="text-xs font-bold text-white"
                animate={isBlastOff ? { opacity: 0 } : { opacity: 1 }}
              >
                {Math.round(scrollYProgress.get() * 100)}%
              </motion.span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Completion celebration */}
      {isBlastOff && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-6xl"
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 1.5 }}
          >
            🚀
          </motion.div>
          <motion.div
            className="absolute text-2xl font-bold text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Mission Complete!
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgressIndicator;