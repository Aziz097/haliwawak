'use client';

import type { ReactNode, KeyboardEvent, MouseEvent } from 'react';

interface ClickableCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * A keyboard-accessible card wrapper.
 *
 * Kiosk cards are large touch targets. This component makes them usable for
 * keyboard and screen-reader users too by adding role="button", tabIndex,
 * and Enter/Space activation while preserving the visual card styling.
 */
export default function ClickableCard({
  children,
  onClick,
  className = '',
  ariaLabel,
  disabled = false,
}: ClickableCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    // Let child buttons/links handle their own clicks without triggering the card action.
    if (e.target instanceof HTMLElement && e.target.closest('button, a, [role="button"]')) {
      const closest = e.target.closest('button, a, [role="button"]') as HTMLElement;
      // If the closest interactive element is NOT this card itself, ignore the click.
      if (closest !== e.currentTarget) return;
    }
    onClick?.();
  };

  if (!onClick) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${className} cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-kiosk-accent-amber/40`}
    >
      {children}
    </div>
  );
}
