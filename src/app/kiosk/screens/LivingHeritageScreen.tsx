'use client';

/**
 * LivingHeritageScreen — Screen 1, the opening / hero screen of the kiosk flow.
 *
 * Visual-first: a large hero image is the DOMINANT visual element, overlaid
 * with the bilingual "The Living Heritage" intro caption (Indonesian primary,
 * English secondary) sourced from `content/i18n.ts`. If the hero asset is
 * missing, a token-colored bright-green gradient block stands in so the screen
 * never shows a broken-image box.
 *
 * Styling uses ONLY the bright-green kiosk design tokens (no raw hex / legacy
 * palette). The hero uses a plain <img /> per the kiosk image strategy.
 * `'use client'` is required because it uses framer-motion.
 *
 * Requirements: 7.1, 7.2, 7.3
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LIVING_HERITAGE_TITLE,
  LIVING_HERITAGE_INTRO,
} from '../content/i18n';
import { KIOSK_ASSETS } from '../content/assets';
import { fadeUp, stagger } from '../kiosk-theme/motion';
import { useLang } from '../i18n/language';
import Caption from '../components/Caption';

export interface LivingHeritageScreenProps {
  /**
   * URL of the hero image. Defaults to a sensible placeholder path served from
   * the uploads pipeline. When the image fails to load, a token-colored
   * gradient block is shown instead.
   */
  heroImageUrl?: string;
}

/** Default hero asset path (organized kiosk scene; falls back to a gradient block). */
const DEFAULT_HERO_IMAGE = KIOSK_ASSETS.scenes.livingHeritage[0];

/**
 * The opening screen: a dominant hero image with the bilingual Living Heritage
 * introduction overlaid at the bottom.
 */
export default function LivingHeritageScreen({
  heroImageUrl = DEFAULT_HERO_IMAGE,
}: LivingHeritageScreenProps) {
  const { t } = useLang();
  const [imageOk, setImageOk] = useState(true);

  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-kiosk-bg">
      {/* Hero — dominant visual element (Req 7.3) */}
      <div className="absolute inset-0">
        {imageOk ? (
          <img
            src={heroImageUrl}
            alt={LIVING_HERITAGE_TITLE.id}
            className="h-full w-full object-cover"
            onError={() => setImageOk(false)}
          />
        ) : (
          // Token-colored bright-green gradient placeholder (Req 2.x tokens only)
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-br from-kiosk-green-300 via-kiosk-green-500 to-kiosk-green-800"
          />
        )}
        {/* Readability scrim so the overlaid caption keeps >=4.5:1 contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-kiosk-green-900/85 via-kiosk-green-900/35 to-transparent"
        />
      </div>

      {/* Intro caption overlay (Req 7.2) */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 mt-auto flex flex-col gap-4 p-10 sm:p-14 lg:p-20"
      >
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl text-5xl font-extrabold leading-tight text-kiosk-on-green drop-shadow-sm sm:text-6xl lg:text-7xl"
        >
          {t(LIVING_HERITAGE_TITLE)}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="max-w-3xl rounded-2xl bg-kiosk-surface/95 p-6 shadow-lg backdrop-blur-sm sm:p-8"
        >
          {/* Bilingual intro on a light surface panel: the Caption component
              renders ID primary then EN secondary with ink tokens that keep
              >=4.5:1 contrast on the surface (Req 7.2). */}
          <Caption caption={LIVING_HERITAGE_INTRO} size="lg" />
        </motion.div>
      </motion.div>
    </section>
  );
}
