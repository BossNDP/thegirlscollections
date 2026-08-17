'use client';

import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-inkNavy/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Sheet Container */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-ivory text-inkNavy rounded-t-3xl shadow-2xl flex flex-col justify-between border-t border-zariGold/30 animate-in slide-in-from-bottom duration-300 touch-pan-y">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-zariGold/20 flex items-center justify-between sticky top-0 bg-sand/30 backdrop-blur-md z-10 rounded-t-3xl">
          <div className="w-10 h-1 rounded-full bg-zariGold/30 mx-auto absolute inset-x-0 top-2.5" />
          <div className="mt-1">
            <span className="font-sans font-semibold text-[9.5px] text-zariGold tracking-[0.22em] uppercase block">
              COUTURE SELECTION
            </span>
            <h3 className="text-lg font-serif font-bold text-inkNavy">Filter Products</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="p-2 text-zariGold hover:text-inkNavy transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-ivory border border-zariGold/30 flex items-center justify-center text-inkNavy hover:bg-zariGold hover:text-white transition-colors"
              aria-label="Close filter drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-ivory overscroll-contain">
          <FilterSidebar filters={filters} onChange={onChange} onReset={onReset} />
        </div>

        {/* Apply CTA Footer with Safe Area Bottom Padding */}
        <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] border-t border-zariGold/20 bg-ivory flex items-center gap-3 shrink-0">
          <button
            onClick={onReset}
            className="w-1/3 py-3 rounded-md border border-zariGold/40 text-xs font-sans font-bold uppercase tracking-widest text-inkNavy hover:bg-sand/30 transition-colors text-center"
          >
            RESET
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-md bg-inkNavy text-white hover:bg-zariGold text-xs font-sans font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>SHOW {resultsCount} PIECES</span>
          </button>
        </div>

      </div>
    </div>
  );
};
