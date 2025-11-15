'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { X, Trophy, Award, Sparkles, Home, RefreshCw, Crown, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * 🎮 ULTRA-PREMIUM FUTURISTIC WINNER MODAL - REDESIGNED
 * Cyberpunk 2077 + Apple Glass + AAA Victory Screen
 * 
 * Features:
 * - Next-gen multi-layer glassmorphism with extreme depth
 * - Neon cyan/purple/pink energy glow system
 * - Holographic overlays with iridescent shimmer
 * - Digital particles floating in 3D space
 * - Sci-fi grid with perspective depth
 * - Nebula background with volumetric fog
 * - Hologram trophy with spark particles
 * - Celebration confetti burst
 * - Rotating neon ring avatar with reflection
 * - Glowing crown with pulse animation
 * - Radial light streaks
 * - 3D prize on floating holographic pedestal
 * - Rotating neon halo discs
 * - Spotlight beam effects
 * - LEGENDARY PRIZE badge in gold neon
 * - Animated gradient buttons with scanning borders
 * - Cosmic gradient background with parallax
 */
export default function WinnerModal({ winner, prize, isOpen, onClose, showNextButton = false, onNextWinner }) {
  const modalRef = useFocusTrap(isOpen);
  const [particles, setParticles] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  // Memoized particle arrays (generated when modal opens)
  const confettiParticles = useMemo(() => {
    if (!isOpen) return [];
    const count = prefersReducedMotion ? 12 : 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#00ffff', '#ff00ff', '#ff1493', '#ffd700', '#00ff88', '#ff6b35'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.3,
      duration: 2.2 + Math.random() * 1.5,
      size: Math.random() * 10 + 5,
    }));
  }, [isOpen, prefersReducedMotion]);

  const sparkParticles = useMemo(() => {
    if (!isOpen) return [];
    const count = prefersReducedMotion ? 8 : 16;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      delay: Math.random() * 1.5,
      duration: 3.5 + Math.random() * 2,
      size: Math.random() * 2 + 1,
      color: ['#ffd700', '#ffaa00', '#ff6b35'][Math.floor(Math.random() * 3)],
    }));
  }, [isOpen, prefersReducedMotion]);

  const digitalParticles = useMemo(() => {
    if (!isOpen) return [];
    const count = prefersReducedMotion ? 12 : 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      color: ['#00ffff', '#ff00ff', '#8b00ff'][Math.floor(Math.random() * 3)],
    }));
  }, [isOpen, prefersReducedMotion]);

  const repeatCount = prefersReducedMotion ? 0 : Infinity;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Optimized particle generation - REDUCED by 60%
  // We use memoized arrays above; avoid repeated state updates

  const handleMouseMove = (e) => {
    const rect = modalRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!winner || !prize) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ═══════════════════════════════════════════════════════════
              COSMIC BACKGROUND - Deep Purple/Blue/Pink with Parallax
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, #2d1b4e 0%, #0f0520 50%, #000000 100%)',
            }}
            aria-hidden="true"
          >
            {/* Nebula haze - volumetric fog layers */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(circle at 25% 30%, rgba(139, 0, 255, 0.5), transparent 60%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: repeatCount,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                background: 'radial-gradient(circle at 75% 70%, rgba(0, 212, 255, 0.4), transparent 60%)',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: repeatCount,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-35"
              style={{
                background: 'radial-gradient(circle at 50% 90%, rgba(255, 0, 255, 0.4), transparent 60%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 14,
                repeat: repeatCount,
                ease: 'easeInOut',
              }}
            />

            {/* Sci-fi grid with perspective depth */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.4) 1.5px, transparent 1.5px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1.5px, transparent 1.5px)
                `,
                backgroundSize: '60px 60px',
                perspective: '1200px',
                transform: 'rotateX(65deg) scale(2.5)',
                transformOrigin: 'center center',
              }}
            />

            {/* Vertical light beams */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute top-0 bottom-0 w-1 opacity-20"
                style={{
                  left: `${15 + i * 15}%`,
                  background: 'linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.8), transparent)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleY: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: repeatCount,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Digital floating particles - OPTIMIZED (24 instead of 60) */}
            {digitalParticles.map((particle) => (
              <motion.div
                key={`digital-${particle.id}`}
                className="absolute rounded-full will-change-transform"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 6}px ${particle.color}`,
                }}
                animate={{
                  y: [0, -60, 0],
                  x: [0, (Math.random() - 0.5) * 25, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: repeatCount,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              CONFETTI BURST BEHIND TITLE - OPTIMIZED (50 particles)
              ═══════════════════════════════════════════════════════════ */}
          {confettiParticles.map(particle => (
            <motion.div
              key={`confetti-${particle.id}`}
              className="fixed pointer-events-none z-[60] will-change-transform"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '3px',
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{
                y: 0,
                x: 0,
                rotate: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (Math.random() - 0.5) * 300],
                rotate: [0, particle.rotation * 4],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.2, 0.9, 0.3],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Spark particles drifting downward - OPTIMIZED (16 instead of 40) */}
          {sparkParticles.map(spark => (
            <motion.div
              key={`spark-${spark.id}`}
              className="fixed pointer-events-none z-[60] rounded-full will-change-transform"
              style={{
                left: `${spark.x}%`,
                top: `${spark.y}%`,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                backgroundColor: spark.color,
                boxShadow: `0 0 ${spark.size * 6}px ${spark.color}`,
              }}
              initial={{
                y: 0,
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '100vh'],
                opacity: [0, 0.9, 0.6, 0],
                scale: [0, 1, 1, 0.5],
              }}
              transition={{
                duration: spark.duration,
                delay: spark.delay,
                ease: 'linear',
              }}
            />
          ))}

          {/* ═══════════════════════════════════════════════════════════
              HOLOGRAPHIC TROPHY FLOATING ABOVE MODAL
              ═══════════════════════════════════════════════════════════ */}
          <div className="fixed inset-0 z-[65] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0, y: -200, rotate: -270 }}
              animate={{ opacity: 1, scale: 1, y: -180, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', damping: 20, stiffness: 150 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-8, 8, -8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Trophy icon with optimized glow */}
                <Trophy 
                  className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-yellow-300 relative z-10 will-change-transform" 
                  style={{ 
                    filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 50px rgba(255, 165, 0, 0.6))' 
                  }} 
                />
                
                {/* Consolidated outer-glow halo - REDUCED from 3 layers to 1 */}
                <motion.div
                  animate={{
                    scale: [1, 1.7, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{ duration: 2.5, repeat: repeatCount }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/60 via-orange-500/40 to-transparent rounded-full blur-[60px] will-change-transform"
                />

                {/* Spark particles bursting outward - REDUCED from 12 to 6 */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`trophy-spark-${i}`}
                    className="absolute will-change-transform"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos((i * 60 * Math.PI) / 180) * 60],
                      y: [0, Math.sin((i * 60 * Math.PI) / 180) * 60],
                      opacity: [0, 0.9, 0.4, 0],
                      scale: [0, 1.3, 0.9, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: repeatCount,
                      delay: i * 0.1,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-200" style={{ filter: 'drop-shadow(0 0 6px #fef08a)' }} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              MODAL CONTAINER - NEXT-GEN GLASSMORPHISM
              ═══════════════════════════════════════════════════════════ */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.7, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 100 }}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.15 }}
              className="relative max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl w-full pointer-events-auto"
            >
              {/* MAIN CARD - Multi-layer glass with extreme depth */}
              <div className="relative rounded-[2.5rem] overflow-visible">
                {/* Base glass layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-slate-950/70 to-cyan-950/50" 
                  style={{ backdropFilter: 'blur(50px) saturate(200%)' }} 
                />
                
                {/* Inner neon outline - glowing gradient border */}
                <motion.div
                  className="absolute inset-[2px] rounded-[2.4rem] pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.5), rgba(255, 0, 255, 0.5), rgba(255, 20, 147, 0.5))',
                    padding: '2px',
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: repeatCount,
                  }}
                >
                  <div className="h-full w-full rounded-[2.4rem] bg-slate-950/90" style={{ backdropFilter: 'blur(60px)' }} />
                </motion.div>

                {/* Holographic overlay - iridescent shimmer */}
                <div className="absolute inset-0 rounded-[2.5rem] opacity-50 mix-blend-overlay pointer-events-none overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.6) 50%, rgba(255, 0, 255, 0.6) 70%, transparent 90%)',
                      backgroundSize: '300% 300%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Reflection streaks */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-40 rounded-t-[2.5rem] opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: repeatCount,
                  }}
                />

                {/* Extreme neon energy glow */}
                <div 
                  className="absolute inset-0 rounded-[2.5rem]" 
                  style={{ 
                    boxShadow: '0 0 120px rgba(0, 255, 255, 0.7), 0 0 180px rgba(255, 0, 255, 0.6), 0 0 240px rgba(255, 20, 147, 0.5), inset 0 0 100px rgba(139, 0, 255, 0.2)' 
                  }} 
                />

                {/* High-depth soft shadow */}
                <div className="absolute inset-0 rounded-[2.5rem]" style={{ boxShadow: 'inset 0 3px 6px rgba(255, 255, 255, 0.15), inset 0 -3px 6px rgba(0, 0, 0, 0.6), 0 30px 80px rgba(0, 0, 0, 0.6)' }} />

                {/* Corner energy glows - enhanced */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/50 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/50 rounded-full blur-[140px] translate-x-1/2 translate-y-1/2" />
                <div className="absolute top-1/3 right-0 w-64 h-64 bg-purple-500/40 rounded-full blur-[120px] translate-x-1/2" />
                <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-cyan-400/40 rounded-full blur-[120px] -translate-x-1/2" />

                  {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 transition-all backdrop-blur-sm group border-2 border-cyan-400/40 hover:border-cyan-400"
                  aria-label="Close modal"
                  style={{ boxShadow: '0 0 25px rgba(0, 255, 255, 0.4)' }}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-300 group-hover:rotate-90 group-hover:scale-125 transition-transform duration-300" />
                </button>                {/* CONTENT */}
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
                  {/* ═══════════════════════════════════════════════════════════
                      CONGRATULATIONS HEADER - Vibrant Gradient with Halo
                      ═══════════════════════════════════════════════════════════ */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 relative"
                  >
                    {/* Neon outer-glow halo behind text */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 rounded-full blur-[80px]"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), rgba(255, 105, 180, 0.5), transparent)',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: repeatCount,
                      }}
                    />
                    
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center relative z-10 tracking-wide"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 35%, #FF1493 65%, #00FFFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 60px rgba(255, 215, 0, 0.9), 0 0 100px rgba(255, 105, 180, 0.7), 0 0 140px rgba(0, 255, 255, 0.5)',
                        letterSpacing: '0.08em',
                      }}
                      id="modal-title"
                    >
                      CONGRATULATIONS!
                    </h2>
                  </motion.div>

                  {/* ═══════════════════════════════════════════════════════════
                      WINNER AVATAR SECTION - Rotating Neon Ring
                      ═══════════════════════════════════════════════════════════ */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative rounded-3xl p-8 mb-6 overflow-visible"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                      backdropFilter: 'blur(40px)',
                      border: '2px solid rgba(0, 255, 255, 0.4)',
                      boxShadow: '0 10px 40px rgba(0, 255, 255, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {/* Elevated glass panel shadow */}
                    <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }} />

                    <div className="relative flex flex-col items-center">
                      {/* AVATAR with rotating neon ring + holographic reflection */}
                      <div className="relative mb-5">
                        <div className="relative" style={{ transform: 'translateZ(50px)' }}>
                          {/* Avatar image */}
                          <img
                            src={winner.avatar}
                            alt={`${winner.name}'s avatar`}
                            className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full border-4 border-cyan-400/70 relative z-10 object-cover"
                            style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.7), 0 20px 40px rgba(0, 0, 0, 0.6)' }}
                          />
                          
                          {/* Glowing crown with pulse animation */}
                          <motion.div
                            initial={{ scale: 0, y: 30, rotate: -60 }}
                            animate={{ scale: 1, y: 0, rotate: 0 }}
                            transition={{ delay: 0.9, type: 'spring', damping: 12 }}
                            className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 rounded-full p-2.5"
                            style={{
                              boxShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 50px rgba(255, 140, 0, 0.7)',
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: repeatCount,
                              }}
                            >
                              <Crown className="w-6 h-6 text-white" />
                            </motion.div>
                          </motion.div>
                          
                          {/* Rotating neon ring - quad layer */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              border: '4px solid transparent',
                              borderTopColor: '#00ffff',
                              borderRightColor: '#ff00ff',
                              boxShadow: '0 0 35px rgba(0, 255, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.7)',
                            }}
                            animate={{
                              rotate: 360,
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              rotate: { duration: 5, repeat: repeatCount, ease: 'linear' },
                              scale: { duration: 2.5, repeat: repeatCount },
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              border: '3px solid transparent',
                              borderBottomColor: '#ff1493',
                              borderLeftColor: '#00d4ff',
                              boxShadow: '0 0 30px rgba(255, 20, 147, 0.8)',
                            }}
                            animate={{
                              rotate: -360,
                              scale: [1.08, 1, 1.08],
                            }}
                            transition={{
                              rotate: { duration: 6, repeat: repeatCount, ease: 'linear' },
                              scale: { duration: 3, repeat: repeatCount },
                            }}
                          />

                          {/* Radial light streaks */}
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={`radial-${i}`}
                              className="absolute top-1/2 left-1/2 w-1 h-20 origin-bottom"
                              style={{
                                background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.8), transparent)',
                                transform: `rotate(${i * 45}deg)`,
                                boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)',
                              }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                scaleY: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: repeatCount,
                                delay: i * 0.15,
                              }}
                            />
                          ))}

                          {/* Holographic reflection below avatar */}
                          <motion.div
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-36 h-8 rounded-full opacity-60"
                            style={{
                              background: 'radial-gradient(ellipse, rgba(0, 255, 255, 0.6), transparent)',
                              filter: 'blur(15px)',
                            }}
                            animate={{
                              scaleX: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: repeatCount,
                            }}
                          />
                        </div>
                      </div>

                      {/* Winner name */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 text-center" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5)' }}>{winner.name}</h3>
                      
                      {/* Grand Prize Winner badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: 'spring', damping: 18 }}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full mb-8 relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFD700 0%, #8B00FF 50%, #FF00FF 100%)',
                          boxShadow: '0 0 40px rgba(255, 215, 0, 0.7), 0 0 60px rgba(139, 0, 255, 0.6), 0 10px 35px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                          }}
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: repeatCount,
                            ease: 'easeInOut',
                            repeatDelay: 1,
                          }}
                        />
                        <Award className="w-5 h-5 text-white relative z-10" />
                        <span className="text-white font-black text-sm uppercase tracking-widest relative z-10">Grand Prize Winner</span>
                      </motion.div>

                      {/* ═══════════════════════════════════════════════════════════
                          PRIZE SECTION - Holographic Pedestal with Rotating Halos
                          ═══════════════════════════════════════════════════════════ */}
                      <div className="relative w-full">
                        <motion.div
                          className="relative mx-auto"
                          style={{
                            width: 'min(160px, 80vw)',
                            height: 'min(160px, 80vw)',
                          }}
                          animate={{
                            y: [0, -12, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: repeatCount,
                            ease: 'easeInOut',
                          }}
                        >
                          {/* Floating holographic pedestal */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full bg-gradient-to-r from-cyan-500/50 via-purple-400/60 to-pink-500/50 blur-lg" />
                          <motion.div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-3 rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
                              backgroundSize: '200% 100%',
                              boxShadow: '0 0 35px rgba(0, 255, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.7)',
                            }}
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                              duration: 3.5,
                              repeat: repeatCount,
                              ease: 'linear',
                            }}
                          />

                          {/* Spotlight beam beneath prize */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 opacity-40 pointer-events-none"
                            style={{
                              background: 'linear-gradient(180deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.6) 100%)',
                              clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: repeatCount,
                            }}
                          />

                          {/* Rotating neon halo discs - OPTIMIZED (2 layers instead of 3) */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full will-change-transform"
                            style={{
                              border: '3px solid transparent',
                              borderTopColor: '#00ffff',
                              borderRightColor: '#ff00ff',
                              boxShadow: '0 0 40px rgba(0, 255, 255, 0.7), 0 0 60px rgba(255, 0, 255, 0.5)',
                            }}
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 12,
                              repeat: repeatCount,
                              ease: 'linear',
                            }}
                          />
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full will-change-transform"
                            style={{
                              border: '2px solid transparent',
                              borderTopColor: '#8b00ff',
                              borderBottomColor: '#00ffaa',
                              boxShadow: '0 0 35px rgba(139, 0, 255, 0.5)',
                            }}
                            animate={{
                              rotate: -360,
                            }}
                            transition={{
                              duration: 18,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />

                          {/* Holographic light rings + energy trails - REDUCED from 3 to 2 */}
                          {Array.from({ length: 2 }).map((_, i) => (
                            <motion.div
                              key={`holo-ring-${i}`}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
                              style={{
                                width: `${60 + i * 25}%`,
                                height: `${60 + i * 25}%`,
                                border: '2px solid rgba(0, 255, 255, 0.25)',
                                boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                              }}
                              animate={{
                                opacity: [0.4, 0.15, 0.4],
                                rotate: i % 2 === 0 ? 360 : -360,
                              }}
                              transition={{
                                opacity: { duration: 3 + i, repeat: repeatCount },
                                rotate: { duration: 16 + i * 4, repeat: repeatCount, ease: 'linear' },
                              }}
                            />
                          ))}

                          {/* Volumetric glow rising behind prize - OPTIMIZED */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] will-change-transform"
                            style={{
                              background: 'radial-gradient(circle, rgba(139, 0, 255, 0.5), transparent)',
                            }}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 4,
                              repeat: repeatCount,
                            }}
                          />

                          {/* 3D Prize emoji on floating pedestal */}
                          <motion.div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center will-change-transform"
  animate={{
    rotate: [0, 12, -12, 0],
    scale: [1, 1.06, 1],
  }}
  transition={{
    duration: 6,
    repeat: repeatCount,
  }}
  style={{
    filter: 'drop-shadow(0 0 35px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 70px rgba(255, 0, 255, 0.6))',
  }}
>
  {/\.(png|jpe?g|gif|svg|webp)$/i.test(prize.emoji) ? (
    <img
      src={prize.emoji}
      alt={prize.name}
      className="w-100 h-100 md:w-100 md:h-100 object-contain"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))',
        imageRendering: 'auto',
      }}
    />
  ) : (
    <span className="text-[8rem] md:text-[10rem] leading-none">{prize.emoji}</span>
  )}
                          </motion.div>



                        </motion.div>

                        {/* LEGENDARY PRIZE badge - gold neon */}
                        {/* <motion.div
                          initial={{ scale: 0, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ delay: 1.2, type: 'spring' }}
                          className="inline-block px-6 py-2.5 rounded-full mt-5 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 140, 0, 0.4))',
                            border: '3px solid #FFD700',
                            boxShadow: '0 0 45px rgba(255, 215, 0, 0.9), 0 0 70px rgba(255, 140, 0, 0.7), inset 0 0 30px rgba(255, 215, 0, 0.4)',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                            }}
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: repeatCount,
                              ease: 'linear',
                            }}
                          />
                          <span className="relative text-yellow-100 font-black text-sm uppercase tracking-[0.25em] flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            LEGENDARY PRIZE
                            <Zap className="w-5 h-5" />
                          </span>
                        </motion.div> */}

                        {/* Prize details */}
                        <h4 className="text-2xl md:text-3xl font-bold text-white mt-5 mb-3 text-center" style={{ textShadow: '0 0 30px rgba(255, 0, 255, 0.7)' }}>{prize.name}</h4>
                        <p className="text-white/80 mb-5 text-sm text-center max-w-lg mx-auto leading-relaxed">{prize.description}</p>

                        {/* Prize value with extreme pulsing glow */}
                        {/* <motion.div
                          className="inline-block px-8 py-3.5 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, #8b00ff, #ff00ff, #ff1493)',
                            backgroundSize: '200% 100%',
                          }}
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            boxShadow: [
                              '0 0 40px rgba(139, 0, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.7)',
                              '0 0 60px rgba(255, 0, 255, 1), 0 0 90px rgba(255, 20, 147, 0.9)',
                              '0 0 40px rgba(139, 0, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.7)',
                            ],
                          }}
                          transition={{
                            backgroundPosition: { duration: 5, repeat: repeatCount, ease: 'linear' },
                            boxShadow: { duration: 2.5, repeat: repeatCount },
                          }}
                        >
                          <span className="text-3xl md:text-4xl font-black text-white" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.6)' }}>{prize.value}</span>
                        </motion.div> */}
                      </div>
                    </div>
                  </motion.div>

                  {/* ═══════════════════════════════════════════════════════════
                      BUTTONS - Animated Gradient with Neon Border Scanning
                      ═══════════════════════════════════════════════════════════ */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="flex gap-4"
                  >
                    {showNextButton ? (
                      <>
                        {/* Reveal Next Winner Button */}
                        <motion.button
                          onClick={onNextWinner}
                          className="relative flex-1 px-7 py-3.5 rounded-xl overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, #8b00ff 0%, #ff00ff 50%, #00ffff 100%)',
                            boxShadow: '0 10px 35px rgba(139, 0, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
                          }}
                          whileHover={{ scale: 1.04, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {/* Scanning border animation */}
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              border: '2px solid rgba(0, 255, 255, 0)',
                              boxShadow: '0 0 0 2px rgba(0, 255, 255, 0)',
                            }}
                            animate={{
                              boxShadow: [
                                '0 0 0 2px rgba(0, 255, 255, 0)',
                                '0 0 20px 2px rgba(0, 255, 255, 1)',
                                '0 0 0 2px rgba(0, 255, 255, 0)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: repeatCount,
                            }}
                          />
                          
                          {/* Light streak */}
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
                              repeat: repeatCount,
                              repeatDelay: 1.5,
                              ease: 'easeInOut',
                            }}
                          />
                          
                          <div className="relative flex items-center justify-center gap-2.5 text-white font-bold text-base">
                            <Sparkles className="w-5 h-5" />
                            Reveal Next Winner
                            <ChevronRight className="w-5 h-5" />
                          </div>
                          
                          {/* Glow on hover */}
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 50px rgba(0, 255, 255, 1), inset 0 0 20px rgba(255, 255, 255, 0.15)' }} />
                        </motion.button>

                        {/* Back to Home */}
                        <Link href="/" className="flex-1">
                          <motion.button
                            className="relative w-full px-7 py-3.5 rounded-xl overflow-hidden group"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                              backdropFilter: 'blur(25px)',
                              border: '2px solid rgba(0, 255, 255, 0.6)',
                              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
                            }}
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Scanning border */}
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              animate={{
                                boxShadow: [
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                  '0 0 20px 2px rgba(0, 255, 255, 0.8)',
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: repeatCount,
                                delay: 0.5,
                              }}
                            />
                            
                            {/* Light streak */}
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)',
                              }}
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: repeatCount,
                                repeatDelay: 1.5,
                                ease: 'easeInOut',
                              }}
                            />
                            
                            <div className="relative flex items-center justify-center gap-2.5 text-white font-bold text-base">
                              <Home className="w-5 h-5" />
                              Back to Home
                            </div>
                            
                            {/* Neon hover */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.9), inset 0 0 30px rgba(0, 255, 255, 0.2)' }} />
                          </motion.button>
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* Back to Home - Primary */}
                        <Link href="/" className="flex-1">
                          <motion.button
                            className="relative w-full px-7 py-3.5 rounded-xl overflow-hidden group"
                            style={{
                              background: 'linear-gradient(135deg, #8b00ff 0%, #ff00ff 50%, #00ffff 100%)',
                              boxShadow: '0 10px 35px rgba(139, 0, 255, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
                            }}
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Scanning border */}
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              animate={{
                                boxShadow: [
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                  '0 0 20px 2px rgba(0, 255, 255, 1)',
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: repeatCount,
                              }}
                            />
                            
                            {/* Light streak */}
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
                                repeatDelay: 1.5,
                                ease: 'easeInOut',
                              }}
                            />
                            
                            <div className="relative flex items-center justify-center gap-2.5 text-white font-bold text-base">
                              <Home className="w-5 h-5" />
                              Back to Home
                            </div>
                            
                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 50px rgba(0, 255, 255, 1), inset 0 0 20px rgba(255, 255, 255, 0.15)' }} />
                          </motion.button>
                        </Link>

                        {/* Reveal Again */}
                        <Link href="/reveal" className="flex-1">
                          <motion.button
                            className="relative w-full px-7 py-3.5 rounded-xl overflow-hidden group"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                              backdropFilter: 'blur(25px)',
                              border: '2px solid rgba(0, 255, 255, 0.6)',
                              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.15)',
                            }}
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Scanning border */}
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              animate={{
                                boxShadow: [
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                  '0 0 20px 2px rgba(0, 255, 255, 0.8)',
                                  '0 0 0 2px rgba(0, 255, 255, 0)',
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5,
                              }}
                            />
                            
                            {/* Light streak */}
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)',
                              }}
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: 'easeInOut',
                              }}
                            />
                            
                            <div className="relative flex items-center justify-center gap-2.5 text-white font-bold text-base">
                              <RefreshCw className="w-5 h-5" />
                              Reveal Again
                            </div>
                            
                            {/* Neon hover */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.9), inset 0 0 30px rgba(0, 255, 255, 0.2)' }} />
                          </motion.button>
                        </Link>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}