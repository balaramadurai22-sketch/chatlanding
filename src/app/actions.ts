
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
