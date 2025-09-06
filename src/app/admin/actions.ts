'use server';

import { type StageKey } from '@/lib/tracking';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { type ProjectRequest } from '@/lib/requests';

export async function getAllProjects() {
  try {
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProjectRequest[];
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function updateProjectStage(projectId: string, newStage: StageKey) {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      currentStage: newStage
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating project stage:', error);
    return { success: false, error: 'Failed to update project stage' };
  }
}

export async function updateProjectNotes(projectId: string, stageKey: string, notes: string) {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      [`stages.${stageKey}.notes`]: notes
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating project notes:', error);
    return { success: false, error: 'Failed to update project notes' };
  }
}

export async function deleteProject(projectId: string) {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}
