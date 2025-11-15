/**
 * Audio SFX System with Web Audio API
 * Provides spatial audio, volume control, and preloading
 */

class AudioSystem {
  constructor() {
    this.context = null;
    this.sounds = new Map();
    this.masterGain = null;
    this.muted = false;
    this.initialized = false;
  }

  /**
   * Initialize audio context (must be called after user interaction)
   */
  async init() {
    if (this.initialized) return;
    
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.initialized = true;
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  /**
   * Load and decode audio file
   * @param {string} name - Sound identifier
   * @param {string} url - URL to audio file
   */
  async loadSound(name, url) {
    if (!this.context) await this.init();
    if (!this.context) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.sounds.set(name, audioBuffer);
    } catch (error) {
      console.warn(`Failed to load sound: ${name}`, error);
    }
  }

  /**
   * Play a sound effect
   * @param {string} name - Sound identifier
   * @param {Object} options - Playback options (volume, rate, loop)
   */
  play(name, options = {}) {
    if (!this.context || this.muted || !this.sounds.has(name)) return;

    const {
      volume = 1,
      rate = 1,
      loop = false,
      detune = 0,
    } = options;

    try {
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();

      source.buffer = this.sounds.get(name);
      source.playbackRate.value = rate;
      source.loop = loop;
      source.detune.value = detune;

      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(this.masterGain);

      source.start(0);
      
      return source; // Allow caller to stop if needed
    } catch (error) {
      console.warn(`Failed to play sound: ${name}`, error);
    }
  }

  /**
   * Toggle mute
   */
  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : 1;
    }
    return this.muted;
  }

  /**
   * Set master volume
   * @param {number} volume - Volume level (0-1)
   */
  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

// Singleton instance
export const audioSystem = new AudioSystem();

// Convenience functions
export const playWoosh = () => audioSystem.play('woosh', { volume: 0.3, rate: 1.2 });
export const playPop = () => audioSystem.play('pop', { volume: 0.5 });
export const playConfetti = () => audioSystem.play('confetti', { volume: 0.4 });
export const playReveal = () => audioSystem.play('reveal', { volume: 0.6 });
export const toggleMute = () => audioSystem.toggleMute();
