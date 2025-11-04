import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProjectManagerProps {
  project: ProjectTrackingInfo | null;
  allProjects: ProjectTrackingInfo[];
  onProjectSelect: (projectId: string) => void;
  onStageChange: (projectId: string, stage: StageKey) => Promise<void>;
  onNotesChange: (projectId: string, stageKey: StageKey, notes: string) => Promise<void>;
}

export function ProjectManager({ 
  project, 
  allProjects, 
  onProjectSelect,
  onStageChange,
  onNotesChange
}: ProjectManagerProps) {
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" /> Active Projects
          </CardTitle>
          <CardDescription>Select a project to manage its progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={project?.projectId} 
            onValueChange={(value) => onProjectSelect(value)}
          >
            <SelectTrigger><SelectValue placeholder="Select a project to manage" /></SelectTrigger>
            <SelectContent>
              {allProjects.map(p => (
                <SelectItem key={p.projectId} value={p.projectId}>
                  {p.projectId} - {p.userId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {project && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Manage Project: {project.projectId}</CardTitle>
            <CardDescription>Customer: {project.userId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`stage-select-${project.projectId}`}>Current Stage</Label>
              <Select 
                value={project.currentStage} 
                onValueChange={(value: StageKey) => onStageChange(project.projectId, value)}
              >
                <SelectTrigger id={`stage-select-${project.projectId}`}>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(project.stages).map(stageKey => (
                    <SelectItem key={stageKey} value={stageKey as StageKey}>
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
                      onChange={(e) => onNotesChange(project.projectId, stageKey, e.target.value)}
                      rows={2}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}