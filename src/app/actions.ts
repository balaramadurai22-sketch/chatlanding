
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';
import type { Agent } from '@/lib/agents-data';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ContinueChatRequest {
    history: ChatMessage[];
    selectedAgents?: Agent[];
}

export async function continueChat({history, selectedAgents}: ContinueChatRequest): Promise<ReadableStream<string>> {
    const stream = await aiChat({ history, selectedAgents });
    return stream;
}
