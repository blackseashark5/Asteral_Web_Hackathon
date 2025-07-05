import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, Star, Trophy, RotateCcw } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const spaceQuestions: Question[] = [
  {
    id: '1',
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface.',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'What was the first artificial satellite launched into space?',
    options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Luna 1'],
    correctAnswer: 1,
    explanation: 'Sputnik 1 was launched by the Soviet Union on October 4, 1957.',
    difficulty: 'medium'
  },
  {
    id: '3',
    question: 'How long does it take light from the Sun to reach Earth?',
    options: ['8 minutes', '8 seconds', '8 hours', '8 days'],
    correctAnswer: 0,
    explanation: 'Light travels at 299,792,458 meters per second and takes about 8 minutes and 20 seconds to reach Earth.',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'Which spacecraft was the first to land humans on the Moon?',
    options: ['Apollo 10', 'Apollo 11', 'Apollo 12', 'Gemini 7'],
    correctAnswer: 1,
    explanation: 'Apollo 11 successfully landed Neil Armstrong and Buzz Aldrin on the Moon on July 20, 1969.',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: 'What is the largest moon in our solar system?',
    options: ['Europa', 'Titan', 'Ganymede', 'Callisto'],
    correctAnswer: 2,
    explanation: 'Ganymede, a moon of Jupiter, is the largest moon in our solar system.',
    difficulty: 'hard'
  }
];

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const { user, setUser, addAchievement } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions] = useState(spaceQuestions);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      
      // Update user progress and achievements
      if (user) {
        const updatedUser = {
          ...user,
          progress: {
            ...user.progress,
            quizzesCompleted: user.progress.quizzesCompleted + 1
          }
        };
        
        // Add achievements based on score
        if (score === questions.length) {
          addAchievement('perfect_score');
        } else if (score >= questions.length * 0.8) {
          addAchievement('space_expert');
        } else if (score >= questions.length * 0.6) {
          addAchievement('space_enthusiast');
        }
        
        if (user.progress.quizzesCompleted === 0) {
          addAchievement('first_quiz');
        }
        
        setUser(updatedUser);
      }
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a true space expert! 🚀";
    if (percentage >= 80) return "Excellent! Your cosmic knowledge is impressive! ⭐";
    if (percentage >= 60) return "Good job! Keep exploring the cosmos! 🌟";
    return "Keep learning! The universe has so much to discover! 🌌";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="cosmic-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {!quizCompleted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Space Knowledge Quiz</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-blue-400">Score: {score}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-300 ";
                    
                    if (selectedAnswer === null) {
                      buttonClass += "border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-blue-400/50 text-white";
                    } else if (index === questions[currentQuestion].correctAnswer) {
                      buttonClass += "border-green-500 bg-green-500/20 text-green-300";
                    } else if (index === selectedAnswer) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-300";
                    } else {
                      buttonClass += "border-gray-600 bg-gray-700/30 text-gray-400";
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={buttonClass}
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option}</span>
                          {selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                          {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                >
                  <h4 className="text-blue-300 font-semibold mb-2">Explanation:</h4>
                  <p className="text-gray-300 leading-relaxed">{questions[currentQuestion].explanation}</p>
                </motion.div>
              )}

              {showExplanation && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="cosmic-button px-6 py-3"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-300">{getScoreMessage()}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mb-8">
                <div className="text-4xl font-bold text-white mb-2">
                  {score} / {questions.length}
                </div>
                <div className="text-lg text-gray-300">
                  {Math.round((score / questions.length) * 100)}% Correct
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-gray-600/50 text-white px-6 py-3 rounded-lg hover:bg-gray-600/70 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="cosmic-button px-6 py-3"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Quiz;