import { useEffect, useState } from 'react';
import StarCanvas from './components/StarCanvas';
import AudioController from './components/AudioController';
import PlanetDisplay from './components/PlanetDisplay';
import MissionDashboard from './components/MissionDashboard';
import ObservationGallery from './components/ObservationGallery';
import TelemetryControlCenter from './components/TelemetryControlCenter';
import { soundEngine } from './audio';
import { Orbit, Compass, Activity, Play, ArrowDown, ChevronRight, Menu, X, Landmark, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'planets' | 'missions' | 'gallery' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Real-time ticking statistical parameters
  const [lightyears, setLightyears] = useState(4292001.44);
  const [objectsCount, setObjectsCount] = useState(14204);

  useEffect(() => {
    const handler = setInterval(() => {
      // Slow realistic increments of cosmological stats
      setLightyears(prev => prev + 0.12);
      if (Math.random() < 0.1) {
        setObjectsCount(prev => prev + 1);
      }
    }, 1300);

    return () => clearInterval(handler);
  }, []);

  const handlePageChange = (page: Page) => {
    soundEngine.playPulse(700, 0.1, 'sine');
    setCurrentPage(page);
    setMobileMenuOpen(false);
    
    // Auto scroll top when shifting pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'planets', label: 'Planets' },
    { id: 'missions', label: 'Missions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#020205] text-[#e0e0e0] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between selection:bg-blue-500/30 selection:text-white">
      {/* 1. Cinematic Star particles background */}
      <StarCanvas />

      {/* 2. Editorial Top Header Navbar */}
      <nav className="relative z-40 border-b border-white/5 bg-black/40 backdrop-blur-md px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-300">
        {/* Brand Logo with cinzel italic font */}
        <div 
          onClick={() => handlePageChange('home')}
          className="text-2xl font-bold tracking-[0.2em] italic font-serif cursor-pointer hover:opacity-80 transition-opacity"
        >
          AETERNA
        </div>

        {/* Desktop navigation tabs */}
        <ul className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-gray-400">
          {menuItems.map(item => {
            const isActive = item.id === currentPage;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handlePageChange(item.id)}
                  className={`hover:text-white transition-colors cursor-pointer py-1 ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Real-time telemetry connection lag display */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
            Downlink Feed: 0.04s latency
          </span>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => {
            soundEngine.playPulse(500, 0.08, 'sine');
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Dropdown Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[77px] bg-[#050510]/95 backdrop-blur-xl border-b border-white/10 z-30 p-6 flex flex-col gap-4 shadow-xl"
          >
            <ul className="flex flex-col gap-4 text-xs font-mono uppercase tracking-[0.2em]">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => handlePageChange(item.id)}
                    className={`w-full text-left py-2 px-3 rounded ${
                      currentPage === item.id 
                        ? 'bg-white/10 text-white font-semibold' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    // {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[9px] font-mono text-gray-500">
              <span>DOWNLINK ID: G_04_99X</span>
              <span>DELAY: 0.04 SEC</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Display Arena Grid */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center"
            >
              {/* Left Column: Descriptive Space Narrative (Col-span 4) */}
              <div className="lg:col-span-4 flex flex-col justify-end gap-6 order-2 lg:order-1 lg:pr-6">
                <div className="h-[1px] w-24 bg-white/40"></div>
                <p className="text-sm leading-relaxed text-gray-400 font-light font-sans">
                  Witness the dawn of interstellar exploration. Aeterna provides an immersive window into the cosmic void, bridging the distance between humanity and the farthest reaches of the Kepler system star maps.
                </p>
                
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <button 
                    onClick={() => handlePageChange('planets')}
                    className="px-8 py-3.5 border border-white/30 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 rounded cursor-pointer flex items-center gap-2 group"
                  >
                    Begin Journey <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 italic flex items-center gap-2 animate-pulse">
                    <ArrowDown className="w-3.5 h-3.5" /> Select index to discover
                  </div>
                </div>
              </div>

              {/* Center: Hero display large planetary sphere graphics & title (Col-span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center relative py-10 order-1 lg:order-2">
                <h1 className="text-[100px] sm:text-[140px] font-serif italic leading-none tracking-tighter opacity-90 select-none">
                  Cosmos
                </h1>
                
                {/* Large aesthetic sphere simulating planetary eclipse */}
                <div className="absolute right-0 md:right-1/10 top-1/2 -translate-y-1/2 w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-gradient-to-tr from-[#020205] via-[#090925] to-[#1e1a5a] shadow-[inset_-25px_-25px_60px_rgba(0,0,0,0.95),0_0_80px_rgba(30,30,80,0.4)] border border-white/5 pointer-events-none" />
                
                <div className="mt-[-10px] text-center z-10">
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.8em] font-sans text-white/60 ml-3">
                    The Final Frontier
                  </span>
                </div>
              </div>

              {/* Right Column: Mini static telemetry overview and System Audio Suite (Col-span 3) */}
              <div className="lg:col-span-3 flex flex-col gap-6 justify-between py-2 order-3">
                {/* Dynamic Space sound receiver module */}
                <AudioController />

                {/* Simulated Telemetry summary block */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex flex-col gap-4">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-mono">
                    System Vector Profile
                  </div>
                  
                  <div className="space-y-3 font-sans">
                    <div>
                      <div className="text-[10px] font-light text-gray-500 uppercase">Primary Focal Sector</div>
                      <div className="text-sm font-mono tracking-tight text-white font-medium mt-0.5">
                        AL-14.882 // ALPHA
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">Oxygen loop</div>
                        <div className="text-xs font-mono text-gray-300 mt-0.5">94.20% stable</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">React fuel</div>
                        <div className="text-xs font-mono text-gray-300 mt-0.5">12,840 Kg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'planets' && (
            <motion.div
              key="planets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-4xl font-serif italic text-white tracking-wide">Planetary Archives</h2>
                <p className="text-xs text-gray-500 font-light mt-1 uppercase tracking-widest">
                  Observe and inspect local thermodynamic parameters of bodies in solar sectors
                </p>
              </div>
              <PlanetDisplay />
            </motion.div>
          )}

          {currentPage === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-4xl font-serif italic text-white tracking-wide">Historical Voyages</h2>
                <p className="text-xs text-gray-500 font-light mt-1 uppercase tracking-widest">
                  Chronicle database of deep-space voyages, lunar habitats, and galactic telescopes
                </p>
              </div>
              <MissionDashboard />
            </motion.div>
          )}

          {currentPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-4xl font-serif italic text-white tracking-wide">Stellar Imagery</h2>
                <p className="text-xs text-gray-500 font-light mt-1 uppercase tracking-widest">
                  Deep infrared focal telemetry from spaceborne observatories and Hubble probes
                </p>
              </div>
              <ObservationGallery />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <h2 className="text-4xl font-serif italic text-white tracking-wide">Aeterna Authority Briefing</h2>
                <p className="text-xs text-gray-500 font-light mt-1 uppercase tracking-widest">
                  Operational mission briefing details, sub-frequency receivers, and live downlink triggers
                </p>
              </div>
              <TelemetryControlCenter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Editorial Fine Art Footer */}
      <footer className="relative z-20 border-t border-white/5 bg-black/40 backdrop-blur-md px-6 md:px-12 py-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono">
        <div className="flex flex-wrap gap-8 uppercase tracking-[0.2em] opacity-40 justify-center md:justify-start">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>© 124 Aeterna Space Authority</span>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest opacity-40 select-none">Lightyears Traveled</span>
            <span className="text-xs font-semibold tracking-tight text-white mt-0.5 tabular-nums">
              {lightyears.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest opacity-40 select-none">Celestial Objects cataloged</span>
            <span className="text-xs font-semibold tracking-tight text-white mt-0.5">
              {objectsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
