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
  // Canvas / surfaces — bright mint canvas
  'bg': '#F0FDF4', // page canvas
  'surface': '#FFFFFF', // cards
  'surface-tint': '#DCFCE7', // tinted panels

  // Green scale — dominant hue
  'green-50': '#F0FDF4',
  'green-100': '#DCFCE7',
  'green-200': '#BBF7D0',
  'green-300': '#86EFAC',
  'green-400': '#4ADE80',
  'green-500': '#22C55E', // primary bright green (fills, icons, decoration)
  'green-600': '#16A34A', // primary-strong (large-text buttons)
  'green-700': '#15803D', // min green for WHITE body text (>=4.5:1)
  'green-800': '#166534',
  'green-900': '#14532D', // deepest green

  // Text inks
  'ink': '#0B2818', // primary text on light canvas
  'ink-muted': '#3F6B52', // secondary text / EN captions
  'on-green': '#FFFFFF', // text on green-700+ surfaces

  // Supporting accents (green stays dominant)
  'accent-amber': '#F59E0B',
  'accent-teal': '#0D9488',

  // IUCN status
  'iucn-lc': '#15803D', // Least Concern
  'iucn-nt': '#B45309',
  'iucn-vu': '#C2410C',
  'iucn-en': '#B91C1C',
  'iucn-cr': '#7F1D1D',
  'iucn-na': '#6B7280', // neutral placeholder
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
