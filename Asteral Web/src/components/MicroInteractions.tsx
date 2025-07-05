import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface MicroInteractionsProps {
  children: React.ReactNode;
  type?: 'button' | 'card' | 'icon' | 'input';
  soundEffect?: 'click' | 'hover' | 'success' | 'error' | 'notification';
  haptic?: boolean;
  className?: string;
}

const MicroInteractions: React.FC<MicroInteractionsProps> = ({
  children,
  type = 'button',
  soundEffect = 'click',
  haptic = false,
  className = '',
  ...props
}) => {
  const { soundEnabled } = useAppContext();
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API for sound effects
    if (soundEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [soundEnabled]);

  const createSoundEffect = (type: string) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different sound frequencies for different interactions
    const frequencies = {
      click: [800, 600],
      hover: [400, 300],
      success: [523, 659, 784], // C, E, G chord
      error: [200, 150],
      notification: [880, 1100, 880]
    };

    const freq = frequencies[type as keyof typeof frequencies] || frequencies.click;
    
    oscillator.frequency.setValueAtTime(freq[0], ctx.currentTime);
    if (freq[1]) {
      oscillator.frequency.exponentialRampToValueAtTime(freq[1], ctx.currentTime + 0.1);
    }

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const triggerHaptic = () => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPressed(true);
    
    // Create ripple effect
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    createSoundEffect(soundEffect);
    triggerHaptic();
  };

  const handleMouseEnter = () => {
    if (type === 'button' || type === 'card') {
      createSoundEffect('hover');
    }
  };

  const getTransformClass = () => {
    switch (type) {
      case 'button':
        return isPressed ? 'scale-95' : 'hover:scale-105';
      case 'card':
        return isPressed ? 'scale-98' : 'hover:scale-102';
      case 'icon':
        return isPressed ? 'scale-90' : 'hover:scale-110';
      default:
        return '';
    }
  };

  const getTransitionClass = () => {
    return 'transition-all duration-150 ease-out';
  };

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${getTransformClass()} ${getTransitionClass()} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-0 h-0 bg-white/20 rounded-full animate-ping" 
               style={{
                 animation: 'ripple 0.6s ease-out',
                 animationFillMode: 'forwards'
               }} />
        </div>
      ))}
      
      {/* Glow effect for buttons */}
      {type === 'button' && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-sm" />
        </div>
      )}
    </div>
  );
};

// CSS for ripple animation (add to index.css)
const rippleStyles = `
@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}

export default MicroInteractions;