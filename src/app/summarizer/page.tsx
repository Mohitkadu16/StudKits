'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeProjectDescription, SummarizeProjectDescriptionOutput } from '@/ai/flows/summarize-project-description';
import { Wand2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function SummarizerPage() {
  const [projectDescriptionInput, setProjectDescriptionInput] = useState('');
  const [summary, setSummary] = useState<SummarizeProjectDescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!projectDescriptionInput.trim()) {
      setError("Please enter a project description.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result = await summarizeProjectDescription({ projectDescription: projectDescriptionInput });
      setSummary(result);
    } catch (e) {
      console.error("Error summarizing project description:", e);
      setError("Failed to summarize the project description. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-primary mb-2">AI Project Summarizer</h1>
        <p className="text-lg text-muted-foreground">
          Get key features and benefits from long project descriptions instantly.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Enter Project Description</CardTitle>
          <CardDescription>Paste the full project description below to generate a concise summary.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your project description here..."
            value={projectDescriptionInput}
            onChange={(e) => setProjectDescriptionInput(e.target.value)}
            rows={10}
            className="shadow-sm"
            disabled={isLoading}
          />
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 shadow-md">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {summary && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">{summary.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
