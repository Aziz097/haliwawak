'use client';

/**
 * Kiosk route entry - thin client shell.
 *
 * Composes the kiosk's concerns and hands them to the presentation layer:
 * - Navigation state via {@link useKioskNavigation} (reducer-backed flow
 *   machine: current screen, history, transition direction, + the imperative
 *   go/back/home/start/resetIdle API plus canGoBack / nextScreen).
 * - Idle inactivity handling via {@link useIdleTimer}, armed only on non-idle
 *   screens; on timeout it resets the kiosk to the IDLE attract state.
 *
 * Species data is currently HARD-CODED from the curated static list
 * (`STATIC_SPECIES`, with delivered top/underside photos) - no backend call -
 * per the current product decision. Swap back to `useSpeciesData()` to source
 * from `/api/kiosk/species` later.
 *
 * Requirements: 3.1, 3.4, 3.5, 4.1, 4.2, 4.4, 5.1, 5.2, 5.3, 6.2, 6.3, 16.1
 */

import { useMemo } from 'react';
import { useKioskNavigation } from './navigation/useKioskNavigation';
import { useIdleTimer } from './hooks/useIdleTimer';
import { IDLE_TIMEOUT_MS } from './kiosk-theme/motion';
import { STATIC_SPECIES } from './content/staticSpecies';
import { enrichSpeciesPhotos } from './content/speciesPhotos';
import { LanguageProvider } from './i18n/language';
import KioskShell from './components/KioskShell';

export default function KioskPage() {
  const { state, go, back, home, start, resetIdle, canGoBack, nextScreen } =
    useKioskNavigation();

  // Hard-coded species (curated photos, no backend). Memoized so the array
  // identity is stable across renders.
  const species = useMemo(() => enrichSpeciesPhotos(STATIC_SPECIES), []);

  // Arm the inactivity timer only when away from the idle screen; on timeout it
  // returns the kiosk to IDLE and clears transient navigation state (Req 4.1, 4.2).
  useIdleTimer(IDLE_TIMEOUT_MS, resetIdle, state.current !== 'IDLE');

  const handleStart = () => {
    start();
    if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fullscreen may be blocked by the browser; ignore silently.
      });
    }
  };

  return (
    <LanguageProvider initial="id">
      <KioskShell
        current={state.current}
        direction={state.direction}
        species={species}
        canGoBack={canGoBack}
        hasNext={nextScreen !== null}
        usedFallback={false}
        onStart={handleStart}
        onSelectTile={go}
        onBack={back}
        onForward={() => nextScreen && go(nextScreen)}
        onHome={home}
      />
    </LanguageProvider>
  );
}
