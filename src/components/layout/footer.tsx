'use client';

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-muted text-muted-foreground py-8 mt-auto" role="contentinfo">
      <MaxWidthWrapper>
        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8 border border-primary/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">Get latest projects, offers, and tech updates delivered to your inbox</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-full"
              />
              <Button type="submit" className="rounded-full px-6">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>


        {/* Contact Us & Follow Us - Side by Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contact Us Card */}
          <div className="border-2 border-primary/50 rounded-3xl p-6 bg-gradient-to-br from-primary/10 via-background to-background shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/40">Contact Us</h3>
            <div className="space-y-3">
              {/* Ved Bhardwaj */}
              <a 
                href="https://wa.me/918976451602" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Contact Ved Bhardwaj on WhatsApp"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <Image
                    src="/images/Whatsapp logo.svg"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="opacity-90 group-hover:opacity-100"
                  />
                </div>
                <span className="font-medium text-foreground">Ved Bhardwaj</span>
              </a>

              {/* Mohit Kadu */}
              <a 
                href="https://wa.me/917506104767" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Contact Mohit Kadu on WhatsApp"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <Image
                    src="/images/Whatsapp logo.svg"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="opacity-90 group-hover:opacity-100"
                  />
                </div>
                <span className="font-medium text-foreground">Mohit Kadu</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/studkits.shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Follow us on Instagram"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="font-medium text-foreground">@studkits.shop</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:studkits25@gmail.com" 
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Email us"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <span className="font-medium text-foreground text-sm">studkits25@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Follow Us Card */}
          <div className="border-2 border-primary/50 rounded-3xl p-6 bg-gradient-to-br from-primary/10 via-background to-background shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/40">Follow Us</h3>
            <div className="space-y-3">
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@studkits-shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Subscribe to our YouTube channel"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="font-medium text-foreground">@studkits-shop</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/studkits/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Connect with us on LinkedIn"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="font-medium text-foreground">@StudKits</span>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/people/studkits/61581910192248/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="Follow us on Facebook"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="font-medium text-foreground">@studKits</span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Mohitkadu16/StudKits" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-primary/40 hover:border-primary/70 bg-background/80 hover:bg-primary/10 transition-all duration-300 hover:shadow-lg"
                aria-label="View our code on GitHub"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <span className="font-medium text-foreground">StudKits</span>
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
