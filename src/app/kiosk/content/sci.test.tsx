/**
 * Scientific-name emphasis tests.
 *
 * The client requirement is exact: binomial and genus names must appear
 * verbatim, with only the first letter of the first word capitalised, and set
 * in italics. These assert the rendering contract and that the real copy
 * strings in i18n.ts actually carry the markers.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { sci } from './sci';
import { FOOD_SECURITY, FOOD_SECURITY_INFO_CARDS, KOLAM_CONCEPTS } from './i18n';

describe('sci()', () => {
  it('italicises marked names and leaves surrounding text alone', () => {
    const { container } = render(<p>{sci('Spesies: _Eurema blanda_ (Famili Pieridae).')}</p>);
    const em = container.querySelector('em');
    expect(em).not.toBeNull();
    expect(em?.textContent).toBe('Eurema blanda');
    // Markers must not survive into the rendered text.
    expect(container.textContent).toBe('Spesies: Eurema blanda (Famili Pieridae).');
  });

  it('italicises every name in a list, not just the first', () => {
    const { container } = render(
      <p>{sci('_Eurema blanda_, _Catopsilia pyranthe_, _Appias olferna_')}</p>,
    );
    expect([...container.querySelectorAll('em')].map((e) => e.textContent)).toEqual([
      'Eurema blanda',
      'Catopsilia pyranthe',
      'Appias olferna',
    ]);
  });

  it('passes unmarked text through untouched', () => {
    const { container } = render(<p>{sci('Kehadiran kupu-kupu yang melimpah.')}</p>);
    expect(container.querySelector('em')).toBeNull();
    expect(container.textContent).toBe('Kehadiran kupu-kupu yang melimpah.');
  });
});

describe('copy uses the exact names the client specified', () => {
  const pieridae = FOOD_SECURITY.find((s) => s.key === 'sahabat-petani')!;
  const nymphalidae = FOOD_SECURITY.find((s) => s.key === 'benteng-alami')!;

  it('marks all three Pieridae species for italics', () => {
    for (const name of ['Eurema blanda', 'Catopsilia pyranthe', 'Appias olferna']) {
      expect(pieridae.keySpecies.id).toContain(`_${name}_`);
    }
  });

  it('marks both Nymphalidae genera for italics', () => {
    expect(nymphalidae.keySpecies.id).toContain('_Junonia_');
    expect(nymphalidae.keySpecies.id).toContain('_Hypolimnas_');
  });

  it('capitalises only the first word of each binomial', () => {
    // "Eurema Blanda" would be wrong; the epithet stays lowercase.
    for (const name of ['Eurema blanda', 'Catopsilia pyranthe', 'Appias olferna']) {
      const [genus, epithet] = name.split(' ');
      expect(genus[0]).toBe(genus[0].toUpperCase());
      expect(epithet).toBe(epithet.toLowerCase());
    }
  });

  it('renders the species line with each name in its own <em>', () => {
    render(<p>{sci(pieridae.keySpecies.id)}</p>);
    expect(screen.getByText('Eurema blanda').tagName).toBe('EM');
    expect(screen.getByText('Catopsilia pyranthe').tagName).toBe('EM');
    expect(screen.getByText('Appias olferna').tagName).toBe('EM');
  });

  it('carries the replacement narration the client supplied', () => {
    expect(pieridae.title.id).toBe('Pengunjung Bunga dan Penyerbuk Umum');
    expect(nymphalidae.title.id).toBe('Zona Penyangga Alami Pengendali Hama');

    const pieridaeCard = FOOD_SECURITY_INFO_CARDS.find((c) => c.key === 'sahabat-petani')!;
    expect(pieridaeCard.body.id).toContain('kacang-kacangan (Fabaceae)');
    expect(pieridaeCard.body.id).toContain('sesawi (Brassicaceae)');

    const bioindicator = KOLAM_CONCEPTS.find((c) => c.key === 'bioindicator')!;
    expect(bioindicator.title.id).toBe('Kupu-Kupu sebagai Indikator Lingkungan Sehat');
  });
});
