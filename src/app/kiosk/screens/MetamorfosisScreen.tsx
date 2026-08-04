'use client';

/**
 * MetamorfosisScreen - Screen 4 of the kiosk flow.
 *
 * The four stages are laid out as an actual cycle: stages sit at the four
 * compass points of a dashed ring, arrows in the corners carry the eye
 * clockwise, and the ring closes back on the egg. A left-to-right row of cards
 * read as a finite list with an end - which is the one thing metamorphosis is
 * not - and it also forced the last card off the edge of the display.
 *
 * Requirements: 9.1, 9.2
 */

import { useState } from 'react';
import {
  ArrowRight,
  Bug,
  CircleDot,
  Egg,
  Leaf,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import KioskImage from '../components/KioskImage';
import ScreenHeader from '../components/ScreenHeader';
import { StaggerList, StaggerItem } from '../components/ScreenEntrance';
import { KIOSK_ASSETS } from '../content/assets';
import {
  METAMORFOSIS_STAGES,
  METAMORFOSIS_TITLE,
  METAMORFOSIS_INTRO,
  METAMORFOSIS_INFO_CARDS,
  type Caption,
  type MetamorphosisStage,
  type InfoCard
} from '../content/i18n';
import { useLang } from '../i18n/language';
import ClickableCard from '../components/ClickableCard';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

/** Per-stage presentation: icon, accent token classes, description + duration. */
interface StageDetail {
  icon: LucideIcon;
  /** Circle/medallion background gradient classes. */
  ring: string;
  /** Number badge background. */
  badge: string;
  description: Caption;
  duration: Caption;
}

const STAGE_DETAILS: Record<MetamorphosisStage, StageDetail> = {
  egg: {
    icon: Egg,
    ring: 'from-kiosk-accent-amber/80 to-kiosk-accent-amber',
    badge: 'bg-kiosk-accent-amber',
    description: {
      id: 'Telur mungil diletakkan menempel pada daun tanaman inang.',
      en: 'Tiny eggs are laid, attached to the leaves of a host plant.',
    },
    duration: { id: '3–5 hari', en: '3–5 days' },
  },
  larva: {
    icon: Leaf,
    ring: 'from-kiosk-orange-400 to-kiosk-orange-500',
    badge: 'bg-kiosk-orange-500',
    description: {
      id: 'Ulat rakus memakan daun, tumbuh pesat dan berganti kulit.',
      en: 'The caterpillar eats voraciously, growing fast and molting.',
    },
    duration: { id: '2–4 minggu', en: '2–4 weeks' },
  },
  pupa: {
    icon: CircleDot,
    ring: 'from-kiosk-accent-teal/80 to-kiosk-accent-teal',
    badge: 'bg-kiosk-accent-teal',
    description: {
      id: 'Dalam kepompong, tubuh ulat berubah total menjadi kupu-kupu.',
      en: 'Inside the chrysalis, the body fully transforms into a butterfly.',
    },
    duration: { id: '1–2 minggu', en: '1–2 weeks' },
  },
  imago: {
    icon: Bug,
    ring: 'from-kiosk-orange-600 to-kiosk-orange-800',
    badge: 'bg-kiosk-orange-700',
    description: {
      id: 'Kupu-kupu dewasa muncul, siap terbang dan menyerbuki bunga.',
      en: 'The adult butterfly emerges, ready to fly and pollinate flowers.',
    },
    duration: { id: '2–4 minggu', en: '2–4 weeks' },
  },
};

/**
 * Grid placement per stage, walking clockwise from the top of the ring.
 * Index into `METAMORFOSIS_STAGES` order: egg, larva, pupa, imago.
 */
const STAGE_CELLS = [
  'col-start-2 row-start-1', // egg   - top
  'col-start-3 row-start-2', // larva - right
  'col-start-2 row-start-3', // pupa  - bottom
  'col-start-1 row-start-2', // imago - left
];

/**
 * The four corner arrows that carry the eye clockwise around the ring. Each
 * points along the path between the two stages it sits between.
 */
const CYCLE_ARROWS = [
  { cell: 'col-start-1 row-start-1', rotate: '-rotate-45' },   // imago → egg
  { cell: 'col-start-3 row-start-1', rotate: 'rotate-45' },    // egg   → larva
  { cell: 'col-start-3 row-start-3', rotate: 'rotate-[135deg]' }, // larva → pupa
  { cell: 'col-start-1 row-start-3', rotate: 'rotate-[225deg]' }, // pupa  → imago
];

export default function MetamorfosisScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex h-full w-full flex-col gap-[clamp(0.75rem,1.8vh,1.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={RotateCcw}
        eyebrow={{ id: 'Siklus Kehidupan', en: 'Life Cycle' }}
        title={METAMORFOSIS_TITLE}
        description={METAMORFOSIS_INTRO}
      />

      {/* The cycle itself. */}
      <StaggerList
        className="relative mx-auto grid min-h-0 w-full max-w-[80rem] flex-1 grid-cols-[1fr_1.05fr_1fr] grid-rows-[1fr_1.1fr_1fr] gap-[clamp(0.4rem,0.8vw,0.9rem)]"
        delay={0.15}
      >
        {/* Dashed ring the four stages sit on - the shape that says "cycle". */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-kiosk-orange-300"
        />

        {CYCLE_ARROWS.map(({ cell, rotate }) => (
          <div
            key={cell}
            aria-hidden="true"
            className={`${cell} pointer-events-none flex items-center justify-center`}
          >
            <ArrowRight
              className={`h-[clamp(1.5rem,2.6vw,2.5rem)] w-[clamp(1.5rem,2.6vw,2.5rem)] text-kiosk-orange-400 ${rotate}`}
              strokeWidth={2.5}
            />
          </div>
        ))}

        {METAMORFOSIS_STAGES.map(({ stage, label }, index) => {
          const detail = STAGE_DETAILS[stage];
          const Icon = detail.icon;
          const card = METAMORFOSIS_INFO_CARDS.find((c) => c.key === stage);

          return (
            <StaggerItem key={stage} className={`${STAGE_CELLS[index]} z-10 flex min-h-0`}>
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full w-full flex-col items-center justify-center gap-[clamp(0.25rem,0.6vh,0.55rem)] overflow-hidden rounded-[1.5rem] border-2 border-white bg-white p-[clamp(0.5rem,1vh,0.9rem)] text-center shadow-[0_8px_30px_rgba(30,51,40,0.06)] transition-transform duration-200 active:scale-[0.99]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}

                {/* Medallion. The step number sits on the LEFT so it can't
                    collide with the info button in the top-right corner. */}
                <div className="relative shrink-0">
                  <span
                    className={`flex h-[clamp(2.5rem,5.5vh,3.75rem)] w-[clamp(2.5rem,5.5vh,3.75rem)] items-center justify-center rounded-full bg-gradient-to-br ${detail.ring} text-white shadow-inner`}
                  >
                    <Icon className="h-[52%] w-[52%]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span
                    className={`absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full ${detail.badge} font-serif text-[0.9rem] font-bold text-white shadow-md ring-4 ring-white`}
                  >
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-[clamp(1rem,1.15vw,1.35rem)] font-semibold leading-tight text-kiosk-ink">
                  {t(label)}
                </h3>

                <p className="line-clamp-2 font-sans text-[clamp(0.85rem,0.9vw,1.05rem)] leading-snug text-kiosk-ink-muted">
                  {t(detail.description)}
                </p>

                <span className="inline-flex shrink-0 items-center rounded-full bg-kiosk-surface-tint px-3 py-1 font-sans text-[clamp(0.7rem,0.8vw,0.85rem)] font-bold uppercase tracking-widest text-kiosk-ink">
                  {t(detail.duration)}
                </span>
              </ClickableCard>
            </StaggerItem>
          );
        })}

        {/* Hub: the site photo, with the line that explains why this is drawn
            as a ring rather than a list. */}
        <div className="col-start-2 row-start-2 z-10 flex min-h-0 flex-col items-center justify-center gap-[clamp(0.3rem,0.9vh,0.8rem)]">
          {/* Explicit square size: an `aspect-square` box with only a max-height
              has no width basis to derive from here, so it collapsed to a dot. */}
          <div className="relative h-[clamp(5rem,14vh,10rem)] w-[clamp(5rem,14vh,10rem)] shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.12)]">
            <KioskImage
              src={KIOSK_ASSETS.scenes.metamorfosis}
              alt="Habitat kupu-kupu di Situs Pugung Raharjo"
              loading="eager"
              className="h-full w-full"
            />
          </div>
          <span className="max-w-[26ch] rounded-full border border-kiosk-orange-200 bg-kiosk-bg px-4 py-1.5 text-center font-sans text-[clamp(0.7rem,0.8vw,0.85rem)] font-bold uppercase leading-tight tracking-[0.16em] text-kiosk-orange-700">
            {lang === 'id'
              ? 'Imago bertelur - siklus dimulai lagi'
              : 'The adult lays eggs - the cycle begins again'}
          </span>
        </div>
      </StaggerList>

      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
