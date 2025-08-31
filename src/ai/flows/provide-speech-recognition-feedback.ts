'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing speech recognition feedback.
 *
 * - provideSpeechRecognitionFeedback - A function that handles the speech recognition feedback process.
 * - ProvideSpeechRecognitionFeedbackInput - The input type for the provideSpeechRecognitionFeedback function.
 * - ProvideSpeechRecognitionFeedbackOutput - The return type for the provideSpeechRecognitionFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideSpeechRecognitionFeedbackInputSchema = z.object({
  spokenText: z.string().describe('The text spoken by the user.'),
  expectedText: z.string().describe('The expected text for the user to speak.'),
});
export type ProvideSpeechRecognitionFeedbackInput = z.infer<typeof ProvideSpeechRecognitionFeedbackInputSchema>;

const ProvideSpeechRecognitionFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s pronunciation, including corrections and suggestions.'),
  accuracyScore: z.number().describe('A score (0-1) indicating the accuracy of the pronunciation.'),
});
export type ProvideSpeechRecognitionFeedbackOutput = z.infer<typeof ProvideSpeechRecognitionFeedbackOutputSchema>;

export async function provideSpeechRecognitionFeedback(input: ProvideSpeechRecognitionFeedbackInput): Promise<ProvideSpeechRecognitionFeedbackOutput> {
  return provideSpeechRecognitionFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideSpeechRecognitionFeedbackPrompt',
  input: {schema: ProvideSpeechRecognitionFeedbackInputSchema},
  output: {schema: ProvideSpeechRecognitionFeedbackOutputSchema},
  prompt: `You are an AI speech recognition tutor providing feedback to language learners.

You will take the user's spoken text and compare it to the expected text.
You will provide feedback on the user's pronunciation, including specific corrections and suggestions for improvement.
You will also provide an accuracy score (0-1) indicating the accuracy of the pronunciation.

Spoken Text: {{{spokenText}}}
Expected Text: {{{expectedText}}}
`,
});

const provideSpeechRecognitionFeedbackFlow = ai.defineFlow(
  {
    name: 'provideSpeechRecognitionFeedbackFlow',
    inputSchema: ProvideSpeechRecognitionFeedbackInputSchema,
    outputSchema: ProvideSpeechRecognitionFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
