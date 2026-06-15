/**
 * EkosistemScreen — Screen 5 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio serif typography, spacious layout, and organic 
 * soft-shadow cards for the ecological gauges.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import { useState } from 'react';
import { MetricGauge } from '../components/MetricGauge';
import { KIOSK_ASSETS } from '../content/assets';
import { EKOSISTEM_INTRO, EKOSISTEM_TITLE, METRICS, EKOSISTEM_INFO_CARDS, type InfoCard } from '../content/i18n';
import { useLang } from '../i18n/language';
import { Leaf } from 'lucide-react';
import InfoHotspot from '../components/InfoHotspot';
import InfoModal from '../components/InfoModal';

/** Renders the three ecosystem indices as visual-first metric gauges. */
export default function EkosistemScreen() {
  const { t, lang } = useLang();
  const [infoCard, setInfoCard] = useState<InfoCard | null>(null);
  
  return (
    <section className="flex h-full w-full flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-kiosk-green-300 bg-kiosk-green-100 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-green-700">
          <Leaf className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Kesehatan Habitat' : 'Habitat Health'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(EKOSISTEM_TITLE)}
        </h2>
        <p className="max-w-3xl font-sans text-[1rem] leading-relaxed text-kiosk-ink-muted">
          {t(EKOSISTEM_INTRO)}
        </p>
      </header>

      {/* Habitat photo strip from the ecological survey. */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {KIOSK_ASSETS.scenes.ekosistem.map((src, i) => (
          <div
            key={src}
            className="aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]"
          >
            <img
              src={src}
              alt={`Dokumentasi ekosistem ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
        ))}
      </div>

      {/* Three dominant metric gauges: diversity (H′), evenness (E), dominance (D). */}
      <ul className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((metric) => {
          const card = EKOSISTEM_INFO_CARDS.find((c) => c.key === metric.key);
          return (
            <li key={metric.key} className="relative flex list-none flex-col gap-4">
              <article
                className="relative cursor-pointer transition-transform hover:-translate-y-1"
                onClick={() => card && setInfoCard(card)}
              >
                {card && <InfoHotspot onClick={() => setInfoCard(card)} />}
                <MetricGauge
                  value={metric.value}
                  label={metric.label}
                  category={metric.category}
                />
              </article>
              {/* Brief single-language supporting note beneath each gauge. */}
              <p className="px-4 text-center font-sans text-[0.8rem] font-medium leading-relaxed text-kiosk-ink-muted">
                {t(metric.note)}
              </p>
            </li>
          );
        })}
      </ul>
      <InfoModal open={infoCard !== null} onClose={() => setInfoCard(null)} card={infoCard} />
    </section>
  );
}
