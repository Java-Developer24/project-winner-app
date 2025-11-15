/**
 * Hollywood-grade sound system using Howler.js
 * Manages all audio effects with mute persistence
 */

import { Howl, Howler } from 'howler';

class SoundSystem {
  constructor() {
    this.sounds = {};
    this.muted = false;
    this.initialized = false;
    
    // Load mute preference from localStorage
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('aurora-sound-muted');
      this.muted = savedMute === 'true';
    }
  }

  init() {
    if (this.initialized) return;
    
    // Define all sound effects
    const soundDefinitions = {
      ambient: {
        src: ['/sounds/ambient-hum.mp3'],
        loop: true,
        volume: 0.3,
        fallback: true, // Use fallback if file doesn't exist
      },
      whoosh: {
        src: ['/sounds/whoosh.mp3'],
        volume: 0.5,
        fallback: true,
      },
      pop: {
        src: ['/sounds/pop.mp3'],
        volume: 0.6,
        fallback: true,
      },
      confetti: {
        src: ['/sounds/confetti.mp3'],
        volume: 0.7,
        fallback: true,
      },
      assemble: {
        src: ['/sounds/assemble.mp3'],
        volume: 0.4,
        fallback: true,
      },
      reveal: {
        src: ['/sounds/reveal.mp3'],
        volume: 0.8,
        fallback: true,
      },
    };

    // Load all sounds
    Object.entries(soundDefinitions).forEach(([key, config]) => {
      try {
        this.sounds[key] = new Howl({
          src: config.src,
          loop: config.loop || false,
          volume: config.volume || 0.5,
          onloaderror: () => {
            // Fallback: create silent placeholder
            if (config.fallback) {
              console.log(`Audio file not found: ${key}, using silent fallback`);
            }
          },
        });
      } catch (error) {
        console.warn(`Failed to load sound: ${key}`, error);
      }
    });

    // Apply mute state
    Howler.mute(this.muted);
    this.initialized = true;
  }

  play(soundName, options = {}) {
    this.init(); // Ensure initialized

    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`Sound not found: ${soundName}`);
      return;
    }

    try {
      // Apply options
      if (options.volume !== undefined) {
        sound.volume(options.volume);
      }
      if (options.rate !== undefined) {
        sound.rate(options.rate);
      }

      sound.play();
    } catch (error) {
      console.warn(`Failed to play sound: ${soundName}`, error);
    }
  }

  stop(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.stop();
    }
  }

  setMute(muted) {
    this.muted = muted;
    Howler.mute(muted);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('aurora-sound-muted', muted.toString());
    }
  }

  toggleMute() {
    this.setMute(!this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Fade in background ambient
  startAmbient() {
    this.init();
    const ambient = this.sounds.ambient;
    if (ambient && !ambient.playing()) {
      ambient.play();
      ambient.fade(0, 0.3, 2000);
    }
  }

  // Fade out background ambient
  stopAmbient() {
    const ambient = this.sounds.ambient;
    if (ambient && ambient.playing()) {
      ambient.fade(0.3, 0, 1000);
      setTimeout(() => ambient.stop(), 1000);
    }
  }
}

// Create singleton instance
const soundSystem = new SoundSystem();

export default soundSystem;
