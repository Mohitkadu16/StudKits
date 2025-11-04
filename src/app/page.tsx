'use client';
import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects, getCategories, getCategoryIcon, getSubcategories } from '@/lib/projects';
import { ProjectCard } from '@/components/project/project-card';
import { ProjectFilters } from '@/components/project/project-filters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Lightbulb, Bot, Cpu } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<'Micro Project' | 'Capstone Project' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  const uniqueCategories = useMemo(() => {
    const categoryNames = getCategories();
    return categoryNames.map(name => ({
      name,
      icon: getCategoryIcon(name)
    }));
  }, []);

  const subcategories = useMemo(() => {
    return getSubcategories();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
      const matchesSubcategory = selectedSubcategory ? project.subcategories?.includes(selectedSubcategory) : true;
      const matchesSearch = searchTerm
        ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  const handleScrollToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 bg-[rgb(15,23,42)]">
      {/* Hero Section */}
      <section 
        className="text-center py-6 sm:py-8 lg:py-10 rounded-lg shadow-lg relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 backdrop-blur-sm" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b to-transparent" aria-hidden="true"></div>
        <MaxWidthWrapper className="relative">
          <h1 
            id="hero-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4285F4] mb-8 leading-tight hero-heading border-white"
          >
            Turn Your College Projects into Real Innovations <span aria-hidden="true">🚀</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-12">
            We provide high-quality, ready-to-assemble project kits and expert services to empower students, hobbyists, and professionals. From IoT and Robotics to custom PCB design, start building today!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={handleScrollToProjects}
              aria-label="Scroll to projects section"
            >
              Explore Projects <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about" aria-label="Navigate to about page">
                <Lightbulb className="mr-2 h-5 w-5" aria-hidden="true" /> Learn More About Us
              </Link>
            </Button>
          </div>
           <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center" role="list">
            <div 
              className="group flex flex-col items-center bg-[rgba(15,23,42,0.7)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1 border-2 border-[#4285F4]"
              role="listitem"
            >
              <div className="absolute inset-0 bg-[#4285F4]/5 backdrop-blur-sm group-hover:bg-[#4285F4]/10 transition-colors duration-300" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#4285F4]/10 to-transparent group-hover:from-[#4285F4]/20" aria-hidden="true"></div>
              <div className="relative flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full bg-[rgba(66,133,244,0.1)] backdrop-blur-sm border border-[#4285F4]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[rgba(66,133,244,0.2)] transition-all duration-300"
                  aria-hidden="true"
                >
                  <Bot className="h-8 w-8 text-[#4285F4] group-hover:text-[#4285F4]/80" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#4285F4] group-hover:text-[#4285F4]/80 transition-colors">Robotics & Automation</h3>
                <p className="text-muted-foreground text-sm">Build intelligent robots that move and interact.</p>
              </div>
            </div>
            <div className="group flex flex-col items-center bg-[rgba(15,23,42,0.7)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1 border-2 border-[#4285F4]">
              <div className="absolute inset-0 bg-[#4285F4]/5 backdrop-blur-sm group-hover:bg-[#4285F4]/10 transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#4285F4]/10 to-transparent group-hover:from-[#4285F4]/20"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(66,133,244,0.1)] backdrop-blur-sm border border-[#4285F4]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[rgba(66,133,244,0.2)] transition-all duration-300">
                  <Cpu className="h-8 w-8 text-[#4285F4] group-hover:text-[#4285F4]/80" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#4285F4] group-hover:text-[#4285F4]/80 transition-colors">Embedded Systems</h3>
                <p className="text-muted-foreground text-sm">Master microcontrollers like Arduino and ESP32.</p>
              </div>
            </div>
            <div className="group flex flex-col items-center bg-[rgba(15,23,42,0.7)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1 border-2 border-[#4285F4]">
              <div className="absolute inset-0 bg-[#4285F4]/5 backdrop-blur-sm group-hover:bg-[#4285F4]/10 transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#4285F4]/10 to-transparent group-hover:from-[#4285F4]/20"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(66,133,244,0.1)] backdrop-blur-sm border border-[#4285F4]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[rgba(66,133,244,0.2)] transition-all duration-300">
                  <Lightbulb className="h-8 w-8 text-[#4285F4] group-hover:text-[#4285F4]/80" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#4285F4] group-hover:text-[#4285F4]/80 transition-colors">Custom Solutions</h3>
                <p className="text-muted-foreground text-sm">Get custom kits and presentations tailored for you.</p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsSectionRef} 
        className="space-y-8 scroll-mt-20"
        aria-labelledby="projects-heading"
      >
        <MaxWidthWrapper className="space-y-8">
          <div className="text-center">
            <h2 id="projects-heading" className="text-3xl font-bold text-primary">Explore Our Project Kits</h2>
            <p className="text-lg text-muted-foreground">Find the perfect kit to kickstart your next build.</p>
          </div>

          {/* Container for Search and Filters */}
          <div className="space-y-6 mb-8" role="search" aria-label="Search projects">
            <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-[#4285F4]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search projects by title, description, or category..."
                className="pl-10 w-full shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects"
                />
            </div>
            <ProjectFilters
              categories={uniqueCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              subcategories={subcategories}
              selectedSubcategory={selectedSubcategory}
              onSelectSubcategory={setSelectedSubcategory}
            />
          </div>

          {filteredProjects.length > 0 ? (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              role="list"
              aria-label="Project cards"
            >
              {filteredProjects.map((project) => (
                <div key={project.id} role="listitem">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" role="status" aria-live="polite">
              <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    {/* Caution/Disclaimer Section */}
    <div 
      className="max-w-3xl mx-auto mt-12 text-center text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3"
      role="alert"
      aria-label="Product disclaimer"
    >
      <strong><span aria-hidden="true">⚠️</span> Caution:</strong> Project kits will not look exactly like the images shown. Actual products will be similar and functionally equivalent.
    </div>
  </div>
  );
}
