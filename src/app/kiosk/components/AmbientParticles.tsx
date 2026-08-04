'use client';

import { useState, useEffect } from 'react';

/**
 * Ambient organic particles for the kiosk atmosphere.
 * Tiny warm motes that drift gently, like pollen or dust in sunbeams.
 * Rendered as fixed, pointer-events-none layers to avoid blocking interaction.
 */
export function AmbientParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    drift: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        drift: (Math.random() - 0.5) * 40,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(249,115,22,0.55) 0%, transparent 70%)',
            boxShadow: `0 0 ${p.size * 5}px ${p.size * 2}px rgba(249,115,22,0.18)`,
            animation: `particleDrift ${p.duration}s ${p.delay}s ease-in-out infinite`,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/** Subtle film-grain overlay fixed on top of the viewport. */
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[50] opacity-[0.025]"
      aria-hidden="true"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
      }}
    />
  );
}
