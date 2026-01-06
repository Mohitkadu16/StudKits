'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/lib/products';
import { X } from 'lucide-react';

interface VariantSelectorProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (selectedVariants: Record<string, string>, quantity: number) => void;
}

export default function VariantSelector({ product, isOpen, onClose, onAddToCart }: VariantSelectorProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Determine minimum quantity based on product type
  const getMinQuantity = () => {
    const title = product.title.toLowerCase();
    if (title.includes('led') || title.includes('resistor') || title.includes('capacitor')) {
      return 5;
    }
    if (title.includes('jumper') || title.includes('wire')) {
      return 1;
    }
    return 1;
  };

  const minQuantity = getMinQuantity();

  // Initialize with default values
  useEffect(() => {
    if (product.variants && isOpen) {
      const defaults: Record<string, string> = {};
      product.variants.forEach(variant => {
        if (variant.defaultValue) {
          defaults[variant.name] = variant.defaultValue;
        }
      });
      setSelectedVariants(defaults);
      setQuantity(minQuantity);
      setErrors({});
    }
  }, [product, isOpen, minQuantity]);

  const handleVariantChange = (variantName: string, value: string) => {
    console.log('Variant changed:', variantName, '=', value);
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[variantName];
      return newErrors;
    });
  };

  const validateSelection = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    product.variants?.forEach(variant => {
      if (variant.required && !selectedVariants[variant.name]) {
        newErrors[variant.name] = `Please select ${variant.name.toLowerCase()}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = () => {
    console.log('Adding to cart with variants:', selectedVariants);
    if (validateSelection()) {
      // Auto-add technical specifications based on component type
      const enhancedVariants = { ...selectedVariants };
      
      // For resistors: auto-add tolerance and wattage based on resistance value
      if (product.title.toLowerCase().includes('resistor') && enhancedVariants['Resistance']) {
        const resistance = enhancedVariants['Resistance'];
        // Standard specs: most common resistors are 5% tolerance, ¼W
        // High precision (1%) for values like 1kΩ, 10kΩ commonly used in circuits
        if (['1kΩ', '10kΩ', '100kΩ'].includes(resistance)) {
          enhancedVariants['Tolerance'] = '1%';
        } else {
          enhancedVariants['Tolerance'] = '5%';
        }
        enhancedVariants['Wattage'] = '¼W';
      }
      
      // For capacitors: auto-add type based on capacitance value
      if (product.title.toLowerCase().includes('capacitor') && enhancedVariants['Capacitance']) {
        const capacitance = enhancedVariants['Capacitance'];
        // Ceramic: typically used for small values (pF to 100nF)
        // Film: medium values (100nF to 1µF)
        // Electrolytic: large values (1µF and above)
        if (capacitance.includes('pF') || capacitance.includes('nF')) {
          enhancedVariants['Type'] = 'Ceramic';
        } else if (capacitance === '1µF') {
          enhancedVariants['Type'] = 'Film';
        } else {
          enhancedVariants['Type'] = 'Electrolytic';
        }
      }
      
      console.log('Enhanced variants being sent:', enhancedVariants);
      onAddToCart(enhancedVariants, quantity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Select Options
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.title}
              </h3>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                ₹{product.price}
              </p>
              {product.sku && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  SKU: {product.sku}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Variant Selection */}
        <div className="p-6 space-y-6">
          {product.variants?.map((variant) => (
            <div key={variant.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {variant.name}
                {variant.required && <span className="text-red-500 ml-1">*</span>}
                {variant.unit && <span className="text-gray-500 ml-1">({variant.unit})</span>}
              </label>

              {variant.type === 'select' && (
                <select
                  value={selectedVariants[variant.name] || ''}
                  onChange={(e) => handleVariantChange(variant.name, e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[variant.name]
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                >
                  <option value="">Select {variant.name}</option>
                  {variant.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {variant.type === 'radio' && (
                <div className="space-y-2">
                  {variant.options?.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={variant.name}
                        value={option}
                        checked={selectedVariants[variant.name] === option}
                        onChange={(e) => handleVariantChange(variant.name, e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900 dark:text-white">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {variant.type === 'input' && (
                <input
                  type="text"
                  value={selectedVariants[variant.name] || ''}
                  onChange={(e) => handleVariantChange(variant.name, e.target.value)}
                  placeholder={`Enter ${variant.name.toLowerCase()}`}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors[variant.name]
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                />
              )}

              {errors[variant.name] && (
                <p className="mt-1 text-sm text-red-500">{errors[variant.name]}</p>
              )}
            </div>
          ))}

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(minQuantity, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-semibold"
              >
                −
              </button>
              <input
                type="number"
                min={minQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(minQuantity, parseInt(e.target.value) || minQuantity))}
                className="w-20 px-4 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-semibold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Total:</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{(product.price * quantity).toFixed(2)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium shadow-lg shadow-blue-500/30"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
