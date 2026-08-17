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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-nearBlack/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory text-inkNavy shadow-2xl flex flex-col justify-between border-l border-zariGold/30 animate-slide-in-right">
          
          {/* Top Header */}
          <div className="p-6 border-b border-zariGold/20 flex items-center justify-between bg-ivory">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-zariGold" />
              <h2 className="text-xl font-serif font-semibold text-inkNavy">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/50 text-inkNavy transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-sand/30 border-b border-zariGold/20">
            <div className="flex items-center justify-between text-xs font-sans text-inkNavy mb-1.5">
              <div className="flex items-center space-x-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-zariGold" />
                <span>
                  {amountNeededForFreeShipping > 0
                    ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Pan-India Shipping!`
                    : '🎉 You have unlocked FREE Pan-India Shipping!'}
                </span>
              </div>
              <span className="font-semibold text-zariGold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-ivory rounded-full h-2 overflow-hidden border border-zariGold/20">
              <div
                className="bg-gold-gradient h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Line Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sand/50 text-zariGold flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-inkNavy">Your Bag is Empty</h3>
                <p className="text-xs text-inkNavy/60 max-w-xs mx-auto">
                  Discover our exclusive handcrafted sarees, pattu frocks, and festive ethnic wear.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-[2px] btn-gold-gradient text-xs font-semibold uppercase tracking-[0.2em] shadow-md"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 p-3.5 rounded-[2px] bg-white border border-zariGold/20 shadow-xs"
                >
                  <div className="arch-frame-sm relative w-20 h-24 shrink-0">
                    <div className="arch-inner relative w-full h-full">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-serif font-semibold text-inkNavy truncate max-w-[180px]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-inkNavy/40 hover:text-oxblood p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-inkNavy/60 space-x-2 mt-0.5 font-sans">
                        <span>Size: <strong className="text-inkNavy">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-inkNavy">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zariGold/40 rounded-[2px] px-2 py-0.5 bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-inkNavy hover:text-zariGold p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-inkNavy">
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

                      <div className="text-sm font-semibold text-inkNavy">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zariGold/20 bg-ivory space-y-4">
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-inkNavy/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-inkNavy">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-inkNavy/70">
                  <span>Shipping</span>
                  <span className="font-semibold text-zariGold">
                    {amountNeededForFreeShipping === 0 ? 'FREE' : 'Calculated at Checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-inkNavy pt-2 border-t border-zariGold/20">
                  <span>Total</span>
                  <span className="text-zariGold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 rounded-[2px] btn-gold-gradient text-xs font-semibold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-inkNavy/60 pt-1">
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
