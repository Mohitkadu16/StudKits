'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubcategoryBadge } from '@/components/ui/badge-subcategory';
import type { LucideIcon } from 'lucide-react';

interface ProjectFiltersProps {
  categories: { name: string; icon?: LucideIcon }[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
    subcategories: ('Micro Project' | 'Capstone Project')[];
  selectedSubcategory: string | null;
    onSelectSubcategory: (subcategory: 'Micro Project' | 'Capstone Project' | null) => void;
}

export function ProjectFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  subcategories,
  selectedSubcategory,
  onSelectSubcategory
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Category filters */}
      <div className="overflow-x-auto py-1">
        <div className="flex flex-nowrap gap-2 items-center justify-start">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => onSelectCategory(null)}
            className={cn(
                selectedCategory === null && "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-sm shrink-0"
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
                "shadow-sm shrink-0"
              )}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {name}
            </Button>
          ))}
        </div>
      </div>

      {/* Subcategory filters */}
      {subcategories.length > 0 && (
        <div className="overflow-x-auto py-1">
          <div className="flex flex-nowrap gap-2 items-center justify-start">
            <Button
              variant={selectedSubcategory === null ? 'default' : 'outline'}
              onClick={() => onSelectSubcategory(null)}
              size="sm"
              className={cn(
                selectedSubcategory === null && "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-sm shrink-0"
              )}
            >
              All Types
            </Button>
            {subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
                onClick={() => onSelectSubcategory(subcategory)}
                size="sm"
                className={cn(
                  selectedSubcategory === subcategory && "bg-primary text-primary-foreground hover:bg-primary/90",
                  "shadow-sm shrink-0"
                )}
              >
                <SubcategoryBadge
                  subcategory={subcategory}
                  className={cn(
                    selectedSubcategory === subcategory && "bg-white/10 text-white ring-white/20"
                  )}
                />
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
