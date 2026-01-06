"use client";
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/lib/products';
import { calculateDistance, getDeliveryCharge, isValidPincode } from '@/lib/delivery';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>; // variant name -> selected value
  variantSKU?: string;  // Generated SKU for this specific variant
}

// Constants for small cart fee
const SMALL_CART_THRESHOLD = 100; // Orders under ₹100
const SMALL_CART_FEE = 50; // ₹50 handling fee

interface CartContextValue {
  items: CartItem[];
  add: (p: Product, qty?: number, variants?: Record<string, string>) => void;
  remove: (id: string, variantSKU?: string) => void;
  updateQty: (id: string, qty: number, variantSKU?: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  subtotal: number;
  pincode: string;
  setPincode: (pincode: string) => void;
  deliveryCharge: number;
  smallCartFee: number;
  total: number;
  isPincodeValid: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [pincode, setPincodeState] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const generateVariantSKU = (productId: string, variants?: Record<string, string>): string => {
    if (!variants || Object.keys(variants).length === 0) return productId;
    const variantString = Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    // Use encodeURIComponent to handle Unicode characters like Ω, µ, etc.
    const encoded = encodeURIComponent(variantString);
    return `${productId}-${encoded}`;
  };

  const add = (p: Product, qty = 1, variants?: Record<string, string>) => {
    setItems(prev => {
      const variantSKU = generateVariantSKU(p.id, variants);
      console.log('🛒 Adding to cart:', {
        productId: p.id,
        productTitle: p.title,
        variants,
        generatedSKU: variantSKU,
        currentCartItems: prev.map(i => ({ id: i.product.id, sku: i.variantSKU, variants: i.selectedVariants }))
      });
      
      const found = prev.find(i => i.product.id === p.id && i.variantSKU === variantSKU);
      console.log('🔍 Found existing item:', found ? 'YES - incrementing quantity' : 'NO - adding new item');
      
      if (found) {
        return prev.map(i => 
          i.product.id === p.id && i.variantSKU === variantSKU
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product: p, quantity: qty, selectedVariants: variants, variantSKU }];
    });
    setOpen(true);
  };

  const remove = (id: string, variantSKU?: string) => {
    setItems(prev => {
      if (variantSKU) {
        return prev.filter(i => !(i.product.id === id && i.variantSKU === variantSKU));
      }
      return prev.filter(i => i.product.id !== id);
    });
  };
  const updateQty = (id: string, qty: number, variantSKU?: string) => {
    setItems(prev => {
      // If quantity reaches 0 or below, remove the item; otherwise update quantity
      if (qty <= 0) {
        if (variantSKU) {
          return prev.filter(i => !(i.product.id === id && i.variantSKU === variantSKU));
        }
        return prev.filter(i => i.product.id !== id);
      }
      if (variantSKU) {
        return prev.map(i => i.product.id === id && i.variantSKU === variantSKU ? { ...i, quantity: qty } : i);
      }
      return prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i);
    });
  };

  const setPincode = (newPincode: string) => {
    setPincodeState(newPincode);
    
    if (isValidPincode(newPincode)) {
      const charge = getDeliveryCharge(newPincode);
      setDeliveryCharge(charge);
    } else {
      setDeliveryCharge(0);
    }
  };

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.product.price * it.quantity, 0), [items]);
  
  // Calculate small cart fee for orders under ₹10
  const smallCartFee = useMemo(() => {
    if (subtotal > 0 && subtotal < SMALL_CART_THRESHOLD) {
      return SMALL_CART_FEE;
    }
    return 0;
  }, [subtotal]);
  
  const total = useMemo(() => subtotal + deliveryCharge + smallCartFee, [subtotal, deliveryCharge, smallCartFee]);
  const isPincodeValid = useMemo(() => isValidPincode(pincode), [pincode]);

  return (
    <CartContext.Provider value={{ 
      items, 
      add, 
      remove, 
      updateQty, 
      open, 
      setOpen, 
      subtotal,
      pincode,
      setPincode,
      deliveryCharge,
      smallCartFee,
      total,
      isPincodeValid
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
