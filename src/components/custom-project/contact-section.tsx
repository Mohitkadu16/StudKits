import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

interface ContactSectionProps {
  form: UseFormReturn<z.infer<typeof contactSchema>>;
}

export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: "Name can only contain letters, spaces, and basic punctuation." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must not exceed 100 characters." })
    .toLowerCase(),
  mobile: z.string()
    .regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit mobile number." })
    .transform(val => val.replace(/\D/g, '')), // Remove non-digits
  college: z.string()
    .min(2, { message: "College name must be at least 2 characters." })
    .max(100, { message: "College name must not exceed 100 characters." })
    .optional()
    .or(z.literal('')),
});

export function ContactSection({ form }: ContactSectionProps) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="contact-info">
      <h3 id="contact-info" className="text-lg font-semibold">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your full name" 
                  {...field}
                  aria-required="true"
                  aria-describedby="name-description"
                />
              </FormControl>
              <span id="name-description" className="sr-only">Enter your full name as you would like to be addressed</span>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="Enter your email address" 
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
              <span id="mobile-description" className="sr-only">Enter your 10-digit mobile number for communications</span>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your college or institution" 
                  {...field}
                  aria-describedby="college-description"
                />
              </FormControl>
              <span id="college-description" className="sr-only">Enter your college or institution name</span>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}