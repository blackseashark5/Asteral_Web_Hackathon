import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Calendar, Bot, Clock, Star, Globe, Telescope } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { searchHistoricalEvents } from '../services/astronomyAPI';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'event' | 'section' | 'external';
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

interface SearchBarProps {
  onNavigate?: (section: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onNavigate }) => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sections = [
    { id: 'today', title: "Today's Events", icon: Calendar, description: 'Live space history and current events' },
    { id: 'timeline', title: '3D Timeline', icon: Clock, description: 'Immersive space history experience' },
    { id: 'chatbot', title: 'Space AI', icon: Bot, description: 'Virtual space historian assistant' },
    { id: 'constellation', title: 'Constellation Explorer', icon: Star, description: 'Interactive star maps', external: 'https://extraordinary-licorice-8c4294.netlify.app/' },
    { id: 'planets', title: 'Planet Explorer', icon: Globe, description: 'Explore worlds beyond Earth', external: 'https://helpful-sprinkles-3ea672.netlify.app/' },
    { id: 'earth', title: 'Earth Explorer', icon: Telescope, description: 'Our home planet from space', external: 'https://scintillating-liger-0ff9a4.netlify.app/' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchResults: SearchResult[] = [];

      // Search sections
      sections.forEach(section => {
        if (section.title.toLowerCase().includes(query) || section.description.toLowerCase().includes(query)) {
          searchResults.push({
            id: section.id,
            title: section.title,
            type: section.external ? 'external' : 'section',
            description: section.description,
            icon: section.icon,
            action: () => {
              if (section.external) {
                window.open(section.external, '_blank');
              } else if (onNavigate) {
                onNavigate(section.id);
              }
              setIsOpen(false);
              setSearchQuery('');
            }
          });
        }
      });

      // Search historical events
      const events = searchHistoricalEvents(query);
      events.slice(0, 5).forEach(event => {
        searchResults.push({
          id: event.id,
          title: event.title,
          type: 'event',
          description: `${event.year} - ${event.description.substring(0, 100)}...`,
          icon: Calendar,
          action: () => {
            if (onNavigate) {
              onNavigate('today');
            }
            setIsOpen(false);
            setSearchQuery('');
          }
        });
      });

      setResults(searchResults);
      setSelectedIndex(-1);
    } else {
      setResults([]);
    }
  }, [searchQuery, onNavigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        results[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md" data-tutorial="search">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search space events, missions, or explore..."
          className="w-full pl-10 pr-10 py-3 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 rounded-xl border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          aria-label="Search cosmic explorer"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-600/50 shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <button
                  key={result.id}
                  onClick={result.action}
                  className={`w-full text-left p-4 hover:bg-gray-700/50 transition-colors border-b border-gray-700/30 last:border-b-0 flex items-start space-x-3 ${
                    index === selectedIndex ? 'bg-gray-700/50' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    result.type === 'external' ? 'bg-purple-600/30' : 
                    result.type === 'event' ? 'bg-blue-600/30' : 'bg-green-600/30'
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm mb-1">{result.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{result.description}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      result.type === 'external' ? 'bg-purple-500/20 text-purple-300' :
                      result.type === 'event' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                    }`}>
                      {result.type === 'external' ? 'External Tool' : 
                       result.type === 'event' ? 'Historical Event' : 'Section'}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;