export class SpaceAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isMuted: boolean = true;
  private audioInitializedRef: boolean = false;

  constructor() {}

  init() {
    if (this.audioInitializedRef) return;
    try {
      // Handle browser support
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create Deep Drone
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.value = 110; // low frequency cut
      this.droneFilter.Q.value = 4.0;
      this.droneFilter.connect(this.masterGain);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.value = 55.0; // A1 note
      
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.value = 55.3; // slightly detuned for chorus

      const oscGain1 = this.ctx.createGain();
      oscGain1.gain.value = 0.15;
      const oscGain2 = this.ctx.createGain();
      oscGain2.gain.value = 0.25;

      this.droneOsc1.connect(oscGain1);
      this.droneOsc2.connect(oscGain2);

      oscGain1.connect(this.droneFilter);
      oscGain2.connect(this.droneFilter);

      // Create LFO for breathing filter cuts
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.08; // very slow, 12 seconds
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.value = 25; // sweep range 110Hz +/- 25

      this.lfo.connect(this.lfoGain);
      if (this.droneFilter) {
        this.lfoGain.connect(this.droneFilter.frequency);
      }

      // Start oscillators
      this.droneOsc1.start(0);
      this.droneOsc2.start(0);
      this.lfo.start(0);

      this.audioInitializedRef = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by security policies', e);
    }
  }

  setVolume(volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const targetVal = this.isMuted ? 0 : volume * 0.4;
    this.masterGain.gain.setTargetAtTime(targetVal, this.ctx.currentTime, 0.1);
  }

  toggleMute(currentVolume: number): boolean {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    this.setVolume(currentVolume);
    return this.isMuted;
  }

  getMuteState() {
    return this.isMuted;
  }

  // Play a brief high-frequency stellar pulse
  playPulse(freq: number = 880, duration: number = 0.12, type: 'sine' | 'triangle' = 'sine') {
    if (!this.audioInitializedRef || this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Slight glide down in pitch
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Suppress transient audio play errors
    }
  }

  // Play a gorgeous sweep simulating radiation detection scanner
  playSweep(direction: 'up' | 'down' = 'up') {
    if (!this.audioInitializedRef || this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = direction === 'up' ? 80 : 350;
      osc.frequency.exponentialRampToValueAtTime(direction === 'up' ? 380 : 70, this.ctx.currentTime + 0.5);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(direction === 'up' ? 200 : 800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(direction === 'up' ? 1000 : 150, this.ctx.currentTime + 0.5);
      filter.Q.value = 8.0;

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {
      // Sound fail-safe
    }
  }
}

export const soundEngine = new SpaceAudioEngine();
