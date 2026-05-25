import { PlanetInfo, MissionInfo, GalleryItem } from './types';

export const PLANETS: PlanetInfo[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The Scorched Messenger',
    description: 'The closest planet to our parent star. A heavily cratered iron ball locked in a tortuous, hyper-eccentric orbit. Possessing no substantial atmosphere, it endures extreme diurnal temperature swings from deep freeze to blazing furnace.',
    mass: '3.3011 x 10^23 kg',
    diameter: '4,879 km',
    distanceFromSun: '57.9 million km',
    orbitalPeriod: '88 Earth days',
    rotationPeriod: '58.6 Earth days',
    temperature: '-180°C to 430°C',
    atmosphere: ['Helium', 'Sodium', 'Oxygen', 'Potassium'],
    color: '#8c8c8c',
    secondaryColor: '#bfbfbf',
    moons: 0,
    hasRings: false,
    funFact: 'Despite being closest to the Sun, Venus is hotter due to its greenhouse effect. Mercury is the fastest orbiting planet.',
    crossSection: {
      crust: 'Cracked, dusty silicate rock ranging 100 to 300 km in depth, rich in volatile compounds.',
      mantle: 'A thin layer of solid silicate minerals, heavily squeezed by the massive central core.',
      core: 'An oversized liquid metallic iron core, comprising about 85% of the planet\'s entire radius.'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'The Greenhouse Inferno',
    description: 'Arguably the most hostile environment in the Solar System. Wrapped in a crushing, light-locked shroud of carbon dioxide and sulfuric acid clouds. Its surface pressure equals 90 Earth atmospheres, making it a toxic crucible.',
    mass: '4.8675 x 10^24 kg',
    diameter: '12,104 km',
    distanceFromSun: '108.2 million km',
    orbitalPeriod: '224.7 Earth days',
    rotationPeriod: '243 Earth days (Retrograde)',
    temperature: '462°C (Constant)',
    atmosphere: ['Carbon Dioxide', 'Nitrogen', 'Sulfur Dioxide'],
    color: '#e3bb76',
    secondaryColor: '#f7d08a',
    moons: 0,
    hasRings: false,
    funFact: 'Venus rotates backwards on its axis. A single solar day on Venus takes longer than its entire orbital year.',
    crossSection: {
      crust: 'Silicate basaltic crust, about 10-30 km thick, scarred by tectonic activity and hyper-viscous lava flows.',
      mantle: 'Rocky silicate mantle about 3,000 km thick, circulating heat via low-velocity plume convection.',
      core: 'A partially liquid iron-nickel core, about 6,000 km in diameter, lack of rotation limits its magnetic flux.'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Living Sanctuary',
    description: 'An oasis of water, nitrogen, and oxygen floating in the silent void. It is the only known celestial harbor for life. Dynamic weather systems, a protective magnetosphere, and shifting plate tectonics maintain its delicate equilibrium.',
    mass: '5.9723 x 10^24 kg',
    diameter: '12,742 km',
    distanceFromSun: '149.6 million km',
    orbitalPeriod: '365.25 Earth days',
    rotationPeriod: '23 hours 56 minutes',
    temperature: '-89°C to 58°C',
    atmosphere: ['Nitrogen (78%)', 'Oxygen (21%)', 'Argon', 'Carbon Dioxide'],
    color: '#3b82f6',
    secondaryColor: '#2563eb',
    moons: 1,
    hasRings: false,
    funFact: 'Earth is the only known body with active liquid oceans and plate tectonics recycling essential geological elements.',
    crossSection: {
      crust: 'Fragmented basaltic oceanic crust (5-10 km) and thick granitic continental crust (30-50 km).',
      mantle: 'Highly viscous, magnesium-iron rich silicate layer about 2,900 km deep, driven by thermal convection.',
      core: 'A viscous liquid iron-nickel outer core enclosing a solid crystalline iron alloy inner core at 5,400°C.'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Rusty Citadel',
    description: 'A cold, hyper-arid desert world draped in red iron oxide dust. Its ancient riverbeds and frozen polar caps suggest a warmer, wetter, and potentially habitable past, now locked beneath a thin wispy carbon dioxide air shroud.',
    mass: '6.4171 x 10^23 kg',
    diameter: '6,779 km',
    distanceFromSun: '227.9 million km',
    orbitalPeriod: '687 Earth days',
    rotationPeriod: '24 hours 37 minutes',
    temperature: '-143°C to 35°C',
    atmosphere: ['Carbon Dioxide (95%)', 'Nitrogen', 'Argon', 'Oxygen'],
    color: '#c0563b',
    secondaryColor: '#e06f53',
    moons: 2,
    hasRings: false,
    funFact: 'Mars hosting Olympus Mons, the tallest volcano in the entire solar system, standing three times higher than Mount Everest.',
    crossSection: {
      crust: 'Rigid iron-rich basaltic crust, 10 to 50 km deep, uniform and lacking active plate tectonic boundaries.',
      mantle: 'Silicate mantle rich in iron, sulfur, and potassium, inert and solidified since ancient geological eras.',
      core: 'A liquid or partially solid sulfur-nickel-iron core, roughly 1,800 km in radius with no structural dynamo.'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'The Colossal Monarch',
    description: 'A massive sphere of hydrogen and helium, large enough to engulf all other planets combined. Swept by immense belts of ammonia clouds, static electric vortexes, and the Great Red Spot—a storm wider than Earth.',
    mass: '1.8982 x 10^27 kg',
    diameter: '139,820 km',
    distanceFromSun: '778.5 million km',
    orbitalPeriod: '11.86 Earth years',
    rotationPeriod: '9 hours 56 minutes',
    temperature: '-110°C (Average)',
    atmosphere: ['Hydrogen (89.8%)', 'Helium (10.2%)', 'Methane', 'Ammonia'],
    color: '#cca47e',
    secondaryColor: '#e2be9c',
    moons: 95,
    hasRings: true,
    funFact: 'Jupiter acts as our celestial shield. Its massive gravitational pull deflects incoming outer asteroids and comets away from Earth.',
    crossSection: {
      crust: 'Dense, turbulent molecular hydrogen and helium atmosphere compressing into liquid form as depth increases.',
      mantle: 'A metallic liquid hydrogen state acting under extreme pressure, generating an ultra-powerful magnetosphere.',
      core: 'A dense, high-pressure rocky/metallic core possibly dissolving or melting, estimated at 12 to 45 Earth masses.'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Ringed Aristocrat',
    description: 'Distinguished by a majestic, complex system of ice, rock, and dust rings. Saturn is a low-density gas giant with a core under immense pressure, surrounded by an extremely active, storm-lashed atmosphere.',
    mass: '5.6834 x 10^26 kg',
    diameter: '116,460 km',
    distanceFromSun: '1.434 billion km',
    orbitalPeriod: '29.45 Earth years',
    rotationPeriod: '10 hours 42 minutes',
    temperature: '-140°C (Average)',
    atmosphere: ['Hydrogen (96%)', 'Helium (3%)', 'Methane', 'Ethane'],
    color: '#ead2ac',
    secondaryColor: '#ffdca3',
    moons: 146,
    hasRings: true,
    funFact: 'Saturn boasts a density lower than liquid water. If placed in an immense celestial bathtub, Saturn would float.',
    crossSection: {
      crust: 'Shallow molecular ammonia cloud layers translating into dense pressurized gaseous and liquid hydrogen.',
      mantle: 'Deep metallic liquid hydrogen phase wrapping the core, carrying heavy electrical currents and thermal loops.',
      core: 'A solid silicate rock and iron composite core, surrounded by an intense layer of metallic hydrogen.'
    }
  }
];

export const MISSIONS: MissionInfo[] = [
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA / JPL',
    launchDate: 'September 5, 1977',
    status: 'Active',
    target: 'Outer Planets & Interstellar Space',
    type: 'Flyby / Deep-Space Probe',
    duration: '48 years, 8 months (Ongoing)',
    description: 'Humankind\'s furthest emissary. Voyager 1 revolutionized planetary science during its historic encounters with Jupiter and Saturn, before crossing the heliopause into the interstellar medium in 2012.',
    achievements: [
      'Discovered active vulcanism on Jupiter\'s moon Io.',
      'Discovered complex atmosphere and organic clouds on Saturn\'s moon Titan.',
      'First human-made object to cross into interstellar space (August 25, 2012).',
      'Carries the Golden Record—a digital capsule of Earth\'s sights, science, and sounds.'
    ],
    telemetry: {
      distanceTraveled: '24.4 billion km from Earth',
      speed: '61,200 km/h',
      carrierFreq: '2.29 GHz (Downlink)'
    }
  },
  {
    id: 'james-webb',
    name: 'James Webb Space Telescope',
    agency: 'NASA / ESA / CSA',
    launchDate: 'December 25, 2021',
    status: 'Active',
    target: 'Deep Space Infrared Observatory',
    type: 'Space Telescope (L2 Orbit)',
    duration: '4 years, 5 months',
    description: 'The premier cosmic time-machine. Operating from the second Lagrange point (L2), Webb inspects redshifted infrared radiation to peek through dust clouds, viewing the very first galaxies formed after the Big Bang.',
    achievements: [
      'Captured detail of early universe galaxies dating 13.5 billion years in the past.',
      'First atmospheric transmission spectrum detected on multiple habitable TRAPPIST-1 exoplanets.',
      'Unveiled stunning mid-infrared details of cosmic nursery structures, including the Pillars of Creation.'
    ],
    telemetry: {
      distanceTraveled: '1.5 million km (Stationed at L2)',
      speed: '0.37 km/s',
      carrierFreq: '25.9 GHz (Ka-Band)'
    }
  },
  {
    id: 'artemis-iii',
    name: 'Artemis III',
    agency: 'NASA / ESA / Axiom',
    launchDate: 'September 2026',
    status: 'Future',
    target: 'Lunar South Pole',
    type: 'Manned Landing Lunar Mission',
    duration: '30 Days Proposed',
    description: 'The historic return of humanity to the lunar surface. Artemis III plans to land the first woman and first person of color on the South Pole, probing permanently shadowed dark craters for volatile water-ice.',
    achievements: [
      'Establishing a mobile habitat and science suite at the lunar South Pole.',
      'Pioneering sustainable long-term deep space life support system validations.',
      'Extracting ice geological core samples to decode historical Solar System planetary evolution.'
    ],
    telemetry: {
      distanceTraveled: '384,400 km (Planned)',
      speed: '39,500 km/h (Escape velocity)',
      carrierFreq: '37.8 GHz (EHF Band)'
    }
  },
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    agency: 'NASA / ESA / ASI',
    launchDate: 'October 15, 1997',
    status: 'Completed',
    target: 'Saturn & Its Moons',
    type: 'Orbiter & Atmospheric Lander',
    duration: '19 Years, 11 Months',
    description: 'A spectacular joint odyssey that orbited Saturn for over 13 years. In 2017, Cassini concluded its life with the Grand Finale—twenty-two daring dives between the rings and planet before plunging into the atmosphere.',
    achievements: [
      'Landed the Huygens probe on Titan, revealing liquid methane rivers and hydrocarbon rain.',
      'Discovered massive water-vapor geysers spraying from active hydrothermal vents on Enceladus.',
      'Revealed the 3D structures and intense dynamic waves propagating through Saturn\'s rings.'
    ],
    telemetry: {
      distanceTraveled: '7.8 billion km total',
      speed: '124,000 km/h (Final entry)',
      carrierFreq: 'Decommissioned / Silent'
    }
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'pillars-creation',
    title: 'Pillars of Creation',
    category: 'Nebula',
    dateCaptured: 'July 12, 2022',
    instrument: 'NIRCam / JWST',
    spectralRange: 'Near-Infrared (0.9 - 4.4 microns)',
    coordinates: {
      ra: '18h 18m 48s',
      dec: '-13° 49\' 30"'
    },
    description: 'A breathtaking Webb perspective of a stellar nursery in the Eagle Nebula (Messier 16), roughly 6,500 light-years away. Columns of cold dense gas and interstellar dust condense into burning protostars, glowing magenta under intense local thermal fields.',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'andromeda-core',
    title: 'Andromeda Galactic Core',
    category: 'Galaxy',
    dateCaptured: 'October 24, 2023',
    instrument: 'Wide Field Space Camera',
    spectralRange: 'Optical / Near-UV (320 - 800 nm)',
    coordinates: {
      ra: '00h 42m 44s',
      dec: '+41° 16\' 09"'
    },
    description: 'The blazing, hyper-dense core of Messier 31, our nearest neighboring spiral galaxy. It lies 2.5 million light years away. Hundreds of billions of stellar nodes encircle a colossal central supermassive black hole estimating 140 million times the mass of the Sun.',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'carina',
    title: 'The Cosmic Cliffs',
    category: 'Nebula',
    dateCaptured: 'August 18, 2022',
    instrument: 'MIRI / JWST',
    spectralRange: 'Mid-Infrared (5 - 28 microns)',
    coordinates: {
      ra: '10h 43m 54s',
      dec: '-59° 52\' 04"'
    },
    description: 'A majestic molecular ridge inside the Carina Nebula (NGC 3372) which showcases massive ionization fronts. Towering dust cliffs are carved by powerful stellar winds from burning star structures, casting deep shadows against glowing dust fields.',
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'einstein-ring',
    title: 'The Einstein Ring (SDSS J0146)',
    category: 'Phenomenon',
    dateCaptured: 'December 05, 2024',
    instrument: 'Space Telescope Imaging Spectrograph',
    spectralRange: 'Deep Infrared & Optical Continuum',
    coordinates: {
      ra: '01h 46m 56s',
      dec: '-09° 29\' 18"'
    },
    description: 'An extraordinary example of gravitational lensing predicted by general relativity. The extreme mass density of a foreground galactic cluster warps spacer-time fabric, bending and amplifying light from a background star node into a perfectly circular ring of light.',
    imageUrl: 'https://images.unsplash.com/photo-1570288685280-7802a8f8c437?q=80&w=1200&auto=format&fit=crop'
  }
];
