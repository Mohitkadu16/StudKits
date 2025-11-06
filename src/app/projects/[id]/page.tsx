import { getProjectById } from '@/lib/projects';
import { ProjectHeader } from '@/components/project/project-header';
import { ProjectMedia } from '@/components/project/project-media';
import { ProjectBenefits } from '@/components/project/project-benefits';
import { ProjectActions } from '@/components/project/project-actions';
import { ProjectRequirements } from '@/components/project/project-requirements';
import { type Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.longDescription,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="card-content w-full max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-4xl mx-auto">
      <div>
        <Button variant="outline" asChild className="mb-6 shadow-sm hover:shadow-md transition-shadow">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>

      <div className="card overflow-hidden shadow-lg opacity-100 border-4 border-[#4285F4] rounded-xl p-6">
        <ProjectHeader project={project} />
        <ProjectMedia project={project} />
        <ProjectBenefits project={project} />
        {project.requirements && <ProjectRequirements project={project} />}
        <ProjectActions project={project} />
      </div>
    </div>
  );
}

