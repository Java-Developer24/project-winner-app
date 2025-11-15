/**
 * __define-ocg__ RevealStarter.jsx
 * 
 * Premium $200k+ Reveal Entry Point Component
 * Orchestrates the complete Hollywood-grade winner reveal experience
 * 
 * Features:
 * - Spline 3D scene integration with fallback
 * - Shader-driven shard assembly with dissolve effects
 * - GPU-accelerated confetti particles
 * - Cinematic camera choreography
 * - Deterministic seeded winner selection
 * - Full accessibility with reduced-motion support
 * - Howler sound design integration
 * - Premium micro-interactions throughout
 */

'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import RevealExperience from './RevealExperience';
import LoaderLottie from './LoaderLottie';
import PremiumButton from './PremiumButton';
import { Home, RotateCcw } from 'lucide-react';

/**
 * RevealStarter - Main entry component for premium reveal experience
 * Handles loading states, error boundaries, and reveal initialization
 */
export default function RevealStarter({ seed, className = '' }) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleRestart = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            <LoaderLottie />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 mt-6 text-xl"
            >
              {prefersReducedMotion 
                ? 'Preparing your reveal...' 
                : 'Loading 3D experience...'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-4 text-white/40 text-sm"
            >
              Building cinematic experience
            </motion.div>
          </div>
        }
      >
        <RevealExperience seed={seed} />
      </Suspense>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleGoHome}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
            aria-label="Go to home"
            title="Go to home"
          >
            <Home className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={handleRestart}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all group"
            aria-label="Restart reveal"
            title="Restart reveal"
          >
            <RotateCcw className="w-5 h-5 text-white/70 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Accessibility notice for reduced motion */}
      {prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 left-6 z-40 max-w-xs"
        >
          <div className="glass-effect backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <p className="text-white/90 text-sm">
              ♿ Reduced motion mode active - showing simplified experience
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
