// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  disableNetwork, 
  enableNetwork 
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig as FirebaseOptions) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Enable offline persistence with custom configuration
if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db).catch((err: { code: string }) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Firebase persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Firebase persistence not supported by browser');
      }
    });

    // Set up offline capabilities
    enableNetwork(db).catch((error: Error) => {
      console.error('Error enabling network:', error);
    });

    // Listen for online/offline status
    window.addEventListener('online', () => {
      console.log('App is online, enabling Firebase network');
      enableNetwork(db).catch((error: Error) => {
        console.error('Error enabling network:', error);
      });
    });

    window.addEventListener('offline', () => {
      console.log('App is offline, disabling Firebase network');
      disableNetwork(db).catch((error: Error) => {
        console.error('Error disabling network:', error);
      });
    });

  } catch (err) {
    console.error('Error setting up Firebase offline persistence:', err);
  }
}

export { 
  app, 
  auth, // Export auth instance
  storage,
  db, // Export Firestore instance
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User 
};
