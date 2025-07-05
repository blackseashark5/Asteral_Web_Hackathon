import React, { useState, useEffect } from 'react';
import { Monitor, Radio, Thermometer, Gauge, Satellite, Volume2, VolumeX, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface TelemetryData {
  temperature: number;
  pressure: number;
  altitude: number;
  velocity: number;
  batteryLevel: number;
  signalStrength: number;
}

interface MissionControlProps {
  isOpen: boolean;
  onClose: () => void;
}

const MissionControl: React.FC<MissionControlProps> = ({ isOpen, onClose }) => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData>({
    temperature: 22,
    pressure: 101.3,
    altitude: 408,
    velocity: 7.66,
    batteryLevel: 87,
    signalStrength: 95
  });
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState('iss');
  const [missionComms, setMissionComms] = useState<string[]>([]);

  const feeds = [
    { id: 'iss', name: 'International Space Station', status: 'live' },
    { id: 'mars', name: 'Mars Perseverance Rover', status: 'live' },
    { id: 'jwst', name: 'James Webb Space Telescope', status: 'live' },
    { id: 'artemis', name: 'Artemis Mission Prep', status: 'simulation' }
  ];

  const commMessages = [
    "ISS, this is Houston. All systems nominal.",
    "Roger Houston, confirming orbital parameters.",
    "Telemetry looks good from our end.",
    "Beginning scheduled maintenance on solar arrays.",
    "Houston, we have visual confirmation of the aurora.",
    "Copy that ISS, beautiful view from up there.",
    "Initiating experiment sequence Alpha-7.",
    "Ground control, requesting permission for EVA prep.",
    "ISS, you are go for EVA preparation.",
    "Roger, beginning EVA checklist procedures."
  ];

  useEffect(() => {
    // Simulate real-time telemetry updates
    const telemetryInterval = setInterval(() => {
      setTelemetryData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        pressure: prev.pressure + (Math.random() - 0.5) * 0.5,
        altitude: prev.altitude + (Math.random() - 0.5) * 0.1,
        velocity: prev.velocity + (Math.random() - 0.5) * 0.01,
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 0.5)),
        signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    // Simulate mission communications
    const commsInterval = setInterval(() => {
      if (audioEnabled) {
        const randomMessage = commMessages[Math.floor(Math.random() * commMessages.length)];
        setMissionComms(prev => {
          const newComms = [
            `${new Date().toLocaleTimeString()}: ${randomMessage}`,
            ...prev.slice(0, 9)
          ];
          return newComms;
        });
      }
    }, 8000);

    return () => {
      clearInterval(telemetryInterval);
      clearInterval(commsInterval);
    };
  }, [audioEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-green-400 bg-green-500/20';
      case 'simulation': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTelemetryColor = (value: number, type: string) => {
    switch (type) {
      case 'battery':
        if (value > 80) return 'text-green-400';
        if (value > 50) return 'text-yellow-400';
        return 'text-red-400';
      case 'signal':
        if (value > 90) return 'text-green-400';
        if (value > 70) return 'text-yellow-400';
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="cosmic-card max-w-7xl w-full h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Monitor className="w-6 h-6 text-green-400" />
            <span>Mission Control Center</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feed Selection */}
            <div className="flex space-x-2 overflow-x-auto">
              {feeds.map((feed) => (
                <button
                  key={feed.id}
                  onClick={() => setSelectedFeed(feed.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFeed === feed.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      feed.status === 'live' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'
                    }`}></div>
                    <span>{feed.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Video Feed */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Live space feed"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center space-x-3">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feeds.find(f => f.id === selectedFeed)?.status || 'live')}`}>
                  {feeds.find(f => f.id === selectedFeed)?.name}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-md rounded-lg p-3">
                  <p className="text-white text-sm">
                    Current view: Earth from {feeds.find(f => f.id === selectedFeed)?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Telemetry Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300 text-sm">Temperature</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {telemetryData.temperature.toFixed(1)}°C
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {telemetryData.pressure.toFixed(1)} kPa
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Satellite className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Altitude</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {telemetryData.altitude.toFixed(1)} km
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Velocity</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {telemetryData.velocity.toFixed(2)} km/s
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span className="text-gray-300 text-sm">Battery</span>
                </div>
                <div className={`text-2xl font-bold ${getTelemetryColor(telemetryData.batteryLevel, 'battery')}`}>
                  {telemetryData.batteryLevel.toFixed(0)}%
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm">Signal</span>
                </div>
                <div className={`text-2xl font-bold ${getTelemetryColor(telemetryData.signalStrength, 'signal')}`}>
                  {telemetryData.signalStrength.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>

          {/* Mission Communications */}
          <div className="space-y-6">
            {/* Audio Controls */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Mission Audio</h3>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    audioEnabled ? 'bg-green-600/30 text-green-400' : 'bg-gray-600/30 text-gray-400'
                  }`}
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${audioEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-gray-300 text-sm">
                  {audioEnabled ? 'Monitoring communications' : 'Audio disabled'}
                </span>
              </div>
            </div>

            {/* Communications Log */}
            <div className="bg-gray-700/50 rounded-lg p-4 flex-1">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Radio className="w-4 h-4 text-blue-400" />
                <span>Mission Communications</span>
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {missionComms.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">
                    {audioEnabled ? 'Listening for communications...' : 'Enable audio to monitor communications'}
                  </p>
                ) : (
                  missionComms.map((comm, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
                    >
                      <p className="text-blue-300 text-sm font-mono">{comm}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Mission Status */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Mission Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">System Status</span>
                  <span className="text-green-400 text-sm font-medium">NOMINAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Crew Status</span>
                  <span className="text-green-400 text-sm font-medium">HEALTHY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Mission Phase</span>
                  <span className="text-blue-400 text-sm font-medium">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Next Event</span>
                  <span className="text-yellow-400 text-sm font-medium">EVA PREP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionControl;