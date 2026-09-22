'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export type HomepageFilterOption = 'all' | 'women' | 'kids';

interface HomepageFilterBarProps {
  activeFilter: HomepageFilterOption;
  onFilterChange: (filter: HomepageFilterOption) => void;
  isFloating?: boolean;
}

export const HomepageFilterBar: React.FC<HomepageFilterBarProps> = ({
  activeFilter,
  onFilterChange,
  isFloating = false,
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const options: { id: HomepageFilterOption; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'women', label: 'WOMEN' },
    { id: 'kids', label: 'KIDS' },
  ];

  return (
    <nav
      aria-label="Homepage Category Filter"
      className={`w-full py-2 sm:py-2.5 px-4 select-none transition-colors duration-300 ${
        isHomePage && isFloating
          ? 'bg-transparent text-ivory border-b border-white/10'
          : 'bg-ivory text-inkNavy border-b border-inkNavy/10'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-6 sm:gap-10">
        {options.map((opt, idx) => {
          const isActive = activeFilter === opt.id;
          return (
            <React.Fragment key={opt.id}>
              {idx > 0 && (
                <span
                  className="w-[1px] h-3 shrink-0 bg-white/25"
                  aria-hidden="true"
                />
              )}
              <button
                onClick={() => onFilterChange(opt.id)}
                className="relative py-1 text-[11px] sm:text-[12.5px] font-sans font-bold tracking-[0.25em] uppercase text-white opacity-100 cursor-pointer flex items-center justify-center focus:outline-none"
                aria-pressed={isActive}
              >
                <span>{opt.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A84C]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default HomepageFilterBar;


