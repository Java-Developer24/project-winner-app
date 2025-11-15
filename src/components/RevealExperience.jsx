'use client';

import RevealShell from './RevealShell';

/**
 * Main reveal experience wrapper
 * Uses the premium RevealShell component for cinematic 3D reveal
 */
export default function RevealExperience() {
  // Generate deterministic seed based on current date
  const seed = `aurora-${new Date().toDateString()}`;

  return <RevealShell seed={seed} />;
}