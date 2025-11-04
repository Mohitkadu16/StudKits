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
import { projects, type Project } from '@/lib/projects';
import { projectMicrocontrollers } from '@/lib/project-microcontrollers';
import { createProjectRequest } from '@/lib/project-store';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz";

interface CustomProjectFormState {
  name: string;
  email: string;
  mobile: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string; // Added for project's suggested price
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
    mobile: '',
    projectTitle: '',
    microcontroller: '',
    components: '',
    description: '',
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
        
        // Get recommended microcontroller from our mapping
        const recommendedMicrocontroller = title ? projectMicrocontrollers[title] || '' : '';

        setFormData(prev => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
          mobile: (user as any).phoneNumber || (user as any).mobile || prev.mobile,
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
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.projectTitle || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First submit project request to Firebase
      const projectResponse = await createProjectRequest({
        userId: user?.uid || '',
        name: formData.name,
        email: formData.email,
        projectTitle: formData.projectTitle,
        microcontroller: formData.microcontroller,
        components: formData.components,
        description: formData.description,
        college: formData.college
      });

      if (!projectResponse.success) {
        throw new Error('Failed to create project request');
      }

      // Track the event in Google Analytics
      window.gtag?.('event', 'project_request_submitted', {
        event_category: 'engagement',
        event_label: formData.projectTitle,
      });

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
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number <span className="text-destructive">*</span></Label>
                <Input 
                  id="mobile" 
                  name="mobile" 
                  type="tel" 
                  pattern="[0-9]{10}"
                  value={formData.mobile} 
                  onChange={handleChange} 
                  placeholder="Enter 10-digit mobile number" 
                  required 
                  disabled={isLoading}
                />
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
              <Label htmlFor="microcontroller" className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  Recommended Microcontroller
                </div>
                {formData.microcontroller && (
                  <span className="text-xs text-muted-foreground">(Auto-filled based on project)</span>
                )}
              </Label>
              <Input 
                id="microcontroller" 
                name="microcontroller" 
                value={formData.microcontroller} 
                onChange={handleChange} 
                placeholder="Microcontroller will be auto-filled based on project" 
                className={formData.microcontroller ? "bg-muted" : ""}
                readOnly
                disabled={isLoading}
              />
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