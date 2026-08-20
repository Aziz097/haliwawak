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

/** Snappier easing for exits and button presses. */
export const EASING_SNAP: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** Idle attract-loop imagery cycle interval (ms). */
export const IDLE_CYCLE_MS = 5000;

/** Inactivity timeout that returns the kiosk to the idle screen (ms). */
export const IDLE_TIMEOUT_MS = 180000;

/** Content block entering: lightweight fade in and rise. */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASING } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
};

/** Container that staggers its children's entrance. */
export const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/** Emphasis variant for tiles / detail content: scale + fade. */
export const morphScale: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASING } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.18 } },
};

/**
 * Horizontal slide for flow transitions, keyed on a custom `direction` number.
 * forward (`direction > 0`) enters from +x; back (`direction < 0`) enters from -x.
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 160 : -160, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASING } },
  exit: (direction: number) => ({ x: direction < 0 ? 160 : -160, opacity: 0, scale: 0.98, transition: { duration: 0.35, ease: EASING_SNAP } }),
};

/**
 * Flow transition: a soft crossfade-morph that replaces the hard horizontal
 * slide. Keeps a small directional drift (48px, vs the slide's 160px) so the
 * move still reads as forward/back, but the dominant motion is opacity + drift,
 * which is inexpensive on kiosk hardware.
 */
export const screenMorphVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: EASING },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 48 : -48,
    transition: { duration: 0.18, ease: EASING_SNAP },
  }),
};

/**
 * Spring used for the shared-element morph when a Site Map tile expands into
 * its destination screen. A spring (not a duration) keeps the growth feeling
 * physical at kiosk scale, where the box travels a long distance.
 */
export const MORPH_SPRING = {
  type: 'spring',
  stiffness: 220,
  damping: 32,
  mass: 0.9,
} as const;

/** Shared `layoutId` for the tile → screen morph. Must match on both ends. */
export const morphId = (screen: string) => `kiosk-morph-${screen}`;

/** Modal overlay + panel entrance. */
export const modalVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalPanelVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 40, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: EASING } },
  exit: { opacity: 0, scale: 0.96, y: 20, filter: 'blur(4px)', transition: { duration: 0.25, ease: EASING_SNAP } },
};
