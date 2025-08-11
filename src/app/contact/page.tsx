
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, User, MessageSquare, Send, Instagram, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { sendEmail } from '@/ai/flows/send-email-flow';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check network connectivity
    if (!navigator.onLine) {
      toast({
        title: "No Internet Connection",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    const emailSubject = `Contact Form: ${formData.subject}`;
    const emailBody = `
      <p>You have received a new message from the contact form on your website.</p>
      <hr>
      <p><b>Name:</b> ${formData.name}</p>
      <p><b>Email:</b> ${formData.email}</p>
      <p><b>Subject:</b> ${formData.subject}</p>
      <h3>Message:</h3>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
      <hr>
    `;

    try {
      const result = await sendEmail({ subject: emailSubject, body: emailBody });

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you shortly.",
        });
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </section>

      <div className="max-w-xl mx-auto">
        <Card className="shadow-lg">
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
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required disabled={isLoading}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    Your Email <span className="text-destructive">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required disabled={isLoading}/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your message about?" required disabled={isLoading}/>
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
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-md" disabled={isLoading}>
                {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Message</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Separator className="my-8" />

        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Or connect with us directly</h3>
          <div className="flex justify-center items-center gap-6">
            <Button variant="outline" asChild className="shadow-sm">
              <Link href="mailto:studkits25@gmail.com" target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Link>
            </Button>
            <Button variant="outline" asChild className="shadow-sm">
               <Link href="https://instagram.com/your_profile" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                Follow on Instagram
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
