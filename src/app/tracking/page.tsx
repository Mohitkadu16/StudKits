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

  // Tracking feature temporarily disabled — show in-progress message
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Project Tracking</h1>
        <p className="text-lg text-muted-foreground">Tracking feature is in progress — coming soon.</p>
      </section>

      <div className="max-w-4xl mx-auto">
        <Card className="text-center shadow-lg p-8">
          <CardHeader>
            <CardTitle className="text-2xl">Tracking — Work in Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We're working on the tracking feature. Please check back later.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
