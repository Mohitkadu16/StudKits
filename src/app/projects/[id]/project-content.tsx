'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjectById } from '@/lib/projects';
import { ProjectHeader } from '@/components/project/project-header';
import { ProjectMedia } from '@/components/project/project-media';
import { ProjectBenefits } from '@/components/project/project-benefits';
import { ProjectActions } from '@/components/project/project-actions';
import { ProjectRequirements } from '@/components/project/project-requirements';
import { notFound } from 'next/navigation';

interface ProjectContentProps {
  id: string;
}

export default function ProjectContent({ id }: ProjectContentProps) {
  const [projectType, setProjectType] = useState<'capstone' | 'micro'>('micro');
  const project = getProjectById(id);

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
        <ProjectHeader 
          title={project.title}
          description={project.description}
          category={project.category}
          projectType={projectType}
          onProjectTypeChange={setProjectType}
        />
        <div className="space-y-8">
          <ProjectMedia project={{
            ...project,
            categoryIcon: undefined
          }} />
          
          {projectType === 'micro' ? (
            // Micro project content
            <div className="space-y-8">
              <ProjectBenefits project={{
                ...project,
                categoryIcon: undefined,
                benefits: project.benefits?.slice(0, 3) || [],
                features: project.features?.slice(0, 3) || []
              }} />
              <ProjectActions project={{
                ...project,
                categoryIcon: undefined
              }} />
            </div>
          ) : (
            // Capstone project content
            <div className="space-y-8">
              <ProjectBenefits project={{
                ...project,
                categoryIcon: undefined
              }} />
              {project.requirements && (
                <ProjectRequirements project={{
                  ...project,
                  categoryIcon: undefined
                }} />
              )}
              <ProjectActions project={{
                ...project,
                categoryIcon: undefined
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}