import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8 mt-auto">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="text-center p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 rounded-xl">
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:studkits25@gmail.com" className="flex items-center justify-center hover:text-foreground/90 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                studkits25@gmail.com
              </a>
              <a href="/contact" className="flex items-center justify-center hover:text-foreground/90 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                Contact Page
              </a>
            </div>
          </div>

          {/* WhatsApp Contacts */}
          <div className="text-center p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 rounded-xl">
            <h3 className="font-semibold text-foreground mb-4">WhatsApp</h3>
            <div className="space-y-2">
              <a 
                href="https://wa.me/918976451602" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:text-foreground/90 transition-colors"
              >
                <Image
                  src="/images/Whatsapp logo.png"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Ved Bhardwaj
              </a>
              <a 
                href="https://wa.me/917506104767" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:text-foreground/90 transition-colors"
              >
                <Image
                  src="/images/Whatsapp logo.png"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Mohit Kadu
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 rounded-xl">
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="space-y-2">
              <a 
                href="https://instagram.com/studkits.shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:text-foreground/90 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @studkits.shop
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted-foreground/20 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} StudKits. All rights reserved.</p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
