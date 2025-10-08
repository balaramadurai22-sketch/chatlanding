
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

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AIChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The chat history.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;

const AIChatOutputSchema = z.object({
  response: z.string().describe('The AI response to the user query.'),
});
export type AIChatOutput = z.infer<typeof AIChatOutputSchema>;

export async function aiChat(input: AIChatInput): Promise<AIChatOutput> {
  const llmResponse = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: `You are a helpful AI assistant from TECHismust. Answer the user's question.`,
      history: input.history.map(m => ({...m, content: [{text: m.content}]})),
    });

  const response = llmResponse.text;
  return { response };
}
