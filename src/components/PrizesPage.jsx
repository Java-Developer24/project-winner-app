'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import FloatingNav from './FloatingNav';

export default function PrizesPage() {
  useEffect(() => {
    // Force exact background color from uploaded code
    const bgColor = '#110c1f'; // Deep dark purple from screenshot
    
    document.documentElement.style.setProperty('background-color', bgColor, 'important');
    document.body.style.setProperty('background-color', bgColor, 'important');
    
    // Watch for dark mode changes (keep same color regardless)
    const observer = new MutationObserver(() => {
      document.documentElement.style.setProperty('background-color', bgColor, 'important');
      document.body.style.setProperty('background-color', bgColor, 'important');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Add Material Icons font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Orbitron and Poppins fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Create particles on mount
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * duration}s`;
        particle.style.opacity = '0';
        
        particleContainer.appendChild(particle);
      }
    }

    return () => {
      // Reset background on unmount
      document.documentElement.style.removeProperty('background-color');
      document.body.style.removeProperty('background-color');
      observer.disconnect();
      
      if (particleContainer) {
        particleContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .animate-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: sweep 3s infinite linear;
        }
        @keyframes particle-drift {
          from {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          to {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        .particle {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: particle-drift linear infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 15px, 0 0 30px, 0 0 45px;
            opacity: 0.8;
          }
          50% {
            box-shadow: 0 0 25px, 0 0 50px, 0 0 70px;
            opacity: 1;
          }
        }
        .animate-pulse-glow-teal {
          animation: pulse-glow 4s ease-in-out infinite;
          box-shadow: 0 0 15px #0d9488, 0 0 30px #0d9488, 0 0 45px #0d9488;
        }
        .animate-pulse-glow-magenta {
          animation: pulse-glow 4s ease-in-out infinite;
          animation-delay: 0.5s;
          box-shadow: 0 0 15px #c026d3, 0 0 30px #c026d3, 0 0 45px #c026d3;
        }
        @keyframes pedestal-shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .pedestal-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: skewX(-25deg);
          animation: pedestal-shimmer 5s infinite;
        }
        @keyframes cta-glow {
          0% {
            box-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 15px #a855f7,
              0 0 20px #a855f7;
          }
          50% {
            box-shadow: 0 0 10px #d946ef, 0 0 20px #d946ef, 0 0 30px #a855f7,
              0 0 40px #a855f7;
          }
          100% {
            box-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 15px #a855f7,
              0 0 20px #a855f7;
          }
        }
        .cta-button {
          animation: cta-glow 3s ease-in-out infinite;
        }
      `}} />

      <FloatingNav />

      <div 
        className="fixed inset-0 -z-50"
        style={{ backgroundColor: '#110c1f' }}
      />

      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        id="particle-container"
      />

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden z-0 text-neutral-300 antialiased" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="absolute inset-0 z-[-2] bg-gradient-to-br from-[#1e0a3f] via-[#110c1f] to-[#250833]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[30%] bg-gradient-radial from-fuchsia-600/30 via-transparent to-transparent z-[-1]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[30%] bg-gradient-radial from-teal-500/20 via-transparent to-transparent z-[-1]" />
        <div className="absolute -bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-0" />
        
        <header className="text-center mt-12 md:mb-6">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl relative overflow-hidden text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Premium Prizes
            <span className="animate-sweep" />
          </h1>
          <p className="mt-0 text-lg md:text-xl font-light tracking-wider text-purple-200">
            Two Lucky Winners. Two Incredible Rides.
          </p>
        </header>
        
        <main className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div className="prize-card flex flex-col items-center group">
              <div className="relative w-full aspect-video flex items-center justify-center">
                <div className="absolute bottom-0 w-[80%] h-8 rounded-t-full bg-black/30 blur-2xl" />
                <div className="absolute bottom-0 w-[70%] h-4 overflow-hidden">
                  <div className="w-full h-full bg-cyan-400/80 rounded-t-[100%] filter blur-2xl animate-pulse-glow-teal pedestal-shimmer" />
                </div>
                <img
                  alt="TVS Jupiter scooty with a futuristic neon glow"
                  className="relative z-10 max-h-[88%] max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-4 rounded-2xl"
                  src="./scooty3.jpeg"
                />
              </div>
              <div className="text-center mt-0 p-3 w-[80%] bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl shadow-black/20">
                <h2 className="font-display text-2xl font-bold tracking-wide text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TVS Jupiter
                </h2>
                <p className="text-teal-400 font-semibold">
                  Grand Prize #1
                </p>
                {/* <div className="mt-4 flex justify-center items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">speed</span> 110cc Engine
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">ev_station</span>
                    EcoThrust FI
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">style</span> LED Headlamp
                  </span>
                </div> */}
              </div>
            </div>
            
            <div className="prize-card flex flex-col items-center group">
              <div className="relative w-full aspect-video flex items-center justify-center">
                <div className="absolute bottom-0 w-[80%] h-8 rounded-t-full bg-black/30 blur-2xl" />
                <div className="absolute bottom-0 w-[70%] h-4 overflow-hidden">
                  <div className="w-full h-full bg-fuchsia-500/80 rounded-t-[100%] filter blur-2xl animate-pulse-glow-magenta pedestal-shimmer" />
                </div>
                <img
                  alt="Yamaha R15 motorcycle with a dynamic neon glow"
                  className="relative z-10 max-h-[88%] max-w-[88%] object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-4 rounded-2xl"
                  src="./bike2.jpeg"
                />
              </div>
              <div className="text-center mt-0 p-3 w-[80%] bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl shadow-black/20">
                <h2 className="font-display text-2xl font-bold tracking-wide text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Yamaha R15
                </h2>
                <p className="text-fuchsia-400 font-semibold">
                  Grand Prize #2
                </p>
                {/* <div className="mt-4 flex justify-center items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">speed</span> 155cc VVA
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">hdr_strong</span>
                    Dual-Channel ABS
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons text-sm">motorcycle</span>
                    Y-Connect
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </main>
        
       
      </div>
    </>
  );
}