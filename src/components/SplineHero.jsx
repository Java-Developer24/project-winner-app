'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Spline 3D Hero Scene Component
 * Embeds a cinematic Spline scene with:
 * - Floating neon particles
 * - Glass portal/glowing orb
 * - Soft camera drift
 * - Purple → Pink → Magenta aurora lighting
 * 
 * INSTRUCTIONS:
 * 1. Create your scene at https://spline.design/
 * 2. Export as "Public" and copy the embed URL
 * 3. Replace SPLINE_SCENE_URL below with your URL
 */
export default function SplineHero({ className = '', fallback = true }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // TODO: Replace with your actual Spline scene URL
  const SPLINE_SCENE_URL = 'https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode';
  
  // Check if URL is configured
  const isValidUrl = SPLINE_SCENE_URL.includes('spline.design') && !SPLINE_SCENE_URL.includes('YOUR-SCENE-ID');

  useEffect(() => {
    // Only load Spline if we have a valid URL
    if (!isValidUrl) {
      setIsLoading(false);
      return;
    }

    // Dynamically load Spline runtime
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.0.47/build/spline-viewer.js';
    
    script.onload = () => {
      setIsLoading(false);
    };
    
    script.onerror = () => {
      console.warn('Failed to load Spline viewer');
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isValidUrl]);

  // Fallback CSS-only hero
  if ((!isValidUrl || hasError) && fallback) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        {/* Animated gradient orbs as fallback */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(240, 147, 251, 0.5) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} ref={containerRef}>
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-white/70">Loading 3D Scene...</div>
        </motion.div>
      )}

      {/* Only render Spline Viewer if URL is valid */}
      {isValidUrl && (
        <spline-viewer
          url={SPLINE_SCENE_URL}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        />
      )}
    </div>
  );
}