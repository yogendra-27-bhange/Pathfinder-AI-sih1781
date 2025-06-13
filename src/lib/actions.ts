
"use server";

import { analyzeStudentProfile, type AnalyzeStudentProfileInput, type AnalyzeStudentProfileOutput } from "@/ai/flows/analyze-student-profile";
import { z } from "zod";

const StudentProfileSchema = z.object({
  resumeDataUri: z.string().min(1, "Resume is required."),
  academicDetails: z.object({
    tenthPercentage: z.coerce.number().min(0).max(100),
    twelfthPercentage: z.coerce.number().min(0).max(100),
    diplomaUgPercentage: z.coerce.number().min(0).max(100),
  }),
  interests: z.array(z.string()).min(1, "At least one interest must be selected."),
});

export type StudentProfileFormData = z.infer<typeof StudentProfileSchema>;

export async function handleStudentProfileAnalysis(
  formData: StudentProfileFormData
): Promise<{ success: boolean; data?: AnalyzeStudentProfileOutput; error?: string }> {
  try {
    const validatedData = StudentProfileSchema.parse(formData);
    
    const aiInput: AnalyzeStudentProfileInput = {
      resumeDataUri: validatedData.resumeDataUri,
      academicDetails: validatedData.academicDetails,
      interests: validatedData.interests,
    };

    const result = await analyzeStudentProfile(aiInput);
    return { success: true, data: result };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') };
    }
    console.error("Error in AI profile analysis:", error);
    return { success: false, error: "An unexpected error occurred during analysis. Please try again." };
  }
}
