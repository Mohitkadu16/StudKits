
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, Presentation, FileText, Palette, Users } from 'lucide-react';

interface CustomPresentationFormState {
  name: string;
  email: string;
  topic: string;
  audience: string;
  purpose: string;
  style: string;
  instructions: string;
}

export default function CustomPresentationPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomPresentationFormState>({
    name: '',
    email: '',
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.topic || !formData.instructions) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Topic, and Instructions).",
        variant: "destructive",
      });
      return;
    }

    const mailtoSubject = `Custom Presentation Request: ${formData.topic}`;
    const mailtoBody = `
      Name: ${formData.name}
      Email: ${formData.email}
      
      Presentation Details:
      ---------------------
      Topic/Subject: ${formData.topic}
      Target Audience: ${formData.audience || 'Not specified'}
      Purpose/Goal of Presentation: ${formData.purpose || 'Not specified'}
      Preferred Style/Theme: ${formData.style || 'Not specified'}

      Key Instructions & Content:
      (Please also attach any relevant documents in your email)
      ${formData.instructions}
    `;
    const mailtoLink = `mailto:provider@example.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoLink;

    toast({
      title: "Request Prepared",
      description: "Your presentation request has been prepared. Please send the email via your mail client.",
    });
     // Reset form after submission
    setFormData({
      name: '',
      email: '',
      topic: '',
      audience: '',
      purpose: '',
      style: '',
      instructions: '',
    });
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
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Presentation Topic / Subject <span className="text-destructive">*</span></Label>
              <Input id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="e.g., The Future of AI, Quantum Computing Basics" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="audience" className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        Target Audience
                    </Label>
                    <Input id="audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g., University Students, Business Investors" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="purpose" className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        Purpose / Goal
                    </Label>
                    <Input id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="e.g., To inform, to persuade, for a grade" />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style" className="flex items-center">
                <Palette className="mr-2 h-4 w-4 text-muted-foreground" />
                Preferred Style / Theme
              </Label>
              <Input id="style" name="style" value={formData.style} onChange={handleChange} placeholder="e.g., Minimalist, professional, colorful, corporate" />
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
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md">
              <Send className="mr-2 h-4 w-4" />
              Prepare Presentation Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
