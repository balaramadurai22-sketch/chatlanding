
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

const AgentSchema = z.object({
    agent_id: z.string(),
    agent_name: z.string(),
    model_used: z.string(),
    category: z.string(),
    command: z.string().optional(),
    description: z.string(),
});

const AIChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The chat history.'),
  selectedAgents: z.array(AgentSchema).optional().describe('An array of selected agent objects.'),
});
export type AIChatInput = z.infer<typeof AIChatInputSchema>;


export async function aiChat(input: AIChatInput): Promise<ReadableStream<string>> {
  
  let prompt = `You are a helpful AI assistant from TECHismust. Answer the user's question.`;

  if (input.selectedAgents && input.selectedAgents.length > 0) {
    const agentDetails = input.selectedAgents.map(agent => 
      `Agent: ${agent.agent_name} (ID: ${agent.agent_id})\nModel: ${agent.model_used}\nCategory: ${agent.category}\nCommand: ${agent.command || 'N/A'}\nDescription: ${agent.description}`
    ).join('\n\n');

    prompt += `\n\nThe user has provided the following agents to assist with their query. Use their capabilities to formulate the best possible response. Do not explicitly mention the agents in your response. Just use the context they provide.\n\n--- AGENT CONTEXT ---\n${agentDetails}\n----------------------`;
  }

  const {stream} = await ai.generateStream({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
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
