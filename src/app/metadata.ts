import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StudKits - Tech Projects & Engineering Solutions',
  description: 'Get high-quality IoT, robotics, and electronics projects for engineering students and professionals in India. Custom PCB design, microcontroller solutions, and expert support for full-fledged working projects.',
  keywords: ['working projects', 'IoT projects', 'robotics projects', 'electronics projects', 'PCB design', 'microcontroller solutions', 'engineering student projects', 'custom engineering solutions'],
  openGraph: {
    title: 'StudKits - Turn Your College Projects into Real Innovations',
    description: 'High-quality IoT, robotics, and electronics projects with expert support. We deliver full-fledged working projects for your academic and professional needs.',
    url: 'https://www.studkits.shop',
    type: 'website',
    images: [
      {
        url: '/images/studkits logo_converted.webp',
        width: 1200,
        height: 630,
        alt: 'StudKits Working Projects Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudKits - Tech Projects & Engineering Solutions',
    description: 'High-quality IoT, robotics, and electronics projects with expert support. We deliver full-fledged working projects.',
    images: ['/images/studkits logo_converted.webp'],
  },
  alternates: {
    canonical: 'https://www.studkits.shop',
  },
};