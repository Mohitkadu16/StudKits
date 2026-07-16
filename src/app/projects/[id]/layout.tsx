import type { Metadata } from 'next';
import { getProjectById } from '@/lib/projects';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    };
  }

  return {
    title: `${project.title} - StudKits Working Project`,
    description: project.longDescription || project.description,
    openGraph: {
      title: project.title,
      description: project.longDescription || project.description,
      images: [
        {
          url: project.image,
          width: 800,
          height: 600,
          alt: project.title
        }
      ],
    }
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
