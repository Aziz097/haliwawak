import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ClickableCard from './ClickableCard';

describe('ClickableCard', () => {
  it('renders children', () => {
    render(<ClickableCard onClick={() => {}}>Hello</ClickableCard>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ClickableCard onClick={handleClick}>Click me</ClickableCard>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter key', () => {
    const handleClick = vi.fn();
    render(<ClickableCard onClick={handleClick}>Click me</ClickableCard>);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Space key', () => {
    const handleClick = vi.fn();
    render(<ClickableCard onClick={handleClick}>Click me</ClickableCard>);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when a nested button is clicked', () => {
    const cardClick = vi.fn();
    const buttonClick = vi.fn();
    render(
      <ClickableCard onClick={cardClick}>
        <button type="button" onClick={buttonClick}>Nested</button>
      </ClickableCard>
    );
    fireEvent.click(screen.getByText('Nested'));
    expect(buttonClick).toHaveBeenCalledTimes(1);
    expect(cardClick).not.toHaveBeenCalled();
  });

  it('renders as a static div when onClick is not provided', () => {
    render(<ClickableCard>Static</ClickableCard>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
  });
});
