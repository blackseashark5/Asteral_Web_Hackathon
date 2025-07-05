import React, { useState, useEffect } from 'react';
import { Rocket, Calendar, MapPin, ExternalLink, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Mission {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  destination: string;
  description: string;
  status: 'scheduled' | 'delayed' | 'in_progress';
  missionType: 'robotic' | 'crewed' | 'telescope' | 'satellite';
  imageUrl?: string;
  moreInfoUrl?: string;
}

const upcomingMissions: Mission[] = [
  {
    id: 'artemis-3',
    name: 'Artemis III',
    agency: 'NASA',
    launchDate: '2026-09-01',
    destination: 'Moon (South Pole)',
    description: 'First crewed lunar landing since Apollo 17, aiming to establish sustainable lunar presence.',
    status: 'scheduled',
    missionType: 'crewed',
    moreInfoUrl: 'https://www.nasa.gov/artemis'
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA',
    launchDate: '2024-10-14',
    destination: 'Jupiter\'s Moon Europa',
    description: 'Mission to study Europa\'s subsurface ocean and potential for life.',
    status: 'scheduled',
    missionType: 'robotic',
    moreInfoUrl: 'https://www.nasa.gov/europa'
  },
  {
    id: 'mars-sample-return',
    name: 'Mars Sample Return',
    agency: 'NASA/ESA',
    launchDate: '2028-07-01',
    destination: 'Mars',
    description: 'Ambitious mission to bring Martian samples back to Earth for detailed analysis.',
    status: 'scheduled',
    missionType: 'robotic',
    moreInfoUrl: 'https://www.nasa.gov/mars-sample-return'
  },
  {
    id: 'dragonfly',
    name: 'Dragonfly',
    agency: 'NASA',
    launchDate: '2027-06-01',
    destination: 'Saturn\'s Moon Titan',
    description: 'Rotorcraft lander to explore Titan\'s surface and atmosphere.',
    status: 'scheduled',
    missionType: 'robotic',
    moreInfoUrl: 'https://www.nasa.gov/dragonfly'
  },
  {
    id: 'lunar-gateway',
    name: 'Lunar Gateway',
    agency: 'NASA/International',
    launchDate: '2025-11-01',
    destination: 'Lunar Orbit',
    description: 'Space station in lunar orbit to support deep space exploration.',
    status: 'in_progress',
    missionType: 'crewed',
    moreInfoUrl: 'https://www.nasa.gov/gateway'
  }
];

interface FutureMissionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FutureMissions: React.FC<FutureMissionsProps> = ({ isOpen, onClose }) => {
  const [missions, setMissions] = useState<Mission[]>(upcomingMissions);
  const [filter, setFilter] = useState<'all' | 'robotic' | 'crewed' | 'telescope' | 'satellite'>('all');

  const filteredMissions = missions.filter(mission => 
    filter === 'all' || mission.missionType === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-green-400 bg-green-500/20';
      case 'delayed': return 'text-yellow-400 bg-yellow-500/20';
      case 'in_progress': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'crewed': return '👨‍🚀';
      case 'robotic': return '🤖';
      case 'telescope': return '🔭';
      case 'satellite': return '🛰️';
      default: return '🚀';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilLaunch = (dateString: string) => {
    const launchDate = new Date(dateString);
    const today = new Date();
    const diffTime = launchDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <span>Future Space Missions</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'robotic', 'crewed', 'telescope', 'satellite'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMissions.map((mission, index) => {
            const daysUntil = getDaysUntilLaunch(mission.launchDate);
            
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getMissionTypeIcon(mission.missionType)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{mission.name}</h3>
                      <p className="text-sm text-gray-400">{mission.agency}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                    {mission.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{formatDate(mission.launchDate)}</span>
                    {daysUntil > 0 && (
                      <span className="text-blue-400 font-medium">
                        ({daysUntil} days)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{mission.destination}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {mission.description}
                </p>

                {mission.moreInfoUrl && (
                  <a
                    href={mission.moreInfoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No missions found for this filter.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FutureMissions;