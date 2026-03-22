
'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { PageError } from '@/components/ui/page-error';
import { AdminSkeleton } from '@/components/admin/admin-skeleton';
import { AdminGuard } from '@/components/admin/admin-guard';
import { ProjectRequestsProvider } from './providers/project-requests-provider';
import { ProjectManagerProvider } from './providers/project-manager-provider';
import { UserCog, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { seedInitialProject } from './actions';
import { auth } from '@/lib/firebase';

const ProjectRequests = dynamic(() => import('@/components/admin/project-requests').then(mod => mod.ProjectRequests), {
  loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/>
});

const ProjectManager = dynamic(() => import('@/components/admin/project-manager').then(mod => mod.ProjectManager), {
  loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/>
});

const MOCK_PROJECT_ID = 'SK-1024';

const AdminDashboard = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const idToken = await auth.currentUser?.getIdToken(true);
      if (!idToken) {
        toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
        setIsSeeding(false);
        return;
      }
      const result = await seedInitialProject(idToken);
      if (result.success) {
        toast({ title: "Success", description: result.message });
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to seed test project.", variant: "destructive" });
    } finally {
      setIsSeeding(false);
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

      <Button onClick={handleSeedData} disabled={isSeeding} className="ml-4">
        <Database className="mr-2 h-4 w-4" />
        {isSeeding ? 'Seeding...' : 'Seed Test Project'}
      </Button>

      <ProjectRequests />
      <ProjectManager />
    </div>
  );
};

export default function AdminPage() {
  return (
    <AdminGuard>
      <ErrorBoundary FallbackComponent={PageError}>
        <Suspense fallback={<AdminSkeleton />}>
          <ProjectRequestsProvider>
            <ProjectManagerProvider>
              <AdminDashboard />
            </ProjectManagerProvider>
          </ProjectRequestsProvider>
        </Suspense>
      </ErrorBoundary>
    </AdminGuard>
  );
}
