'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, Award, Headphones, LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  delay?: number;
}

function TrustBadge({ icon: Icon, text, delay = 0 }: TrustBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 group"
    >
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-xs md:text-sm font-medium text-foreground/80 text-center">
        {text}
      </span>
    </motion.div>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: Shield, text: 'Secure Payment' },
    { icon: Truck, text: 'Fast Delivery' },
    { icon: Award, text: 'Quality Assured' },
    { icon: Headphones, text: '24/7 Support' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {badges.map((badge, index) => (
        <TrustBadge
          key={badge.text}
          icon={badge.icon}
          text={badge.text}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
