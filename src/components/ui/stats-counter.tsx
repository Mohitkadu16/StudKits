'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCounterProps {
  number: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
}

export function StatsCounter({ number, label, icon: Icon, delay = 0 }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Check if this is a rating format (contains decimal point and slash)
  const isRating = number.includes('.') && number.includes('/');
  
  // Extract numeric value from string (e.g., "500+" -> 500, "4.9/5" -> 4.9)
  let numericValue: number;
  let suffix: string;
  
  if (isRating) {
    // For ratings like "4.9/5", don't animate, just display
    numericValue = 0;
    suffix = number;
  } else {
    // For regular numbers like "500+", extract number and suffix
    numericValue = parseInt(number.replace(/\D/g, '')) || 0;
    suffix = number.replace(/[\d,]/g, '');
  }

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => {
        motionValue.set(numericValue);
      }, delay);
    }
  }, [isInView, hasAnimated, numericValue, motionValue, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
    >
      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-primary">
          {isRating ? suffix : `${displayValue.toLocaleString()}${suffix}`}
        </div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
    </motion.div>
  );
}
