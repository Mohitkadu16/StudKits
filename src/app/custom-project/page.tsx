'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Lightbulb, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { projects } from '@/lib/projects';
import { projectMicrocontrollers } from '@/lib/project-microcontrollers';
import { createProjectRequest } from '@/lib/project-store';
import { z } from 'zod';
import { contactSchema } from '@/components/custom-project/contact-section';
import { projectDetailsSchema } from '@/components/custom-project/project-details-section';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz";

const ContactSection = dynamic(
  () => import('@/components/custom-project/contact-section').then(mod => mod.ContactSection),
  { loading: () => <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-20 bg-muted rounded" />
        <div className="h-20 bg-muted rounded" />
      </div>
    </div> }
);

const ProjectDetailsSection = dynamic(
  () => import('@/components/custom-project/project-details-section').then(mod => mod.ProjectDetailsSection),
  { loading: () => <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded" />
      <div className="space-y-6">
        <div className="h-20 bg-muted rounded" />
        <div className="h-32 bg-muted rounded" />
      </div>
    </div> }
);

const formSchema = z.object({
  ...contactSchema.shape,
  ...projectDetailsSchema.shape,
});

export default function CustomProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      college: '',
      projectTitle: '',
      microcontroller: '',
      components: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        
        toast({
          title: "Authentication Required",
          description: "Please log in or sign up to submit a custom project request.",
          variant: "destructive",
        });
        
        router.push('/login');
      } else {
        const title = searchParams.get('title');
        const description = searchParams.get('description');
        const features = searchParams.get('features');

        // Get recommended microcontroller from our mapping
        const recommendedMicrocontroller = title ? projectMicrocontrollers[title] || '' : '';

        // Reset form with user data and URL params
        form.reset({
          name: user.displayName || '',
          email: user.email || '',
          mobile: (user as any).phoneNumber || (user as any).mobile || '',
          college: (user as any).college || (user as any).collegeName || '',
          projectTitle: title || '',
          description: description || '',
          components: features ? features.split('\\n').join(', ') : '',
          microcontroller: recommendedMicrocontroller || '',
        });
      }
    }
  }, [user, authLoading, router, toast, searchParams, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    setIsLoading(true);

    try {
      // First submit project request to Firebase
      const projectResponse = await createProjectRequest({
        userId: user?.uid || '',
        ...values
      });

      if (!projectResponse.success) {
        throw new Error('Failed to create project request');
      }

      // Track the event in Google Analytics
      window.gtag?.('event', 'project_request_submitted', {
        event_category: 'engagement',
        event_label: values.projectTitle,
      });

      // Then send email notification
      const formResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          _subject: `New Project Request: ${values.projectTitle}`,
          _autoresponse: `Hi ${values.name}, 

Thank you for submitting your project request to StudKits!

Project Details:
- Title: ${values.projectTitle}

We'll review your request and get back to you within 3 business days.

You can track your project status at: ${process.env.NEXT_PUBLIC_APP_URL}/tracking

Best regards,
StudKits Team`,
          _template: "table"
        })
      });

      if (!formResponse.ok) {
        throw new Error('Failed to send email notification');
      }

      toast({
        title: "Request Submitted Successfully",
        description: "We'll review your project request and get back to you soon!",
      });

      router.push('/tracking');

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section 
        className="text-center py-8 bg-card shadow border-2 border-[#4285F4] rounded-xl"
        aria-labelledby="page-heading"
      >
        <h1 id="page-heading" className="text-4xl font-bold text-primary mb-2">Request a Custom Project</h1>
        <p className="text-lg text-muted-foreground">
          Have a unique idea? Tell us about it, and we'll help bring it to life!
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg border-2 border-[#4285F4] rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" id="form-title">
            <Lightbulb className="mr-3 h-7 w-7 text-primary" aria-hidden="true" />
            Project Details
          </CardTitle>
          <CardDescription>
            Fill out the form below to request a custom project kit. We'll review your requirements and get back to you.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-6">
              <ContactSection form={form as any} />
              <ProjectDetailsSection form={form as any} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Request...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Submit Request</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}