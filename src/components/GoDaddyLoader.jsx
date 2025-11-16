'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const GoDaddyLoader = ({ onComplete }) => {
  const [stage, setStage] = useState('skeleton'); // skeleton, formation, assembly, reveal, complete
  const [particles, setParticles] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const repeatCount = prefersReducedMotion ? 0 : Infinity;

  useEffect(() => {
    // Simplified: No particle array to reduce memory and lag
    setParticles([]);

    // Stage progression timeline - SIMPLIFIED TO 8 SECONDS
    const timers = [
      setTimeout(() => setStage('formation'), 2000),  // 0.0s - 2.0s (skeleton)
      setTimeout(() => setStage('assembly'), 4500),   // 2.0s - 4.5s (formation)
      setTimeout(() => setStage('reveal'), 6500),     // 4.5s - 6.5s (assembly)
      setTimeout(() => {
        setStage('complete');
        if (onComplete) onComplete();
      }, 8000),  // 6.5s - 8.0s (reveal) - TOTAL 8 SECONDS
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #00ADB5 0%, #0c7f86 100%)',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'complete' ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/GoDaddy-Logo-1763144109927.webp?width=8000&height=8000&resize=contain"
          alt="GoDaddy logo"
          className="w-80 h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #0f0f1e 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Premium cinematic grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Enhanced animated background gradient with richer colors */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 224, 202, 0.12) 0%, rgba(0, 173, 181, 0.08) 40%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: repeatCount,
              ease: [0.45, 0.05, 0.55, 0.95],
            }}
          />

          {/* Secondary gradient layer for depth */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(0, 224, 202, 0.06) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: repeatCount,
              ease: 'easeInOut',
            }}
          />

          {/* Enhanced volumetric fog effect with smoother gradients */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 224, 202, 0.04) 40%, rgba(0, 173, 181, 0.06) 60%, transparent 100%)',
              filter: 'blur(100px)',
            }}
            animate={{
              y: ['-25%', '25%', '-25%'],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: repeatCount,
              ease: [0.45, 0.05, 0.55, 0.95],
            }}
          />

          {/* Premium floating particles background */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`bg-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  background: 'radial-gradient(circle, rgba(0, 224, 202, 0.8) 0%, rgba(0, 224, 202, 0.2) 100%)',
                  boxShadow: '0 0 12px rgba(0, 224, 202, 0.6)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30 - Math.random() * 40, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: repeatCount,
                  delay: Math.random() * 5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Stage 1: App-skeleton (0.0s - 3.0s) */}
          {stage === 'skeleton' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Premium glass card with loading animation and GoDaddy branding */}
              <div className="relative">
                <motion.div
                  className="w-[420px] h-[220px] rounded-[32px] flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                    backdropFilter: 'blur(30px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Loading spinner with aqua glow */}
                  <motion.div
                    className="relative w-20 h-20 mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '3px solid transparent',
                        borderTopColor: 'rgba(0, 224, 202, 0.8)',
                        borderRightColor: 'rgba(0, 224, 202, 0.4)',
                        boxShadow: '0 0 30px rgba(0, 224, 202, 0.6), inset 0 0 15px rgba(0, 224, 202, 0.2)',
                      }}
                    />
                  </motion.div>
                  
                  {/* GoDaddy Text */}
                  <motion.p
                    className="text-2xl font-bold text-white tracking-wide"
                    style={{
                      textShadow: '0 0 20px rgba(0, 224, 202, 0.5), 0 0 10px rgba(0, 224, 202, 0.3)',
                    }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    GoDaddy
                  </motion.p>
                </motion.div>
                
                {/* Premium progress bar below card */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 h-1.5 rounded-full overflow-hidden"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(90deg, #00E0CA 0%, #00ADB5 50%, #0dd9e2 100%)',
                      boxShadow: '0 0 24px rgba(0, 224, 202, 0.6), 0 0 12px rgba(0, 224, 202, 0.4)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.0, ease: [0.45, 0.05, 0.55, 0.95] }}
                  >
                    {/* Shimmer effect on progress bar */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Stage 2: Formation (2.0s - 4.5s) - Simpler, no particles to reduce lag */}
          {/* Stage 2: Formation (2.0s - 4.5s) - No card, just background */}
          {stage === 'formation' && null}

          {/* Stage 3: Assembly (4.5s - 6.5s) - Simpler without 60 snapping particles */}
          {stage === 'assembly' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {/* Simpler outline without snapping particles */}
                <motion.div
                  className="relative w-[340px] h-[170px] flex items-center justify-center rounded-[64px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 224, 202, 0.15), rgba(0, 173, 181, 0.08))',
                    border: '3px solid rgba(0, 224, 202, 0.7)',
                    boxShadow: '0 0 50px rgba(0, 224, 202, 0.7), 0 0 30px rgba(0, 224, 202, 0.5)',
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Stage 4: Reveal (6.5s - 8.0s) - Final logo without 40 confetti particles */}
          {stage === 'reveal' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Enhanced center glow */}
              <motion.div
                className="absolute"
                style={{
                  width: 500,
                  height: 500,
                  background: 'radial-gradient(circle, rgba(0, 224, 202, 0.5) 0%, rgba(0, 224, 202, 0.3) 30%, transparent 70%)',
                  filter: 'blur(100px)',
                }}
                animate={{
                  scale: [1, 1.6, 1.3],
                  opacity: [0, 1, 0.9],
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
              />

              {/* Soft neon aqua halo around logo */}
              <motion.div
                className="absolute"
                style={{
                  width: 420,
                  height: 420,
                  background: 'radial-gradient(circle, transparent 30%, rgba(0, 224, 202, 0.25) 50%, rgba(0, 224, 202, 0.1) 70%, transparent 85%)',
                  filter: 'blur(60px)',
                }}
                animate={{
                  scale: [1, 1.1, 1.05],
                  rotate: [0, 360],
                  opacity: [0.6, 1, 0.9],
                }}
                transition={{
                  scale: { duration: 2.0, ease: 'easeInOut' },
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 1.5, ease: 'easeOut' },
                }}
              />

              {/* Premium light sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), rgba(0, 224, 202, 0.3), transparent)',
                  transform: 'skewX(-18deg)',
                  filter: 'blur(1px)',
                }}
                initial={{ x: '-250%' }}
                animate={{ x: '250%', opacity: [0, 1, 0.8, 0] }}
                transition={{
                  duration: 1.5,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
              />

              {/* Final GoDaddy Logo */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 25, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.img
                  src="./logogd.png?width=8000&height=8000&resize=contain"
                  alt="GoDaddy logo"
                  className="w-96 h-auto"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(0, 224, 202, 0.7)) drop-shadow(0 0 20px rgba(0, 224, 202, 0.5)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4))',
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 40px rgba(0, 224, 202, 0.7)) drop-shadow(0 0 20px rgba(0, 224, 202, 0.5)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4))',
                      'drop-shadow(0 0 60px rgba(0, 224, 202, 0.9)) drop-shadow(0 0 30px rgba(0, 224, 202, 0.6)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4))',
                      'drop-shadow(0 0 40px rgba(0, 224, 202, 0.7)) drop-shadow(0 0 20px rgba(0, 224, 202, 0.5)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.4))',
                    ],
                  }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Premium text */}
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p 
                    className="text-3xl font-bold text-white tracking-wide"
                    style={{
                      textShadow: '0 0 30px rgba(0, 224, 202, 0.6), 0 0 15px rgba(0, 224, 202, 0.4), 0 2px 8px rgba(0, 0, 0, 0.5)',
                      fontSmooth: 'always',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      letterSpacing: '0.05em',
                    }}
                  >
                    GoDaddy
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced rim light effect with richer colors */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(0, 224, 202, 0.18) 0%, transparent 60%), ' +
                'radial-gradient(circle at 50% 100%, rgba(0, 173, 181, 0.12) 0%, transparent 60%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoDaddyLoader;