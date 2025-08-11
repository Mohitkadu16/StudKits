import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from './firebase';

export const analytics = async () => {
  if (typeof window !== 'undefined') {
    try {
      const isAnalyticsSupported = await isSupported();
      if (isAnalyticsSupported) {
        return getAnalytics(app);
      }
      return null;
    } catch (error) {
      console.error('Analytics error:', error);
      return null;
    }
  }
  return null;
};
