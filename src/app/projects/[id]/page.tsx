'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, Project } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenSquare, ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<'Micro Project' | 'Capstone Project' | null>(null);
  
  // Add class to body for project detail pages
  useEffect(() => {
    document.body.classList.add('project-detail-page');
    return () => document.body.classList.remove('project-detail-page');
  }, []);

  useEffect(() => {
    if (params.id) {
      const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundProject = getProjectById(projectId);
      if (foundProject) {
        setProject(foundProject);
        // Set the initial subcategory to the first one in the project's subcategories
        if (foundProject.subcategories && foundProject.subcategories.length > 0) {
          setSelectedSubcategory(foundProject.subcategories[0]);
        }
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
    <div className="card-content w-full max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-4xl mx-auto">
      <div>
        <Button variant="outline" asChild className="mb-6 shadow-sm hover:shadow-md transition-shadow">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
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
                priority
                data-ai-hint={project.dataAiHint || "project detail"}
              />
            )}
          </div>
          <div className="p-4 sm:p-6 md:p-8 flex flex-col">
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
              <CardDescription className="description">
                {project.longDescription}
              </CardDescription>

              {project.subcategories && project.subcategories.length > 0 && (
                <div className="subcategory-selector">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">Project Type</h3>
                  <Select
                    value={selectedSubcategory || undefined}
                    onValueChange={(value) => setSelectedSubcategory(value as 'Micro Project' | 'Capstone Project')}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {project.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="feature-list">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" /> 
                  Features {selectedSubcategory ? `(${selectedSubcategory})` : ''}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
                  {selectedSubcategory === 'Micro Project' ? (
                    // Display simplified features for Micro Project
                    project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {feature}
                      </li>
                    ))
                  ) : selectedSubcategory === 'Capstone Project' ? (
                    // Display all features for Capstone Project
                    project.features.map((feature, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {feature}
                      </li>
                    ))
                  ) : (
                    // Default view when no subcategory is selected
                    project.features.map((feature, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {feature}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="benefit-list">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-blue-500 flex-shrink-1" /> 
                  Benefits {selectedSubcategory ? `(${selectedSubcategory})` : ''}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
                  {selectedSubcategory === 'Micro Project' ? (
                    // Display simplified benefits for Micro Project
                    project.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {benefit}
                      </li>
                    ))
                  ) : selectedSubcategory === 'Capstone Project' ? (
                    // Display all benefits for Capstone Project
                    project.benefits.map((benefit, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {benefit}
                      </li>
                    ))
                  ) : (
                    // Default view when no subcategory is selected
                    project.benefits.map((benefit, index) => (
                      <li key={index} className="break-words whitespace-normal leading-relaxed">
                        {benefit}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </CardContent>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col items-center gap-4 w-full">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md w-full max-w-sm">
                  <Link href={`/custom-project?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.longDescription)}&features=${encodeURIComponent(project.features.join('\n'))}`}>
                    <PenSquare className="mr-2 h-5 w-5" /> Request Custom Project
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="shadow-md w-full max-w-sm">For Enquiries</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Contact Options</AlertDialogTitle>
                      <AlertDialogDescription>
                        Choose a contact below to reach out via WhatsApp:
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                      <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Link
                          href={`https://wa.me/918976451602?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`}
                          target="_blank"
                        >
                          <Image src="/images/Whatsapp logo.png" alt="WhatsApp" width={20} height={20} className="mr-1 flex-shrink-1" />Ved Bhardwaj
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Link
                          href={`https://wa.me/917506104767?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`}
                          target="_blank"
                        >
                          <Image src="/images/Whatsapp logo.png" alt="WhatsApp" width={20} height={20} className="mr-1 flex-shrink-1" />Mohit Kadu
                        </Link>
                      </Button>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
