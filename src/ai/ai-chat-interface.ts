
'use server';

/**
 * @fileOverview AI chat interface flow for handling user interactions and providing assistance related to innovation and technology.
 *
 * - aiChat - A function that initiates and manages the AI chat process.
 * - AIChatInput - The input type for the aiChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Stream } from 'genkit/streaming';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AIChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The chat history.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;


export async function aiChat(input: AIChatInput): Promise<Stream<string>> {
  const {stream} = await ai.generateStream({
      model: 'googleai/gemini-2.5-flash',
      prompt: `You are a helpful AI assistant from TECHismust. Answer the user's question.`,
      history: input.history.map(m => ({...m, content: [{text: m.content}]})),
    });
    
    const textStream = new Stream<string>(async (writer) => {
        for await (const chunk of stream) {
            writer.write(chunk.text);
        }
        writer.end();
    });

  return textStream;
}
