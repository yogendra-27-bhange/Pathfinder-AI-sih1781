
'use server';
/**
 * @fileOverview Generates an image based on a text prompt using AI.
 *
 * - generateImage - A function that takes a prompt and returns an image data URI.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The output type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  // In case of an error during generation, we'll return an empty string 
  // for imageDataUri to allow fallback to placeholder.
  try {
    return await generateImageFlow(input);
  } catch (error) {
    console.error(`Error generating image for prompt "${input.prompt}":`, error);
    return { imageDataUri: "" }; // Return empty string on error
  }
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', 
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        // Add safety settings to be less restrictive for image generation if appropriate
        // For example, to allow for more creative outputs:
        // safetySettings: [
        //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        // ],
      },
    });

    if (!media || !media.url) {
      console.error('Image generation failed or returned no media URL for prompt:', input.prompt);
      // Fallback to an empty string or a specific placeholder data URI if preferred
      return { imageDataUri: "" };
    }

    return { imageDataUri: media.url };
  }
);
