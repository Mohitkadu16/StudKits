import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ProjectRequest } from '@/types/project-request';

const COLLECTION_NAME = 'projectRequests';

export async function createProjectRequest(data: Omit<ProjectRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
  try {
    const projectRef = collection(db, COLLECTION_NAME);
    const newProject = await addDoc(projectRef, {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    return { 
      success: true, 
      id: newProject.id 
    };
  } catch (error) {
    console.error('Error creating project request:', error);
    throw error;
  }
}

export async function getUserProjectRequests(userId: string): Promise<ProjectRequest[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(
      projectsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ProjectRequest));
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
}

export async function getAllProjectRequests(): Promise<ProjectRequest[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ProjectRequest));
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
}

export async function updateProjectStatus(projectId: string, status: ProjectRequest['status'], notes?: string) {
  try {
    const projectRef = doc(db, COLLECTION_NAME, projectId);
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
}
