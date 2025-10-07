
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueChat(history: ChatMessage[]): Promise<ChatMessage> {
    const result = await aiChat({ history });

    return {
        role: 'assistant',
        content: result.response
    }
}
