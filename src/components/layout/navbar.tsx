'use client';

import Link from 'next/link';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Projects' },
    { href: '/summarizer', label: 'AI Summarizer' },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Target className="h-7 w-7" />
          <span>ProjectPro</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-2 md:space-x-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Button
                  variant="ghost"
                  asChild
                  className={cn(
                    "hover:bg-primary-foreground/10 hover:text-primary-foreground",
                    pathname === item.href ? 'bg-primary-foreground/20 font-semibold' : ''
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
