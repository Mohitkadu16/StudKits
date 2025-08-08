
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Lightbulb, Settings, Package, Presentation } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomProjectFormState {
  name: string;
  email: string;
  projectTitle: string;
  microcontroller: string;
  components: string;
  description: string;
  budget: string;
  includePresentation: boolean;
}

export default function CustomProjectPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomProjectFormState>({
    name: '',
    email: '',
    projectTitle: '',
    microcontroller: '',
    components: '',
    description: '',
    budget: '',
    includePresentation: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, includePresentation: checked }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectTitle || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Project Title, Description).",
        variant: "destructive",
      });
      return;
    }

    const mailtoSubject = `Custom Project Request: ${formData.projectTitle}`;
    const mailtoBody = `
      Name: ${formData.name}
      Email: ${formData.email}
      Project Title/Idea: ${formData.projectTitle}
      Preferred Microcontroller: ${formData.microcontroller || 'Not specified'}
      Key Components: ${formData.components || 'Not specified'}
      Project Description: ${formData.description}
      Estimated Budget: ${formData.budget || 'Not specified'}
      Include Presentation: ${formData.includePresentation ? 'Yes' : 'No'}
    `;
    const mailtoLink = `mailto:provider@example.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoLink;

    toast({
      title: "Request Submitted",
      description: "Your custom project request has been prepared. Please send the email via your mail client.",
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
      includePresentation: false,
    });
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
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title / Idea <span className="text-destructive">*</span></Label>
              <Input id="projectTitle" name="projectTitle" value={formData.projectTitle} onChange={handleChange} placeholder="e.g., Automated Pet Feeder" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="microcontroller" className="flex items-center">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                Preferred Microcontroller (e.g., Arduino, ESP32)
              </Label>
              <Input id="microcontroller" name="microcontroller" value={formData.microcontroller} onChange={handleChange} placeholder="e.g., ESP32-WROOM-32" />
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
              />
            </div>
            
            <div className="items-top flex space-x-2">
                <Checkbox id="includePresentation" checked={formData.includePresentation} onCheckedChange={handleCheckboxChange} />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="includePresentation" className="flex items-center font-medium">
                        <Presentation className="mr-2 h-4 w-4 text-muted-foreground" />
                        Request a Project Presentation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Check this box if you would also like a custom presentation (PPT) for your project.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget (Optional)</Label>
              <Input id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., ₹1500 - ₹2000" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md">
              <Send className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
