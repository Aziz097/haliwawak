import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VisitCta from './visit-cta';

describe('VisitCta', () => {
  it('renders free entry ticket information', () => {
    render(<VisitCta />);
    expect(screen.getByText(/Tiket Masuk Gratis/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rp 5\.000/i)).not.toBeInTheDocument();
  });
});