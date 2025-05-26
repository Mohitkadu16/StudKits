import type { LucideIcon } from 'lucide-react';
import { Laptop, Smartphone, BrainCircuit, Palette, Megaphone, Code2, ShoppingCart, Layers } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string; // Short description for card
  longDescription: string; // Detailed description for project page
  price: number;
  category: string;
  categoryIcon?: LucideIcon;
  image: string;
  features: string[];
  benefits: string[];
  dataAiHint?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'A full-featured e-commerce platform with modern UI/UX.',
    longDescription: 'Comprehensive development of a scalable e-commerce platform, including frontend, backend, payment gateway integration, and admin panel. Built with Next.js, Node.js, and PostgreSQL. Perfect for businesses looking to establish a strong online presence.',
    price: 5000,
    category: 'Web Development',
    categoryIcon: Laptop,
    image: 'https://placehold.co/600x400.png',
    features: ['Responsive Design', 'Shopping Cart', 'User Accounts', 'Admin Dashboard', 'Payment Integration'],
    benefits: ['Increased Sales', 'Wider Reach', 'Improved Customer Experience', 'Efficient Management'],
    dataAiHint: 'web online-store'
  },
  {
    id: '2',
    title: 'Mobile Task Manager App',
    description: 'Cross-platform mobile app for efficient task management.',
    longDescription: 'A sleek and intuitive mobile application for iOS and Android, designed to help users organize their tasks, set reminders, and collaborate with teams. Built using React Native for optimal performance and native feel.',
    price: 3500,
    category: 'Mobile App',
    categoryIcon: Smartphone,
    image: 'https://placehold.co/600x400.png',
    features: ['iOS & Android', 'Offline Access', 'Push Notifications', 'Team Collaboration', 'Calendar Sync'],
    benefits: ['Enhanced Productivity', 'Better Organization', 'Seamless Collaboration', 'Accessible Anywhere'],
    dataAiHint: 'mobile productivity'
  },
  {
    id: '3',
    title: 'AI-Powered Recommendation Engine',
    description: 'Integrate an AI engine to provide personalized recommendations.',
    longDescription: 'An advanced recommendation engine leveraging machine learning algorithms to provide personalized content or product suggestions to users. Increases engagement and conversion rates. Easy to integrate with existing platforms.',
    price: 7000,
    category: 'AI Solution',
    categoryIcon: BrainCircuit,
    image: 'https://placehold.co/600x400.png',
    features: ['Machine Learning', 'Real-time Suggestions', 'Personalized Content', 'API Integration', 'Analytics'],
    benefits: ['Higher Engagement', 'Increased Conversions', 'Deeper User Insights', 'Improved Retention'],
    dataAiHint: 'artificial intelligence'
  },
  {
    id: '4',
    title: 'Corporate Branding Package',
    description: 'Complete branding solution including logo, style guide, and assets.',
    longDescription: 'A comprehensive branding package for businesses looking to establish or refresh their identity. Includes logo design, color palette, typography, brand style guide, and digital assets. Crafted by experienced designers.',
    price: 2500,
    category: 'Graphic Design',
    categoryIcon: Palette,
    image: 'https://placehold.co/600x400.png',
    features: ['Logo Design (3 concepts)', 'Style Guide', 'Business Card Design', 'Social Media Kit', 'Stationery'],
    benefits: ['Strong Brand Identity', 'Professional Image', 'Consistent Messaging', 'Increased Recognition'],
    dataAiHint: 'design logo'
  },
  {
    id: '5',
    title: 'Digital Marketing Campaign Setup',
    description: 'Launch your product with a targeted digital marketing campaign.',
    longDescription: 'Strategic setup and launch of a digital marketing campaign across multiple channels (Social Media, SEM, Email). Includes audience research, ad creative development, and initial performance monitoring. Designed to maximize ROI.',
    price: 4000,
    category: 'Marketing',
    categoryIcon: Megaphone,
    image: 'https://placehold.co/600x400.png',
    features: ['Strategy Development', 'Ad Creatives', 'Social Media Ads', 'Google Ads (SEM)', 'Email Marketing Setup'],
    benefits: ['Increased Visibility', 'Lead Generation', 'Brand Awareness', 'Measurable Results'],
    dataAiHint: 'social media'
  },
  {
    id: '6',
    title: 'Custom API Development',
    description: 'Build robust and scalable APIs tailored to your business needs.',
    longDescription: 'Development of custom RESTful or GraphQL APIs to power your applications or integrate third-party services. Focus on security, performance, and scalability. Includes documentation and testing.',
    price: 4500,
    category: 'Web Development',
    categoryIcon: Code2,
    image: 'https://placehold.co/600x400.png',
    features: ['REST/GraphQL', 'Secure Endpoints', 'Scalable Architecture', 'API Documentation', 'Automated Testing'],
    benefits: ['Seamless Integration', 'Improved Data Flow', 'Enhanced Functionality', 'Future-Proof Solution'],
    dataAiHint: 'software backend'
  },
  {
    id: '7',
    title: 'Inventory Management System',
    description: 'A web-based system to track and manage inventory effectively.',
    longDescription: 'A comprehensive inventory management system designed to help businesses track stock levels, manage orders, and reduce waste. Features real-time updates, reporting, and barcode scanning support.',
    price: 6000,
    category: 'Web Development',
    categoryIcon: ShoppingCart,
    image: 'https://placehold.co/600x400.png',
    features: ['Real-time Tracking', 'Order Management', 'Supplier Database', 'Reporting & Analytics', 'Barcode Support'],
    benefits: ['Optimized Stock Levels', 'Reduced Operational Costs', 'Improved Efficiency', 'Data-driven Decisions'],
    dataAiHint: 'business stock'
  },
  {
    id: '8',
    title: 'SaaS Product Design & Prototyping',
    description: 'User-centric design and interactive prototype for your SaaS idea.',
    longDescription: 'End-to-end UX/UI design process for SaaS applications. Includes user research, wireframing, high-fidelity mockups, and an interactive prototype to validate your concept before development.',
    price: 3000,
    category: 'Graphic Design',
    categoryIcon: Layers,
    image: 'https://placehold.co/600x400.png',
    features: ['User Research', 'Wireframes', 'UI Design', 'Interactive Prototype', 'User Testing Feedback'],
    benefits: ['User-Validated Design', 'Reduced Development Risk', 'Improved User Adoption', 'Clear Product Vision'],
    dataAiHint: 'ui ux'
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getCategories = (): string[] => {
  const categories = projects.map(project => project.category);
  return Array.from(new Set(categories));
};

export const getCategoryIcon = (categoryName: string): LucideIcon | undefined => {
  const projectWithCategory = projects.find(p => p.category === categoryName);
  return projectWithCategory?.categoryIcon;
};
