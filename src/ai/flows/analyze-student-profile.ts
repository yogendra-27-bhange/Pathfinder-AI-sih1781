
// src/ai/flows/analyze-student-profile.ts
'use server';

/**
 * @fileOverview Analyzes a student's profile (resume, academic details, and interests) to suggest suitable career paths.
 *
 * - analyzeStudentProfile - A function that analyzes the student profile and suggests career paths.
 * - AnalyzeStudentProfileInput - The input type for the analyzeStudentProfile function.
 * - AnalyzeStudentProfileOutput - The output type for the analyzeStudentProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentProfileInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The student's resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  academicDetails: z
    .object({
      tenthPercentage: z.number().describe('10th grade percentage'),
      twelfthPercentage: z.number().describe('12th grade percentage'),
      diplomaUgPercentage: z
        .number()
        .describe('Diploma or Undergraduate percentage, if applicable'),
    })
    .describe('The academic details of the student.'),
  interests: z
    .array(z.string())
    .describe('A list of the student’s interests (e.g., AI, Web Dev, Design, Data Science).'),
});

export type AnalyzeStudentProfileInput = z.infer<typeof AnalyzeStudentProfileInputSchema>;

const AnalyzeStudentProfileOutputSchema = z.object({
  suggestedCareerPaths: z.any().describe('Flexible output for suggested career paths.'),
});

export type AnalyzeStudentProfileOutput = {
  suggestedCareerPaths: any;
};

export async function analyzeStudentProfile(
  input: AnalyzeStudentProfileInput
): Promise<AnalyzeStudentProfileOutput> {
  return analyzeStudentProfileFlow(input);
}

const analyzeProfilePrompt = ai.definePrompt({
  name: 'analyzeProfilePrompt',
  input: {schema: AnalyzeStudentProfileInputSchema},
  // Removed output schema to allow free-form output
  prompt: `You are a career guidance expert. Analyze the student's profile, resume, and interests to suggest suitable career paths.

Consider the student's academic details:
10th Percentage: {{{academicDetails.tenthPercentage}}}
12th Percentage: {{{academicDetails.twelfthPercentage}}}
Diploma/UG Percentage: {{{academicDetails.diplomaUgPercentage}}}

Student's Interests: {{#each interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Resume content: {{media url=resumeDataUri}}

Based on this information, suggest a few suitable career paths. 
For each career path:
1. Identify the core required skills.
2. Provide a skill gap report including the student's current level (Beginner, Intermediate, Advanced) for each relevant skill.
3. For each skill in the gap report, recommend specific courses to bridge the gap. Each course recommendation MUST include a 'title' and a 'link' (a direct URL). Prioritize courses from reputable platforms like Coursera or YouTube. Ensure the links are valid.

Format your output as a JSON object. Do not include any conversational text, only JSON.`,
});

const analyzeStudentProfileFlow = ai.defineFlow(
  {
    name: 'analyzeStudentProfileFlow',
    inputSchema: AnalyzeStudentProfileInputSchema,
    // Removed outputSchema to allow free-form output
  },
  async (input: AnalyzeStudentProfileInput) => {
    const {output} = await analyzeProfilePrompt(input);
    // Optionally parse/validate output here if needed
    return { suggestedCareerPaths: output };
  }
);

