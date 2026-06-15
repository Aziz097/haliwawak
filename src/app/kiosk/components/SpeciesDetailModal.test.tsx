import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SpeciesDetailModal from './SpeciesDetailModal';
import type { KioskSpecies } from '../lib/speciesMapping';

vi.mock('../i18n/language', () => ({
  useLang: () => ({
    lang: 'id',
    t: (caption: { id: string; en: string }) => caption.id,
  }),
}));

const sampleSpecies: KioskSpecies = {
  id: 1,
  commonName: 'Graphium agamemnon',
  scientificName: 'Graphium agamemnon',
  family: 'Papilionidae',
  genus: 'Graphium',
  iucnStatus: 'Least Concern',
  topPhotoUrl: '/img.jpg',
  undersidePhotoUrl: null,
  galleryUrls: [],
};

describe('SpeciesDetailModal', () => {
  it('does not render when closed', () => {
    render(<SpeciesDetailModal open={false} onClose={vi.fn()} species={sampleSpecies} />);
    expect(screen.queryByText('Graphium agamemnon')).not.toBeInTheDocument();
  });

  it('renders species data when open', () => {
    render(<SpeciesDetailModal open onClose={vi.fn()} species={sampleSpecies} />);
    expect(screen.getByText('Graphium agamemnon')).toBeInTheDocument();
    expect(screen.getByText('Papilionidae')).toBeInTheDocument();
    expect(screen.getByText('Graphium')).toBeInTheDocument();
    expect(screen.getByText('Least Concern')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<SpeciesDetailModal open onClose={handleClose} species={sampleSpecies} />);
    fireEvent.click(screen.getByLabelText(/Tutup/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
