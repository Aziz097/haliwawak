/**
 * Centralized kiosk asset manifest.
 *
 * All static imagery delivered in the "Asset foto" package is organized under
 * `public/kiosk/` and referenced here by URL so screens never hard-code paths.
 *
 *   public/kiosk/scenes/       - photographic scene/hero images per screen
 *   public/kiosk/insektarium/  - family collage plates (Papilionidae, …)
 *   public/kiosk/species/      - per-species top + underside photos
 *   public/kiosk/logos/        - funder / institution / program logos
 */

export const KIOSK_ASSETS = {
  scenes: {
    livingHeritage: [
      '/kiosk/scenes/living-heritage-1.webp',
      '/kiosk/scenes/living-heritage-2.webp',
      '/kiosk/scenes/living-heritage-3.webp',
    ],
    metamorfosis: '/kiosk/scenes/metamorfosis.webp',
    ekosistem: [
      '/kiosk/scenes/ekosistem-1.webp',
      '/kiosk/scenes/ekosistem-2.webp',
      '/kiosk/scenes/ekosistem-3.webp',
      '/kiosk/scenes/ekosistem-4.webp',
    ],
    ketahananPangan: '/kiosk/scenes/ketahanan-pangan.webp',
    kolam: [
      '/kiosk/scenes/kolam-1.webp',
      '/kiosk/scenes/kolam-2.webp',
      '/kiosk/scenes/kolam-3.webp',
    ],
    callToAction: [
      '/kiosk/scenes/cta-1.webp',
      '/kiosk/scenes/cta-2.webp',
    ],
  },
  insektarium: {
    Papilionidae: '/kiosk/insektarium/papilionidae.webp',
    Pieridae: '/kiosk/insektarium/pieridae.webp',
    Nymphalidae: '/kiosk/insektarium/nymphalidae.webp',
  } as Record<string, string>,
  logos: {
    program: '/kiosk/logos/program.webp',
    diktisaintek: '/kiosk/logos/diktisaintek.webp',
    bima: '/kiosk/logos/bima.webp',
    lampungTimur: '/kiosk/logos/lampung-timur.webp',
    itera: '/kiosk/logos/itera.webp',
    kemenbud: '/kiosk/logos/kemenbud.webp',
  },
} as const;

/**
 * Ordered list of funder/institution logos, shown in the navbar (centered) and
 * on the credits screen. Order requested by the client:
 * itera → program → kemenbud → Lampung Timur → Diktisaintek → BIMA.
 */
export const KIOSK_LOGOS: { src: string; alt: string }[] = [
  { src: KIOSK_ASSETS.logos.itera, alt: 'Institut Teknologi Sumatera' },
  { src: KIOSK_ASSETS.logos.program, alt: 'Logo Program Eduwisata Polinator' },
  { src: KIOSK_ASSETS.logos.kemenbud, alt: 'Kementerian Kebudayaan' },
  { src: KIOSK_ASSETS.logos.lampungTimur, alt: 'Kabupaten Lampung Timur' },
  { src: KIOSK_ASSETS.logos.diktisaintek, alt: 'Diktisaintek Berdampak' },
  { src: KIOSK_ASSETS.logos.bima, alt: 'BIMA Kemdiktisaintek' },
];

/** Brand wordmark logo for the kiosk (public website logo). */
export const KIOSK_BRAND_LOGO = '/kupu2-logo-black.svg';
