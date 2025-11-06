import { Button } from "@/components/ui/button";
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
import Link from 'next/link';
import Image from 'next/image';
import { PenSquare } from 'lucide-react';
import { type Project } from '@/lib/projects';

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t">
      <div className="flex flex-col items-center gap-4 w-full">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md w-full max-w-sm">
          <Link href={`/custom-project?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.longDescription)}&features=${encodeURIComponent(project.features.join('\\n'))}`}>
            <PenSquare className="mr-2 h-5 w-5" /> Request Custom Project
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="secondary" className="shadow-md w-full max-w-sm">For Enquiries</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Contact Options</AlertDialogTitle>
              <AlertDialogDescription>
                Choose a contact below to reach out via WhatsApp:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link
                  href={`https://wa.me/918976451602?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`}
                  target="_blank"
                >
                  <Image src="/images/Whatsapp logo.png" alt="WhatsApp" width={20} height={20} className="mr-1 flex-shrink-1" />Ved Bhardwaj
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link
                  href={`https://wa.me/917506104767?text=Hi, I'm interested in ${encodeURIComponent(project.title)}`}
                  target="_blank"
                >
                  <Image src="/images/Whatsapp logo.png" alt="WhatsApp" width={20} height={20} className="mr-1 flex-shrink-1" />Mohit Kadu
                </Link>
              </Button>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}