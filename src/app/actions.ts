
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';
import { Stream } from 'genkit';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueChat(history: ChatMessage[]): Promise<ReadableStream<string>> {
    const stream = await aiChat({ history });
    return stream;
}
