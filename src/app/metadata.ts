import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StudKits - Tech Project Kits & Engineering Solutions',
  description: 'Get high-quality IoT, robotics, and electronics project kits for students and professionals. Custom PCB design, microcontroller solutions, and expert support for your tech projects.',
  keywords: ['project kits', 'IoT projects', 'robotics kits', 'electronics projects', 'PCB design', 'microcontroller solutions', 'student projects', 'engineering projects'],
  openGraph: {
    title: 'StudKits - Turn Your College Projects into Real Innovations',
    description: 'High-quality IoT, robotics, and electronics project kits with expert support. Start building your next innovation today!',
    url: 'https://studkits.shop',
    type: 'website',
    images: [
      {
        url: '/images/studkits logo_converted.webp',
        width: 1200,
        height: 630,
        alt: 'StudKits Project Kits Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudKits - Tech Project Kits & Engineering Solutions',
    description: 'High-quality IoT, robotics, and electronics project kits with expert support. Start building your next innovation today!',
    images: ['/images/studkits logo_converted.webp'],
  },
  alternates: {
    canonical: 'https://studkits.shop',
  },
};