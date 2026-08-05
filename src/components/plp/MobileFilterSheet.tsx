'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { FilterSidebar, FilterState } from './FilterSidebar';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  resultsCount: number;
}

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  resultsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-ivory rounded-t-3xl shadow-2xl flex flex-col justify-between border-t border-roseGold/30 animate-slide-in-bottom">
        
        {/* Top Handle & Title */}
        <div className="p-5 border-b border-roseGold/20 flex items-center justify-between sticky top-0 bg-ivory z-10 rounded-t-3xl">
          <div className="w-12 h-1 rounded-full bg-roseGold/40 mx-auto absolute inset-x-0 top-3" />
          <h3 className="text-base font-serif font-bold text-navy mt-2">Filter Products</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-navy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <FilterSidebar filters={filters} onChange={onChange} onReset={onReset} />
        </div>

        {/* Apply CTA Button Footer */}
        <div className="p-4 border-t border-roseGold/20 bg-white flex items-center gap-3">
          <button
            onClick={onReset}
            className="w-1/3 py-3 rounded-full border border-roseGold text-xs uppercase font-semibold text-navy hover:bg-roseGold/10 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-navy text-ivory text-xs uppercase font-bold tracking-wider hover:bg-roseGold hover:text-navy transition-all shadow-md flex items-center justify-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Show {resultsCount} Products</span>
          </button>
        </div>

      </div>
    </div>
  );
};
