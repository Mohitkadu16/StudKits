// src/app/admin/actions.ts
'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import type { ProjectTrackingInfo } from '@/lib/tracking';
import { revalidatePath } from 'next/cache';

const MOCK_PROJECT_ID = 'SK-1024';
const MOCK_USER_ID = 'user-abc-123'; // In a real app, this would be dynamic

// Seed the database with initial mock data if it doesn't exist
export async function seedInitialProject(): Promise<{ success: boolean; message: string }> {
  try {
    const projectRef = doc(db, 'projects', MOCK_PROJECT_ID);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
      return { success: true, message: 'Project already exists.' };
    }

    const mockProjectData: ProjectTrackingInfo = {
      projectId: MOCK_PROJECT_ID,
      userId: MOCK_USER_ID,
      currentStage: 'programming',
      stages: {
        components_collected: {
          status: 'completed',
          timestamp: new Date('2023-10-26T10:00:00Z').toISOString(),
          notes: 'All components received from suppliers.',
        },
        circuit_design: {
          status: 'completed',
          timestamp: new Date('2023-10-27T14:30:00Z').toISOString(),
          notes: 'Schematic finalized and PCB layout sent for fabrication.',
          imageUrl: 'https://placehold.co/600x400.png',
        },
        programming: {
          status: 'in_progress',
          timestamp: new Date('2023-10-28T11:00:00Z').toISOString(),
          notes: 'Initial firmware flashed. Working on sensor integration logic.',
        },
        testing: {
          status: 'pending',
          timestamp: '',
        },
        shipping: {
          status: 'pending',
          timestamp: '',
        },
      },
    };
    
    await setDoc(projectRef, mockProjectData);
    revalidatePath('/admin');
    revalidatePath('/tracking');
    return { success: true, message: 'Initial project data seeded successfully!' };
  } catch (error) {
    console.error('Error seeding data:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to seed data: ${errorMessage}` };
  }
}

// Update a project document in Firestore
export async function updateProjectInFirestore(
  projectId: string,
  dataToUpdate: Partial<ProjectTrackingInfo>
): Promise<{ success: boolean, message: string }> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    
    // To ensure a consistent update time for the stage that's being changed
    const updatedData = { ...dataToUpdate };
    if(updatedData.currentStage && updatedData.stages) {
        const currentStageKey = updatedData.currentStage;
        updatedData.stages[currentStageKey]!.timestamp = new Date().toISOString();
        updatedData.stages[currentStageKey]!.status = 'in_progress';
        
        // Mark previous stages as completed
        const stageKeys: (keyof typeof updatedData.stages)[] = ['components_collected', 'circuit_design', 'programming', 'testing', 'shipping'];
        const currentStageIndex = stageKeys.indexOf(currentStageKey);
        for(let i=0; i<currentStageIndex; i++){
            const stageKey = stageKeys[i];
            if(updatedData.stages[stageKey]!.status !== 'completed'){
                updatedData.stages[stageKey]!.status = 'completed';
                updatedData.stages[stageKey]!.timestamp = new Date().toISOString();
            }
        }
    }
    
    await updateDoc(projectRef, updatedData);
    
    // Revalidate paths to ensure fresh data is served on next load
    revalidatePath('/admin');
    revalidatePath('/tracking');
    
    return { success: true, message: `Project ${projectId} updated successfully.` };
  } catch (error) {
    console.error('Error updating project:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to update project: ${errorMessage}` };
  }
}
