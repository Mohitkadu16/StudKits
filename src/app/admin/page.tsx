
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { mockProject, type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UserCog, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// In a real application, you would fetch a list of all user projects from Firestore.
// For now, we'll use an array with the mock project to simulate this.
const initialProjects: ProjectTrackingInfo[] = [mockProject];

const AdminDashboard = () => {
  const [projects, setProjects] = useState<ProjectTrackingInfo[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStageChange = (projectId: string, newStage: StageKey) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.projectId === projectId ? { ...p, currentStage: newStage } : p
      )
    );
  };

  const handleNotesChange = (projectId: string, stageKey: StageKey, notes: string) => {
     setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.projectId === projectId) {
          const updatedStages = { ...p.stages };
          updatedStages[stageKey] = { ...updatedStages[stageKey], notes: notes };
          return { ...p, stages: updatedStages };
        }
        return p;
      })
    );
  };
  
  const handleSaveChanges = (projectId: string) => {
    setIsLoading(true);
    const projectToSave = projects.find(p => p.projectId === projectId);
    
    // In a real application, you would send this 'projectToSave' object
    // to a Firebase Cloud Function or a server-side API to update Firestore.
    console.log("Saving changes for project:", projectToSave);

    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Project Updated",
        description: `Changes for project ${projectId} have been saved.`,
      });
      setIsLoading(false);
    }, 1000);
  };


  return (
    <div className="space-y-8">
       <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
            <UserCog className="mr-3 h-10 w-10"/> Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage and update user project tracking information.
        </p>
      </section>

      <div className="space-y-6">
        {projects.map(project => (
          <Card key={project.projectId} className="shadow-md">
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
                                Notes for {stageKey.replace(/_/g, ' ')}
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
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Save Changes for {project.projectId}
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


// This is a client-side wrapper to protect the admin route.
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
        // If no user, redirect to login
        router.push('/login');
        return null;
    }

    if (!isAdmin) {
        // If user is not admin, redirect to home
        router.push('/');
        return null;
    }

    // If user is admin, render the dashboard
    return <AdminDashboard />;
}
