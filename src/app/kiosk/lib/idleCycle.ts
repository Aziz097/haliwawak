/**
 * Idle-cycle index helper for the kiosk attract loop.
 *
 * Drives the attract-loop image cycling on the Idle screen: given the current
 * cycle tick and the number of available images, it returns which image index
 * should be shown. The result is always a non-negative integer within `[0, n)`
 * for `n > 0`, and cycles through every index as `tick` increases.
 *
 * Requirements: 3.2, 3.3
 */

/**
 * Returns the attract-loop image index for a given cycle tick.
 *
 * @param tick - The cycle tick count. Any integer (negative ticks are handled
 *   so the result is still non-negative).
 * @param n - The number of available images. For `n <= 0` this returns 0.
 * @returns `tick mod n` mapped into `[0, n)` for `n > 0`, otherwise 0.
 */
export function idleCycleIndex(tick: number, n: number): number {
  // No imagery available (or invalid count): nothing to cycle to.
  if (!Number.isFinite(n) || n <= 0) {
    return 0;
  }

  // Normalize the tick to an integer; non-finite ticks fall back to 0.
  const t = Number.isFinite(tick) ? Math.trunc(tick) : 0;
  const size = Math.trunc(n);

  // JavaScript's % can yield a negative remainder for negative ticks; shift
  // into the [0, n) range to guarantee a valid, non-negative index.
  return ((t % size) + size) % size;
}
