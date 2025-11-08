import { type Metadata } from 'next';
import { getProjectById } from '@/lib/projects';

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

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProjectContent from './project-content';

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent id={params.id} />
    </Suspense>
  );
}

