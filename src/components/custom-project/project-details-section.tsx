import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Package } from 'lucide-react';
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface ProjectDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof projectDetailsSchema>>;
}

export const projectDetailsSchema = z.object({
  projectTitle: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  microcontroller: z.string(),
  components: z.string(),
  description: z.string().min(20, {
    message: "Please provide a detailed description of your project.",
  }),
});

export function ProjectDetailsSection({ form }: ProjectDetailsSectionProps) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="project-details">
      <h3 id="project-details" className="text-lg font-semibold">Project Information</h3>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title / Idea <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Automated Pet Feeder" 
                  {...field}
                  aria-required="true"
                  aria-describedby="title-description"
                />
              </FormControl>
              <span id="title-description" className="sr-only">Enter a descriptive title for your project</span>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="microcontroller"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  Recommended Microcontroller
                </div>
                {field.value && (
                  <span className="text-xs text-muted-foreground">(Auto-filled based on project)</span>
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  readOnly
                  className={field.value ? "bg-muted" : ""}
                  placeholder="Microcontroller will be auto-filled based on project"
                  aria-describedby="microcontroller-description"
                />
              </FormControl>
              <span id="microcontroller-description" className="sr-only">The recommended microcontroller for your project</span>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="components"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Key Components List (if known)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="List any specific components you have in mind (e.g., Servo motor SG90, DHT11 sensor, 16x2 LCD)"
                  rows={3}
                  aria-describedby="components-description"
                />
              </FormControl>
              <span id="components-description" className="sr-only">List any specific components you want to use in your project</span>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Project Description <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your project, its features, and how it should work."
                  rows={5}
                  aria-required="true"
                  aria-describedby="description-description"
                />
              </FormControl>
              <span id="description-description" className="sr-only">Provide a detailed description of your project including features and functionality</span>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}