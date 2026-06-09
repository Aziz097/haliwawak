/**
 * KetahananPanganScreen — Screen 6 of the kiosk flow ("Ketahanan Pangan" /
 * "Food Security").
 *
 * Presents TWO icon-led sections, each pairing a DOMINANT lucide icon with a
 * short bilingual {@link Caption} (Indonesian primary / English secondary):
 *   1. Sahabat Petani (The Farmer's Friend) — Pieridae pollinators
 *      (Eurema blanda, Catopsilia pyranthe, Appias olferna) — Sprout.
 *   2. Benteng Alami Penolak Hama (Natural Pest Barrier) — Nymphalidae genera
 *      Junonia & Hypolimnas acting as natural pest control / buffer zone —
 *      ShieldCheck.
 *
 * Section content (icon name + bilingual title + key species + description)
 * is sourced from `content/i18n.ts` (`FOOD_SECURITY`,
 * `KETAHANAN_PANGAN_TITLE`) so copy stays out of the component. Styling uses
 * ONLY the bright-green kiosk design tokens (`text-kiosk-*`, `bg-kiosk-*`,
 * `border-kiosk-*`) — no raw hex and no legacy palette values.
 *
 * This is a purely presentational component (no client hooks), so it omits
 * the `'use client'` directive.
 *
 * Requirements: 11.1, 11.2
 */

import { ShieldCheck, Sprout, type LucideIcon } from 'lucide-react';
import { Caption } from '../components/Caption';
import { KIOSK_ASSETS } from '../content/assets';
import { FOOD_SECURITY, KETAHANAN_PANGAN_TITLE } from '../content/i18n';
import { useLang } from '../i18n/language';

/**
 * Maps the lucide icon names declared in `FOOD_SECURITY` to their concrete
 * icon components. Keeping this explicit (rather than a dynamic lookup) keeps
 * the bundle tree-shakeable and the mapping type-safe.
 */
const SECTION_ICONS: Record<string, LucideIcon> = {
  Sprout,
  ShieldCheck,
};

export default function KetahananPanganScreen() {
  const { t } = useLang();
  return (
    <section className="flex flex-col gap-8 p-8">
      {/* Single-language screen heading. */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(KETAHANAN_PANGAN_TITLE)}
        </h2>
      </header>

      {/* Scene banner: pollinators at work around the site. */}
      <div className="overflow-hidden rounded-3xl border border-kiosk-green-200 shadow-sm">
        <img
          src={KIOSK_ASSETS.scenes.ketahananPangan}
          alt="Kupu-kupu penyerbuk di sekitar ladang Situs Pugung Raharjo"
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover sm:h-72"
        />
      </div>

      {/* Two icon-led food-security sections. */}
      <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {FOOD_SECURITY.map((section) => {
          const Icon = SECTION_ICONS[section.icon] ?? Sprout;

          return (
            <li key={section.key} className="list-none">
              <article className="flex h-full flex-col items-center gap-5 rounded-3xl border border-kiosk-green-200 bg-kiosk-surface p-8 text-center shadow-sm">
                {/* Dominant icon element (Req 11.1 / 11.2). */}
                <span className="flex h-36 w-36 items-center justify-center rounded-full bg-kiosk-green-100 text-kiosk-green-700">
                  <Icon className="h-20 w-20" strokeWidth={1.75} aria-hidden="true" />
                </span>

                {/* Section title — single-language caption. */}
                <Caption caption={section.title} size="lg" align="center" />

                {/* Key species line. */}
                <p className="text-base font-semibold italic leading-snug text-kiosk-green-700">
                  {t(section.keySpecies)}
                </p>

                {/* Supporting description. */}
                <p className="text-base leading-snug text-kiosk-ink">
                  {t(section.description)}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
