'use client';

import React, { useState } from 'react';
import { Product } from '@/data/shopData';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Plus, Minus, ShieldCheck, Truck, RefreshCw, Ruler, Star, Check } from 'lucide-react';
import { SizeChartModal } from './SizeChartModal';
import { ProductAccordions } from './ProductAccordions';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || 'Free Size'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6 text-inkNavy font-sans select-none">
      
      {/* Category Eyebrow & Ratings */}
      <div className="flex items-center justify-between">
        <span className="eyebrow-text text-zariGoldLight capitalize">
          THE GIRLS COLLECTIONS • {product.target}&apos;S {product.subcategory}
        </span>
        <div className="flex items-center space-x-1 text-xs text-zariGold font-semibold">
          <Star className="w-3.5 h-3.5 fill-zariGold text-zariGold" />
          <span>{product.rating}</span>
          <span className="text-inkNavy/50 font-normal">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Product Title (Cormorant Garamond Display Serif) */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-inkNavy leading-snug">
        {product.name}
      </h1>

      {/* Price & Discount */}
      <div className="flex items-baseline space-x-3 border-b border-zariGold/20 pb-5">
        <span className="text-2xl sm:text-3xl font-bold text-inkNavy font-tnum">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-sm text-inkNavy/40 line-through font-tnum">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="px-2.5 py-1 rounded-[2px] bg-oxblood text-white text-[9px] font-bold uppercase tracking-[0.2em]">
              Save {discountPercent}%
            </span>
          </>
        )}
        <span className="text-[11px] text-inkNavy/60 block ml-auto">Inclusive of all taxes</span>
      </div>

      {/* Color Variant Selector */}
      {product.colors.length > 0 && (
        <div className="space-y-2 pt-1">
          <label className="text-xs font-sans font-medium text-inkNavy uppercase tracking-[0.14em] block">
            Color: <span className="text-zariGold font-light">{selectedColor}</span>
          </label>
          <div className="flex items-center space-x-3">
            {product.colors.map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                title={col.name}
                className={`w-7 h-7 rounded-full border transition-all p-0.5 ${
                  selectedColor === col.name ? 'border-zariGold scale-110 shadow-sm' : 'border-transparent opacity-75'
                }`}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10"
                  style={{ backgroundColor: col.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-sans font-medium text-inkNavy uppercase tracking-[0.14em]">
            Size: <span className="text-zariGold font-light">{selectedSize}</span>
          </label>
          <button
            onClick={() => setSizeChartOpen(true)}
            className="flex items-center space-x-1 text-xs text-zariGold hover:text-inkNavy transition-colors font-medium"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const isSelected = selectedSize === s.size;
            return (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={() => setSelectedSize(s.size)}
                className={`px-4 py-2 rounded-[2px] text-xs font-semibold uppercase tracking-wider border transition-all ${
                  !s.inStock
                    ? 'opacity-40 line-through bg-sand/30 border-inkNavy/20 cursor-not-allowed text-inkNavy/40'
                    : isSelected
                    ? 'bg-inkNavy text-ivory border-inkNavy shadow-sm'
                    : 'bg-ivory text-inkNavy border-zariGold/30 hover:border-zariGold'
                }`}
              >
                {s.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Stepper & Add to Bag CTAs */}
      <div className="space-y-4 pt-3">
        <div className="flex items-center space-x-4">
          <label className="text-xs font-sans font-medium text-inkNavy uppercase tracking-[0.14em]">
            Quantity:
          </label>
          <div className="flex items-center border border-zariGold/30 rounded-[2px] px-3 py-1 bg-ivory">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-inkNavy hover:text-zariGold p-1"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-xs font-bold text-inkNavy font-tnum">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-inkNavy hover:text-zariGold p-1"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 py-4 rounded-[2px] btn-gold-gradient text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2.5"
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add To Bag</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-4 rounded-[2px] border border-zariGold/30 transition-all ${
              inWishlist ? 'text-oxblood bg-ivory shadow-sm' : 'text-inkNavy hover:bg-zariGold/10'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Single-Line Trust Indicators */}
      <div className="flex items-center justify-between gap-2 py-3 px-1 text-[11px] text-inkNavy/70 border-t border-b border-zariGold/20 mt-4">
        <div className="flex items-center space-x-1.5">
          <Truck className="w-3.5 h-3.5 text-zariGold shrink-0" />
          <span>Pan-India Dispatch</span>
        </div>
        <span className="text-zariGold/30">•</span>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zariGold shrink-0" />
          <span>COD Available</span>
        </div>
        <span className="text-zariGold/30">•</span>
        <div className="flex items-center space-x-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-zariGold shrink-0" />
          <span>7-Day Easy Returns</span>
        </div>
      </div>

      {/* Product Collapsible Accordions */}
      <ProductAccordions
        description={product.description}
        fabric={product.fabric}
        careInstructions={product.careInstructions}
      />

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        target={product.target}
      />

    </div>
  );
};

export default ProductInfo;
