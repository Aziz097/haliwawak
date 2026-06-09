/**
 * VirtualInsektariumScreen — Screen 3 of the kiosk flow ("Insektarium Virtual" /
 * "Virtual Insektarium").
 *
 * Image-led digital butterfly collection. Species are grouped by family with
 * `groupByFamily` into the three documented families — Papilionidae, Pieridae,
 * and Nymphalidae — and each group is rendered as a {@link FamilyGallery}
 * (which itself renders a bilingual {@link EmptyState} for an empty group, so
 * the screen never shows a blank area — Req 8.5). Each gallery card carries the
 * species' name caption (Req 8.4).
 *
 * A bilingual screen heading sits at the top (Indonesian primary / English
 * secondary, Req 8.2). The curator attribution crediting Dr. Yanti Ariyanti and
 * the ITERA Biology Study Program team is shown via the i18n caption
 * `INSEKTARIUM_ATTRIBUTION` (Req 8.3).
 *
 * Styling uses ONLY the bright-green kiosk design tokens (`text-kiosk-*`,
 * `bg-kiosk-*`, `border-kiosk-*`) — no raw hex and no legacy palette values.
 * This is a purely presentational component (no client hooks), so it omits the
 * `'use client'` directive.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { Sparkles } from 'lucide-react';
import FamilyGallery from '../components/FamilyGallery';
import { INSEKTARIUM_ATTRIBUTION, INSEKTARIUM_TITLE } from '../content/i18n';
import { KIOSK_ASSETS } from '../content/assets';
import { groupByFamily, type KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';

export interface VirtualInsektariumScreenProps {
  /** The full list of kiosk species; grouped by family for the galleries. */
  species: KioskSpecies[];
}

/**
 * The three butterfly families featured in the Virtual Insektarium, rendered in
 * order as one {@link FamilyGallery} each (Req 8.1).
 */
const INSEKTARIUM_FAMILIES = ['Papilionidae', 'Pieridae', 'Nymphalidae'] as const;

/**
 * The Virtual Insektarium screen: a bilingual heading, the curator attribution,
 * and three family galleries grouped from the provided species list.
 */
export default function VirtualInsektariumScreen({
  species,
}: VirtualInsektariumScreenProps) {
  const { t } = useLang();
  const grouped = groupByFamily(species, [...INSEKTARIUM_FAMILIES]);

  return (
    <section className="flex flex-col gap-8 p-8">
      {/* Single-language screen heading. */}
      <header className="flex flex-col gap-2">
        <h2 className="text-4xl font-extrabold leading-tight text-kiosk-ink">
          {t(INSEKTARIUM_TITLE)}
        </h2>

        {/* Curator / research attribution (Req 8.3). */}
        <div className="mt-2 flex items-start gap-3 rounded-2xl border border-kiosk-green-200 bg-kiosk-surface-tint p-4">
          <span className="mt-0.5 text-kiosk-green-700">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-base font-semibold leading-snug text-kiosk-ink">
            {t(INSEKTARIUM_ATTRIBUTION)}
          </p>
        </div>
      </header>

      {/* One FamilyGallery per family (each renders its own EmptyState when the
          group is empty — Req 8.5). A documented collage plate from the
          research team precedes each gallery as the dominant visual. */}
      <div className="flex flex-col gap-12">
        {INSEKTARIUM_FAMILIES.map((family) => (
          <div key={family} className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-3xl border border-kiosk-green-200 bg-kiosk-surface shadow-sm">
              <img
                src={KIOSK_ASSETS.insektarium[family]}
                alt={`Koleksi spesies Famili ${family}`}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
            <FamilyGallery family={family} species={grouped[family] ?? []} />
          </div>
        ))}
      </div>
    </section>
  );
}
