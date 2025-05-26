
'use client';

import Link from 'next/link';
import { Target, HomeIcon, Info, Edit3, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/custom-project', label: 'Custom Project', icon: Edit3 },
    { href: '/contact', label: 'Contact Us', icon: Mail },
    { href: '/summarizer', label: 'AI Summarizer', icon: Target }, // Keeping Target for Summarizer as an example
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Target className="h-7 w-7" />
          <span>ProjectPro</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "hover:bg-primary-foreground/10 hover:text-primary-foreground px-2 py-1 md:px-3 md:py-2",
                      pathname === item.href ? 'bg-primary-foreground/20 font-semibold' : ''
                    )}
                  >
                    <Link href={item.href} className="flex items-center">
                      <Icon className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">{item.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
