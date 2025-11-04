import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface ProjectDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  projectCategory: z.string(),
  projectSource: z.string(),
  components: z.string().min(10),
});

export function ProjectDetailsSection({ form }: ProjectDetailsSectionProps) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="project-details">
      <h3 id="project-details" className="text-lg font-semibold">Project Details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="projectCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Category <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-required="true" aria-describedby="category-description">
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
              <span id="category-description" className="sr-only">Select the category that best describes your project</span>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Source <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-required="true" aria-describedby="source-description">
                    <SelectValue placeholder="Where did you get the project?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="studkits">Purchased from StudKits</SelectItem>
                  <SelectItem value="self">Self-made Project</SelectItem>
                  <SelectItem value="other">Other Source</SelectItem>
                </SelectContent>
              </Select>
              <span id="source-description" className="sr-only">Indicate where you obtained or sourced your project from</span>
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
            <FormLabel>Components Used <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
            <FormControl>
              <Textarea 
                placeholder="List the main components used in your project (e.g., Arduino Uno, sensors, motors, etc.)" 
                {...field}
                aria-required="true"
                aria-describedby="components-description" 
              />
            </FormControl>
            <span id="components-description" className="sr-only">List all major components and hardware used in your project setup</span>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}