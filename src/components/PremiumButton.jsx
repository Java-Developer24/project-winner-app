'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Premium Hollywood-grade button with:
 * - Gradient shimmer (Stripe-style)
 * - Spring scale interaction
 * - Light sweep animation
 * - Particle burst on click (reduced on low-motion mode)
 * - Magnetic pull effect
 */
export default function PremiumButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  ...props 
}) {
  const [particles, setParticles] = useState([]);
  const buttonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const repeatCount = prefersReducedMotion ? 0 : Infinity;

  const handleClick = useCallback((e) => {
    // Only create particles if not in reduced motion mode
    if (!prefersReducedMotion) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        // Reduce particle count for better performance
        const particleCount = 12;
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
          id: Date.now() + i,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          angle: (i / particleCount) * Math.PI * 2,
          velocity: 60 + Math.random() * 40,
        }));
        
        setParticles(prev => [...prev, ...newParticles]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1200);
      }
    }

    onClick?.(e);
  }, [onClick, prefersReducedMotion]);

  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600',
      glow: 'rgba(168, 85, 247, 0.6)',
      shimmer: 'from-purple-400 via-pink-400 to-purple-400',
    },
    secondary: {
      bg: 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600',
      glow: 'rgba(34, 211, 238, 0.6)',
      shimmer: 'from-blue-400 via-cyan-400 to-blue-400',
    },
    accent: {
      bg: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500',
      glow: 'rgba(251, 191, 36, 0.6)',
      shimmer: 'from-yellow-400 via-orange-400 to-yellow-400',
    },
  };

  const currentVariant = variants[variant];

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className={`
        group relative px-10 py-5 text-lg font-bold text-white rounded-2xl 
        overflow-hidden shadow-2xl transition-all
        ${className}
      `}
      whileHover={prefersReducedMotion ? { scale: 1.02 } : { 
        scale: 1.05,
        y: -6,
        boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
      }}
      whileTap={{ scale: 0.98, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Gradient background with animation */}
      <motion.div 
        className={`absolute inset-0 ${currentVariant.bg}`}
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: repeatCount,
          ease: 'linear',
        }}
        style={{ backgroundSize: '200% 200%', willChange: prefersReducedMotion ? 'auto' : 'background-position' }}
      />
      
      {/* Shimmer overlay (Stripe-style) */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant.shimmer} opacity-0 group-hover:opacity-30`}
        animate={prefersReducedMotion ? {} : {
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: repeatCount,
          repeatDelay: 0.5,
          ease: 'easeInOut',
        }}
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
      />
      
      {/* Enhanced neon glow on hover */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
          style={{
            background: currentVariant.glow,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: repeatCount,
            ease: 'easeInOut',
          }}
        />
      )}
      
      {/* Animated light sweep */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          initial={{ x: '-200%' }}
          whileHover={{
            x: '200%',
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>

      {/* Particle burst effect - reduced for performance */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full bg-white pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
          }}
          initial={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            x: Math.cos(particle.angle) * particle.velocity,
            y: Math.sin(particle.angle) * particle.velocity,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Inner glow border */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-white/30 pointer-events-none group-hover:ring-white/50 transition-all" />
      
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: `0 0 0 2px ${currentVariant.glow}`,
          opacity: 0,
        }}
        whileHover={{
          opacity: prefersReducedMotion ? 0.3 : 0.6,
          scale: 1.05,
        }}
      />
    </motion.button>
  );
}