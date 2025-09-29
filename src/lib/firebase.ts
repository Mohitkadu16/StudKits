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
  await setDoc(resolveDocRef(path), {
    ...data,
    createdAt: new Date().toISOString(),
  }, { merge: true });
};

// Create a new project request
const createProjectRequest = async (projectData: {
  userId: string;
  name: string;
  email: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  college?: string;
  status?: string;
}) => {
  try {
    const projectRef = collection(db, 'projectRequests');
    const newProject = await addDoc(projectRef, {
      ...projectData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: newProject.id, success: true };
  } catch (error) {
    console.error('Error creating project request:', error);
    throw error;
  }
};

const readDocument = async (path: string) => {
  const snapshot = await getDoc(resolveDocRef(path));
  return snapshot.exists() ? snapshot.data() : null;
};

// Fetch user's project requests
const getUserProjectRequests = async (userId: string) => {
  try {
    const projectsRef = collection(db, 'projectRequests');
    const q = query(projectsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

// Fetch all project requests (for admin)
const getAllProjectRequests = async () => {
  try {
    const projectsRef = collection(db, 'projectRequests');
    const querySnapshot = await getDocs(projectsRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

// Update project status
const updateProjectStatus = async (projectId: string, status: string, notes?: string) => {
  try {
    const projectRef = doc(db, 'projectRequests', projectId);
    await updateDoc(projectRef, {
      status,
      notes,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating project status:', error);
    throw error;
  }
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
  createProjectRequest,
  getUserProjectRequests,
  getAllProjectRequests,
  updateProjectStatus,
  // Auth exports
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User 
};
