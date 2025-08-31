'use server';

/**
 * @fileOverview AI flow to generate personalized language learning exercises.
 *
 * - generatePersonalizedExercises - A function that generates exercises based on the user's learning level and selected topics.
 * - GeneratePersonalizedExercisesInput - The input type for the generatePersonalizedExercises function.
 * - GeneratePersonalizedExercisesOutput - The return type for the generatePersonalizedExercises function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExerciseTopicSchema = z.object({
  name: z.string().describe('The name of the topic to generate exercises for, e.g. "greetings"'),
  level: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the topic.'),
});

const GeneratePersonalizedExercisesInputSchema = z.object({
  learningLanguage: z.string().describe('The language the user is learning.'),
  exerciseTopics: z.array(ExerciseTopicSchema).describe('The topics for which to generate exercises.'),
  userLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The overall learning level of the user.'),
});
export type GeneratePersonalizedExercisesInput = z.infer<typeof GeneratePersonalizedExercisesInputSchema>;

const ExerciseSchema = z.object({
  exerciseType: z.string().describe('The type of exercise, e.g., multiple choice, fill in the blanks, translation.'),
  instructions: z.string().describe('Instructions for completing the exercise.'),
  content: z.string().describe('The actual exercise content (question, text to translate, etc.).'),
  answer: z.string().optional().describe('The correct answer to the exercise, if applicable.'),
});

const GeneratePersonalizedExercisesOutputSchema = z.object({
  exercises: z.array(ExerciseSchema).describe('The generated exercises.'),
});
export type GeneratePersonalizedExercisesOutput = z.infer<typeof GeneratePersonalizedExercisesOutputSchema>;


export async function generatePersonalizedExercises(input: GeneratePersonalizedExercisesInput): Promise<GeneratePersonalizedExercisesOutput> {
  return generatePersonalizedExercisesFlow(input);
}

const exerciseGenerationPrompt = ai.definePrompt({
  name: 'exerciseGenerationPrompt',
  input: {schema: GeneratePersonalizedExercisesInputSchema},
  output: {schema: GeneratePersonalizedExercisesOutputSchema},
  prompt: `You are an AI language tutor. Your task is to generate personalized language learning exercises for the user, tailored to their current learning level and the topics they are studying.

  The user is learning {{learningLanguage}} and their overall level is {{userLevel}}.

  Generate exercises for the following topics:
  {{#each exerciseTopics}}
    - Topic: {{this.name}}, Level: {{this.level}}
  {{/each}}

  Each exercise should include instructions, content, and the type of exercise. The answer is optional.

  Make the exercises engaging and relevant to the user's learning goals.

  Output the exercises in the correct JSON format.
  `,
});

const generatePersonalizedExercisesFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedExercisesFlow',
    inputSchema: GeneratePersonalizedExercisesInputSchema,
    outputSchema: GeneratePersonalizedExercisesOutputSchema,
  },
  async input => {
    const {output} = await exerciseGenerationPrompt(input);
    return output!;
  }
);
