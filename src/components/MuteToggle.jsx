'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

/**
 * Premium floating mute toggle button
 * Integrates with Howler sound system
 * Persists mute state to localStorage
 */
export default function MuteToggle({ className = '' }) {
  const { muted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
      title={muted ? 'Unmute audio' : 'Mute audio'}
    >
      {muted ? (
        <VolumeX className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
      )}
      
      {/* Sound wave animation when unmuted */}
      {!muted && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}