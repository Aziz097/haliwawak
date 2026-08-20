'use client';

/**
 * ScreenEntrance - consistent fade-up entrance wrapper for kiosk screens.
 *
 * Wraps the screen's root content with a subtle fade + rise animation when the
 * screen mounts. The `stagger` prop enables a cascading reveal for child elements
 * that are themselves `motion` components with `variants={fadeUp}`.
 *
 * Requirements: 2.1, 6.6
 */

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASING, fadeUp, morphScale, stagger } from '../kiosk-theme/motion';

export interface ScreenEntranceProps {
  /** Screen content to animate. */
  children: ReactNode;
  /** Additional className for the wrapper. */
  className?: string;
  /** Whether to stagger direct `motion` children. */
  stagger?: boolean;
  /** Optional delay before the entrance starts. */
  delay?: number;
}

export default function ScreenEntrance({
  children,
  className = '',
  stagger: staggerChildren = false,
  delay = 0,
}: ScreenEntranceProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (staggerChildren) {
    return (
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className={className}
        transition={{ delayChildren: delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
       initial={{ opacity: 0, y: 18 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.32, ease: EASING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Reusable fade-up child for use inside a `stagger` container. */
export function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
       initial={{ opacity: 0, y: 18 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.32, ease: EASING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Reusable staggered list container for card grids. */
export function StaggerList({
  children,
  className = '',
  delay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reusable item for use inside a `StaggerList`.
 *
 * `morph` swaps the default fade-up for `morphScale` (scale + blur), which
 * settles into place rather than sliding up — the right read for card grids
 * whose tiles then expand into a full screen.
 */
export function StaggerItem({
  children,
  className = '',
  morph = false,
}: {
  children: ReactNode;
  className?: string;
  morph?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={morph ? morphScale : fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
