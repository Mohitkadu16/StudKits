'use server';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ProjectRequestData {
  name: string;
  email: string;
  type: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  budget?: string;
}

export async function submitProjectRequest(data: ProjectRequestData) {
  try {
    const timestamp = new Date();
    const projectData = {
      ...data,
      status: 'pending',
      createdAt: timestamp,
      currentStage: 'requirements',
      stages: {
        requirements: {
          notes: '',
          completed: false,
          timestamp
        },
        design: {
          notes: '',
          completed: false,
          timestamp: null
        },
        development: {
          notes: '',
          completed: false,
          timestamp: null
        },
        testing: {
          notes: '',
          completed: false,
          timestamp: null
        },
        completed: {
          notes: '',
          completed: false,
          timestamp: null
        }
      }
    };

    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, projectData);
    
    return { 
      success: true, 
      message: 'Project request submitted successfully',
      projectId: docRef.id  // Return the project ID for tracking
    };
  } catch (error) {
    console.error('Error submitting project request:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to submit request' };
  }
}
