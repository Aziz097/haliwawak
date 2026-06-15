/**
 * VirtualInsektariumScreen - Screen 3 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Soft paper background, serif headings, terracota/sage accents, and 
 * organic flow grouping species into their respective families.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { useState } from 'react';
import { Sparkles, Fingerprint } from 'lucide-react';
import FamilyGallery from '../components/FamilyGallery';
import { INSEKTARIUM_ATTRIBUTION, INSEKTARIUM_TITLE } from '../content/i18n';
import { KIOSK_ASSETS } from '../content/assets';
import { groupByFamily, type KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';
import SpeciesDetailModal from '../components/SpeciesDetailModal';

export interface VirtualInsektariumScreenProps {
  /** The full list of kiosk species; grouped by family for the galleries. */
  species: KioskSpecies[];
}

/**
 * The three butterfly families featured in the Virtual Insektarium.
 */
const INSEKTARIUM_FAMILIES = ['Papilionidae', 'Pieridae', 'Nymphalidae'] as const;

export default function VirtualInsektariumScreen({
  species,
}: VirtualInsektariumScreenProps) {
  const { t, lang } = useLang();
  const grouped = groupByFamily(species, [...INSEKTARIUM_FAMILIES]);
  const [selectedSpecies, setSelectedSpecies] = useState<KioskSpecies | null>(null);

  return (
    <section className="flex flex-col bg-kiosk-bg p-10 lg:p-14">
      {/* Editorial Header */}
      <header className="mb-14 flex flex-col items-start gap-8 border-b border-kiosk-green-200 pb-10">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-4">
            <span className="flex w-max items-center gap-2 rounded-full border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">
              <Fingerprint className="h-4 w-4" aria-hidden="true" />
              {lang === 'id' ? 'Koleksi Digital' : 'Digital Collection'}
            </span>
            <h2 className="font-serif text-[4.236rem] leading-[0.9] text-kiosk-ink">
              {t(INSEKTARIUM_TITLE)}
            </h2>
          </div>

          {/* Curator Attribution */}
          <div className="flex max-w-sm items-start gap-4 rounded-3xl border border-kiosk-accent-amber/20 bg-kiosk-accent-amber/5 p-6 shadow-sm">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kiosk-accent-amber/20 text-kiosk-accent-amber">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="font-sans text-[0.9rem] leading-relaxed text-kiosk-ink-muted">
              <span className="mb-1 block font-bold text-kiosk-ink">Curator&apos;s Note</span>
              {t(INSEKTARIUM_ATTRIBUTION)}
            </p>
          </div>
        </div>
      </header>

      {/* Galleries */}
      <div className="flex flex-col gap-20">
        {INSEKTARIUM_FAMILIES.map((family) => (
          <div key={family} className="flex flex-col gap-8">
            {/* Hero Collage for the Family */}
            <div className="overflow-hidden rounded-[2.618rem] border-4 border-white bg-kiosk-surface shadow-md">
              <img
                src={KIOSK_ASSETS.insektarium[family]}
                alt={`Koleksi spesies Famili ${family}`}
                loading="lazy"
                className="h-auto w-full object-cover mix-blend-multiply"
              />
            </div>
            
            {/* The Gallery Grid */}
            <FamilyGallery 
              family={family} 
              species={grouped[family] ?? []} 
              onSelectSpecies={setSelectedSpecies}
            />
          </div>
        ))}
      </div>
      <SpeciesDetailModal open={selectedSpecies !== null} onClose={() => setSelectedSpecies(null)} species={selectedSpecies} />
    </section>
  );
}
