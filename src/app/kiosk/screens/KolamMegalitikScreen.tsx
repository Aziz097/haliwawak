/**
 * KolamMegalitikScreen — Screen 7 of the kiosk flow ("Menjaga Kolam
 * Megalitik" / "Protecting the Megalithic Spring").
 *
 * Presents THREE icon-led concept blocks, each pairing a DOMINANT lucide
 * icon with a short bilingual {@link Caption} (Indonesian primary / English
 * secondary):
 *   1. Puddling — male butterflies absorbing minerals from damp soil for
 *      energy and reproduction (Droplet) — Req 12.1.
 *   2. Bioindikator — abundant butterflies signalling pure, clean water
 *      free of chemical pollutants (Sparkles) — Req 12.2.
 *   3. Harmoni Leluhur — the pool uniting Earth / Air / Water as the
 *      ancestral point of ecological & spiritual balance (Mountain) —
 *      Req 12.3.
 *
 * Block content (icon name + bilingual title + description) is sourced from
 * `content/i18n.ts` (`KOLAM_CONCEPTS`, `KOLAM_MEGALITIK_TITLE`,
 * `KOLAM_MEGALITIK_INTRO`) so copy stays out of the component. Styling uses
 * ONLY the bright-green kiosk design tokens (`text-kiosk-*`, `bg-kiosk-*`,
 * `border-kiosk-*`) — no raw hex and no legacy palette values.
 *
 * This is a purely presentational component (no client hooks), so it omits
 * the `'use client'` directive.
 *
 * Requirements: 12.1, 12.2, 12.3
 */

import { Droplet, Mountain, Sparkles, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import { KIOSK_ASSETS } from '../content/assets';
import {
  KOLAM_CONCEPTS,
  KOLAM_MEGALITIK_INTRO,
  KOLAM_MEGALITIK_TITLE,
} from '../content/i18n';
import { useLang } from '../i18n/language';

/**
 * Maps the lucide icon names declared in `KOLAM_CONCEPTS` to their concrete
 * icon components.
 */
const CONCEPT_ICONS: Record<string, LucideIcon> = {
  Droplet,
  Sparkles,
  Mountain,
};

export default function KolamMegalitikScreen() {
  const { t } = useLang();
  return (
    <section className="flex flex-col gap-8 p-8">
      {/* Single-language screen heading + framing caption. */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(KOLAM_MEGALITIK_TITLE)}
        </h2>
        <p className="mt-1 max-w-3xl text-lg font-semibold leading-snug text-kiosk-ink-muted">
          {t(KOLAM_MEGALITIK_INTRO)}
        </p>
      </header>

      {/* Megalithic pool scene photos. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {KIOSK_ASSETS.scenes.kolam.map((src, i) => (
          <div
            key={src}
            className="aspect-video overflow-hidden rounded-3xl border border-kiosk-green-200 shadow-sm"
          >
            <img
              src={src}
              alt={`Kolam Megalitik Pugung Raharjo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Three icon-led concept blocks. */}
      <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {KOLAM_CONCEPTS.map((concept) => {
          const Icon = CONCEPT_ICONS[concept.icon] ?? Droplet;

          return (
            <li key={concept.key} className="list-none">
              <article className="flex h-full flex-col items-center gap-5 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface p-8 text-center shadow-sm">
                {/* Dominant icon element. */}
                <span className="flex h-36 w-36 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
                  <Icon className="h-20 w-20" strokeWidth={1.75} aria-hidden="true" />
                </span>

                {/* Concept title — single-language caption. */}
                <Caption caption={concept.title} size="lg" align="center" />

                {/* Supporting description. */}
                <p className="text-base leading-snug text-kiosk-ink">
                  {t(concept.description)}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
