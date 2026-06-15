/**
 * KolamMegalitikScreen - Screen 7 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio typography, elegant photo grid with white frames, and 
 * organic white cards featuring soft shadow depth and distinct color accents.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import { useState } from 'react';
import { Droplet, Mountain, Sparkles, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import { KIOSK_ASSETS } from '../content/assets';
import {
  KOLAM_CONCEPTS,
  KOLAM_MEGALITIK_INTRO,
  KOLAM_MEGALITIK_TITLE,
  KOLAM_INFO_CARDS,
  type InfoCard
} from '../content/i18n';
import { useLang } from '../i18n/language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

const CONCEPT_ICONS: Record<string, LucideIcon> = {
  Droplet,
  Sparkles,
  Mountain,
};

export default function KolamMegalitikScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Screen heading + framing caption. */}
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">
          <Droplet className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Mata Air Suci' : 'Sacred Spring'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(KOLAM_MEGALITIK_TITLE)}
        </h2>
        <p className="max-w-3xl font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
          {t(KOLAM_MEGALITIK_INTRO)}
        </p>
      </header>

      {/* Megalithic pool scene photos. */}
      <div className="grid grid-cols-1 gap-[1.618rem] sm:grid-cols-2">
        {KIOSK_ASSETS.scenes.kolam.map((src, i) => (
          <div
            key={src}
            className="aspect-video overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.06)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.1)]"
          >
            <img
              src={src}
              alt={`Kolam Megalitik Pugung Raharjo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
        ))}
      </div>

      {/* Three icon-led concept blocks. */}
      <ul className="grid grid-cols-1 gap-[1.618rem] lg:grid-cols-3">
        {KOLAM_CONCEPTS.map((concept, idx) => {
          const Icon = CONCEPT_ICONS[concept.icon] ?? Droplet;
          const card = KOLAM_INFO_CARDS.find((c) => c.key === concept.key);
          
          const accentColors = [
            'text-kiosk-accent-teal bg-kiosk-accent-teal/10',
            'text-kiosk-accent-amber bg-kiosk-accent-amber/10',
            'text-kiosk-green-600 bg-kiosk-green-100'
          ];
          const accentClass = accentColors[idx % accentColors.length];

          return (
            <li key={concept.key} className="list-none">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full flex-col items-center gap-6 rounded-[2rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Dominant icon element. */}
                <span className={`flex h-[5rem] w-[5rem] items-center justify-center rounded-full ${accentClass} transition-transform duration-500 group-hover:scale-105`}>
                  <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                </span>

                {/* Concept title. */}
                <Caption caption={concept.title} size="md" align="center" />

                {/* Supporting description. */}
                <p className="font-sans text-[0.9rem] leading-relaxed text-kiosk-ink-muted">
                  {t(concept.description)}
                </p>
              </ClickableCard>
            </li>
          );
        })}
      </ul>
      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
