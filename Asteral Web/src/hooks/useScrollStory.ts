import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface StoryStep {
  id: string;
  title: string;
  content: string;
  trigger: number; // Scroll percentage (0-1)
  duration?: number;
  audio?: string;
  animation?: string;
}

export const useScrollStory = (steps: StoryStep[]) => {
  const [currentStep, setCurrentStep] = useState<StoryStep | null>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setProgress(latest);
      
      // Find the current step based on scroll position
      const activeStep = steps
        .filter(step => latest >= step.trigger)
        .pop();
      
      if (activeStep && activeStep !== currentStep) {
        setCurrentStep(activeStep);
        
        // Play audio if available
        if (activeStep.audio && audioRef.current) {
          audioRef.current.src = activeStep.audio;
          audioRef.current.play().catch(console.error);
        }
      }
    });

    return unsubscribe;
  }, [scrollYProgress, steps, currentStep]);

  const getStepProgress = (step: StoryStep) => {
    if (!step.duration) return 1;
    
    const stepStart = step.trigger;
    const stepEnd = step.trigger + step.duration;
    
    if (progress < stepStart) return 0;
    if (progress > stepEnd) return 1;
    
    return (progress - stepStart) / step.duration;
  };

  return {
    currentStep,
    progress,
    getStepProgress,
    audioRef
  };
};