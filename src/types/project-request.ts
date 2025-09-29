export interface ProjectRequest {
  id: string;
  userId: string;
  name: string;
  email: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  college?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
