
'use client';

import { ProjectTracker } from '@/components/tracking/project-tracker';
import { type ProjectTrackingInfo } from '@/lib/tracking';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PackageSearch, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from "firebase/firestore";

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
            // For this demonstration, we'll listen to a specific document.
            // In a real application, you would query for projects belonging to the logged-in user (user.uid).
            const projectRef = doc(db, 'projects', 'SK-1024');

            const unsubscribe = onSnapshot(projectRef, (doc) => {
                if (doc.exists()) {
                    setProject(doc.data() as ProjectTrackingInfo);
                } else {
                    console.log("No such project document!");
                    setProject(null);
                }
                setIsLoading(false);
            }, (error) => {
                console.error("Error fetching project:", error);
                setIsLoading(false);
            });

            // Cleanup the listener when the component unmounts or user changes
            return () => unsubscribe();
        } else {
            setProject(null);
            setIsLoading(false);
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
        {isLoading || authLoading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
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
