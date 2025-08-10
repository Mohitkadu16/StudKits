
'use client';

import { ProjectTracker } from '@/components/tracking/project-tracker';
import { mockProject, type ProjectTrackingInfo } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function TrackingPage() {
    const { user, isLoading: authLoading } = useAuth();
    // In a real app, you would fetch the user's projects here.
    // For now, we use mock data if the user is logged in.
    const [project, setProject] = useState<ProjectTrackingInfo | null>(null);

    useEffect(() => {
        if (!authLoading && user) {
            // Here you would typically fetch the user's project data from Firestore
            // e.g., fetchProjectForUser(user.uid).then(setProject);
            setProject(mockProject);
        } else {
            setProject(null);
        }
    }, [user, authLoading]);


  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Project Tracking</h1>
        <p className="text-lg text-muted-foreground">
          Follow your project's journey from our workshop to your doorstep.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        {authLoading ? (
            <p>Loading...</p>
        ) : user ? (
            project ? (
                 <ProjectTracker project={project} />
            ) : (
                <Card className="text-center shadow-lg p-8">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-center text-2xl">
                            <PackageSearch className="mr-3 h-8 w-8 text-primary" />
                           No Active Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You don't have any projects being tracked at the moment.</p>
                        <Button asChild className="mt-4">
                            <Link href="/">Explore Our Kits</Link>
                        </Button>
                    </CardContent>
                </Card>
            )
        ) : (
          <Card className="text-center shadow-lg p-8">
             <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl">
                    <PackageSearch className="mr-3 h-8 w-8 text-primary" />
                    Track Your Order
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Please log in to see the status of your projects.</p>
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
