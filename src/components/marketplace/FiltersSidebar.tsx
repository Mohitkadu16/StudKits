"use client";
import React, { useEffect, useState } from 'react';
import { Cpu, Activity, BatteryCharging, Radio, Settings, CircuitBoard } from 'lucide-react';

type Filters = {
  category?: string;
  subcategory?: string;
  priceRange?: [number, number];
  hasVariants?: boolean;
};

export default function FiltersSidebar({
  onChange,
  active,
}: {
  onChange?: (f: Filters) => void;
  active?: Filters;
}) {
  const [open, setOpen] = useState({ micro: false, sensors: false, power: false, comm: false, components: false, proto: false });
  const [priceMin, setPriceMin] = useState<number>(active?.priceRange ? active.priceRange[0] : 0);
  const [priceMax, setPriceMax] = useState<number>(active?.priceRange ? active.priceRange[1] : 5000);

  // keep local inputs in sync when parent active changes
  useEffect(() => {
    if (active?.priceRange) {
      setPriceMin(active.priceRange[0]);
      setPriceMax(active.priceRange[1]);
    }
  }, [active?.priceRange]);

  // keep local inputs in sync when parent active changes
  useEffect(() => {
    if (active?.priceRange) {
      setPriceMin(active.priceRange[0]);
      setPriceMax(active.priceRange[1]);
    }
  }, [active?.priceRange]);

  const toggle = (k: keyof typeof open) => setOpen(s => ({ ...s, [k]: !s[k] }));

  const pick = (category?: string, subcategory?: string) => {
    const next: Filters = { ...(active ?? {}) };
    if (category) next.category = category;
    else delete (next as any).category;
    if (subcategory) next.subcategory = subcategory;
    else delete (next as any).subcategory;
    onChange?.(next);
  };

  const applyPrice = () => {
    const next: Filters = { ...(active ?? {}) };
    next.priceRange = [Number(priceMin), Number(priceMax)];
    onChange?.(next);
  };

  const resetPrice = () => {
    setPriceMin(0);
    setPriceMax(5000);
    const next: Filters = { ...(active ?? {}) };
    delete (next as any).priceRange;
    onChange?.(next);
  };

  const clear = () => {
    setPriceMin(0);
    setPriceMax(5000);
    onChange?.({});
  };

  const selectedClass = (cat?: string, sub?: string) => {
    const isCatMatch = active?.category === cat;
    const isSubMatch = active?.subcategory === sub;
    return (isCatMatch && isSubMatch) ? 'bg-primary-foreground/20 font-semibold text-primary-foreground' : '';
  };

  return (
    <aside className="w-full md:w-64 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 items-start">
      <div className="card p-3 md:p-4 h-full">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold mb-2">Categories</h4>
          <button
            className="text-sm text-muted-foreground px-3 py-1 rounded-md hover:bg-muted/20"
            onClick={clear}
            aria-label="Clear filters"
          >
            Clear
          </button>
        </div>

        {/* Microcontrollers dropdown */}
        <div className="mt-0">
          <button
            onClick={() => toggle('micro')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.micro}
          >
            <span className="flex items-center gap-3 font-medium"><Cpu className="w-5 h-5 text-primary" /> Microcontrollers</span>
            <span className="text-muted-foreground text-xs">{open.micro ? '▼' : '▶'}</span>
          </button>
          
          {open.micro && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Microcontroller options">
              <li>
                <button onClick={() => pick('microcontrollers', 'Arduino')} className={`w-full text-left py-2 px-5 rounded-lg hover:bg-muted/20 ${selectedClass('microcontrollers', 'Arduino')}`}>Arduino</button>
              </li>
              <li>
                <button onClick={() => pick('microcontrollers', 'ESP')} className={`w-full text-left py-2 px-5 rounded-lg hover:bg-muted/20 ${selectedClass('microcontrollers', 'ESP')}`}>ESP</button>
              </li>
              <li>
                <button onClick={() => pick('microcontrollers', 'Raspberry Pi')} className={`w-full text-left py-2 px-5 rounded-lg hover:bg-muted/20 ${selectedClass('microcontrollers', 'Raspberry Pi')}`}>Raspberry Pi</button>
              </li>
            </ul>
          )}
        </div>

        {/* Sensors dropdown */}
        <div className="mt-2">
          <button
            onClick={() => toggle('sensors')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.sensors}
          >
            <span className="flex items-center gap-3 font-medium"><Activity className="w-5 h-5 text-green-500" /> Sensors</span>
            <span className="text-muted-foreground text-xs">{open.sensors ? '▼' : '▶'}</span>
          </button>
          
          {open.sensors && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Sensor options">
              <li>
                <button onClick={() => pick('sensors', 'Motor & Displays')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('sensors', 'Motor & Displays')}`}>Motor & Displays</button>
              </li>
              <li>
                <button onClick={() => pick('sensors', 'Motion Sensors')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('sensors', 'Motion Sensors')}`}>Motion Sensors</button>
              </li>
              <li>
                <button onClick={() => pick('sensors', 'Environmental Sensors')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('sensors', 'Environmental Sensors')}`}>Environmental Sensors</button>
              </li>
            </ul>
          )}
        </div>

        {/* Power Management dropdown */}
        <div className="mt-2">
          <button
            onClick={() => toggle('power')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.power}
          >
            <span className="flex items-center gap-3 font-medium"><BatteryCharging className="w-5 h-5 text-yellow-500" /> Power</span>
            <span className="text-muted-foreground text-xs">{open.power ? '▼' : '▶'}</span>
          </button>
          {open.power && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Power options">
              <li>
                <button onClick={() => pick('power', 'Batteries & Chargers')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('power', 'Batteries & Chargers')}`}>Batteries & Chargers</button>
              </li>
              <li>
                <button onClick={() => pick('power', 'Voltage Regulators')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('power', 'Voltage Regulators')}`}>Voltage Regulators</button>
              </li>
              <li>
                <button onClick={() => pick('power', 'DC-DC Converters')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('power', 'DC-DC Converters')}`}>DC - DC Converters</button>
              </li>
            </ul>
          )}
        </div>

        {/* Communication dropdown */}
        <div className="mt-2">
          <button
            onClick={() => toggle('comm')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.comm}
          >
            <span className="flex items-center gap-3 font-medium"><Radio className="w-5 h-5 text-indigo-500" /> Web & Radio</span>
            <span className="text-muted-foreground text-xs">{open.comm ? '▼' : '▶'}</span>
          </button>
          {open.comm && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Communication options">
              <li>
                <button onClick={() => pick('communication', 'RF')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('communication', 'RF')}`}>RF (Radio Frequency)</button>
              </li>
              <li>
                <button onClick={() => pick('communication', 'GSM')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('communication', 'GSM')}`}>GSM</button>
              </li>
              <li>
                <button onClick={() => pick('communication', 'Bluetooth')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('communication', 'Bluetooth')}`}>Bluetooth</button>
              </li>
              <li>
                <button onClick={() => pick('communication', 'WiFi')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('communication', 'WiFi')}`}>WiFi</button>
              </li>
            </ul>
          )}
        </div>

        {/* Components dropdown */}
        <div className="mt-2">
          <button
            onClick={() => toggle('components')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.components}
          >
            <span className="flex items-center gap-3 font-medium"><Settings className="w-5 h-5 text-orange-500" /> Misc Components</span>
            <span className="text-muted-foreground text-xs">{open.components ? '▼' : '▶'}</span>
          </button>
          {open.components && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Component options">
              <li>
                <button onClick={() => pick('components', 'Resistors')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('components', 'Resistors')}`}>Resistors</button>
              </li>
              <li>
                <button onClick={() => pick('components', 'Capacitors')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('components', 'Capacitors')}`}>Capacitors</button>
              </li>
              <li>
                <button onClick={() => pick('components', 'Transistors')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('components', 'Transistors')}`}>Transistors</button>
              </li>
              <li>
                <button onClick={() => pick('components', 'Diodes')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('components', 'Diodes')}`}>Diodes</button>
              </li>
              <li>
                <button onClick={() => pick('components', 'LEDs')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('components', 'LEDs')}`}>LEDs</button>
              </li>
            </ul>
          )}
        </div>

        {/* Prototyping & Accessories dropdown */}
        <div className="mt-2">
          <button
            onClick={() => toggle('proto')}
            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-muted/30 transition-colors"
            aria-expanded={open.proto}
          >
            <span className="flex items-center gap-3 font-medium"><CircuitBoard className="w-5 h-5 text-pink-500" /> Prototyping</span>
            <span className="text-muted-foreground text-xs">{open.proto ? '▼' : '▶'}</span>
          </button>
          {open.proto && (
            <ul className="pl-4 mt-2 text-sm space-y-1 text-muted-foreground" role="menu" aria-label="Prototyping options">
              <li>
                <button onClick={() => pick('prototyping', 'Breadboards')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('prototyping', 'Breadboards')}`}>Breadboards</button>
              </li>
              <li>
                <button onClick={() => pick('prototyping', 'Jumper Wires')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('prototyping', 'Jumper Wires')}`}>Jumper Wires</button>
              </li>
              <li>
                <button onClick={() => pick('prototyping', 'Zero PCB')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('prototyping', 'Zero PCB')}`}>Zero PCB / Perfboard</button>
              </li>
              <li>
                <button onClick={() => pick('prototyping', 'Soldering')} className={`w-full text-left py-2 px-4 rounded-lg hover:bg-muted/20 ${selectedClass('prototyping', 'Soldering')}`}>Soldering Supplies</button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="card p-3 md:p-4 h-full">
        <h4 className="font-semibold mb-3">Filters</h4>

        {/* Variants Only Filter */}
        <div className="mb-4 pb-4 border-b border-border">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active?.hasVariants || false}
              onChange={(e) => {
                const next: Filters = { ...(active ?? {}) };
                if (e.target.checked) {
                  next.hasVariants = true;
                } else {
                  delete (next as any).hasVariants;
                }
                onChange?.(next);
              }}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Show Variants Only</span>
          </label>
          <p className="text-xs text-muted-foreground mt-1 ml-6">
            Display only products with customizable options
          </p>
        </div>

        <div className="text-sm text-muted-foreground mb-2">Price range</div>

        <div className="flex flex-col xl:flex-row gap-2 xl:items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground w-6">Min</label>
            <input
              type="number"
              min={0}
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              className="input w-full px-2 py-1 h-8 text-sm"
              aria-label="Minimum price"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground w-6">Max</label>
            <input
              type="number"
              min={0}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="input w-full px-2 py-1 h-8 text-sm"
              aria-label="Maximum price"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={applyPrice} className="w-full sm:flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Apply</button>
          <button onClick={resetPrice} className="w-full sm:flex-1 px-3 py-2 rounded-md border border-border text-muted-foreground text-sm hover:bg-muted/50 transition-colors">Reset</button>
        </div>
      </div>
    </aside>
  );
}
