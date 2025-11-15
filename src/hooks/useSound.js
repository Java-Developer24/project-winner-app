import { useState, useEffect } from 'react';
import soundSystem from '@/lib/soundSystem';

/**
 * Hook for sound system integration
 * Provides easy access to sound playback and mute control
 */
export function useSound() {
  const [muted, setMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize sound system
    soundSystem.init();
    setMuted(soundSystem.isMuted());
    setInitialized(true);
  }, []);

  const play = (soundName, options) => {
    soundSystem.play(soundName, options);
  };

  const stop = (soundName) => {
    soundSystem.stop(soundName);
  };

  const toggleMute = () => {
    const newMuted = soundSystem.toggleMute();
    setMuted(newMuted);
    return newMuted;
  };

  const setMute = (value) => {
    soundSystem.setMute(value);
    setMuted(value);
  };

  return {
    play,
    stop,
    toggleMute,
    setMute,
    muted,
    initialized,
    soundSystem,
  };
}
