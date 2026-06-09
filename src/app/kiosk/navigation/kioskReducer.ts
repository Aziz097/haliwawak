/**
 * Pure kiosk navigation reducer (Req 3.4, 4.4, 5.2, 5.3, 6.2, 6.3, 6.5).
 *
 * Owns the navigation state machine for the kiosk: the current screen, a
 * back-history stack, and a `direction` hint used to drive transition
 * animation. This module is a pure function with no side effects — it is the
 * single source of truth for flow order, back-history, home-to-SiteMap, and
 * idle reset, which keeps the navigation logic testable independent of any
 * React/control rendering.
 */

import { Screen, SCREEN_FLOW } from './screens';

/**
 * Kiosk navigation state.
 *
 * - `current`  — the screen currently displayed.
 * - `history`  — back-history stack; the screen at the end is the most recent
 *                predecessor. `BACK` pops from the end.
 * - `direction`— transition hint: `1` = forward (slide +x), `-1` = back
 *                (slide -x). Derived from flow-index comparison on `NAVIGATE`.
 */
export type KioskState = {
  current: Screen;
  history: Screen[];
  direction: 1 | -1;
};

/**
 * Actions the reducer understands.
 *
 * - `NAVIGATE` — go to `to`, pushing the current screen onto history.
 * - `BACK`     — pop history; no-op when the stack is empty.
 * - `HOME`     — navigate to the Site Map hub (pushes history).
 * - `START`    — begin the flow from `IDLE` (clears history).
 * - `RESET_IDLE` — return to the idle attract state (clears transient state).
 */
export type KioskAction =
  | { type: 'NAVIGATE'; to: Screen }
  | { type: 'BACK' }
  | { type: 'HOME' }
  | { type: 'START' }
  | { type: 'RESET_IDLE' };

/**
 * Initial state: the idle attract screen, no history, forward direction.
 */
export const initialState: KioskState = {
  current: 'IDLE',
  history: [],
  direction: 1,
};

/**
 * Compute the transition direction when moving `from` → `to`.
 *
 * Uses the ordered `SCREEN_FLOW` index comparison: a later target is a forward
 * move (`1`), an earlier target is a backward move (`-1`). If either screen is
 * outside the flow (e.g. `IDLE`), there is no meaningful ordering, so we
 * default to forward (`1`).
 */
function directionBetween(from: Screen, to: Screen): 1 | -1 {
  const fromIndex = SCREEN_FLOW.indexOf(from);
  const toIndex = SCREEN_FLOW.indexOf(to);
  if (fromIndex === -1 || toIndex === -1) {
    return 1;
  }
  return toIndex > fromIndex ? 1 : -1;
}

/**
 * Pure kiosk reducer. Given the current state and an action, returns the next
 * state. Never mutates the input state and performs no side effects.
 */
export function kioskReducer(
  state: KioskState,
  action: KioskAction,
): KioskState {
  switch (action.type) {
    case 'NAVIGATE': {
      // Push current onto history, move to `to`, derive direction from flow.
      return {
        current: action.to,
        history: [...state.history, state.current],
        direction: directionBetween(state.current, action.to),
      };
    }

    case 'BACK': {
      // No-op when there is nothing to go back to.
      if (state.history.length === 0) {
        return state;
      }
      const history = state.history.slice(0, -1);
      const previous = state.history[state.history.length - 1];
      return {
        current: previous,
        history,
        direction: -1,
      };
    }

    case 'HOME': {
      // Navigate to the Site Map hub purely in the reducer, so returning home
      // never depends on a home control rendering (Req 6.5).
      return {
        current: Screen.SITE_MAP,
        history: [...state.history, state.current],
        direction: directionBetween(state.current, Screen.SITE_MAP),
      };
    }

    case 'START': {
      // Enter the flow from idle at the first flow screen, clearing history.
      return {
        current: SCREEN_FLOW[0],
        history: [],
        direction: 1,
      };
    }

    case 'RESET_IDLE': {
      // Return to the idle attract state, clearing all transient navigation
      // state so the next session starts clean.
      return {
        current: Screen.IDLE,
        history: [],
        direction: 1,
      };
    }

    default: {
      return state;
    }
  }
}
