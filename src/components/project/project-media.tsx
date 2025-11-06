import Image from 'next/image';
import { type Project } from '@/lib/projects';

interface ProjectMediaProps {
  project: Project;
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  return (
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
          priority={true}
          data-ai-hint={project.dataAiHint || "project detail"}
        />
      )}
    </div>
  );
}