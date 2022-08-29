// Vendor
import Image from 'next/image';

export const enum IconSize {
  XS = 16,
  S = 24,
  M = 32,
}

// value is the name of the file in `public/assets/icons/`
export const enum IconVariant {
  Search = 'search',
}

interface Props {
  // Custom styles
  className?: string;
  // A standard size for the icon
  size?: IconSize;
  // The type of svg asset by filename
  variant: IconVariant;
}

/**
 * Loads icons from assets/icons/*.svg
 */
export const Icon = ({ className, size = IconSize.S, variant }: Props) => (
  <Image
    className={className}
    src={`/assets/icons/${variant}.svg`}
    alt={`${variant} icon`}
    width={size}
    height={size}
  />
);
