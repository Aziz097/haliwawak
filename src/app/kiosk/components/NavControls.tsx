'use client';

/**
 * NavControls - kiosk back / home / forward controls.
 *
 * - Back is hidden when there is no history (`!canGoBack`, Req 5.3).
 * - Forward is hidden when there is no successor screen (`!hasNext`, Req 5.2).
 * - Home is always available so a visitor can return to the Site Map (Req 6.3).
 *
 * Every interactive button is at least 64×64 CSS px (Req 1.4). Uses kiosk
 * bright-green design tokens only (no raw hex / legacy colors).
 *
 * Requirements: 1.4, 5.2, 5.3, 6.3
 */

import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useLang } from '../i18n/language';

export interface NavControlsProps {
  /** Whether there is history to go back to; back is hidden when false. */
  canGoBack: boolean;
  /** Whether a successor screen exists; forward is hidden when false. */
  hasNext: boolean;
  /** Navigate to the previous screen (pop history). */
  onBack: () => void;
  /** Navigate home to the Site Map. */
  onHome: () => void;
  /** Navigate forward to the successor screen. */
  onForward: () => void;
}

  /** Shared classes guaranteeing a ≥64×64px touch target with token colors. */
const BUTTON_BASE =
  'flex min-h-[64px] min-w-[64px] items-center justify-center rounded-xl transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-green-300';

export default function NavControls({
  canGoBack,
  hasNext,
  onBack,
  onHome,
  onForward,
}: NavControlsProps) {
  const { lang } = useLang();
  const L = {
    back: lang === 'id' ? 'Kembali' : 'Back',
    home: lang === 'id' ? 'Beranda' : 'Home',
    next: lang === 'id' ? 'Lanjut' : 'Next',
  };
  return (
    <nav
      aria-label="Navigasi kios / Kiosk navigation"
      className="flex items-center justify-between gap-4 border-t border-kiosk-green-200 bg-kiosk-surface px-6 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]"
    >
      {/* Back - hidden when there is no history */}
      <div className="flex flex-1 justify-start">
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={L.back}
            className={`${BUTTON_BASE} gap-1.5 bg-kiosk-surface-tint px-4 text-kiosk-ink hover:bg-kiosk-green-100`}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            <span className="text-base font-medium">{L.back}</span>
          </button>
        )}
      </div>

      {/* Home - always available */}
      <div className="flex flex-1 justify-center">
        <button
          type="button"
          onClick={onHome}
          aria-label={L.home}
          className={`${BUTTON_BASE} gap-1.5 bg-kiosk-green-700 px-5 text-kiosk-on-green hover:bg-kiosk-green-800`}
        >
          <Home className="h-5 w-5" strokeWidth={2} />
          <span className="text-base font-medium">{L.home}</span>
        </button>
      </div>

      {/* Forward - hidden when there is no successor screen */}
      <div className="flex flex-1 justify-end">
        {hasNext && (
          <button
            type="button"
            onClick={onForward}
            aria-label={L.next}
            className={`${BUTTON_BASE} gap-1.5 bg-kiosk-green-600 px-4 text-kiosk-on-green hover:bg-kiosk-green-700`}
          >
            <span className="text-base font-medium">{L.next}</span>
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>
        )}
      </div>
    </nav>
  );
}
