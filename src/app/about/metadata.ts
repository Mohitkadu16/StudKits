import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About StudKits - Our Mission & Services',
  description: 'Learn about StudKits - your trusted partner for tech working projects, custom PCB design, and engineering solutions. Expert support for students and professionals.',
  keywords: ['about studkits', 'tech education', 'working projects', 'engineering solutions', 'PCB design', 'student support'],
  openGraph: {
    title: 'About StudKits - Empowering Tech Innovation',
    description: 'Discover how StudKits helps students and professionals bring their tech projects to life with quality kits and expert support.',
    url: 'https://studkits.shop/about',
    type: 'website',
    images: [
      {
        url: '/images/about-hero.png',
        width: 1200,
        height: 630,
        alt: 'StudKits Team and Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About StudKits - Empowering Tech Innovation',
    description: 'Discover how StudKits helps students and professionals bring their tech projects to life.',
    images: ['/images/about-hero.png'],
  },
  alternates: {
    canonical: 'https://studkits.shop/about',
  },
};