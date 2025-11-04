'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth, db, signInWithEmailAndPassword, signOut, getUserProfile } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '@/lib/schemas/login-form';

const LoginFormFields = dynamic(
  () => import('@/components/auth/login-form-fields').then(mod => mod.LoginFormFields),
  { loading: () => <div className="animate-pulse space-y-4"><div className="h-10 bg-muted rounded" /><div className="h-10 bg-muted rounded" /><div className="h-10 bg-muted rounded" /></div> }
);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      mobile: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // Check if user exists in our database
      const userProfile = await getUserProfile(userCredential.user.uid);
      
      if (!userProfile) {
        await signOut(auth); // Sign out the user from Firebase
        throw new Error('user-not-registered');
      }
      
      // Log full user profile for debugging
      console.log('Full User Profile:', JSON.stringify(userProfile, null, 2));
      
      // Handle possible variations in mobile number storage
      const inputMobile = data.mobile.replace(/\D/g, '');
      const storedMobile = userProfile.mobile || userProfile.mobileNumber || userProfile.phone || userProfile.phoneNumber;
      const formattedStoredMobile = storedMobile ? storedMobile.replace(/\D/g, '') : '';
      
      console.log('Debug - Input mobile:', inputMobile);
      console.log('Debug - Raw stored mobile:', storedMobile);
      console.log('Debug - Formatted stored mobile:', formattedStoredMobile);

      // If no mobile number is stored at all, we should update it
      if (!storedMobile) {
        // Update the user profile with the new mobile number
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            ...userProfile,
            mobile: inputMobile
          }, { merge: true });
          console.log('Updated user profile with new mobile number');
        } catch (updateError) {
          console.error('Failed to update mobile number:', updateError);
        }
      } 
      // Verify mobile number matches from our database
      else if (formattedStoredMobile !== inputMobile) {
        console.log('Mobile number mismatch:', {
          input: inputMobile,
          stored: formattedStoredMobile
        });
        await signOut(auth);
        throw new Error('invalid-mobile');
      }

      toast({
        title: 'Login Successful',
        description: "Welcome back!",
      });
      
      // Check if there's a redirect URL stored
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin'); // Clear the stored URL
        router.push(redirectUrl);
      } else {
        router.push('/profile');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      let redirectToSignup = false;
      
      if (error.message === 'user-not-registered') {
        errorMessage = 'This email is not registered. Redirecting you to sign up...';
        redirectToSignup = true;
      } else if (error.message === 'invalid-mobile') {
        errorMessage = 'Incorrect mobile number. Please try again.';
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Redirecting you to sign up...';
        redirectToSignup = true;
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: redirectToSignup ? 'default' : 'destructive',
      });

      if (redirectToSignup) {
        // Store the user's data in sessionStorage for auto-fill in signup
        sessionStorage.setItem('signupData', JSON.stringify({
          email: data.email,
          mobile: data.mobile
        }));
        // Redirect to signup page after a short delay
        setTimeout(() => {
          router.push('/signup');
        }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <Card className="w-full max-w-sm mx-auto shadow-lg my-4 border-2 border-[#4285F4] rounded-xl">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <CardTitle id="login-title" className="text-xl sm:text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-4"
              role="form"
              aria-labelledby="login-title"
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: any }) => (
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
                render={({ field }: { field: any }) => (
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
                render={({ field }: { field: any }) => (
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
                          onClick={() => setShowPassword((s) => !s)}
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
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                aria-label={isLoading ? "Logging in..." : "Log in to your account"}
                aria-busy={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm" role="complementary">
            Don&apos;t have an account?{' '}
            <Link 
              href="/signup" 
              className="underline"
              aria-label="Create a new account"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
