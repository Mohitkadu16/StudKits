import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Review {
  id: string;
  name: string;
  college: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  description: string;
  studentName: string;
  college: string;
  category: string;
  imageUrl: string;
  completionDate: string;
  technologies: string[];
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

interface ProjectShowcaseProps {
  projects: CompletedProject[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow border-2 border-[#4285F4] rounded-xl">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Built by {project.studentName}</p>
                    <p>{project.college}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto ">
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="h-full bg-card hover:shadow-lg transition-shadow border-2 border-[#4285F4] rounded-xl">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mb-4">{review.comment}</p>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold">{review.name}</p>
                    <p>{review.college}</p>
                    <p className="text-xs mt-2">Project: {review.projectTitle}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}