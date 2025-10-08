
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import ChatUI from '@/components/chat/chat-ui';
import { useToast } from '@/hooks/use-toast';
import type { Agent } from '@/lib/agents-data';
import { agents as allAgents } from '@/lib/agents-data';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const { toast } = useToast();
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [agents, setAgents] = React.useState<Agent[]>(allAgents);
  const [selectedAgents, setSelectedAgents] = React.useState<Agent[]>([]);

  const processStream = async (stream: ReadableStream<string>) => {
    let fullResponse = '';
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    // Add an empty assistant message to start
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        fullResponse += decoder.decode(value, { stream: true });
        setMessages(prev =>
            prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, content: fullResponse } : msg
            )
        );
    }
  };
  
  const handleInitialQuery = React.useCallback(async (query: string) => {
    const newMessages: ChatMessage[] = [{ role: 'user', content: query }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const stream = await continueChat(newMessages, selectedAgents);
      await processStream(stream);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Sorry, I encountered an error. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      setMessages(prev => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedAgents]);


  React.useEffect(() => {
    if (initialQuery && messages.length === 0 && !isLoading) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery, messages.length, isLoading, handleInitialQuery]);
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await continueChat(newMessages, selectedAgents);
      await processStream(stream);
    } catch (error) {
       toast({
        title: "An error occurred.",
        description: "Sorry, I encountered an error. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      // Remove the user message if an error occurred during streaming
      setMessages(prev => prev.slice(0, prev.length -1));
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
      agents={agents}
      setAgents={setAgents}
      selectedAgents={selectedAgents}
      setSelectedAgents={setSelectedAgents}
    />
  );
}
