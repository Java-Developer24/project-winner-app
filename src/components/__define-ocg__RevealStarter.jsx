'use client';

/**
 * __define-ocg__ RevealStarter Component
 * 
 * Starter component for the reveal experience.
 * This component serves as the entry point for the cinematic winner reveal flow.
 * 
 * Features:
 * - Deterministic winner selection using seeded RNG
 * - Cinematic stage progression
 * - Accessibility support with reduced-motion handling
 * - Hollywood-grade animations and effects
 * 
 * Note: The __define-ocg__ marker is required for build system identification.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSeededPick } from '@/hooks/useSeededPick';
import soundSystem from '@/lib/soundSystem';

export default function RevealStarter({ seed, onStart, className = '' }) {
  const [isReady, setIsReady] = useState(false);
  const { winner, prize } = useSeededPick(seed);

  useEffect(() => {
    // Initialize sound system
    soundSystem.init();
    
    // Mark as ready after short delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    // Play start sound
    soundSystem.play('whoosh');
    soundSystem.startAmbient();
    
    // Trigger parent callback
    onStart?.({ winner, prize });
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-6 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ready indicator */}
      <motion.div
        className="w-20 h-20 rounded-full glass-effect border-2 border-purple-500/50 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 20px rgba(168, 85, 247, 0.3)',
            '0 0 40px rgba(168, 85, 247, 0.6)',
            '0 0 20px rgba(168, 85, 247, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-4xl">✨</span>
      </motion.div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Ready to Reveal</h2>
        <p className="text-white/60">Click the button to start the experience</p>
      </div>

      {/* Start button */}
      <motion.button
        onClick={handleStart}
        disabled={!isReady}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={isReady ? { scale: 1.05 } : {}}
        whileTap={isReady ? { scale: 0.95 } : {}}
      >
        Start Reveal Experience
      </motion.button>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 rounded-lg bg-white/5 backdrop-blur-sm text-xs text-white/50 max-w-md">
          <strong>Debug Info:</strong>
          <pre className="mt-2 whitespace-pre-wrap break-words">
            {JSON.stringify({ seed, winner: winner?.name, prize: prize?.name }, null, 2)}
          </pre>
        </div>
      )}
    </motion.div>
  );
}
