import { ErrorBoundary } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

function ErrorFallback({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void 
}) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        <p>Error submitting your project request. Please try again.</p>
        <p className="text-sm text-muted">{error.message}</p>
        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          size="sm"
        >
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export function FormErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset form state if needed
      }}
    >
      {children}
    </ErrorBoundary>
  );
}