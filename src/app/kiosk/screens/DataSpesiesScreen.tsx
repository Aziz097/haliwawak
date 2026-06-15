/**
 * DataSpesiesScreen — Screen 9 of the kiosk flow.
 *
 * Designed for the "Bright Organic Heritage" aesthetic:
 * Golden ratio typography, elegant table-like cards with soft shadows
 * (rounded-[2rem]), and a spacious botanical feel.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5
 */

import { ImageOff, Table } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import SpeciesPhotoPair from '../components/SpeciesPhotoPair';
import { DATA_SPESIES_COLUMNS, DATA_SPESIES_TITLE } from '../content/i18n';
import type { KioskSpecies } from '../lib/speciesMapping';
import { useLang } from '../i18n/language';

export interface DataSpesiesScreenProps {
  /** The full list of kiosk species to display in the data grid. */
  species: KioskSpecies[];
}

/** A resolved IUCN badge: a short label + its token background class. */
interface IucnBadge {
  /** Short code/label shown in the cell (e.g. "LC", "EN", "N/A"). */
  label: string;
  /** Full status title used for the accessible/title text. */
  title: string;
  /** Static Tailwind background class bound to a `kiosk-iucn-*` token. */
  bgClass: string;
}

const IUCN_MAP: Record<string, IucnBadge> = {
  'least concern': { label: 'LC', title: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  lc: { label: 'LC', title: 'Least Concern', bgClass: 'bg-kiosk-iucn-lc' },
  'near threatened': { label: 'NT', title: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  nt: { label: 'NT', title: 'Near Threatened', bgClass: 'bg-kiosk-iucn-nt' },
  vulnerable: { label: 'VU', title: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  vu: { label: 'VU', title: 'Vulnerable', bgClass: 'bg-kiosk-iucn-vu' },
  endangered: { label: 'EN', title: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  en: { label: 'EN', title: 'Endangered', bgClass: 'bg-kiosk-iucn-en' },
  'critically endangered': { label: 'CR', title: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
  cr: { label: 'CR', title: 'Critically Endangered', bgClass: 'bg-kiosk-iucn-cr' },
};

const IUCN_NEUTRAL: IucnBadge = {
  label: 'N/A',
  title: 'Tidak Ada Data / Not Assessed',
  bgClass: 'bg-kiosk-iucn-na',
};

function resolveIucnBadge(status: string | null): IucnBadge {
  const key = (status ?? '').trim().toLowerCase();
  if (key.length === 0) return IUCN_NEUTRAL;
  return IUCN_MAP[key] ?? { label: status!.trim(), title: status!.trim(), bgClass: 'bg-kiosk-iucn-na' };
}

/** A small labeled taxonomic field. */
function TaxonField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-sans text-[0.7rem] font-bold uppercase tracking-widest text-kiosk-green-600">
        {label}
      </dt>
      <dd className="font-sans text-[0.9rem] font-semibold text-kiosk-ink">{value || '—'}</dd>
    </div>
  );
}

/** A single species record rendered as a photo + taxonomic-fields card. */
function SpeciesRecord({ species }: { species: KioskSpecies }) {
  const { t } = useLang();
  const name = species.commonName || species.scientificName || species.family;
  const badge = resolveIucnBadge(species.iucnStatus);

  const hasBothPhotos = Boolean(species.topPhotoUrl) && Boolean(species.undersidePhotoUrl);
  const singlePhoto = species.topPhotoUrl ?? species.undersidePhotoUrl ?? null;

  return (
    <article className="group flex flex-col gap-6 rounded-[2rem] border-2 border-white bg-white p-6 shadow-[0_8px_30px_rgba(30,51,40,0.04)] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,51,40,0.08)]">
      {/* Photos */}
      {hasBothPhotos ? (
        <SpeciesPhotoPair
          top={species.topPhotoUrl}
          underside={species.undersidePhotoUrl}
          alt={name}
        />
      ) : (
        <div className="aspect-video w-full overflow-hidden rounded-[1.618rem] bg-kiosk-surface-tint">
          {singlePhoto ? (
            <img
              src={singlePhoto}
              alt={name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-kiosk-green-300">
              <ImageOff className="h-12 w-12 opacity-30" aria-hidden="true" />
            </span>
          )}
        </div>
      )}

      {/* Taxonomic fields */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-2">
        <TaxonField label={t(DATA_SPESIES_COLUMNS.family)} value={species.family} />
        <TaxonField label={t(DATA_SPESIES_COLUMNS.genus)} value={species.genus} />
        <div className="col-span-2 flex flex-col gap-1">
          <dt className="font-sans text-[0.7rem] font-bold uppercase tracking-widest text-kiosk-green-600">
            {t(DATA_SPESIES_COLUMNS.species)}
          </dt>
          <dd className="flex flex-col">
            <span className="font-serif text-[1.618rem] font-semibold text-kiosk-ink leading-tight">{name}</span>
            {species.scientificName && species.scientificName !== name ? (
              <span className="font-sans text-[0.8rem] italic tracking-wide text-kiosk-ink-muted">{species.scientificName}</span>
            ) : null}
          </dd>
        </div>
      </dl>

      {/* IUCN status */}
      <div className="mt-auto flex items-center gap-3 border-t border-kiosk-surface-tint px-2 pt-4">
        <span className="font-sans text-[0.7rem] font-bold uppercase tracking-widest text-kiosk-green-600">
          {t(DATA_SPESIES_COLUMNS.iucn)}
        </span>
        <span
          title={badge.title}
          className={`ml-auto rounded-full px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-widest text-white shadow-sm ${badge.bgClass}`}
        >
          {badge.label}
        </span>
      </div>
    </article>
  );
}

export default function DataSpesiesScreen({ species }: DataSpesiesScreenProps) {
  const { t, lang } = useLang();
  return (
    <section className="flex flex-col gap-[2.618rem] bg-kiosk-bg px-10 py-10 lg:px-14">
      {/* Heading */}
      <header className="flex flex-col items-start gap-4 border-b border-kiosk-green-200 pb-8">
        <span className="flex items-center gap-2 rounded-full border border-kiosk-green-300 bg-kiosk-green-100 px-4 py-1.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.2em] text-kiosk-green-700">
          <Table className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Database Bio' : 'Bio Database'}
        </span>
        <h2 className="font-serif text-[2.618rem] font-medium leading-none text-kiosk-ink">
          {t(DATA_SPESIES_TITLE)}
        </h2>
      </header>

      {species.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-[1.618rem] sm:grid-cols-2 xl:grid-cols-3">
          {species.map((record) => (
            <SpeciesRecord key={record.id} species={record} />
          ))}
        </div>
      )}
    </section>
  );
}
