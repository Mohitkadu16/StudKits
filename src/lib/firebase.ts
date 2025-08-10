// src/lib/firebase.ts
'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { 
  getAuth, 
  updateProfile,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig as FirebaseOptions) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

// Wrapper for updating user profile
export const updateUserProfile = async (user: User, profileData: { displayName?: string; photoURL?: string }) => {
  if (!user) throw new Error("User not authenticated");
  await updateProfile(user, profileData);
};

// Wrapper for uploading profile photo
export const uploadProfilePhoto = async (userId: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `profile_photos/${userId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};


export { 
  app, 
  auth, // Export auth instance
  storage,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User 
};
