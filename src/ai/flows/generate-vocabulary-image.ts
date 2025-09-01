'use server';
/**
 * @fileOverview A flow to generate an image for a vocabulary word.
 *
 * - generateVocabularyImage - Generates an image based on a hint.
 * - GenerateVocabularyImageInput - The input type for the generateVocabularyImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateVocabularyImageInputSchema = z.object({
  hint: z.string().describe('A hint to generate an image for a vocabulary word. Should be one or two keywords, e.g. "greeting wave"'),
});

export type GenerateVocabularyImageInput = z.infer<typeof GenerateVocabularyImageInputSchema>;

async function generateVocabularyImage(
  input: GenerateVocabularyImageInput
): Promise<{ imageUrl: string }> {
  return generateVocabularyImageFlow(input);
}

const generateVocabularyImageFlow = ai.defineFlow(
  {
    name: 'generateVocabularyImageFlow',
    inputSchema: GenerateVocabularyImageInputSchema,
    outputSchema: z.object({ imageUrl: z.string() }),
  },
  async ({ hint }) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A simple, clear, and vibrant illustration for a language learning flashcard. The image should visually represent the concept of \"${hint}\". The style should be minimalist with a white background.`,
    });
    
    if (!media.url) {
      throw new Error('Image generation failed.');
    }
    
    return { imageUrl: media.url };
  }
);

export { generateVocabularyImage };
