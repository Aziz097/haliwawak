'use client';

/**
 * MetamorfosisScreen - Screen 4 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Soft organic cards, golden ratio typography, warm accents 
 * (sunlit yellow, terracotta, soft sage), and spacious flow.
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
  RotateCw,
  type LucideIcon,
} from 'lucide-react';
import { KIOSK_ASSETS } from '../content/assets';
import {
  METAMORFOSIS_STAGES,
  METAMORFOSIS_TITLE,
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
    ring: 'from-kiosk-green-400 to-kiosk-green-500',
    badge: 'bg-kiosk-green-500',
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
    ring: 'from-kiosk-green-600 to-kiosk-green-800',
    badge: 'bg-kiosk-green-700',
    description: {
      id: 'Kupu-kupu dewasa muncul, siap terbang dan menyerbuki bunga.',
      en: 'The adult butterfly emerges, ready to fly and pollinate flowers.',
    },
    duration: { id: '2–4 minggu', en: '2–4 weeks' },
  },
};

export default function MetamorfosisScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);

  return (
    <section className="flex h-full w-full flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Heading */}
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Siklus Kehidupan' : 'Life Cycle'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(METAMORFOSIS_TITLE)}
        </h2>
        <p className="max-w-2xl font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
          {lang === 'id'
            ? 'Empat tahap menakjubkan dari telur hingga kupu-kupu dewasa penyerbuk.'
            : 'Four remarkable stages from egg to a pollinating adult butterfly.'}
        </p>
      </header>

      {/* Connected stage timeline */}
      <div className="flex flex-1 flex-wrap items-stretch justify-center gap-4 lg:flex-nowrap">
        {METAMORFOSIS_STAGES.map(({ stage, label }, index) => {
          const detail = STAGE_DETAILS[stage];
          const Icon = detail.icon;
          const isLast = index === METAMORFOSIS_STAGES.length - 1;
          const card = METAMORFOSIS_INFO_CARDS.find((c) => c.key === stage);

          return (
            <div key={stage} className="flex flex-1 items-center">
              <ClickableCard
                onClick={() => card && setInfoCard(card)}
                ariaLabel={card ? t(card.title) : undefined}
                className="group relative flex h-full w-full flex-col items-center gap-5 rounded-[2rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                {/* Medallion with number badge */}
                <div className="relative mb-2">
                  <span
                    className={`flex h-[6rem] w-[6rem] items-center justify-center rounded-full bg-gradient-to-br ${detail.ring} text-white shadow-inner transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span
                    className={`absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full ${detail.badge} font-serif text-[1rem] font-bold text-white shadow-md ring-4 ring-white`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Stage label */}
                <h3 className="font-serif text-[1.618rem] font-semibold leading-tight text-kiosk-ink">
                  {t(label)}
                </h3>

                {/* Description */}
                <p className="font-sans text-[0.9rem] leading-relaxed text-kiosk-ink-muted">
                  {t(detail.description)}
                </p>

                {/* Duration chip */}
                <span className="mt-auto inline-flex items-center rounded-full bg-kiosk-surface-tint px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-widest text-kiosk-ink">
                  {t(detail.duration)}
                </span>
              </ClickableCard>

              {/* Connector chevron between stages */}
              <span className="mx-2 hidden shrink-0 text-kiosk-green-300 lg:block">
                {isLast ? (
                  <RotateCw className="h-8 w-8 opacity-50" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-8 w-8 opacity-50" aria-hidden="true" />
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Documentary scene banner + closing note */}
      <div className="relative overflow-hidden rounded-[2.618rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.06)]">
        <img
          src={KIOSK_ASSETS.scenes.metamorfosis}
          alt="Habitat kupu-kupu di Situs Pugung Raharjo"
          loading="lazy"
          decoding="async"
          className="h-72 w-full object-cover sm:h-96"
        />
        {/* Soft Organic Overlay instead of harsh black gradient */}
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-kiosk-ink/90 via-kiosk-ink/50 to-transparent px-10">
          <p className="max-w-md font-serif text-[1.618rem] italic text-white drop-shadow-md">
            {lang === 'id'
              ? '"Siklus berulang - setiap kupu-kupu dewasa memulai kembali kehidupan baru."'
              : '"The cycle repeats - every adult butterfly begins a new life anew."'}
          </p>
        </div>
      </div>
      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
