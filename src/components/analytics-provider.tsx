'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';
import { logEvent } from 'firebase/analytics';

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initAnalytics = async () => {
      try {
        const analyticsInstance = await analytics();
        if (analyticsInstance) {
          // Log page_view event
          logEvent(analyticsInstance, 'page_view', {
            page_path: pathname,
            page_search: searchParams.toString(),
            page_location: window.location.href,
          });
        }
      } catch (error) {
        console.error('Error initializing analytics:', error);
      }
    };

    initAnalytics();
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
