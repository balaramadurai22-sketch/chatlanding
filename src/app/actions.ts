
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';
import type { Agent } from '@/lib/agents-data';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentUsed?: string;
  modelUsed?: string;
  timestamp?: string;
}

export interface ContinueChatRequest {
    history: ChatMessage[];
    selectedAgents?: Agent[];
}

export async function continueChat({history, selectedAgents}: ContinueChatRequest): Promise<ReadableStream<string>> {
    
    const requestPayload = {
        history: history.map(m => ({role: m.role, content: m.content})),
        selectedAgents: selectedAgents?.map(a => ({
            id: a.id,
            name: a.name,
            model: a.model,
            description: a.description,
            purpose: a.purpose
        })),
        sessionId: 'session_123', // This should be dynamically managed
        timestamp: new Date().toISOString()
    };

    const stream = await aiChat(requestPayload);
    return stream;
}
