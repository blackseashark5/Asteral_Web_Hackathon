import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Rocket, Star, Globe } from 'lucide-react';
import { ChatMessage, HistoricalEvent } from '../types/astronomy';
import { searchHistoricalEvents } from '../services/astronomyAPI';

const SpaceChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "🚀 Welcome to your personal space historian! I can tell you about space missions, discoveries, and cosmic events. Try asking me about Apollo missions, Mars rovers, or any space topic!",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userQuery: string): { content: string; relatedEvents?: HistoricalEvent[] } => {
    const query = userQuery.toLowerCase();
    
    // Search for related historical events
    const relatedEvents = searchHistoricalEvents(query);
    
    // Generate contextual responses based on keywords
    if (query.includes('apollo') || query.includes('moon')) {
      return {
        content: "🌙 The Apollo program was humanity's greatest adventure! Apollo 11 landed on the Moon on July 20, 1969. Neil Armstrong's first words were 'That's one small step for man, one giant leap for mankind.' The program included 17 missions total, with 6 successful Moon landings.",
        relatedEvents: relatedEvents.filter(e => e.title.toLowerCase().includes('apollo') || e.description.toLowerCase().includes('moon'))
      };
    }
    
    if (query.includes('mars') || query.includes('rover')) {
      return {
        content: "🔴 Mars exploration has been incredible! We've sent multiple rovers including Sojourner (1997), Spirit & Opportunity (2004), Curiosity (2012), and Perseverance (2021). Each mission has revealed more about the Red Planet's potential for past or present life.",
        relatedEvents: relatedEvents.filter(e => e.description.toLowerCase().includes('mars'))
      };
    }
    
    if (query.includes('hubble') || query.includes('telescope')) {
      return {
        content: "🔭 The Hubble Space Telescope, launched in 1990, has revolutionized our understanding of the universe! It's taken over 1.5 million observations and helped determine the age of the universe (13.8 billion years). The James Webb Space Telescope, launched in 2021, is now pushing the boundaries even further!",
        relatedEvents: relatedEvents.filter(e => e.title.toLowerCase().includes('hubble') || e.title.toLowerCase().includes('telescope'))
      };
    }
    
    if (query.includes('iss') || query.includes('space station')) {
      return {
        content: "🛰️ The International Space Station has been continuously occupied since November 2000! It's a marvel of international cooperation, involving NASA, Roscosmos, ESA, JAXA, and CSA. Astronauts conduct hundreds of experiments in microgravity.",
        relatedEvents: relatedEvents.filter(e => e.description.toLowerCase().includes('station'))
      };
    }
    
    if (query.includes('voyager')) {
      return {
        content: "🚀 The Voyager missions are humanity's farthest-reaching ambassadors! Voyager 1 (launched 1977) became the first human-made object to enter interstellar space in 2012. Both Voyagers carry golden records with sounds and images from Earth.",
        relatedEvents: relatedEvents.filter(e => e.title.toLowerCase().includes('voyager'))
      };
    }
    
    if (query.includes('sputnik') || query.includes('first satellite')) {
      return {
        content: "🛰️ Sputnik 1, launched on October 4, 1957, started the Space Age! This beach ball-sized satellite orbited Earth every 96 minutes, beeping radio signals that could be heard by amateur radio operators worldwide. It sparked the Space Race!",
        relatedEvents: relatedEvents.filter(e => e.title.toLowerCase().includes('sputnik'))
      };
    }
    
    // Default response with any found events
    if (relatedEvents.length > 0) {
      return {
        content: `✨ I found some interesting space events related to your query! Here are some key moments in space history that match what you're looking for.`,
        relatedEvents
      };
    }
    
    return {
      content: "🌌 That's a fascinating topic! While I don't have specific information about that right now, I'd love to help you explore space history. Try asking me about Apollo missions, Mars rovers, the Hubble telescope, or the International Space Station!"
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        relatedEvents: botResponse.relatedEvents,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="section-heading">
            Space Historian AI
          </h1>
          <p className="section-subheading">
            Your personal guide to space exploration history
          </p>
        </header>

        <main className="cosmic-card h-[600px] flex flex-col" role="main" aria-label="Chat interface">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-3 rounded-full flex-shrink-0 ${message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" aria-hidden="true" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                    )}
                  </div>
                  <div className={`${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {/* Related Events */}
                    {message.relatedEvents && message.relatedEvents.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <p className="text-sm font-bold text-purple-300 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" aria-hidden="true" />
                          <span>Related Space Events:</span>
                        </p>
                        {message.relatedEvents.map((event) => (
                          <article key={event.id} className="bg-gray-600/40 rounded-xl p-4 border-l-4 border-purple-400">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-purple-300 font-bold text-lg">{event.year}</span>
                              <span className="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full font-medium">
                                {event.category.replace('_', ' ')}
                              </span>
                            </div>
                            <h4 className="font-bold text-white text-base mb-2">{event.title}</h4>
                            <p className="descriptive-text text-sm leading-relaxed mb-3">{event.description}</p>
                            {event.moreInfoUrl && (
                              <a 
                                href={event.moreInfoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm underline font-medium transition-colors"
                              >
                                Learn more →
                              </a>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-4 font-medium">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-4 max-w-[85%]">
                  <div className="p-3 rounded-full bg-purple-600">
                    <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="chat-bubble-bot">
                    <div className="flex space-x-2" aria-label="AI is typing">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-600/50 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about space missions, discoveries, or cosmic events..."
                className="cosmic-input flex-1 text-base"
                aria-label="Type your message"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="cosmic-button px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-3 mt-4">
              {['Apollo missions', 'Mars rovers', 'Hubble telescope', 'ISS', 'Voyager probes'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputValue(suggestion)}
                  className="text-sm bg-gray-700/60 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-600/60 transition-colors border border-gray-600/30 hover:border-gray-500/50"
                  aria-label={`Quick suggestion: ${suggestion}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpaceChatbot;