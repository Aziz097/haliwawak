import { describe, expect, it } from 'vitest';
import { isPortraitViewport } from './KioskOrientationGuard';

describe('kiosk orientation detection', () => {
  it('detects portrait viewports when height exceeds width', () => {
    expect(isPortraitViewport(800, 1280)).toBe(true);
  });

  it('keeps landscape viewports active', () => {
    expect(isPortraitViewport(1280, 800)).toBe(false);
  });
});
