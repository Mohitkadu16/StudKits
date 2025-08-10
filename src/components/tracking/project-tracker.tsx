
'use client';

import type { ProjectTrackingInfo, Stage, StageKey } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getStageIcon } from '@/lib/tracking';
import { CheckCircle2, CircleDashed, Loader, Package } from 'lucide-react';
import Image from 'next/image';

interface ProjectTrackerProps {
  project: ProjectTrackingInfo;
}

export function ProjectTracker({ project }: ProjectTrackerProps) {
  const stageKeys: StageKey[] = ['components_collected', 'circuit_design', 'programming', 'testing', 'shipping'];
  const totalStages = stageKeys.length;
  const currentStageIndex = stageKeys.indexOf(project.currentStage);
  const progressPercentage = ((currentStageIndex + 1) / totalStages) * 100;
  
  const stageNames: Record<StageKey, string> = {
    components_collected: 'Components Collected',
    circuit_design: 'Circuit Design',
    programming: 'Programming',
    testing: 'Testing',
    shipping: 'Shipping',
  };

  const getStatusIcon = (status: Stage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'in_progress':
        return <Loader className="h-6 w-6 text-blue-500 animate-spin" />;
      case 'pending':
        return <CircleDashed className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Package className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="bg-muted/50 p-6">
        <CardTitle className="text-2xl flex items-center justify-between">
            <span>Order #{project.projectId}</span>
            <span className="text-lg font-medium text-primary">{stageNames[project.currentStage]}</span>
        </CardTitle>
        <CardDescription>
            Last Updated: {new Date(project.stages[project.currentStage].timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Order Placed</span>
                <span>Delivered</span>
            </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-8">
            {stageKeys.map((key) => {
                const stage = project.stages[key];
                const StageIcon = getStageIcon(key);
                return (
                    <div key={key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                <StageIcon className="h-6 w-6" />
                            </div>
                           {key !== 'shipping' && (
                             <div className="w-px h-full bg-border mt-2"></div>
                           )}
                        </div>
                        <div className="flex-1 pb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{stageNames[key]}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Status: <span className="font-medium text-foreground">{stage.status.replace('_', ' ')}</span>
                                    </p>
                                    {stage.status !== 'pending' && (
                                         <p className="text-sm text-muted-foreground">
                                            Updated: {new Date(stage.timestamp).toLocaleString()}
                                         </p>
                                    )}
                                </div>
                                {getStatusIcon(stage.status)}
                            </div>
                            {stage.notes && (
                                <p className="mt-2 text-sm bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800">
                                    {stage.notes}
                                </p>
                            )}
                             {stage.imageUrl && (
                                <div className="mt-4">
                                    <Image 
                                        src={stage.imageUrl} 
                                        alt={`${stageNames[key]} update`}
                                        width={200}
                                        height={150}
                                        className="rounded-md shadow-md" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </CardContent>
    </Card>
  );
}

