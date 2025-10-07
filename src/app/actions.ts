
'use server';

import {aiChat} from '@/ai/ai-chat-interface';
import type {AIChatInput} from '@/ai/ai-chat-interface';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueChat(
  history: ChatMessage[]
): Promise<ChatMessage> {
  try {
    const {response} = await aiChat({history: history as AIChatInput['history']});
    return {role: 'assistant', content: response};
  } catch (error) {
    console.error('Failed to call Genkit flow:', error);
    return {
      role: 'assistant',
      content: "Sorry, I'm having trouble connecting to my brain right now.",
    };
  }
}
