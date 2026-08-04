/**
 * KetahananPanganScreen - Screen 6 of the kiosk flow.
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
import KioskImage from '../components/KioskImage';
import { FadeUp, StaggerList, StaggerItem } from '../components/ScreenEntrance';
import ScreenHeader from '../components/ScreenHeader';
import { KIOSK_ASSETS } from '../content/assets';
import {
  FOOD_SECURITY,
  KETAHANAN_PANGAN_TITLE,
  KETAHANAN_PANGAN_INTRO,
  FOOD_SECURITY_INFO_CARDS,
  type InfoCard,
} from '../content/i18n';
import { sci } from '../content/sci';
import { useLang } from '../i18n/language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

const SECTION_ICONS: Record<string, LucideIcon> = {
  Sprout,
  ShieldCheck,
};

export default function KetahananPanganScreen() {
  const { t } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex h-full flex-col gap-[clamp(0.75rem,1.8vh,1.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={Sprout}
        eyebrow={{ id: 'Sinergi Alam', en: 'Natural Synergy' }}
        title={KETAHANAN_PANGAN_TITLE}
        description={KETAHANAN_PANGAN_INTRO}
      />

      {/* Scene banner: pollinators at work around the site. The flex sizing
          has to live on the FadeUp wrapper itself - on an inner child there is
          no flex parent for `flex-1` to resolve against, so the banner
          collapsed to zero height and the photo silently vanished. */}
      {/* The banner is itself a flex row so the image stretches to its height.
          `h-full` cannot do that job here: a percentage height does not resolve
          against a flex item whose basis is 0, which is why the wrapper
          measured zero and the photo never appeared. */}
      <FadeUp
        delay={0.1}
        className="relative flex h-[clamp(9rem,24vh,16rem)] shrink-0 overflow-hidden rounded-[2.618rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.06)]"
      >
        <KioskImage
          src={KIOSK_ASSETS.scenes.ketahananPangan}
          alt="Kupu-kupu penyerbuk di sekitar ladang Situs Pugung Raharjo"
          imgClassName="object-center"
          className="w-full"
        />
      </FadeUp>

      {/* Two icon-led food-security sections. */}
      <StaggerList className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.618rem)] lg:grid-cols-2" delay={0.2}>
        {FOOD_SECURITY.map((section, idx) => {
          const Icon = SECTION_ICONS[section.icon] ?? Sprout;
          const card = FOOD_SECURITY_INFO_CARDS.find((c) => c.key === section.key);
          // Alternate accent colors for the two cards
          const accentClass = idx === 0 ? 'text-kiosk-accent-amber bg-kiosk-accent-amber/10' : 'text-kiosk-orange-600 bg-kiosk-orange-100';

          return (
            <StaggerItem key={section.key} className="list-none">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full flex-col items-center justify-center gap-[clamp(0.5rem,1.4vh,1.25rem)] rounded-[2rem] border-2 border-white bg-white p-[clamp(1rem,2vh,2rem)] text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform duration-200 active:scale-[0.99]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Dominant icon element. */}
                <span className={`flex h-[clamp(3rem,7vh,6rem)] w-[clamp(3rem,7vh,6rem)] shrink-0 items-center justify-center rounded-full ${accentClass}`}>
                  <Icon className="h-[55%] w-[55%]" strokeWidth={1.5} aria-hidden="true" />
                </span>

                {/* Section title - single-language caption. */}
                <Caption caption={section.title} size="md" align="center" />

                {/* Key species line. Not uppercased: scientific names carry
                    meaning in their casing (genus capitalised, epithet not),
                    and uppercasing would destroy it. */}
                <p className="font-sans text-[0.95rem] font-bold tracking-wide text-kiosk-orange-700">
                  {sci(t(section.keySpecies))}
                </p>

                {/* Supporting description. */}
                <p className="font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
                  {sci(t(section.description))}
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
