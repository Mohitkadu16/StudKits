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
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where
} from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = !getApps().length 
  ? initializeApp(firebaseConfig as FirebaseOptions) 
  : getApp();

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Firestore helpers (CRUD)
// Helper to convert a single path string like "users/uid" into doc(db, 'users', 'uid')
function resolveDocRef(path: string) {
  const parts = path.split('/').filter(Boolean);
  // Use a cast to 'any' for the doc call to avoid strict overload type issues when spreading parts
  return (doc as any)(db, ...parts);
}

const createDocument = async (path: string, data: object) => {
  await setDoc(resolveDocRef(path), data, { merge: true });
};

const readDocument = async (path: string) => {
  const snapshot = await getDoc(resolveDocRef(path));
  return snapshot.exists() ? snapshot.data() : null;
};

const updateDocument = async (path: string, data: object) => {
  await updateDoc(resolveDocRef(path), data);
};

const deleteDocument = async (path: string) => {
  await deleteDoc(resolveDocRef(path));
};

const addCollectionDoc = async (collectionPath: string, data: object) => {
  return await addDoc(collection(db, collectionPath), data);
};

const getCollectionDocs = async (collectionPath: string, filters?: { field: string, op: any, value: any }[]) => {
  // Use a flexible type for q because query(...) returns a Query while collection(...) returns a CollectionReference
  let q: any = collection(db, collectionPath);

  if (filters) {
    q = query(
      collection(db, collectionPath),
      ...filters.map((f) => where(f.field, f.op, f.value))
    );
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
};

// User profile helpers
const getUserProfile = async (uid: string) => {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as any) : null;
};

const setUserProfile = async (uid: string, data: object) => {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, data, { merge: true });
};

export { 
  app, 
  auth, 
  storage,
  db, 
  // Firestore CRUD helpers
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
  addCollectionDoc,
  getCollectionDocs,
  getUserProfile,
  setUserProfile,
  // Auth exports
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User 
};
