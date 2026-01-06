"use client";
import React, { useState } from 'react';
import type { Product } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import VariantSelector from '../VariantSelector';

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
  };

  return (
    <>
      <div className="card p-4 flex flex-col gap-3 min-h-[220px]">
        <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.title} className="object-contain h-full w-full" />
          ) : (
            <div className="text-sm text-muted-foreground">No image</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku ?? '—'}</p>
          {product.hasVariants && (
            <p className="text-xs text-blue-500 mt-1">Multiple options available</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">₹{product.price}</div>
            <div className="text-xs text-muted-foreground">{product.inStock ? 'In stock' : 'Out of stock'}</div>
          </div>
          <button
            onClick={handleAddClick}
            className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            {product.hasVariants ? 'Select Options' : 'Add'}
          </button>
        </div>
      </div>

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
