"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import MaxWidthWrapper from "./MaxWidthWrapper";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <MaxWidthWrapper className="flex h-16 items-center justify-between safe-x">
        <Link href="/" className="font-semibold text-lg">
          StudKits
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm hover:opacity-80">
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm"><Link href="/get-started">Get Started</Link></Button>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden" aria-label="Open menu">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader className="text-left font-semibold">Menu</SheetHeader>
            <div className="mt-4 grid gap-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 text-base">
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-2"><Link href="/get-started">Get Started</Link></Button>
            </div>
          </SheetContent>
        </Sheet>
      </MaxWidthWrapper>
    </header>
  );
}
