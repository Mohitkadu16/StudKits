import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const CategoryIcon = project.categoryIcon;
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={project.dataAiHint || "project image"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold leading-tight">{project.title}</CardTitle>
          {CategoryIcon && (
            <Badge variant="outline" className="ml-2 shrink-0 flex items-center gap-1">
              <CategoryIcon className="h-3 w-3" />
              {project.category}
            </Badge>
          )}
        </div>
         {!CategoryIcon && <Badge variant="outline" className="mb-2">{project.category}</Badge>}
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{project.description}</CardDescription>
        
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">
          ${project.price.toLocaleString()}
        </p>
        <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
