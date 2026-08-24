/**
 * VirtualInsektariumScreen - Screen 3 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Soft paper background, serif headings, terracota/sage accents, and
 * organic flow grouping species into their respective families.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { memo, useMemo, useState } from 'react';
import { Fingerprint } from 'lucide-react';
import FamilyGallery from '../components/FamilyGallery';
import KioskImage from '../components/KioskImage';
import CuratorNote from '../components/CuratorNote';
import ScreenHeader from '../components/ScreenHeader';
import { StaggerList, StaggerItem } from '../components/ScreenEntrance';
import { INSEKTARIUM_ATTRIBUTION, INSEKTARIUM_INTRO, INSEKTARIUM_TITLE } from '../content/i18n';
import { KIOSK_ASSETS } from '../content/assets';
import { groupByFamily, type KioskSpecies } from '../lib/speciesMapping';
import SpeciesDetailModal from '../components/SpeciesDetailModal';

export interface VirtualInsektariumScreenProps {
  /** The full list of kiosk species; grouped by family for the galleries. */
  species: KioskSpecies[];
}

/**
 * The three butterfly families featured in the Virtual Insektarium.
 */
const INSEKTARIUM_FAMILIES = ['Papilionidae', 'Pieridae', 'Nymphalidae'] as const;

function VirtualInsektariumScreen({ species }: VirtualInsektariumScreenProps) {
  const grouped = useMemo(() => groupByFamily(species, [...INSEKTARIUM_FAMILIES]), [species]);
  const [selectedSpecies, setSelectedSpecies] = useState<KioskSpecies | null>(null);

  return (
    <section className="flex flex-col gap-[clamp(1.5rem,3vh,2.5rem)] bg-kiosk-bg px-[clamp(1.5rem,3vw,3.5rem)] py-[clamp(0.9rem,2.2vh,1.75rem)]">
      <ScreenHeader
        icon={Fingerprint}
        eyebrow={{ id: 'Koleksi Digital', en: 'Digital Collection' }}
        title={INSEKTARIUM_TITLE}
        description={INSEKTARIUM_INTRO}
        aside={<CuratorNote body={INSEKTARIUM_ATTRIBUTION} />}
      />

      {/* Galleries */}
      <StaggerList className="flex flex-col gap-20" delay={0.15}>
        {INSEKTARIUM_FAMILIES.map((family) => (
          <StaggerItem
            key={family}
            className="[content-visibility:auto] [contain-intrinsic-size:0_900px]"
          >
            <div className="flex flex-col gap-8">
              {/* Hero Collage for the Family */}
              <div className="overflow-hidden rounded-[2.618rem] border-4 border-white bg-kiosk-surface shadow-md">
                <KioskImage
                  src={KIOSK_ASSETS.insektarium[family]}
                  alt={`Koleksi spesies Famili ${family}`}
                  fill={false}
                  loading={family === INSEKTARIUM_FAMILIES[0] ? 'eager' : 'lazy'}
                  fetchPriority={family === INSEKTARIUM_FAMILIES[0] ? 'high' : 'low'}
                  className="w-full"
                  imgClassName="h-auto w-full"
                />
              </div>

              {/* The Gallery Grid */}
              <FamilyGallery
                family={family}
                species={grouped[family] ?? []}
                onSelectSpecies={setSelectedSpecies}
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerList>
      <SpeciesDetailModal
        open={selectedSpecies !== null}
        onClose={() => setSelectedSpecies(null)}
        species={selectedSpecies}
      />
    </section>
  );
}

export default memo(VirtualInsektariumScreen);
