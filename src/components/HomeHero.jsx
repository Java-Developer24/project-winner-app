'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Trophy } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ParallaxBackground from './ParallaxBackground';
import PremiumButton from './PremiumButton';
import FloatingNav from './FloatingNav';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Lazy load SplineHero to improve initial page load
const SplineHero = dynamic(() => import('./SplineHero'), { 
  loading: () => null,
  ssr: false 
});

export default function HomeHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const repeatCount = prefersReducedMotion ? 0 : Infinity;
  const animationFrameRef = useRef(null);
  const lastMouseTimeRef = useRef(0);

  // Throttled mouse parallax effect - only updates at most every 16ms (60fps)
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastMouseTimeRef.current < 16) return; // Throttle to 60fps max
    
    lastMouseTimeRef.current = now;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  const x = useTransform(mouseX, [-10, 10], [-5, 5]);
  const y = useTransform(mouseY, [-10, 10], [-5, 5]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at 30% -20%, #ff4fd9 0%, #6d2bff 45%, #0c022a 100%)' }}>
      {/* Floating glass navigation */}
      <FloatingNav />

      {/* Enhanced 5-Layer Parallax Background */}
      <ParallaxBackground />

      {/* Aurora Light Beam Animation */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: repeatCount,
          ease: 'easeInOut',
        }}
      />

      {/* Spline 3D Hero Scene */}
      <div className="absolute inset-0 opacity-60">
        <SplineHero fallback={true} />
      </div>

      {/* Left Side - Scooty Image - LARGER SIZE */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="hidden lg:block absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 z-[5] pointer-events-none"
      >
        {/* Soft radial glow - cyan accent matching Jupiter */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute -inset-16 -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: repeatCount,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        )}
        
        {/* Bike image - INCREASED SIZE with Next.js Image optimization */}
        <motion.div
          animate={{
            y: prefersReducedMotion ? 0 : [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: repeatCount,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))',
          }}
        >
          <Image
            src="/scooty2.jpeg"
            alt="Jupiter Scooty Prize"
            width={448}
            height={448}
            loading="lazy"
            className="w-80 xl:w-[28rem] h-auto object-contain drop-shadow-2xl rounded-2xl"
            quality={75}
            sizes="(max-width: 1280px) 320px, 448px"
          />
        </motion.div>
      </motion.div>

      {/* Right Side - Bike Image - LARGER SIZE */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-[5] pointer-events-none"
      >
        {/* Soft radial glow - magenta accent matching R15 */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute -inset-16 -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: repeatCount,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.2) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        )}
        
        {/* Bike image - INCREASED SIZE with Next.js Image optimization */}
        <motion.div
          animate={{
            y: prefersReducedMotion ? 0 : [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: repeatCount,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.4))',
          }}
        >
          <Image
            src="/bike1.jpeg"
            alt="R15 Bike Prize"
            width={448}
            height={448}
            loading="lazy"
            className="w-80 xl:w-[28rem] h-auto object-contain drop-shadow-2xl rounded-2xl"
            quality={75}
            sizes="(max-width: 1280px) 320px, 448px"
          />
        </motion.div>
      </motion.div>

      {/* Floating 3D holographic crystal */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 pointer-events-none"
        style={{ x, y }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{
          rotateY: { duration: 20, repeat: repeatCount, ease: 'linear' },
          rotateX: { duration: 5, repeat: repeatCount, ease: 'easeInOut' },
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl transform rotate-45" 
               style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)' }} />
          <div className="absolute inset-2 bg-gradient-to-tr from-purple-400/10 via-pink-400/10 to-blue-400/10 rounded-2xl transform -rotate-12" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Premium badge with enhanced glass morph */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-morph-premium mb-12"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-white/95 tracking-wide">Premium Giveaway Experience</span>
        </motion.div> */}

        {/* Spotlight behind text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 8,
            repeat: repeatCount,
            ease: 'easeInOut',
          }}
        />

        {/* Enhanced luxury heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-8"
          style={{ x, y: useTransform(y, [-5, 5], [-3, 3]) }}
        >
          <span 
            className="block text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 text-luxury-shadow"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}
          >
            Aurora
          </span>
          
          {/* REVEAL with Orbitron font - REDUCED GLOW SPREAD */}
          <div className="relative inline-block overflow-hidden">
            {/* Animated glow background - CONTAINED & REDUCED */}
            <motion.div
              className="absolute inset-0 blur-[40px] -z-10"
              style={{ opacity: 0.8 }}
              animate={{
                background: [
                  'radial-gradient(ellipse, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                  'radial-gradient(ellipse, #ec4899 0%, #8b5cf6 50%, #f97316 100%)',
                  'radial-gradient(ellipse, #8b5cf6 0%, #f97316 50%, #ec4899 100%)',
                  'radial-gradient(ellipse, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                ],
                scale: [1.1, 1.25, 1.1],
              }}
              transition={{
                duration: 8,
                repeat: repeatCount,
                ease: 'easeInOut',
              }}
            />
            
            {/* REVEAL text with Orbitron font */}
            <div
              className="relative block text-6xl md:text-7xl lg:text-8xl font-black px-8"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.2em',
              }}
            >
              {'REVEAL'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.6,
                    scale: {
                      duration: 2,
                      repeat: repeatCount,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    }
                  }}
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 }
                  }}
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 50px #f97316, 0 0 100px #ec4899, 0 0 150px #8b5cf6, 0 6px 20px rgba(0, 0, 0, 0.6)',
                    filter: 'drop-shadow(0 0 40px rgba(249, 115, 22, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.9))',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            {/* Animated light sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent)',
                transform: 'skewX(-20deg)',
              }}
              animate={{
                x: ['-200%', '300%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: repeatCount,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.h1>

        {/* Enhanced subtitle with more spacing */}
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-20 max-w-2xl mx-auto leading-relaxed font-light"
        >
           Our premium 3D reveal system
         
        </motion.p> */}

        {/* Premium CTA with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-24"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: repeatCount,
              ease: 'easeInOut',
            }}
          >
            <Link href="/reveal">
              <PremiumButton variant="primary" className="group">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: repeatCount, ease: 'linear' },
                    scale: { duration: 2, repeat: repeatCount, ease: 'easeInOut' },
                  }}
                >
                  <Trophy className="w-7 h-7" />
                </motion.div>
                <span className="text-xl font-bold">Reveal Winner</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: repeatCount }}
                  className="text-2xl"
                >
                  →
                </motion.span>
              </PremiumButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}