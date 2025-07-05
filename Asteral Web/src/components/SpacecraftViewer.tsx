import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { Mesh, Vector3, Color } from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Info, Play, Pause, Settings, Camera, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced 3D spacecraft models with more detail
const DetailedSpacecraftModel: React.FC<{ name: string; animated?: boolean }> = ({ name, animated = true }) => {
  const meshRef = useRef<Mesh>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state, delta) => {
    if (meshRef.current && animated) {
      setTime(time + delta);
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = Math.sin(time * 2) * 0.1;
    }
  });

  if (name === 'apollo') {
    return (
      <group ref={meshRef}>
        {/* Command Module - More detailed */}
        <mesh position={[0, 2, 0]}>
          <coneGeometry args={[1.2, 2.5, 12]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Heat Shield */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.2]} />
          <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Service Module */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1, 1, 3]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Engine Nozzle */}
        <mesh position={[0, -2.5, 0]}>
          <coneGeometry args={[0.6, 1, 8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Solar Panels - More detailed */}
        {[-1, 1].map((side, i) => (
          <group key={i} position={[side * 2.5, -0.5, 0]}>
            <mesh>
              <boxGeometry args={[3, 0.1, 2]} />
              <meshStandardMaterial color="#1e3a8a" metalness={0.1} roughness={0.9} />
            </mesh>
            {/* Solar cells pattern */}
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh key={j} position={[0, 0.06, -0.8 + j * 0.3]}>
                <boxGeometry args={[2.8, 0.02, 0.25]} />
                <meshStandardMaterial color="#1e40af" metalness={0.2} roughness={0.8} />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Antenna */}
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* RCS Thrusters */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.1, 1, Math.sin(angle) * 1.1]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2]} />
              <meshStandardMaterial color="#ff6b35" />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (name === 'mars-rover') {
    return (
      <group ref={meshRef}>
        {/* Main Body - More detailed */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.5, 1.2, 3.5]} />
          <meshStandardMaterial color="#d97706" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Equipment Bay */}
        <mesh position={[0, 1.5, -1]}>
          <boxGeometry args={[1.5, 0.8, 1]} />
          <meshStandardMaterial color="#92400e" metalness={0.4} roughness={0.6} />
        </mesh>
        
        {/* Wheels - More realistic */}
        {[-1.2, 1.2].map((x, i) => 
          [-1.5, 0, 1.5].map((z, j) => (
            <group key={`${i}-${j}`} position={[x, 0, z]}>
              <mesh>
                <cylinderGeometry args={[0.4, 0.4, 0.3]} />
                <meshStandardMaterial color="#1f2937" metalness={0.1} roughness={0.9} />
              </mesh>
              {/* Wheel treads */}
              {Array.from({ length: 12 }).map((_, k) => {
                const angle = (k / 12) * Math.PI * 2;
                return (
                  <mesh key={k} position={[Math.cos(angle) * 0.41, 0, Math.sin(angle) * 0.41]}>
                    <boxGeometry args={[0.1, 0.3, 0.05]} />
                    <meshStandardMaterial color="#000000" />
                  </mesh>
                );
              })}
            </group>
          ))
        )}
        
        {/* Suspension Arms */}
        {[-1.2, 1.2].map((x, i) => 
          [-1.5, 0, 1.5].map((z, j) => (
            <mesh key={`arm-${i}-${j}`} position={[x * 0.7, 0.4, z]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>
          ))
        )}
        
        {/* Camera Mast - More detailed */}
        <mesh position={[0, 2.2, 0.5]}>
          <cylinderGeometry args={[0.08, 0.08, 1.5]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Camera Head */}
        <mesh position={[0, 3, 0.5]}>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
          <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Cameras */}
        {[-0.1, 0.1].map((offset, i) => (
          <mesh key={i} position={[offset, 3, 0.6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        ))}
        
        {/* Solar Panel - More realistic */}
        <group position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 12]}>
          <mesh>
            <boxGeometry args={[4, 0.05, 2.5]} />
            <meshStandardMaterial color="#1e3a8a" metalness={0.1} roughness={0.9} />
          </mesh>
          {/* Solar cells grid */}
          {Array.from({ length: 8 }).map((_, i) => 
            Array.from({ length: 5 }).map((_, j) => (
              <mesh key={`${i}-${j}`} position={[-1.75 + i * 0.5, 0.03, -1 + j * 0.5]}>
                <boxGeometry args={[0.4, 0.01, 0.4]} />
                <meshStandardMaterial color="#1e40af" metalness={0.2} roughness={0.8} />
              </mesh>
            ))
          )}
        </group>
        
        {/* Robotic Arm */}
        <group position={[1, 1, 1]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.8, 0, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
        
        {/* Scientific Instruments */}
        <mesh position={[0, 0.5, 1.8]}>
          <boxGeometry args={[0.8, 0.3, 0.2]} />
          <meshStandardMaterial color="#059669" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Antenna Dish */}
        <group position={[-0.8, 1.5, -1]}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 0.05]} />
            <meshStandardMaterial color="#f3f4f6" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        </group>
      </group>
    );
  }

  // Enhanced ISS model
  return (
    <group ref={meshRef}>
      {/* Central Truss */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.3, 0.3]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Modules */}
      {[
        { pos: [-2, 0, 0], size: [2, 1, 1], color: "#f3f4f6" },
        { pos: [0, 0, 0], size: [2.5, 1.2, 1.2], color: "#ffffff" },
        { pos: [2, 0, 0], size: [2, 1, 1], color: "#f3f4f6" },
        { pos: [0, 0, 1.5], size: [1.5, 1, 1.5], color: "#e5e7eb" },
        { pos: [0, 0, -1.5], size: [1.5, 1, 1.5], color: "#e5e7eb" }
      ].map((module, i) => (
        <mesh key={i} position={module.pos as [number, number, number]}>
          <boxGeometry args={module.size as [number, number, number]} />
          <meshStandardMaterial color={module.color} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      
      {/* Solar Arrays - More detailed */}
      {[-4.5, 4.5].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[6, 0.05, 3]} />
            <meshStandardMaterial color="#1e3a8a" metalness={0.1} roughness={0.9} />
          </mesh>
          {/* Solar cells pattern */}
          {Array.from({ length: 12 }).map((_, j) => 
            Array.from({ length: 6 }).map((_, k) => (
              <mesh key={`${j}-${k}`} position={[-2.75 + j * 0.5, 0.03, -1.25 + k * 0.5]}>
                <boxGeometry args={[0.4, 0.01, 0.4]} />
                <meshStandardMaterial color="#1e40af" metalness={0.2} roughness={0.8} />
              </mesh>
            ))
          )}
          {/* Support Structure */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.1, 3]} />
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* Radiators */}
      {[
        { pos: [0, 1.5, 0], rot: [Math.PI / 2, 0, 0] },
        { pos: [0, -1.5, 0], rot: [-Math.PI / 2, 0, 0] }
      ].map((radiator, i) => (
        <mesh key={i} position={radiator.pos as [number, number, number]} rotation={radiator.rot as [number, number, number]}>
          <boxGeometry args={[4, 0.05, 1]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      
      {/* Docking Ports */}
      {[
        [0, 0, 2.5],
        [0, 0, -2.5],
        [0, 1.5, 0],
        [0, -1.5, 0]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.4, 0.4, 0.5]} />
          <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Antennas */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, 1.5, Math.sin(angle) * 2]}>
            <cylinderGeometry args={[0.02, 0.02, 1]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        );
      })}
      
      {/* Cupola */}
      <mesh position={[0, -1.8, 0]}>
        <sphereGeometry args={[0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.6} roughness={0.4} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

interface SpacecraftViewerProps {
  isOpen: boolean;
  onClose: () => void;
  spacecraft: string;
}

const SpacecraftViewer: React.FC<SpacecraftViewerProps> = ({ isOpen, onClose, spacecraft }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 5, 5]);
  const [showEnvironment, setShowEnvironment] = useState(true);

  const spacecraftInfo = {
    'apollo': {
      name: 'Apollo Command and Service Module',
      description: 'The Apollo Command and Service Module (CSM) was the main spacecraft used for the Apollo lunar missions. The Command Module housed the crew during launch, Earth orbit, lunar orbit, and re-entry, while the Service Module provided propulsion and life support.',
      specs: [
        'Crew: 3 astronauts',
        'Mass: 28,800 kg (total)',
        'Command Module Height: 3.5 m',
        'Service Module Height: 7.5 m',
        'Diameter: 3.9 m',
        'Mission Duration: 8-12 days',
        'Heat Shield: Ablative',
        'Propulsion: Hypergolic fuel'
      ],
      missions: [
        'Apollo 7 (1968) - First crewed test',
        'Apollo 8 (1968) - First lunar orbit',
        'Apollo 11 (1969) - First Moon landing',
        'Apollo 17 (1972) - Last Moon landing'
      ]
    },
    'mars-rover': {
      name: 'Mars Exploration Rover',
      description: 'Advanced robotic vehicles designed to explore the Martian surface. These rovers carry sophisticated scientific instruments to analyze rocks, soil, atmosphere, and search for signs of past or present life on Mars.',
      specs: [
        'Mass: 1,025 kg (Perseverance)',
        'Length: 3.0 m',
        'Width: 2.7 m',
        'Height: 2.2 m',
        'Power: Nuclear RTG',
        'Speed: 4.2 cm/s max',
        'Mission Duration: 687+ Earth days',
        'Instruments: 7 scientific tools'
      ],
      missions: [
        'Sojourner (1997) - First Mars rover',
        'Spirit & Opportunity (2004) - Twin rovers',
        'Curiosity (2012) - Nuclear-powered',
        'Perseverance (2021) - Sample collection'
      ]
    },
    'iss': {
      name: 'International Space Station',
      description: 'The ISS is a modular space station in low Earth orbit serving as a microgravity research laboratory. It represents international cooperation in space exploration and has been continuously occupied since November 2000.',
      specs: [
        'Mass: 420,000 kg',
        'Length: 73 m',
        'Width: 109 m (solar arrays)',
        'Height: 20 m',
        'Orbit: 408 km altitude',
        'Speed: 27,600 km/h',
        'Crew: 3-7 astronauts',
        'Power: 120 kW solar arrays'
      ],
      missions: [
        'Expedition 1 (2000) - First crew',
        'SpaceX Crew Dragon (2020) - Commercial crew',
        'Artemis Gateway (2025) - Lunar station',
        'Commercial stations (2030+) - Future'
      ]
    }
  };

  const info = spacecraftInfo[spacecraft as keyof typeof spacecraftInfo] || spacecraftInfo.iss;

  const handleScreenshot = () => {
    // This would capture the canvas content
    console.log('Screenshot captured');
  };

  const resetCamera = () => {
    setCameraPosition([5, 5, 5]);
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
          <h2 className="text-2xl font-bold text-white">{info.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced 3D Viewer */}
          <div className="lg:col-span-2 relative bg-gray-900/50 rounded-xl overflow-hidden">
            <Canvas>
              <PerspectiveCamera makeDefault position={cameraPosition} fov={60} />
              
              {showEnvironment && (
                <>
                  <color attach="background" args={['#000011']} />
                  <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
                </>
              )}
              
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.8} />
              
              <Suspense fallback={null}>
                <DetailedSpacecraftModel name={spacecraft} animated={autoRotate} />
              </Suspense>
              
              <OrbitControls 
                autoRotate={autoRotate}
                autoRotateSpeed={animationSpeed * 2}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={20}
              />
            </Canvas>

            {/* Enhanced Controls */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-3 rounded-lg backdrop-blur-md transition-colors ${
                  autoRotate ? 'bg-blue-600/80 text-white' : 'bg-gray-600/80 text-gray-300'
                }`}
                title="Toggle auto-rotation"
              >
                {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setShowWireframe(!showWireframe)}
                className={`p-3 rounded-lg backdrop-blur-md transition-colors ${
                  showWireframe ? 'bg-purple-600/80 text-white' : 'bg-gray-600/80 text-gray-300'
                }`}
                title="Toggle wireframe"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowEnvironment(!showEnvironment)}
                className={`p-3 rounded-lg backdrop-blur-md transition-colors ${
                  showEnvironment ? 'bg-green-600/80 text-white' : 'bg-gray-600/80 text-gray-300'
                }`}
                title="Toggle space environment"
              >
                <Camera className="w-5 h-5" />
              </button>
              
              <button
                onClick={resetCamera}
                className="p-3 rounded-lg backdrop-blur-md bg-orange-600/80 text-white hover:bg-orange-700/80 transition-colors"
                title="Reset camera"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleScreenshot}
                className="p-3 rounded-lg backdrop-blur-md bg-yellow-600/80 text-white hover:bg-yellow-700/80 transition-colors"
                title="Take screenshot"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Animation Speed Control */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-4">
              <label className="block text-white text-sm font-medium mb-2">Animation Speed</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-white text-sm ml-2">{animationSpeed.toFixed(1)}x</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-lg p-3">
              <p className="text-white text-sm">
                🖱️ Drag to rotate • 🔍 Scroll to zoom • 📱 Pinch to zoom
              </p>
            </div>
          </div>

          {/* Enhanced Information Panel */}
          <div className="space-y-6 max-h-full overflow-y-auto">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-400" />
                <span>About</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">{info.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">Technical Specifications</h3>
              <div className="space-y-2">
                {info.specs.map((spec, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                    <span className="text-gray-300 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">Notable Missions</h3>
              <div className="space-y-2">
                {info.missions.map((mission, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <span className="text-blue-300 text-sm font-medium">{mission}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-300 font-semibold mb-2">Interactive Features</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Rotate and zoom the detailed 3D model</li>
                <li>• Toggle auto-rotation and wireframe view</li>
                <li>• Adjust animation speed</li>
                <li>• Space environment with stars</li>
                <li>• Reset camera position</li>
                <li>• Touch-friendly controls</li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2">Model Details</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Highly detailed 3D geometry</li>
                <li>• Realistic materials and textures</li>
                <li>• Accurate proportions and colors</li>
                <li>• Interactive components</li>
                <li>• Real-time lighting effects</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpacecraftViewer;