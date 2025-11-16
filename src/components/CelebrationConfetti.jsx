'use client';

import { useEffect, useRef } from 'react';

export default function CelebrationConfetti({ side = 'left', active = true, className = '' }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    let mounted = true;

    const createParticle = () => {
      if (!mounted) return;
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      // randomize size and color
      const size = Math.floor(Math.random() * 10) + 6; // 6-15px
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      const colors = ['#10b981', '#059669', '#fbbf24', '#60a5fa', '#f472b6'];
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      // spawn across the width of the container
      el.style.left = `${Math.random() * 100}%`;

      // stagger animation duration and delay
      // aim to mid-modal (approx 40vh) instead of full page height for faster end
      const duration = (Math.random() * 2.0) + 1.2; // ~1.2s - 3.2s
      el.style.animationDuration = `${duration}s`;
      el.style.opacity = '0';

      container.appendChild(el);

      // remove after animation
      const remove = () => {
        if (container.contains(el)) container.removeChild(el);
      };
      // fallback remove in case animationend not fired
      el.addEventListener('animationend', remove);
      setTimeout(remove, (duration + 0.2) * 1000);
    };

    // spawn a few initially to make the emitter noticeable
    for (let i = 0; i < 12; i++) {
      setTimeout(createParticle, i * 80);
    }

    // continuous spawn interval with moderate gap (balanced for visibility + perf)
    const interval = setInterval(() => {
      // spawn 4-6 particles each tick
      const batch = Math.floor(Math.random() * 3) + 4;
      for (let i = 0; i < batch; i++) {
        setTimeout(createParticle, i * 60);
      }
    }, 600); // emit every 600ms for more continuous effect

    return () => {
      mounted = false;
      clearInterval(interval);
      if (container) container.innerHTML = '';
    };
  }, [active]);

  // Provide a minimal inline style so the container always has area for absolute
  // particles even when the parent supplies positioning via `className`.
  const inlineContainerStyle = {
    minHeight: '6rem',
    minWidth: '4rem',
    pointerEvents: 'none',
    overflow: 'visible',
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={inlineContainerStyle}
      aria-hidden
    >
      <style>{`
        .confetti-particle {
          position: absolute;
          top: 0;
          border-radius: 2px;
          transform: translateY(0) rotate(0deg);
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        @keyframes confetti-fall {
          0% {
            opacity: 0;
            transform: translateY(-10px) rotate(0deg) scale(0.95);
          }
          10% {
            opacity: 1;
          }
          100% {
            /* land near the middle of the viewport/modal so confetti appears behind the modal center */
            opacity: 0;
            transform: translateY(40vh) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
