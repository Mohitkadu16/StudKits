import { MetadataRoute } from 'next'
import { analytics } from '@/lib/analytics';
import { logEvent } from 'firebase/analytics';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StudKits',
    short_name: 'StudKits',
    description: 'Your One-Stop Solution for Technical Project Kits',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
  }
}

// Copy command for Windows Command Prompt
// copy "c:\Users\mohit\Downloads\favicon_io\*" "c:\Users\mohit\My folder\Coding\studio\public\"

const analyticsInstance = await analytics();
if (analyticsInstance) {
  logEvent(analyticsInstance, 'custom_event', {
    // your event parameters
  });
}
