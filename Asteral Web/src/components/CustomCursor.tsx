import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Rocket, MessageCircle, Play, Settings, Star, Zap } from 'lucide-react';

interface CursorState {
  type: 'default' | 'hover' | 'chat' | 'play' | 'settings' | 'star' | 'rocket';
  text?: string;
}

const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for data attributes to determine cursor type
      if (target.closest('[data-cursor="chat"]')) {
        setCursorState({ type: 'chat', text: 'Chat' });
      } else if (target.closest('[data-cursor="play"]')) {
        setCursorState({ type: 'play', text: 'Play' });
      } else if (target.closest('[data-cursor="settings"]')) {
        setCursorState({ type: 'settings', text: 'Settings' });
      } else if (target.closest('[data-cursor="star"]')) {
        setCursorState({ type: 'star', text: 'Favorite' });
      } else if (target.closest('[data-cursor="rocket"]')) {
        setCursorState({ type: 'rocket', text: 'Launch' });
      } else if (target.closest('button, a, [role="button"]')) {
        setCursorState({ type: 'hover' });
      } else {
        setCursorState({ type: 'default' });
      }
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [mouseX, mouseY]);

  const getCursorIcon = () => {
    switch (cursorState.type) {
      case 'chat': return MessageCircle;
      case 'play': return Play;
      case 'settings': return Settings;
      case 'star': return Star;
      case 'rocket': return Rocket;
      default: return null;
    }
  };

  const getCursorSize = () => {
    switch (cursorState.type) {
      case 'hover': return 'scale-150';
      case 'chat':
      case 'play':
      case 'settings':
      case 'star':
      case 'rocket': return 'scale-125';
      default: return 'scale-100';
    }
  };

  const getCursorColor = () => {
    switch (cursorState.type) {
      case 'chat': return 'bg-purple-500';
      case 'play': return 'bg-green-500';
      case 'settings': return 'bg-blue-500';
      case 'star': return 'bg-yellow-500';
      case 'rocket': return 'bg-red-500';
      case 'hover': return 'bg-blue-400';
      default: return 'bg-white';
    }
  };

  const Icon = getCursorIcon();

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${getCursorSize()}`}
        animate={{
          rotate: cursorState.type === 'rocket' ? 360 : 0,
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" }
        }}
      >
        {/* Main cursor dot */}
        <div className={`w-4 h-4 rounded-full ${getCursorColor()} transition-all duration-200`} />
        
        {/* Icon overlay */}
        {Icon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-3 h-3 text-white" />
          </div>
        )}
        
        {/* Outer ring for hover state */}
        {cursorState.type === 'hover' && (
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Text label */}
        {cursorState.text && (
          <motion.div
            className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {cursorState.text}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;