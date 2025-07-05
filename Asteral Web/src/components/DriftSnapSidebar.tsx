import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Settings, MessageCircle, Star, Volume2, Accessibility } from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  action: () => void;
  color: string;
}

interface DriftSnapSidebarProps {
  items: SidebarItem[];
  position?: 'left' | 'right';
  autoHideDelay?: number;
}

const DriftSnapSidebar: React.FC<DriftSnapSidebarProps> = ({
  items,
  position = 'right',
  autoHideDelay = 3000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dragControls = useDragControls();

  const showSidebar = () => {
    setIsVisible(true);
    clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        setIsVisible(false);
      }
    }, autoHideDelay);
  };

  const hideSidebar = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    showSidebar();
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    clearTimeout(timeoutRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    
    // Auto-hide after drag ends
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const sidebarVariants = {
    hidden: {
      x: position === 'right' ? 100 : -100,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: position === 'right' ? 50 : -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Hover trigger area */}
      <div
        className={`fixed top-1/2 transform -translate-y-1/2 w-4 h-32 z-40 ${
          position === 'right' ? 'right-0' : 'left-0'
        }`}
        onMouseEnter={handleMouseEnter}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`fixed top-1/2 transform -translate-y-1/2 z-50 ${
              position === 'right' ? 'right-4' : 'left-4'
            }`}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={handleMouseLeave}
            drag
            dragControls={dragControls}
            dragConstraints={{ left: -50, right: 50, top: -100, bottom: 100 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              x: dragOffset.x,
              y: dragOffset.y
            }}
          >
            <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl p-2">
              <div className="space-y-2">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      onClick={item.action}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group relative ${item.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      
                      {/* Tooltip */}
                      <motion.div
                        className={`absolute ${
                          position === 'right' ? 'right-full mr-3' : 'left-full ml-3'
                        } top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {item.label}
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-black rotate-45 ${
                            position === 'right' ? 'right-0 translate-x-1' : 'left-0 -translate-x-1'
                          }`}
                        />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Drag handle */}
              <motion.div
                className="mt-2 w-full h-1 bg-gray-600 rounded-full cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
                whileHover={{ scaleY: 2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DriftSnapSidebar;