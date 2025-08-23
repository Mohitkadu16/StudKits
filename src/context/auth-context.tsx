// src/context/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, getUserProfile } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
          const merged = {
            ...u,
            ...profile,
            college: normalizedCollege,
            collegeName: normalizedCollege,
            school: normalizedCollege,
          } as unknown as User;
          setUser(merged);
        } else {
          setUser(u);
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

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
