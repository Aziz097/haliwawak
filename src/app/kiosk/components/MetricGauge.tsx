'use client';

/**
 * Visual-first ecological metric gauge.
 *
 * Renders an ecological metric (e.g. the Shannon diversity index H′) as a
 * radial SVG gauge — the DOMINANT visual element — with the metric `value`
 * shown prominently at its center. Below the gauge it renders the bilingual
 * `label` (via the {@link Caption} component) and a bilingual `category`
 * badge. Styling uses ONLY the bright-green kiosk design tokens
 * (`text-kiosk-*`, `bg-kiosk-*`, `stroke-kiosk-*`) — no raw hex and no legacy
 * palette values.
 *
 * Guarded text fallback (Req 10.5): the radial gauge is wrapped in an error
 * boundary so that if the visual indicator fails to render, the metric value
 * and bilingual category are still presented as text. Independently of the
 * gauge, an always-rendered text layer keeps the value and the bilingual
 * category present in the DOM at all times.
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
 * in `[0, 1]` for the radial indicator. The numeric `value` is the precise
 * datum (shown as text); this fraction is an illustrative visual level.
 */
function categoryToFraction(category: CaptionType): number {
  const text = `${category.id} ${category.en}`.toLowerCase();
  if (/(rendah|low)/.test(text)) return 0.2;
  if (/(sedang|moderate|medium)/.test(text)) return 0.55;
  if (/(tinggi|high)/.test(text)) return 0.9;
  return 0.5;
}

/** Radial SVG gauge with the value at its center. Throwing here is caught by the boundary. */
function RadialGauge({ value, fraction }: { value: string; fraction: number }) {
  const size = 200;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, fraction));
  const filled = clamped * circumference;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-44 w-44"
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
        className="stroke-kiosk-green-100"
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
        className="stroke-kiosk-green-500"
      />
      {/* Center value */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-kiosk-ink text-[2.25rem] font-extrabold"
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

/**
 * Error boundary guarding the radial gauge. If the visual indicator throws
 * during render, the boundary renders a text-only fallback so the metric
 * value and category remain visible (Req 10.5).
 */
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
 * bilingual text layer (label + value + category). A render failure of the
 * gauge falls back to a prominent text representation of the value.
 */
export function MetricGauge({ value, label, category }: MetricGaugeProps) {
  const { t } = useLang();
  const fraction = categoryToFraction(category);

  const textFallback = (
    <div className="flex h-44 w-44 items-center justify-center rounded-full bg-kiosk-surface-tint">
      <span className="px-4 text-center text-3xl font-extrabold text-kiosk-ink">
        {value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-kiosk-surface p-6 text-center shadow-sm">
      {/* Dominant visual indicator, guarded by an error boundary (Req 10.4, 10.5). */}
      <GaugeBoundary fallback={textFallback}>
        <RadialGauge value={value} fraction={fraction} />
      </GaugeBoundary>

      {/* Always-present accessible text layer: value + label + category. */}
      <div className="flex flex-col items-center gap-2">
        {/* Value is always present in the DOM as text, independent of the gauge. */}
        <span className="sr-only" data-metric-value>
          {value}
        </span>

        <Caption caption={label} size="md" align="center" />

        <span
          className="inline-flex items-center rounded-full bg-kiosk-green-700 px-4 py-1.5 text-base font-bold text-kiosk-on-green"
          data-metric-category
        >
          {t(category)}
        </span>
      </div>
    </div>
  );
}

export default MetricGauge;
