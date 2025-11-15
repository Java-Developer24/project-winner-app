import seedrandom from 'seedrandom';

/**
 * Creates a deterministic pseudo-random number generator
 * @param {string} seed - The seed string for reproducibility
 * @returns {Function} RNG function that returns [0, 1)
 */
export function createSeededRng(seed) {
  return seedrandom(seed);
}

/**
 * Shuffle array using Fisher-Yates with seeded RNG
 * @param {Array} array - Array to shuffle
 * @param {Function} rng - Seeded RNG function
 * @returns {Array} Shuffled array
 */
export function seededShuffle(array, rng) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Pick random item from array with seeded RNG
 * @param {Array} array - Array to pick from
 * @param {Function} rng - Seeded RNG function
 * @returns {*} Random item
 */
export function seededPick(array, rng) {
  const index = Math.floor(rng() * array.length);
  return array[index];
}

/**
 * Generate random number in range with seeded RNG
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @param {Function} rng - Seeded RNG function
 * @returns {number} Random number in range
 */
export function seededRange(min, max, rng) {
  return min + rng() * (max - min);
}
