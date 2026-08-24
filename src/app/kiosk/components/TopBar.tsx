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
 * Uses kiosk bright-orange design tokens only (no raw hex / legacy colors).
 *
 * Requirements: 1.4, 6.3
 */

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { KIOSK_BRAND_LOGO, KIOSK_LOGOS } from '../content/assets';
import { useLang } from '../language';
import KioskImage from './KioskImage';

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
      className="font-mono text-[clamp(1rem,1.8vw,1.5rem)] font-semibold tabular-nums text-kiosk-ink"
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
  const switchToCode = lang === 'id' ? 'EN' : 'ID';

  return (
    <header className="flex items-center justify-between gap-[clamp(0.5rem,2vw,1.5rem)] border-b-2 border-kiosk-orange-200 bg-kiosk-surface px-[clamp(0.75rem,2vw,1.5rem)] py-2 shadow-sm">
      {/* 1. Brand lockup */}
      <div className="flex min-w-0 shrink items-center gap-[clamp(0.5rem,1.2vw,0.75rem)]">
        <KioskImage
          src={KIOSK_BRAND_LOGO}
          alt="Eduwisata Polinator"
          className="h-[clamp(2rem,3.2vw,2.75rem)] w-[clamp(2rem,3.2vw,2.75rem)]"
          fill={false}
        />
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[clamp(0.9rem,1.5vw,1.125rem)] font-extrabold text-kiosk-ink">
            Eduwisata Polinator
          </span>
          <span className="truncate text-[clamp(0.6rem,0.9vw,0.75rem)] font-medium text-kiosk-orange-700">
            Situs Purbakala Pugung Raharjo
          </span>
        </span>
      </div>

      {/* 2. Centered partner / funder logos.
          `min-w-0` + per-logo `shrink` lets the row give up width to the brand
          lockup and clock before anything overflows the bar. */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-[clamp(0.5rem,1.5vw,1.25rem)]">
        {KIOSK_LOGOS.map((logo) => (
          <KioskImage
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="h-[clamp(1.5rem,2.8vw,2.5rem)] max-w-[clamp(48px,7vw,88px)] shrink"
            fill={false}
          />
        ))}
      </div>

      {/* 3. Clock + 4. Language toggle */}
      <div className="flex shrink-0 items-center gap-[clamp(0.5rem,1.5vw,1rem)]">
        <LiveClock />
        <button
          type="button"
          onClick={toggle}
          aria-label={`Ganti bahasa ke ${switchToLabel} / Switch language to ${switchToLabel}`}
          className="flex min-h-[clamp(48px,6vh,64px)] items-center gap-1.5 rounded-xl bg-kiosk-orange-700 px-[clamp(0.75rem,1.5vw,1.25rem)] text-kiosk-on-green transition-colors hover:bg-kiosk-orange-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-kiosk-orange-300"
        >
          <Languages
            className="h-[clamp(1.25rem,2vw,1.5rem)] w-[clamp(1.25rem,2vw,1.5rem)]"
            strokeWidth={2}
          />
          <span className="text-[clamp(0.8rem,1.2vw,1rem)] font-medium">{switchToCode}</span>
          {/* The full language name is the first thing to go when the bar tightens. */}
          <span className="hidden text-[clamp(0.8rem,1.2vw,1rem)] font-medium opacity-90 xl:inline">
            {switchToLabel}
          </span>
        </button>
      </div>
    </header>
  );
}
