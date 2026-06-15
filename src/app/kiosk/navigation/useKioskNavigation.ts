'use client';

/**
 * Kiosk navigation hook (Req 5.2, 5.3, 6.3).
 *
 * Wraps the pure `kioskReducer` in `useReducer` and exposes a small, stable
 * imperative API for driving the kiosk flow: forward/back/home navigation,
 * starting from idle, and resetting to the idle attract state. It also derives
 * two convenience selectors used to drive the navigation controls:
 *
 * - `canGoBack`  — whether the back control should be available (Req 5.3).
 * - `nextScreen` — the flow successor of the current screen, or `null` at the
 *                  end of the flow / when the current screen is outside it.
 *                  Drives the forward control's enabled state (Req 5.2).
 */

import { useCallback, useMemo, useReducer } from 'react';

import { kioskReducer, initialState, type KioskState } from './kioskReducer';
import { SCREEN_FLOW, type Screen } from './screens';

/**
 * The shape returned by {@link useKioskNavigation}.
 */
export type UseKioskNavigation = {
  /** Current navigation state (current screen, history, transition direction). */
  state: KioskState;
  /** Navigate to `to`, pushing the current screen onto history (Req 5.2, 6.2). */
  go: (to: Screen) => void;
  /** Pop back-history to the previous screen; no-op when history is empty (Req 5.3). */
  back: () => void;
  /** Navigate to the Site Map hub (Req 6.3). */
  home: () => void;
  /** Begin the flow from idle at the first flow screen (Req 3.4). */
  start: () => void;
  /** Return to the idle attract state, clearing transient navigation state (Req 4.4). */
  resetIdle: () => void;
  /** Whether there is at least one screen to go back to (Req 5.3). */
  canGoBack: boolean;
  /** The flow successor of the current screen, or `null` at the end / outside the flow. */
  nextScreen: Screen | null;
};

/**
 * Compute the successor of `current` within `SCREEN_FLOW`.
 *
 * Returns `null` when `current` is the last flow screen or is not part of the
 * ordered flow (e.g. `IDLE`).
 */
function successorOf(current: Screen): Screen | null {
  const index = SCREEN_FLOW.indexOf(current);
  if (index === -1 || index >= SCREEN_FLOW.length - 1) {
    return null;
  }
  return SCREEN_FLOW[index + 1];
}

/**
 * React hook wrapping the kiosk navigation reducer.
 */
export function useKioskNavigation(): UseKioskNavigation {
  const [state, dispatch] = useReducer(kioskReducer, initialState);

  const go = useCallback((to: Screen) => {
    dispatch({ type: 'NAVIGATE', to });
  }, []);

  const back = useCallback(() => {
    dispatch({ type: 'BACK' });
  }, []);

  const home = useCallback(() => {
    dispatch({ type: 'HOME' });
  }, []);

  const start = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const resetIdle = useCallback(() => {
    dispatch({ type: 'RESET_IDLE' });
  }, []);

  const canGoBack = state.history.length > 0;

  // state is a ref-like mutable object; we only need to recalculate when the current screen changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextScreen = useMemo(() => successorOf(state.current), [state.current]);

  return {
    state,
    go,
    back,
    home,
    start,
    resetIdle,
    canGoBack,
    nextScreen,
  };
}
