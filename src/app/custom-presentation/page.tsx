'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Presentation, FileText, Palette, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz"; // Using the same endpoint as contact form

interface CustomPresentationFormState {
  name: string;
  email: string;
  college?: string;
  topic: string;
  audience: string;
  purpose: string;
  style: string;
  instructions: string;
}

export default function CustomPresentationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        const currentPath = window.location.pathname;
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        
        toast({
          title: "Authentication Required",
          description: "Please log in or sign up to submit a presentation request.",
          variant: "destructive",
        });
        
        router.push('/login');
      } else {
        // Auto-fill user data when logged in (including college if available)
        setFormData(prev => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
          college: (user as any).college || (user as any).collegeName || prev.college,
        }));
      }
    }
  }, [user, authLoading, router, toast]);
  const [formData, setFormData] = useState<CustomPresentationFormState>({
    name: '',
    email: '',
    college: '',
    topic: '',
    audience: '',
    purpose: '',
    style: '',
    instructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.topic || !formData.instructions) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Topic, and Instructions).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          college: formData.college,
          topic: formData.topic,
          audience: formData.audience,
          purpose: formData.purpose,
          style: formData.style,
          instructions: formData.instructions,
          _subject: `Custom Presentation Request: ${formData.topic}`,
          _autoresponse: `Hi ${formData.name}, thank you for submitting your presentation request for "${formData.topic}"! We have received your request and will review it within 3 business days.`,
          _template: "table"
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to send presentation request');
      }

      toast({
        title: "Request Sent!",
        description: "Your presentation request has been sent. We will contact you shortly.",
      });

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        college: '',
        topic: '',
        audience: '',
        purpose: '',
        style: '',
        instructions: '',
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Request a Custom Presentation</h1>
        <p className="text-lg text-muted-foreground">
          Need a professional presentation? We can create one for any topic.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Presentation className="mr-3 h-7 w-7 text-primary" />
            Presentation Requirements
          </CardTitle>
          <CardDescription>
            Fill out the form below with your presentation details. The more information you provide, the better we can tailor it to your needs.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name <span className="text-destructive">*</span></Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College (auto-filled)</Label>
              <Input id="college" name="college" value={formData.college} onChange={handleChange} placeholder="Your college or institution" disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Presentation Topic / Subject <span className="text-destructive">*</span></Label>
              <Input id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="e.g., The Future of AI, Quantum Computing Basics" required disabled={isLoading} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="audience" className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        Target Audience
                    </Label>
                    <Input id="audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g., University Students, Business Investors" disabled={isLoading} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="purpose" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        Purpose / Goal
                    </Label>
                    <Input id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="e.g., To inform, to persuade, for a grade" disabled={isLoading} />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="flex items-center">
                <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
                Preferred Style / Theme
              </Label>
              <Input id="style" name="style" value={formData.style} onChange={handleChange} placeholder="e.g., Minimalist, professional, colorful, corporate" disabled={isLoading} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Key Instructions & Content <span className="text-destructive">*</span></Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Describe what the presentation should include. For example:&#10;- Number of slides (e.g., 10-15 slides)&#10;- Key points to cover for each section&#10;- Any specific data, charts, or images to include&#10;- Tone and style (e.g., formal, informal)&#10;- Mention any attached documents you will send."
                rows={8}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md" disabled={isLoading}>
               {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                    <><Send className="mr-2 h-4 w-4" /> Submit Presentation Request</>
                )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}