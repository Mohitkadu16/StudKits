import { createContext, useContext, useEffect, useState } from 'react';
import { type ProjectTrackingInfo, type StageKey } from '@/lib/tracking';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { updateProjectInFirestore } from '../actions';

interface ProjectManagerContextType {
  project: ProjectTrackingInfo | null;
  allProjects: ProjectTrackingInfo[];
  isLoading: boolean;
  error: string | null;
  handleProjectSelect: (projectId: string) => void;
  handleStageChange: (projectId: string, newStage: StageKey) => Promise<void>;
  handleNotesChange: (projectId: string, stageKey: StageKey, notes: string) => Promise<void>;
}

const ProjectManagerContext = createContext<ProjectManagerContextType | null>(null);

export function ProjectManagerProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<ProjectTrackingInfo | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectTrackingInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const projectsQuery = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(projectsQuery, 
      (snapshot) => {
        const projects = snapshot.docs.map(doc => {
          const data = doc.data() as ProjectTrackingInfo;
          return {
            ...data,
            projectId: doc.id
          };
        });
        setAllProjects(projects);
        if (!project && projects.length > 0) {
          setProject(projects[0]);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [project]);

  const handleProjectSelect = (projectId: string) => {
    const selectedProject = allProjects.find(p => p.projectId === projectId);
    if (selectedProject) {
      setProject(selectedProject);
    }
  };

  const handleStageChange = async (projectId: string, newStage: StageKey) => {
    if (!project) return;
    
    const updatedStages = { ...project.stages };
    const stageOrder: StageKey[] = ['components_collected', 'circuit_design', 'programming', 'testing', 'shipping', 'completed'];
    const newStageIndex = stageOrder.indexOf(newStage);
    
    stageOrder.forEach((stage, index) => {
      if (index < newStageIndex) {
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'completed',
          timestamp: updatedStages[stage].timestamp || new Date().toISOString()
        };
      } else if (index === newStageIndex) {
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'in_progress',
          timestamp: new Date().toISOString()
        };
      } else {
        updatedStages[stage] = {
          ...updatedStages[stage],
          status: 'pending',
          timestamp: ''
        };
      }
    });

    const updatedProject = { ...project, currentStage: newStage, stages: updatedStages };
    setProject(updatedProject);
    
    const result = await updateProjectInFirestore(projectId, { 
      currentStage: newStage, 
      stages: updatedStages 
    });
    
    if (result.success) {
      toast({ 
        title: "Stage Updated", 
        description: `Project stage updated to ${newStage.replace(/_/g, ' ').toUpperCase()}` 
      });
    } else {
      toast({ 
        title: "Update Failed", 
        description: result.message, 
        variant: 'destructive' 
      });
    }
  };

  const handleNotesChange = async (projectId: string, stageKey: StageKey, notes: string) => {
    if (!project) return;
    
    const updatedStages = { ...project.stages };
    updatedStages[stageKey] = { ...updatedStages[stageKey], notes: notes };
    
    setProject({ ...project, stages: updatedStages });
    
    const result = await updateProjectInFirestore(projectId, { stages: updatedStages });
    if (!result.success) {
      toast({ 
        title: "Save Failed", 
        description: result.message, 
        variant: 'destructive' 
      });
    }
  };

  const value = {
    project,
    allProjects,
    isLoading,
    error,
    handleProjectSelect,
    handleStageChange,
    handleNotesChange
  };

  return (
    <ProjectManagerContext.Provider value={value}>
      {children}
    </ProjectManagerContext.Provider>
  );
}

export function useProjectManager() {
  const context = useContext(ProjectManagerContext);
  if (!context) {
    throw new Error('useProjectManager must be used within ProjectManagerProvider');
  }
  return context;
}