import { type ProjectRequest } from '@/lib/requests';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox, Check, X } from 'lucide-react';

interface ProjectRequestsProps {
  projectRequests: ProjectRequest[];
  onApprove: (request: ProjectRequest) => Promise<void>;
  onDecline: (request: ProjectRequest) => Promise<void>;
}

export function ProjectRequests({ projectRequests, onApprove, onDecline }: ProjectRequestsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Inbox className="mr-3 h-7 w-7 text-primary"/> Project Requests
        </CardTitle>
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
                <Button variant="outline" size="sm" onClick={() => onDecline(req)}>
                  <X className="mr-2 h-4 w-4"/>Decline
                </Button>
                <Button size="sm" onClick={() => onApprove(req)}>
                  <Check className="mr-2 h-4 w-4"/>Approve & Create Project
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No new project requests.</p>
        )}
      </CardContent>
    </Card>
  );
}