'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { type ProjectRequest } from '@/lib/requests';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAllProjects, updateProjectStage, updateProjectNotes } from './actions';
import { useToast } from '@/hooks/use-toast';

type Project = ProjectTrackingInfo & ProjectRequest;

export default function AdminPage() {
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchProjects = async () => {
    try {
      const result = await getAllProjects();
      if (result.success && result.data) {
        setAllProjects(result.data as Project[]);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStageChange = async (projectId: string, newStage: StageKey) => {
    setIsUpdating(true);
    try {
      const result = await updateProjectStage(projectId, newStage);
      if (result.success) {
        toast({
          title: "Success",
          description: "Project stage updated successfully",
        });
        await fetchProjects(); // Refresh data
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update project stage",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating stage:', error);
      toast({
        title: "Error",
        description: "Failed to update project stage",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNotesChange = async (projectId: string, stageKey: string, notes: string) => {
    setIsUpdating(true);
    try {
      const result = await updateProjectNotes(projectId, stageKey, notes);
      if (result.success) {
        toast({
          title: "Success",
          description: "Project notes updated successfully",
        });
        await fetchProjects(); // Refresh data
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update project notes",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        title: "Error",
        description: "Failed to update project notes",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" /> Project Management
          </CardTitle>
          <CardDescription>Select a project to manage its progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <Select 
                value={project?.projectId} 
                onValueChange={(value) => {
                  const selectedProject = allProjects.find(p => p.projectId === value);
                  if (selectedProject) {
                    setProject(selectedProject);
                  }
                }}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project to manage" />
                </SelectTrigger>
                <SelectContent>
                  {allProjects.map(p => (
                    <SelectItem key={p.projectId} value={p.projectId}>
                      {p.projectId} - {p.userId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>
      
      {isUpdating && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <Card className="w-[300px]">
            <CardContent className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Updating project...</span>
            </CardContent>
          </Card>
        </div>
      )}

      {project && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Manage Project: {project.projectId}</CardTitle>
            <CardDescription>Customer: {project.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="stage-select">Current Stage</Label>
                <Select value={project.currentStage} onValueChange={(value: StageKey) => handleStageChange(project.projectId, value)}>
                  <SelectTrigger id="stage-select"><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(project.stages).map(stageKey => (
                      <SelectItem key={stageKey} value={stageKey}>
                        {stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {Object.keys(project.stages).map(stageKey => (
                <div key={stageKey} className="grid w-full gap-1.5">
                  <Label htmlFor={`notes-${stageKey}`}>Notes for {stageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Label>
                  <Textarea 
                    id={`notes-${stageKey}`}
                    placeholder={`Add notes for ${stageKey.replace(/_/g, ' ')}`}
                    value={project.stages[stageKey as StageKey]?.notes || ''}
                    onChange={e => handleNotesChange(project.projectId, stageKey, e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
