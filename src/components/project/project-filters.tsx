
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface ProjectFiltersProps {
  categories: { name: string; icon?: LucideIcon }[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function ProjectFilters({ categories, selectedCategory, onSelectCategory }: ProjectFiltersProps) {
  return (
    // Outer div to handle overflow and provide some padding for the scrollbar
    <div className="overflow-x-auto py-1">
      {/* Inner div for the flex container of buttons */}
      <div className="flex flex-nowrap gap-2 items-center justify-start">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => onSelectCategory(null)}
          className={cn(
              selectedCategory === null && "bg-primary text-primary-foreground hover:bg-primary/90",
              "shadow-sm shrink-0" // shrink-0 to prevent buttons from shrinking
          )}
        >
          All Projects
        </Button>
        {categories.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            variant={selectedCategory === name ? 'default' : 'outline'}
            onClick={() => onSelectCategory(name)}
            className={cn(
              selectedCategory === name && "bg-primary text-primary-foreground hover:bg-primary/90",
              "shadow-sm shrink-0" // shrink-0 to prevent buttons from shrinking
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
