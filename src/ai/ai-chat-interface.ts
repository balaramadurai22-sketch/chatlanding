
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
  return aiChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'aiChatPrompt',
  input: {schema: AIChatInputSchema},
  output: {schema: AIChatOutputSchema},
  prompt: `You are TIM (TECHismust Intelligent Model), a helpful AI assistant for TECHismust Innovation Lab. Your persona is professional, knowledgeable, and slightly futuristic.

  Here is the conversation history:
  {{#each history}}
  - {{role}}: {{content}}
  {{/each}}
  
  Based on this history, provide a relevant and helpful response. Be concise but informative. Your main goal is to engage the user and encourage them to explore collaboration with TECHismust. If they ask about our services, direct them to the solutions or contact page.`,
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
