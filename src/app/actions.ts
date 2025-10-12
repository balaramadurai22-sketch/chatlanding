
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
  timestamp: string;
}

export interface ContinueChatRequest {
    history: ChatMessage[];
    selectedAgents?: Agent[];
    sessionId: string;
}

export async function continueChat({history, selectedAgents, sessionId}: ContinueChatRequest): Promise<ReadableStream<string>> {
    
    const requestPayload: AIChatInput = {
        history: history.map(m => ({role: m.role, content: m.content})),
        selectedAgents: selectedAgents,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
    };

    const stream = await aiChat(requestPayload);
    return stream;
}
