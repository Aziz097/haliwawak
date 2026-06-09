'use client';

/**
 * IdleScreen — the attract / screensaver state of the kiosk (Screen 0, IDLE).
 *
 * While mounted it runs a single `setInterval` (every `IDLE_CYCLE_MS`) that
 * advances a cycle tick; `idleCycleIndex(tick, n)` maps it onto the available
 * species hero imagery so the background slowly cross-fades through butterfly
 * photos (Req 3.2, 3.3). The interval is created in a `useEffect` and cleared
 * on unmount, so cycling stops when leaving idle (Req 3.5).
 *
 * Any touch / click anywhere calls `onStart` (Req 3.6). A richly composed
 * attract panel — brand logo, title, tagline, animated touch cue, and a
 * footer credit row — invites the visitor in (bilingual ID primary / EN
 * secondary). Styling uses ONLY the bright-green kiosk design tokens.
 *
 * Requirements: 3.2, 3.3, 3.5, 3.6
 */

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Hand, MapPin, Sparkles } from 'lucide-react';
import type { KioskSpecies } from '../lib/speciesMapping';
import { idleCycleIndex } from '../lib/idleCycle';
import { IDLE_CYCLE_MS } from '../kiosk-theme/motion';
import { IDLE_PROMPT } from '../content/i18n';
import { useLang } from '../i18n/language';

const BRAND_LOGO = '/kupu-logo-white.svg';

export interface IdleScreenProps {
  /** Species whose hero imagery the attract loop cycles through. */
  species: KioskSpecies[];
  /** Invoked on any touch / click to begin a session. */
  onStart: () => void;
}

/** Collect distinct hero image URLs from the species list. */
function collectImageUrls(species: KioskSpecies[]): string[] {
  const urls: string[] = [];
  for (const s of species) if (s.topPhotoUrl) urls.push(s.topPhotoUrl);
  for (const s of species) if (s.undersidePhotoUrl) urls.push(s.undersidePhotoUrl);
  return Array.from(new Set(urls));
}

/** Live HH:MM clock; null-first to avoid hydration mismatch. */
function IdleClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const label = now
    ? `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    : '--:--';
  return (
    <span suppressHydrationWarning className="font-mono text-lg font-semibold tabular-nums">
      {label}
    </span>
  );
}

export default function IdleScreen({ species, onStart }: IdleScreenProps) {
  const { lang, t } = useLang();
  const images = useMemo(() => collectImageUrls(species), [species]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => setTick((t) => t + 1), IDLE_CYCLE_MS);
    return () => clearInterval(interval);
  }, [images.length]);

  const currentIndex = idleCycleIndex(tick, images.length);
  const currentImage = images.length > 0 ? images[currentIndex] : null;

  return (
    <section
      role="button"
      tabIndex={0}
      aria-label={`${IDLE_PROMPT.id} / ${IDLE_PROMPT.en}`}
      onClick={onStart}
      onTouchStart={onStart}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStart();
        }
      }}
      className="relative flex h-full w-full cursor-pointer select-none flex-col items-center justify-center overflow-hidden bg-kiosk-green-900"
    >
      {/* Cycling hero imagery — dominant background (Req 3.2, 3.3) */}
      <div className="absolute inset-0">
        {currentImage ? (
          <motion.img
            key={currentImage}
            src={currentImage}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-br from-kiosk-green-400 via-kiosk-green-600 to-kiosk-green-900"
          />
        )}
        {/* Deep readability scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-kiosk-green-900 via-kiosk-green-900/70 to-kiosk-green-900/45"
        />
      </div>

      {/* Top status bar: location chip + clock */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-10 py-6 text-kiosk-on-green">
        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-kiosk-green-300" aria-hidden="true" />
          Situs Purbakala Pugung Raharjo
        </span>
        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-kiosk-green-300" />
          <IdleClock />
        </span>
      </div>

      {/* Center attract panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 flex max-w-3xl flex-col items-center px-8 text-center text-kiosk-on-green"
      >
        {/* Brand logo in a glowing ring */}
        <span className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-2xl backdrop-blur-md">
          <img src={BRAND_LOGO} alt="Eduwisata Polinator" className="h-16 w-16 object-contain" />
        </span>

        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-kiosk-green-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-kiosk-green-100">
          <Sparkles className="h-4 w-4" aria-hidden="true" /> Virtual Insektarium
        </span>

        <h1 className="font-heading text-5xl font-extrabold leading-[1.05] drop-shadow-lg sm:text-6xl lg:text-7xl">
          Eduwisata Polinator
        </h1>
        <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-white/80 sm:text-xl">
          {lang === 'id'
            ? 'Jelajahi keanekaragaman kupu-kupu dan perannya bagi ketahanan pangan di situs megalitik Pugung Raharjo.'
            : 'Explore butterfly biodiversity and its role in food security at the Pugung Raharjo megalithic site.'}
        </p>

        {/* Animated touch cue */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-10 flex items-center gap-3 rounded-2xl bg-kiosk-green-600 px-8 py-4 shadow-xl shadow-black/30"
        >
          <Hand className="h-7 w-7" aria-hidden="true" />
          <span className="text-2xl font-bold">{t(IDLE_PROMPT)}</span>
        </motion.div>
      </motion.div>

      {/* Footer credit */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center px-10 py-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50">
        Institut Teknologi Sumatera · Kemdiktisaintek RI
      </div>
    </section>
  );
}
