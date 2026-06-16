'use client';

import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import QRCode from 'qrcode';
import { ClipboardList, X } from 'lucide-react';
import { useLang } from '../i18n/language';

const SURVEY_URL = 'https://s.itera.id/surveyhaliwawakpugung';
const APPEAR_DELAY_MS = 10_000;
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 56;

interface Position {
  x: number;
  y: number;
}

export default function SurveyFloatButton() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [pos, setPos] = useState<Position>({ x: 24, y: 100 });
  const dragging = useRef(false);
  const startPos = useRef<Position>({ x: 0, y: 0 });
  const pointerStart = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    QRCode.toDataURL(SURVEY_URL, {
      width: 200,
      margin: 2,
      color: { dark: '#4F2110', light: '#FFFFFF' },
    })
      .then(setQrUrl)
      .catch(console.error);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    startPos.current = { ...pos };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const dx = pointerStart.current.x - e.clientX;
    const dy = pointerStart.current.y - e.clientY;
    const vw = window.innerWidth - BUTTON_WIDTH;
    const vh = window.innerHeight - BUTTON_HEIGHT;
    setPos({
      x: Math.max(0, Math.min(vw, startPos.current.x + dx)),
      y: Math.max(0, Math.min(vh, startPos.current.y + dy)),
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const onClick = () => {
    if (!dragging.current) setOpen(true);
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
        aria-label={lang === 'id' ? 'Buka survei evaluasi kiosk' : 'Open kiosk evaluation survey'}
        className="fixed z-40 flex h-14 items-center gap-2 rounded-full bg-kiosk-accent-teal px-5 text-white shadow-[0_8px_30px_rgba(30,51,40,0.25)] transition-transform hover:scale-105 active:scale-95"
        style={{ right: pos.x, bottom: pos.y }}
      >
        <ClipboardList className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        <span className="font-sans text-sm font-bold uppercase tracking-wide">
          {lang === 'id' ? 'Survei' : 'Survey'}
        </span>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-kiosk-ink/55 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,51,40,0.18)] outline-none">
            <div className="flex items-start justify-between">
              <div>
                <Dialog.Title className="font-serif text-[1.618rem] font-semibold text-kiosk-ink">
                  {lang === 'id' ? 'Bantu Kami Meningkatkan Kiosk Ini' : 'Help Us Improve This Kiosk'}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-relaxed text-kiosk-ink-muted">
                  {lang === 'id'
                    ? 'Scan kode QR untuk mengisi survei 1–2 menit dari tim PkM ITERA.'
                    : 'Scan the QR code to fill in a 1–2 minute survey from the ITERA community service team.'}
                </Dialog.Description>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={lang === 'id' ? 'Tutup' : 'Close'}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kiosk-surface-tint text-kiosk-ink transition-colors hover:bg-kiosk-green-100"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              {qrUrl ? (
                <a
                  href={SURVEY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang === 'id' ? 'Buka survei' : 'Open survey'}
                >
                  <img
                    src={qrUrl}
                    alt={lang === 'id' ? 'Kode QR survei' : 'Survey QR code'}
                    className="h-48 w-48 rounded-2xl border-4 border-white bg-white shadow-md"
                  />
                </a>
              ) : (
                <div className="h-48 w-48 animate-pulse rounded-2xl bg-kiosk-surface" />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
