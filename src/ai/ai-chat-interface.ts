
'use server';

/**
 * @fileOverview AI chat interface flow for handling user interactions and providing assistance related to innovation and technology.
 *
 * - aiChat - A function that initiates and manages the AI chat process.
 * - AIChatInput - The input type for the aiChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Stream } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AIChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The chat history.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;


export async function aiChat(input: AIChatInput): Promise<ReadableStream<string>> {
  const {stream} = await ai.generateStream({
      model: 'googleai/gemini-2.5-flash',
      prompt: `You are a helpful AI assistant from TECHismust. Answer the user's question.`,
      history: input.history.map(m => ({...m, content: [{text: m.content}]})),
    });
    
    const transformStream = new TransformStream<any, string>({
        transform(chunk, controller) {
            if (chunk.text) {
                controller.enqueue(chunk.text);
            }
        },
    });

    (async () => {
        const writer = transformStream.writable.getWriter();
        try {
            for await (const chunk of stream) {
                if (chunk.text) {
                    await writer.write(chunk.text);
                }
            }
        } catch (e) {
            console.error('Streaming error:', e);
            writer.abort(e);
        } finally {
            writer.close();
        }
    })();
    
    return transformStream.readable;
}
