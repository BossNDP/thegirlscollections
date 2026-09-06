'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    freeShippingProgress,
    amountNeededForFreeShipping,
  } = useShop();

  if (!isCartOpen) return null;

  const formatPrice = (priceInPaiseOrRupees: number) => {
    const rupees = priceInPaiseOrRupees > 100000 ? Math.round(priceInPaiseOrRupees / 100) : priceInPaiseOrRupees;
    return `₹${rupees.toLocaleString('en-IN')}`;
  };

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-nearBlack/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none z-10">
        <div className="w-screen max-w-full sm:max-w-md bg-ivory text-inkNavy shadow-2xl flex flex-col justify-between border-l border-zariGold/30 pointer-events-auto transition-transform duration-300">
          
          {/* TOP HEADER WITH SAFE AREA TOP INSET */}
          <div className="px-5 sm:px-6 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] pb-4 border-b border-zariGold/20 flex items-center justify-between bg-ivory shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-zariGold/15 border border-zariGold/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-zariGold" />
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-inkNavy">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full border border-zariGold/30 hover:border-zariGold hover:bg-zariGold/10 flex items-center justify-center text-inkNavy transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="px-5 sm:px-6 py-3 bg-sand/30 border-b border-zariGold/20 shrink-0">
            <div className="flex items-center justify-between text-xs font-sans text-inkNavy mb-1.5">
              <div className="flex items-center space-x-1.5 font-medium truncate mr-2">
                <Truck className="w-3.5 h-3.5 text-zariGold shrink-0" />
                <span className="truncate">
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Pan-India Shipping!`
                    : '🎉 You have unlocked FREE Pan-India Shipping!'}
                </span>
              </div>
              <span className="font-bold text-zariGold shrink-0">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-ivory rounded-full h-1.5 overflow-hidden border border-zariGold/20">
              <div
                className="bg-gold-gradient h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* LINE ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 sm:space-y-6">
            {cart.length === 0 ? (
              <div className="py-12 sm:py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sand/40 border border-zariGold/30 text-zariGold flex items-center justify-center mx-auto shadow-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-inkNavy">Your Bag is Empty</h3>
                <p className="text-xs sm:text-sm font-sans text-inkNavy/70 max-w-xs mx-auto leading-relaxed">
                  Discover our exclusive handcrafted anarkalis, pattu frocks, and festive ethnic wear.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-md btn-gold-gradient text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-md transition-transform active:scale-95"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-white" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-3.5 p-3 rounded-xl bg-white border border-zariGold/20 shadow-xs"
                >
                  <div className="relative w-18 h-22 sm:w-20 sm:h-24 rounded-lg overflow-hidden shrink-0 border border-zariGold/25">
                    {item.product.images && item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-sand/30 flex items-center justify-center text-zariGold font-serif font-bold text-lg">
                        TGC
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-inkNavy line-clamp-1 max-w-[160px] sm:max-w-[180px]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-inkNavy/40 hover:text-oxblood p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-inkNavy/60 space-x-1.5 mt-0.5 font-sans">
                        <span>Size: <strong className="text-inkNavy font-semibold">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <>
                            <span>•</span>
                            <span>Color: <strong className="text-inkNavy font-semibold">{item.selectedColor}</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zariGold/40 rounded-md px-2 py-0.5 bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-inkNavy hover:text-zariGold p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-inkNavy font-tnum">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-inkNavy hover:text-zariGold p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-inkNavy font-tnum">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* CART FOOTER WITH SAFE AREA BOTTOM INSET */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] border-t border-zariGold/20 bg-ivory space-y-3.5 shrink-0">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-inkNavy/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-inkNavy font-tnum">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-inkNavy/70">
                  <span>Shipping</span>
                  <span className="font-bold text-zariGold">
                    {amountNeededForFreeShipping === 0 ? 'FREE' : 'Calculated at Checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-inkNavy pt-2 border-t border-zariGold/20">
                  <span>Total</span>
                  <span className="text-zariGold font-tnum">{formatPrice(cartSubtotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 rounded-md btn-gold-gradient text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <div className="flex items-center justify-center space-x-1.5 text-[10.5px] text-inkNavy/60 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zariGold" />
                <span>100% Secure Checkout • Cash on Delivery Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
