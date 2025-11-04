import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { type UseFormReturn } from "react-hook-form";
import { type LoginFormValues } from "@/lib/schemas/login-form";

interface LoginFormFieldsProps {
  form: UseFormReturn<LoginFormValues>;
  isLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export function LoginFormFields({ 
  form, 
  isLoading, 
  showPassword, 
  onTogglePassword 
}: LoginFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="m@example.com" 
                {...field} 
                disabled={isLoading}
                aria-required="true"
                aria-describedby="email-description"
                aria-invalid={form.formState.errors.email ? "true" : undefined}
              />
            </FormControl>
            <span id="email-description" className="sr-only">Enter your registered email address</span>
            <FormMessage role="alert" />
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
                placeholder="Enter your mobile number" 
                {...field} 
                disabled={isLoading}
                maxLength={10}
                aria-required="true"
                aria-describedby="mobile-description"
                aria-invalid={form.formState.errors.mobile ? "true" : undefined}
              />
            </FormControl>
            <span id="mobile-description" className="sr-only">Enter your registered 10-digit mobile number</span>
            <FormMessage role="alert" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center">
              <FormLabel>Password <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
              <Link 
                href="#" 
                className="ml-auto inline-block text-sm underline"
                aria-label="Reset your password"
              >
                Forgot your password?
              </Link>
            </div>
            <FormControl>
              <div className="relative w-full">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  disabled={isLoading}
                  className="pr-10"
                  aria-required="true"
                  aria-describedby="password-description"
                  aria-invalid={form.formState.errors.password ? "true" : undefined}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={onTogglePassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </FormControl>
            <span id="password-description" className="sr-only">Enter your account password</span>
            <FormMessage role="alert" />
          </FormItem>
        )}
      />
    </>
  );
}