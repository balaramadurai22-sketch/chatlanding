
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import ChatUI from '@/components/chat/chat-ui';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialQuery && messages.length === 0 && !isLoading) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery, messages.length, isLoading]);
  
  const handleInitialQuery = async (query: string) => {
    const newMessages: ChatMessage[] = [{ role: 'user', content: query }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const response = await continueChat(newMessages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await continueChat(newMessages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatUI
      messages={messages}
      input={input}
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
      setInput={setInput}
      setMessages={setMessages}
    />
  );
}
