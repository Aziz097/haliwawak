/**
 * WCAG 2.x contrast helper for the kiosk bright-green design tokens.
 *
 * Implements the relative-luminance / contrast-ratio formula used to validate
 * that approved foreground/background text pairings meet the AA threshold.
 *
 * Spec: kiosk-redesign - Requirements 2.5
 */

/** AA contrast threshold for normal body text. */
export const AA_THRESHOLD = 4.5;

/**
 * A foreground/background color pairing approved for kiosk text, expressed as
 * hex strings, alongside the token names and intended use.
 */
export interface TextPairing {
  /** Foreground (text) color, hex string. */
  fg: string;
  /** Background (surface) color, hex string. */
  bg: string;
  /** Foreground design-token name. */
  fgToken: string;
  /** Background design-token name. */
  bgToken: string;
  /** Human-readable description of where the pairing is used. */
  use: string;
}

/**
 * Parse a 3- or 6-digit hex color into its 8-bit RGB channels.
 *
 * Accepts optional leading `#`. 3-digit shorthand (e.g. `#0a3`) expands each
 * nibble (e.g. `#00aa33`). Throws on malformed input.
 */
function parseHex(hex: string): { r: number; g: number; b: number } {
  let value = hex.trim();
  if (value.startsWith('#')) {
    value = value.slice(1);
  }

  if (value.length === 3) {
    value = value
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }

  if (value.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

/**
 * Linearize a single sRGB channel (0–255) to its linear-light value (0–1)
 * per the WCAG relative-luminance definition.
 */
function linearizeChannel(channel8bit: number): number {
  const c = channel8bit / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Compute the WCAG relative luminance of a hex color (0 = black, 1 = white).
 */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const R = linearizeChannel(r);
  const G = linearizeChannel(g);
  const B = linearizeChannel(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Compute the WCAG 2.x contrast ratio between a foreground and background
 * color. Result ranges from 1 (no contrast) to 21 (black on white).
 *
 * The ratio is symmetric with respect to which color is lighter.
 */
export function contrastRatio(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Whether a contrast ratio satisfies the WCAG AA threshold for body text.
 */
export function meetsAA(ratio: number): boolean {
  return ratio >= AA_THRESHOLD;
}

/**
 * Approved foreground/background text pairings from the bright-green token
 * palette (design.md "Contrast pairing rules"). These are the body-text
 * pairings expected to meet the AA 4.5:1 threshold.
 *
 * Note: white-on-green-600 (`#16A34A`, ~3.6:1) is intentionally excluded - it
 * is reserved for large text / non-text only and does NOT meet AA for body
 * text. If `kiosk-theme/tokens.ts` later exports an authoritative list, prefer
 * importing and re-exporting it from there.
 */
export const APPROVED_PAIRINGS: readonly TextPairing[] = [
  {
    fg: '#0B2818',
    bg: '#F0FDF4',
    fgToken: 'kiosk-ink',
    bgToken: 'kiosk-bg',
    use: 'primary text on canvas',
  },
  {
    fg: '#3F6B52',
    bg: '#F0FDF4',
    fgToken: 'kiosk-ink-muted',
    bgToken: 'kiosk-bg',
    use: 'EN secondary captions',
  },
  {
    fg: '#FFFFFF',
    bg: '#15803D',
    fgToken: 'kiosk-on-green',
    bgToken: 'kiosk-green-700',
    use: 'body text on primary buttons',
  },
  {
    fg: '#FFFFFF',
    bg: '#166534',
    fgToken: 'kiosk-on-green',
    bgToken: 'kiosk-green-800',
    use: 'text on deep panels',
  },
] as const;
