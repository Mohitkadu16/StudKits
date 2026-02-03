'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, HelpCircle, Plus } from 'lucide-react';
import Image from 'next/image';

interface ActionButton {
  icon: React.ReactNode;
  label: string;
  href: string;
  bgColor: string;
}

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const actionButtons: ActionButton[] = [
    {
      icon: <Image src="/images/Whatsapp logo.svg" alt="" width={24} height={24} className="brightness-0 invert" />,
      label: 'WhatsApp Chat',
      href: 'https://wa.me/918976451602',
      bgColor: 'bg-[#25D366] hover:bg-[#20BD5A]',
    },
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      label: 'Call Us',
      href: 'tel:+917506104767',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      label: 'Email',
      href: 'mailto:studkits25@gmail.com',
      bgColor: 'bg-red-500 hover:bg-red-600',
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-white" />,
      label: 'Help & Support',
      href: '/contact',
      bgColor: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons - Positioned absolutely above the toggle button */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col-reverse items-end gap-2 mb-2">
            {actionButtons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                target={button.href.startsWith('http') ? '_blank' : undefined}
                rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.03,
                  ease: "easeOut"
                }}
                onClick={() => setIsOpen(false)}
                className={`${button.bgColor} w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group relative`}
                aria-label={button.label}
              >
                {button.icon}
                
                {/* Tooltip */}
                <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                  {button.label}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button - Fixed Position */}
      <motion.button
        onClick={toggleMenu}
        className="w-14 h-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="h-7 w-7 text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
}
