import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "StudKits - Ready-to-Assemble Tech Project Kits & Services",
    template: "%s | StudKits"
  },
  description: "Empower your tech journey with StudKits' high-quality project kits for IoT, Robotics, and Electronics. Expert services in PCB design, microcontroller programming, and custom solutions for students and professionals.",
  keywords: ["project kits", "robotics", "IoT", "electronics", "PCB design", "microcontroller", "Arduino", "ESP32", "student projects", "tech education"],
  authors: [{ name: "StudKits Team" }],
  creator: "StudKits",
  publisher: "StudKits",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studkits.in",
    siteName: "StudKits",
    title: "StudKits - Ready-to-Assemble Tech Project Kits & Services",
    description: "Empower your tech journey with StudKits' high-quality project kits for IoT, Robotics, and Electronics. Expert services in PCB design, microcontroller programming, and custom solutions.",
    images: [
      {
        url: "/images/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "StudKits Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "StudKits - Ready-to-Assemble Tech Project Kits & Services",
    description: "Empower your tech journey with StudKits' high-quality project kits for IoT, Robotics, and Electronics.",
    images: ["/images/android-chrome-512x512.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "android-chrome",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
