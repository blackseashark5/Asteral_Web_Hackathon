export interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface HistoricalEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'space_mission' | 'discovery' | 'launch' | 'landing' | 'anniversary';
  year: number;
  image?: string;
  significance: string;
  moreInfoUrl?: string;
}

export interface AstronomicalEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  type: 'sunrise' | 'sunset' | 'moonrise' | 'moonset' | 'moon_phase' | 'planet_visibility';
  description: string;
  visibility?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  relatedEvents?: HistoricalEvent[];
}