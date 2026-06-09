'use client';

/**
 * MetamorfosisScreen — Screen 4 of the kiosk flow.
 *
 * A visual-first, single-language depiction of the four butterfly life stages
 * (egg → larva → pupa → imago) presented as a connected timeline: each stage
 * is a medallion card with its own accent color, an order number, a large
 * icon, a short description and a typical-duration chip, joined by chevrons
 * that convey the cyclical progression. A documentary scene banner anchors the
 * top and a closing "siklus berulang" note reinforces the loop.
 *
 * Stage order/labels come from `METAMORFOSIS_STAGES`; richer copy (description
 * + duration) is provided locally. Styling uses ONLY the bright-green kiosk
 * design tokens.
 *
 * Requirements: 9.1, 9.2
 */

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
  type Caption,
  type MetamorphosisStage,
} from '../content/i18n';
import { useLang } from '../i18n/language';

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
    ring: 'from-kiosk-green-300 to-kiosk-green-500',
    badge: 'bg-kiosk-green-500',
    description: {
      id: 'Telur mungil diletakkan menempel pada daun tanaman inang.',
      en: 'Tiny eggs are laid, attached to the leaves of a host plant.',
    },
    duration: { id: '3–5 hari', en: '3–5 days' },
  },
  larva: {
    icon: Leaf,
    ring: 'from-kiosk-green-400 to-kiosk-green-600',
    badge: 'bg-kiosk-green-600',
    description: {
      id: 'Ulat rakus memakan daun, tumbuh pesat dan berganti kulit.',
      en: 'The caterpillar eats voraciously, growing fast and molting.',
    },
    duration: { id: '2–4 minggu', en: '2–4 weeks' },
  },
  pupa: {
    icon: CircleDot,
    ring: 'from-kiosk-accent-teal to-kiosk-green-700',
    badge: 'bg-kiosk-green-700',
    description: {
      id: 'Dalam kepompong, tubuh ulat berubah total menjadi kupu-kupu.',
      en: 'Inside the chrysalis, the body fully transforms into a butterfly.',
    },
    duration: { id: '1–2 minggu', en: '1–2 weeks' },
  },
  imago: {
    icon: Bug,
    ring: 'from-kiosk-green-500 to-kiosk-green-800',
    badge: 'bg-kiosk-green-800',
    description: {
      id: 'Kupu-kupu dewasa muncul, siap terbang dan menyerbuki bunga.',
      en: 'The adult butterfly emerges, ready to fly and pollinate flowers.',
    },
    duration: { id: '2–4 minggu', en: '2–4 weeks' },
  },
};

export default function MetamorfosisScreen() {
  const { t, lang } = useLang();

  return (
    <section className="flex h-full w-full flex-col gap-7 px-8 py-8">
      {/* Heading */}
      <header className="flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-kiosk-green-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-kiosk-green-700">
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Metamorfosis Sempurna' : 'Complete Metamorphosis'}
        </span>
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(METAMORFOSIS_TITLE)}
        </h2>
        <p className="max-w-2xl text-base text-kiosk-ink-muted">
          {lang === 'id'
            ? 'Empat tahap menakjubkan dari telur hingga kupu-kupu dewasa penyerbuk.'
            : 'Four remarkable stages from egg to a pollinating adult butterfly.'}
        </p>
      </header>

      {/* Connected stage timeline */}
      <div className="flex flex-1 flex-wrap items-stretch justify-center gap-2 lg:flex-nowrap">
        {METAMORFOSIS_STAGES.map(({ stage, label }, index) => {
          const detail = STAGE_DETAILS[stage];
          const Icon = detail.icon;
          const isLast = index === METAMORFOSIS_STAGES.length - 1;

          return (
            <div key={stage} className="flex flex-1 items-center">
              <article className="group flex h-full w-full flex-col items-center gap-4 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface p-6 text-center shadow-sm transition-transform hover:-translate-y-1">
                {/* Medallion with number badge */}
                <div className="relative">
                  <span
                    className={`flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${detail.ring} text-kiosk-on-green shadow-lg`}
                  >
                    <Icon className="h-16 w-16" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span
                    className={`absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full ${detail.badge} text-lg font-extrabold text-kiosk-on-green ring-4 ring-kiosk-surface`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Stage label */}
                <h3 className="text-2xl font-bold leading-tight text-kiosk-ink">
                  {t(label)}
                </h3>

                {/* Description */}
                <p className="text-sm leading-snug text-kiosk-ink-muted">
                  {t(detail.description)}
                </p>

                {/* Duration chip */}
                <span className="mt-auto inline-flex items-center rounded-full bg-kiosk-green-100 px-4 py-1.5 text-sm font-semibold text-kiosk-green-700">
                  {t(detail.duration)}
                </span>
              </article>

              {/* Connector chevron between stages (cycles back after the last) */}
              <span className="mx-1 hidden shrink-0 text-kiosk-green-500 lg:block">
                {isLast ? (
                  <RotateCw className="h-7 w-7" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-7 w-7" aria-hidden="true" />
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Documentary scene banner + closing note */}
      <div className="relative overflow-hidden rounded-3xl border border-kiosk-green-200 shadow-sm">
        <img
          src={KIOSK_ASSETS.scenes.metamorfosis}
          alt="Habitat kupu-kupu di Situs Pugung Raharjo"
          loading="lazy"
          decoding="async"
          className="h-40 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-kiosk-green-900/85 to-transparent px-8">
          <p className="max-w-md text-lg font-semibold text-kiosk-on-green">
            {lang === 'id'
              ? 'Siklus berulang — setiap kupu-kupu dewasa memulai kembali kehidupan baru.'
              : 'The cycle repeats — every adult butterfly begins a new life anew.'}
          </p>
        </div>
      </div>
    </section>
  );
}
