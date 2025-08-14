
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, PenSquare, ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundProject = getProjectById(projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Handle project not found, e.g., redirect or show a message
        router.push('/'); // Redirect to home if project not found
      }
    }
    setIsLoading(false);
  }, [params.id, router]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-xl text-muted-foreground">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold mb-4">Project Not Found</h1>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  const CategoryIcon = project.categoryIcon;

  return (
    <div className="space-y-8">
      <div>
        <Button variant="outline" asChild className="mb-6 shadow-sm hover:shadow-md transition-shadow">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto">
            {project.sketchfabEmbedUrl ? (
              <iframe
                title={project.title}
                src={project.sketchfabEmbedUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={project.dataAiHint || "project detail"}
              />
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-3xl font-bold text-primary">{project.title}</CardTitle>
                {CategoryIcon && (
                  <Badge variant="secondary" className="ml-2 shrink-0 text-sm py-1 px-3 flex items-center gap-1">
                    <CategoryIcon className="h-4 w-4" />
                    {project.category}
                  </Badge>
                )}
              </div>
              {!CategoryIcon && <Badge variant="secondary" className="text-sm py-1 px-3">{project.category}</Badge>}
            </CardHeader>

            <CardContent className="p-0 flex-grow space-y-6">
              <CardDescription className="text-base text-foreground/80 leading-relaxed">
                {project.longDescription}
              </CardDescription>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Features
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-blue-500" /> Benefits
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                  {project.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </CardContent>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold text-accent-foreground bg-accent/20 px-4 py-2 rounded-md">
                    ₹{project.price.toLocaleString()}
                  </p>
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                    <Link href={`/custom-project?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.longDescription)}&features=${encodeURIComponent(project.features.join('\n'))}`}>
                      <PenSquare className="mr-2 h-5 w-5" /> Request Custom Project
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button asChild size="lg" variant="secondary" className="shadow-md">
                    <Link href={`https://wa.me/918976451602?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`} target="_blank">
                      <Phone className="mr-2 h-5 w-5" /> Contact: 8976451602
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="shadow-md">
                    <Link href={`https://wa.me/917506104767?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`} target="_blank">
                      <Phone className="mr-2 h-5 w-5" /> Contact: 7506104767
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
