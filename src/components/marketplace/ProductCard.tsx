"use client";
import React, { useState, useMemo } from 'react';
import type { Product } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import VariantSelector from '../VariantSelector';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Users, Eye, Clock, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [showVariantSelector, setShowVariantSelector] = useState(false);

  const handleAddClick = () => {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      setShowVariantSelector(true);
    } else {
      add(product, 1);
    }
  };

  const handleAddToCart = (selectedVariants: Record<string, string>, quantity: number) => {
    add(product, quantity, selectedVariants);
    setShowVariantSelector(false);
  };

  const randomStock = useMemo(() => (product.id.charCodeAt(product.id.length - 1) % 5) + 1, [product.id]);
  const boughtCount = useMemo(() => (product.id.charCodeAt(0) * 3) % 40 + 5, [product.id]);

  const recordRecentView = () => {
    try {
      const raw = localStorage.getItem('recentlyViewed') || '[]';
      const arr: string[] = JSON.parse(raw);
      if (!arr.includes(product.id)) {
        arr.unshift(product.id);
        localStorage.setItem('recentlyViewed', JSON.stringify(arr.slice(0, 4)));
        window.dispatchEvent(new Event('recentlyViewedEvent'));
      }
    } catch(e){}
  };

  return (
    <>
      <Dialog>
        <div className="card p-0 flex flex-col min-h-[260px] relative group overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
          
          <DialogTrigger asChild>
            <div onClick={recordRecentView} className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden cursor-pointer relative">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.title} className="object-contain h-[80%] w-[80%] group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="text-sm text-muted-foreground">No image</div>
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <span className="bg-white/90 text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Eye className="w-4 h-4" /> Quick View
                </span>
              </div>
            </div>
          </DialogTrigger>

          <div className="flex-1 p-4 flex flex-col gap-1">
            <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
            
            <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-medium">
                <Users className="w-3.5 h-3.5" />
                <span>{boughtCount} students bought this</span>
            </div>
            
            {product.inStock && randomStock <= 3 && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-bold mt-1 animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>Only {randomStock} left in stock!</span>
              </div>
            )}
            
            <div className="mt-auto pt-3 flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-primary">₹{product.price}</div>
              </div>
              <button
                onClick={handleAddClick}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-border/50">
           <div className="grid sm:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 flex items-center justify-center">
                 {product.image ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={product.image} alt={product.title} className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform" />
                 ) : (
                   <div className="text-muted-foreground">No imagery available</div>
                 )}
              </div>
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2 leading-tight">{product.title}</h2>
                <p className="text-xs text-muted-foreground mb-4 font-mono bg-muted/50 inline-block px-2 py-1 rounded w-fit">SKU: {product.sku ?? '—'}</p>
                
                <div className="text-3xl font-black text-primary mb-4">₹{product.price}</div>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     {product.inStock ? 'Ready to ship instantly' : 'Backordered'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-600 font-medium bg-orange-500/10 p-2 rounded-lg">
                      <Users className="w-4 h-4" /> 
                      {boughtCount} students recently bought this kit
                  </div>
                </div>

                <button
                  onClick={handleAddClick}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.hasVariants ? 'Configure Options' : 'Add to Cart — ₹'+product.price}
                </button>
              </div>
           </div>
        </DialogContent>
      </Dialog>

      {product.hasVariants && (
        <VariantSelector
          product={product}
          isOpen={showVariantSelector}
          onClose={() => setShowVariantSelector(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
