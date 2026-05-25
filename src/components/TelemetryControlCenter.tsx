import { useEffect, useState, useRef } from 'react';
import { soundEngine } from '../audio';
import { Radio, Terminal, Settings2, Play, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface LogLine {
  id: string;
  timestamp: string;
  type: 'INFO' | 'OK' | 'WARN' | 'DATA';
  message: string;
}

export default function TelemetryControlCenter() {
  const [carrierFreq, setCarrierFreq] = useState(2.29); // GHz standard telemetry band
  const [signalStrength, setSignalStrength] = useState(94.2);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Pre-populate some historical log traces
  useEffect(() => {
    const initialLogs: LogLine[] = [
      { id: '1', timestamp: '07:21:04', type: 'INFO', message: 'Sub-space acoustic telemetry system online.' },
      { id: '2', timestamp: '07:21:08', type: 'OK', message: 'Main transmitter locks with Kepler focal system G-1.' },
      { id: '3', timestamp: '07:22:15', type: 'DATA', message: 'Dopler shift parameters stabilized at 2.2942 GHz.' },
    ];
    setLogs(initialLogs);
  }, []);

  // Set up periodic random terminal logs to create that "Live Feed" agency style!
  useEffect(() => {
    const messages = [
      { type: 'OK', msg: 'Deep Space network receiver cluster ALIGNED.' },
      { type: 'DATA', msg: 'Downlink packet received // parity check: 100% SUCCESS.' },
      { type: 'INFO', msg: 'Adjusting focal parameters to mitigate stellar radiation bloom.' },
      { type: 'WARN', msg: 'Minor solar flare detected // compensating signal filters.' },
      { type: 'OK', msg: 'Stellar magnetic field bypass: SYSTEM STABLE.' },
      { type: 'DATA', msg: 'New spectral observation packet queued for image deconvolution.' },
    ] as const;

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * messages.length);
      const selected = messages[idx];
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      const newLog: LogLine = {
        id: Math.random().toString(),
        timestamp: time,
        type: selected.type,
        message: selected.msg
      };

      setLogs(prev => [...prev.slice(-14), newLog]); // Keep last 15 logs
      
      // Auto pulse on info updates to simulate terminal clicking sound!
      if (Math.random() < 0.4) {
        soundEngine.playPulse(1200, 0.05, 'sine');
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Clean log scrolling
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const triggerPing = () => {
    soundEngine.playPulse(1400, 0.4, 'triangle');
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const log: LogLine = {
      id: Math.random().toString(),
      timestamp: time,
      type: 'OK',
      message: 'Active deep-space Ping triggered // echo roundtrip: 44.2 minutes.'
    };
    setLogs(prev => [...prev, log]);
  };

  const getLogColor = (type: LogLine['type']) => {
    switch (type) {
      case 'OK': return 'text-emerald-400';
      case 'WARN': return 'text-rose-400';
      case 'INFO': return 'text-blue-400';
      case 'DATA': return 'text-amber-400';
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editorial narrative column about Aeterna Space Authority (Col-span 5) */}
      <div className="lg:col-span-5 space-y-6">
        <h3 className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-mono">
          Project Philosophy & Narrative
        </h3>
        
        <h2 className="text-3xl font-serif italic leading-tight text-white font-semibold">
          Bridging Humanity and the Remote Cosmic Cradle.
        </h2>

        <div className="h-[1px] w-24 bg-white/20"></div>

        <p className="text-sm leading-relaxed text-gray-400 font-light font-sans">
          The Aeterna Exploration Initiative is a joint international planetary telemetry cooperative, formed in the early 21st century to observe, analyze, and map distant extrasolar atmospheres within the nearby spiral sectors.
        </p>

        <p className="text-sm leading-relaxed text-gray-400 font-light font-sans">
          Through a unified array of L2 Deep-Space Observatories, optical interferometers, and sub-space probes, we track interstellar bodies, decode gravitational lensing events, and translate cosmic frequencies into high-definition digital artifacts.
        </p>

        <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex gap-3 text-[11px] text-gray-400 font-light">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            This interactive console behaves as a live downlink client. Interacting with synthetic carrier controls triggers immediate acoustic sweeps directly in the on-board client systems.
          </p>
        </div>
      </div>

      {/* Terminal Live logs & Sound controllers column (Col-span 7) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-5 py-3.5 bg-white/5 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#e3bb76]">
                Kepler Receiver Console // Node 04X
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-[8px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Connection Locked
            </span>
          </div>

          {/* Interactive Downlink carrier controls */}
          <div className="p-5 border-b border-white/5 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/ token">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">CARRIER SUBFREQUENCY</span>
                <span className="text-white font-medium">{carrierFreq.toFixed(3)} GHz</span>
              </div>
              <input
                type="range"
                min="2.15"
                max="2.45"
                step="0.005"
                value={carrierFreq}
                onChange={(e) => {
                  const f = parseFloat(e.target.value);
                  setCarrierFreq(f);
                  // Dynamic real-time sound updates! Generates high fidelity pitch shift clicks on sliding
                  soundEngine.playPulse(f * 250, 0.04, 'sine');
                  setSignalStrength(Number((95 - Math.abs(2.29 - f) * 80).toFixed(1)));
                }}
                className="w-full accent-blue-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-gray-500">
                <span>2.15 GHz (S-Band)</span>
                <span>2.45 GHz (X-Band)</span>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-1.5">
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>SIGNAL ACCURACY</span>
                <span className={`${signalStrength > 85 ? 'text-emerald-400' : 'text-[#e06f53]'}`}>
                  {signalStrength}% (Dopler Sync)
                </span>
              </div>
              
              {/* Dynamic trigger sounds with logs insertion */}
              <button
                onClick={triggerPing}
                className="w-full py-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-[9px] font-mono uppercase tracking-widest text-blue-300 rounded transition-colors flex items-center justify-center gap-2"
              >
                <Radio className="w-3.5 h-3.5" /> Initialize Telemetry Ping
              </button>
            </div>
          </div>

          {/* Terminal Console Lines */}
          <div 
            ref={logContainerRef}
            className="p-5 h-56 font-mono text-[11px] space-y-1.5 overflow-y-auto bg-[#04040a]/90 select-text scrollbar-thin scrollbar-thumb-white/10"
          >
            {logs.map(log => (
              <div key={log.id} className="flex gap-2.5 items-start leading-normal text-gray-300">
                <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                <span className={`font-semibold shrink-0 uppercase tracking-wide text-[10px] ${getLogColor(log.type)}`}>
                  {log.type}
                </span>
                <span className="font-light break-all">{log.message}</span>
              </div>
            ))}
            {/* Blinking typing caret */}
            <div className="flex items-center gap-1">
              <span className="text-gray-600">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
              <span className="text-blue-500 uppercase font-semibold text-[10px]">AWAITING</span>
              <span className="w-1.5 h-3.5 bg-blue-400 animate-[pulse_1s_infinite] inline-block ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
