'use client';

import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

export interface FormResult {
  success: boolean;
  message: string;
}

interface UseFormSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  loadingMessage?: string;
}

export function useFormSubmit<T>(
  submitFn: (data: T) => Promise<{ success: boolean; message: string }>,
  options: UseFormSubmitOptions = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, dismiss } = useToast();
  const {
    onSuccess,
    onError,
    successMessage = 'Success!',
    loadingMessage = 'Please wait...',
  } = options;

  const submit = useCallback(
    async (data: T) => {
      if (isSubmitting) return;

      let toastId: string | undefined;
      try {
        setIsSubmitting(true);
        
        // Show loading toast
        toastId = String(toast({
          title: 'Submitting...',
          description: loadingMessage,
          duration: 10000, // 10 seconds
        }).id);

        const result = await submitFn(data);

        if (result.success) {
          // Remove loading toast
          dismiss(toastId);
          
          // Show success toast
          toast({
            title: 'Success',
            description: successMessage || result.message,
            duration: 3000,
          });

          onSuccess?.();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        // Remove loading toast
        dismiss(toastId);

        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });

        onError?.(error instanceof Error ? error : new Error(errorMessage));
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitFn, isSubmitting, toast, successMessage, loadingMessage, onSuccess, onError]
  );

  return {
    submit,
    isSubmitting,
  };
}
