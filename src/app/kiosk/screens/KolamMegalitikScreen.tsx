/**
 * KolamMegalitikScreen - Screen 7 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio typography, elegant photo grid with white frames, and
 * organic white cards featuring soft shadow depth and distinct color accents.
 *
 * Kiosk layout contract: the screen fits the display exactly (`h-full` +
 * `min-h-0` + `flex-1`) so a visitor never has to discover a scrollbar on a
 * touch panel. The body is a 61.8/38.2 split - photographic evidence on the
 * left, its interpretation on the right - so both are on screen at once.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import { useState } from 'react';
import { Droplet, Mountain, Sparkles, type LucideIcon } from 'lucide-react';
import KioskImage from '../components/KioskImage';
import ScreenHeader from '../components/ScreenHeader';
import { StaggerList, StaggerItem } from '../components/ScreenEntrance';
import { KIOSK_ASSETS } from '../content/assets';
import {
  KOLAM_CONCEPTS,
  KOLAM_MEGALITIK_INTRO,
  KOLAM_MEGALITIK_TITLE,
  KOLAM_INFO_CARDS,
  type InfoCard
} from '../content/i18n';
import { useLang } from '../language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

const CONCEPT_ICONS: Record<string, LucideIcon> = {
  Droplet,
  Sparkles,
  Mountain,
};

/**
 * The three pool photographs, named by what they actually show. The mosaic
 * below is deliberately non-uniform, so each one is placed by hand rather than
 * mapped - a uniform grid is what left the odd third tile stranded before.
 */
const [POOL_DETAIL, POOL_VISITORS, POOL_WIDE] = KIOSK_ASSETS.scenes.kolam;

/** Shared frame styling for every photo in the mosaic. */
const PHOTO_FRAME =
  'group relative min-h-0 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.08)]';

export default function KolamMegalitikScreen() {
  const { t } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex h-full flex-col gap-[clamp(0.75rem,1.8vh,1.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={Droplet}
        eyebrow={{ id: 'Mata Air Suci', en: 'Sacred Spring' }}
        title={KOLAM_MEGALITIK_TITLE}
        description={KOLAM_MEGALITIK_INTRO}
      />

      {/* Body: photographic evidence (61.8%) beside its interpretation (38.2%). */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.5rem)] lg:grid-cols-[61.8fr_38.2fr]">
        {/* Photo mosaic. The wide establishing shot leads, the macro detail sits
            beneath it, and the portrait visitor shot anchors the full height of
            the right column - each photo in a cell matching its own aspect. */}
        <StaggerList
          className="grid min-h-0 grid-cols-[1.3fr_1fr] grid-rows-[1.1fr_1fr] gap-[clamp(0.5rem,0.9vw,1rem)]"
          delay={0.15}
        >
          <StaggerItem className={PHOTO_FRAME}>
            <KioskImage
              src={POOL_WIDE}
              alt="Kolam megalitik Pugung Raharjo dikelilingi hutan rimbun"
              hoverScale
              loading="eager"
              className="h-full w-full"
            />
          </StaggerItem>

          <StaggerItem className={`${PHOTO_FRAME} row-span-2`}>
            <KioskImage
              src={POOL_VISITORS}
              alt="Pengunjung merendam kaki di tepi kolam megalitik"
              hoverScale
              loading="eager"
              className="h-full w-full"
            />
          </StaggerItem>

          <StaggerItem className={PHOTO_FRAME}>
            <KioskImage
              src={POOL_DETAIL}
              alt="Ikan kecil dan bebatuan di dasar kolam yang jernih"
              hoverScale
              className="h-full w-full"
            />
          </StaggerItem>
        </StaggerList>

        {/* Three icon-led concept cards, stacked so each one stays readable at
            kiosk viewing distance instead of being squeezed into a column. */}
        <StaggerList className="flex min-h-0 flex-col gap-[clamp(0.5rem,0.9vw,1rem)]" delay={0.25}>
          {KOLAM_CONCEPTS.map((concept) => {
            const Icon = CONCEPT_ICONS[concept.icon] ?? Droplet;
            const card = KOLAM_INFO_CARDS.find((c) => c.key === concept.key);

            return (
              <StaggerItem key={concept.key} className="flex min-h-0 flex-1 list-none">
                <ClickableCard
                  onClick={() => card && setInfoCard(card)}
                  ariaLabel={card ? t(card.title) : undefined}
                  className="group relative flex h-full w-full items-start gap-[clamp(0.75rem,1.1vw,1.25rem)] overflow-hidden rounded-[1.5rem] border border-kiosk-orange-200/70 bg-white p-[clamp(0.9rem,1.3vw,1.5rem)] shadow-[0_8px_30px_rgba(30,51,40,0.05)] transition-transform duration-200 active:scale-[0.99]"
                >
                  {card && <InfoHotspot onClick={() => setInfoCard(card)} />}

                  <span className="flex h-[clamp(2.75rem,3.4vw,3.5rem)] w-[clamp(2.75rem,3.4vw,3.5rem)] shrink-0 items-center justify-center rounded-full bg-kiosk-orange-100 text-kiosk-orange-700">
                    <Icon className="h-[55%] w-[55%]" strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <div className="flex min-w-0 flex-col gap-1.5 pr-[3.25rem]">
                    <h3 className="font-serif text-[clamp(1.05rem,1.15vw,1.35rem)] font-medium leading-snug text-kiosk-ink">
                      {t(concept.title)}
                    </h3>
                    <p className="font-sans text-[clamp(0.95rem,1vw,1.15rem)] leading-relaxed text-kiosk-ink-muted">
                      {t(concept.description)}
                    </p>
                  </div>
                </ClickableCard>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </div>

      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
