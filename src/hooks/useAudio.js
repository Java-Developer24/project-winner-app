'use client';

import { useEffect, useState, useCallback } from 'react';
import { audioSystem } from '@/lib/utils/audio';

/**
 * Hook for managing audio SFX in the application
 * Handles initialization, playback, and mute state
 */
export function useAudio() {
  const [muted, setMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize audio system on user interaction
  const initAudio = useCallback(async () => {
    if (initialized) return;
    
    await audioSystem.init();
    setInitialized(true);
    
    // Load sound effects (using placeholder URLs - replace with actual audio files)
    // In production, host these files in /public/sounds/
    const sounds = [
      { name: 'woosh', url: '/sounds/woosh.mp3' },
      { name: 'pop', url: '/sounds/pop.mp3' },
      { name: 'confetti', url: '/sounds/confetti.mp3' },
      { name: 'reveal', url: '/sounds/reveal.mp3' },
    ];

    // Load sounds in parallel
    await Promise.all(
      sounds.map(sound => audioSystem.loadSound(sound.name, sound.url))
    );
  }, [initialized]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const newMuted = audioSystem.toggleMute();
    setMuted(newMuted);
    return newMuted;
  }, []);

  // Play sound effects
  const play = useCallback((soundName, options) => {
    if (!initialized) return;
    audioSystem.play(soundName, options);
  }, [initialized]);

  // Convenience functions
  const playWoosh = useCallback(() => play('woosh', { volume: 0.3, rate: 1.2 }), [play]);
  const playPop = useCallback(() => play('pop', { volume: 0.5 }), [play]);
  const playConfetti = useCallback(() => play('confetti', { volume: 0.4 }), [play]);
  const playReveal = useCallback(() => play('reveal', { volume: 0.6 }), [play]);

  return {
    initialized,
    muted,
    initAudio,
    toggleMute,
    play,
    playWoosh,
    playPop,
    playConfetti,
    playReveal,
  };
}
