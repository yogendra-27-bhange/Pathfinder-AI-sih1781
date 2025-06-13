
"use client";

import type { AnalyzeStudentProfileOutput } from "@/ai/flows/analyze-student-profile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, BookOpen, BarChartHorizontalBig, ExternalLink, Download, AlertCircle } from "lucide-react"; // Changed Save to Download
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  result: AnalyzeStudentProfileOutput;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    if (!result) {
      toast({
        title: "Error",
        description: "No analysis data available to download.",
        variant: "destructive",
      });
      return;
    }
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(result, null, 2) // Pretty print JSON
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "PathFinderAI_CareerAnalysisReport.json";
      link.click();
      toast({
        title: "Report Downloaded",
        description: "Your career analysis report has been downloaded as a JSON file.",
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Download Failed",
        description: "Could not download the report. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!result || !result.suggestedCareerPaths || result.suggestedCareerPaths.length === 0) {
    return (
      <Card className="shadow-lg border-yellow-500 bg-yellow-50">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <CardTitle className="font-headline text-yellow-700 text-2xl">No Suggestions Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            We couldn&apos;t generate career suggestions based on the provided profile. 
            Please try refining your academic details, interests or resume.
          </p>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary flex items-center gap-2">
            <Briefcase className="h-7 w-7" /> Suggested Career Paths
          </CardTitle>
          <CardDescription>Based on your profile, here are some career paths you might excel in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.suggestedCareerPaths.map((path, index) => (
            <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-background">
              <CardHeader className="bg-secondary/50 p-4">
                <CardTitle className="font-headline text-xl text-secondary-foreground">{path.careerPath}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-primary">Core Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.requiredSkills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                {path.skillGapReport && path.skillGapReport.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-sm font-semibold hover:no-underline text-accent hover:text-accent/80">
                        <BarChartHorizontalBig className="mr-2 h-4 w-4" /> View Skill Gap Report & Recommendations
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-semibold">Skill</TableHead>
                              <TableHead className="font-semibold">Your Level</TableHead>
                              <TableHead className="font-semibold">Recommended Courses</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {path.skillGapReport.map((gap, gapIndex) => (
                              <TableRow key={gapIndex}>
                                <TableCell className="font-medium text-sm">{gap.skill}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={
                                      gap.yourLevel.toLowerCase() === 'beginner' ? 'destructive' : 
                                      gap.yourLevel.toLowerCase() === 'intermediate' ? 'outline' : 
                                      'default'
                                    } 
                                    className="text-xs capitalize"
                                  >
                                    {gap.yourLevel}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {gap.recommendedCourses.length > 0 ? (
                                    <ul className="space-y-1">
                                      {gap.recommendedCourses.map((course, courseIndex) => (
                                        <li key={courseIndex} className="text-xs">
                                          <Link href={course.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center" title={course.link}>
                                            {course.title.length > 50 ? `${course.title.substring(0,50)}...` : course.title}
                                            <ExternalLink className="ml-1 h-3 w-3 shrink-0" />
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">N/A</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleDownloadReport} variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" /> Download Full Report (JSON)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
