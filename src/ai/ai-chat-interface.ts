
'use server';

/**
 * @fileOverview AI chat interface flow for handling user interactions and providing assistance related to innovation and technology.
 *
 * - aiChat - A function that initiates and manages the AI chat process.
 * - AIChatInput - The input type for the aiChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Agent } from '@/lib/agents-data';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AIChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The chat history.'),
  selectedAgents: z.array(z.any()).optional().describe('An array of selected agent objects to provide context.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;


export async function aiChat(input: AIChatInput): Promise<ReadableStream<string>> {
  let promptText = `You are a helpful AI assistant from TECHismust. Answer the user's question.`;

  if (input.selectedAgents && input.selectedAgents.length > 0) {
    const agentContext = input.selectedAgents.map((agent: Agent) => 
        `Agent Name: ${agent.name}\nPurpose: ${agent.purpose}\nDescription: ${agent.description}`
    ).join('\n\n');

    promptText = `You are a helpful AI assistant from TECHismust. You must use the context from the following selected agents to formulate your response.\n\n--- AGENT CONTEXT ---\n${agentContext}\n---------------------\n\nAnswer the user's question based on this context.`;
  }

  const {stream} = await ai.generateStream({
      model: 'googleai/gemini-2.5-flash',
      prompt: promptText,
      history: input.history.map(m => ({...m, content: [{text: m.content}]})),
    });
    
    const transformStream = new TransformStream<any, string>({
        async transform(chunk, controller) {
            if (chunk.text) {
                // Simulate typing delay
                for (const char of chunk.text) {
                    controller.enqueue(char);
                    await new Promise(resolve => setTimeout(resolve, 5)); // 5ms delay per character
                }
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
