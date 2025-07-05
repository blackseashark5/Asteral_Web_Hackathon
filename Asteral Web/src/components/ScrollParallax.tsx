import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
      default:
        return useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
    }
  };

  const transform = getTransform();
  const springTransform = useSpring(transform, { stiffness: 100, damping: 30 });

  const getMotionStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: springTransform };
    }
    return { y: springTransform };
  };

  return (
    <div ref={ref} className={className}>
      <motion.div style={getMotionStyle()}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollParallax;