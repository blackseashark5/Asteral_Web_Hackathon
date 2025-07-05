import React, { useState, useEffect } from 'react';
import { Video, Satellite, Globe, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface LiveFeed {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'image' | 'data';
  source: string;
  isLive: boolean;
  thumbnail?: string;
}

const liveFeeds: LiveFeed[] = [
  {
    id: 'iss-hd',
    title: 'ISS HD Earth Viewing',
    description: 'Live view of Earth from the International Space Station',
    url: 'https://www.nasa.gov/live',
    type: 'video',
    source: 'NASA',
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'nasa-tv',
    title: 'NASA TV Live',
    description: 'Official NASA television programming',
    url: 'https://www.nasa.gov/live',
    type: 'video',
    source: 'NASA',
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'solar-dynamics',
    title: 'Solar Dynamics Observatory',
    description: 'Real-time images of the Sun',
    url: 'https://sdo.gsfc.nasa.gov/data/',
    type: 'image',
    source: 'NASA SDO',
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'spaceweather',
    title: 'Space Weather Data',
    description: 'Current space weather conditions',
    url: 'https://www.spaceweather.gov/',
    type: 'data',
    source: 'NOAA',
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

interface LiveFeedsProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveFeeds: React.FC<LiveFeedsProps> = ({ isOpen, onClose }) => {
  const [feeds, setFeeds] = useState<LiveFeed[]>(liveFeeds);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Satellite;
      case 'data': return Globe;
      default: return Video;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-400 bg-red-500/20';
      case 'image': return 'text-blue-400 bg-blue-500/20';
      case 'data': return 'text-green-400 bg-green-500/20';
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
            <Video className="w-6 h-6 text-red-400" />
            <span>Live Space Feeds</span>
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gray-600/50 text-white p-2 rounded-lg hover:bg-gray-600/70 transition-colors disabled:opacity-50"
              title="Refresh feeds"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feeds.map((feed, index) => {
            const Icon = getTypeIcon(feed.type);
            
            return (
              <motion.div
                key={feed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/50 rounded-xl overflow-hidden border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={feed.thumbnail}
                    alt={feed.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    {feed.isLive && (
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(feed.type)}`}>
                      {feed.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-400" />
                      <h3 className="font-bold text-white">{feed.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {feed.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      Source: {feed.source}
                    </span>
                    <a
                      href={feed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cosmic-button text-sm px-4 py-2 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Watch Live</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-blue-300 font-semibold mb-3 flex items-center space-x-2">
            <Satellite className="w-5 h-5" />
            <span>About Live Feeds</span>
          </h3>
          <p className="text-gray-300 leading-relaxed">
            These live feeds provide real-time views and data from space missions, observatories, and monitoring stations. 
            Experience the wonder of space exploration as it happens, from Earth observations to solar activity monitoring.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveFeeds;