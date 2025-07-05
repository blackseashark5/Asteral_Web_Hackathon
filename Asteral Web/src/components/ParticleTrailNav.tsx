import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface ParticleTrailNavProps {
  children: React.ReactNode;
  particleCount?: number;
  colors?: string[];
  className?: string;
}

const ParticleTrailNav: React.FC<ParticleTrailNavProps> = ({
  children,
  particleCount = 15,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
  className = ''
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const createParticle = (x: number, y: number): Particle => ({
    id: Math.random(),
    x,
    y,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8,
    life: 0,
    maxLife: 60,
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const updateParticles = () => {
    setParticles(prevParticles => 
      prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        }))
        .filter(particle => particle.life < particle.maxLife)
    );
  };

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create comet trail
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push(createParticle(x, y));
    }

    setParticles(prev => [...prev, ...newParticles]);
    setIsAnimating(true);

    // Stop animation after particles fade
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onClick={handleClick}
    >
      {children}
      
      {/* Particle Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: 1 - (particle.life / particle.maxLife),
                scale: 1 - (particle.life / particle.maxLife) * 0.5
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Click ripple effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={isAnimating ? {
          background: [
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0) 0%, transparent 70%)'
          ]
        } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

export default ParticleTrailNav;