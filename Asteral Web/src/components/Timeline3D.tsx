import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCw, ZoomIn, ZoomOut, Info, Filter, Search, Calendar } from 'lucide-react';
import { HistoricalEvent } from '../types/astronomy';
import { motion } from 'framer-motion';

interface TimelineEvent extends HistoricalEvent {
  position: { x: number; y: number; z: number };
  angle: number;
}

// Comprehensive space missions and events database
const COMPREHENSIVE_SPACE_EVENTS: HistoricalEvent[] = [
  // Early Space Age (1950s-1960s)
  {
    id: 'sputnik-1',
    date: '10-04',
    title: 'Sputnik 1 Launch',
    description: 'The Soviet Union launches Sputnik 1, the first artificial satellite, marking the beginning of the Space Age.',
    category: 'launch',
    year: 1957,
    significance: 'First artificial satellite in orbit',
    moreInfoUrl: 'https://www.nasa.gov/history/sputnik/'
  },
  {
    id: 'explorer-1',
    date: '01-31',
    title: 'Explorer 1 Launch',
    description: 'America\'s first satellite discovers the Van Allen radiation belts around Earth.',
    category: 'launch',
    year: 1958,
    significance: 'First American satellite and major scientific discovery',
    moreInfoUrl: 'https://www.nasa.gov/explorer1'
  },
  {
    id: 'luna-2',
    date: '09-14',
    title: 'Luna 2 Moon Impact',
    description: 'First human-made object to reach the Moon, crash-landing on the lunar surface.',
    category: 'landing',
    year: 1959,
    significance: 'First human artifact on another celestial body'
  },
  {
    id: 'yuri-gagarin',
    date: '04-12',
    title: 'First Human in Space',
    description: 'Yuri Gagarin becomes the first human to orbit Earth aboard Vostok 1.',
    category: 'space_mission',
    year: 1961,
    significance: 'First human spaceflight',
    moreInfoUrl: 'https://www.nasa.gov/gagarin'
  },
  {
    id: 'alan-shepard',
    date: '05-05',
    title: 'First American in Space',
    description: 'Alan Shepard completes America\'s first crewed spaceflight on Freedom 7.',
    category: 'space_mission',
    year: 1961,
    significance: 'First American astronaut'
  },
  {
    id: 'john-glenn',
    date: '02-20',
    title: 'First American to Orbit Earth',
    description: 'John Glenn orbits Earth three times aboard Friendship 7.',
    category: 'space_mission',
    year: 1962,
    significance: 'First American orbital flight'
  },
  {
    id: 'valentina-tereshkova',
    date: '06-16',
    title: 'First Woman in Space',
    description: 'Valentina Tereshkova becomes the first woman to travel to space aboard Vostok 6.',
    category: 'space_mission',
    year: 1963,
    significance: 'First female astronaut'
  },
  {
    id: 'first-spacewalk',
    date: '03-18',
    title: 'First Spacewalk',
    description: 'Alexei Leonov performs the first extravehicular activity (EVA) from Voskhod 2.',
    category: 'space_mission',
    year: 1965,
    significance: 'First human spacewalk'
  },
  {
    id: 'gemini-6-7',
    date: '12-15',
    title: 'First Space Rendezvous',
    description: 'Gemini 6A and Gemini 7 achieve the first rendezvous between two crewed spacecraft.',
    category: 'space_mission',
    year: 1965,
    significance: 'First spacecraft rendezvous'
  },
  {
    id: 'luna-9',
    date: '02-03',
    title: 'First Soft Moon Landing',
    description: 'Luna 9 achieves the first successful soft landing on the Moon and transmits photos.',
    category: 'landing',
    year: 1966,
    significance: 'First soft lunar landing'
  },
  {
    id: 'apollo-8',
    date: '12-21',
    title: 'First Humans to Leave Earth Orbit',
    description: 'Apollo 8 crew becomes the first humans to travel to the Moon and orbit it.',
    category: 'space_mission',
    year: 1968,
    significance: 'First crewed lunar orbit'
  },
  {
    id: 'apollo-11',
    date: '07-20',
    title: 'First Moon Landing',
    description: 'Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.',
    category: 'landing',
    year: 1969,
    significance: 'First human lunar landing',
    moreInfoUrl: 'https://www.nasa.gov/mission_pages/apollo/apollo11.html'
  },

  // 1970s - Space Stations and Planetary Exploration
  {
    id: 'apollo-13',
    date: '04-11',
    title: 'Apollo 13 "Successful Failure"',
    description: 'Apollo 13 crew survives an explosion and returns safely to Earth.',
    category: 'space_mission',
    year: 1970,
    significance: 'Demonstrated human ingenuity in crisis'
  },
  {
    id: 'salyut-1',
    date: '04-19',
    title: 'First Space Station',
    description: 'Salyut 1, the world\'s first space station, is launched by the Soviet Union.',
    category: 'launch',
    year: 1971,
    significance: 'First space station'
  },
  {
    id: 'mars-3',
    date: '12-02',
    title: 'First Mars Landing',
    description: 'Mars 3 becomes the first spacecraft to successfully land on Mars.',
    category: 'landing',
    year: 1971,
    significance: 'First successful Mars landing'
  },
  {
    id: 'pioneer-10',
    date: '03-02',
    title: 'Pioneer 10 Launch',
    description: 'Pioneer 10 launches to become the first spacecraft to visit Jupiter.',
    category: 'launch',
    year: 1972,
    significance: 'First Jupiter flyby mission'
  },
  {
    id: 'skylab',
    date: '05-14',
    title: 'Skylab Launch',
    description: 'America\'s first space station, Skylab, is launched.',
    category: 'launch',
    year: 1973,
    significance: 'First American space station'
  },
  {
    id: 'apollo-soyuz',
    date: '07-17',
    title: 'Apollo-Soyuz Test Project',
    description: 'American and Soviet spacecraft dock in orbit, symbolizing détente.',
    category: 'space_mission',
    year: 1975,
    significance: 'First international space cooperation'
  },
  {
    id: 'viking-1',
    date: '07-20',
    title: 'Viking 1 Mars Landing',
    description: 'Viking 1 lander successfully touches down on Mars and begins surface operations.',
    category: 'landing',
    year: 1976,
    significance: 'First successful long-term Mars surface mission'
  },
  {
    id: 'voyager-1',
    date: '09-05',
    title: 'Voyager 1 Launch',
    description: 'NASA launches Voyager 1, which would become the first human-made object to enter interstellar space.',
    category: 'launch',
    year: 1977,
    significance: 'First probe to reach interstellar space',
    moreInfoUrl: 'https://www.nasa.gov/voyager'
  },
  {
    id: 'voyager-2',
    date: '08-20',
    title: 'Voyager 2 Launch',
    description: 'Voyager 2 launches on a grand tour of the outer solar system.',
    category: 'launch',
    year: 1977,
    significance: 'Only spacecraft to visit all four outer planets'
  },

  // 1980s - Space Shuttle Era
  {
    id: 'sts-1',
    date: '04-12',
    title: 'First Space Shuttle Flight',
    description: 'Space Shuttle Columbia completes the first orbital test flight.',
    category: 'launch',
    year: 1981,
    significance: 'Beginning of the Space Shuttle era'
  },
  {
    id: 'sally-ride',
    date: '06-18',
    title: 'First American Woman in Space',
    description: 'Sally Ride becomes the first American woman to travel to space.',
    category: 'space_mission',
    year: 1983,
    significance: 'First American female astronaut'
  },
  {
    id: 'challenger-disaster',
    date: '01-28',
    title: 'Challenger Disaster',
    description: 'Space Shuttle Challenger breaks apart 73 seconds after launch, killing all seven crew members.',
    category: 'space_mission',
    year: 1986,
    significance: 'Tragic reminder of spaceflight risks'
  },
  {
    id: 'mir-launch',
    date: '02-20',
    title: 'Mir Space Station Launch',
    description: 'The Soviet Union launches the Mir space station core module.',
    category: 'launch',
    year: 1986,
    significance: 'Long-duration space station operations'
  },

  // 1990s - International Cooperation
  {
    id: 'hubble-launch',
    date: '04-24',
    title: 'Hubble Space Telescope Launch',
    description: 'The Hubble Space Telescope is deployed from Space Shuttle Discovery.',
    category: 'launch',
    year: 1990,
    significance: 'Revolutionary space observatory',
    moreInfoUrl: 'https://www.nasa.gov/hubble'
  },
  {
    id: 'galileo-jupiter',
    date: '12-07',
    title: 'Galileo Enters Jupiter Orbit',
    description: 'Galileo spacecraft enters orbit around Jupiter for detailed study.',
    category: 'space_mission',
    year: 1995,
    significance: 'First Jupiter orbiter'
  },
  {
    id: 'mars-pathfinder',
    date: '07-04',
    title: 'Mars Pathfinder Landing',
    description: 'NASA\'s Mars Pathfinder successfully lands on Mars with the Sojourner rover.',
    category: 'landing',
    year: 1997,
    significance: 'First successful Mars rover mission',
    moreInfoUrl: 'https://www.nasa.gov/mars'
  },
  {
    id: 'iss-zarya',
    date: '11-20',
    title: 'ISS Construction Begins',
    description: 'The Zarya module, first component of the International Space Station, is launched.',
    category: 'launch',
    year: 1998,
    significance: 'Beginning of ISS construction'
  },

  // 2000s - ISS Era and Mars Exploration
  {
    id: 'iss-first-crew',
    date: '11-02',
    title: 'First ISS Crew Arrival',
    description: 'The first long-duration crew arrives at the International Space Station.',
    category: 'space_mission',
    year: 2000,
    significance: 'Beginning of continuous human presence in space',
    moreInfoUrl: 'https://www.nasa.gov/station'
  },
  {
    id: 'near-eros',
    date: '02-12',
    title: 'First Asteroid Landing',
    description: 'NEAR Shoemaker becomes the first spacecraft to land on an asteroid (Eros).',
    category: 'landing',
    year: 2001,
    significance: 'First asteroid surface mission'
  },
  {
    id: 'columbia-disaster',
    date: '02-01',
    title: 'Columbia Disaster',
    description: 'Space Shuttle Columbia breaks apart during re-entry, killing all seven crew members.',
    category: 'space_mission',
    year: 2003,
    significance: 'Led to shuttle program changes'
  },
  {
    id: 'spirit-opportunity',
    date: '01-04',
    title: 'Mars Rovers Land',
    description: 'Spirit and Opportunity rovers successfully land on Mars for extended exploration.',
    category: 'landing',
    year: 2004,
    significance: 'Long-duration Mars surface exploration'
  },
  {
    id: 'spaceshiptwo',
    date: '06-21',
    title: 'First Private Spaceflight',
    description: 'SpaceShipOne completes the first privately funded human spaceflight.',
    category: 'space_mission',
    year: 2004,
    significance: 'Beginning of commercial spaceflight'
  },
  {
    id: 'cassini-saturn',
    date: '07-01',
    title: 'Cassini Enters Saturn Orbit',
    description: 'Cassini spacecraft enters orbit around Saturn for detailed study.',
    category: 'space_mission',
    year: 2004,
    significance: 'Comprehensive Saturn system exploration'
  },
  {
    id: 'huygens-titan',
    date: '01-14',
    title: 'Huygens Lands on Titan',
    description: 'Huygens probe successfully lands on Saturn\'s moon Titan.',
    category: 'landing',
    year: 2005,
    significance: 'First landing on an outer planet moon'
  },
  {
    id: 'new-horizons-launch',
    date: '01-19',
    title: 'New Horizons Launch',
    description: 'New Horizons launches toward Pluto for the first close-up study.',
    category: 'launch',
    year: 2006,
    significance: 'First mission to Pluto'
  },
  {
    id: 'phoenix-mars',
    date: '05-25',
    title: 'Phoenix Mars Landing',
    description: 'Phoenix lander successfully touches down in Mars\' polar region.',
    category: 'landing',
    year: 2008,
    significance: 'Confirmed water ice on Mars'
  },

  // 2010s - Commercial Space and Advanced Exploration
  {
    id: 'falcon-9-first',
    date: '06-04',
    title: 'First Falcon 9 Launch',
    description: 'SpaceX successfully launches its first Falcon 9 rocket.',
    category: 'launch',
    year: 2010,
    significance: 'Beginning of modern commercial spaceflight'
  },
  {
    id: 'curiosity-landing',
    date: '08-05',
    title: 'Curiosity Rover Landing',
    description: 'NASA\'s Curiosity rover successfully lands on Mars using the innovative sky crane system.',
    category: 'landing',
    year: 2012,
    significance: 'Advanced Mars exploration mission',
    moreInfoUrl: 'https://www.nasa.gov/curiosity'
  },
  {
    id: 'dragon-iss',
    date: '05-25',
    title: 'First Commercial ISS Cargo',
    description: 'SpaceX Dragon becomes the first commercial spacecraft to dock with the ISS.',
    category: 'space_mission',
    year: 2012,
    significance: 'Commercial cargo services begin'
  },
  {
    id: 'rosetta-comet',
    date: '08-06',
    title: 'Rosetta Reaches Comet',
    description: 'ESA\'s Rosetta spacecraft becomes the first to orbit a comet.',
    category: 'space_mission',
    year: 2014,
    significance: 'First comet orbiter mission'
  },
  {
    id: 'philae-landing',
    date: '11-12',
    title: 'First Comet Landing',
    description: 'Philae lander touches down on Comet 67P, the first soft landing on a comet.',
    category: 'landing',
    year: 2014,
    significance: 'First comet surface mission'
  },
  {
    id: 'new-horizons-pluto',
    date: '07-14',
    title: 'New Horizons Pluto Flyby',
    description: 'NASA\'s New Horizons spacecraft makes its closest approach to Pluto.',
    category: 'discovery',
    year: 2015,
    significance: 'First close-up images of Pluto',
    moreInfoUrl: 'https://www.nasa.gov/new-horizons'
  },
  {
    id: 'falcon-heavy',
    date: '02-06',
    title: 'Falcon Heavy First Flight',
    description: 'SpaceX successfully launches the Falcon Heavy, the most powerful operational rocket.',
    category: 'launch',
    year: 2018,
    significance: 'Most powerful modern rocket'
  },
  {
    id: 'insight-mars',
    date: '11-26',
    title: 'InSight Mars Landing',
    description: 'NASA\'s InSight lander successfully touches down on Mars to study the planet\'s interior.',
    category: 'landing',
    year: 2018,
    significance: 'First Mars seismology mission'
  },

  // 2020s - New Space Age
  {
    id: 'crew-dragon-demo2',
    date: '05-30',
    title: 'First Commercial Crew Launch',
    description: 'SpaceX Crew Dragon carries astronauts to the ISS, ending American dependence on Russian rockets.',
    category: 'space_mission',
    year: 2020,
    significance: 'Return of American crewed spaceflight'
  },
  {
    id: 'perseverance-landing',
    date: '02-18',
    title: 'Perseverance Rover Landing',
    description: 'NASA\'s Perseverance rover lands on Mars to search for signs of ancient microbial life.',
    category: 'landing',
    year: 2021,
    significance: 'Advanced astrobiology mission',
    moreInfoUrl: 'https://www.nasa.gov/perseverance'
  },
  {
    id: 'ingenuity-flight',
    date: '04-19',
    title: 'First Powered Flight on Mars',
    description: 'NASA\'s Ingenuity helicopter achieves the first powered flight on another planet.',
    category: 'discovery',
    year: 2021,
    significance: 'First extraterrestrial powered flight'
  },
  {
    id: 'jwst-launch',
    date: '12-25',
    title: 'James Webb Space Telescope Launch',
    description: 'The most powerful space telescope ever built launches to revolutionize astronomy.',
    category: 'launch',
    year: 2021,
    significance: 'Next-generation space observatory',
    moreInfoUrl: 'https://www.nasa.gov/webb'
  },
  {
    id: 'dart-impact',
    date: '09-26',
    title: 'DART Asteroid Impact',
    description: 'NASA\'s DART spacecraft successfully impacts asteroid Dimorphos, changing its orbit.',
    category: 'space_mission',
    year: 2022,
    significance: 'First planetary defense test'
  },
  {
    id: 'artemis-1',
    date: '11-16',
    title: 'Artemis 1 Launch',
    description: 'NASA\'s Artemis 1 mission launches, beginning the return to the Moon.',
    category: 'launch',
    year: 2022,
    significance: 'Beginning of lunar return program'
  },
  {
    id: 'hakuto-r',
    date: '04-25',
    title: 'First Private Moon Landing Attempt',
    description: 'Hakuto-R becomes the first private spacecraft to attempt a Moon landing.',
    category: 'landing',
    year: 2023,
    significance: 'Commercial lunar exploration begins'
  },
  {
    id: 'starship-test',
    date: '04-20',
    title: 'Starship First Integrated Test',
    description: 'SpaceX conducts the first integrated test flight of Starship and Super Heavy.',
    category: 'launch',
    year: 2023,
    significance: 'Testing next-generation spacecraft'
  },
  {
    id: 'psyche-launch',
    date: '10-13',
    title: 'Psyche Mission Launch',
    description: 'NASA launches Psyche mission to study a metal-rich asteroid.',
    category: 'launch',
    year: 2023,
    significance: 'First mission to a metal asteroid'
  },
  {
    id: 'europa-clipper',
    date: '10-14',
    title: 'Europa Clipper Launch',
    description: 'NASA launches Europa Clipper to study Jupiter\'s icy moon Europa.',
    category: 'launch',
    year: 2024,
    significance: 'Search for life in Europa\'s ocean'
  },

  // Future Missions (2025+)
  {
    id: 'artemis-2',
    date: '11-01',
    title: 'Artemis 2 Lunar Flyby',
    description: 'First crewed mission around the Moon since Apollo 17.',
    category: 'space_mission',
    year: 2025,
    significance: 'Return of humans to lunar vicinity'
  },
  {
    id: 'lunar-gateway',
    date: '03-15',
    title: 'Lunar Gateway Launch',
    description: 'First components of the Lunar Gateway space station launch.',
    category: 'launch',
    year: 2025,
    significance: 'Lunar orbit space station'
  },
  {
    id: 'mars-sample-return',
    date: '07-01',
    title: 'Mars Sample Return Launch',
    description: 'Mission to bring Martian samples back to Earth launches.',
    category: 'launch',
    year: 2025,
    significance: 'First Mars sample return mission'
  }
];

const Timeline3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Position events in 3D space with better distribution
    const timelineEvents: TimelineEvent[] = COMPREHENSIVE_SPACE_EVENTS.map((event, index) => {
      const totalEvents = COMPREHENSIVE_SPACE_EVENTS.length;
      const angle = (index / totalEvents) * Math.PI * 4; // Multiple spirals
      const radius = 150 + (index % 3) * 50; // Varying radius
      const yearOffset = (event.year - 1950) * 3; // Spread along timeline
      
      return {
        ...event,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: yearOffset
        },
        angle
      };
    });
    
    setEvents(timelineEvents);
    setFilteredEvents(timelineEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      const decade = parseInt(yearFilter);
      filtered = filtered.filter(event => 
        event.year >= decade && event.year < decade + 10
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.significance.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  }, [events, categoryFilter, yearFilter, searchQuery]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw enhanced orbital paths
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 8; i++) {
        const radius = (100 + i * 40) * zoom;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw timeline axis with enhanced gradient
      const gradient = ctx.createLinearGradient(centerX - 400 * zoom, centerY, centerX + 400 * zoom, centerY);
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0)');
      gradient.addColorStop(0.2, 'rgba(168, 85, 247, 0.2)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
      gradient.addColorStop(0.8, 'rgba(168, 85, 247, 0.2)');
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 400 * zoom, centerY);
      ctx.lineTo(centerX + 400 * zoom, centerY);
      ctx.stroke();
      
      // Draw decade markers
      for (let decade = 1950; decade <= 2030; decade += 10) {
        const x = centerX + ((decade - 1990) * 20 * zoom);
        if (x > 0 && x < canvas.width) {
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, centerY - 20);
          ctx.lineTo(x, centerY + 20);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(decade.toString(), x, centerY - 30);
        }
      }
      
      // Draw events with enhanced styling
      filteredEvents.forEach((event) => {
        const rotatedX = event.position.x * Math.cos(rotation) - event.position.z * Math.sin(rotation);
        const rotatedZ = event.position.x * Math.sin(rotation) + event.position.z * Math.cos(rotation);
        
        const screenX = centerX + rotatedX * zoom;
        const screenY = centerY + event.position.y * zoom * 0.3;
        const size = Math.max(4, (6 + rotatedZ * 0.01) * zoom);
        
        // Category-based colors
        const categoryColors = {
          launch: '#ef4444',
          landing: '#3b82f6',
          discovery: '#8b5cf6',
          space_mission: '#10b981',
          anniversary: '#f59e0b'
        };
        
        const color = categoryColors[event.category] || '#6b7280';
        const isHighlighted = event === hoveredEvent || event === selectedEvent;
        
        // Enhanced glow effect
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 6);
        
        if (isHighlighted) {
          glowGradient.addColorStop(0, color + 'FF');
          glowGradient.addColorStop(0.3, color + 'AA');
          glowGradient.addColorStop(1, color + '00');
        } else {
          glowGradient.addColorStop(0, color + '80');
          glowGradient.addColorStop(0.5, color + '40');
          glowGradient.addColorStop(1, color + '00');
        }
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Event core with pulsing effect
        const coreGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size);
        if (event === selectedEvent) {
          coreGradient.addColorStop(0, '#fbbf24');
          coreGradient.addColorStop(1, '#f59e0b');
        } else if (event === hoveredEvent) {
          coreGradient.addColorStop(0, '#ffffff');
          coreGradient.addColorStop(1, color);
        } else {
          coreGradient.addColorStop(0, color);
          coreGradient.addColorStop(1, color + 'CC');
        }
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(4, size), 0, Math.PI * 2);
        ctx.fill();
        
        // Connection lines for related events
        if (event === selectedEvent) {
          const relatedEvents = filteredEvents.filter(e => 
            e.category === event.category && e !== event && 
            Math.abs(e.year - event.year) <= 5
          );
          
          relatedEvents.forEach(related => {
            const relatedRotatedX = related.position.x * Math.cos(rotation) - related.position.z * Math.sin(rotation);
            const relatedScreenX = centerX + relatedRotatedX * zoom;
            const relatedScreenY = centerY + related.position.y * zoom * 0.3;
            
            ctx.strokeStyle = color + '40';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(relatedScreenX, relatedScreenY);
            ctx.stroke();
          });
        }
        
        // Enhanced labels
        if (event === hoveredEvent || event === selectedEvent) {
          ctx.fillStyle = 'white';
          ctx.font = `bold ${Math.max(14, 14 * zoom)}px 'Space Grotesk', sans-serif`;
          ctx.textAlign = 'center';
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.lineWidth = 4;
          
          // Year with enhanced background
          const yearText = event.year.toString();
          const yearMetrics = ctx.measureText(yearText);
          const yearY = screenY - size - 20;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(screenX - yearMetrics.width/2 - 6, yearY - 16, yearMetrics.width + 12, 20);
          
          ctx.strokeText(yearText, screenX, yearY);
          ctx.fillStyle = 'white';
          ctx.fillText(yearText, screenX, yearY);
          
          // Category badge
          ctx.font = `${Math.max(10, 10 * zoom)}px 'Inter', sans-serif`;
          const categoryText = event.category.replace('_', ' ').toUpperCase();
          const categoryMetrics = ctx.measureText(categoryText);
          
          ctx.fillStyle = color + 'CC';
          ctx.fillRect(screenX - categoryMetrics.width/2 - 4, yearY + 8, categoryMetrics.width + 8, 14);
          
          ctx.fillStyle = 'white';
          ctx.fillText(categoryText, screenX, yearY + 18);
          
          // Title for selected events
          if (event === selectedEvent) {
            ctx.font = `${Math.max(12, 12 * zoom)}px 'Inter', sans-serif`;
            const words = event.title.split(' ');
            const maxWidth = 200 * zoom;
            let line = '';
            let y = screenY + size + 30;
            
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' ';
              const metrics = ctx.measureText(testLine);
              
              if (metrics.width > maxWidth && n > 0) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(screenX - metrics.width/2 - 6, y - 16, metrics.width + 12, 20);
                
                ctx.strokeText(line, screenX, y);
                ctx.fillStyle = 'white';
                ctx.fillText(line, screenX, y);
                line = words[n] + ' ';
                y += 22 * zoom;
              } else {
                line = testLine;
              }
            }
            
            if (line.trim()) {
              const finalMetrics = ctx.measureText(line);
              ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
              ctx.fillRect(screenX - finalMetrics.width/2 - 6, y - 16, finalMetrics.width + 12, 20);
              
              ctx.strokeText(line, screenX, y);
              ctx.fillStyle = 'white';
              ctx.fillText(line, screenX, y);
            }
          }
        }
        
        // Store screen position for interaction
        (event as any).screenX = screenX;
        (event as any).screenY = screenY;
        (event as any).screenSize = size;
      });
      
      if (isAnimating) {
        setRotation(prev => prev + 0.005);
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();
    
    if (isAnimating) {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [filteredEvents, rotation, zoom, isAnimating, selectedEvent, hoveredEvent]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clickedEvent = filteredEvents.find(event => {
      const dx = clickX - (event as any).screenX;
      const dy = clickY - (event as any).screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= (event as any).screenSize * 3;
    });

    setSelectedEvent(clickedEvent || null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hoveredEvent = filteredEvents.find(event => {
      const dx = mouseX - (event as any).screenX;
      const dy = mouseY - (event as any).screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= (event as any).screenSize * 3;
    });

    setHoveredEvent(hoveredEvent || null);
    canvas.style.cursor = hoveredEvent ? 'pointer' : 'default';
  };

  const categories = ['all', 'launch', 'landing', 'discovery', 'space_mission', 'anniversary'];
  const decades = ['all', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="section-heading">
            Comprehensive 3D Space Timeline
          </h1>
          <p className="section-subheading">
            Navigate through the complete history of space exploration from 1957 to 2025+
          </p>
        </header>

        {/* Enhanced Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Search Events</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search missions, discoveries..."
                className="w-full pl-10 pr-4 py-3 cosmic-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full cosmic-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Decade</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full cosmic-input"
            >
              {decades.map(decade => (
                <option key={decade} value={decade}>
                  {decade === 'all' ? 'All Decades' : `${decade}s`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="cosmic-card text-center">
            <div className="text-2xl font-bold text-blue-400">{filteredEvents.length}</div>
            <div className="text-sm text-gray-400">Events Shown</div>
          </div>
          <div className="cosmic-card text-center">
            <div className="text-2xl font-bold text-green-400">
              {new Set(filteredEvents.map(e => e.year)).size}
            </div>
            <div className="text-sm text-gray-400">Years Covered</div>
          </div>
          <div className="cosmic-card text-center">
            <div className="text-2xl font-bold text-purple-400">
              {filteredEvents.filter(e => e.year >= 2020).length}
            </div>
            <div className="text-sm text-gray-400">Recent Missions</div>
          </div>
          <div className="cosmic-card text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {filteredEvents.filter(e => e.year >= 2025).length}
            </div>
            <div className="text-sm text-gray-400">Future Missions</div>
          </div>
        </div>

        <div className="relative">
          {/* Enhanced 3D Canvas */}
          <div className="cosmic-card overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-[700px] cursor-crosshair"
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              aria-label="Interactive 3D timeline of space events"
              role="img"
            />
          </div>

          {/* Enhanced Controls */}
          <div className="absolute top-6 left-6 flex flex-col space-y-3">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="cosmic-button p-3 text-sm"
              aria-label={isAnimating ? 'Pause animation' : 'Start animation'}
            >
              {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setRotation(prev => prev + 0.2)}
              className="bg-purple-600/80 backdrop-blur-md text-white p-3 rounded-lg hover:bg-purple-700/80 transition-colors"
              aria-label="Rotate timeline"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.3, 4))}
              className="bg-green-600/80 backdrop-blur-md text-white p-3 rounded-lg hover:bg-green-700/80 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.3, 0.3))}
              className="bg-red-600/80 backdrop-blur-md text-white p-3 rounded-lg hover:bg-red-700/80 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>

          {/* Enhanced Instructions */}
          <div className="absolute top-6 right-6 cosmic-card max-w-sm">
            <div className="flex items-center space-x-3 mb-3">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold">Navigation Guide</span>
            </div>
            <ul className="descriptive-text-secondary text-sm space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Click events to select and view details</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Hover to preview event information</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span>Use filters to focus on specific eras</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">•</span>
                <span>Search for specific missions or events</span>
              </li>
            </ul>
          </div>

          {/* Enhanced Event Details Panel */}
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 right-6 timeline-event-card"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <p className="text-blue-400 font-bold text-xl">{selectedEvent.year}</p>
                    <span className="bg-purple-500/30 text-purple-200 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30">
                      {selectedEvent.category.replace('_', ' ')}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {selectedEvent.date.split('-').reverse().join('/')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl font-bold p-2"
                  aria-label="Close event details"
                >
                  ×
                </button>
              </div>
              
              <p className="descriptive-text text-base leading-relaxed mb-6">{selectedEvent.description}</p>
              
              <div className="flex items-center justify-between">
                <p className="text-purple-300 font-semibold text-lg">{selectedEvent.significance}</p>
                {selectedEvent.moreInfoUrl && (
                  <a
                    href={selectedEvent.moreInfoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button text-sm px-6 py-2"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Legend */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="cosmic-card border-red-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Launches</span>
            </div>
            <p className="descriptive-text-secondary text-sm">Spacecraft and satellite launches</p>
          </div>
          
          <div className="cosmic-card border-blue-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Landings</span>
            </div>
            <p className="descriptive-text-secondary text-sm">Planetary and lunar landings</p>
          </div>
          
          <div className="cosmic-card border-purple-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Discoveries</span>
            </div>
            <p className="descriptive-text-secondary text-sm">Scientific breakthroughs</p>
          </div>
          
          <div className="cosmic-card border-green-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Missions</span>
            </div>
            <p className="descriptive-text-secondary text-sm">Long-term space missions</p>
          </div>

          <div className="cosmic-card border-yellow-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-lg">Anniversaries</span>
            </div>
            <p className="descriptive-text-secondary text-sm">Historical commemorations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline3D;