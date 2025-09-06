
import { Package, CircuitBoard, Code, TestTube, Truck, CheckCircle2, type LucideIcon } from "lucide-react";

export type StageStatus = 'pending' | 'in_progress' | 'completed';

export interface Stage {
    status: StageStatus;
    timestamp: string; // ISO 8601 format
    notes?: string;
    imageUrl?: string;
}

export type StageKey = 'requirements' | 'design' | 'development' | 'testing' | 'completed';

export interface ProjectTrackingInfo {
    projectId: string;
    userId: string;
    currentStage: StageKey;
    stages: Record<StageKey, Stage>;
}

export const stageIcons: Record<StageKey, LucideIcon> = {
    requirements: Package,
    design: CircuitBoard,
    development: Code,
    testing: TestTube,
    completed: CheckCircle2,
};

export const getStageIcon = (stage: StageKey): LucideIcon => {
    return stageIcons[stage] || Package;
}

// Mock data for demonstrating the UI
export const mockProject: ProjectTrackingInfo = {
    projectId: 'SK-1024',
    userId: 'user-abc-123',
    currentStage: 'development',
    stages: {
        requirements: {
            status: 'completed',
            timestamp: '2023-10-26T10:00:00Z',
            notes: 'Initial requirements gathered and documented.',
        },
        design: {
            status: 'completed',
            timestamp: '2023-10-27T14:30:00Z',
            notes: 'Project design finalized and approved.',
            imageUrl: 'https://placehold.co/600x400.png',
        },
        development: {
            status: 'in_progress',
            timestamp: '2023-10-28T11:00:00Z',
            notes: 'Implementation in progress.',
        },
        testing: {
            status: 'pending',
            timestamp: '',
        },
        completed: {
            status: 'pending',
            timestamp: '',
        }
    },
};
