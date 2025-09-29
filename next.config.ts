import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable asset optimization and CDN caching
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.studkits.in' : '',
  // Configure image optimization and CDN
  images: {
    domains: ['cdn.studkits.in', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.studkits.in',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable image optimization
    unoptimized: false,
    // Configure image caching
    minimumCacheTTL: 60,
  },
  // Enable static asset caching
  staticPageGenerationTimeout: 120,
  experimental: {
    // Enable optimizations for static assets
    optimizeCss: true,
    // Enable modern JavaScript optimizations
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // Configure headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
