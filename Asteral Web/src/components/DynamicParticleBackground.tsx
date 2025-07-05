import React, { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface DynamicParticleBackgroundProps {
  mode: 'nebula' | 'comet' | 'solar-wind' | 'stars' | 'aurora';
  intensity?: number;
}

const DynamicParticleBackground: React.FC<DynamicParticleBackgroundProps> = ({ 
  mode, 
  intensity = 1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const { theme } = useAppContext();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on mode
    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(getParticleCount() * intensity);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height));
      }
    };

    const getParticleCount = () => {
      switch (mode) {
        case 'nebula': return 150;
        case 'comet': return 80;
        case 'solar-wind': return 200;
        case 'aurora': return 100;
        case 'stars': return 300;
        default: return 100;
      }
    };

    const createParticle = (width: number, height: number): Particle => {
      const baseColors = {
        nebula: ['#ff6b9d', '#c44569', '#f8b500', '#feca57'],
        comet: ['#74b9ff', '#0984e3', '#00cec9', '#81ecec'],
        'solar-wind': ['#fdcb6e', '#e17055', '#fd79a8', '#fdcb6e'],
        aurora: ['#00b894', '#00cec9', '#74b9ff', '#a29bfe'],
        stars: ['#ffffff', '#ddd6fe', '#fbbf24', '#60a5fa']
      };

      const colors = baseColors[mode] || baseColors.stars;
      const color = colors[Math.floor(Math.random() * colors.length)];

      switch (mode) {
        case 'nebula':
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            color,
            life: Math.random() * 1000,
            maxLife: 1000
          };

        case 'comet':
          return {
            x: -10,
            y: Math.random() * height,
            vx: Math.random() * 3 + 2,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            color,
            life: 0,
            maxLife: width + 20
          };

        case 'solar-wind':
          return {
            x: Math.random() * width,
            y: height + 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.1,
            color,
            life: 0,
            maxLife: height + 20
          };

        case 'aurora':
          return {
            x: Math.random() * width,
            y: Math.random() * height * 0.6,
            vx: Math.sin(Date.now() * 0.001 + Math.random() * Math.PI) * 0.5,
            vy: Math.cos(Date.now() * 0.001 + Math.random() * Math.PI) * 0.3,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.4 + 0.1,
            color,
            life: Math.random() * 2000,
            maxLife: 2000
          };

        default: // stars
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            color,
            life: Math.random() * 3000,
            maxLife: 3000
          };
      }
    };

    const updateParticle = (particle: Particle, width: number, height: number) => {
      particle.life += 16; // Assuming 60fps
      
      // Mouse interaction for nebula mode
      if (mode === 'nebula') {
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Aurora wave motion
      if (mode === 'aurora') {
        particle.vx = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5;
        particle.vy = Math.cos(Date.now() * 0.001 + particle.y * 0.01) * 0.3;
      }

      // Boundary checks and respawning
      if (mode === 'comet' && particle.x > width + 10) {
        Object.assign(particle, createParticle(width, height));
      } else if (mode === 'solar-wind' && particle.y < -10) {
        Object.assign(particle, createParticle(width, height));
      } else if (particle.life >= particle.maxLife) {
        Object.assign(particle, createParticle(width, height));
      }

      // Keep particles in bounds for other modes
      if (mode === 'nebula' || mode === 'stars') {
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      }
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      const lifeRatio = 1 - (particle.life / particle.maxLife);
      let alpha = particle.opacity * lifeRatio;

      if (mode === 'comet') {
        // Draw comet trail
        const trailLength = 20;
        for (let i = 0; i < trailLength; i++) {
          const trailAlpha = alpha * (1 - i / trailLength);
          const trailX = particle.x - (particle.vx * i * 2);
          const trailY = particle.y - (particle.vy * i * 2);
          
          ctx.globalAlpha = trailAlpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(trailX, trailY, particle.size * (1 - i / trailLength), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (mode === 'aurora') {
        // Draw aurora glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Standard particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle, canvas.width, canvas.height);
        drawParticle(ctx, particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    initializeParticles();
    animate();
    
    if (mode === 'nebula') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, intensity, mousePos, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: mode === 'aurora' 
          ? 'linear-gradient(180deg, #0B1426 0%, #1a0b3d 50%, #0B1426 100%)'
          : 'transparent'
      }}
    />
  );
};

export default DynamicParticleBackground;