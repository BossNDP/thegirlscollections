'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { MOCK_PRODUCTS, Product } from '@/data/shopData';

const TRENDING_TAGS = ["Organza Sarees", "Pattu Frocks", "Zari Lehengas", "Boys Dhoti Set", "Rose Gold Anarkali"];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const q = query.toLowerCase();
      const filtered = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy/95 backdrop-blur-lg text-ivory animate-fade-in overflow-y-auto">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-4 flex items-center justify-between border-b border-roseGold/20">
        <span className="text-xs uppercase tracking-eyebrow text-roseGold font-sans">
          The Girls Collection Catalog Search
        </span>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 rounded-full hover:bg-roseGold/20 text-ivory transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        <div className="relative flex items-center border-b-2 border-roseGold py-3">
          <Search className="w-8 h-8 text-roseGold mr-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, pattu frocks, lehengas, kurtis..."
            autoFocus
            className="w-full bg-transparent text-xl sm:text-3xl text-ivory placeholder-ivory/40 focus:outline-none font-serif"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-ivory/60 hover:text-ivory p-1">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Trending Tags */}
        {query.trim() === '' && (
          <div className="mt-10">
            <div className="flex items-center text-xs uppercase tracking-wider text-roseGold mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 rounded-full border border-roseGold/30 text-sm font-sans text-ivory/80 hover:bg-roseGold/20 hover:text-roseGold transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {query.trim() !== '' && (
          <div className="mt-10">
            <div className="text-xs uppercase tracking-wider text-roseGold mb-6">
              Found {results.length} product{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center text-ivory/60 font-serif text-lg">
                No items match your search. Try searching for &quot;Saree&quot;, &quot;Pattu Frock&quot;, or &quot;Lehenga&quot;.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group flex items-center p-3 rounded-xl bg-ivory/5 border border-roseGold/20 hover:bg-roseGold/10 transition-all"
                  >
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-roseGold font-sans block">
                        {product.subcategory}
                      </span>
                      <h4 className="text-sm font-serif font-semibold text-ivory truncate group-hover:text-roseGold transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-roseGold mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-roseGold/60 group-hover:text-roseGold group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
