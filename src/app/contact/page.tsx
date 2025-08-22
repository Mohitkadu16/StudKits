'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, User, MessageSquare, Send, Instagram, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { sendFormEmail } from '@/lib/emailjs';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  college?: string;
}

export default function ContactUsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    college: ''
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Store the current URL to redirect back after login
        const currentPath = window.location.pathname;
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        
        toast({
          title: "Authentication Required",
          description: "Please log in or sign up to send us a message.",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      <p><b>College:</b> ${formData.college || 'N/A'}</p>
      <p><b>Subject:</b> ${formData.subject}</p>
      <h3>Message:</h3>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
      <hr>
    `;

    try {
      const result = await sendFormEmail({
        name: formData.name,
        email: formData.email,
        subject: emailSubject,
        message: formData.message,
        requestType: 'project',
        college: formData.college
      });

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
          college: ''
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
    <div className="space-y-8 px-4 sm:px-6">
      <section className="text-center py-6 sm:py-8 bg-card rounded-lg shadow mx-auto max-w-[95%] sm:max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-base sm:text-lg text-muted-foreground px-2">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </section>

      <div className="w-full max-w-xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-xl sm:text-2xl flex-wrap gap-2">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              Get in Touch
            </CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base">
              Fill out the form below, and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center text-sm sm:text-base">
                    <User className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your full name" 
                    className="min-h-[40px]"
                    required 
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm sm:text-base">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                    Your Email <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email address" 
                    className="min-h-[40px]"
                    required 
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="college" className="flex items-center text-sm sm:text-base">
                  <User className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                  College (auto-filled)
                </Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Your college or institution"
                  className="min-h-[40px]"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center text-sm sm:text-base">
                  <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="What is your message about?" 
                  className="min-h-[40px]"
                  required 
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm sm:text-base">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="min-h-[120px] resize-y"
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

        <div className="text-center space-y-4 px-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Or connect with us directly</h3>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-6">
            <Button variant="outline" asChild className="shadow-sm h-auto py-2">
              <Link href="mailto:studkits25@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Email Us</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="shadow-sm h-auto py-2">
               <Link href="https://www.instagram.com/studkits.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Follow on Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
