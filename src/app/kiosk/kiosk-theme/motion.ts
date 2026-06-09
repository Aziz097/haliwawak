/**
 * Shared framer-motion variants and motion constants for the kiosk.
 *
 * Matches the existing kiosk's variant style (see the prior `page.tsx`): the
 * same easing tuple `[0.22, 1, 0.36, 1]`, `fadeUp`/`stagger`/`morphScale`
 * content variants, and a `slideVariants` set keyed on a custom `direction`
 * number (forward = +x, back = -x) for flow transitions.
 *
 * Requirements: 2.1, 2.2
 */

import type { Variants } from 'framer-motion';

/** Shared easing curve reused across all kiosk transitions. */
export const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Idle attract-loop imagery cycle interval (ms). */
export const IDLE_CYCLE_MS = 5000;

/** Inactivity timeout that returns the kiosk to the idle screen (ms). */
export const IDLE_TIMEOUT_MS = 180000;

/** Content block entering: fade in and rise. */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/** Container that staggers its children's entrance. */
export const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.12 } },
};

/** Emphasis variant for tiles / detail content: scale + fade. */
export const morphScale: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASING } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.25 } },
};

/**
 * Horizontal slide for flow transitions, keyed on a custom `direction` number.
 * forward (`direction > 0`) enters from +x; back (`direction < 0`) enters from -x.
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASING } },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0, transition: { duration: 0.3 } }),
};
