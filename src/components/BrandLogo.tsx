import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'horizontal' | 'badge';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Sizing for cropped 322x353 logo image (fills header vertically with generous prominence)
  const logoHeights = {
    sm: 'h-11 sm:h-14 lg:h-16',
    md: 'h-[58px] sm:h-[74px] lg:h-[86px]',
    lg: 'h-[64px] sm:h-[82px] lg:h-[92px]',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center sm:justify-start group shrink-0 relative py-1 focus:outline-none ${className}`}
      aria-label="The Girls Collection Home"
    >
      <span className="sr-only">The Girls Collection</span>

      {/* Prominent Cropped Logo Image Container with Premium Shimmer Animation */}
      <div className={`relative ${logoHeights[size]} w-auto shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden rounded-xs`}>
        {/* Royal Gold Shimmer Light Beam */}
        <span className="animate-logo-shimmer" />

        <Image
          src="/logo.png"
          alt="The Girls Collection Logo"
          width={322}
          height={353}
          style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          className="h-full w-auto max-h-full object-contain filter drop-shadow-xs relative z-0"
          priority
        />
      </div>
    </Link>
  );
};

export default BrandLogo;
