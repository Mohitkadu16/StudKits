'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { createTroubleshootingRequest } from '@/lib/troubleshooting-store';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvlyklz";

const formSchema = z.object({
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
  projectCategory: z.string({
    required_error: "Please select a project category.",
  }),
  projectSource: z.string({
    required_error: "Please select where you got the project from.",
  }),
  components: z.string().min(10, {
    message: "Please list the main components used in your project.",
  }),
  problemDescription: z.string().min(20, {
    message: "Please provide a detailed description of the problem.",
  }),
  errorMessages: z.string().optional(),
  expectedBehavior: z.string().min(10, {
    message: "Please describe what you expect the project to do.",
  }),
  troubleshootingSteps: z.string().optional(),
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
          <CardTitle className="text-2xl font-bold">Troubleshooting Service Request</CardTitle>
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
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter 10-digit mobile number" pattern="[0-9]{10}" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your school or college name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="projectCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="iot">IoT Project</SelectItem>
                            <SelectItem value="robotics">Robotics Project</SelectItem>
                            <SelectItem value="embedded">Embedded Systems</SelectItem>
                            <SelectItem value="automation">Home Automation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Where did you get the project?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="studkits">Purchased from StudKits</SelectItem>
                            <SelectItem value="self">Self-made Project</SelectItem>
                            <SelectItem value="other">Other Source</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="components"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Components Used</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the main components used in your project (e.g., Arduino Uno, sensors, motors, etc.)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Problem Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Problem Description</h3>
                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's not working?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the problem you're experiencing in detail" 
                          className="h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="errorMessages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Error Messages (if any)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Copy and paste any error messages you're seeing" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expectedBehavior"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Behavior</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What do you expect the project to do when working correctly?" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="troubleshootingSteps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Troubleshooting Steps Tried</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What have you already tried to fix the problem? (optional)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
