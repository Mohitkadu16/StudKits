
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { type ProjectRequest } from '@/lib/requests';
import { UserCog, Loader2, Database, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProjectInFirestore, seedInitialProject, approveProjectRequest, declineProjectRequest } from './actions';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, getDoc, collection, query } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ProjectRequests = dynamic(() => import('@/components/admin/project-requests').then(mod => mod.ProjectRequests), {
  loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/>
});

const ProjectManager = dynamic(() => import('@/components/admin/project-manager').then(mod => mod.ProjectManager), {
  loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/>
});

const MOCK_PROJECT_ID = 'SK-1024';

const AdminDashboard = () => {
  const [project, setProject] = useState<ProjectTrackingInfo | null>(null);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [allProjects, setAllProjects] = useState<ProjectTrackingInfo[]>([]);
  
  useEffect(() => {
    // Listen to all projects
    const projectsQuery = query(collection(db, 'projects'));

    const unsubProject = onSnapshot(projectsQuery, (snapshot) => {
        const projects = snapshot.docs.map(doc => {
            const data = doc.data() as ProjectTrackingInfo;
            return {
                ...data,
                projectId: doc.id // Use the document ID as the project ID
            };
        });
        
        setAllProjects(projects);
        // Set the first project as the active one for editing if none is selected
        if (!project && projects.length > 0) {
            setProject(projects[0]);
        }
    }, (err) => {
        console.error("Projects snapshot error:", err);
        setError("Failed to listen to project updates.");
    });

    const requestsQuery = query(collection(db, 'projectRequests'));
    const unsubRequests = onSnapshot(requestsQuery, (snapshot) => {
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectRequest));
        setProjectRequests(requests);
    }, (err) => {
        console.error("Requests snapshot error:", err);
        toast({ title: "Error", description: "Could not fetch project requests.", variant: "destructive" });
    });

    return () => {
        unsubProject();
        unsubRequests();
    };
  }, [toast]);

  const handleStageChange = async (projectId: string, newStage: StageKey) => {
    if (!project) return;
    
    // Update all stages' status based on the new current stage
    const updatedStages = { ...project.stages };
    const stageOrder: StageKey[] = ['components_collected', 'circuit_design', 'programming', 'testing', 'shipping', 'completed'];
    const newStageIndex = stageOrder.indexOf(newStage);
    
    stageOrder.forEach((stage, index) => {
      if (index < newStageIndex) {
        // Previous stages are completed
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'completed',
          timestamp: updatedStages[stage].timestamp || new Date().toISOString()
        };
      } else if (index === newStageIndex) {
        // Current stage is in progress
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'in_progress',
          timestamp: new Date().toISOString()
        };
      } else {
        // Future stages are pending
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'pending',
          timestamp: ''
        };
      }
    });

    // Update local state
    const updatedProject = { ...project, currentStage: newStage, stages: updatedStages };
    setProject(updatedProject);
    
    // Save to Firestore immediately
    const result = await updateProjectInFirestore(projectId, { 
      currentStage: newStage, 
      stages: updatedStages 
    });
    
    if (result.success) {
      toast({ title: "Stage Updated", description: `Project stage updated to ${newStage.replace(/_/g, ' ').toUpperCase()}` });
    } else {
      toast({ title: "Update Failed", description: result.message, variant: 'destructive' });
    }
  };

  const handleNotesChange = async (projectId: string, stageKey: StageKey, notes: string) => {
    if (!project) return;
    const updatedStages = { ...project.stages };
    updatedStages[stageKey] = { ...updatedStages[stageKey], notes: notes };
    
    // Update local state
    setProject({ ...project, stages: updatedStages });
    
    // Save to Firestore immediately
    const result = await updateProjectInFirestore(projectId, { stages: updatedStages });
    if (!result.success) {
      toast({ title: "Save Failed", description: result.message, variant: 'destructive' });
    }
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    const result = await seedInitialProject();
    if (result.success) {
      toast({ title: "Success", description: result.message });
      setError(null);
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsSeeding(false);
  };
  
  const handleApprove = async (request: ProjectRequest) => {
      const result = await approveProjectRequest(request);
      if (result.success) {
          toast({ title: "Request Approved", description: `Project ${result.projectId} has been created.` });
      } else {
          toast({ title: "Approval Failed", description: result.message, variant: "destructive" });
      }
  };
  
  const handleDecline = async (request: ProjectRequest) => {
      const result = await declineProjectRequest(request);
      if (result.success) {
          toast({ title: "Request Declined", description: "The request has been declined and the user has been notified." });
      } else {
          toast({ title: "Decline Failed", description: result.message, variant: "destructive" });
      }
  };

  const handleProjectSelect = (projectId: string) => {
    const selectedProject = allProjects.find(p => p.projectId === projectId);
    if (selectedProject) {
      setProject(selectedProject);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
          <UserCog className="mr-3 h-10 w-10" /> Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">Manage and update user project tracking information from Firestore.</p>
      </section>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button onClick={handleSeedData} disabled={isSeeding} className="mt-4">
            <Database className="mr-2 h-4 w-4" />
            {isSeeding ? 'Seeding...' : 'Seed Test Project'}
          </Button>
        </Alert>
      )}

      <ProjectRequests 
        projectRequests={projectRequests} 
        onApprove={handleApprove} 
        onDecline={handleDecline} 
      />

      <ProjectManager 
        project={project}
        allProjects={allProjects}
        onProjectSelect={handleProjectSelect}
        onStageChange={handleStageChange}
        onNotesChange={handleNotesChange}
      />
    </div>
  );
};

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isAdmin = user?.email === 'studkits25@gmail.com';
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setIsRedirecting(true);
        router.push('/login');
      } else if (!isAdmin) {
        setIsRedirecting(true);
        router.push('/');
      }
    }
  }, [user, isLoading, isAdmin, router]);

  if (isLoading || isRedirecting) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <AdminDashboard />;
}
