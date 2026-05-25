import { useState } from 'react';
import { PlanetInfo } from '../types';
import { PLANETS } from '../data';
import { soundEngine } from '../audio';
import { Globe, Shield, Orbit, CircleDot, Info, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PlanetDisplay() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'visual' | 'structure'>('visual');
  const activePlanet = PLANETS[activeIdx];

  const handlePlanetSelect = (idx: number) => {
    soundEngine.playPulse(500 + idx * 60, 0.12, 'sine');
    setActiveIdx(idx);
  };

  const handleViewToggle = (mode: 'visual' | 'structure') => {
    soundEngine.playSweep(mode === 'structure' ? 'down' : 'up');
    setViewMode(mode);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Column 1: Editorial list of planets (Col-span 3) */}
      <div className="lg:col-span-3 flex flex-col gap-2 relative">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400/80 mb-4 font-mono flex items-center gap-2">
          <Orbit className="w-3.5 h-3.5 text-blue-400" />
          <span>System Indices</span>
        </div>
        <div className="space-y-1.5 border-l border-white/5 pl-4">
          {PLANETS.map((planet, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={planet.id}
                onClick={() => handlePlanetSelect(idx)}
                className={`w-full text-left py-3 px-4 rounded transition-all duration-300 relative group flex items-center justify-between ${
                  isActive
                    ? 'bg-white/5 border border-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/token relative'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePlanetBar"
                    className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-blue-400 rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div>
                  <div className="text-[9px] font-mono uppercase text-gray-500 tracking-wider">
                    SECTOR // 0{idx + 1}
                  </div>
                  <div className="text-sm font-sans font-medium tracking-wide">
                    {planet.name}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-600 group-hover:text-blue-400 transition-colors">
                  {planet.orbitalPeriod.split(' ')[0]} {planet.orbitalPeriod.split(' ')[1]?.slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Column 2: Gorgeous Volumetric Planet Visual Model (Col-span 5) */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[420px] bg-black/20 rounded-xl border border-white/5 p-6 relative overflow-hidden">
        {/* Navigation Selector for Visual Mode / Structural Cross section */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex gap-1.5 bg-black/50 p-1 rounded-md border border-white/5">
            <button
              onClick={() => handleViewToggle('visual')}
              className={`px-3 py-1.5 rounded text-[9px] uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                viewMode === 'visual'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Globe className="w-2.5 h-2.5" /> Volumetric
            </button>
            <button
              onClick={() => handleViewToggle('structure')}
              className={`px-3 py-1.5 rounded text-[9px] uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                viewMode === 'structure'
                  ? 'bg-blue-900/40 text-blue-300'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Layers className="w-2.5 h-2.5" /> Anatomy
            </button>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-gray-500/80 uppercase">
            COORDINATE GRID G-{activePlanet.id.toUpperCase().slice(0, 4)}
          </span>
        </div>

        {/* Ambient colored shadow back glow linked dynamically to planet secondary color */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-15 blur-[80px] pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: activePlanet.color,
            boxShadow: `0 0 120px 40px ${activePlanet.color}`,
          }}
        />

        <AnimatePresence mode="wait">
          {viewMode === 'visual' ? (
            <motion.div
              key={`visual-${activePlanet.id}`}
              initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 20 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative w-64 h-64 flex items-center justify-center"
            >
              {/* Volumetric sphere styling. Inner shadows provide beautiful curvature, radial backdrops mimic sunlight */}
              <div
                className="w-56 h-56 rounded-full relative shadow-[0_4px_50px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${activePlanet.secondaryColor}D0 0%, ${activePlanet.color}B0 35%, #050510 90%)`,
                  boxShadow: `
                    inset -30px -30px 60px rgba(0,0,0,0.98), 
                    inset 20px 20px 45px rgba(255,255,255,0.22),
                    0 0 60px ${activePlanet.color}25
                  `,
                }}
              >
                {/* Slow orbiting custom storm vortex mock or cloud patterns */}
                <div 
                  className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay pointer-events-none animate-[spin_50s_linear_infinite]"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent 40%, rgba(0,0,0,0.5) 60%, transparent)`,
                    backgroundSize: '200% 200%'
                  }}
                />
              </div>

              {/* Planet Ring System (Outer orbital layers) */}
              {activePlanet.hasRings && (
                <div
                  className="absolute w-80 h-10 border-[10px] border-double rounded-full pointer-events-none rotate-[15deg] opacity-75 blur-[0.6px] transition-all duration-500"
                  style={{
                    borderColor: `${activePlanet.color}45`,
                    transform: 'rotate(-16deg) scaleY(0.24)',
                    boxShadow: `0 0 25px ${activePlanet.color}20`,
                  }}
                />
              )}

              {/* Planetary atmosphere halo shroud */}
              <div
                className="absolute inset-[-4px] rounded-full opacity-20 pointer-events-none transition-all duration-700"
                style={{
                  boxShadow: `inset 0 0 40px ${activePlanet.secondaryColor}, 0 0 50px ${activePlanet.color}`,
                }}
              />
            </motion.div>
          ) : (
            /* Structural Cross section / Earth Anatomy view */
            <motion.div
              key={`struct-${activePlanet.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col justify-center items-center px-4"
            >
              {/* Nested interactive visual rings of planetary interiors */}
              <div className="relative w-48 h-48 flex items-center justify-center my-6">
                {/* Crust outer layer */}
                <div 
                  className="absolute w-48 h-48 rounded-full border border-dashed flex items-center justify-center animate-[spin_100s_linear_infinite]"
                  style={{ borderColor: activePlanet.color }}
                />
                
                {/* Mantle Middle layer */}
                <div 
                  className="absolute w-36 h-36 rounded-full border-2 border-dotted flex items-center justify-center animate-[spin_60s_linear_infinite]"
                  style={{ borderColor: activePlanet.secondaryColor }}
                />

                {/* Core Inner Sphere with custom radiating gradients */}
                <div
                  className="absolute w-20 h-20 rounded-full flex items-center justify-center animate-pulse"
                  style={{
                    background: `radial-gradient(circle, #ffeed3 0%, ${activePlanet.secondaryColor}D0 60%, ${activePlanet.color}E5 100%)`,
                    boxShadow: `0 0 35px ${activePlanet.secondaryColor}40`
                  }}
                >
                  <span className="text-[10px] font-mono text-black font-semibold tracking-wider">CORE</span>
                </div>
              </div>

              {/* Core description indices */}
              <div className="space-y-4 w-full">
                <div className="border-t border-white/5 pt-3">
                  <div className="text-[9px] uppercase font-mono text-blue-300">Crust Composition</div>
                  <p className="text-[11px] leading-relaxed text-gray-400 mt-1 font-light italic">
                    {activePlanet.crossSection.crust}
                  </p>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-mono text-cyan-400">Silicate Mantle Dynamics</div>
                  <p className="text-[11px] leading-relaxed text-gray-400 mt-1 font-light italic">
                    {activePlanet.crossSection.mantle}
                  </p>
                </div>
                <div>
                  <div className="text-[9px] uppercase font-mono text-amber-500">Thermonuclear Core Parameters</div>
                  <p className="text-[11px] leading-relaxed text-gray-400 mt-1 font-light italic">
                    {activePlanet.crossSection.core}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun trivia bar in footer of box */}
        <div className="mt-4 flex gap-2.5 bg-white/5 border border-white/5 p-4 rounded-lg w-full items-start">
          <Info className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-300 leading-relaxed font-light font-sans">
            <span className="font-mono text-[9px] uppercase tracking-wider text-blue-400 mr-2">CELESTIAL ANECDOTE //</span>
            {activePlanet.funFact}
          </p>
        </div>
      </div>

      {/* Column 3: Space metrics grid / Chemical composition of air (Col-span 4) */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400/80 mb-1.5 font-mono">
          Physical Attributes & Metrics
        </div>

        {/* Glass Cards details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 rounded-lg flex flex-col">
            <span className="text-[9px] font-mono uppercase text-gray-500">Mass Index</span>
            <span className="text-sm font-sans font-semibold tracking-tight text-white mt-1">
              {activePlanet.mass.split(' ')[0]}
            </span>
            <span className="text-[9px] font-mono text-gray-500">
              {activePlanet.mass.substring(activePlanet.mass.indexOf(' ')) || 'kg'}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 rounded-lg flex flex-col">
            <span className="text-[9px] font-mono uppercase text-gray-500">Equatorial Radius</span>
            <span className="text-sm font-sans font-semibold tracking-tight text-white mt-1">
              {activePlanet.diameter}
            </span>
            <span className="text-[9px] font-mono text-gray-500">Sphere Diameter</span>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 rounded-lg flex flex-col">
            <span className="text-[9px] font-mono uppercase text-gray-500">Solar Vector</span>
            <span className="text-sm font-sans font-semibold tracking-tight text-white mt-1">
              {activePlanet.distanceFromSun}
            </span>
            <span className="text-[9px] font-mono text-gray-500">Sola distance</span>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-4 rounded-lg flex flex-col">
            <span className="text-[9px] font-mono uppercase text-gray-500">Solar Rotation (Day)</span>
            <span className="text-sm font-sans font-semibold tracking-tight text-white mt-1">
              {activePlanet.rotationPeriod.split(' ')[0]}
            </span>
            <span className="text-[9px] font-mono text-gray-400 leading-none">
              {activePlanet.rotationPeriod.split(' ').slice(1).join(' ') || 'Hours'}
            </span>
          </div>
        </div>

        {/* Extended astronomical telemetry card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-5">
          <div className="text-[10px] uppercase font-mono text-blue-400 mb-3 tracking-widest flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Atmospheric Chemical Analysis
          </div>
          
          <div className="space-y-4">
            {activePlanet.atmosphere.length > 0 ? (
              activePlanet.atmosphere.map((compound, index) => {
                // Synthetically map compounds to varying volume scales
                const percentages = [65, 23, 10, 2];
                const activeVal = percentages[index] || 5;
                return (
                  <div key={compound} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-300">{compound}</span>
                      <span className="text-blue-400/80">{activeVal}% volume</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeVal}%` }}
                        transition={{ delay: index * 0.15, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: activePlanet.color }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-[10px] font-mono text-gray-500 uppercase">
                Vacuum State // No atmosphere detected
              </div>
            )}
            
            <div className="border-t border-white/5 pt-4 space-y-2 mt-4">
              <div className="flex justify-between text-[10px]">
                <span className="font-mono text-gray-500">THERMAL INDEX:</span>
                <span className="font-mono text-white font-semibold">{activePlanet.temperature}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="font-mono text-gray-500">SATELLITES (MOONS):</span>
                <span className="font-mono text-white font-semibold">{activePlanet.moons} registered</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="font-mono text-gray-500">SUN AXIS ROTATION:</span>
                <span className="font-mono text-white font-semibold">{activePlanet.orbitalPeriod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
