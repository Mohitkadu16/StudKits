import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SubcategoryBadge } from '@/components/ui/badge-subcategory';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const CategoryIcon = project.categoryIcon;
  const linkHref = project.isService ? (project.servicePageUrl || '/contact') : `/projects/${project.id}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="w-full px-2 sm:px-4 rounded-full"
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="w-full sm:max-w-md mx-auto flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out relative rounded-3xl opacity-100 border-2 border-[#4285F4] hover:border-[#5A9FFF] hover:shadow-2xl hover:shadow-primary/20">
        <CardHeader className="p-0 relative">
          {project.sketchfabEmbedUrl ? (
            <div className="aspect-[3/2] relative w-full min-h-[180px]">
              <iframe
                title={project.title}
                src={project.sketchfabEmbedUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-[3/2] relative w-full min-h-[180px] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
                priority={true}
                data-ai-hint={project.dataAiHint || "project image"}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quick Stats Overlay on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80"
              >
                <div className="flex gap-3 text-white text-xs">
                  <span>⚡ 1-2 weeks</span>
                  <span>📦 Complete kit</span>
                  <span>⭐ 4.8 rating</span>
                </div>
              </motion.div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-3 sm:p-4 flex-grow rounded-full">
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-start justify-between gap-4 w-full">
              {/* Left: title + mobile subtitle */}
              <div className="flex-1">
                <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold leading-tight break-words">
                  {project.title}
                </CardTitle>
                {/* subtitle visible only on mobile, below title */}
                <span className="block md:hidden text-xs text-muted-foreground mt-1">
                  IoT-based Project
                </span>
              </div>

              {/* Right: IoT tag (desktop) + category badge */}
              <div className="flex flex-col items-end gap-2">
                {CategoryIcon ? (
                  <Badge variant="outline" className="self-start flex items-center gap-1 text-xs rounded-full">
                    <CategoryIcon className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">{project.category}</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="self-start text-xs rounded-full">
                    <span className="break-words">{project.category}</span>
                  </Badge>
                )}
                {project.subcategories?.map((subcategory) => (
                  <SubcategoryBadge
                    key={subcategory}
                    subcategory={subcategory}
                    className="self-start"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <CardDescription className="text-sm text-muted-foreground mb-2 leading-relaxed whitespace-normal break-words">
            {project.description}
          </CardDescription>
          <div className="text-xs text-muted-foreground mb-4 italic">
            *Actual kit will look different from image.*
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-full">
              <Link href={linkHref}>
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Single Contact button with modal popup for contact options */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" size="sm" className="w-full rounded-full">For Enquiries</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
              <AlertDialogHeader className="rounded-2xl bg-card/50 p-4 mb-4">
                <AlertDialogTitle className="text-lg">Contact Options</AlertDialogTitle>
                <AlertDialogDescription className="mt-2">
                  Choose a contact below to reach out via WhatsApp:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col gap-3 mt-4 px-1">
                <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl hover:scale-[1.02] transition-transform">
                  <Link
                    href={`https://wa.me/918976451602?text=Hi, I'm interested in ${project.title}`}
                    target="_blank"
                  >
                    <Image
                      src="/images/Whatsapp logo.png"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="mr-2 flex-shrink-0"
                    />
                    Ved Bhardwaj
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl hover:scale-[1.02] transition-transform">
                  <Link
                    href={`https://wa.me/917506104767?text=Hi, I'm interested in ${project.title}`}
                    target="_blank"
                  >
                    <Image
                      src="/images/Whatsapp logo.png"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="mr-2 flex-shrink-0"
                    />
                    Mohit Kadu
                  </Link>
                </Button>
              </div>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="rounded-2xl hover:scale-[1.02] transition-transform">Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
