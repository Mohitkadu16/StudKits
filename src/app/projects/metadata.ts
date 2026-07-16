import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects - StudKits',
  description: 'Browse our collection of IoT, robotics, and electronics working projects. Find the perfect tech project for your needs, from simple microcontroller setups to advanced automation solutions.',
  keywords: ['working projects', 'IoT projects', 'robotics projects', 'electronics projects', 'student projects', 'engineering projects'],
  openGraph: {
    title: 'Browse Our Tech Projects - StudKits',
    description: 'Explore our range of IoT, robotics, and electronics working projects. From basic microcontroller setups to advanced automation solutions.',
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
    title: 'Browse Our Tech Projects - StudKits',
    description: 'Explore our range of IoT, robotics, and electronics working projects. Perfect for students and tech enthusiasts.',
    images: ['/images/projects-overview.png'],
  },
  alternates: {
    canonical: 'https://studkits.shop/projects',
  },
};