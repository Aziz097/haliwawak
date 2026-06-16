'use client';

/**
 * TopBar - persistent kiosk header / navbar.
 *
 * Layout (left → right):
 *   1. Brand lockup: kiosk wordmark logo + "Eduwisata Polinator" + site subtitle.
 *   2. Centered partner/funder logo row (order set in `KIOSK_LOGOS`).
 *   3. A live clock that updates once per second.
 *   4. A "Beranda" (home) button, shown on non-idle, non-SiteMap screens.
 *
 * Uses kiosk bright-green design tokens only (no raw hex / legacy colors).
 *
 * Requirements: 1.4, 6.3
 */

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { KIOSK_BRAND_LOGO, KIOSK_LOGOS } from '../content/assets';
import { useLang } from '../i18n/language';

export interface TopBarProps {
  /** Reserved for future use; the navbar's right action is the language toggle. */
  showHome?: boolean;
  /** Reserved (kept for API compatibility with KioskShell). */
  onHome?: () => void;
}

/** Formats a Date as a zero-padded 24-hour `HH:MM:SS` string. */
function formatClock(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Live clock that re-renders every second. Starts from `null` so the
 * server/first paint and the client agree (avoids hydration mismatch), then
 * fills in on mount and ticks each second.
 */
function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      suppressHydrationWarning
      aria-label="Waktu saat ini / Current time"
      className="font-mono text-2xl font-semibold tabular-nums text-kiosk-ink"
    >
      {now ? formatClock(now) : '--:--:--'}
    </time>
  );
}

// Props are reserved for future home-button behavior; kept for API compatibility with KioskShell.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TopBar({ showHome, onHome }: TopBarProps) {
  const { lang, toggle } = useLang();
  // The button shows the language you will switch TO.
  const switchToLabel = lang === 'id' ? 'English' : 'Indonesia';

  return (
    <header className="flex items-center justify-between gap-6 border-b-2 border-kiosk-green-200 bg-kiosk-surface px-6 py-2 shadow-sm">
      {/* 1. Brand lockup */}
      <div className="flex shrink-0 items-center gap-3">
        <img
          src={KIOSK_BRAND_LOGO}
          alt="Eduwisata Polinator"
          className="h-10 w-10 object-contain"
        />
        <span className="flex flex-col leading-tight">
          <span className="text-lg font-extrabold text-kiosk-ink">
            Eduwisata Polinator
          </span>
          <span className="text-xs font-medium text-kiosk-green-700">
            Situs Purbakala Pugung Raharjo
          </span>
        </span>
      </div>

      {/* 2. Centered partner / funder logos */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-5">
        {KIOSK_LOGOS.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            loading="lazy"
            decoding="async"
            className="h-10 w-auto max-w-[88px] object-contain"
          />
        ))}
      </div>

      {/* 3. Clock + 4. Language toggle */}
      <div className="flex shrink-0 items-center gap-4">
        <LiveClock />
        <button
          type="button"
          onClick={toggle}
          aria-label={`Ganti bahasa ke ${switchToLabel} / Switch language to ${switchToLabel}`}
          className="flex min-h-[48px] items-center gap-1.5 rounded-xl bg-kiosk-green-700 px-5 text-kiosk-on-green transition-colors hover:bg-kiosk-green-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-green-300"
        >
          <Languages className="h-5 w-5" strokeWidth={2} />
          <span className="text-base font-medium">{switchToLabel}</span>
        </button>
      </div>
    </header>
  );
}
