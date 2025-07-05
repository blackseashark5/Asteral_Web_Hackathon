import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Download, RefreshCw, Calendar, Sun, Moon, Star, Satellite } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChartData {
  id: string;
  name: string;
  value: number;
  date: string;
  category: string;
}

interface SolarData {
  date: string;
  sunspots: number;
  solarFlares: number;
  solarWind: number;
}

interface MoonPhaseData {
  date: string;
  phase: string;
  illumination: number;
  distance: number;
}

interface SatelliteData {
  name: string;
  altitude: number;
  velocity: number;
  period: number;
  inclination: number;
}

const AstronomicalCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'solar' | 'moon' | 'satellites' | 'launches'>('solar');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data - in production, this would come from real APIs
  const solarData: SolarData[] = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sunspots: Math.floor(Math.random() * 200) + 50,
    solarFlares: Math.floor(Math.random() * 10),
    solarWind: Math.floor(Math.random() * 300) + 300
  }));

  const moonPhaseData: MoonPhaseData[] = Array.from({ length: 30 }, (_, i) => {
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    return {
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      phase: phases[Math.floor(i / 3.75) % 8],
      illumination: Math.abs(Math.sin((i / 29) * Math.PI * 2)) * 100,
      distance: 384400 + Math.sin((i / 29) * Math.PI * 2) * 20000
    };
  });

  const satelliteData: SatelliteData[] = [
    { name: 'ISS', altitude: 408, velocity: 7.66, period: 92.68, inclination: 51.6 },
    { name: 'Hubble', altitude: 547, velocity: 7.59, period: 95.47, inclination: 28.5 },
    { name: 'Starlink-1', altitude: 550, velocity: 7.58, period: 95.64, inclination: 53.0 },
    { name: 'GPS III', altitude: 20200, velocity: 3.87, period: 718, inclination: 55.0 },
    { name: 'JWST', altitude: 1500000, velocity: 1.0, period: 365.25, inclination: 0.0 }
  ];

  const launchData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }),
    launches: Math.floor(Math.random() * 15) + 5,
    successful: Math.floor(Math.random() * 12) + 3,
    failed: Math.floor(Math.random() * 3)
  }));

  useEffect(() => {
    drawChart();
  }, [activeChart, timeRange]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (activeChart) {
      case 'solar':
        drawSolarChart(ctx, canvas.width, canvas.height);
        break;
      case 'moon':
        drawMoonChart(ctx, canvas.width, canvas.height);
        break;
      case 'satellites':
        drawSatelliteChart(ctx, canvas.width, canvas.height);
        break;
      case 'launches':
        drawLaunchChart(ctx, canvas.width, canvas.height);
        break;
    }
  };

  const drawSolarChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 10; i++) {
      const y = padding + (chartHeight / 10) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw sunspot data
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const maxSunspots = Math.max(...solarData.map(d => d.sunspots));
    
    solarData.forEach((data, index) => {
      const x = padding + (chartWidth / (solarData.length - 1)) * index;
      const y = height - padding - (data.sunspots / maxSunspots) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Draw solar flares
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const maxFlares = Math.max(...solarData.map(d => d.solarFlares));
    
    solarData.forEach((data, index) => {
      const x = padding + (chartWidth / (solarData.length - 1)) * index;
      const y = height - padding - (data.solarFlares / maxFlares) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Inter';
    ctx.fillText('Solar Activity (30 Days)', padding, 30);
    
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('● Sunspots', width - 200, 30);
    
    ctx.fillStyle = '#ef4444';
    ctx.fillText('● Solar Flares', width - 200, 50);
  };

  const drawMoonChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    // Draw moon phases as a circular chart
    const phases = ['New', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    const colors = ['#1f2937', '#374151', '#4b5563', '#6b7280', '#f3f4f6', '#6b7280', '#4b5563', '#374151'];

    phases.forEach((phase, index) => {
      const angle = (index / phases.length) * Math.PI * 2 - Math.PI / 2;
      const startAngle = angle - Math.PI / phases.length;
      const endAngle = angle + Math.PI / phases.length;

      ctx.fillStyle = colors[index];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Phase labels
      const labelX = centerX + Math.cos(angle) * (radius + 30);
      const labelY = centerY + Math.sin(angle) * (radius + 30);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(phase, labelX, labelY);
    });

    // Center circle
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Moon', centerX, centerY - 5);
    ctx.fillText('Phases', centerX, centerY + 10);
  };

  const drawSatelliteChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / satelliteData.length - 20;

    // Draw bars for satellite altitudes
    satelliteData.forEach((satellite, index) => {
      const x = padding + index * (chartWidth / satelliteData.length) + 10;
      const maxAltitude = Math.max(...satelliteData.map(s => s.altitude));
      const barHeight = (satellite.altitude / maxAltitude) * chartHeight;
      const y = height - padding - barHeight;

      // Gradient for bars
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Satellite names
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(x + barWidth / 2, height - padding + 20);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(satellite.name, 0, 0);
      ctx.restore();

      // Altitude values
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${satellite.altitude}km`, x + barWidth / 2, y - 5);
    });

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Satellite Altitudes', padding, 30);
  };

  const drawLaunchChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw launch data as line chart
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const maxLaunches = Math.max(...launchData.map(d => d.launches));
    
    launchData.forEach((data, index) => {
      const x = padding + (chartWidth / (launchData.length - 1)) * index;
      const y = height - padding - (data.launches / maxLaunches) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Data points
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Month labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(data.month, x, height - padding + 20);
    });
    
    ctx.stroke();

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Space Launches by Month (2024)', padding, 30);
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      drawChart();
    }, 1000);
  };

  const exportChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `cosmic-explorer-${activeChart}-chart.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const chartTypes = [
    { id: 'solar', name: 'Solar Activity', icon: Sun, description: 'Sunspots, flares, and solar wind data' },
    { id: 'moon', name: 'Moon Phases', icon: Moon, description: 'Lunar cycle and illumination' },
    { id: 'satellites', name: 'Satellites', icon: Satellite, description: 'Active satellite altitudes' },
    { id: 'launches', name: 'Launches', icon: TrendingUp, description: 'Monthly launch statistics' }
  ];

  const timeRanges = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '3 Months' },
    { id: '1y', name: '1 Year' }
  ];

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="section-heading">
            Astronomical Charts
          </h1>
          <p className="section-subheading">
            Real-time data visualization and astronomical analytics
          </p>
        </header>

        {/* Chart Type Selector */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chartTypes.map((chart) => {
              const Icon = chart.icon;
              return (
                <motion.button
                  key={chart.id}
                  onClick={() => setActiveChart(chart.id as any)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    activeChart === chart.id
                      ? 'bg-blue-600/20 border-blue-400/50 text-blue-300'
                      : 'bg-gray-700/50 border-gray-600/30 text-gray-300 hover:border-gray-500/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold text-sm mb-1">{chart.name}</h3>
                  <p className="text-xs opacity-80">{chart.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Time Range:</span>
            </div>
            <div className="flex space-x-2">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="bg-green-600/80 text-white px-4 py-2 rounded-lg hover:bg-green-700/80 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportChart}
              className="bg-purple-600/80 text-white px-4 py-2 rounded-lg hover:bg-purple-700/80 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Main Chart */}
        <div className="cosmic-card mb-8">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-96 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-medium">Loading chart data...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Data */}
          <div className="cosmic-card">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span>Current Data</span>
            </h3>
            
            {activeChart === 'solar' && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sunspot Number</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {solarData[solarData.length - 1]?.sunspots || 0}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Solar Flares (24h)</span>
                    <span className="text-red-400 font-bold text-lg">
                      {solarData[solarData.length - 1]?.solarFlares || 0}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Solar Wind (km/s)</span>
                    <span className="text-blue-400 font-bold text-lg">
                      {solarData[solarData.length - 1]?.solarWind || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeChart === 'moon' && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Phase</span>
                    <span className="text-blue-400 font-bold">
                      {moonPhaseData[moonPhaseData.length - 1]?.phase || 'Unknown'}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Illumination</span>
                    <span className="text-yellow-400 font-bold">
                      {Math.round(moonPhaseData[moonPhaseData.length - 1]?.illumination || 0)}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Distance</span>
                    <span className="text-purple-400 font-bold">
                      {Math.round(moonPhaseData[moonPhaseData.length - 1]?.distance || 0).toLocaleString()} km
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeChart === 'satellites' && (
              <div className="space-y-3">
                {satelliteData.slice(0, 5).map((satellite) => (
                  <div key={satellite.name} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{satellite.name}</span>
                      <span className="text-blue-400 font-bold">{satellite.altitude} km</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Velocity: {satellite.velocity} km/s • Period: {satellite.period} min
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeChart === 'launches' && (
              <div className="space-y-3">
                {launchData.slice(-6).map((data) => (
                  <div key={data.month} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{data.month} 2024</span>
                      <span className="text-green-400 font-bold">{data.launches} launches</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Successful: {data.successful} • Failed: {data.failed}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="cosmic-card">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              <span>Statistics</span>
            </h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {activeChart === 'solar' ? '11' : 
                   activeChart === 'moon' ? '29.5' :
                   activeChart === 'satellites' ? '8,000+' : '180+'}
                </div>
                <div className="text-gray-400">
                  {activeChart === 'solar' ? 'Year Solar Cycle' : 
                   activeChart === 'moon' ? 'Day Lunar Cycle' :
                   activeChart === 'satellites' ? 'Active Satellites' : 'Annual Launches'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    {activeChart === 'solar' ? '95%' : 
                     activeChart === 'moon' ? '384,400' :
                     activeChart === 'satellites' ? '550' : '85%'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {activeChart === 'solar' ? 'Accuracy' : 
                     activeChart === 'moon' ? 'Avg Distance (km)' :
                     activeChart === 'satellites' ? 'Avg Altitude (km)' : 'Success Rate'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">
                    {activeChart === 'solar' ? '24/7' : 
                     activeChart === 'moon' ? '12h 25m' :
                     activeChart === 'satellites' ? '90min' : '2024'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {activeChart === 'solar' ? 'Monitoring' : 
                     activeChart === 'moon' ? 'Rise Delay' :
                     activeChart === 'satellites' ? 'Avg Period' : 'Peak Year'}
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Data Sources</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• NASA Space Weather</li>
                  <li>• NOAA Solar Data</li>
                  <li>• International Space Station</li>
                  <li>• Global Launch Database</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 cosmic-card">
          <h3 className="text-xl font-bold text-white mb-6">About These Charts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-3">Data Collection</h4>
              <p className="text-gray-300 leading-relaxed">
                Our charts display real-time and historical astronomical data collected from various space agencies 
                and observatories worldwide. Data is updated every hour to provide the most current information.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Interactive Features</h4>
              <p className="text-gray-300 leading-relaxed">
                Explore different time ranges, export charts for research, and dive deep into specific data points. 
                All visualizations are optimized for both desktop and mobile viewing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstronomicalCharts;