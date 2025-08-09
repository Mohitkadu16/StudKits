
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, HomeIcon, Info, Edit3, Mail, Presentation, Wand2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/custom-project', label: 'Custom Project', icon: Edit3 },
    { href: '/custom-presentation', label: 'Custom Presentation', icon: Presentation },
    { href: '/contact', label: 'Contact Us', icon: Mail },
    { href: '/summarizer', label: 'AI Summarizer', icon: Wand2 },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold" onClick={handleLinkClick}>
          <Target className="h-7 w-7" />
          <span>ProjectPro</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "hover:bg-primary-foreground/10 hover:text-primary-foreground px-3 py-2",
                      pathname === item.href ? 'bg-primary-foreground/20 font-semibold' : ''
                    )}
                  >
                    <Link href={item.href} className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-primary pb-4">
          <ul className="container mx-auto flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg py-6",
                      pathname === item.href ? 'bg-primary-foreground/20 font-semibold' : ''
                    )}
                    onClick={handleLinkClick}
                  >
                    <Link href={item.href} className="flex items-center">
                      <Icon className="h-5 w-5 mr-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
