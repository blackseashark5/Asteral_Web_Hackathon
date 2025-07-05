import React, { useState, useEffect } from 'react';
import { Calendar, Download, ExternalLink, Clock, Star, Rocket, Globe, Telescope } from 'lucide-react';
import { HistoricalEvent, APODData, AstronomicalEvent } from '../types/astronomy';
import { getHistoricalEventsForDate, fetchAPOD, getTodaysAstronomicalEvents, generateICSEvent } from '../services/astronomyAPI';

const TodaysEvents: React.FC = () => {
  const [todaysEvents, setTodaysEvents] = useState<HistoricalEvent[]>([]);
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [astronomicalEvents, setAstronomicalEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  useEffect(() => {
    const loadTodaysData = async () => {
      setLoading(true);
      const today = new Date();
      
      // Get historical events for today
      const events = getHistoricalEventsForDate(today);
      setTodaysEvents(events);
      
      // Fetch NASA APOD
      const apod = await fetchAPOD();
      setApodData(apod);
      
      // Get astronomical events
      const astroEvents = await getTodaysAstronomicalEvents();
      setAstronomicalEvents(astroEvents);
      
      setLoading(false);
    };
    
    loadTodaysData();
  }, []);

  const downloadCalendarEvent = (event: HistoricalEvent) => {
    const icsContent = generateICSEvent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}_anniversary.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'launch': return Rocket;
      case 'landing': return Globe;
      case 'discovery': return Telescope;
      case 'space_mission': return Star;
      default: return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'launch': return 'from-red-500 to-orange-500';
      case 'landing': return 'from-blue-500 to-cyan-500';
      case 'discovery': return 'from-purple-500 to-pink-500';
      case 'space_mission': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="descriptive-text">Loading today's cosmic events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="section-heading">
            Today in Space History
          </h1>
          <p className="section-subheading">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>

        {/* NASA APOD Section */}
        {apodData && (
          <section className="mb-16" aria-labelledby="apod-heading">
            <div className="cosmic-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  {apodData.media_type === 'image' ? (
                    <img 
                      src={apodData.url} 
                      alt={apodData.title}
                      className="w-full h-64 lg:h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 lg:h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center rounded-lg">
                      <p className="text-white text-center font-medium">Video content available on NASA website</p>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold">
                    NASA APOD
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 id="apod-heading" className="text-2xl sm:text-3xl font-bold text-white mb-4">{apodData.title}</h2>
                  <p className="descriptive-text mb-6 leading-relaxed">{apodData.explanation}</p>
                  {apodData.copyright && (
                    <p className="descriptive-text-secondary text-sm mb-6">© {apodData.copyright}</p>
                  )}
                  <a 
                    href={apodData.hdurl || apodData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button inline-flex items-center space-x-2 w-fit"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>View Full Resolution</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Today's Astronomical Events */}
        {astronomicalEvents.length > 0 && (
          <section className="mb-16" aria-labelledby="sky-events-heading">
            <h2 id="sky-events-heading" className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center space-x-3">
              <Clock className="w-8 h-8 text-blue-400 animate-pulse" aria-hidden="true" />
              <span>Today's Sky Events</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {astronomicalEvents.map((event) => (
                <article key={event.id} className="cosmic-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-lg">{event.name}</h3>
                    <span className="text-blue-400 font-mono text-base font-bold">{event.time}</span>
                  </div>
                  <p className="descriptive-text text-sm mb-3 leading-relaxed">{event.description}</p>
                  {event.visibility && (
                    <p className="text-green-400 text-sm font-medium">{event.visibility}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Historical Events */}
        <section aria-labelledby="historical-events-heading">
          <h2 id="historical-events-heading" className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-400 animate-pulse" aria-hidden="true" />
            <span>Space History on This Date</span>
          </h2>
          
          {todaysEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {todaysEvents.map((event, index) => {
                const Icon = getCategoryIcon(event.category);
                const colorClass = getCategoryColor(event.category);
                
                return (
                  <article
                    key={event.id}
                    className="timeline-event-card group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedEvent(event)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${event.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedEvent(event);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`bg-gradient-to-br ${colorClass} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-blue-400 font-bold text-xl">{event.year}</span>
                          <span className="text-xs text-gray-300 bg-gray-700/60 px-3 py-1 rounded-full capitalize font-medium">
                            {event.category.replace('_', ' ')}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="descriptive-text text-sm mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-purple-400 font-semibold">
                        {event.significance}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadCalendarEvent(event);
                          }}
                          className="bg-green-600/30 text-green-400 p-3 rounded-lg hover:bg-green-600/40 transition-colors border border-green-500/30"
                          title="Add to Calendar"
                          aria-label="Add event to calendar"
                        >
                          <Download className="w-4 h-4" aria-hidden="true" />
                        </button>
                        {event.moreInfoUrl && (
                          <a
                            href={event.moreInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-blue-600/30 text-blue-400 p-3 rounded-lg hover:bg-blue-600/40 transition-colors border border-blue-500/30"
                            title="More Information"
                            aria-label="Learn more about this event"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6 animate-pulse" aria-hidden="true" />
              <p className="descriptive-text text-xl mb-2">No major space events recorded for today</p>
              <p className="descriptive-text-secondary">But every day is a good day to explore the cosmos!</p>
            </div>
          )}
        </section>

        {/* Enhanced Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content cosmic-card max-w-3xl w-full max-h-[85vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center space-x-6">
                    <div className={`bg-gradient-to-br ${getCategoryColor(selectedEvent.category)} p-5 rounded-xl shadow-lg`}>
                      {React.createElement(getCategoryIcon(selectedEvent.category), { className: "w-10 h-10 text-white", 'aria-hidden': true })}
                    </div>
                    <div>
                      <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                      <p className="text-blue-400 font-bold text-xl">{selectedEvent.year}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-white transition-colors text-3xl font-bold p-2"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3">Description</h3>
                    <p className="descriptive-text leading-relaxed text-base">{selectedEvent.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3">Historical Significance</h3>
                    <p className="text-purple-300 text-base font-medium">{selectedEvent.significance}</p>
                  </div>
                  
                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={() => downloadCalendarEvent(selectedEvent)}
                      className="cosmic-button flex items-center space-x-2 px-6 py-3"
                    >
                      <Download className="w-5 h-5" aria-hidden="true" />
                      <span>Add to Calendar</span>
                    </button>
                    {selectedEvent.moreInfoUrl && (
                      <a
                        href={selectedEvent.moreInfoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-lg hover:bg-blue-700/80 transition-colors flex items-center space-x-2 font-semibold"
                      >
                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                        <span>Learn More</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysEvents;