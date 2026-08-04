/**
 * KioskImage sizing regression test.
 *
 * The Site Map tiles rendered invisible photos because a fill-mode <KioskImage>
 * with no `className` left its wrapper unsized: the img inside is
 * `absolute inset-0`, so the wrapper collapsed to 0x0 and the image vanished
 * with no error. Separately, non-fill (logo) mode gave the img `h-auto w-auto`,
 * so logos rendered at natural size and overflowed their box.
 *
 * These assert the sizing contract only — the part that failed silently.
 */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import KioskImage from './KioskImage';

const wrapperOf = (c: HTMLElement) => c.firstElementChild as HTMLElement;
const imgOf = (c: HTMLElement) => c.querySelector('img') as HTMLImageElement;

describe('KioskImage sizing', () => {
  it('fills its box in fill mode even when the caller passes no className', () => {
    const { container } = render(<KioskImage src="/a.jpg" alt="" />);
    // Without this the wrapper is 0x0 and the absolute img is never visible.
    expect(wrapperOf(container).className).toContain('h-full');
    expect(wrapperOf(container).className).toContain('w-full');
  });

  it('lets a caller-supplied className win over the fallback', () => {
    const { container } = render(
      <KioskImage src="/a.jpg" alt="" className="h-64 md:h-full" />,
    );
    // Token match, not substring: `md:h-full` legitimately contains "h-full".
    const tokens = wrapperOf(container).className.split(/\s+/);
    expect(tokens).toContain('h-64');
    // The fallback must not add a bare h-full that fights the explicit height
    // at the unprefixed breakpoint (SpeciesDetailModal renders exactly this).
    expect(tokens).not.toContain('h-full');
  });

  it('scales a logo down into its box instead of rendering at natural size', () => {
    const { container } = render(
      <KioskImage src="/logo.svg" alt="" fill={false} className="h-10 w-10" />,
    );
    const cls = imgOf(container).className;
    expect(cls).toContain('max-h-full');
    expect(cls).toContain('max-w-full');
    // h-auto/w-auto ignore the wrapper and overflow it — that was the bug.
    expect(cls).not.toContain('h-auto');
    expect(cls).not.toContain('w-auto');
  });

  it('centres a logo in its card regardless of aspect ratio', () => {
    // The footer logos range from 0.74:1 (tall) to 1.10:1 (wide) inside one
    // fixed card, so a max-constrained `relative` img parks top-left unless
    // the wrapper centres it.
    const { container } = render(
      <KioskImage src="/logo.png" alt="" fill={false} className="h-full w-full" />,
    );
    const tokens = wrapperOf(container).className.split(/\s+/);
    expect(tokens).toContain('flex');
    expect(tokens).toContain('items-center');
    expect(tokens).toContain('justify-center');
  });

  it('does not make the fill-mode wrapper a flex container', () => {
    // Fill mode centres via `absolute inset-0`; flex here would fight it.
    const { container } = render(<KioskImage src="/a.jpg" alt="" />);
    expect(wrapperOf(container).className.split(/\s+/)).not.toContain('flex');
  });

  it('contains (not crops) in logo mode, and covers in fill mode', () => {
    const { container: logo } = render(
      <KioskImage src="/logo.svg" alt="" fill={false} />,
    );
    expect(imgOf(logo).className).toContain('object-contain');

    const { container: photo } = render(<KioskImage src="/a.jpg" alt="" />);
    expect(imgOf(photo).className).toContain('object-cover');
  });
});
