'use client';

/**
 * NavControls - kiosk back / home / forward controls.
 *
 * - Back is hidden when there is no history (`!canGoBack`, Req 5.3).
 * - Forward is hidden when there is no successor screen (`!hasNext`, Req 5.2).
 * - Home is always available so a visitor can return to the Site Map (Req 6.3).
 *
 * Every interactive button is at least 64×64 CSS px (Req 1.4). Uses kiosk
 * bright-orange design tokens only (no raw hex / legacy colors).
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

const BUTTON_BASE =
  'group flex min-h-[64px] min-w-[64px] items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-orange-300 active:scale-[0.98]';

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
      className="flex items-center justify-between gap-4 border-t border-kiosk-orange-200/60 bg-kiosk-surface/95 px-6 py-3 shadow-[0_-8px_30px_rgba(30,51,40,0.06)] backdrop-blur-md"
    >
      {/* Back - hidden when there is no history */}
      <div className="flex flex-1 justify-start">
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={L.back}
            className={`${BUTTON_BASE} gap-2 bg-kiosk-surface-tint/80 pl-2 pr-5 text-kiosk-ink ring-1 ring-kiosk-orange-200 hover:bg-kiosk-orange-100 hover:shadow-md`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/50 transition-transform duration-500 group-hover:-translate-x-1">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="text-base font-semibold">{L.back}</span>
          </button>
        )}
      </div>

      {/* Home - always available */}
      <div className="flex flex-1 justify-center">
        <button
          type="button"
          onClick={onHome}
          aria-label={L.home}
          className={`${BUTTON_BASE} gap-2 bg-kiosk-orange-700 pl-2 pr-5 text-kiosk-on-green shadow-[0_4px_20px_rgba(199,70,15,0.25)] hover:bg-kiosk-orange-800 hover:shadow-[0_6px_28px_rgba(199,70,15,0.35)]`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-12">
            <Home className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="text-base font-semibold">{L.home}</span>
        </button>
      </div>

      {/* Forward - hidden when there is no successor screen */}
      <div className="flex flex-1 justify-end">
        {hasNext && (
          <button
            type="button"
            onClick={onForward}
            aria-label={L.next}
            className={`${BUTTON_BASE} gap-2 bg-kiosk-orange-600 pl-5 pr-2 text-kiosk-on-green shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:bg-kiosk-orange-700 hover:shadow-[0_6px_28px_rgba(249,115,22,0.35)]`}
          >
            <span className="text-base font-semibold">{L.next}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
