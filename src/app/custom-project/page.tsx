
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Lightbulb, Settings, Package, Loader2 } from 'lucide-react';
import { submitProjectRequest } from '@/app/admin/actions';

interface CustomProjectFormState {
  name: string;
  email: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  budget: string;
}

export default function CustomProjectPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CustomProjectFormState>({
    name: '',
    email: '',
    projectTitle: '',
    microcontroller: '',
    components: '',
    description: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectTitle || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Project Title, Description).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // The server action now handles both saving to Firestore and sending the email
      const result = await submitProjectRequest({ type: 'project', ...formData });

      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: "Your custom project request has been sent. We'll review it and get back to you.",
        });
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          projectTitle: '',
          microcontroller: '',
          components: '',
          description: '',
          budget: '',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Submission Failed",
        description: `There was a problem sending your request: ${errorMessage}`,
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

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget (Optional)</Label>
              <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., ₹1500 - ₹2000" disabled={isLoading}/>
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
