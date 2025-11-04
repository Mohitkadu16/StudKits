import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface ProblemDescriptionSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  problemDescription: z.string().min(20),
  errorMessages: z.string().optional(),
  expectedBehavior: z.string().min(10),
  troubleshootingSteps: z.string().optional(),
});

export function ProblemDescriptionSection({ form }: ProblemDescriptionSectionProps) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="problem-details">
      <h3 id="problem-details" className="text-lg font-semibold">Problem Description</h3>
      <FormField
        control={form.control}
        name="problemDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What's not working? <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the problem you're experiencing in detail" 
                className="h-24"
                {...field}
                aria-required="true"
                aria-describedby="problem-description" 
              />
            </FormControl>
            <span id="problem-description" className="sr-only">Provide a detailed description of the problem you're experiencing with your project</span>
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
                aria-describedby="error-description" 
              />
            </FormControl>
            <span id="error-description" className="sr-only">If you're seeing any error messages, paste them here to help us diagnose the issue</span>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expectedBehavior"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Behavior <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What do you expect the project to do when working correctly?" 
                {...field}
                aria-required="true"
                aria-describedby="expected-behavior-description" 
              />
            </FormControl>
            <span id="expected-behavior-description" className="sr-only">Describe how your project should function when working correctly</span>
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
                aria-describedby="troubleshooting-description" 
              />
            </FormControl>
            <span id="troubleshooting-description" className="sr-only">List any steps or solutions you've already attempted to resolve the issue</span>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}