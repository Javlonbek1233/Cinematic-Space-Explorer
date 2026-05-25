export interface PlanetInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mass: string;
  diameter: string;
  distanceFromSun: string; // in Million km
  orbitalPeriod: string; // in Earth days/years
  rotationPeriod: string; // day length
  temperature: string;
  atmosphere: string[];
  color: string; // Hex color
  secondaryColor: string; // Hover/ring color
  moons: number;
  hasRings: boolean;
  funFact: string;
  crossSection: {
    crust: string;
    mantle: string;
    core: string;
  };
}

export interface MissionInfo {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  status: 'Active' | 'Completed' | 'Lost' | 'Future';
  target: string;
  type: string;
  duration: string;
  description: string;
  achievements: string[];
  telemetry: {
    distanceTraveled?: string;
    speed?: string;
    carrierFreq?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Nebula' | 'Galaxy' | 'Planet' | 'DeepSpace' | 'Phenomenon';
  dateCaptured: string;
  instrument: string;
  spectralRange: string;
  coordinates: {
    ra: string; // Right Ascension
    dec: string; // Declination
  };
  description: string;
  imageUrl: string;
}
