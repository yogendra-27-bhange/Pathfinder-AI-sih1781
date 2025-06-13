
"use client";

import { useState } from 'react';
import ProfileForm from '@/components/student/ProfileForm';
import AnalysisResults from '@/components/student/AnalysisResults';
import type { AnalyzeStudentProfileOutput } from '@/ai/flows/analyze-student-profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, HelpCircle } from 'lucide-react';

export default function StudentDashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeStudentProfileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-primary font-headline">Student Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your profile, analyze your skills, and discover career paths.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your Profile</CardTitle>
              <CardDescription>Complete your details for an accurate AI analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm
                onAnalysisStart={() => { setIsLoading(true); setError(null); setAnalysisResult(null); }}
                onAnalysisSuccess={(data) => { setAnalysisResult(data); setIsLoading(false); }}
                onAnalysisError={(errMessage) => { setError(errMessage); setIsLoading(false); }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          {isLoading && (
            <Card className="shadow-lg flex flex-col items-center justify-center min-h-[300px]">
              <CardContent className="text-center p-8">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-xl font-semibold text-foreground">Analyzing your profile...</p>
                <p className="text-muted-foreground">This may take a few moments. Please wait.</p>
              </CardContent>
            </Card>
          )}
          {error && (
            <Card className="shadow-lg border-destructive bg-destructive/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-destructive">Analysis Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive-foreground">{error}</p>
                <p className="text-sm text-destructive-foreground/80 mt-2">Please check your input or try again later.</p>
              </CardContent>
            </Card>
          )}
          {analysisResult && !isLoading && !error && (
            <AnalysisResults result={analysisResult} />
          )}
          {!analysisResult && !isLoading && !error && (
             <Card className="shadow-lg flex flex-col items-center justify-center min-h-[300px] bg-secondary/20">
               <CardContent className="text-center p-8">
                 <HelpCircle className="h-16 w-16 text-primary mb-4" />
                 <h3 className="text-xl font-semibold text-foreground font-headline">Career Analysis Awaits</h3>
                 <p className="text-muted-foreground mt-2 max-w-md">
                   Complete your profile on the left and click &quot;Analyze Profile&quot; to get personalized career suggestions and skill development recommendations from our AI.
                 </p>
               </CardContent>
             </Card>
           )}
        </div>
      </div>
    </div>
  );
}
