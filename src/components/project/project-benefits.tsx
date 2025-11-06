import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Project } from '@/lib/projects';

interface ProjectBenefitsProps {
  project: Project;
}

export function ProjectBenefits({ project }: ProjectBenefitsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Benefits & Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.features.map((feature, index) => (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="text-base">{feature}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}