import { type NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Only apply to /admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return;
  }

  const user = await getUserFromRequest(request);
  const isAdmin = user?.email === 'studkits25@gmail.com';

  if (!user || !isAdmin) {
    return Response.redirect(new URL('/login', request.url));
  }
}