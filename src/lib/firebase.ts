// src/lib/firebase.ts
'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig as FirebaseOptions) : getApp();
const auth = getAuth(app);

export { 
  app, 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User 
};
