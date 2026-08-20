'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { RotateCw } from 'lucide-react';

export function isPortraitViewport(width: number, height: number) {
  return height > width;
}

function readPortraitState() {
  if (typeof window === 'undefined') return false;
  return isPortraitViewport(window.innerWidth, window.innerHeight);
}

export default function KioskOrientationGuard({ children }: { children: ReactNode }) {
  const [isPortrait, setIsPortrait] = useState(readPortraitState);

  useEffect(() => {
    const updateOrientation = () => setIsPortrait(readPortraitState());
    updateOrientation();
    window.addEventListener('resize', updateOrientation, { passive: true });
    window.addEventListener('orientationchange', updateOrientation, { passive: true });
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  if (!isPortrait) return children;

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-kiosk-bg px-8 text-center text-kiosk-ink">
      <div className="flex max-w-xl flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-kiosk-orange-100 text-kiosk-orange-700">
          <RotateCw className="h-12 w-12 rotate-90" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-serif text-4xl font-semibold">Putar perangkat ke kanan</h1>
          <p className="mt-3 font-sans text-lg text-kiosk-ink-muted">
            Putar layar ke posisi mendatar untuk memulai pengalaman kiosk.
          </p>
          <p className="mt-2 font-sans text-base text-kiosk-ink-muted/80">
            Rotate your device to landscape mode to continue.
          </p>
        </div>
      </div>
    </main>
  );
}
