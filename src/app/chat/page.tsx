
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import ChatUI from '@/components/chat/chat-ui';
import { useToast } from '@/hooks/use-toast';
import type { Agent } from '@/lib/agents-data';
import { v4 as uuidv4 } from 'uuid';


export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const { toast } = useToast();
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedAgents, setSelectedAgents] = React.useState<Agent[]>([]);

  const processStream = async (stream: ReadableStream<string>) => {
    let fullResponse = '';
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const responseId = uuidv4();

    // Add an empty assistant message to start
    setMessages(prev => [...prev, { id: responseId, role: 'assistant', content: '' }]);

    while (true) {
        try {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            fullResponse += decoder.decode(value, { stream: true });
            setMessages(prev =>
                prev.map((msg) =>
                    msg.id === responseId ? { ...msg, content: fullResponse } : msg
                )
            );
        } catch (error) {
             toast({
                title: "An error occurred.",
                description: "Sorry, I encountered a streaming error. Please try again.",
                variant: "destructive",
            });
            console.error("Streaming error:", error);
            setMessages(prev => prev.filter(msg => msg.id !== responseId));
            break;
        }
    }
  };
  
  const handleInitialQuery = React.useCallback(async (query: string) => {
    const userMessage: ChatMessage = { id: uuidv4(), role: 'user', content: query };
    const newMessages: ChatMessage[] = [userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const stream = await continueChat({history: newMessages, selectedAgents});
      await processStream(stream);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Sorry, I couldn’t reach the server. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedAgents]);


  React.useEffect(() => {
    if (initialQuery && messages.length === 0 && !isLoading) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery, messages.length, isLoading, handleInitialQuery]);
  

  const handleSendMessage = async (e: React.FormEvent, currentInput?: string) => {
    e.preventDefault();
    const messageContent = currentInput || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: uuidv4(), role: 'user', content: messageContent };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    if (!currentInput) {
        setInput('');
    }
    setIsLoading(true);

    try {
      const stream = await continueChat({history: newMessages, selectedAgents});
      await processStream(stream);
    } catch (error) {
       toast({
        title: "An error occurred.",
        description: "Sorry, I couldn’t reach the server. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (messageId: string) => {
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      if (messageIndex === -1 || messages[messageIndex].role !== 'assistant') return;

      const userMessageIndex = messageIndex -1;
      if (userMessageIndex < 0 || messages[userMessageIndex].role !== 'user') return;
      
      const historyToResend = messages.slice(0, userMessageIndex + 1);
      const lastUserMessage = messages[userMessageIndex];

      // Remove the old assistant response
      setMessages(prev => prev.filter(msg => msg.id !== messageId));

      setIsLoading(true);
       try {
            const stream = await continueChat({ history: historyToResend, selectedAgents });
            await processStream(stream);
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Sorry, I couldn’t reach the server to regenerate. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
  }


  return (
    <ChatUI
      messages={messages}
      input={input}
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
      setInput={setInput}
      setMessages={setMessages}
      selectedAgents={selectedAgents}
      setSelectedAgents={setSelectedAgents}
      handleRegenerate={handleRegenerate}
    />
  );
}
