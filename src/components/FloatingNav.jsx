'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

/**
 * Premium floating glass navigation bar
 * Features:
 * - Glass morphism with blur
 * - Subtle glow border
 * - Hover animations
 * - Aurora brand styling
 */
export default function FloatingNav() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl glass-morph-premium"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-purple-300 transition-colors">
            Aurora Reveal
          </span>
        </Link>

        {/* Nav items */}
        <div className="flex items-center gap-6">
          {['Home', 'Prizes', 'Admin Data'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative group"
            >
              <motion.span
                className="text-sm text-white/80 group-hover:text-white transition-colors font-medium"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.nav>
  );
}