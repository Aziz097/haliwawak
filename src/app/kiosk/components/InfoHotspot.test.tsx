import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InfoHotspot from './InfoHotspot';

describe('InfoHotspot', () => {
  it('renders a button with a question mark', () => {
    render(<InfoHotspot onClick={() => {}} />);
    expect(screen.getByLabelText(/learn more/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<InfoHotspot onClick={handleClick} />);
    fireEvent.click(screen.getByLabelText(/learn more/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
