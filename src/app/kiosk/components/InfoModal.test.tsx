import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InfoModal from './InfoModal';
import type { InfoCard } from '../content/i18n';

vi.mock('../i18n/language', () => ({
  useLang: () => ({
    lang: 'id',
    t: (caption: { id: string; en: string }) => caption.id,
  }),
}));

const sample: InfoCard = {
  key: 'test',
  title: { id: 'Judul', en: 'Title' },
  body: { id: 'Isi.', en: 'Body.' },
  whyItMatters: { id: 'Penting.', en: 'Important.' },
};

describe('InfoModal', () => {
  it('does not render when closed', () => {
    render(<InfoModal open={false} onClose={vi.fn()} card={sample} />);
    expect(screen.queryByText('Judul')).not.toBeInTheDocument();
  });

  it('renders title, body, and why-it-matters when open', () => {
    render(<InfoModal open onClose={vi.fn()} card={sample} />);
    expect(screen.getByText('Judul')).toBeInTheDocument();
    expect(screen.getByText('Isi.')).toBeInTheDocument();
    expect(screen.getByText('Penting.')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<InfoModal open onClose={handleClose} card={sample} />);
    fireEvent.click(screen.getByLabelText(/Tutup/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
