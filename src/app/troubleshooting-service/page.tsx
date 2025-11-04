'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import * as z from "zod";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { createTroubleshootingRequest } from '@/lib/troubleshooting-store';

const ContactInfoSection = dynamic(
  () => import('@/components/troubleshooting/contact-info-section').then(mod => mod.ContactInfoSection),
  { loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/> }
);

const ProjectDetailsSection = dynamic(
  () => import('@/components/troubleshooting/project-details-section').then(mod => mod.ProjectDetailsSection),
  { loading: () => <div className="animate-pulse h-48 bg-muted rounded-lg"/> }
);

const ProblemDescriptionSection = dynamic(
  () => import('@/components/troubleshooting/problem-description-section').then(mod => mod.ProblemDescriptionSection),
  { loading: () => <div className="animate-pulse h-64 bg-muted rounded-lg"/> }
);

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz";

// Define section schemas
const contactInfoSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  institution: z.string().min(2, {
    message: "School/College name must be at least 2 characters.",
  }),
});

const projectDetailsSchema = z.object({
  projectCategory: z.string({
    required_error: "Please select a project category.",
  }),
  projectSource: z.string({
    required_error: "Please select where you got the project from.",
  }),
  components: z.string().min(10, {
    message: "Please list the main components used in your project.",
  }),
});

const problemDescriptionSchema = z.object({
  problemDescription: z.string().min(20, {
    message: "Please provide a detailed description of the problem.",
  }),
  errorMessages: z.string().optional(),
  expectedBehavior: z.string().min(10, {
    message: "Please describe what you expect the project to do.",
  }),
  troubleshootingSteps: z.string().optional(),
});

const formSchema = z.object({
  ...contactInfoSchema.shape,
  ...projectDetailsSchema.shape,
  ...problemDescriptionSchema.shape,
});

export default function TroubleshootingServicePage() {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      institution: "",
      projectCategory: "",
      projectSource: "",
      components: "",
      problemDescription: "",
      errorMessages: "",
      expectedBehavior: "",
      troubleshootingSteps: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
        name: user.displayName || "",
        email: user.email || "",
        mobile: (user as any).phoneNumber || (user as any).mobile || "",
        institution:  (user as any).college || (user as any).collegeName || "",
      });
    }
  }, [user, form]);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // First submit request to Firebase
      const troubleshootingResponse = await createTroubleshootingRequest({
        userId: user?.uid || '',
        ...values,
      });

      if (!troubleshootingResponse.success) {
        throw new Error('Failed to create troubleshooting request');
      }

      // Track the event in Google Analytics
      window.gtag?.('event', 'troubleshooting_request_submitted', {
        event_category: values.projectCategory,
        event_label: values.projectSource,
      });

      // Then send email notification via Formspree
      const formResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          _subject: `New Troubleshooting Request from ${values.name}`,
          _autoresponse: `Hi ${values.name}, 

Thank you for submitting your troubleshooting request to StudKits!

Request Details:
- Category: ${values.projectCategory}
- Reference ID: ${troubleshootingResponse.id}

We'll review your request and get back to you within 24 hours.

Best regards,
StudKits Support Team`,
          _template: "table"
        })
      });

      if (!formResponse.ok) {
        throw new Error('Failed to send email notification');
      }

      form.reset();
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll review your troubleshooting request and get back to you soon.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card className="border-2 border-[#4285F4] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold" id="form-title">Troubleshooting Service Request</CardTitle>
          <CardDescription>
            Need help with your project? Fill out this form with details about the problem you're experiencing,
            and our team will assist you in resolving the issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6"
              aria-labelledby="form-title"
              role="form"
            >
              <ContactInfoSection form={form as any as UseFormReturn<z.infer<typeof contactInfoSchema>>} />
              <ProjectDetailsSection form={form as any as UseFormReturn<z.infer<typeof projectDetailsSchema>>} />
              <ProblemDescriptionSection form={form as any as UseFormReturn<z.infer<typeof problemDescriptionSchema>>} />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                aria-label={isLoading ? "Submitting troubleshooting request..." : "Submit troubleshooting request"}
                aria-busy={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
