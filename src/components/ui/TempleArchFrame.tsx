'use client';

import React from 'react';

interface TempleArchFrameProps {
  children: React.ReactNode;
  variant?: 'large' | 'small';
  className?: string;
}

export const TempleArchFrame: React.FC<TempleArchFrameProps> = ({
  children,
  variant = 'large',
  className = '',
}) => {
  const frameClass = variant === 'large' ? 'arch-frame' : 'arch-frame-sm';

  return (
    <div className={`relative overflow-hidden transition-all duration-500 ${frameClass} ${className}`}>
      {children}
    </div>
  );
};

export default TempleArchFrame;
