import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HistoricalEvent } from '../types/astronomy';

interface User {
  id: string;
  username: string;
  email: string;
  preferences: {
    theme: 'dark' | 'light';
    language: string;
    soundEnabled: boolean;
    highContrast: boolean;
    musicVolume: number;
  };
  favorites: string[];
  achievements: string[];
  progress: {
    eventsExplored: number;
    constellationsViewed: number;
    planetsVisited: number;
    quizzesCompleted: number;
  };
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  achievements: string[];
  addAchievement: (achievement: string) => void;
  offlineMode: boolean;
  setOfflineMode: (offline: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [highContrast, setHighContrast] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [offlineMode, setOfflineMode] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cosmic-explorer-user');
    const savedTheme = localStorage.getItem('cosmic-explorer-theme') as 'dark' | 'light';
    const savedLanguage = localStorage.getItem('cosmic-explorer-language');
    const savedSound = localStorage.getItem('cosmic-explorer-sound');
    const savedVolume = localStorage.getItem('cosmic-explorer-volume');
    const savedContrast = localStorage.getItem('cosmic-explorer-contrast');
    const savedFavorites = localStorage.getItem('cosmic-explorer-favorites');
    const savedAchievements = localStorage.getItem('cosmic-explorer-achievements');
    const hasSeenTutorial = localStorage.getItem('cosmic-explorer-tutorial-seen');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedSound) setSoundEnabled(JSON.parse(savedSound));
    if (savedVolume) setMusicVolume(parseFloat(savedVolume));
    if (savedContrast) setHighContrast(JSON.parse(savedContrast));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (!hasSeenTutorial) setShowTutorial(true);

    // Check if user is offline
    const handleOnline = () => setOfflineMode(false);
    const handleOffline = () => setOfflineMode(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setOfflineMode(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) localStorage.setItem('cosmic-explorer-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [theme, highContrast]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-volume', musicVolume.toString());
  }, [musicVolume]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-contrast', JSON.stringify(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cosmic-explorer-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const addToFavorites = (id: string) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const addAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
    }
  };

  const value: AppContextType = {
    user,
    setUser,
    theme,
    toggleTheme,
    language,
    setLanguage,
    soundEnabled,
    toggleSound,
    musicVolume,
    setMusicVolume,
    highContrast,
    toggleHighContrast,
    favorites,
    addToFavorites,
    removeFromFavorites,
    searchQuery,
    setSearchQuery,
    showTutorial,
    setShowTutorial,
    achievements,
    addAchievement,
    offlineMode,
    setOfflineMode
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};