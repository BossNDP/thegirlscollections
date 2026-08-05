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
  // Bold, Prominent Logo Sizing (Fully legible on both mobile & desktop)
  const logoHeights = {
    sm: 'h-10 sm:h-12',
    md: 'h-[50px] sm:h-[60px] md:h-[68px] lg:h-[76px]',
    lg: 'h-[58px] sm:h-[68px] lg:h-[84px]',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center group shrink-0 relative py-0.5 focus:outline-none ${className}`}
      aria-label="The Girls Collection Home"
    >
      <span className="sr-only">The Girls Collection</span>

      {/* Prominent Direct Logo Image - 477x523 Native Resolution */}
      <div className={`relative ${logoHeights[size]} w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        <Image
          src="/logo.png"
          alt="The Girls Collection Logo"
          width={477}
          height={523}
          style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
          className="h-full w-auto object-contain filter drop-shadow-md"
          priority
        />
      </div>
    </Link>
  );
};

export default BrandLogo;
