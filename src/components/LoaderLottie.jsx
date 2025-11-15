'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Premium $200k Loading Experience
 * Features:
 * - 3D holographic rotating crystal cube
 * - Multi-circle rotating orbits (circular loading motion)
 * - Volumetric light beams
 * - Mouse parallax camera movement
 */
export default function LoaderLottie({ className = '' }) {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax for micro camera movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const repeatCount = prefersReducedMotion ? 0 : Infinity;
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
      <motion.div 
        className="relative w-64 h-64"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Volumetric Light Beams */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-32 origin-bottom"
            style={{
              background: `linear-gradient(to top, rgba(255, 215, 0, 0.6), transparent)`,
              transform: `rotate(${i * 45}deg) translateX(-50%)`,
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: repeatCount,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Multi-circle rotating orbits - Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-purple-500/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 4, repeat: repeatCount, ease: 'linear' },
            scale: { duration: 2, repeat: repeatCount },
          }}
          style={{
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 40px rgba(168, 85, 247, 0.4)',
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute inset-8 rounded-full border-4 border-pink-500/40"
          animate={{
            rotate: -360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: repeatCount, ease: 'linear' },
            scale: { duration: 1.5, repeat: repeatCount },
          }}
          style={{
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.6), inset 0 0 30px rgba(236, 72, 153, 0.4)',
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-16 rounded-full border-4 border-yellow-400/50"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: repeatCount, ease: 'linear' },
            scale: { duration: 1, repeat: repeatCount },
          }}
          style={{
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.6)',
          }}
        />

        {/* 3D Holographic Crystal Cube Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-20 h-20"
          style={{
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: 360,
            rotateY: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Cube faces with neon outlines */}
          {[
            { transform: 'rotateY(0deg) translateZ(40px)' },
            { transform: 'rotateY(90deg) translateZ(40px)' },
            { transform: 'rotateY(180deg) translateZ(40px)' },
            { transform: 'rotateY(-90deg) translateZ(40px)' },
            { transform: 'rotateX(90deg) translateZ(40px)' },
            { transform: 'rotateX(-90deg) translateZ(40px)' },
          ].map((face, i) => (
            <motion.div
              key={`face-${i}`}
              className="absolute inset-0"
              style={{
                ...face,
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(240, 147, 251, 0.3))',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 215, 0, 0.8)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.4)',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: repeatCount,
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Center glowing core */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #FFD700, #FFA500)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: repeatCount,
            }}
          />
        </motion.div>

        {/* Pulsating neon ring around the cube */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            border: '3px solid rgba(255, 215, 0, 0.6)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.6)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Orbiting particles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 100;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FFD700, #FFA500)',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
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
              }}
              transition={{
                duration: 4,
                repeat: repeatCount,
                ease: 'linear',
                delay: i * 0.1,
              }}
            />
          );
        })}

        {/* Ripple rings effect */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute inset-0 rounded-full border-2 border-purple-400/20"
            animate={{
              scale: [0.5, 2],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}