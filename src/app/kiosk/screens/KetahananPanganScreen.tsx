/**
 * KetahananPanganScreen — Screen 6 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Spacious layouts, golden ratio serif typography, and elegant 
 * soft-shadow white cards that bring out the bright natural palette.
 *
 * Requirements: 11.1, 11.2
 */

import { useState } from 'react';
import { ShieldCheck, Sprout, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import { KIOSK_ASSETS } from '../content/assets';
import { FOOD_SECURITY, KETAHANAN_PANGAN_TITLE, FOOD_SECURITY_INFO_CARDS, type InfoCard } from '../content/i18n';
import { useLang } from '../i18n/language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

const SECTION_ICONS: Record<string, LucideIcon> = {
  Sprout,
  ShieldCheck,
};

export default function KetahananPanganScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Screen heading. */}
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-accent-amber/30 bg-kiosk-accent-amber/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-amber">
          <Sprout className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Sinergi Alam' : 'Natural Synergy'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(KETAHANAN_PANGAN_TITLE)}
        </h2>
      </header>

      {/* Scene banner: pollinators at work around the site. */}
      <div className="relative overflow-hidden rounded-[2.618rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.06)]">
        <img
          src={KIOSK_ASSETS.scenes.ketahananPangan}
          alt="Kupu-kupu penyerbuk di sekitar ladang Situs Pugung Raharjo"
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover mix-blend-multiply sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kiosk-green-900/40 to-transparent" />
      </div>

      {/* Two icon-led food-security sections. */}
      <ul className="grid grid-cols-1 gap-[1.618rem] lg:grid-cols-2">
        {FOOD_SECURITY.map((section, idx) => {
          const Icon = SECTION_ICONS[section.icon] ?? Sprout;
          const card = FOOD_SECURITY_INFO_CARDS.find((c) => c.key === section.key);
          // Alternate accent colors for the two cards
          const accentClass = idx === 0 ? 'text-kiosk-accent-amber bg-kiosk-accent-amber/10' : 'text-kiosk-green-600 bg-kiosk-green-100';

          return (
            <li key={section.key} className="list-none">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full flex-col items-center gap-6 rounded-[2rem] border-2 border-white bg-white p-10 text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Dominant icon element. */}
                <span className={`flex h-[6rem] w-[6rem] items-center justify-center rounded-full ${accentClass} transition-transform duration-500 group-hover:scale-105`}>
                  <Icon className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                </span>

                {/* Section title — single-language caption. */}
                <Caption caption={section.title} size="md" align="center" />

                {/* Key species line. */}
                <p className="font-sans text-[0.9rem] font-bold uppercase tracking-widest text-kiosk-green-700">
                  {t(section.keySpecies)}
                </p>

                {/* Supporting description. */}
                <p className="font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
                  {t(section.description)}
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
