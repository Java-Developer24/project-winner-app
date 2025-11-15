'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * OPTIMIZED 5-Layer Parallax Background System
 * Premium depth and cinematic movement with:
 * - Layer 1: Deep space stars (twinkling) - REDUCED from 200 to 80
 * - Layer 2: Floating dust particles (enhanced) - REDUCED from 60 to 30
 * - Layer 3: Soft magenta nebula fog
 * - Layer 4: Animated aurora waves (3 waves)
 * - Layer 5: Volumetric light streaks (rotating) - REDUCED from 12 to 6
 * - Intersection Observer to pause animations when not visible
 */
export default function ParallaxBackground({ className = '' }) {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const repeatCount = prefersReducedMotion ? 0 : Infinity;
  const [isVisible, setIsVisible] = useState(true);
  
  // Reduced particle counts for better performance
  const STAR_COUNT = prefersReducedMotion ? 40 : 80;
  const DUST_COUNT = prefersReducedMotion ? 15 : 30;
  const STREAK_COUNT = prefersReducedMotion ? 3 : 6;
  
  // Enhanced parallax transforms with reduced motion support
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -50]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const layer4Y = useTransform(scrollY, [0, 1000], [0, -200]);
  const layer5Y = useTransform(scrollY, [0, 1000], [0, -250]);

  // Visibility detection to pause animations when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Memoized star renderer
  const renderStars = () => {
    return [...Array(STAR_COUNT)].map((_, i) => {
      const size = Math.random() * 2 + 0.5;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 5;
      
      return (
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          } : {}}
          transition={{
            duration,
            repeat: repeatCount,
            delay,
          }}
        />
      );
    });
  };

  // Memoized dust renderer
  const renderDust = () => {
    return [...Array(DUST_COUNT)].map((_, i) => {
      const size = Math.random() * 6 + 3;
      const duration = 10 + Math.random() * 5;
      const delay = Math.random() * 5;
      const xOffset = (Math.random() - 0.5) * 40;
      
      return (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent)',
            filter: 'blur(2px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            y: [0, -60, 0],
            x: [xOffset, xOffset * -1, xOffset],
            opacity: [0.2, 0.6, 0.2],
          } : {}}
          transition={{
            duration,
            repeat: repeatCount,
            delay,
            ease: 'easeInOut',
          }}
        />
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Deep navy vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/50 to-slate-950" />

      {/* Layer 1: Enhanced deep space stars with twinkling - OPTIMIZED */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        {renderStars()}
      </motion.div>

      {/* Layer 2: Enhanced floating dust particles - OPTIMIZED */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {renderDust()}
      </motion.div>

      {/* Layer 3: Soft magenta nebula fog - REDUCED motion when not visible */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer3Y }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 20% 20%, rgba(255, 79, 217, 0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          } : { opacity: 0.3, scale: 1 }}
          transition={{
            duration: 12,
            repeat: repeatCount,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 80% 80%, rgba(109, 43, 255, 0.2) 0%, transparent 60%)',
            filter: 'blur(80px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            opacity: [0.4, 0.7, 0.4],
            scale: [1.1, 1, 1.1],
          } : { opacity: 0.4, scale: 1 }}
          transition={{
            duration: 15,
            repeat: repeatCount,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(240, 147, 251, 0.15) 0%, transparent 50%)',
            filter: 'blur(100px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            opacity: [0.3, 0.5, 0.3],
            scale: [0.9, 1.3, 0.9],
          } : { opacity: 0.3, scale: 1 }}
          transition={{
            duration: 18,
            repeat: repeatCount,
            ease: 'easeInOut',
            delay: 6,
          }}
        />
      </motion.div>

      {/* Layer 4: Enhanced animated aurora waves */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer4Y }}
      >
        {/* Aurora wave 1 - Purple */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-96"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(102, 126, 234, 0.5) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            x: ['-10%', '10%', '-10%'],
            scaleX: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          } : { opacity: 0.3 }}
          transition={{
            duration: 20,
            repeat: repeatCount,
            ease: 'easeInOut',
          }}
        />
        
        {/* Aurora wave 2 - Pink */}
        <motion.div
          className="absolute top-1/2 right-0 w-full h-96"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(240, 147, 251, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            x: ['10%', '-10%', '10%'],
            scaleX: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          } : { opacity: 0.4 }}
          transition={{
                duration: 25,
                repeat: repeatCount,
                ease: 'easeInOut',
                delay: 5,
          }}
        />

        {/* Aurora wave 3 - Magenta */}
        <motion.div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full h-96"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(118, 75, 162, 0.5) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: isVisible ? 'opacity, transform' : 'auto',
          }}
          animate={isVisible && !prefersReducedMotion ? {
            y: ['-5%', '5%', '-5%'],
            scaleY: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          } : { opacity: 0.3 }}
          transition={{
            duration: 18,
            repeat: repeatCount,
            ease: 'easeInOut',
            delay: 10,
          }}
        />
      </motion.div>

      {/* Layer 5: Enhanced volumetric light streaks - REDUCED COUNT */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer5Y }}
      >
        {[...Array(STREAK_COUNT)].map((_, i) => {
          const angle = (i / STREAK_COUNT) * 360;
          return (
            <motion.div
              key={`streak-${i}`}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: '60%',
                height: '3px',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.15), transparent)',
                transform: `rotate(${angle}deg)`,
                filter: 'blur(2px)',
                willChange: isVisible ? 'opacity, transform' : 'auto',
              }}
              animate={isVisible && !prefersReducedMotion ? {
                opacity: [0, 0.4, 0],
                scaleX: [0, 1, 0],
              } : {}}
              transition={{
                duration: 4,
                repeat: repeatCount,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </motion.div>

      {/* Enhanced vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
    </div>
  );
}