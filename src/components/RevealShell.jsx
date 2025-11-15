'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSound } from '@/hooks/useSound';
import WinnerModal from './WinnerModal';
import MuteToggle from './MuteToggle';
import LoaderLottie from './LoaderLottie';
import ParallaxBackground from './ParallaxBackground';
import Scene from './3d/Scene';
import { Sparkles, Zap, ChevronRight } from 'lucide-react';
import prizesData from '@/data/prizes.json';

/**
 * Premium $300k+ Cinematic Multi-Winner Reveal Experience
 * Movie-Like Reveal Flow:
 * STEP 1 — Loading: Neon rings form → camera zooms in
 * STEP 2 — Reveal #1 (Jupiter Scooty): 3D shards assembling, aurora lights, holographic wheel
 * STEP 3 — Winner #1 Modal → "Reveal Next Winner" button
 * STEP 4 — Transition effect with light trails
 * STEP 5 — Reveal #2 (Bike): Energy rings collapsing, holographic cube breaking, ripple explosion
 * STEP 6 — Winner #2 Modal → Final celebration
 */
export default function RevealShell({ seed, className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const { play, muted, toggleMute, initialized: soundInitialized } = useSound();
  
  // Multi-winner state
  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);
  const [stage, setStage] = useState('loading');
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cameraZoom, setCameraZoom] = useState(0);
  const [transitionEffect, setTransitionEffect] = useState(false);

  // Get current winner and prize
  const winner = prizesData.winners[currentWinnerIndex];
  const prize = prizesData.prizes[currentWinnerIndex];

  // Movie-like stage progression with cinematic timing
  useEffect(() => {
    if (stage === 'loading') {
      if (soundInitialized && !muted) {
        setTimeout(() => play('ambient'), 100);
      }

      // STEP 1: Neon rings form → camera zooms in
      const timer = setTimeout(() => {
        play('whoosh');
        setCameraZoom(1);
        
        setTimeout(() => {
          setStage('assembly');
          play('assemble');
          animateAssembly();
        }, 1800);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [stage, soundInitialized, muted, play]);

  // Cinematic assembly animation with spring easing
  const animateAssembly = useCallback(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.012;
      setAssemblyProgress(progress);
      
      if (progress >= 1) {
        clearInterval(interval);
        handleAssemblyComplete();
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Complete assembly and reveal prize
  const handleAssemblyComplete = useCallback(() => {
    play('pop');
    
    setTimeout(() => {
      setStage('reveal');
      play('reveal');
      setCameraZoom(2);
      
      // Show confetti and modal
      setTimeout(() => {
        setStage('celebrate');
        play('confetti');
        setShowConfetti(true);
        setCameraZoom(3);
        
        setTimeout(() => {
          setShowModal(true);
        }, 500);
      }, 3000);
    }, 500);
  }, [play]);

  // Handle "Reveal Next Winner" button click
  const handleRevealNextWinner = useCallback(() => {
    setShowModal(false);
    setShowConfetti(false);
    
    // Transition effect
    setTransitionEffect(true);
    play('whoosh');
    
    setTimeout(() => {
      // Move to next winner
      setCurrentWinnerIndex(prev => prev + 1);
      setAssemblyProgress(0);
      setCameraZoom(0);
      
      // Reset to assembly stage for next reveal
      setTimeout(() => {
        setTransitionEffect(false);
        setStage('assembly');
        play('assemble');
        animateAssembly();
      }, 1000);
    }, 1500);
  }, [play, animateAssembly]);

  const isLastWinner = currentWinnerIndex >= prizesData.winners.length - 1;

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      {/* Enhanced premium gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% -20%, #ff4fd9 0%, #6d2bff 45%, #0c022a 100%)',
        }}
      />

      {/* Vignette edges for cinematic depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />

      {/* Aurora fog textures drifting */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(255, 79, 217, 0.3), transparent 50%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 80% 70%, rgba(109, 43, 255, 0.4), transparent 50%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, -120, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Transition Effect (light trails, neon gradients, particle fades) */}
      <AnimatePresence>
        {transitionEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            {/* Neon gradient sweep */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #6d2bff, #ff4fd9, #00f2ff)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.5, 2] }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Light trail particles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`trail-${i}`}
                className="absolute w-2 h-20 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 79, 217, 0.8), transparent)',
                  left: `${(i / 40) * 100}%`,
                  top: '-20px',
                  filter: 'blur(2px)',
                }}
                animate={{
                  y: ['0vh', '120vh'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parallax Background */}
      <ParallaxBackground />
      
      <MuteToggle muted={muted} onToggle={toggleMute} />
      
      {/* Winner progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="glass-morph-premium backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Winner {currentWinnerIndex + 1} of {prizesData.winners.length}
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </p>
        </div>
      </motion.div>
      
      {/* Main Content with Cinematic Camera Zoom Effect */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen p-4"
        animate={{
          scale: cameraZoom === 0 ? 1 : cameraZoom === 1 ? 1.1 : cameraZoom === 2 ? 1.2 : 1.15,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AnimatePresence mode="wait">
          {/* STEP 1 - Loading Stage with Premium 3D Loader */}
          {stage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <LoaderLottie />
              
              <motion.div
                className="mt-8 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p 
                  className="text-white/90 text-xl font-semibold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Preparing Your Premium Reveal
                </motion.p>
                
                <motion.div className="flex items-center justify-center gap-2 text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-sm">$300k Production Quality Experience Loading...</p>
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 2 - Assembly Stage with Animation Type Based on Winner */}
          {stage === 'assembly' && (
            <motion.div
              key={`assembly-${currentWinnerIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center relative w-full max-w-4xl"
            >
              {/* Winner 1: 3D Shards Assembling with Holographic Wheel */}
              {currentWinnerIndex === 0 && (
                <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center">
                  {/* Holographic rotating wheel */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '4px solid transparent',
                      borderTopColor: 'rgba(255, 215, 0, 0.8)',
                      borderRightColor: 'rgba(255, 79, 217, 0.8)',
                      boxShadow: '0 0 80px rgba(255, 215, 0, 0.6), inset 0 0 60px rgba(255, 79, 217, 0.4)',
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 3, repeat: Infinity },
                    }}
                  />

                  {/* Assembling 3D holographic shards */}
                  {Array.from({ length: 16 }).map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const radius = 200;
                    const progress = Math.max(0, Math.min(1, (assemblyProgress - i * 0.03) * 1.5));
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-20 h-28 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(255, 79, 217, 0.8))',
                          boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                          border: '2px solid rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(10px)',
                        }}
                        initial={{
                          x: Math.cos(angle) * radius,
                          y: Math.sin(angle) * radius,
                          rotate: angle * (180 / Math.PI) + Math.random() * 180,
                          opacity: 0,
                          scale: 0.5,
                        }}
                        animate={{
                          x: (i % 4 - 1.5) * 40,
                          y: (Math.floor(i / 4) - 1.5) * 40,
                          rotate: 0,
                          opacity: progress,
                          scale: progress * 1,
                        }}
                        transition={{
                          duration: 1.5,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: i * 0.05,
                        }}
                      />
                    );
                  })}

                  {/* Center scooty icon reveal with volumetric glow */}
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: assemblyProgress > 0.7 ? 1 : 0,
                      rotate: 0,
                    }}
                    transition={{ type: 'spring', damping: 12, stiffness: 150 }}
                  >
                   <motion.div
  className="flex items-center justify-center"
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,255,0.6))' }}
>
  <img
    src="/scootyicon.png"
    srcSet="/scootyicon.png 1x, /scooty@2x.png 2x"
    alt="Scooty"
    className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] object-contain"
    style={{ imageRendering: 'auto' }}
  />
</motion.div>

                    
                    {/* Volumetric glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent 70%)',
                        filter: 'blur(60px)',
                      }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0.4, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>

                  {/* Swirling particles */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const angle = (i / 30) * Math.PI * 2;
                    const radius = 150 + Math.sin(i * 0.5) * 50;
                    
                    return (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, #FFD700, #FF4FD9)',
                          boxShadow: '0 0 15px #FFD700',
                        }}
                        animate={{
                          x: [
                            Math.cos(angle) * radius,
                            Math.cos(angle + Math.PI * 2) * radius,
                          ],
                          y: [
                            Math.sin(angle) * radius,
                            Math.sin(angle + Math.PI * 2) * radius,
                          ],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 0.1,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Winner 2: Energy Rings Collapsing + Holographic Cube Breaking */}
              {currentWinnerIndex === 1 && (
                <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center">
                  {/* Energy rings collapsing inward */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const maxRadius = 300 - i * 40;
                    const collapseProgress = Math.max(0, Math.min(1, (assemblyProgress - i * 0.1) * 2));
                    const currentRadius = maxRadius * (1 - collapseProgress);
                    
                    return (
                      <motion.div
                        key={`ring-${i}`}
                        className="absolute rounded-full"
                        style={{
                          width: currentRadius * 2,
                          height: currentRadius * 2,
                          border: `4px solid rgba(255, 79, 217, ${0.3 + i * 0.1})`,
                          boxShadow: `0 0 ${40 + i * 10}px rgba(255, 79, 217, 0.6), inset 0 0 ${30 + i * 5}px rgba(109, 43, 255, 0.4)`,
                        }}
                        animate={{
                          rotate: (i % 2 === 0 ? 360 : -360),
                          opacity: collapseProgress,
                        }}
                        transition={{
                          rotate: { duration: 4 - i * 0.3, repeat: Infinity, ease: 'linear' },
                        }}
                      />
                    );
                  })}

                  {/* Holographic cube breaking apart */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const explodeProgress = Math.max(0, Math.min(1, (assemblyProgress - 0.5) * 2));
                    
                    return (
                      <motion.div
                        key={`cube-${i}`}
                        className="absolute w-16 h-16 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 79, 217, 0.7), rgba(109, 43, 255, 0.7))',
                          boxShadow: '0 0 30px rgba(255, 79, 217, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                          border: '2px solid rgba(255, 255, 255, 0.5)',
                        }}
                        initial={{
                          x: Math.cos(angle) * 100,
                          y: Math.sin(angle) * 100,
                          rotate: Math.random() * 360,
                          opacity: 0,
                          scale: 0.3,
                        }}
                        animate={{
                          x: explodeProgress > 0.5 ? Math.cos(angle) * 20 : Math.cos(angle) * 100,
                          y: explodeProgress > 0.5 ? Math.sin(angle) * 20 : Math.sin(angle) * 100,
                          rotate: 0,
                          opacity: assemblyProgress > 0.3 ? 1 : 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 1.2,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: i * 0.08,
                        }}
                      />
                    );
                  })}

                  {/* Center bike icon with 3D ripple explosion */}
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ 
                      scale: assemblyProgress > 0.7 ? 1 : 0,
                      rotate: 0,
                    }}
                    transition={{ type: 'spring', damping: 10, stiffness: 120 }}
                  >
                    <motion.div
  className="flex items-center justify-center"
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,255,0.6))' }}
>
  <img
    src="/bikeicon.png"
    srcSet="/bikeicon.png 1x, /scooty@2x.png 2x"
    alt="Scooty"
    className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] object-contain"
    style={{ imageRendering: 'auto' }}
  />
</motion.div>

                    
                    {/* Neon rim lighting */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, transparent 30%, rgba(255, 79, 217, 0.8), transparent 70%)',
                        filter: 'blur(40px)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        rotate: 360,
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                      }}
                    />

                    {/* 3D Ripple explosion rings */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={`ripple-${i}`}
                        className="absolute inset-0 rounded-full border-4"
                        style={{
                          borderColor: 'rgba(255, 79, 217, 0.6)',
                          boxShadow: '0 0 30px rgba(255, 79, 217, 0.8)',
                        }}
                        animate={{
                          scale: [0.5, 3],
                          opacity: [0.8, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Glowing sparks */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={`spark-${i}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #00f2ff, #ff4fd9)',
                        boxShadow: '0 0 15px #00f2ff',
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                        opacity: [1, 0],
                        scale: [1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Progress indicator with premium styling */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 space-y-4"
              >
                <div className="inline-block glass-morph-premium backdrop-blur-xl rounded-2xl px-8 py-4 border-2 border-white/20">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-bold text-2xl">
                      {Math.floor(assemblyProgress * 100)}%
                    </span>
                    <span className="text-white/70 text-lg">Assembled</span>
                  </div>
                </div>
                
                {/* Circular progress bar */}
                <div className="relative w-80 h-3 bg-white/10 rounded-full overflow-hidden mx-auto backdrop-blur-sm border border-white/20">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #6d2bff, #ff4fd9, #FFD700)',
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${assemblyProgress * 100}%` }}
                  />
                  
                  {/* Shimmer effect */}
                  {/* <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                Revealing     }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  /> */}
                </div>

                {/* <p className="text-white/50 text-sm">
                  {currentWinnerIndex === 0 ? 'Jupiter Scooty' : 'Bike'}...
                </p> */}
              </motion.div>
            </motion.div>
          )}

          {/* STEP 3 - Reveal & Celebrate with 3D Scene */}
          {(stage === 'reveal' || stage === 'celebrate') && !prefersReducedMotion && (
            <motion.div
              key={`reveal-3d-${currentWinnerIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <Scene
                stage={stage}
                assemblyProgress={1}
                prize={prize}
                onAssemblyComplete={() => {}}
                showConfetti={showConfetti}
                winnerIndex={currentWinnerIndex}
              />
            </motion.div>
          )}

          {/* Fallback 2D reveal for reduced motion */}
          {(stage === 'reveal' || stage === 'celebrate') && prefersReducedMotion && (
            <motion.div
              key={`reveal-2d-${currentWinnerIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-3xl"
            >
              <motion.div
                className="relative inline-block mb-8"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 blur-3xl opacity-60"
                  style={{ background: prize?.color || '#FFD700' }}
                />
                
                {/* Prize emoji */}
                <div className="relative text-[12rem] drop-shadow-2xl">
                  {prize?.emoji}
                </div>
              </motion.div>

              {/* Prize details with premium typography */}
              <motion.h2
                className="text-6xl font-bold text-white mb-6 text-luxury-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {prize?.name}
              </motion.h2>

              <motion.p
                className="text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {prize?.description}
              </motion.p>

              <motion.div
                className="inline-block px-12 py-6 rounded-3xl text-4xl font-bold backdrop-blur-xl border-4"
                style={{
                  background: `linear-gradient(135deg, ${prize?.color}60, ${prize?.color}30)`,
                  borderColor: prize?.color,
                  color: prize?.color,
                  boxShadow: `0 0 60px ${prize?.color}80, inset 0 0 40px ${prize?.color}40`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {prize?.value}
              </motion.div>

              {stage === 'celebrate' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 flex items-center justify-center gap-6"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }} />
                  <p className="text-3xl text-white font-bold">🎉 Winner Revealed! 🎉</p>
                  <Sparkles className="w-8 h-8 text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Winner Modal with VVIP Polish */}
      <WinnerModal
        winner={winner}
        prize={prize}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        showNextButton={!isLastWinner}
        onNextWinner={handleRevealNextWinner}
      />
    </div>
  );
}