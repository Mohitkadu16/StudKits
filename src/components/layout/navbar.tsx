
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, HomeIcon, Info, Edit3, Mail, Presentation, Wand2, Menu, X, UserCircle, LogOut, User, PackageSearch, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { signOut as firebaseSignOut } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = user?.email === 'studkits25@gmail.com';

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/custom-project', label: 'Custom Project', icon: Edit3 },
    { href: '/custom-presentation', label: 'Custom Presentation', icon: Presentation },
    { href: '/tracking', label: 'Track Order', icon: PackageSearch },
    { href: '/contact', label: 'Contact Us', icon: Mail },
    { href: '/summarizer', label: 'AI Summarizer', icon: Wand2 },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: "Error", description: "Failed to sign out. Please try again.", variant: "destructive" });
    }
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} />
            <AvatarFallback>
              <UserCircle />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem onClick={() => router.push('/admin')}>
            <UserCog className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => router.push('/tracking')}>
          <PackageSearch className="mr-2 h-4 w-4" />
          <span>Track My Projects</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold" onClick={handleLinkClick}>
          <Target className="h-7 w-7" />
          <span>StudKits</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
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
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
           {user ? <UserMenu /> : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90" asChild><Link href="/login">Login</Link></Button>
              <Button asChild><Link href="/signup">Sign Up</Link></Button>
            </div>
          )}
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
             <Separator className="my-2 bg-primary-foreground/20"/>
            {user ? null : (
              <>
                 <li>
                    <Button variant="ghost" className="w-full justify-start text-lg py-6" asChild onClick={handleLinkClick}><Link href="/login">Login</Link></Button>
                 </li>
                 <li>
                    <Button className="w-full justify-start text-lg py-6" asChild onClick={handleLinkClick}><Link href="/signup">Sign Up</Link></Button>
                 </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
