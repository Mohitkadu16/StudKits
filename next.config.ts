import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure image optimization
  images: {
    domains: ['placehold.co', 'studkits.vercel.app', 'studkits.shop', 'www.studkits.shop'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'studkits.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'studkits.shop',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.studkits.shop',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: false,
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // Increase build time limits
  staticPageGenerationTimeout: 120,
  // Domain configuration
  basePath: '',
  // Configure asset handling for Vercel
  output: 'standalone',
  // Production domain configuration
  env: {
    NEXT_PUBLIC_DOMAIN: 'studkits.shop',
    NEXT_PUBLIC_URL: 'https://studkits.shop',
  },
  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // Configure headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate'
          }
        ],
      }
    ];
  },
};

export default nextConfig;
