import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface PageErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function PageError({ error, resetErrorBoundary }: PageErrorProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription className="mt-2 space-y-4">
        <p>{error.message}</p>
        <Button onClick={resetErrorBoundary} variant="outline">
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  );
}