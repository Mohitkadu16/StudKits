'use client';

import { ProjectTracker } from '@/components/tracking/project-tracker';
import { type ProjectTrackingInfo } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

export default function TrackingPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [project, setProject] = useState<ProjectTrackingInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authLoading) {
            setIsLoading(true);
            return;
        }

        if (user) {
            // Query for projects belonging to the current user
            const projectsQuery = query(
                collection(db, 'projects'),
                where('userId', '==', user.email)
            );

            const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
                if (!snapshot.empty) {
                    // For now, we'll show the most recent project
                    // Later we can add project selection if a user has multiple projects
                    const projectData = snapshot.docs[0].data() as ProjectTrackingInfo;
                    setProject({
                        ...projectData,
                        projectId: snapshot.docs[0].id
                    });
                } else {
                    console.log("No projects found for user");
                    setProject(null);
                }
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching projects:", error);
                setIsLoading(false);
            });

            // Cleanup the listener when the component unmounts or user changes
            return () => unsubscribe();
        } else {
            setProject(null);
            setIsLoading(false);
        }
    }, [user, authLoading]);

  if (!user) {
    return (
      <div className="space-y-8">
        <section className="text-center py-8 bg-card rounded-lg shadow">
          <h1 className="text-4xl font-bold text-primary mb-2">Project Tracking</h1>
          <p className="text-lg text-muted-foreground">Please login to view your project status.</p>
          <Button asChild className="mt-4">
            <Link href="/login">Login</Link>
          </Button>
        </section>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-8">
        <section className="text-center py-8 bg-card rounded-lg shadow">
          <h1 className="text-4xl font-bold text-primary mb-2">Project Tracking</h1>
          <p className="text-lg text-muted-foreground">No active projects found.</p>
          <div className="flex gap-4 justify-center mt-4">
            <Button asChild variant="outline">
              <Link href="/custom-project">Request Custom Project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/custom-presentation">Request Custom Presentation</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Project Tracking</h1>
        <p className="text-lg text-muted-foreground">Track your project progress</p>
      </section>

      <div className="max-w-4xl mx-auto">
        <ProjectTracker project={project} />
      </div>
    </div>
  );
}
