import { describe, expect, it } from 'vitest';
import { isScrollableScreen } from './ScreenRouter';

describe('ScreenRouter scroll behavior', () => {
  it('keeps the Virtual Insektarium content in the parent scroll container', () => {
    expect(isScrollableScreen('VIRTUAL_INSEKTARIUM')).toBe(true);
  });

  it('keeps fixed presentation screens constrained to the viewport', () => {
    expect(isScrollableScreen('LIVING_HERITAGE')).toBe(false);
  });
});
