
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UserCog, Loader2, Database, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProjectInFirestore, seedInitialProject } from './actions';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// For now, we'll work with a single mock project ID. In a real app, you'd fetch a list of all projects.
const MOCK_PROJECT_ID = 'SK-1024';

const AdminDashboard = () => {
  const [project, setProject] = useState<ProjectTrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the document exists first
    const projectRef = doc(db, 'projects', MOCK_PROJECT_ID);
    getDoc(projectRef).then(docSnap => {
        if (!docSnap.exists()) {
            setError("Project document not found in Firestore. Please seed the initial data.");
        }
    });

    // Set up a real-time listener for the project
    const unsubscribe = onSnapshot(
      projectRef,
      (doc) => {
        if (doc.exists()) {
          setProject(doc.data() as ProjectTrackingInfo);
          setError(null);
        } else {
          setProject(null);
        }
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
        setError("Failed to listen to project updates from Firestore.");
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

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
    
    const result = await updateProjectInFirestore(projectId, {
      currentStage: project.currentStage,
      stages: project.stages,
    });
    
    if (result.success) {
      toast({
        title: "Project Updated",
        description: result.message,
      });
    } else {
      toast({
        title: "Update Failed",
        description: result.message,
        variant: 'destructive',
      });
    }
    
    setIsLoading(false);
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    const result = await seedInitialProject();
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setError(null); // Clear error after successful seeding
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsSeeding(false);
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
          <UserCog className="mr-3 h-10 w-10" /> Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage and update user project tracking information from Firestore.
        </p>
      </section>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
           <Button onClick={handleSeedData} disabled={isSeeding} className="mt-4">
              <Database className="mr-2 h-4 w-4" />
              {isSeeding ? 'Seeding...' : 'Seed Initial Project'}
            </Button>
        </Alert>
      )}

      {project ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Project ID: {project.projectId}</CardTitle>
            <CardDescription>User ID: {project.userId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`stage-select-${project.projectId}`}>Current Stage</Label>
              <Select
                value={project.currentStage}
                onValueChange={(value: StageKey) => handleStageChange(project.projectId, value)}
              >
                <SelectTrigger id={`stage-select-${project.projectId}`}>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(project.stages).map(stageKey => (
                    <SelectItem key={stageKey} value={stageKey}>
                      {stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
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
                    <Label htmlFor={`notes-${project.projectId}-${stageKey}`}>
                      Notes for {stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Label>
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
      ) : (
        !error && <p className="text-center text-muted-foreground">Loading project data from Firestore...</p>
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
