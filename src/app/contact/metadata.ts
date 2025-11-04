import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact StudKits - Get Support for Your Project',
  description: 'Contact StudKits for project support, custom solutions, or general inquiries. Our team is ready to help with your tech project needs.',
  keywords: ['contact studkits', 'tech support', 'project help', 'custom solutions', 'student support'],
  openGraph: {
    title: 'Contact StudKits - Get Expert Project Support',
    description: 'Reach out to StudKits for help with your tech projects. Get expert support and custom solutions.',
    url: 'https://studkits.shop/contact',
    type: 'website',
    images: [
      {
        url: '/images/contact-hero.png',
        width: 1200,
        height: 630,
        alt: 'Contact StudKits Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact StudKits - Get Expert Project Support',
    description: 'Reach out to StudKits for help with your tech projects. Get expert support and custom solutions.',
    images: ['/images/contact-hero.png'],
  },
  alternates: {
    canonical: 'https://studkits.shop/contact',
  },
};