'use client';

import { HelpCircle } from 'lucide-react';

interface InfoHotspotProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function InfoHotspot({
  onClick,
  label = 'Pelajari lebih lanjut / Learn more',
  className = '',
}: InfoHotspotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center
        rounded-full bg-kiosk-accent-amber text-white shadow-lg
        transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-kiosk-accent-amber/40
        ${className}
      `}
    >
      <HelpCircle className="h-6 w-6" strokeWidth={2} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
