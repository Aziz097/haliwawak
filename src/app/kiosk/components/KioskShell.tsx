'use client';

/**
 * KioskShell - the persistent kiosk frame.
 *
 * Composes the three presentation concerns into a full-screen flex column:
 * `TopBar` (header) + `ScreenRouter` (the one active screen) + `NavControls`
 * (footer). The shell adapts to the current screen:
 *
 * - On the IDLE attract screen it renders ONLY the full-bleed `ScreenRouter`
 *   (no TopBar, no NavControls), so the attract loop fills the display.
 * - On every other screen it renders the `TopBar` at the top (showing the home
 *   affordance on non-SiteMap screens), the `ScreenRouter` flexed to fill the
 *   middle, and `NavControls` pinned at the bottom.
 *
 * When `usedFallback` is true (and not IDLE) a non-blocking `DataNotice` banner
 * is shown within the content area; it informs without blocking interaction
 * (Req 16.5).
 *
 * Uses kiosk bright-green design tokens only (no raw hex / legacy colors).
 *
 * Requirements: 5.4, 6.3
 */

import type { Screen } from '../navigation/screens';
import type { KioskSpecies } from '../lib/speciesMapping';

import TopBar from './TopBar';
import NavControls from './NavControls';
import DataNotice from './DataNotice';
import ScreenRouter from './ScreenRouter';
import SurveyFloatButton from './SurveyFloatButton';

export interface KioskShellProps {
  /** The screen currently displayed. */
  current: Screen;
  /** Slide direction hint forwarded to the router (forward > 0, back < 0). */
  direction: number;
  /** Full species list passed through to species-dependent screens. */
  species: KioskSpecies[];
  /** Whether there is history to go back to; back control hidden when false. */
  canGoBack: boolean;
  /** Whether a successor screen exists; forward control hidden when false. */
  hasNext: boolean;
  /** Whether the static fallback species list is in use (shows DataNotice). */
  usedFallback?: boolean;
  /** Start the experience from the idle screen (IDLE → first flow screen). */
  onStart: () => void;
  /** Navigate to a Site Map tile's target screen. */
  onSelectTile: (screen: Screen) => void;
  /** Navigate to the previous screen (pop history). */
  onBack: () => void;
  /** Navigate forward to the successor screen. */
  onForward: () => void;
  /** Navigate home to the Site Map. */
  onHome: () => void;
}

/**
 * Persistent kiosk frame. Renders the idle screen full-bleed, and every other
 * screen inside a TopBar / content / NavControls column.
 */
export default function KioskShell({
  current,
  direction,
  species,
  canGoBack,
  hasNext,
  usedFallback = false,
  onStart,
  onSelectTile,
  onBack,
  onForward,
  onHome,
}: KioskShellProps) {
  const isIdle = current === 'IDLE';

  // IDLE: render only the full-bleed attract router, no chrome.
  if (isIdle) {
    return (
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-kiosk-bg text-kiosk-ink">
        <ScreenRouter
          current={current}
          direction={direction}
          species={species}
          onStart={onStart}
          onSelectTile={onSelectTile}
        />
      </div>
    );
  }

  // Non-idle: TopBar + content (flex-1) + NavControls.
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-kiosk-bg text-kiosk-ink">
      <TopBar showHome={current !== 'SITE_MAP'} onHome={onHome} />

      <main className="relative flex min-h-0 flex-1 flex-col">
        {usedFallback && (
          <div className="px-6 pt-4">
            <DataNotice />
          </div>
        )}
        <div className="min-h-0 flex-1">
          <ScreenRouter
            current={current}
            direction={direction}
            species={species}
            onStart={onStart}
            onSelectTile={onSelectTile}
          />
        </div>
      </main>

      <NavControls
        canGoBack={canGoBack}
        hasNext={hasNext}
        onBack={onBack}
        onHome={onHome}
        onForward={onForward}
      />

      <SurveyFloatButton key={current} />
    </div>
  );
}
