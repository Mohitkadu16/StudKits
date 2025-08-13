'use client';

import { useEffect, useState } from 'react';
import { useToast } from './use-toast';
import { db } from '@/lib/firebase';
import { enableNetwork, disableNetwork } from 'firebase/firestore';

export function useFirebaseConnection() {
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = async () => {
      try {
        await enableNetwork(db);
        setIsConnected(true);
        toast({
          title: 'Connected',
          description: 'You are back online',
          duration: 3000,
        });
      } catch (error) {
        console.error('Error enabling Firebase network:', error);
      }
    };

    const handleOffline = async () => {
      try {
        await disableNetwork(db);
        setIsConnected(false);
        toast({
          title: 'Offline',
          description: 'Working in offline mode',
          variant: 'destructive',
        });
      } catch (error) {
        console.error('Error disabling Firebase network:', error);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial state
    setIsConnected(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return isConnected;
}
