'use server';

/**
 * @fileOverview AI chat interface flow for handling user interactions and providing assistance related to innovation and technology.
 *
 * - aiChat - A function that initiates and manages the AI chat process.
 * - AIChatInput - The input type for the aiChat function.
 * - AIChatOutput - The return type for the aiChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email address of the user.'),
  experienceLevel: z
    .string()
    .describe(
      'The business/tech experience level of the user (e.g., beginner, intermediate, expert).' // e.g., beginner, intermediate, expert
    ),
  query: z.string().describe('The user query for the AI chat interface.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;

const AIChatOutputSchema = z.object({
  response: z.string().describe('The AI response to the user query.'),
});
export type AIChatOutput = z.infer<typeof AIChatOutputSchema>;

export async function aiChat(input: AIChatInput): Promise<AIChatOutput> {
  return aiChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'aiChatPrompt',
  input: {schema: AIChatInputSchema},
  output: {schema: AIChatOutputSchema},
  prompt: `You are an AI assistant designed to help users with questions related to innovation and technology.

  You will be speaking with a user named {{name}} with email {{email}} and experience level {{experienceLevel}}.
  You should tailor your responses based on the experience level of the user.

  User Query: {{{query}}}`, // removed the system prompt as it is not available.
});

const aiChatFlow = ai.defineFlow(
  {
    name: 'aiChatFlow',
    inputSchema: AIChatInputSchema,
    outputSchema: AIChatOutputSchema,
  },
  async input => {
    const {output} = await chatPrompt(input);
    return output!;
  }
);
