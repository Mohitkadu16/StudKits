// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { auth, createUserWithEmailAndPassword, db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect } from 'react';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  mobile: z.string().min(10, { message: 'Mobile number must be at least 10 digits' })
    .regex(/^[0-9]+$/, { message: 'Must be a valid mobile number' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      mobile: '',
      password: '',
    },
  });

  useEffect(() => {
    // Check for stored signup data from login redirect
    const storedData = sessionStorage.getItem('signupData');
    if (storedData) {
      const data = JSON.parse(storedData);
      form.setValue('email', data.email);
      form.setValue('mobile', data.mobile);
      // Clear the stored data after using it
      sessionStorage.removeItem('signupData');
    }
  }, [form]);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: data.email,
        mobile: data.mobile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Update the user profile
      await updateProfile(user, {
        displayName: data.email.split('@')[0], // Set initial display name as email username
      });

      toast({
        title: 'Account Created',
        description: "Welcome! You have been successfully signed up.",
      });
      
      // Check if there's a redirect URL stored
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.push(redirectUrl);
      } else {
        router.push('/profile');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <a 
        href="#signup-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to sign up form
      </a>
      <Card className="mx-auto max-w-sm shadow-lg border-2 border-[#4285F4] rounded-xl" id="signup-form">
        <CardHeader>
          <CardTitle id="signup-title" className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-4"
              role="form"
              aria-labelledby="signup-title"
              noValidate
            >
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
                    <span id="email-description" className="sr-only">Enter your email address. This will be used for login and communication.</span>
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
                    <span id="mobile-description" className="sr-only">Enter your 10-digit mobile number for account verification and security.</span>
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password <span className="text-destructive" aria-hidden="true">*</span></FormLabel>
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
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                        </button>
                      </div>
                    </FormControl>
                    <span id="password-description" className="sr-only">Choose a secure password that is at least 6 characters long.</span>
                    <FormMessage role="alert" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label={isLoading ? "Creating your account..." : "Create your account"}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                Create an account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm" role="complementary">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="underline"
              aria-label="Log in to your existing account"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
