'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassmorphismCard({ children, className, hover = true }: GlassmorphismCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'backdrop-blur-xl bg-gradient-to-br from-primary/10 to-primary/5',
        'border border-white/10',
        'shadow-xl shadow-primary/5',
        hover && 'hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20',
        'transition-all duration-300',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
