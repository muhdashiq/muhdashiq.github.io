import type { SimpleIcon } from 'simple-icons';

type BrandIconProps = { icon: SimpleIcon; className?: string };

/** A Simple Icons logo, drawn in the current text colour. */
export const BrandIcon = ({ icon, className = '' }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d={icon.path} />
  </svg>
);
