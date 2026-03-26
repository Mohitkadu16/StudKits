'use client';

import { useState } from 'react';
import { sendEmailVerification, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, RefreshCw, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function VerifyEmailBlocker({ user }: { user: User }) {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      if (!auth.currentUser) throw new Error("No active user session.");
      
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: auth.currentUser.email })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to send custom verification email.");
      }
      toast({
        title: 'Email Sent',
        description: 'A new verification link has been sent to your inbox. Please be patient as it may take a minute to arrive.',
      });
    } catch (error: any) {
      console.error('Failed to resend:', error);
      let message = error.message || 'Failed to resend email. Please try again later.';
      if (error.code === 'auth/too-many-requests') {
        message = 'We have actually already sent an email recently, or you have hit the retry limit. Please wait a few minutes before trying again.';
      }
      toast({
        title: 'Could not send',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Small pause to allow UI feedback before the AuthProvider dismounts this component
      setTimeout(async () => {
          await signOut(auth);
      }, 0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-[#4285F4] shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
            <Mail className="w-10 h-10" />
            <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Inbox</CardTitle>
          <CardDescription className="text-base">
            We need to verify your email address to secure your account. A verification link has been dispatched to:
            <br/><br/>
            <strong className="text-foreground text-lg">{user.email}</strong>
            <br/><br/>
            Please click the link in that email to lift this restriction. Look in your Spam folder if you don't see it!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full text-base py-6" 
            onClick={handleResend} 
            disabled={isSending}
          >
            {isSending ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />}
            {isSending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-base py-6" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign out / Try a different account
          </Button>
          <div className="pt-4 text-center">
             <p className="text-sm text-muted-foreground">
               Already clicked the link?
             </p>
             <Button variant="link" onClick={() => window.location.reload()}>
               Reload the page
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
