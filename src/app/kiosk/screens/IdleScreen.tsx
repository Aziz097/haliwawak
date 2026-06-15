'use client';

/**
 * IdleScreen - the attract / screensaver state of the kiosk (Screen 0, IDLE).
 *
 * Designed with a "Bright Organic Heritage" aesthetic:
 * Golden ratio typography and layout (38.2% / 61.8%). Warm parchment background,
 * deep forest text, sunlit yellow and terracotta accents. Elegant and airy.
 *
 * Requirements: 3.2, 3.3, 3.5, 3.6
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, MapPin, Sparkles } from 'lucide-react';
import type { KioskSpecies } from '../lib/speciesMapping';
import { idleCycleIndex } from '../lib/idleCycle';
import { IDLE_CYCLE_MS } from '../kiosk-theme/motion';
import { IDLE_PROMPT } from '../content/i18n';
import { useLang } from '../i18n/language';

const BRAND_LOGO = '/kupu2-logo-black.svg'; // Use the dark logo for the light background

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

/** Soft elegant clock. */
function IdleClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  
  if (!now) return <span className="font-serif text-[1.618rem] text-kiosk-ink-muted">--:--</span>;
  
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');

  return (
    <span suppressHydrationWarning className="font-serif text-[1.618rem] italic text-kiosk-ink-muted">
      {h}:{m}
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
      className="relative flex h-full w-full cursor-pointer select-none overflow-hidden bg-kiosk-bg text-kiosk-ink"
    >
      {/* Golden Ratio Right Panel (61.8% width): Breathing Hero Imagery */}
      <div className="absolute right-0 top-0 z-10 h-full w-[61.8%] overflow-hidden rounded-l-[40px] shadow-2xl">
        <AnimatePresence mode="wait">
          {currentImage ? (
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={currentImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
              {/* Soft vignette for text legibility if needed, though text is on the left */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
            </motion.div>
          ) : (
            <div className="h-full w-full bg-kiosk-green-100" />
          )}
        </AnimatePresence>
      </div>

      {/* Golden Ratio Left Panel (38.2% width): Airy Typography & Content */}
      <div className="absolute left-0 top-0 z-20 flex h-full w-[38.2%] flex-col justify-between px-[2.618rem] py-[4.236rem]">
        
        {/* Top: Location & Clock */}
        <div className="flex flex-col gap-[1.618rem]">
          <div className="flex items-center gap-4">
            <img src={BRAND_LOGO} alt="Logo" className="h-12 w-12 object-contain opacity-80" />
            <IdleClock />
          </div>
          <div className="flex items-center gap-2 text-kiosk-accent-teal">
            <MapPin className="h-5 w-5" />
            <span className="font-sans text-[1rem] font-medium tracking-wide">
              Situs Purbakala Pugung Raharjo
            </span>
          </div>
        </div>

        {/* Center: Main Titles (Golden Ratio Scaling) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-start gap-[1.618rem]"
        >
          <span className="flex items-center gap-2 rounded-full border border-kiosk-accent-amber/30 bg-kiosk-accent-amber/10 px-4 py-1.5 font-sans text-[1rem] font-semibold text-kiosk-accent-amber">
            <Sparkles className="h-4 w-4" /> Virtual Insektarium
          </span>

          <h1 className="font-serif text-[4.236rem] leading-[1.05] tracking-tight text-kiosk-ink">
            Eduwisata<br/>
            <span className="italic text-kiosk-green-700">Polinator.</span>
          </h1>

          <p className="max-w-md font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
            {lang === 'id'
              ? 'Jelajahi keanekaragaman kupu-kupu dan perannya bagi ketahanan pangan di situs megalitik Pugung Raharjo.'
              : 'Explore butterfly biodiversity and its role in food security at the Pugung Raharjo megalithic site.'}
          </p>
        </motion.div>

        {/* Bottom: Gentle Touch Prompt */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex w-max items-center gap-3 rounded-full bg-kiosk-green-700 px-[1.618rem] py-[1rem] text-kiosk-on-green shadow-lg transition-transform hover:scale-105 hover:bg-kiosk-green-800"
        >
          <Hand className="h-6 w-6" />
          <span className="font-sans text-[1rem] font-semibold tracking-wide">{t(IDLE_PROMPT)}</span>
        </motion.div>
        
        {/* Footer info inside the left panel */}
        <div className="absolute bottom-[1rem] left-[2.618rem] font-sans text-[0.7rem] uppercase tracking-widest text-kiosk-ink-muted/50">
          Institut Teknologi Sumatera · Kemdiktisaintek RI
        </div>
      </div>
    </section>
  );
}

