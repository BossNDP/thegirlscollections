'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/shopData';
import {
  WOMEN_CATEGORIES,
  KIDS_CATEGORIES,
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

const TARGET_OPTIONS = [
  { label: 'Women', value: 'women' },
  { label: 'Kids Ethnic', value: 'kids' },
];

const OCCASION_OPTIONS = [
  { label: 'Festive', value: 'Festive' },
  { label: 'Wedding Guest', value: 'Wedding Guest' },
  { label: 'Everyday', value: 'Everyday' },
  { label: 'Gifting', value: 'Gifting' },
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '1-2Y', '2-3Y', '4-5Y', '6-7Y', '8-9Y'];

const FABRIC_KEYWORDS = [
  { label: 'Organza Silk', value: 'Organza' },
  { label: 'Chanderi Silk', value: 'Chanderi' },
  { label: 'Kanjeevaram Silk', value: 'Kanjeevaram' },
  { label: 'Georgette', value: 'Georgette' },
  { label: 'Handloom Cotton', value: 'Cotton' },
  { label: 'Satin Crepe', value: 'Satin' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, onReset }) => {
  const [openSections, setOpenSections] = useState({
    target: true,
    category: true,
    occasion: true,
    size: true,
    fabric: true,
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

  // Compute Live Option Counts from MOCK_PRODUCTS
  const counts = useMemo(() => {
    const targetCounts: Record<string, number> = { women: 0, kids: 0 };
    const categoryCounts: Record<string, number> = {};
    const occasionCounts: Record<string, number> = {};
    const sizeCounts: Record<string, number> = {};
    const fabricCounts: Record<string, number> = {};

    MOCK_PRODUCTS.forEach((p) => {
      // Department
      if (p.target) targetCounts[p.target] = (targetCounts[p.target] || 0) + 1;

      // Category
      if (p.category) categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;

      // Occasion
      if (p.occasion) occasionCounts[p.occasion] = (occasionCounts[p.occasion] || 0) + 1;

      // Sizes
      p.sizes?.forEach((s) => {
        if (s.inStock) sizeCounts[s.size] = (sizeCounts[s.size] || 0) + 1;
      });

      // Fabric
      FABRIC_KEYWORDS.forEach((fab) => {
        if (p.fabric?.toLowerCase().includes(fab.value.toLowerCase())) {
          fabricCounts[fab.value] = (fabricCounts[fab.value] || 0) + 1;
        }
      });
    });

    return { targetCounts, categoryCounts, occasionCounts, sizeCounts, fabricCounts };
  }, []);

  // Consolidated Category List from Taxonomy
  const categoryOptions = useMemo(() => {
    const womenList = WOMEN_CATEGORIES.map((c) => ({
      label: c.name,
      value: c.slug,
      count: counts.categoryCounts[c.slug] || counts.categoryCounts[c.id] || 0,
    }));
    const kidsList = KIDS_CATEGORIES.map((c) => ({
      label: c.name,
      value: c.slug,
      count: counts.categoryCounts[c.slug] || counts.categoryCounts[c.id] || 0,
    }));

    // Fallback: include mock data categories if not present
    const customList = [
      { label: 'Anarkali Suit Sets', value: 'anarkalis', count: counts.categoryCounts['anarkalis'] || 0 },
      { label: 'Kurtis & Tunics', value: 'kurtis', count: counts.categoryCounts['kurtis'] || 0 },
      { label: 'Lehenga Cholis', value: 'lehengas', count: counts.categoryCounts['lehengas'] || 0 },
      { label: 'Pattu Frocks', value: 'pattu-frocks', count: counts.categoryCounts['pattu-frocks'] || 0 },
      { label: 'Indo-Western Gowns', value: 'indo-western', count: counts.categoryCounts['indo-western'] || 0 },
      { label: 'Co-ord Sets', value: 'co-ords', count: counts.categoryCounts['co-ords'] || 0 },
      { label: 'Boys Kurta Sets', value: 'kids-kurta', count: counts.categoryCounts['kids-kurta'] || 0 },
      { label: 'Girls Lehengas', value: 'kids-lehenga', count: counts.categoryCounts['kids-lehenga'] || 0 },
    ];

    const all = [...customList, ...womenList, ...kidsList];
    // Deduplicate by value
    const map = new Map<string, typeof all[0]>();
    all.forEach((item) => {
      if (!map.has(item.value)) map.set(item.value, item);
    });
    return Array.from(map.values());
  }, [counts]);

  return (
    <aside className="w-full space-y-6 text-inkNavy font-sans text-xs">
      
      {/* Sidebar Top Title */}
      <div className="flex items-center justify-between pb-3 border-b border-zariGold/25">
        <div>
          <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.22em] uppercase block">
            REFINE SELECTION
          </span>
          <h4 className="text-sm font-serif font-bold text-inkNavy">PERSISTENT FILTERS</h4>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-[10.5px] text-zariGold hover:text-inkNavy transition-colors font-sans font-bold uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      {/* 1. DEPARTMENT (WOMEN / KIDS) */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('target')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div>
            <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.2em] uppercase block">
              TARGET AUDIENCE
            </span>
            <span className="font-serif font-bold text-sm text-inkNavy group-hover:text-zariGold transition-colors">
              Department
            </span>
          </div>
          {openSections.target ? <ChevronUp className="w-3.5 h-3.5 text-zariGold" /> : <ChevronDown className="w-3.5 h-3.5 text-zariGold" />}
        </button>
        {openSections.target && (
          <div className="space-y-2.5 pt-3 pl-0.5">
            {TARGET_OPTIONS.map((opt) => {
              const count = counts.targetCounts[opt.value] || 0;
              const isSelected = filters.target.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between cursor-pointer select-none py-0.5 ${
                    count === 0 ? 'opacity-40 pointer-events-none' : 'hover:text-zariGold'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleArrayToggle('target', opt.value)}
                      className="rounded border-zariGold/40 text-navy focus:ring-zariGold accent-[#B4863C] w-4 h-4 cursor-pointer"
                    />
                    <span className={`text-xs font-sans ${isSelected ? 'font-bold text-navy' : 'font-medium text-inkNavy/85'}`}>
                      {opt.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-zariGold/80">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. CATEGORY ACCORDION */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div>
            <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.2em] uppercase block">
              SILHOUETTE &amp; STYLE
            </span>
            <span className="font-serif font-bold text-sm text-inkNavy group-hover:text-zariGold transition-colors">
              Category
            </span>
          </div>
          {openSections.category ? <ChevronUp className="w-3.5 h-3.5 text-zariGold" /> : <ChevronDown className="w-3.5 h-3.5 text-zariGold" />}
        </button>
        {openSections.category && (
          <div className="space-y-2.5 pt-3 pl-0.5 max-h-56 overflow-y-auto pr-1.5 no-scrollbar">
            {categoryOptions.map((opt) => {
              const isSelected = filters.category.includes(opt.value);
              const count = opt.count;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between cursor-pointer select-none py-0.5 ${
                    count === 0 ? 'opacity-40 pointer-events-none' : 'hover:text-zariGold'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate max-w-[85%]">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleArrayToggle('category', opt.value)}
                      className="rounded border-zariGold/40 text-navy focus:ring-zariGold accent-[#B4863C] w-4 h-4 cursor-pointer shrink-0"
                    />
                    <span className={`text-xs font-sans truncate ${isSelected ? 'font-bold text-navy' : 'font-medium text-inkNavy/85'}`}>
                      {opt.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-zariGold/80 shrink-0">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. OCCASION ACCORDION */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div>
            <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.2em] uppercase block">
              EVENT &amp; CELEBRATION
            </span>
            <span className="font-serif font-bold text-sm text-inkNavy group-hover:text-zariGold transition-colors">
              Occasion
            </span>
          </div>
          {openSections.occasion ? <ChevronUp className="w-3.5 h-3.5 text-zariGold" /> : <ChevronDown className="w-3.5 h-3.5 text-zariGold" />}
        </button>
        {openSections.occasion && (
          <div className="space-y-2.5 pt-3 pl-0.5">
            {OCCASION_OPTIONS.map((opt) => {
              const count = counts.occasionCounts[opt.value] || 0;
              const isSelected = filters.occasion.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between cursor-pointer select-none py-0.5 ${
                    count === 0 ? 'opacity-40 pointer-events-none' : 'hover:text-zariGold'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleArrayToggle('occasion', opt.value)}
                      className="rounded border-zariGold/40 text-navy focus:ring-zariGold accent-[#B4863C] w-4 h-4 cursor-pointer"
                    />
                    <span className={`text-xs font-sans ${isSelected ? 'font-bold text-navy' : 'font-medium text-inkNavy/85'}`}>
                      {opt.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-zariGold/80">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. SIZE PILLS ACCORDION */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div>
            <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.2em] uppercase block">
              AVAILABILITY
            </span>
            <span className="font-serif font-bold text-sm text-inkNavy group-hover:text-zariGold transition-colors">
              Size
            </span>
          </div>
          {openSections.size ? <ChevronUp className="w-3.5 h-3.5 text-zariGold" /> : <ChevronDown className="w-3.5 h-3.5 text-zariGold" />}
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-1.5 pt-3">
            {SIZE_OPTIONS.map((size) => {
              const selected = filters.size.includes(size);
              const count = counts.sizeCounts[size] || 0;
              return (
                <button
                  key={size}
                  onClick={() => handleArrayToggle('size', size)}
                  disabled={count === 0}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-bold border transition-all cursor-pointer ${
                    selected
                      ? 'bg-navy text-ivory border-navy shadow-xs'
                      : count === 0
                      ? 'bg-ivory text-inkNavy/30 border-zariGold/15 cursor-not-allowed opacity-50'
                      : 'bg-ivory text-inkNavy/85 border-zariGold/35 hover:border-zariGold hover:text-zariGold'
                  }`}
                >
                  {size} {count > 0 && <span className="text-[9.5px] text-zariGold ml-0.5">({count})</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. FABRIC ACCORDION */}
      <div className="border-b border-zariGold/15 pb-4">
        <button
          onClick={() => toggleSection('fabric')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <div>
            <span className="font-sans font-extrabold text-[9.5px] text-zariGold tracking-[0.2em] uppercase block">
              TEXTURE &amp; WEAVE
            </span>
            <span className="font-serif font-bold text-sm text-inkNavy group-hover:text-zariGold transition-colors">
              Fabric
            </span>
          </div>
          {openSections.fabric ? <ChevronUp className="w-3.5 h-3.5 text-zariGold" /> : <ChevronDown className="w-3.5 h-3.5 text-zariGold" />}
        </button>
        {openSections.fabric && (
          <div className="space-y-2.5 pt-3 pl-0.5">
            {FABRIC_KEYWORDS.map((fab) => {
              const count = counts.fabricCounts[fab.value] || 0;
              const isSelected = filters.fabric.includes(fab.value);
              return (
                <label
                  key={fab.value}
                  className={`flex items-center justify-between cursor-pointer select-none py-0.5 ${
                    count === 0 ? 'opacity-40 pointer-events-none' : 'hover:text-zariGold'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleArrayToggle('fabric', fab.value)}
                      className="rounded border-zariGold/40 text-navy focus:ring-zariGold accent-[#B4863C] w-4 h-4 cursor-pointer"
                    />
                    <span className={`text-xs font-sans ${isSelected ? 'font-bold text-navy' : 'font-medium text-inkNavy/85'}`}>
                      {fab.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-zariGold/80">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* STOCK AVAILABILITY CHECKBOX */}
      <div className="pt-1">
        <label className="flex items-center space-x-2.5 cursor-pointer font-medium text-inkNavy hover:text-zariGold">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-zariGold/40 text-navy focus:ring-zariGold accent-[#B4863C] w-4 h-4 cursor-pointer"
          />
          <span className="text-xs font-sans font-semibold">In Stock Items Only</span>
        </label>
      </div>

    </aside>
  );
};

