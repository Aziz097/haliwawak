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
import KioskImage from '../components/KioskImage';
import ScreenHeader from '../components/ScreenHeader';
import { StaggerList, StaggerItem } from '../components/ScreenEntrance';
import { KIOSK_ASSETS } from '../content/assets';
import {
  CALL_TO_ACTIONS,
  CALL_TO_ACTION_INTRO,
  CALL_TO_ACTION_TITLE,
  CALL_TO_ACTION_INFO_CARDS,
  COMING_SOON_ACTIONS,
  COMING_SOON_BADGE,
  type InfoCard
} from '../content/i18n';
import { useLang } from '../language';
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
    <section className="flex h-full flex-col gap-[clamp(0.75rem,1.8vh,1.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={Megaphone}
        eyebrow={{ id: 'Ambil Peran', en: 'Take Action' }}
        title={CALL_TO_ACTION_TITLE}
        description={CALL_TO_ACTION_INTRO}
      />

      {/* Scene pair: what taking part actually looks like on site. Leads the
          screen at full width - the two photos set the scene before the
          instructions, rather than trailing off the bottom edge. */}
      <StaggerList className="grid h-[clamp(9rem,26vh,17rem)] shrink-0 grid-cols-2 gap-[clamp(0.5rem,1vw,1.25rem)]" delay={0.1}>
        {KIOSK_ASSETS.scenes.callToAction.map((src, i) => (
          <StaggerItem key={src} className="min-h-0 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.06)]">
            <KioskImage
              src={src}
              alt={
                lang === 'id'
                  ? `Kegiatan konservasi di Situs Pugung Raharjo ${i + 1}`
                  : `Conservation activity at Pugung Raharjo Site ${i + 1}`
              }
              hoverScale
              loading="eager"
              className="h-full w-full"
            />
          </StaggerItem>
        ))}
      </StaggerList>

      {/* Five icon-led action cards, kept on one row so all five actions are
          visible at once rather than the last two falling below the fold. */}
      <StaggerList className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(0.5rem,1vw,1.25rem)] sm:grid-cols-3 lg:grid-cols-5" delay={0.15}>
        {CALL_TO_ACTIONS.map((action, idx) => {
          const Icon = ACTION_ICONS[action.icon] ?? Sprout;
          const card = CALL_TO_ACTION_INFO_CARDS.find((c) => c.key === action.key);
          
          const accentColors = [
            'text-kiosk-orange-600 bg-kiosk-orange-100',
            'text-kiosk-accent-teal bg-kiosk-accent-teal/10',
            'text-kiosk-accent-amber bg-kiosk-accent-amber/10',
          ];
          const accentClass = accentColors[idx % accentColors.length];

          // Announced but not yet live: the card stays readable and clickable
          // (its modal explains the wait) but drops the colour and lift that
          // signal an action a visitor can take right now.
          const comingSoon = COMING_SOON_ACTIONS.has(action.key);

          return (
            <StaggerItem key={action.key} className="flex min-h-0 list-none">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className={`group relative flex h-full w-full flex-col items-center justify-center gap-[clamp(0.5rem,1.4vh,1.25rem)] overflow-hidden rounded-[1.5rem] border-2 bg-white p-[clamp(0.75rem,1.6vh,1.5rem)] text-center transition-transform duration-200 active:scale-[0.99] ${
                  comingSoon
                    ? 'border-dashed border-kiosk-orange-200 shadow-none'
                    : 'border-white shadow-[0_8px_30px_rgba(30,51,40,0.04)]'
                }`}
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Dominant icon element. */}
                <span
                  className={`flex h-[clamp(2.75rem,6vh,4.5rem)] w-[clamp(2.75rem,6vh,4.5rem)] shrink-0 items-center justify-center rounded-full ${
                    comingSoon ? 'bg-kiosk-surface-tint text-kiosk-ink-muted' : accentClass
                  }`}
                >
                  <Icon className="h-[55%] w-[55%]" strokeWidth={1.5} aria-hidden="true" />
                </span>

                {comingSoon && (
                  <span className="-mb-1 inline-flex items-center rounded-full bg-kiosk-surface-tint px-3 py-1 font-sans text-[0.7rem] font-bold uppercase tracking-[0.18em] text-kiosk-ink-muted">
                    {t(COMING_SOON_BADGE)}
                  </span>
                )}

                {/* Single-language caption. */}
                <h3 className="line-clamp-2 font-serif text-[clamp(1rem,1.05vw,1.25rem)] font-medium leading-snug text-kiosk-ink">
                  {t(action.title)}
                </h3>

                {/* Supporting note. Clamped so one long action can't set the
                    height of the whole row - the info button on every card
                    opens the full text. */}
                <p className="line-clamp-3 font-sans text-[clamp(0.9rem,0.95vw,1.1rem)] leading-relaxed text-kiosk-ink-muted">
                  {t(action.note)}
                </p>
              </ClickableCard>
            </StaggerItem>
          );
        })}
      </StaggerList>

      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
