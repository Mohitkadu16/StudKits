import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { type ServiceAccount } from 'firebase-admin';

// Use environment variables in production
const serviceAccount: ServiceAccount = require('../../scripts/serviceAccountKey.json');

export const admin = getApps().length === 0 
  ? initializeApp({
      credential: cert(serviceAccount)
    }) 
  : getApps()[0];