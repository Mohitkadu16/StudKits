
import { Package, CircuitBoard, Code, TestTube, Truck, type LucideIcon } from "lucide-react";

export type StageStatus = 'pending' | 'in_progress' | 'completed';

export interface Stage {
    status: StageStatus;
    timestamp: string; // ISO 8601 format
    notes?: string;
    imageUrl?: string;
}

export type StageKey = 'components_collected' | 'circuit_design' | 'programming' | 'testing' | 'shipping';

export interface ProjectTrackingInfo {
    projectId: string;
    userId: string;
    currentStage: StageKey;
    stages: Record<StageKey, Stage>;
}

export const stageIcons: Record<StageKey, LucideIcon> = {
    components_collected: Package,
    circuit_design: CircuitBoard,
    programming: Code,
    testing: TestTube,
    shipping: Truck,
};

export const getStageIcon = (stage: StageKey): LucideIcon => {
    return stageIcons[stage] || Package;
}

// Mock data for demonstrating the UI
export const mockProject: ProjectTrackingInfo = {
    projectId: 'SK-1024',
    userId: 'user-abc-123',
    currentStage: 'programming',
    stages: {
        components_collected: {
            status: 'completed',
            timestamp: '2023-10-26T10:00:00Z',
            notes: 'All components received from suppliers.',
        },
        circuit_design: {
            status: 'completed',
            timestamp: '2023-10-27T14:30:00Z',
            notes: 'Schematic finalized and PCB layout sent for fabrication.',
            imageUrl: 'https://placehold.co/600x400.png',
        },
        programming: {
            status: 'in_progress',
            timestamp: '2023-10-28T11:00:00Z',
            notes: 'Initial firmware flashed. Working on sensor integration logic.',
        },
        testing: {
            status: 'pending',
            timestamp: '',
        },
        shipping: {
            status: 'pending',
            timestamp: '',
        },
    },
};
