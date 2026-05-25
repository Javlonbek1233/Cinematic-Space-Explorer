import { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../audio';
import { Volume2, VolumeX, Radio, Zap, Music } from 'lucide-react';

export default function AudioController() {
  const [muted, setMuted] = useState(true);
  const [vol, setVol] = useState(0.5);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check initial mute state
    setMuted(soundEngine.getMuteState());
  }, []);

  // Update volume in engine
  useEffect(() => {
    soundEngine.setVolume(vol);
  }, [vol]);

  // Handle initialization on first interaction
  const handleToggle = () => {
    soundEngine.init();
    const isMutedNow = soundEngine.toggleMute(vol);
    setMuted(isMutedNow);
    setReady(true);
    soundEngine.playPulse(660, 0.15, 'sine');
  };

  const handlePulseTest = (freq: number) => {
    soundEngine.playPulse(freq, 0.25, 'triangle');
  };

  const handleSweepTest = (dir: 'up' | 'down') => {
    soundEngine.playSweep(dir);
  };

  // Run dynamic wave analyzer simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = muted ? 'rgba(255, 255, 255, 0.15)' : 'rgba(96, 165, 250, 0.6)'; // blue-400
      ctx.beginPath();
      
      const segments = canvas.width;
      for (let i = 0; i < segments; i++) {
        const x = i;
        // Standard multi-harmonic wave calculations
        let y = canvas.height / 2;
        
        if (!muted) {
          const mainFreq = 0.05;
          const amplitude = (vol * 12) * Math.sin(i * 0.01) * Math.cos(i * 0.005);
          y += Math.sin(x * mainFreq + phase) * amplitude;
          y += Math.sin(x * 0.14 - phase * 1.5) * (amplitude * 0.3);
        } else {
          // Minimal static fuzz
          y += Math.sin(x * 0.8) * 0.4;
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      phase += muted ? 0.01 : 0.08;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [muted, vol]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Radio className={`w-4 h-4 ${muted ? 'text-gray-500' : 'text-blue-400 animate-pulse'}`} />
          <span className="text-[10px] tracking-widest uppercase font-mono text-gray-400">
            Acoustic Telemetry Stream
          </span>
        </div>
        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
          {!ready ? 'Off-line' : muted ? 'Mute' : 'Live'}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Toggle Panel */}
        <button
          onClick={handleToggle}
          className={`w-full py-3.5 border transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-3 ${
            muted 
              ? 'border-white/20 hover:border-white/50 bg-white/0 hover:bg-white/5 text-gray-300' 
              : 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300'
          }`}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          {muted ? 'Initialize Deep Space Ambient' : 'Disconnect Audio Receiver'}
        </button>

        {/* Real-time Oscilloscope Visualization */}
        <div className="relative h-10 w-full bg-black/45 rounded border border-white/5 overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} width={280} height={40} className="w-full h-full block" />
          {muted && (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono uppercase tracking-widest text-gray-500/70 select-none">
              Audio Wave Receiver Dormant
            </span>
          )}
        </div>

        {/* Volume Level Dial */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-mono text-gray-500">
            <span>VOLUME RECEIVER</span>
            <span>{Math.round(vol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={vol}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVol(v);
              if (muted) {
                // Auto unmute if they move the slider
                soundEngine.init();
                soundEngine.toggleMute(v);
                setMuted(false);
                setReady(true);
              }
            }}
            className="w-full accent-blue-400 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Subspace Synthesizer Board */}
        <div className="pt-2">
          <div className="text-[8px] tracking-wider uppercase font-sans text-gray-500 mb-2">
            Spectral Resonator Injectors (Play Synths)
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handlePulseTest(330)}
              disabled={muted}
              className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[8px] rounded font-mono uppercase text-gray-300 transition-colors disabled:opacity-30 disabled:hover:bg-white/0"
            >
              R-330
            </button>
            <button
              onClick={() => handlePulseTest(554)}
              disabled={muted}
              className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[8px] rounded font-mono uppercase text-gray-300 transition-colors disabled:opacity-30 disabled:hover:bg-white/0"
            >
              S-554
            </button>
            <button
              onClick={() => handlePulseTest(880)}
              disabled={muted}
              className="py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[8px] rounded font-mono uppercase text-gray-300 transition-colors disabled:opacity-30 disabled:hover:bg-white/0"
            >
              Y-880
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <button
              onClick={() => handleSweepTest('up')}
              disabled={muted}
              className="py-1 px-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-[8px] rounded font-mono uppercase text-blue-400/80 transition-colors disabled:opacity-30 disabled:hover:bg-white/0 flex justify-center items-center gap-1"
            >
              <Zap className="w-2.5 h-2.5" /> Sweep Up
            </button>
            <button
              onClick={() => handleSweepTest('down')}
              disabled={muted}
              className="py-1 px-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-[8px] rounded font-mono uppercase text-[#e06f53]/80 transition-colors disabled:opacity-30 disabled:hover:bg-white/0 flex justify-center items-center gap-1"
            >
              <Zap className="w-2.5 h-2.5 rotate-180" /> Sweep Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
