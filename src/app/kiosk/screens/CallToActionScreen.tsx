/**
 * CallToActionScreen - Screen 8 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio typography, warm parchment background, and a 
 * beautifully spaced grid of 5 action cards featuring soft shadows 
 * and organic accent colors.
 *
 * Requirements: 13.1, 13.2
 */

import { useState } from 'react';
import { Ban, Camera, Droplets, QrCode, Sprout, Megaphone, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import {
  CALL_TO_ACTIONS,
  CALL_TO_ACTION_INTRO,
  CALL_TO_ACTION_TITLE,
  CALL_TO_ACTION_INFO_CARDS,
  type InfoCard
} from '../content/i18n';
import { useLang } from '../i18n/language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

const ACTION_ICONS: Record<string, LucideIcon> = {
  Sprout,
  Ban,
  Camera,
  Droplets,
  QrCode,
};

export default function CallToActionScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Screen heading + short intro. */}
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-accent-amber/30 bg-kiosk-accent-amber/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-amber">
          <Megaphone className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Ambil Peran' : 'Take Action'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(CALL_TO_ACTION_TITLE)}
        </h2>
        <p className="max-w-3xl font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
          {t(CALL_TO_ACTION_INTRO)}
        </p>
      </header>

      {/* Five icon-led action cards. */}
      <ul className="grid grid-cols-1 gap-[1.618rem] sm:grid-cols-2 lg:grid-cols-3">
        {CALL_TO_ACTIONS.map((action, idx) => {
          const Icon = ACTION_ICONS[action.icon] ?? Sprout;
          const card = CALL_TO_ACTION_INFO_CARDS.find((c) => c.key === action.key);
          
          const accentColors = [
            'text-kiosk-green-600 bg-kiosk-green-100',
            'text-kiosk-accent-teal bg-kiosk-accent-teal/10',
            'text-kiosk-accent-amber bg-kiosk-accent-amber/10',
          ];
          const accentClass = accentColors[idx % accentColors.length];

          return (
            <li key={action.key} className="list-none">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full flex-col items-center gap-6 rounded-[2rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Dominant icon element. */}
                <span className={`flex h-[6rem] w-[6rem] items-center justify-center rounded-full ${accentClass} transition-transform duration-500 group-hover:scale-105`}>
                  <Icon className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                </span>

                {/* Single-language caption. */}
                <Caption caption={action.title} size="md" align="center" />

                {/* Supporting note. */}
                <p className="font-sans text-[0.9rem] leading-relaxed text-kiosk-ink-muted">
                  {t(action.note)}
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
