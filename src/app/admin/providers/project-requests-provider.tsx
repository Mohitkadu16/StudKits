import { createContext, useContext, useEffect, useState } from 'react';
import { type ProjectRequest } from '@/lib/requests';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { approveProjectRequest, declineProjectRequest } from '@/lib/requests';

interface ProjectRequestsContextType {
  projectRequests: ProjectRequest[];
  isLoading: boolean;
  error: string | null;
  approveRequest: (request: ProjectRequest) => Promise<void>;
  declineRequest: (request: ProjectRequest) => Promise<void>;
}

const ProjectRequestsContext = createContext<ProjectRequestsContextType | null>(null);

export function ProjectRequestsProvider({ children }: { children: React.ReactNode }) {
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const requestsQuery = query(collection(db, 'projectRequests'));
    const unsubscribe = onSnapshot(requestsQuery, 
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectRequest));
        setProjectRequests(requests);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching requests:', error);
        setError('Failed to fetch project requests');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function approveRequest(request: ProjectRequest) {
    try {
      const result = await approveProjectRequest(request);
      if (result.success) {
        toast({ title: "Request Approved", description: `Project ${result.projectId} has been created.` });
      } else {
        toast({ title: "Approval Failed", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ 
        title: "Error", 
        description: `Failed to approve request: ${error instanceof Error ? error.message : "Unknown error"}`, 
        variant: "destructive" 
      });
    }
  }

  async function declineRequest(request: ProjectRequest) {
    try {
      const result = await declineProjectRequest(request);
      if (result.success) {
        toast({ title: "Request Declined", description: "The user has been notified." });
      } else {
        toast({ title: "Decline Failed", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ 
        title: "Error", 
        description: `Failed to decline request: ${error instanceof Error ? error.message : "Unknown error"}`, 
        variant: "destructive" 
      });
    }
  }

  const value = {
    projectRequests,
    isLoading,
    error,
    approveRequest,
    declineRequest
  };

  return (
    <ProjectRequestsContext.Provider value={value}>
      {children}
    </ProjectRequestsContext.Provider>
  );
}

export function useProjectRequests() {
  const context = useContext(ProjectRequestsContext);
  if (!context) {
    throw new Error('useProjectRequests must be used within ProjectRequestsProvider');
  }
  return context;
}