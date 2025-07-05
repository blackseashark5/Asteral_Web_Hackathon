import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Compass, Star, Sun, Moon, Search, Settings, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Constellation {
  name: string;
  stars: { x: number; y: number; magnitude: number; name?: string }[];
  lines: { from: number; to: number }[];
  visible: boolean;
}

interface CelestialObject {
  name: string;
  type: 'star' | 'planet' | 'moon' | 'satellite';
  x: number;
  y: number;
  magnitude: number;
  color: string;
  visible: boolean;
}

const SkyMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060, name: 'New York' });
  const [time, setTime] = useState(new Date());
  const [showConstellations, setShowConstellations] = useState(true);
  const [showPlanets, setShowPlanets] = useState(true);
  const [showSatellites, setShowSatellites] = useState(false);
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock constellation data
  const constellations: Constellation[] = [
    {
      name: 'Ursa Major',
      stars: [
        { x: 200, y: 150, magnitude: 2.0, name: 'Dubhe' },
        { x: 250, y: 140, magnitude: 2.4, name: 'Merak' },
        { x: 300, y: 160, magnitude: 2.3, name: 'Phecda' },
        { x: 350, y: 180, magnitude: 3.3, name: 'Megrez' },
        { x: 400, y: 170, magnitude: 1.8, name: 'Alioth' },
        { x: 450, y: 190, magnitude: 2.2, name: 'Mizar' },
        { x: 500, y: 220, magnitude: 1.9, name: 'Alkaid' }
      ],
      lines: [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
        { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 }
      ],
      visible: true
    },
    {
      name: 'Orion',
      stars: [
        { x: 300, y: 300, magnitude: 0.1, name: 'Betelgeuse' },
        { x: 350, y: 350, magnitude: 1.6, name: 'Bellatrix' },
        { x: 400, y: 400, magnitude: 2.1, name: 'Mintaka' },
        { x: 420, y: 420, magnitude: 1.7, name: 'Alnilam' },
        { x: 440, y: 440, magnitude: 1.8, name: 'Alnitak' },
        { x: 480, y: 500, magnitude: 0.2, name: 'Rigel' }
      ],
      lines: [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
        { from: 3, to: 4 }, { from: 4, to: 5 }
      ],
      visible: true
    }
  ];

  // Mock celestial objects
  const celestialObjects: CelestialObject[] = [
    { name: 'Mars', type: 'planet', x: 600, y: 200, magnitude: -1.5, color: '#ff6b6b', visible: showPlanets },
    { name: 'Jupiter', type: 'planet', x: 150, y: 400, magnitude: -2.0, color: '#ffd93d', visible: showPlanets },
    { name: 'Venus', type: 'planet', x: 100, y: 100, magnitude: -4.0, color: '#ffeb3b', visible: showPlanets },
    { name: 'ISS', type: 'satellite', x: 400, y: 250, magnitude: -3.0, color: '#00bcd4', visible: showSatellites },
    { name: 'Moon', type: 'moon', x: 500, y: 150, magnitude: -12.0, color: '#f5f5f5', visible: true }
  ];

  useEffect(() => {
    drawSkyMap();
  }, [time, showConstellations, showPlanets, showSatellites, location]);

  const drawSkyMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas with night sky gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f0f23');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw horizon line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.8);
    ctx.lineTo(canvas.width, canvas.height * 0.8);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw cardinal directions
    const directions = ['N', 'E', 'S', 'W'];
    const directionPositions = [
      { x: canvas.width / 2, y: 30 },
      { x: canvas.width - 30, y: canvas.height / 2 },
      { x: canvas.width / 2, y: canvas.height - 30 },
      { x: 30, y: canvas.height / 2 }
    ];

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    directions.forEach((dir, index) => {
      const pos = directionPositions[index];
      ctx.fillText(dir, pos.x, pos.y);
    });

    // Draw constellations
    if (showConstellations) {
      constellations.forEach(constellation => {
        if (!constellation.visible) return;

        // Draw constellation lines
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.lineWidth = 1;
        constellation.lines.forEach(line => {
          const fromStar = constellation.stars[line.from];
          const toStar = constellation.stars[line.to];
          
          ctx.beginPath();
          ctx.moveTo(fromStar.x, fromStar.y);
          ctx.lineTo(toStar.x, toStar.y);
          ctx.stroke();
        });

        // Draw stars
        constellation.stars.forEach(star => {
          const size = Math.max(2, 6 - star.magnitude);
          
          // Star glow
          const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 3);
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Star core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
          ctx.fill();

          // Star name
          if (star.name && size > 3) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(star.name, star.x, star.y - size - 5);
          }
        });

        // Constellation name
        const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length;
        const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length;
        
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(constellation.name, centerX, centerY - 20);
      });
    }

    // Draw celestial objects
    celestialObjects.forEach(object => {
      if (!object.visible) return;

      const size = Math.max(4, 8 - object.magnitude / 2);
      
      // Object glow
      const glowGradient = ctx.createRadialGradient(object.x, object.y, 0, object.x, object.y, size * 4);
      glowGradient.addColorStop(0, object.color + 'CC');
      glowGradient.addColorStop(1, object.color + '00');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(object.x, object.y, size * 4, 0, Math.PI * 2);
      ctx.fill();

      // Object core
      ctx.fillStyle = object.color;
      ctx.beginPath();
      ctx.arc(object.x, object.y, size, 0, Math.PI * 2);
      ctx.fill();

      // Object name
      ctx.fillStyle = object.color;
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(object.name, object.x, object.y - size - 8);

      // Special handling for Moon phases
      if (object.type === 'moon') {
        const phase = (time.getDate() % 28) / 28;
        const shadowSize = size * Math.abs(0.5 - phase) * 2;
        
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        if (phase < 0.5) {
          ctx.arc(object.x + shadowSize, object.y, size, 0, Math.PI * 2);
        } else {
          ctx.arc(object.x - shadowSize, object.y, size, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    });

    // Draw time and location info
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '14px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`Location: ${location.name}`, 20, canvas.height - 60);
    ctx.fillText(`Time: ${time.toLocaleString()}`, 20, canvas.height - 40);
    ctx.fillText(`Coordinates: ${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°`, 20, canvas.height - 20);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked on any celestial object
    const clickedObject = celestialObjects.find(object => {
      if (!object.visible) return false;
      const distance = Math.sqrt(Math.pow(clickX - object.x, 2) + Math.pow(clickY - object.y, 2));
      return distance <= 20;
    });

    setSelectedObject(clickedObject || null);
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: 'Current Location'
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          alert('Unable to get your location. Using default location.');
        }
      );
    }
  };

  const exportSkyMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `sky-map-${time.toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="section-heading">Interactive Sky Map</h1>
          <p className="section-subheading">
            Real-time view of the night sky from your location
          </p>
        </header>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location Controls */}
          <div className="cosmic-card">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Location</span>
            </h3>
            <div className="space-y-4">
              <button
                onClick={updateLocation}
                disabled={isLoading}
                className="w-full cosmic-button py-2 flex items-center justify-center space-x-2"
              >
                <Compass className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Use Current Location</span>
              </button>
              <div className="text-sm text-gray-300">
                <p>Current: {location.name}</p>
                <p>Lat: {location.lat.toFixed(4)}°</p>
                <p>Lng: {location.lng.toFixed(4)}°</p>
              </div>
            </div>
          </div>

          {/* Time Controls */}
          <div className="cosmic-card">
            <h3 className="text-lg font-bold text-white mb-4">Time</h3>
            <div className="space-y-4">
              <input
                type="datetime-local"
                value={time.toISOString().slice(0, 16)}
                onChange={(e) => setTime(new Date(e.target.value))}
                className="w-full cosmic-input"
              />
              <button
                onClick={() => setTime(new Date())}
                className="w-full bg-gray-600/50 text-white py-2 rounded-lg hover:bg-gray-600/70 transition-colors"
              >
                Reset to Now
              </button>
            </div>
          </div>

          {/* Display Options */}
          <div className="cosmic-card">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-purple-400" />
              <span>Display</span>
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showConstellations}
                  onChange={(e) => setShowConstellations(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-white">Constellations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showPlanets}
                  onChange={(e) => setShowPlanets(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-white">Planets</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showSatellites}
                  onChange={(e) => setShowSatellites(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-white">Satellites</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sky Map */}
        <div className="cosmic-card mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Night Sky View</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => setTime(new Date())}
                className="bg-green-600/80 text-white px-4 py-2 rounded-lg hover:bg-green-700/80 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportSkyMap}
                className="bg-purple-600/80 text-white px-4 py-2 rounded-lg hover:bg-purple-700/80 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-96 lg:h-[500px] rounded-lg cursor-crosshair border border-gray-600/30"
              onClick={handleCanvasClick}
            />
            
            {/* Legend */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4 text-sm">
              <h4 className="text-white font-bold mb-2">Legend</h4>
              <div className="space-y-1 text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span>Stars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Constellations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Planets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span>Satellites</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Object Details */}
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cosmic-card"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{selectedObject.name}</h3>
              <button
                onClick={() => setSelectedObject(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Object Information</h4>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Type:</strong> {selectedObject.type.charAt(0).toUpperCase() + selectedObject.type.slice(1)}</p>
                  <p><strong>Magnitude:</strong> {selectedObject.magnitude}</p>
                  <p><strong>Visibility:</strong> {selectedObject.visible ? 'Visible' : 'Not visible'}</p>
                  {selectedObject.type === 'planet' && (
                    <>
                      <p><strong>Distance:</strong> ~{Math.floor(Math.random() * 500 + 100)} million km</p>
                      <p><strong>Next Opposition:</strong> {new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </>
                  )}
                  {selectedObject.type === 'satellite' && (
                    <>
                      <p><strong>Altitude:</strong> ~{Math.floor(Math.random() * 400 + 200)} km</p>
                      <p><strong>Orbital Period:</strong> ~{Math.floor(Math.random() * 60 + 90)} minutes</p>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Observation Tips</h4>
                <div className="text-gray-300 space-y-2">
                  {selectedObject.type === 'planet' && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Best viewed during opposition</li>
                      <li>Use binoculars for better detail</li>
                      <li>Look for steady light (doesn't twinkle)</li>
                    </ul>
                  )}
                  {selectedObject.type === 'satellite' && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Visible as moving point of light</li>
                      <li>Best seen during twilight</li>
                      <li>Crosses sky in 2-5 minutes</li>
                    </ul>
                  )}
                  {selectedObject.type === 'moon' && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Phase changes daily</li>
                      <li>Best for telescopic viewing</li>
                      <li>Visible during day sometimes</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Information Panel */}
        <div className="mt-8 cosmic-card">
          <h3 className="text-xl font-bold text-white mb-6">About the Sky Map</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-3">How to Use</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Click on objects to see detailed information</li>
                <li>• Adjust time to see how the sky changes</li>
                <li>• Use your current location for accurate viewing</li>
                <li>• Toggle different object types on/off</li>
                <li>• Export the current view as an image</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Features</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Real-time sky simulation</li>
                <li>• Location-based accuracy</li>
                <li>• Interactive celestial objects</li>
                <li>• Constellation patterns</li>
                <li>• Planet and satellite tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyMap;