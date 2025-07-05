import React, { useState, useEffect } from 'react';
import { Rocket, Play, Pause, RotateCcw, MapPin, Clock, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionStage {
  id: string;
  title: string;
  description: string;
  audioLog: string;
  choices?: {
    id: string;
    text: string;
    outcome: string;
    nextStage?: string;
  }[];
  isDecisionPoint: boolean;
  duration: number;
}

interface Mission {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  stages: MissionStage[];
}

const missions: Mission[] = [
  {
    id: 'apollo-11',
    name: 'Apollo 11 Moon Landing',
    description: 'Experience the historic first human landing on the Moon',
    difficulty: 'medium',
    estimatedTime: '15-20 minutes',
    stages: [
      {
        id: 'launch',
        title: 'Launch from Kennedy Space Center',
        description: 'You are aboard Apollo 11 with Neil Armstrong and Buzz Aldrin. The massive Saturn V rocket ignites beneath you.',
        audioLog: 'T-minus 10... 9... 8... 7... 6... 5... 4... 3... 2... 1... We have liftoff! Apollo 11 has cleared the tower.',
        isDecisionPoint: false,
        duration: 3000
      },
      {
        id: 'earth-orbit',
        title: 'Earth Orbit Check',
        description: 'You\'re now in Earth orbit. Mission Control is checking all systems before the Trans-Lunar Injection burn.',
        audioLog: 'Apollo 11, this is Houston. All systems are go for TLI. You are cleared for Trans-Lunar Injection.',
        isDecisionPoint: true,
        duration: 4000,
        choices: [
          {
            id: 'proceed-tli',
            text: 'Proceed with Trans-Lunar Injection',
            outcome: 'Perfect execution! You\'re on course for the Moon.',
            nextStage: 'lunar-approach'
          },
          {
            id: 'delay-tli',
            text: 'Request additional systems check',
            outcome: 'Cautious approach pays off. All systems confirmed nominal.',
            nextStage: 'lunar-approach'
          }
        ]
      },
      {
        id: 'lunar-approach',
        title: 'Lunar Approach',
        description: 'After three days of travel, the Moon looms large ahead. The Lunar Module Eagle prepares to separate.',
        audioLog: 'Eagle, you are go for separation. Good luck, and Godspeed.',
        isDecisionPoint: true,
        duration: 5000,
        choices: [
          {
            id: 'manual-landing',
            text: 'Take manual control for landing',
            outcome: 'You skillfully navigate around boulders to find a safe landing site.',
            nextStage: 'moon-landing'
          },
          {
            id: 'auto-landing',
            text: 'Trust the automatic guidance system',
            outcome: 'The computer guides you to a relatively smooth area.',
            nextStage: 'moon-landing'
          }
        ]
      },
      {
        id: 'moon-landing',
        title: 'Moon Landing',
        description: 'The Eagle has landed in the Sea of Tranquility. You\'ve made history!',
        audioLog: 'Houston, Tranquility Base here. The Eagle has landed.',
        isDecisionPoint: false,
        duration: 4000
      }
    ]
  },
  {
    id: 'mars-perseverance',
    name: 'Mars Perseverance Mission',
    description: 'Guide the Perseverance rover through its mission to find signs of ancient life',
    difficulty: 'hard',
    estimatedTime: '20-25 minutes',
    stages: [
      {
        id: 'launch-mars',
        title: 'Launch to Mars',
        description: 'Perseverance launches aboard an Atlas V rocket, beginning its 7-month journey to Mars.',
        audioLog: 'Liftoff! Perseverance is on its way to Mars to search for signs of ancient microbial life.',
        isDecisionPoint: false,
        duration: 3000
      },
      {
        id: 'mars-entry',
        title: 'Mars Atmospheric Entry',
        description: 'The spacecraft enters Mars\' atmosphere at 12,000 mph. The heat shield protects the rover.',
        audioLog: 'Entry, descent, and landing sequence initiated. Heat shield is performing nominally.',
        isDecisionPoint: true,
        duration: 4000,
        choices: [
          {
            id: 'deploy-chute-early',
            text: 'Deploy parachute early for safety',
            outcome: 'Conservative approach works. Parachute deploys successfully.',
            nextStage: 'sky-crane'
          },
          {
            id: 'deploy-chute-nominal',
            text: 'Deploy parachute at nominal time',
            outcome: 'Perfect timing! All systems nominal for sky crane deployment.',
            nextStage: 'sky-crane'
          }
        ]
      },
      {
        id: 'sky-crane',
        title: 'Sky Crane Landing',
        description: 'The innovative sky crane system lowers Perseverance to the Martian surface.',
        audioLog: 'Sky crane maneuver initiated. Rover is being lowered to the surface.',
        isDecisionPoint: false,
        duration: 5000
      }
    ]
  }
];

interface MissionJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

const MissionJourney: React.FC<MissionJourneyProps> = ({ isOpen, onClose }) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedMission && currentStageIndex < selectedMission.stages.length) {
      const currentStage = selectedMission.stages[currentStageIndex];
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (currentStage.duration / 100));
          if (newProgress >= 100) {
            setIsPlaying(false);
            if (!currentStage.isDecisionPoint) {
              setTimeout(() => {
                if (currentStageIndex < selectedMission.stages.length - 1) {
                  setCurrentStageIndex(prev => prev + 1);
                  setProgress(0);
                } else {
                  setMissionComplete(true);
                }
              }, 1000);
            }
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, selectedMission, currentStageIndex]);

  const handleMissionSelect = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentStageIndex(0);
    setProgress(0);
    setMissionComplete(false);
    setChoices([]);
  };

  const handleChoice = (choice: any) => {
    setChoices(prev => [...prev, choice.outcome]);
    setIsPlaying(false);
    
    setTimeout(() => {
      if (choice.nextStage && selectedMission) {
        const nextStageIndex = selectedMission.stages.findIndex(stage => stage.id === choice.nextStage);
        if (nextStageIndex !== -1) {
          setCurrentStageIndex(nextStageIndex);
          setProgress(0);
        }
      } else if (selectedMission && currentStageIndex < selectedMission.stages.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
        setProgress(0);
      } else {
        setMissionComplete(true);
      }
    }, 2000);
  };

  const resetMission = () => {
    setCurrentStageIndex(0);
    setProgress(0);
    setMissionComplete(false);
    setChoices([]);
    setIsPlaying(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="cosmic-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Rocket className="w-6 h-6 text-blue-400" />
            <span>Mission Journeys</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {!selectedMission ? (
          <div className="space-y-6">
            <p className="text-gray-300 text-center mb-8">
              Choose a mission to experience space exploration from a first-person perspective
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {missions.map((mission) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                  onClick={() => handleMissionSelect(mission)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{mission.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{mission.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{mission.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-400">
                      <MapPin className="w-4 h-4" />
                      <span>{mission.stages.length} stages</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mission Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMission.name}</h3>
                <p className="text-gray-400">Stage {currentStageIndex + 1} of {selectedMission.stages.length}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={resetMission}
                  className="bg-gray-600/50 text-white p-2 rounded-lg hover:bg-gray-600/70 transition-colors"
                  title="Reset mission"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedMission(null)}
                  className="bg-blue-600/50 text-white px-4 py-2 rounded-lg hover:bg-blue-600/70 transition-colors"
                >
                  Choose Different Mission
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStageIndex + progress / 100) / selectedMission.stages.length) * 100}%` }}
              />
            </div>

            {!missionComplete ? (
              <div className="space-y-6">
                {/* Current Stage */}
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-3">
                    {selectedMission.stages[currentStageIndex].title}
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {selectedMission.stages[currentStageIndex].description}
                  </p>
                  
                  {/* Audio Log */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 font-semibold text-sm">Mission Audio Log</span>
                    </div>
                    <p className="text-gray-300 italic">
                      "{selectedMission.stages[currentStageIndex].audioLog}"
                    </p>
                  </div>

                  {/* Stage Progress */}
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Controls */}
                  {!selectedMission.stages[currentStageIndex].isDecisionPoint ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="cosmic-button px-6 py-3 flex items-center space-x-2"
                        disabled={progress >= 100}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        <span>{isPlaying ? 'Pause' : progress >= 100 ? 'Complete' : 'Continue'}</span>
                      </button>
                    </div>
                  ) : (
                    progress >= 100 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <AlertTriangle className="w-5 h-5" />
                          <span className="font-semibold">Decision Point</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedMission.stages[currentStageIndex].choices?.map((choice) => (
                            <button
                              key={choice.id}
                              onClick={() => handleChoice(choice)}
                              className="text-left p-4 bg-gray-600/50 hover:bg-gray-600/70 rounded-lg transition-colors border border-gray-500/30 hover:border-blue-400/50"
                            >
                              <span className="text-white font-medium">{choice.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Previous Choices */}
                {choices.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="text-white font-semibold flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Your Decisions</span>
                    </h5>
                    {choices.map((choice, index) => (
                      <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-green-300 text-sm">{choice}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mission Complete!</h3>
                <p className="text-gray-300 mb-6">
                  Congratulations! You've successfully completed the {selectedMission.name} mission.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetMission}
                    className="bg-blue-600/80 text-white px-6 py-3 rounded-lg hover:bg-blue-700/80 transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setSelectedMission(null)}
                    className="cosmic-button px-6 py-3"
                  >
                    Choose New Mission
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MissionJourney;