
export interface ProjectRequest {
  id: string; // Document ID from Firestore
  createdAt: string; // ISO 8601 format
  type: 'project' | 'presentation';

  // Common fields
  name: string;
  email: string;

  // For 'project' type
  projectTitle?: string;
  microcontroller?: string;
  components?: string;
  description?: string;
  budget?: string;

  // For 'presentation' type
  topic?: string;
  audience?: string;
  purpose?: string;
  style?: string;
  instructions?: string;
}
