'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Lightbulb, Settings, Package, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { projectMicrocontrollers } from '@/lib/project-microcontrollers';
import { projects, type Project } from '@/lib/projects';

export async function submitProjectRequest(data: any) {
  try {
    // Implementation of your project request submission
    return { success: true, message: 'Project request submitted successfully' };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to submit request' };
  }
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz";

interface CustomProjectFormState {
  name: string;
  email: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  suggestedPrice?: string; // Added for project's suggested price
  college?: string;
}

export default function CustomProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CustomProjectFormState>({
    name: '',
    email: '',
    projectTitle: '',
    microcontroller: '',
    components: '',
    description: '',
    suggestedPrice: '',
    college: ''
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
        // Combine all form data updates in a single setFormData call
        const title = searchParams.get('title');
        const description = searchParams.get('description');
        const features = searchParams.get('features');

        // Find the selected project
        const selectedProject = title ? projects.find(p => p.title === title) : null;
        
        // Get recommended microcontroller and price
        const recommendedMicrocontroller = selectedProject?.microcontroller || '';

        setFormData(prev => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
          projectTitle: title || prev.projectTitle,
          description: description || prev.description,
          components: features ? features.split('\\n').join(', ') : prev.components,
          microcontroller: recommendedMicrocontroller || prev.microcontroller,
          college: (user as any).college || (user as any).collegeName || prev.college,
        }));
      }
    }
  }, [user, authLoading, router, toast, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectTitle || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First submit project request
      const projectResponse = await submitProjectRequest({
        name: formData.name,
        email: formData.email,
        type: 'project',
        projectTitle: formData.projectTitle,
        microcontroller: formData.microcontroller,
        components: formData.components,
        description: formData.description,
        budget: formData.suggestedPrice
      });

      if (!projectResponse.success) {
        throw new Error(projectResponse.message);
      }

      // Then send email notification
      const formResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Project Request: ${formData.projectTitle}`,
          _autoresponse: `Hi ${formData.name}, 

Thank you for submitting your project request to StudKits!

Project Details:
- Title: ${formData.projectTitle}

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
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Request a Custom Project</h1>
        <p className="text-lg text-muted-foreground">
          Have a unique idea? Tell us about it, and we'll help bring it to life!
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Lightbulb className="mr-3 h-7 w-7 text-primary" />
            Project Details
          </CardTitle>
          <CardDescription>
            Fill out the form below to request a custom project kit. We'll review your requirements and get back to you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name <span className="text-destructive">*</span></Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required disabled={isLoading}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required disabled={isLoading}/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College (auto-filled)</Label>
              <Input id="college" name="college" value={formData.college} onChange={handleChange} placeholder="Your college or institution" disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title / Idea <span className="text-destructive">*</span></Label>
              <Input id="projectTitle" name="projectTitle" value={formData.projectTitle} onChange={handleChange} placeholder="e.g., Automated Pet Feeder" required disabled={isLoading}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="microcontroller" className="flex items-center">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                Preferred Microcontroller (e.g., Arduino, ESP32)
              </Label>
              <Input id="microcontroller" name="microcontroller" value={formData.microcontroller} onChange={handleChange} placeholder="e.g., ESP32-WROOM-32" disabled={isLoading}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="components" className="flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                Key Components List (if known)
              </Label>
              <Textarea
                id="components"
                name="components"
                value={formData.components}
                onChange={handleChange}
                placeholder="List any specific components you have in mind (e.g., Servo motor SG90, DHT11 sensor, 16x2 LCD)"
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Project Description <span className="text-destructive">*</span></Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, its features, and how it should work."
                rows={5}
                required
                disabled={isLoading}
              />
            </div>

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
      </Card>
    </div>
  );
}


