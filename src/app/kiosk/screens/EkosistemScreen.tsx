/**
 * EkosistemScreen — Screen 5 of the kiosk flow.
 *
 * Presents the ecological health of the Pugung Raharjo site through THREE
 * visual-first {@link MetricGauge}s — the dominant elements of the screen —
 * one per ecosystem index sourced from `METRICS` in `content/i18n.ts`:
 *
 *  - Diversity (H′)  = 2,77        → Sedang / Moderate (Req 10.1)
 *  - Evenness (E)    = 0,91        → Tinggi / High     (Req 10.2)
 *  - Dominance (D)   = 0,00 – 0,13 → Rendah / Low      (Req 10.3)
 *
 * Each gauge renders its value prominently with a bilingual category label,
 * and falls back to a text representation if its visual indicator fails to
 * render (Req 10.4, 10.5 — handled inside `MetricGauge`). A short bilingual
 * heading + intro frames the screen.
 *
 * This is a pure presentational component (no hooks / no motion), so it does
 * NOT use `'use client'`. Styling uses ONLY the bright-green kiosk design
 * tokens (`text-kiosk-*`, `bg-kiosk-*`) — no raw hex and no legacy palette
 * values.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { MetricGauge } from '../components/MetricGauge';
import { KIOSK_ASSETS } from '../content/assets';
import { EKOSISTEM_INTRO, EKOSISTEM_TITLE, METRICS } from '../content/i18n';
import { useLang } from '../i18n/language';

/** Renders the three ecosystem indices as visual-first metric gauges. */
export default function EkosistemScreen() {
  const { t } = useLang();
  return (
    <section className="flex h-full w-full flex-col gap-8 px-8 py-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(EKOSISTEM_TITLE)}
        </h2>
        <p className="max-w-3xl text-lg font-medium leading-snug text-kiosk-ink-muted">
          {t(EKOSISTEM_INTRO)}
        </p>
      </header>

      {/* Habitat photo strip from the ecological survey. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {KIOSK_ASSETS.scenes.ekosistem.map((src, i) => (
          <div
            key={src}
            className="aspect-[4/3] overflow-hidden rounded-2xl border border-kiosk-green-200 shadow-sm"
          >
            <img
              src={src}
              alt={`Dokumentasi ekosistem ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Three dominant metric gauges: diversity (H′), evenness (E), dominance (D). */}
      <ul className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((metric) => (
          <li key={metric.key} className="flex list-none flex-col gap-3">
            <MetricGauge
              value={metric.value}
              label={metric.label}
              category={metric.category}
            />

            {/* Brief single-language supporting note beneath each gauge. */}
            <p className="px-2 text-center text-sm font-medium leading-snug text-kiosk-ink-muted">
              {t(metric.note)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
