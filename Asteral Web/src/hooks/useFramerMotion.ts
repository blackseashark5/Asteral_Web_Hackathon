import { useReducedMotion } from 'framer-motion';

// Custom hook for consistent Framer Motion animations
export const useCosmicAnimations = () => {
  const shouldReduceMotion = useReducedMotion();

  const pageTransition = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? {} : { opacity: 0, y: -20 },
    transition: shouldReduceMotion ? { duration: 0 } : { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] // Custom easing
    }
  };

  const cardHover = {
    whileHover: shouldReduceMotion ? {} : { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: shouldReduceMotion ? {} : { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const buttonPress = {
    whileHover: shouldReduceMotion ? {} : { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: shouldReduceMotion ? {} : { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const fadeInUp = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 30 },
    animate: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    transition: shouldReduceMotion ? { duration: 0 } : { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  };

  const staggerContainer = {
    animate: shouldReduceMotion ? {} : {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    animate: shouldReduceMotion ? {} : {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseGlow = {
    animate: shouldReduceMotion ? {} : {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.6)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const slideInFromRight = {
    initial: shouldReduceMotion ? {} : { x: 100, opacity: 0 },
    animate: shouldReduceMotion ? {} : { x: 0, opacity: 1 },
    exit: shouldReduceMotion ? {} : { x: 100, opacity: 0 },
    transition: shouldReduceMotion ? { duration: 0 } : { 
      duration: 0.4, 
      ease: "easeOut" 
    }
  };

  const modalAnimation = {
    initial: shouldReduceMotion ? {} : { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    animate: shouldReduceMotion ? {} : { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: shouldReduceMotion ? {} : { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    transition: shouldReduceMotion ? { duration: 0 } : { 
      duration: 0.3, 
      ease: [0.22, 1, 0.36, 1]
    }
  };

  return {
    pageTransition,
    cardHover,
    buttonPress,
    fadeInUp,
    staggerContainer,
    floatingAnimation,
    pulseGlow,
    slideInFromRight,
    modalAnimation,
    shouldReduceMotion
  };
};

// Preset animation variants
export const cosmicVariants = {
  // Page transitions
  pageSlide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  },
  
  // Card animations
  cardFloat: {
    hover: {
      y: -8,
      rotateX: 5,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  },
  
  // Text animations
  textReveal: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  
  // Loading animations
  cosmicLoader: {
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  }
};