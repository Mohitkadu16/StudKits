import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface ContactInfoSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().regex(/^[0-9]{10}$/),
  institution: z.string().min(2),
});

export function ContactInfoSection({ form }: ContactInfoSectionProps) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="contact-info">
      <h3 id="contact-info" className="text-lg font-semibold">Contact Information</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  {...field} 
                  aria-required="true"
                  aria-describedby="name-description"
                />
              </FormControl>
              <span id="name-description" className="sr-only">Enter your full name as you'd like to be addressed</span>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  {...field} 
                  aria-required="true"
                  aria-describedby="email-description"
                />
              </FormControl>
              <span id="email-description" className="sr-only">Enter your email address where we can contact you</span>
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
              <FormLabel>Mobile Number <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="Enter 10-digit mobile number" 
                  pattern="[0-9]{10}" 
                  {...field}
                  aria-required="true"
                  aria-describedby="mobile-description"
                />
              </FormControl>
              <span id="mobile-description" className="sr-only">Enter your 10-digit mobile number for urgent communications</span>
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
              <Input 
                placeholder="Enter your school or college name" 
                {...field}
                aria-describedby="institution-description"
              />
            </FormControl>
            <span id="institution-description" className="sr-only">Enter the name of your educational institution</span>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}