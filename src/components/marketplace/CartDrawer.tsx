"use client";
import React from 'react';
import { useCart } from '@/context/cart-context';
import { Trash2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, open, setOpen, remove, updateQty, subtotal, pincode, setPincode, deliveryCharge, smallCartFee, total, isPincodeValid } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!isPincodeValid) {
      alert('Please enter a valid 6-digit pincode to proceed.');
      return;
    }
    setOpen(false);
    router.push('/marketplace/checkout');
  };

  return (
    <div>
      {/* overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-background text-foreground transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h3 className="font-semibold">Shopping Cart</h3>
          <button onClick={() => setOpen(false)} className="text-muted-foreground">Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-380px)]">
          {items.length === 0 ? (
            <div className="text-sm text-muted-foreground">Your cart is empty.</div>
          ) : (
            items.map(it => (
              <div key={it.variantSKU || it.product.id} className="flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-700 rounded flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {it.product.image ? <img src={it.product.image} alt={it.product.title} className="object-contain h-full w-full" /> : null}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{it.product.title}</div>
                  {it.selectedVariants && Object.keys(it.selectedVariants).length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.entries(it.selectedVariants).map(([key, value]) => (
                        <div key={key}>{key}: {value}</div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">₹{it.product.price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-2 rounded bg-border" onClick={() => updateQty(it.product.id, it.quantity - 1, it.variantSKU)}>-</button>
                    <div className="px-2">{it.quantity}</div>
                    <button className="px-2 rounded bg-border" onClick={() => updateQty(it.product.id, it.quantity + 1, it.variantSKU)}>+</button>
                    <button className="ml-3 p-2 rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground flex items-center justify-center" onClick={() => remove(it.product.id, it.variantSKU)} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pincode Section */}
        <div className="px-4 py-3 border-t border-border">
          <label className="text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin size={16} />
            Delivery Pincode
          </label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {isPincodeValid && (
            <div className="mt-2 text-sm">
              {deliveryCharge === 0 ? (
                <span className="text-green-500 font-medium">✓ Free Delivery Available</span>
              ) : (
                <span className="text-orange-500 font-medium">Delivery Charge: ₹{deliveryCharge}</span>
              )}
            </div>
          )}
          {pincode && !isPincodeValid && (
            <div className="mt-2 text-sm text-red-500">
              Please enter a valid 6-digit pincode
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Subtotal</div>
              <div className="font-semibold">₹{subtotal}</div>
            </div>
            {smallCartFee > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Small Cart Fee</div>
                <div className="font-semibold text-orange-500">₹{smallCartFee}</div>
              </div>
            )}
            {isPincodeValid && deliveryCharge > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Delivery Charge</div>
                <div className="font-semibold">₹{deliveryCharge}</div>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="text-sm font-medium">Total</div>
              <div className="text-lg font-bold">₹{isPincodeValid ? total : subtotal + smallCartFee}</div>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </button>
          <button 
            onClick={() => setOpen(false)}
            className="w-full mt-3 py-2 rounded-md bg-transparent border border-border text-sm hover:bg-border/50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </div>
  );
}
