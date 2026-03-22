import { getApps, initializeApp, cert } from 'firebase-admin/app';

function getServiceAccount() {
  // 1. Try environment variables first (for Vercel Production)
  if (process.env.FIREBASE_PRIVATE_KEY) {
    return {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }
  
  // 2. Fall back to local file for development, bypassing Webpack static analysis
  try {
    const fs = require('fs');
    const path = require('path');
    const keyPath = path.join(process.cwd(), 'scripts', 'serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
      return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    }
  } catch (e) {
    console.warn("Could not load local serviceAccountKey.json", e);
  }
  
  return null;
}

const serviceAccount = getServiceAccount();

export const admin = getApps().length === 0 && serviceAccount
  ? initializeApp({
      credential: cert(serviceAccount)
    }) 
  : getApps()[0];