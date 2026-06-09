'use client';

/**
 * Idle inactivity timer for the kiosk.
 *
 * Registers `touchstart` / `pointerdown` / `click` listeners on `window` and
 * resets a single timer on each event. When `timeoutMs` elapses with no input,
 * `onTimeout` fires (the page wires this to dispatching `RESET_IDLE`). The timer
 * is armed only while `enabled` is true (i.e. on non-idle screens) and clears
 * its timeout and listeners on unmount or whenever it becomes disabled.
 *
 * Requirements: 4.1, 4.2, 4.3
 */

import { useEffect, useRef } from 'react';
import { IDLE_TIMEOUT_MS } from '../kiosk-theme/motion';

/** Touch/pointer events that count as Visitor interaction (Req 4.3). */
const ACTIVITY_EVENTS = ['touchstart', 'pointerdown', 'click'] as const;

/**
 * Arms an inactivity timer that calls `onTimeout` after `timeoutMs` of no
 * Visitor input while `enabled`.
 *
 * @param timeoutMs Inactivity duration before timeout (defaults to `IDLE_TIMEOUT_MS`, 180s).
 * @param onTimeout Invoked once the timer elapses with no interaction.
 * @param enabled Whether the timer is armed; false on the idle screen.
 */
export function useIdleTimer(
  timeoutMs: number = IDLE_TIMEOUT_MS,
  onTimeout: () => void,
  enabled: boolean = true,
): void {
  // Keep the latest callback in a ref so timer wiring does not re-subscribe
  // on every render when the caller passes an inline function.
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const fire = () => {
      onTimeoutRef.current();
    };

    const reset = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fire, timeoutMs);
    };

    // Arm the timer immediately, then reset on each interaction (Req 4.1, 4.3).
    reset();
    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, reset, { passive: true });
    }

    return () => {
      clearTimeout(timeoutId);
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, reset);
      }
    };
  }, [timeoutMs, enabled]);
}

export default useIdleTimer;
