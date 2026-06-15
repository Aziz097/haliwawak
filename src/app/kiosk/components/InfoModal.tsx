'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useLang } from '../i18n/language';
import type { InfoCard } from '../content/i18n';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  card: InfoCard | null;
}

export default function InfoModal({ open, onClose, card }: InfoModalProps) {
  const { t } = useLang();
  if (!card) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-kiosk-ink/55 backdrop-blur-sm"
          onClick={onClose}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white p-0 shadow-[0_20px_60px_rgba(30,51,40,0.18)] outline-none"
          aria-describedby="info-modal-body"
        >
          <div className="flex max-h-[85vh] flex-col">
            <div className="flex items-start justify-between border-b border-kiosk-green-100 p-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-kiosk-green-700">
                  {t({ id: 'Tahukah Kamu?', en: 'Did You Know?' })}
                </span>
                <Dialog.Title className="mt-1 font-serif text-3xl font-semibold text-kiosk-ink">
                  {t(card.title)}
                </Dialog.Title>
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

            <div className="overflow-y-auto p-8">
              <p id="info-modal-body" className="text-lg leading-relaxed text-kiosk-ink-muted">
                {t(card.body)}
              </p>
              <div className="mt-6 rounded-2xl border border-kiosk-green-200 bg-kiosk-green-50 p-6">
                <h4 className="mb-2 font-sans text-base font-bold text-kiosk-green-800">
                  {t({ id: 'Kenapa Ini Penting?', en: 'Why Does This Matter?' })}
                </h4>
                <p className="text-sm leading-relaxed text-kiosk-green-900">
                  {t(card.whyItMatters)}
                </p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
