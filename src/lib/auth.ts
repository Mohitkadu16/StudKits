import { type NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { admin } from './firebase-admin';

export async function getUserFromRequest(request: NextRequest) {
  try {
    const auth = getAuth(admin);
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return null;
    }

    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    return null;
  }
}