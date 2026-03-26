// src/context/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, getUserProfile } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { VerifyEmailBlocker } from '@/components/auth/verify-email-blocker';

interface AuthContextType {
  user: (User & { college?: string; isAdmin?: boolean }) | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<(User & { college?: string; isAdmin?: boolean }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      // When auth state changes, fetch Firestore profile (if any) and merge
      if (!u) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch profile stored at users/{uid}
        const profile = await getUserProfile(u.uid);
        if (profile) {
          // normalize college/school aliases so forms can read either `college`, `collegeName` or `school`
          const normalizedCollege = (profile as any).college || (profile as any).collegeName || (profile as any).school || '';
          
          // Role lookup: Check if user is admin specifically
          const isAdmin = (profile as any).role === 'admin' || u.email === 'studkits25@gmail.com';
          
          const merged = {
            ...u,
            ...profile,
            college: normalizedCollege,
            collegeName: normalizedCollege,
            school: normalizedCollege,
            isAdmin
          } as unknown as (User & { college?: string; isAdmin?: boolean });
          setUser(merged);
        } else {
          const isAdmin = u.email === 'studkits25@gmail.com';
          const merged = { ...u, isAdmin } as unknown as (User & { college?: string; isAdmin?: boolean });
          setUser(merged);
        }
      } catch (err) {
        console.error('Error loading user profile:', err);
        setUser(u);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // Intercept unverified users (ignoring admins to prevent lockout issues)
  if (user && !user.emailVerified && !user.isAdmin) {
    return <VerifyEmailBlocker user={user as User} />;
  }

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
