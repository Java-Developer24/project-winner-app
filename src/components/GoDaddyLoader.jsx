'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const GoDaddyLoader = ({ onComplete }) => {
  const [stage, setStage] = useState('skeleton'); // skeleton, formation, assembly, reveal, complete
  const [particles, setParticles] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Generate particles for animation - PREMIUM QUALITY
    const particleCount = 400;
    const generatedParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 3.0,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      orbitRadius: Math.random() * 120 + 60,
      orbitSpeed: Math.random() * 2 + 1,
      type: i % 3 === 0 ? 'fast' : i % 3 === 1 ? 'medium' : 'slow',
    }));
    setParticles(generatedParticles);

    // Stage progression timeline - EXTENDED TO 15 SECONDS
    const timers = [
      setTimeout(() => setStage('formation'), 3000),  // 0.0s - 3.0s (skeleton)
      setTimeout(() => setStage('assembly'), 8000),   // 3.0s - 8.0s (formation)
      setTimeout(() => setStage('reveal'), 11500),    // 8.0s - 11.5s (assembly)
      setTimeout(() => {
        setStage('complete');
        if (onComplete) onComplete();
      }, 15000),  // 11.5s - 15.0s (reveal) - TOTAL 15 SECONDS
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
              repeat: Infinity,
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
              repeat: Infinity,
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
              repeat: Infinity,
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
                  repeat: Infinity,
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
              {/* Premium glass card silhouettes */}
              <div className="relative">
                <motion.div
                  className="w-[420px] h-[220px] rounded-[32px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                    backdropFilter: 'blur(30px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
                
                {/* Premium progress bar */}
                <motion.div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 h-1.5 rounded-full overflow-hidden"
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

          {/* Stage 2: Formation (3.0s - 8.0s) - Particles flow in and orbit */}
          {stage === 'formation' && (
            <div className="absolute inset-0">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    background:
                      particle.type === 'fast'
                        ? 'radial-gradient(circle, #00E0CA 0%, #00ADB5 100%)'
                        : particle.type === 'medium'
                        ? 'radial-gradient(circle, #0dd9e2 0%, #00ADB5 100%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 100%)',
                    boxShadow:
                      particle.type === 'fast'
                        ? '0 0 14px rgba(0, 224, 202, 0.9), 0 0 6px rgba(0, 224, 202, 0.6)'
                        : particle.type === 'medium'
                        ? '0 0 12px rgba(13, 217, 226, 0.8), 0 0 5px rgba(13, 217, 226, 0.5)'
                        : '0 0 10px rgba(255, 255, 255, 0.6)',
                    filter: 'blur(0.5px)',
                  }}
                  initial={{
                    x: particle.initialX,
                    y: particle.initialY,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [
                      particle.initialX,
                      window.innerWidth / 2 + Math.cos(particle.id) * particle.orbitRadius,
                      window.innerWidth / 2 + Math.cos(particle.id + Math.PI) * particle.orbitRadius,
                    ],
                    y: [
                      particle.initialY,
                      window.innerHeight / 2 + Math.sin(particle.id) * particle.orbitRadius,
                      window.innerHeight / 2 + Math.sin(particle.id + Math.PI) * particle.orbitRadius,
                    ],
                    opacity: [0, 1, 0.9],
                    scale: [0, 1.1, 1],
                  }}
                  transition={{
                    duration: 4.5,
                    delay: particle.delay,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              ))}
            </div>
          )}

          {/* Stage 3: Assembly (8.0s - 11.5s) - Particles snap into logo outline */}
          {stage === 'assembly' && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Premium logo outline formation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 2.5,
                  ease: [0.34, 1.56, 0.64, 1], // Premium spring settle
                }}
              >
                {/* Enhanced 3D extruded outline with neon aqua */}
                <motion.div
                  className="absolute inset-0 rounded-[64px]"
                  style={{
                    border: '3px solid rgba(0, 224, 202, 0.7)',
                    boxShadow:
                      '0 0 50px rgba(0, 224, 202, 0.7), ' +
                      '0 0 30px rgba(0, 224, 202, 0.5), ' +
                      'inset 0 0 50px rgba(0, 224, 202, 0.3), ' +
                      '0 12px 40px rgba(0, 0, 0, 0.5)',
                    filter: 'blur(1.5px)',
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 1.0,
                    ease: 'easeOut',
                  }}
                />

                {/* Premium shader dissolve effect */}
                <motion.div
                  className="relative w-[340px] h-[170px] flex items-center justify-center rounded-[64px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 224, 202, 0.15), rgba(0, 173, 181, 0.08))',
                    backdropFilter: 'blur(30px) saturate(150%)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'5\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.25\'/%3E%3C/svg%3E")',
                      opacity: 0.25,
                    }}
                    animate={{
                      opacity: [0.25, 0, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      ease: [0.45, 0.05, 0.55, 0.95],
                    }}
                  />
                </motion.div>

                {/* Premium particles snapping into place */}
                {particles.slice(0, 60).map((particle, i) => (
                  <motion.div
                    key={`snap-${particle.id}`}
                    className="absolute rounded-full"
                    style={{
                      width: 5,
                      height: 5,
                      background: '#00E0CA',
                      boxShadow: '0 0 12px rgba(0, 224, 202, 1), 0 0 6px rgba(0, 224, 202, 0.8)',
                    }}
                    initial={{
                      x: Math.cos(i) * 220,
                      y: Math.sin(i) * 220,
                      opacity: 1,
                    }}
                    animate={{
                      x: (Math.cos(i) * 170) + 170,
                      y: (Math.sin(i) * 85) + 85,
                      opacity: 0,
                      scale: [1, 1.6, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: (i / 60) * 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {/* Stage 4: Reveal (11.5s - 15.0s) - Final logo with premium bloom */}
          {stage === 'reveal' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Enhanced center glow - brighter and cleaner */}
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
                  duration: 2.0,
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
                  scale: { duration: 2.5, ease: 'easeInOut' },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 2.0, ease: 'easeOut' },
                }}
              />

              {/* Premium light sweep with ambient reflections */}
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
                  duration: 2.0,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
              />

              {/* Final GoDaddy Logo - ENHANCED SIZE & CLARITY */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 25, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.img
                  src="./logogd.png??width=8000&height=8000&resize=contain"
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
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Premium text with enhanced size and clarity */}
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
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

                {/* Premium confetti burst with richer colors */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={`confetti-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: Math.random() * 7 + 4,
                        height: Math.random() * 7 + 4,
                        background:
                          i % 4 === 0
                            ? 'radial-gradient(circle, #00E0CA 0%, #00ADB5 100%)'
                            : i % 4 === 1
                            ? 'radial-gradient(circle, #0dd9e2 0%, #00ADB5 100%)'
                            : i % 4 === 2
                            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)'
                            : 'radial-gradient(circle, #00ADB5 0%, #008B94 100%)',
                        boxShadow: i % 4 === 0 ? '0 0 10px rgba(0, 224, 202, 0.8)' : i % 4 === 1 ? '0 0 10px rgba(13, 217, 226, 0.8)' : '0 0 8px rgba(255, 255, 255, 0.6)',
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0.6],
                        x: Math.cos((i / 40) * Math.PI * 2) * (120 + Math.random() * 60),
                        y: Math.sin((i / 40) * Math.PI * 2) * (120 + Math.random() * 60),
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2.0,
                        delay: 0.5 + Math.random() * 0.5,
                        ease: [0.45, 0.05, 0.55, 0.95],
                      }}
                    />
                  ))}
                </div>

                {/* Premium shimmer with ambient glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), rgba(0, 224, 202, 0.4), transparent)',
                      transform: 'skewX(-18deg)',
                      filter: 'blur(2px)',
                    }}
                    animate={{
                      x: ['-250%', '250%'],
                    }}
                    transition={{
                      delay: 1.5,
                      duration: 2.0,
                      ease: [0.45, 0.05, 0.55, 0.95],
                    }}
                  />
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