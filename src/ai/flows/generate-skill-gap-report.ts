// use server'
'use server';

/**
 * @fileOverview Generates a skill gap report for a student based on their profile and suggested career paths.
 *
 * - generateSkillGapReport - A function that generates the skill gap report.
 * - GenerateSkillGapReportInput - The input type for the generateSkillGapReport function.
 * - GenerateSkillGapReportOutput - The return type for the generateSkillGapReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillSchema = z.object({
  name: z.string().describe('The name of the skill.'),
  level: z.string().describe('The student\'s current level in the skill (e.g., Beginner, Intermediate, Expert).'),
  recommendedCourses: z.array(
    z.object({
      title: z.string().describe('The title of the recommended course.'),
      link: z.string().url().describe('The URL of the recommended course.'),
    })
  ).describe('A list of recommended courses to improve the skill.'),
});

const CareerPathSchema = z.object({
  name: z.string().describe('The name of the career path.'),
  requiredSkills: z.array(SkillSchema).describe('The skills required for the career path.'),
});

const GenerateSkillGapReportInputSchema = z.object({
  studentProfile: z.object({
    interests: z.array(z.string()).describe('The student\'s interests (e.g., AI, Web Dev, Design, Data Science).'),
    academicDetails: z.object({
      tenthPercentage: z.number().describe('The student\'s 10th grade percentage.'),
      twelfthPercentage: z.number().describe('The student\'s 12th grade percentage.'),
      diplomaUgPercentage: z.number().describe('The student\'s Diploma/UG percentage.'),
    }).describe('The student\'s academic details.'),
    resumeText: z.string().describe('The text content of the student\'s resume.'),
  }).describe('The student\'s profile information.'),
  suggestedCareerPaths: z.array(CareerPathSchema).describe('The career paths suggested for the student.'),
});
export type GenerateSkillGapReportInput = z.infer<typeof GenerateSkillGapReportInputSchema>;

const GenerateSkillGapReportOutputSchema = z.object({
  skillGapReport: z.any().describe('Flexible output for skill gap report.'),
});
export type GenerateSkillGapReportOutput = {
  skillGapReport: any;
};

export async function generateSkillGapReport(input: GenerateSkillGapReportInput): Promise<GenerateSkillGapReportOutput> {
  return generateSkillGapReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillGapReportPrompt',
  input: {schema: GenerateSkillGapReportInputSchema},
  // Removed output schema to allow free-form output
  prompt: `You are an expert career counselor. You will analyze the student's profile and suggested career paths to generate a skill gap report.

Student Profile:
Interests: {{studentProfile.interests}}
Academic Details: 10th: {{studentProfile.academicDetails.tenthPercentage}}%, 12th: {{studentProfile.academicDetails.twelfthPercentage}}%, Diploma/UG: {{studentProfile.academicDetails.diplomaUgPercentage}}%
Resume Text: {{studentProfile.resumeText}}

Suggested Career Paths:
{{#each suggestedCareerPaths}}
Career Path: {{name}}
  Required Skills:
  {{#each requiredSkills}}
    Skill: {{name}}, Level: {{level}}
  {{/each}}
{{/each}}

Based on this information, create a skill gap report that highlights the required skills for each suggested career path, the student's current level in those skills, and recommended courses to bridge the gap.  Make sure the links to the courses are valid and working.

Ensure that your skill gap report contains realistic and attainable skills, levels, and courses.

Output the data in the JSON format.  Do not include any conversational text, only JSON.`, 
});

const generateSkillGapReportFlow = ai.defineFlow(
  {
    name: 'generateSkillGapReportFlow',
    inputSchema: GenerateSkillGapReportInputSchema,
    // Removed outputSchema to allow free-form output
  },
  async input => {
    const {output} = await prompt(input);
    // Optionally parse/validate output here if needed
    return { skillGapReport: output };
  }
);
