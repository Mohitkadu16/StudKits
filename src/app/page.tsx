
'use client';

import { useState, useMemo } from 'react';
import { projects, getCategories, getCategoryIcon, Project } from '@/lib/projects';
import { ProjectCard } from '@/components/project/project-card';
import { ProjectFilters } from '@/components/project/project-filters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const uniqueCategories = useMemo(() => {
    const categoryNames = getCategories();
    return categoryNames.map(name => ({
      name,
      icon: getCategoryIcon(name)
    }));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
      const matchesSearch = searchTerm
        ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Explore Our Projects</h1>
        <p className="text-lg text-muted-foreground">
          Discover innovative project kits tailored for your needs.
        </p>
      </section>

      {/* Container for Search and Filters */}
      <div className="space-y-6 mb-8">
        <div className="relative w-full"> {/* Search Input Container */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects by title, description, or category..."
            className="pl-10 w-full shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ProjectFilters
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
