import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { type Project } from '@/lib/projects';

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const CategoryIcon = project.categoryIcon;

  return (
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
  );
}