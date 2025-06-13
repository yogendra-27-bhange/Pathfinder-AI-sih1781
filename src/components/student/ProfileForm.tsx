
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { handleStudentProfileAnalysis, type StudentProfileFormData } from "@/lib/actions";
import type { AnalyzeStudentProfileOutput } from "@/ai/flows/analyze-student-profile";
import { UploadCloud, Sparkles } from "lucide-react";
import React, { useState } from "react";

const interestsList = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "webdev", label: "Web Development" },
  { id: "design", label: "UI/UX Design" },
  { id: "datascience", label: "Data Science" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "mobiledev", label: "Mobile App Development" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "gamedev", label: "Game Development" },
];

const profileFormSchema = z.object({
  resume: z.custom<FileList>().refine(files => files && files.length > 0, "Resume is required."),
  tenthPercentage: z.coerce.number().min(0, "Min 0").max(100, "Max 100").positive("Must be positive"),
  twelfthPercentage: z.coerce.number().min(0).max(100).positive("Must be positive"),
  diplomaUgPercentage: z.coerce.number().min(0).max(100).positive("Must be positive"),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one interest.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onAnalysisStart: () => void;
  onAnalysisSuccess: (data: AnalyzeStudentProfileOutput) => void;
  onAnalysisError: (error: string) => void;
}

// Moved fileToDataUri here as it uses client-side FileReader API
const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default function ProfileForm({ onAnalysisStart, onAnalysisSuccess, onAnalysisError }: ProfileFormProps) {
  const { toast } = useToast();
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      interests: [],
      tenthPercentage: undefined,
      twelfthPercentage: undefined,
      diplomaUgPercentage: undefined,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    onAnalysisStart();
    if (!data.resume || data.resume.length === 0) {
      onAnalysisError("Resume file is missing.");
      toast({ title: "Error", description: "Please upload your resume.", variant: "destructive" });
      return;
    }

    try {
      const resumeDataString = await fileToDataUri(data.resume[0]);
      
      const formDataForAction: StudentProfileFormData = {
        resumeDataUri: resumeDataString,
        academicDetails: {
          tenthPercentage: data.tenthPercentage,
          twelfthPercentage: data.twelfthPercentage,
          diplomaUgPercentage: data.diplomaUgPercentage,
        },
        interests: data.interests,
      };

      const result = await handleStudentProfileAnalysis(formDataForAction);

      if (result.success && result.data) {
        onAnalysisSuccess(result.data);
        toast({ title: "Analysis Complete!", description: "Your career profile has been analyzed." });
      } else {
        onAnalysisError(result.error || "Analysis failed.");
        toast({ title: "Analysis Failed", description: result.error || "An unknown error occurred.", variant: "destructive" });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while processing your resume.";
      onAnalysisError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><UploadCloud className="h-5 w-5 text-primary" /> Upload Resume</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.txt" 
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    if (e.target.files && e.target.files.length > 0) {
                      setResumeFileName(e.target.files[0].name);
                    } else {
                      setResumeFileName(null);
                    }
                  }}
                  className="file:text-primary file:font-semibold"
                />
              </FormControl>
              {resumeFileName && <FormDescription>Selected: {resumeFileName}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset className="space-y-4 border border-border p-4 rounded-md">
          <legend className="text-sm font-medium text-primary px-1">Academic Details</legend>
          <FormField
            control={form.control}
            name="tenthPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>10th Grade Percentage (%)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 85" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twelfthPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>12th Grade Percentage (%)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 80" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diplomaUgPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diploma/UG Percentage (%)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 75" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base text-primary">Select Your Interests</FormLabel>
                <FormDescription>Choose areas that you are passionate about.</FormDescription>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interestsList.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:shadow-md transition-shadow bg-card"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.label])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== item.label
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-sm">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
          <Sparkles className="mr-2 h-5 w-5" /> Analyze Profile
        </Button>
      </form>
    </Form>
  );
}
