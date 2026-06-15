'use client';

/**
 * LivingHeritageScreen — Screen 1, the opening / hero screen of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Editorial/museum layout using the Golden Ratio (61.8% image / 38.2% text).
 * The image stands proudly without dark overlays, while the text panel 
 * breathes on a warm parchment canvas with elegant typography.
 *
 * Requirements: 7.1, 7.2, 7.3
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
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
 * introduction offset in an elegant side panel.
 */
export default function LivingHeritageScreen({
  heroImageUrl = DEFAULT_HERO_IMAGE,
}: LivingHeritageScreenProps) {
  const { t } = useLang();
  const [imageOk, setImageOk] = useState(true);

  return (
    <section className="relative flex h-full w-full overflow-hidden bg-kiosk-bg text-kiosk-ink">
      {/* Golden Ratio Left Panel (61.8% width): Breathing Hero Imagery */}
      <div className="relative z-10 h-full w-[61.8%] overflow-hidden rounded-r-[40px] shadow-[20px_0_40px_rgba(30,51,40,0.05)]">
        {imageOk ? (
          <img
            src={heroImageUrl}
            alt={t(LIVING_HERITAGE_TITLE)}
            className="h-full w-full object-cover"
            onError={() => setImageOk(false)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-kiosk-green-100"
          />
        )}
      </div>

      {/* Golden Ratio Right Panel (38.2% width): Airy Typography & Content */}
      <div className="relative z-20 flex h-full w-[38.2%] flex-col justify-center px-[4.236rem] py-10">
        
        {/* Editorial Content Block */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-start gap-[2.618rem]"
        >
          {/* Subtle Motif */}
          <motion.div variants={fadeUp} className="flex h-16 w-16 items-center justify-center rounded-full bg-kiosk-surface-tint text-kiosk-accent-teal shadow-inner">
            <Landmark className="h-8 w-8" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-[4.236rem] leading-[1.05] tracking-tight text-kiosk-ink"
          >
            {t(LIVING_HERITAGE_TITLE)}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="border-l-2 border-kiosk-accent-amber/40 pl-[1.618rem]"
          >
            {/* Bilingual intro on a warm panel: the Caption component
                renders ID primary then EN secondary (Req 7.2). */}
            <Caption caption={LIVING_HERITAGE_INTRO} size="md" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
