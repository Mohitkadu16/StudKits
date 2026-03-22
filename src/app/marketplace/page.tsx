"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import FiltersSidebar from '@/components/marketplace/FiltersSidebar';
import ProductCard from '@/components/marketplace/ProductCard';
import CartDrawer from '@/components/marketplace/CartDrawer';
import { sampleProducts, type Product } from '@/lib/products';
import { Loader2, History } from 'lucide-react';

type Filters = { category?: string; subcategory?: string; priceRange?: [number, number]; hasVariants?: boolean };

export default function MarketplacePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { items, setOpen } = useCart();
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<string>('relevant');
  const [q, setQ] = useState('');
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Handle recently viewed synchronization
  useEffect(() => {
    const updateRecent = () => {
      try {
        const raw = localStorage.getItem('recentlyViewed');
        if (raw) {
          const ids: string[] = JSON.parse(raw);
          const mapped = ids.map(id => sampleProducts.find(p => p.id === id)).filter(Boolean) as Product[];
          setRecentProducts(mapped);
        }
      } catch (e) {}
    };
    updateRecent();
    window.addEventListener('recentlyViewedEvent', updateRecent);
    return () => window.removeEventListener('recentlyViewedEvent', updateRecent);
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render marketplace if user is not authenticated
  if (!user) {
    return null;
  }

  const onFilterChange = (f: Filters) => {
    setFilters(f);
  };

  const filtered = useMemo(() => {
    let out = [...sampleProducts];

    // Search query
    if (q.trim()) {
      const qq = q.toLowerCase();
      out = out.filter(p => p.title.toLowerCase().includes(qq) || (p.sku || '').toLowerCase().includes(qq));
    }

    // Category/subcategory filtering using simple keyword matches
    if (filters.category) {
      const cat = filters.category.toLowerCase();
      const sub = (filters.subcategory || '').toLowerCase();

      if (cat === 'microcontrollers' || cat === 'microcontrollers') {
        if (sub === 'arduino') out = out.filter(p => p.title.toLowerCase().includes('arduino'));
        else if (sub === 'esp') out = out.filter(p => p.title.toLowerCase().includes('esp'));
        else if (sub === 'raspberry pi') out = out.filter(p => p.title.toLowerCase().includes('raspberry'));
      }

      if (cat === 'sensors' || cat === 'sensors') {
        if (sub === 'motor & displays' || sub === 'motor & displays') out = out.filter(p => /motor|servo|driver/i.test(p.title));
        else if (sub === 'motion sensors') out = out.filter(p => /distance|motion|pir|hc-sr04/i.test(p.title));
        else if (sub === 'environmental sensors') out = out.filter(p => /dht|temperature|humidity|env/i.test(p.title));
      }

      if (cat === 'power' || cat === 'power') {
        if (sub === 'batteries & chargers') out = out.filter(p => /battery|cells|charger/i.test(p.title));
        else if (sub === 'voltage regulators') out = out.filter(p => /regulator|lm78|lm2596/i.test(p.title));
        else if (sub === 'dc-dc converters') out = out.filter(p => /dc-?dc|buck|boost/i.test(p.title));
      }

      if (cat === 'communication' || cat === 'communication') {
        if (sub === 'rf') out = out.filter(p => /rf|nrf|433|315/i.test(p.title));
        else if (sub === 'gsm') out = out.filter(p => /gsm|sim800|sim900/i.test(p.title));
        else if (sub === 'bluetooth') out = out.filter(p => /bluetooth|ble|hc-05|hc-06|esp32/i.test(p.title));
        else if (sub === 'wifi') out = out.filter(p => /wifi|esp|esp32|esp8266/i.test(p.title));
      }

      if (cat === 'components') {
        if (sub === 'resistors') out = out.filter(p => /resistor/i.test(p.title));
        else if (sub === 'capacitors') out = out.filter(p => /capacitor/i.test(p.title));
        else if (sub === 'transistors') out = out.filter(p => /transistor/i.test(p.title));
        else if (sub === 'diodes') out = out.filter(p => /diode/i.test(p.title));
        else if (sub === 'leds') out = out.filter(p => /led/i.test(p.title));
      }

      if (cat === 'prototyping') {
        if (sub === 'breadboards') out = out.filter(p => /breadboard/i.test(p.title));
        else if (sub === 'jumper wires') out = out.filter(p => /jumper|wire/i.test(p.title));
        else if (sub === 'zero pcb') out = out.filter(p => /zero|pcb|perfboard|prototyping board/i.test(p.title));
        else if (sub === 'soldering') out = out.filter(p => /solder|flux|heat shrink/i.test(p.title));
      }
    }

    // Price filtering
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      out = out.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    // Variants filter
    if (filters.hasVariants) {
      out = out.filter(p => p.hasVariants === true);
    }

    // Sorting and filtering
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') out.sort((a, b) => b.price - a.price);
    else if (sort === 'has-variants') out = out.filter(p => p.hasVariants === true);

    return out;
  }, [filters, sort, q]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Smart Component Marketplace</h1>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search components by name, part number, or specifications..."
              className="w-72 pr-10 px-4 py-2 rounded-full bg-background text-foreground font-semibold shadow-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary-foreground"
              aria-label="Search"
              onClick={() => {}}
              tabIndex={-1}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
            </button>
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2 rounded-full bg-background text-foreground font-semibold shadow-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="relevant">Most Relevant</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="has-variants">Has Variants Only</option>
          </select>

          <button onClick={() => setOpen(true)} className="relative">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow-md">Cart</span>
            {items.length > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-background shadow">{items.length}</span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FiltersSidebar onChange={f => onFilterChange(f)} active={filters} />
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
            {filtered.length === 0 && (
              <div className="text-muted-foreground">No products match the selected filters.</div>
            )}
          </div>
        </div>
      </div>

      {recentProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" /> Recently Viewed
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentProducts.map(p => (
              <ProductCard key={`recent-${p.id}`} product={p} />
            ))}
          </div>
        </div>
      )}

      <CartDrawer />
    </div>
  );
}
