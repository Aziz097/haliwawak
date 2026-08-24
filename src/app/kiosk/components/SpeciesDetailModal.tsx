'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../language';
import { getSpeciesDetail } from '../content/speciesDetails';
import KioskImage from './KioskImage';
import type { KioskSpecies } from '../lib/speciesMapping';
import { modalVariants, modalPanelVariants } from '../kiosk-theme/motion';

interface SpeciesDetailModalProps {
  open: boolean;
  onClose: () => void;
  species: KioskSpecies | null;
}

export default function SpeciesDetailModal({ open, onClose, species }: SpeciesDetailModalProps) {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  if (!species) return null;

  const detail = getSpeciesDetail(species.scientificName);
  const displayName = species.commonName || species.scientificName || species.family;
  const photoUrl = species.topPhotoUrl || species.undersidePhotoUrl;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay asChild>
              <motion.div
                variants={reduceMotion ? undefined : modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-50 bg-kiosk-ink/55 backdrop-blur-sm"
                onClick={onClose}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>

        <Dialog.Content asChild>
          <motion.div
            variants={reduceMotion ? undefined : modalPanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(30,51,40,0.18)] outline-none"
          >
            <div className="flex max-h-[85vh] flex-col md:flex-row">
              {/* Photo */}
              <div className="relative w-full md:w-1/2">
                {photoUrl ? (
                  <KioskImage
                    src={photoUrl}
                    alt={displayName}
                    loading="eager"
                    className="h-64 md:h-full"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-kiosk-orange-50 md:h-full">
                    <span className="text-kiosk-ink-muted">
                      {t({ id: 'Foto tidak tersedia', en: 'Photo not available' })}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex w-full flex-col overflow-y-auto p-8 md:w-1/2">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-kiosk-orange-700">
                      {t({ id: 'Detail Spesies', en: 'Species Detail' })}
                    </span>
                    <Dialog.Title className="mt-1 font-serif text-3xl font-semibold italic text-kiosk-ink">
                      {displayName}
                    </Dialog.Title>
                    {species.scientificName !== displayName && (
                      <p className="mt-1 text-sm italic text-kiosk-ink-muted">
                        {species.scientificName}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t({ id: 'Tutup', en: 'Close' })}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-kiosk-surface-tint text-kiosk-ink transition-all duration-500 hover:bg-kiosk-orange-100 hover:rotate-90 active:scale-95"
                  >
                    <X className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t({ id: 'Famili', en: 'Family' }), value: species.family },
                    { label: t({ id: 'Genus', en: 'Genus' }), value: species.genus },
                    {
                      label: t({ id: 'Status IUCN', en: 'IUCN Status' }),
                      value:
                        species.iucnStatus ?? t({ id: 'Belum dievaluasi', en: 'Not evaluated' }),
                    },
                    {
                      label: t({ id: 'Jumlah di Situs', en: 'Occurrence' }),
                      value: t({ id: 'Terekam', en: 'Recorded' }),
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-[1.25rem] p-1 bg-kiosk-surface-tint/60">
                      <div className="h-full rounded-[calc(1.25rem-0.25rem)] bg-kiosk-surface-tint p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
                        <p className="text-xs font-bold uppercase tracking-widest text-kiosk-orange-700">
                          {label}
                        </p>
                        <p className="font-semibold text-kiosk-ink">{value}</p>
                      </div>
                    </div>
                  ))}
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
                    <div className="mt-6 rounded-[1.5rem] p-1.5 bg-kiosk-accent-amber/10">
                      <div className="rounded-[calc(1.5rem-0.375rem)] border border-kiosk-accent-amber/20 bg-kiosk-accent-amber/5 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <h4 className="mb-2 font-sans text-base font-bold text-kiosk-orange-700">
                          {t({ id: 'Peran dalam Ekosistem', en: 'Ecosystem Role' })}
                        </h4>
                        <p className="text-sm leading-relaxed text-kiosk-ink">
                          {t(detail.ecosystemRole)}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <Dialog.Description className="sr-only">
                    {t({
                      id: 'Detail spesies tidak tersedia.',
                      en: 'Species detail not available.',
                    })}
                  </Dialog.Description>
                )}
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
