'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useLang } from '../i18n/language';
import { getSpeciesDetail } from '../content/speciesDetails';
import type { KioskSpecies } from '../lib/speciesMapping';

interface SpeciesDetailModalProps {
  open: boolean;
  onClose: () => void;
  species: KioskSpecies | null;
}

export default function SpeciesDetailModal({
  open,
  onClose,
  species,
}: SpeciesDetailModalProps) {
  const { t } = useLang();
  if (!species) return null;

  const detail = getSpeciesDetail(species.scientificName);
  const displayName = species.commonName || species.scientificName || species.family;
  const photoUrl = species.topPhotoUrl || species.undersidePhotoUrl;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-kiosk-ink/55 backdrop-blur-sm"
          onClick={onClose}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(30,51,40,0.18)] outline-none"
        >
          <div className="flex max-h-[85vh] flex-col md:flex-row">
            {/* Photo */}
            <div className="relative w-full bg-kiosk-green-50 md:w-1/2">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={displayName}
                  className="h-64 w-full object-cover md:h-full"
                />
              ) : (
                <div className="flex h-64 items-center justify-center md:h-full">
                  <span className="text-kiosk-ink-muted">{t({ id: 'Foto tidak tersedia', en: 'Photo not available' })}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex w-full flex-col overflow-y-auto p-8 md:w-1/2">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-kiosk-green-700">
                    {t({ id: 'Detail Spesies', en: 'Species Detail' })}
                  </span>
                  <Dialog.Title className="mt-1 font-serif text-3xl font-semibold italic text-kiosk-ink">
                    {displayName}
                  </Dialog.Title>
                  {species.scientificName !== displayName && (
                    <p className="mt-1 text-sm italic text-kiosk-ink-muted">{species.scientificName}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t({ id: 'Tutup', en: 'Close' })}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-kiosk-surface-tint text-kiosk-ink transition-colors hover:bg-kiosk-green-100"
                >
                  <X className="h-6 w-6" strokeWidth={2} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-kiosk-surface-tint p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-kiosk-green-700">{t({ id: 'Famili', en: 'Family' })}</p>
                  <p className="font-semibold text-kiosk-ink">{species.family}</p>
                </div>
                <div className="rounded-xl bg-kiosk-surface-tint p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-kiosk-green-700">{t({ id: 'Genus', en: 'Genus' })}</p>
                  <p className="font-semibold text-kiosk-ink">{species.genus}</p>
                </div>
                <div className="rounded-xl bg-kiosk-surface-tint p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-kiosk-green-700">{t({ id: 'Status IUCN', en: 'IUCN Status' })}</p>
                  <p className="font-semibold text-kiosk-ink">{species.iucnStatus ?? t({ id: 'Belum dievaluasi', en: 'Not evaluated' })}</p>
                </div>
                <div className="rounded-xl bg-kiosk-surface-tint p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-kiosk-green-700">{t({ id: 'Jumlah di Situs', en: 'Occurrence' })}</p>
                  <p className="font-semibold text-kiosk-ink">{t({ id: 'Terekam', en: 'Recorded' })}</p>
                </div>
              </div>

              {detail ? (
                <>
                  <div className="mt-6">
                    <h4 className="mb-2 font-serif text-xl font-semibold text-kiosk-ink">
                      {t({ id: 'Fakta Menarik', en: 'Fun Fact' })}
                    </h4>
                    <Dialog.Description asChild>
                      <p className="leading-relaxed text-kiosk-ink-muted">{t(detail.funFact)}</p>
                    </Dialog.Description>
                  </div>
                  <div className="mt-6 rounded-2xl border border-kiosk-accent-amber/20 bg-kiosk-accent-amber/10 p-6">
                    <h4 className="mb-2 font-sans text-base font-bold text-kiosk-accent-amber">
                      {t({ id: 'Peran dalam Ekosistem', en: 'Ecosystem Role' })}
                    </h4>
                    <p className="text-sm leading-relaxed text-kiosk-ink">{t(detail.ecosystemRole)}</p>
                  </div>
                </>
              ) : (
                <Dialog.Description className="sr-only">
                  {t({ id: 'Detail spesies tidak tersedia.', en: 'Species detail not available.' })}
                </Dialog.Description>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
