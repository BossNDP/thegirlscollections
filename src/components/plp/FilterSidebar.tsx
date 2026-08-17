'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import {
  WOMEN_TRADITIONAL_ITEMS,
  WOMEN_FROCKS_WESTERN_ITEMS,
  KIDS_ETHNIC_ITEMS,
} from '@/data/categoryTaxonomy';

export interface FilterState {
  category: string[];
  target: string[];
  occasion: string[];
  size: string[];
  fabric: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

const ALL_CATEGORY_OPTIONS = [
  ...WOMEN_TRADITIONAL_ITEMS.map((item) => ({ label: `Women: ${item.name}`, value: item.slug })),
  ...WOMEN_FROCKS_WESTERN_ITEMS.map((item) => ({ label: `Frocks: ${item.name}`, value: item.slug })),
  ...KIDS_ETHNIC_ITEMS.map((item) => ({ label: `Kids: ${item.name}`, value: item.slug })),
];

const TARGET_OPTIONS = [
  { label: "Women", value: "women" },
  { label: "Kids Ethnic", value: "kids" },
];

const OCCASION_OPTIONS = [
  { label: "Festive", value: "Festive" },
  { label: "Wedding Guest", value: "Wedding Guest" },
  { label: "Everyday", value: "Everyday" },
  { label: "Gifting", value: "Gifting" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-9Y"];

const FABRIC_OPTIONS = [
  "Pure Organza Silk",
  "Chanderi Silk",
  "Kanjeevaram Silk",
  "Georgette",
  "Handloom Cotton",
  "Satin Crepe",
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, onReset }) => {
  const [openSections, setOpenSections] = useState({
    target: true,
    category: true,
    occasion: true,
    size: true,
    fabric: false,
    price: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleArrayToggle = (key: keyof FilterState, val: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(val)
      ? current.filter((item) => item !== val)
      : [...current, val];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <aside className="w-full space-y-6 text-inkNavy font-sans text-xs">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zariGold/20">
        <h3 className="text-xs font-serif font-bold text-inkNavy uppercase tracking-[0.2em]">
          FILTER SELECTION
        </h3>
        <button
          onClick={onReset}
          className="flex items-center space-x-1.5 text-[11px] text-zariGold hover:text-inkNavy transition-colors font-semibold uppercase tracking-wider"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Target (Women / Kids) */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('target')}
          className="w-full flex items-center justify-between font-serif font-semibold text-sm text-inkNavy mb-3"
        >
          <span>Department</span>
          {openSections.target ? <ChevronUp className="w-4 h-4 text-zariGold" /> : <ChevronDown className="w-4 h-4 text-zariGold" />}
        </button>
        {openSections.target && (
          <div className="space-y-2.5 pl-1">
            {TARGET_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-2.5 cursor-pointer text-inkNavy/80 hover:text-inkNavy">
                <input
                  type="checkbox"
                  checked={filters.target.includes(opt.value)}
                  onChange={() => handleArrayToggle('target', opt.value)}
                  className="rounded border-zariGold/40 text-inkNavy focus:ring-zariGold accent-zariGold w-4 h-4"
                />
                <span className="text-xs font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Accordion */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between font-serif font-semibold text-sm text-inkNavy mb-3"
        >
          <span>Category</span>
          {openSections.category ? <ChevronUp className="w-4 h-4 text-zariGold" /> : <ChevronDown className="w-4 h-4 text-zariGold" />}
        </button>
        {openSections.category && (
          <div className="space-y-2.5 pl-1 max-h-56 overflow-y-auto pr-1">
            {ALL_CATEGORY_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-2.5 cursor-pointer text-inkNavy/80 hover:text-inkNavy">
                <input
                  type="checkbox"
                  checked={filters.category.includes(opt.value)}
                  onChange={() => handleArrayToggle('category', opt.value)}
                  className="rounded border-zariGold/40 text-inkNavy focus:ring-zariGold accent-zariGold w-4 h-4"
                />
                <span className="text-xs font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Occasion Accordion */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between font-serif font-semibold text-sm text-inkNavy mb-3"
        >
          <span>Occasion</span>
          {openSections.occasion ? <ChevronUp className="w-4 h-4 text-zariGold" /> : <ChevronDown className="w-4 h-4 text-zariGold" />}
        </button>
        {openSections.occasion && (
          <div className="space-y-2.5 pl-1">
            {OCCASION_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-2.5 cursor-pointer text-inkNavy/80 hover:text-inkNavy">
                <input
                  type="checkbox"
                  checked={filters.occasion.includes(opt.value)}
                  onChange={() => handleArrayToggle('occasion', opt.value)}
                  className="rounded border-zariGold/40 text-inkNavy focus:ring-zariGold accent-zariGold w-4 h-4"
                />
                <span className="text-xs font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Pill Grid */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between font-serif font-semibold text-sm text-inkNavy mb-3"
        >
          <span>Size</span>
          {openSections.size ? <ChevronUp className="w-4 h-4 text-zariGold" /> : <ChevronDown className="w-4 h-4 text-zariGold" />}
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {SIZE_OPTIONS.map((size) => {
              const selected = filters.size.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleArrayToggle('size', size)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                    selected
                      ? 'bg-inkNavy text-ivory border-inkNavy shadow-xs'
                      : 'bg-ivory text-inkNavy/80 border-zariGold/30 hover:border-zariGold'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Fabric Accordion */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('fabric')}
          className="w-full flex items-center justify-between font-serif font-semibold text-sm text-inkNavy mb-3"
        >
          <span>Fabric</span>
          {openSections.fabric ? <ChevronUp className="w-4 h-4 text-zariGold" /> : <ChevronDown className="w-4 h-4 text-zariGold" />}
        </button>
        {openSections.fabric && (
          <div className="space-y-2.5 pl-1">
            {FABRIC_OPTIONS.map((fab) => (
              <label key={fab} className="flex items-center space-x-2.5 cursor-pointer text-inkNavy/80 hover:text-inkNavy">
                <input
                  type="checkbox"
                  checked={filters.fabric.includes(fab)}
                  onChange={() => handleArrayToggle('fabric', fab)}
                  className="rounded border-zariGold/40 text-inkNavy focus:ring-zariGold accent-zariGold w-4 h-4"
                />
                <span className="text-xs font-medium">{fab}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock availability */}
      <div className="pt-2">
        <label className="flex items-center space-x-2.5 cursor-pointer font-medium text-inkNavy">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-zariGold/40 text-inkNavy focus:ring-zariGold accent-zariGold w-4 h-4"
          />
          <span className="text-xs font-medium">In Stock Items Only</span>
        </label>
      </div>

    </aside>
  );
};
