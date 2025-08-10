
'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { projects, getCategories, getCategoryIcon, Project } from '@/lib/projects';
import { ProjectCard } from '@/components/project/project-card';
import { ProjectFilters } from '@/components/project/project-filters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Lightbulb, Bot, Cpu } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const projectsSectionRef = useRef<HTMLDivElement>(null);

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

  const handleScrollToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      {/* New Hero Section */}
      <section className="text-center py-16 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Bring Your Tech Ideas to Life with StudKits
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            We provide high-quality, ready-to-assemble project kits and expert services to empower students, hobbyists, and professionals. From IoT and Robotics to custom PCB design, start building today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={handleScrollToProjects}>
              Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                <Lightbulb className="mr-2 h-5 w-5" /> Learn More About Us
              </Link>
            </Button>
          </div>
           <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Bot className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Robotics & Automation</h3>
              <p className="text-muted-foreground text-sm">Build intelligent robots that move and interact.</p>
            </div>
            <div className="flex flex-col items-center">
              <Cpu className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Embedded Systems</h3>
              <p className="text-muted-foreground text-sm">Master microcontrollers like Arduino and ESP32.</p>
            </div>
            <div className="flex flex-col items-center">
              <Lightbulb className="h-10 w-10 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Custom Solutions</h3>
              <p className="text-muted-foreground text-sm">Get custom kits and presentations tailored for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsSectionRef} className="space-y-8 scroll-mt-20">
         <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Explore Our Project Kits</h2>
            <p className="text-lg text-muted-foreground">Find the perfect kit to kickstart your next build.</p>
         </div>

        {/* Container for Search and Filters */}
        <div className="space-y-6 mb-8">
          <div className="relative w-full max-w-2xl mx-auto"> {/* Search Input Container */}
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
      </section>
    </div>
  );
}
