
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
  sessionId: z.string().describe('A unique identifier for the user session.'),
  timestamp: z.string().describe('The ISO timestamp of the request.'),
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

  const {stream, response} = await ai.generateStream({
      model: 'googleai/gemini-1.5-flash',
      prompt: promptText,
      history: input.history.map(m => ({role: m.role, content: [{text: m.content}]})),
    });
    
    // Use a simple ReadableStream that pushes decoded chunks.
    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of stream) {
                    if (chunk.text) {
                       controller.enqueue(chunk.text);
                    }
                }
            } catch (e) {
                 console.error('Streaming error:', e);
                 controller.error(e);
            } finally {
                controller.close();
            }
        },
    });
}
