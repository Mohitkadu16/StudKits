import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type Project } from '@/lib/projects';

interface ProjectRequirementsProps {
  project: Project;
}

export function ProjectRequirements({ project }: ProjectRequirementsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
      <Card className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ul className="list-disc list-inside space-y-2">
            {project.requirements?.map((requirement, index) => (
              <li key={index} className="text-base">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </section>
  );
}