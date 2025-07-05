import { APODData, HistoricalEvent, AstronomicalEvent } from '../types/astronomy';

// NASA APOD API
const NASA_API_KEY = 'fk9LqmgtJlocX5LOZ5NVCjQbqTlRW5KdTCJ8fouD'; // I Have shared my api coz idk if you will be able to see and evalute generally this is a very bad practise.
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchAPOD = async (date?: string): Promise<APODData | null> => {
  try {
    const url = new URL(NASA_APOD_URL);
    url.searchParams.append('api_key', NASA_API_KEY);
    if (date) {
      url.searchParams.append('date', date);
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch APOD');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return null;
  }
};

// Historical space events database
const HISTORICAL_EVENTS: HistoricalEvent[] = [
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
    id: 'apollo-11',
    date: '07-20',
    title: 'Apollo 11 Moon Landing',
    description: 'Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon.',
    category: 'landing',
    year: 1969,
    significance: 'First human lunar landing',
    moreInfoUrl: 'https://www.nasa.gov/mission_pages/apollo/apollo11.html'
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
    id: 'hubble-launch',
    date: '04-24',
    title: 'Hubble Space Telescope Launch',
    description: 'The Hubble Space Telescope is deployed from Space Shuttle Discovery, revolutionizing astronomy.',
    category: 'launch',
    year: 1990,
    significance: 'Revolutionary space observatory',
    moreInfoUrl: 'https://www.nasa.gov/hubble'
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
    id: 'new-horizons-pluto',
    date: '07-14',
    title: 'New Horizons Pluto Flyby',
    description: 'NASA\'s New Horizons spacecraft makes its closest approach to Pluto, revealing detailed images.',
    category: 'discovery',
    year: 2015,
    significance: 'First close-up images of Pluto',
    moreInfoUrl: 'https://www.nasa.gov/new-horizons'
  },
  {
    id: 'jwst-launch',
    date: '12-25',
    title: 'James Webb Space Telescope Launch',
    description: 'The most powerful space telescope ever built launches, promising to revolutionize our understanding of the universe.',
    category: 'launch',
    year: 2021,
    significance: 'Next-generation space observatory',
    moreInfoUrl: 'https://www.nasa.gov/webb'
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
  }
];

export const getHistoricalEventsForDate = (date: Date): HistoricalEvent[] => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${month}-${day}`;
  
  return HISTORICAL_EVENTS.filter(event => event.date === dateString);
};

export const searchHistoricalEvents = (query: string): HistoricalEvent[] => {
  const lowercaseQuery = query.toLowerCase();
  return HISTORICAL_EVENTS.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Mock astronomical events (in production, use TimeAndDate API)
export const getTodaysAstronomicalEvents = async (): Promise<AstronomicalEvent[]> => {
  // This would typically call TimeAndDate API
  const now = new Date();
  const mockEvents: AstronomicalEvent[] = [
    {
      id: 'sunrise',
      name: 'Sunrise',
      date: now.toISOString().split('T')[0],
      time: '06:30',
      type: 'sunrise',
      description: 'Sun rises in the east',
      visibility: 'Clear skies expected'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      date: now.toISOString().split('T')[0],
      time: '18:45',
      type: 'sunset',
      description: 'Sun sets in the west',
      visibility: 'Clear skies expected'
    },
    {
      id: 'moonrise',
      name: 'Moonrise',
      date: now.toISOString().split('T')[0],
      time: '20:15',
      type: 'moonrise',
      description: 'Moon rises in the east',
      visibility: 'Waxing crescent moon'
    }
  ];
  
  return mockEvents;
};

// Generate ICS calendar event
export const generateICSEvent = (event: HistoricalEvent): string => {
  const now = new Date();
  const eventDate = new Date(now.getFullYear(), parseInt(event.date.split('-')[0]) - 1, parseInt(event.date.split('-')[1]));
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Cosmic Explorer//Space Events//EN
BEGIN:VEVENT
UID:${event.id}@cosmic-explorer.com
DTSTAMP:${formatDate(now)}
DTSTART:${formatDate(eventDate)}
DTEND:${formatDate(new Date(eventDate.getTime() + 3600000))}
SUMMARY:${event.title} Anniversary
DESCRIPTION:${event.description}\\n\\nSignificance: ${event.significance}\\n\\nMore info: ${event.moreInfoUrl || ''}
LOCATION:Space
END:VEVENT
END:VCALENDAR`;
};