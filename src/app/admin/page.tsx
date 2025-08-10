
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { type ProjectRequest } from '@/lib/requests';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UserCog, Loader2, Database, AlertCircle, Inbox, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProjectInFirestore, seedInitialProject, approveProjectRequest, declineProjectRequest } from './actions';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, getDoc, collection, query } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MOCK_PROJECT_ID = 'SK-1024';

const AdminDashboard = () => {
  const [project, setProject] = useState<ProjectTrackingInfo | null>(null);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const projectRef = doc(db, 'projects', MOCK_PROJECT_ID);
    getDoc(projectRef).then(docSnap => {
        if (!docSnap.exists()) {
            setError("Main project document not found. Seed data if needed for testing.");
        }
    });

    const unsubProject = onSnapshot(projectRef, (doc) => {
        setProject(doc.exists() ? (doc.data() as ProjectTrackingInfo) : null);
    }, (err) => {
        console.error("Project snapshot error:", err);
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

  const handleStageChange = (projectId: string, newStage: StageKey) => {
    if (!project) return;
    setProject({ ...project, currentStage: newStage });
  };

  const handleNotesChange = (projectId: string, stageKey: StageKey, notes: string) => {
    if (!project) return;
    const updatedStages = { ...project.stages };
    updatedStages[stageKey] = { ...updatedStages[stageKey], notes: notes };
    setProject({ ...project, stages: updatedStages });
  };

  const handleSaveChanges = async (projectId: string) => {
    if (!project) return;
    setIsLoading(true);
    const result = await updateProjectInFirestore(projectId, { currentStage: project.currentStage, stages: project.stages });
    if (result.success) {
      toast({ title: "Project Updated", description: result.message });
    } else {
      toast({ title: "Update Failed", description: result.message, variant: 'destructive' });
    }
    setIsLoading(false);
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
  
  const handleDecline = async (requestId: string) => {
      const result = await declineProjectRequest(requestId);
      if (result.success) {
          toast({ title: "Request Declined", description: "The request has been removed." });
      } else {
          toast({ title: "Decline Failed", description: result.message, variant: "destructive" });
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

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center text-2xl"><Inbox className="mr-3 h-7 w-7 text-primary"/> Project Requests</CardTitle>
            <CardDescription>Review and approve new custom project and presentation requests.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {projectRequests.length > 0 ? (
                projectRequests.map(req => (
                    <Card key={req.id} className="bg-muted/50">
                        <CardHeader>
                             <CardTitle className="text-lg">{req.projectTitle || req.topic}</CardTitle>
                             <CardDescription>From: {req.name} ({req.email})</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             {req.projectTitle && <p><strong>Type:</strong> Custom Project</p>}
                             {req.topic && <p><strong>Type:</strong> Custom Presentation</p>}
                             {req.description && <p><strong>Description:</strong> {req.description}</p>}
                             {req.instructions && <p><strong>Instructions:</strong> {req.instructions}</p>}
                             {req.components && <p><strong>Components:</strong> {req.components}</p>}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDecline(req.id)}><X className="mr-2 h-4 w-4"/>Decline</Button>
                            <Button size="sm" onClick={() => handleApprove(req)}><Check className="mr-2 h-4 w-4"/>Approve & Create Project</Button>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <p className="text-center text-muted-foreground py-4">No new project requests.</p>
            )}
        </CardContent>
      </Card>

      {project && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Manage Existing Project: {project.projectId}</CardTitle>
            <CardDescription>User ID: {project.userId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`stage-select-${project.projectId}`}>Current Stage</Label>
              <Select value={project.currentStage} onValueChange={(value: StageKey) => handleStageChange(project.projectId, value)}>
                <SelectTrigger id={`stage-select-${project.projectId}`}><SelectValue placeholder="Select stage" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(project.stages).map(stageKey => (
                    <SelectItem key={stageKey} value={stageKey}>{stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Stage Notes</h4>
              {Object.keys(project.stages).map(stage => {
                const stageKey = stage as StageKey;
                return (
                  <div key={stageKey}>
                    <Label htmlFor={`notes-${project.projectId}-${stageKey}`}>Notes for {stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
                    <Textarea
                      id={`notes-${project.projectId}-${stageKey}`}
                      placeholder={`Update notes for ${stageKey.replace(/_/g, ' ')}...`}
                      value={project.stages[stageKey]?.notes || ''}
                      onChange={(e) => handleNotesChange(project.projectId, stageKey, e.target.value)}
                      rows={2}
                    />
                  </div>
                );
              })}
            </div>
            <Button onClick={() => handleSaveChanges(project.projectId)} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes for {project.projectId}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isAdmin = user?.email === 'studkits25@gmail.com';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (!isAdmin) {
    router.push('/');
    return null;
  }

  return <AdminDashboard />;
}
