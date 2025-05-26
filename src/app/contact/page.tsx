
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const mailtoSubject = `Contact Form: ${formData.subject}`;
    const mailtoBody = `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}

      Message:
      ${formData.message}
    `;
    const mailtoLink = `mailto:provider@example.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoLink;

    toast({
      title: "Message Prepared",
      description: "Your message has been prepared. Please send the email via your mail client.",
    });
     // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </section>

      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Mail className="mr-3 h-7 w-7 text-primary" />
            Get in Touch
          </CardTitle>
          <CardDescription>
            Fill out the form below, and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  Your Email <span className="text-destructive">*</span>
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your message about?" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={6}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
