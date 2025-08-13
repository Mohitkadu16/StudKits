'use client';

import { useFirebaseConnection } from '@/hooks/use-firebase-connection';
import { useNetworkStatus } from '@/hooks/use-network-status';
import { ReactNode } from 'react';

interface ConnectivityProviderProps {
  children: ReactNode;
}

export function ConnectivityProvider({ children }: ConnectivityProviderProps) {
  const isOnline = useNetworkStatus();
  const isFirebaseConnected = useFirebaseConnection();

  return <>{children}</>;
}
