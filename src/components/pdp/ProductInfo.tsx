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
    <div className="space-y-6 text-navy font-sans">
      
      {/* Category Eyebrow & Ratings */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-eyebrow text-roseGold font-semibold capitalize">
          {product.target}&apos;s • {product.subcategory}
        </span>
        <div className="flex items-center space-x-1 text-xs text-roseGold font-semibold">
          <Star className="w-3.5 h-3.5 fill-roseGold text-roseGold" />
          <span>{product.rating}</span>
          <span className="text-charcoal-muted font-normal">({product.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl sm:text-4xl font-serif font-bold text-navy leading-tight">
        {product.name}
      </h1>

      {/* Price & Discount */}
      <div className="flex items-baseline space-x-3 border-b border-roseGold/20 pb-4">
        <span className="text-2xl sm:text-3xl font-bold text-navy">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-base text-charcoal-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-roseGold/15 text-roseGold-dark text-xs font-bold uppercase">
              Save {discountPercent}%
            </span>
          </>
        )}
        <span className="text-[11px] text-charcoal-muted block">Inclusive of all taxes</span>
      </div>

      {/* Color Variant Selector */}
      {product.colors.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-serif font-bold text-navy uppercase tracking-wider block">
            Color Palette: <span className="text-roseGold font-sans font-normal">{selectedColor}</span>
          </label>
          <div className="flex items-center space-x-3">
            {product.colors.map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                title={col.name}
                className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                  selectedColor === col.name ? 'border-roseGold scale-110 shadow-md' : 'border-transparent opacity-80'
                }`}
              >
                <span
                  className="w-full h-full rounded-full block border border-black/10 shadow-inner"
                  style={{ backgroundColor: col.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-serif font-bold text-navy uppercase tracking-wider">
            Select Size: <span className="text-roseGold font-sans font-normal">{selectedSize}</span>
          </label>
          <button
            onClick={() => setSizeChartOpen(true)}
            className="flex items-center space-x-1 text-xs text-roseGold hover:text-navy transition-colors font-medium"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((s) => {
            const isSelected = selectedSize === s.size;
            return (
              <button
                key={s.size}
                disabled={!s.inStock}
                onClick={() => setSelectedSize(s.size)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  !s.inStock
                    ? 'opacity-40 line-through bg-ivory/50 border-charcoal/20 cursor-not-allowed text-charcoal-muted'
                    : isSelected
                    ? 'bg-navy text-ivory border-navy shadow-md scale-105'
                    : 'bg-white text-navy border-roseGold/30 hover:border-roseGold'
                }`}
              >
                {s.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Stepper & Add to Bag CTAs */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-4">
          <label className="text-xs font-serif font-bold text-navy uppercase tracking-wider">
            Quantity:
          </label>
          <div className="flex items-center border border-roseGold/40 rounded-full px-3 py-1 bg-white">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-navy hover:text-roseGold p-1"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-xs font-bold text-navy">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-navy hover:text-roseGold p-1"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 py-4 rounded-full bg-navy text-ivory text-xs font-bold uppercase tracking-widest hover:bg-roseGold hover:text-navy transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4 text-sage" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-roseGold" />
                <span>Add To Bag</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-4 rounded-full border border-roseGold/40 transition-all ${
              inWishlist ? 'text-red-500 bg-white shadow-md' : 'text-navy hover:bg-roseGold/10'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Trust Microcopy */}
      <div className="grid grid-cols-3 gap-2 pt-4 text-[11px] text-charcoal-muted border-t border-roseGold/20">
        <div className="flex items-center space-x-1.5">
          <Truck className="w-4 h-4 text-roseGold flex-shrink-0" />
          <span>Dispatch in 24h</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-sage flex-shrink-0" />
          <span>COD Available</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <RefreshCw className="w-4 h-4 text-roseGold flex-shrink-0" />
          <span>Easy 7D Returns</span>
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
