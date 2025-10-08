
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';
import type { Agent } from '@/lib/agents-data';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueChat(history: ChatMessage[], selectedAgents: Agent[]): Promise<ReadableStream<string>> {
    const stream = await aiChat({ 
        history, 
        selectedAgents: selectedAgents.map(a => ({
            id: a.id,
            name: a.name,
            model: a.model,
            category: a.category,
            command: a.command,
            description: a.description,
        })) 
    });
    return stream;
}

