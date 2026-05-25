import { useEffect, useState } from 'react';
import { MISSIONS } from '../data';
import { MissionInfo } from '../types';
import { soundEngine } from '../audio';
import { Radio, Navigation, Award, Calendar, ExternalLink, Activity, Info, Orbit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MissionDashboard() {
  const [activeId, setActiveId] = useState(MISSIONS[0].id);
  const activeMission = MISSIONS.find(m => m.id === activeId) || MISSIONS[0];
  
  // Real-time space drifting values simulation
  const [liveDistance, setLiveDistance] = useState(24429302144); // starting count for Voyager 1 (km)
  const [liveSpeed, setLiveSpeed] = useState(61204.54); // voyager 1 speed
  const [telemetryTick, setTelemetryTick] = useState(0);

  useEffect(() => {
    // Determine speed of selected mission, calculate base counter
    if (activeId === 'voyager-1') {
      setLiveDistance(24429302144);
      setLiveSpeed(61204.54);
    } else if (activeId === 'james-webb') {
      setLiveDistance(1504992.12);
      setLiveSpeed(1.34);
    } else if (activeId === 'artemis-iii') {
      setLiveDistance(384400.00);
      setLiveSpeed(0.00); // stationary prior to launch
    } else {
      setLiveDistance(7842004245);
      setLiveSpeed(124302.22);
    }
  }, [activeId]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time celestial progress
      setTelemetryTick(prev => prev + 1);
      
      setLiveDistance(prev => {
        if (activeId === 'artemis-iii') return prev; // Launch scheduled, not active
        const increment = (liveSpeed / 3600) * 1.5; // distance per tick (1.5s interval)
        return Number((prev + increment).toFixed(2));
      });

      setLiveSpeed(prev => {
        if (activeId === 'artemis-iii') return 0;
        // Minor gravitational speed variance (micro-drag)
        const drift = (Math.random() * 0.4 - 0.2);
        return Number(Math.max(1, prev + drift).toFixed(2));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [activeId, liveSpeed]);

  const handleMissionSelect = (id: string, idx: number) => {
    soundEngine.playPulse(440 + idx * 80, 0.2, 'triangle');
    setActiveId(id);
  };

  const getStatusColor = (status: MissionInfo['status']) => {
    switch (status) {
      case 'Active': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Lost': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Future': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Column 1: Fleet Command Selector list (Col-span-4) */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400/80 mb-2 font-mono flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Active Fleet Command</span>
        </div>
        
        <div className="space-y-2">
          {MISSIONS.map((mission, index) => {
            const isActive = mission.id === activeId;
            return (
              <button
                key={mission.id}
                onClick={() => handleMissionSelect(mission.id, index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 relative overflow-hidden group flex flex-col gap-2 ${
                  isActive
                    ? 'bg-blue-950/20 border-blue-500/30 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]'
                    : 'bg-white/5 border-white/5 hover:border-white/15'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeMissionBadge"
                    className="absolute right-4 top-4 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
                  />
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                    DEEP PROBE // 0{index + 1}
                  </span>
                  <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded border ${getStatusColor(mission.status)}`}>
                    {mission.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-sans font-medium text-white tracking-wide group-hover:text-blue-300 transition-colors">
                    {mission.name}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 mt-0.5 tracking-wider uppercase">
                    Agency: {mission.agency}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Column 2: Live Telemetry Feeds and Achievements (Col-span-8) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMission.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Live Metrics Grid Header */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1.5 px-3 bg-blue-500/10 border-l border-b border-blue-500/20 text-[9px] font-mono uppercase text-blue-300/90 tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" /> Real-time telemetry feed
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Distance telemetry */}
                <div className="border-r border-white/5 last:border-none pr-4">
                  <span className="text-[9px] font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 text-blue-400" /> Current Distance
                  </span>
                  <div className="text-xl font-mono tracking-tight text-white mt-2 font-semibold tabular-nums">
                    {liveDistance.toLocaleString()} <span className="text-xs text-gray-400">KM</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 select-none">
                    Ticking rate: +{((liveSpeed || 1) / 3600 * 1.5).toFixed(2)} km/s
                  </span>
                </div>

                {/* Velocity telemetry */}
                <div className="border-r border-white/5 last:border-none pr-4">
                  <span className="text-[9px] font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-cyan-400" /> Current Speed
                  </span>
                  <div className="text-xl font-mono tracking-tight text-white mt-2 font-semibold tabular-nums">
                    {liveSpeed.toLocaleString()} <span className="text-xs text-gray-400">KM/H</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 select-none">
                    Relativistic drift: ±0.05 km/h
                  </span>
                </div>

                {/* Antenna carrier frequencies */}
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-[#e06f53]" /> Carrier Frequency
                  </span>
                  <div className="text-xl font-mono tracking-tight text-white mt-2 font-semibold">
                    {activeMission.telemetry.carrierFreq}
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 select-none">
                    Dopler shift tracking synced
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative & Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Mission briefing */}
              <div className="md:col-span-7 space-y-4">
                <div className="bg-white/5 border border-white/5 rounded-lg p-5">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#e3bb76] mb-3 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> Operations Briefing
                  </div>
                  <h4 className="text-[18px] font-serif italic text-white leading-snug">
                    {activeMission.name}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light mt-2">
                    {activeMission.description}
                  </p>
                  
                  <div className="border-t border-white/5 pt-4 mt-4 grid grid-cols-2 gap-4 text-[10px] font-mono">
                    <div>
                      <span className="text-gray-500 block uppercase">LAUNCH CALENDAR</span>
                      <span className="text-gray-300 font-semibold uppercase flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3 h-3 text-blue-400" /> {activeMission.launchDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase">TARGET TARGET</span>
                      <span className="text-gray-300 font-semibold uppercase flex items-center gap-1.5 mt-1">
                        <Orbit className="w-3 h-3 text-emerald-400" /> {activeMission.target}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements points */}
              <div className="md:col-span-5">
                <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col gap-3">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Critical Achievements
                  </div>
                  
                  <ul className="space-y-3.5 pt-1">
                    {activeMission.achievements.map((ach, index) => (
                      <li key={index} className="flex gap-2.5 items-start">
                        <span className="font-serif italic text-emerald-500 font-bold text-sm leading-none mt-0.5">
                          0{index + 1}
                        </span>
                        <p className="text-[11px] leading-relaxed text-gray-300 font-light">
                          {ach}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
