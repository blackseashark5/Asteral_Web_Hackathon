import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Star, Calendar, Bot, Clock, Rocket } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Tutorial: React.FC = () => {
  const { showTutorial, setShowTutorial } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Cosmic Explorer! 🚀",
      content: "Your journey through space begins here. Let's take a quick tour to help you navigate the cosmos.",
      icon: Star,
      position: "center"
    },
    {
      title: "Today's Events",
      content: "Discover what happened on this day in space history, view NASA's Astronomy Picture of the Day, and get real-time sky events.",
      icon: Calendar,
      position: "top-left",
      highlight: "[data-tutorial='today-events']"
    },
    {
      title: "3D Timeline",
      content: "Experience space history in an immersive 3D environment. Click, drag, and explore major space milestones.",
      icon: Clock,
      position: "top-center",
      highlight: "[data-tutorial='timeline']"
    },
    {
      title: "Space AI Assistant",
      content: "Chat with our AI historian about space missions, discoveries, and cosmic events. Ask anything about space!",
      icon: Bot,
      position: "top-right",
      highlight: "[data-tutorial='chatbot']"
    },
    {
      title: "Search & Explore",
      content: "Use the search bar to quickly find events, missions, or topics. Your cosmic knowledge is just a search away!",
      icon: Rocket,
      position: "top-center",
      highlight: "[data-tutorial='search']"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setShowTutorial(false);
    localStorage.setItem('cosmic-explorer-tutorial-seen', 'true');
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!showTutorial) return null;

  const currentStepData = tutorialSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="cosmic-card max-w-lg w-full relative"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentStepData.title}</h2>
                <p className="text-sm text-gray-400">Step {currentStep + 1} of {tutorialSteps.length}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close tutorial"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <p className="descriptive-text leading-relaxed">{currentStepData.content}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-blue-400">{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Skip Tutorial
            </button>
            
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-gray-600/50 text-white px-4 py-2 rounded-lg hover:bg-gray-600/70 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="cosmic-button px-4 py-2 flex items-center space-x-2"
              >
                <span>{currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Tutorial;