'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  target?: 'women' | 'kids';
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose, target = 'women' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-navy/60 backdrop-blur-sm animate-fade-in" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-ivory rounded-3xl p-6 sm:p-8 shadow-2xl border border-roseGold/30 text-navy animate-scale-up">
          
          <div className="flex items-center justify-between pb-4 border-b border-roseGold/20">
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-roseGold" />
              <h3 className="text-xl font-serif font-bold text-navy">
                {target === 'kids' ? "Kids Ethnic Size Guide (Years)" : "Women's Couture Size Guide (Inches)"}
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-roseGold/10 text-charcoal">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-4 text-xs font-sans">
            <p className="text-charcoal-muted">
              All measurements are specified in inches. For custom blouse or lehenga fitting, our concierge will contact you after order placement.
            </p>

            {target === 'women' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-roseGold/20">
                  <thead>
                    <tr className="bg-blush/20 text-navy font-serif font-bold">
                      <th className="p-3 border border-roseGold/20">Size</th>
                      <th className="p-3 border border-roseGold/20">Bust (in)</th>
                      <th className="p-3 border border-roseGold/20">Waist (in)</th>
                      <th className="p-3 border border-roseGold/20">Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roseGold/10 text-charcoal">
                    <tr>
                      <td className="p-3 font-semibold text-navy">XS</td>
                      <td className="p-3">32 - 33</td>
                      <td className="p-3">26 - 27</td>
                      <td className="p-3">36 - 37</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">S</td>
                      <td className="p-3">34 - 35</td>
                      <td className="p-3">28 - 29</td>
                      <td className="p-3">38 - 39</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">M</td>
                      <td className="p-3">36 - 37</td>
                      <td className="p-3">30 - 31</td>
                      <td className="p-3">40 - 41</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">L</td>
                      <td className="p-3">38 - 40</td>
                      <td className="p-3">32 - 34</td>
                      <td className="p-3">42 - 44</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">XL</td>
                      <td className="p-3">41 - 43</td>
                      <td className="p-3">35 - 37</td>
                      <td className="p-3">45 - 47</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-roseGold/20">
                  <thead>
                    <tr className="bg-blush/20 text-navy font-serif font-bold">
                      <th className="p-3 border border-roseGold/20">Age Group</th>
                      <th className="p-3 border border-roseGold/20">Chest (in)</th>
                      <th className="p-3 border border-roseGold/20">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-roseGold/10 text-charcoal">
                    <tr>
                      <td className="p-3 font-semibold text-navy">1 - 2 Years</td>
                      <td className="p-3">20 - 21</td>
                      <td className="p-3">22 - 24</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">2 - 3 Years</td>
                      <td className="p-3">22 - 23</td>
                      <td className="p-3">26 - 28</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">4 - 5 Years</td>
                      <td className="p-3">24 - 25</td>
                      <td className="p-3">30 - 32</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">6 - 7 Years</td>
                      <td className="p-3">26 - 27</td>
                      <td className="p-3">34 - 36</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">8 - 9 Years</td>
                      <td className="p-3">28 - 29</td>
                      <td className="p-3">38 - 40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-roseGold/20 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-navy text-ivory text-xs font-bold uppercase tracking-wider hover:bg-roseGold hover:text-navy transition-all"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
