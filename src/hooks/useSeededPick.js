import { useMemo } from 'react';
import { createSeededRng, seededPick, seededShuffle } from '@/lib/utils/seededRng';
import prizesData from '@/data/prizes.json';

/**
 * Deterministically pick a winner and prize based on a seed
 * Uses Fisher-Yates shuffle to pair winners with prizes
 * @param {string} seed - The seed for reproducibility (e.g., date + event ID)
 * @returns {Object} { winner, prize, rng }
 */
export function useSeededPick(seed = `aurora-${Date.now()}`) {
  return useMemo(() => {
    const rng = createSeededRng(seed);
    
    // Shuffle both arrays with the same RNG instance for deterministic pairing
    const shuffledWinners = seededShuffle(prizesData.winners, rng);
    const shuffledPrizes = seededShuffle(prizesData.prizes, rng);
    
    // Pick the first item from each shuffled array
    const winner = shuffledWinners[0];
    const prize = shuffledPrizes[0];
    
    return {
      winner,
      prize,
      rng: createSeededRng(seed + '-animation'), // Fresh RNG for animations
      seed,
      allWinners: shuffledWinners,
      allPrizes: shuffledPrizes,
    };
  }, [seed]);
}
