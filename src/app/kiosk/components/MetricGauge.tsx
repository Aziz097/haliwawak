'use client';

/**
 * Visual-first ecological metric gauge.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio serif typography for the data value, soft tracks,
 * and elegant pill badges for categories.
 *
 * Requirements: 10.4, 10.5
 */

import React from 'react';
import { Caption } from './Caption';
import type { Caption as CaptionType } from '../content/i18n';
import { useLang } from '../i18n/language';

export interface MetricGaugeProps {
  /** The metric value to display prominently (e.g. "2,77" or "0,00 – 0,13"). */
  value: string;
  /** Bilingual label for the metric (e.g. Diversity Index H′). */
  label: CaptionType;
  /** Bilingual qualitative category (e.g. Sedang / Moderate). */
  category: CaptionType;
}

/**
 * Maps a qualitative category (in Indonesian or English) to a fill fraction
 * in `[0, 1]` for the radial indicator.
 */
function categoryToFraction(category: CaptionType): number {
  const text = `${category.id} ${category.en}`.toLowerCase();
  if (/(rendah|low)/.test(text)) return 0.2;
  if (/(sedang|moderate|medium)/.test(text)) return 0.55;
  if (/(tinggi|high)/.test(text)) return 0.9;
  return 0.5;
}

/** Radial SVG gauge with the value at its center. */
function RadialGauge({ value, fraction }: { value: string; fraction: number }) {
  const size = 220; // Slightly larger for airy feel
  const stroke = 12; // Thinner, more elegant stroke
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, fraction));
  const filled = clamped * circumference;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-[13.75rem] w-[13.75rem]"
      role="img"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        className="stroke-kiosk-surface-tint"
      />
      {/* Filled arc — starts at 12 o'clock */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="stroke-kiosk-accent-amber"
      />
      {/* Center value */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-kiosk-ink font-serif text-[2.618rem] font-semibold"
      >
        {value}
      </text>
    </svg>
  );
}

interface GaugeBoundaryProps {
  /** Text-only fallback rendered when the visual gauge fails to render. */
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface GaugeBoundaryState {
  hasError: boolean;
}

/** Error boundary guarding the radial gauge. */
class GaugeBoundary extends React.Component<GaugeBoundaryProps, GaugeBoundaryState> {
  constructor(props: GaugeBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): GaugeBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Renders the metric as a radial gauge (dominant) plus an always-present
 * bilingual text layer.
 */
export function MetricGauge({ value, label, category }: MetricGaugeProps) {
  const { t } = useLang();
  const fraction = categoryToFraction(category);

  const textFallback = (
    <div className="flex h-[13.75rem] w-[13.75rem] items-center justify-center rounded-full bg-kiosk-surface-tint shadow-inner">
      <span className="px-4 text-center font-serif text-[2.618rem] font-semibold text-kiosk-ink">
        {value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 rounded-[2rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]">
      {/* Dominant visual indicator, guarded by an error boundary. */}
      <GaugeBoundary fallback={textFallback}>
        <RadialGauge value={value} fraction={fraction} />
      </GaugeBoundary>

      {/* Always-present accessible text layer */}
      <div className="flex flex-col items-center gap-3">
        <span className="sr-only" data-metric-value>
          {value}
        </span>

        {/* The component Caption renders ID primary / EN secondary. */}
        <Caption caption={label} size="sm" align="center" />

        <span
          className="mt-2 inline-flex items-center rounded-full bg-kiosk-green-100 px-5 py-2 font-sans text-[0.9rem] font-bold tracking-widest text-kiosk-green-700"
          data-metric-category
        >
          {t(category)}
        </span>
      </div>
    </div>
  );
}

export default MetricGauge;
