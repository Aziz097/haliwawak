/**
 * Typed mirror of the bright-green kiosk palette defined in the Tailwind v4
 * `@theme` block in `globals.css`. This module is the single source of truth
 * for logic/tests (contrast checks, IUCN mapping) that needs the same hex
 * values used in class-based styling.
 *
 * Keep these values in sync with the `--color-kiosk-*` custom properties.
 *
 * Requirements: 2.1, 2.2
 */

/** Every kiosk palette token as a hex constant (mirrors `--color-kiosk-*`). */
export const palette = {
  // Canvas / surfaces — Bright organic paper
  'bg': '#FDFBF7', // warm parchment
  'surface': '#FFFFFF', // clean white cards
  'surface-tint': '#F4EFE6', // soft clay tint

  // Green scale — Soft Sage to Deep Forest
  'green-50': '#F5F8F6',
  'green-100': '#E6EFE9',
  'green-200': '#C7D7CD',
  'green-300': '#A4BBAE',
  'green-400': '#81A08F',
  'green-500': '#618571', // primary soft sage
  'green-600': '#4A725D', // primary-strong
  'green-700': '#385A48', // good for contrast
  'green-800': '#2A4537',
  'green-900': '#1E3328', // deepest forest

  // Text inks
  'ink': '#1E3328', // primary text is deep forest
  'ink-muted': '#618571', // secondary text
  'on-green': '#FFFFFF', // text on dark green surfaces

  // Supporting accents (Nature combo)
  'accent-amber': '#EBA741', // Sunlit yellow
  'accent-teal': '#D05A3D',  // Terracotta

  // IUCN status (keep these standard but harmonious)
  'iucn-lc': '#4A725D', 
  'iucn-nt': '#EBA741',
  'iucn-vu': '#D05A3D',
  'iucn-en': '#B91C1C',
  'iucn-cr': '#7F1D1D',
  'iucn-na': '#6B7280', 
} as const;

/** A kiosk palette token name (key of {@link palette}). */
export type PaletteToken = keyof typeof palette;

/** A hex color value from the kiosk palette. */
export type PaletteHex = (typeof palette)[PaletteToken];

/** An approved foreground/background text color pairing (hex values). */
export interface TextPairing {
  /** Foreground (text) color hex. */
  fg: PaletteHex;
  /** Background color hex. */
  bg: PaletteHex;
  /** Human-readable use note from the design's contrast pairing table. */
  use: string;
}

/**
 * Approved (foreground, background) text pairings from the design's contrast
 * pairing table. Each pairing is documented to meet WCAG AA (>=4.5:1) for the
 * text size it is approved for.
 *
 * Rule: white text uses `green-700` or darker; bright `green-500`/`green-600`
 * are reserved for fills, icons, borders, and large display text only — never
 * small body text on a green fill (so `green-600` is intentionally excluded
 * from this body-text pairing list).
 */
export const TEXT_PAIRINGS: readonly TextPairing[] = [
  { fg: palette['ink'], bg: palette['bg'], use: 'primary text on canvas' },
  { fg: palette['ink-muted'], bg: palette['bg'], use: 'EN secondary captions' },
  { fg: palette['on-green'], bg: palette['green-700'], use: 'body text on primary buttons' },
  { fg: palette['on-green'], bg: palette['green-800'], use: 'text on deep panels' },
  { fg: palette['on-green'], bg: palette['green-900'], use: 'text on deepest green panels' },
] as const;
