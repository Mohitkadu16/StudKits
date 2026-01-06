"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, Package, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { user, isLoading } = useAuth();
  const { items, subtotal, deliveryCharge, smallCartFee, total, pincode, isPincodeValid } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
    
    // Redirect if cart is empty
    if (!isLoading && user && items.length === 0) {
      router.push('/marketplace');
    }
  }, [user, isLoading, items, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render checkout if user is not authenticated
  if (!user) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!paymentMethod) {
      newErrors.payment = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare formatted order summary for Formspree
      const itemsList = items.map(item => {
        const variantInfo = item.selectedVariants 
          ? ' - ' + Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')
          : '';
        return `${item.product.title}${variantInfo} (SKU: ${item.product.sku || 'N/A'}) - Qty: ${item.quantity} - ₹${item.product.price} x ${item.quantity} = ₹${item.product.price * item.quantity}`;
      }).join('\n');
      
      const formspreeData = {
        // Customer Information
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        
        // Delivery Information
        pincode: pincode,
        deliveryType: deliveryCharge === 0 ? 'Free Delivery' : `Delivery Charge: ₹${deliveryCharge}`,
        
        // Payment Method
        paymentMethod: 'Cash on Delivery',
        
        // Order Summary
        orderItems: itemsList,
        
        // Pricing Details
        subtotal: `₹${subtotal}`,
        smallCartFee: smallCartFee > 0 ? `₹${smallCartFee}` : 'No Fee',
        deliveryCharge: deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`,
        totalAmount: `₹${total}`,
        
        // Timestamp
        orderDate: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short'
        }),
        
        // Additional metadata as JSON string for reference
        _metadata: JSON.stringify({
          items: items.map(item => ({
            id: item.product.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            sku: item.product.sku,
            variants: item.selectedVariants,
            variantSKU: item.variantSKU,
          })),
          pricing: { subtotal, smallCartFee, deliveryCharge, total },
        })
      };
      
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xkonpqqv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreeData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit order');
      }
      
      // Log for debugging
      console.log('Order submitted successfully:', formspreeData);
      
      setOrderSuccess(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We'll deliver your items soon.
          </p>
          <button
            onClick={() => router.push('/marketplace')}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Delivery Information</h2>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Delivery Pincode</div>
                <div className="font-semibold">{pincode}</div>
                {deliveryCharge === 0 ? (
                  <div className="text-sm text-green-500 mt-1">✓ Free Delivery</div>
                ) : (
                  <div className="text-sm text-orange-500 mt-1">Delivery Charge: ₹{deliveryCharge}</div>
                )}
              </div>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${errors.mobile ? 'border-red-500' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-3 py-2 rounded-md border ${errors.address ? 'border-red-500' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter your complete delivery address"
                    rows={3}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </form>

            {/* Payment Method */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => {
                      setPaymentMethod('cod');
                      if (errors.payment) {
                        setErrors(prev => ({ ...prev, payment: '' }));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                  </div>
                </label>
              </div>
              {errors.payment && <p className="text-red-500 text-sm mt-2">{errors.payment}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Package size={20} className="text-primary" />
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.variantSKU || item.product.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                      {item.product.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.product.image} alt={item.product.title} className="object-contain h-full w-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.product.title}</div>
                      {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {Object.entries(item.selectedVariants).map(([key, value]) => (
                            <div key={key}>{key}: {value}</div>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-semibold">₹{item.product.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {smallCartFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Small Cart Fee</span>
                    <span className="font-semibold text-orange-500">₹{smallCartFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="font-semibold">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
