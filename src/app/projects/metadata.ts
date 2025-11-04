import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects - StudKits',
  description: 'Browse our collection of IoT, robotics, and electronics project kits. Find the perfect tech project for your needs, from simple microcontroller setups to advanced automation solutions.',
  keywords: ['project kits', 'IoT projects', 'robotics kits', 'electronics projects', 'student projects', 'engineering projects'],
  openGraph: {
    title: 'Browse Our Tech Project Kits - StudKits',
    description: 'Explore our range of IoT, robotics, and electronics project kits. From basic microcontroller setups to advanced automation solutions.',
    url: 'https://studkits.shop/projects',
    type: 'website',
    images: [
      {
        url: '/images/projects-overview.png',
        width: 1200,
        height: 630,
        alt: 'StudKits Projects Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Our Tech Project Kits - StudKits',
    description: 'Explore our range of IoT, robotics, and electronics project kits. Perfect for students and tech enthusiasts.',
    images: ['/images/projects-overview.png'],
  },
  alternates: {
    canonical: 'https://studkits.shop/projects',
  },
};