'use client';

import React, { useState } from 'react';
import { CloseIcon, RulerIcon } from '@/components/ui/BrandIcons';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  target?: 'women' | 'kids';
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  target = 'women',
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const toCm = (valInInches: string) => {
    // converts range string e.g. "32 - 33" to "81 - 84 cm"
    return valInInches
      .split('-')
      .map((v) => Math.round(parseFloat(v.trim()) * 2.54))
      .join(' - ');
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-ivory rounded-3xl p-6 sm:p-8 shadow-2xl border border-roseGold/30 text-navy animate-scale-up">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-roseGold/20">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-roseGold/15 border border-roseGold/30 flex items-center justify-center text-roseGold">
                <RulerIcon className="w-4 h-4 text-roseGold" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-navy">
                {target === 'kids' ? 'Kids Ethnic Size Guide' : "Women's Fit & Measurement Guide"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-roseGold/10 text-navy/70 hover:text-navy transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Selector Toggle (Inches / CM) */}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-sans text-navy/70">
              Select your preferred measurement unit:
            </p>
            <div className="inline-flex p-0.5 rounded-lg bg-sand/30 border border-roseGold/30">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'in' ? 'bg-navy text-ivory shadow-2xs' : 'text-navy/70 hover:text-navy'
                }`}
              >
                Inches (&quot;)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'cm' ? 'bg-navy text-ivory shadow-2xs' : 'text-navy/70 hover:text-navy'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurement Tables */}
          <div className="mt-4 space-y-4 text-xs font-sans">
            {target === 'women' ? (
              <div className="overflow-x-auto rounded-xl border border-roseGold/25 shadow-2xs">
                <table className="w-full text-left border-collapse bg-white/80">
                  <thead>
                    <tr className="bg-sand/30 text-navy font-serif font-bold border-b border-roseGold/20">
                      <th className="p-3 border-r border-roseGold/20">Size</th>
                      <th className="p-3 border-r border-roseGold/20">Bust ({unit})</th>
                      <th className="p-3 border-r border-roseGold/20">Waist ({unit})</th>
                      <th className="p-3 border-r border-roseGold/20">Hips ({unit})</th>
                      <th className="p-3">Length ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roseGold/10 text-navy/90">
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">XS</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '32 - 33' : toCm('32 - 33')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '26 - 27' : toCm('26 - 27')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '36 - 37' : toCm('36 - 37')}</td>
                      <td className="p-3">{unit === 'in' ? '54 - 55' : toCm('54 - 55')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">S</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '34 - 35' : toCm('34 - 35')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '28 - 29' : toCm('28 - 29')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '38 - 39' : toCm('38 - 39')}</td>
                      <td className="p-3">{unit === 'in' ? '55 - 56' : toCm('55 - 56')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">M</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '36 - 37' : toCm('36 - 37')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '30 - 31' : toCm('30 - 31')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '40 - 41' : toCm('40 - 41')}</td>
                      <td className="p-3">{unit === 'in' ? '56 - 57' : toCm('56 - 57')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">L</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '38 - 40' : toCm('38 - 40')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '32 - 34' : toCm('32 - 34')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '42 - 44' : toCm('42 - 44')}</td>
                      <td className="p-3">{unit === 'in' ? '57 - 58' : toCm('57 - 58')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">XL</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '41 - 43' : toCm('41 - 43')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '35 - 37' : toCm('35 - 37')}</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '45 - 47' : toCm('45 - 47')}</td>
                      <td className="p-3">{unit === 'in' ? '58 - 59' : toCm('58 - 59')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-roseGold/25 shadow-2xs">
                <table className="w-full text-left border-collapse bg-white/80">
                  <thead>
                    <tr className="bg-sand/30 text-navy font-serif font-bold border-b border-roseGold/20">
                      <th className="p-3 border-r border-roseGold/20">Age Group</th>
                      <th className="p-3 border-r border-roseGold/20">Chest ({unit})</th>
                      <th className="p-3">Frock Length ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roseGold/10 text-navy/90">
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">1 - 2 Years</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '20 - 21' : toCm('20 - 21')}</td>
                      <td className="p-3">{unit === 'in' ? '22 - 24' : toCm('22 - 24')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">2 - 3 Years</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '22 - 23' : toCm('22 - 23')}</td>
                      <td className="p-3">{unit === 'in' ? '26 - 28' : toCm('26 - 28')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">4 - 5 Years</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '24 - 25' : toCm('24 - 25')}</td>
                      <td className="p-3">{unit === 'in' ? '30 - 32' : toCm('30 - 32')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">6 - 7 Years</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '26 - 27' : toCm('26 - 27')}</td>
                      <td className="p-3">{unit === 'in' ? '34 - 36' : toCm('34 - 36')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy border-r border-roseGold/10">8 - 9 Years</td>
                      <td className="p-3 border-r border-roseGold/10">{unit === 'in' ? '28 - 29' : toCm('28 - 29')}</td>
                      <td className="p-3">{unit === 'in' ? '38 - 40' : toCm('38 - 40')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* "HOW TO MEASURE" DIAGRAM / GUIDE */}
            <div className="p-4 rounded-xl bg-sand/20 border border-roseGold/25 space-y-2 mt-4">
              <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-1.5">
                <span className="text-roseGold font-serif">❖</span> How To Take Your Measurements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-navy/80 pt-1">
                <div className="p-2.5 rounded-lg bg-white/70 border border-roseGold/20">
                  <strong className="block text-navy mb-0.5">1. Bust / Chest</strong>
                  Measure around the fullest part of your bust while keeping the tape parallel to the floor.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 border border-roseGold/20">
                  <strong className="block text-navy mb-0.5">2. Natural Waist</strong>
                  Measure around your natural waistline, typically the narrowest point of your torso.
                </div>
                <div className="p-2.5 rounded-lg bg-white/70 border border-roseGold/20">
                  <strong className="block text-navy mb-0.5">3. Full Hip</strong>
                  Stand with feet together and measure around the fullest part of your hips and rear.
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-4 border-t border-roseGold/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl btn-gold-gradient text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
