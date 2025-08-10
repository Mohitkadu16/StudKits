
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
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig as FirebaseOptions) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db).catch((err: { code: string }) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.log('Persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.log('Persistence not supported by browser');
      }
    });
  } catch (err) {
    console.error('Error enabling persistence:', err);
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
