
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import ChatUI from '@/components/chat/chat-ui';
import { useToast } from '@/hooks/use-toast';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const { toast } = useToast();
  
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
      toast({
        title: "An error occurred.",
        description: "Sorry, I encountered an error. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      setMessages(prev => prev.slice(0, prev.length -1));
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
       toast({
        title: "An error occurred.",
        description: "Sorry, I encountered an error. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      // Remove the user message that failed to get a response
      setMessages(prev => prev.slice(0, prev.length - 1));
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
