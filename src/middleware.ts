import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get response for the request
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;

  // CORS headers
  headers.set('Access-Control-Allow-Origin', 'https://studkits.in');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Security headers
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Add CDN caching headers for static assets
  if (
    request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|ico|css|js|svg)$/i) ||
    request.nextUrl.pathname.startsWith('/_next/image')
  ) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for specific paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
