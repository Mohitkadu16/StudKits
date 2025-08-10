// src/lib/firebase.ts
'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig as FirebaseOptions) : getApp();
const auth = getAuth(app);

// It's better to export the functions with the auth instance already passed in
// or export the auth instance itself and pass it at the call site.
// We'll pass it at the call site for clarity.

export { 
  app, 
  auth, // Export auth instance
  firebaseCreateUserWithEmailAndPassword as createUserWithEmailAndPassword, 
  firebaseSignInWithEmailAndPassword as signInWithEmailAndPassword, 
  firebaseSignOut as signOut,
  onAuthStateChanged,
  type User 
};
