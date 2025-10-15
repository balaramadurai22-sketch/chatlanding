
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import ChatUI from '@/components/chat/chat-ui';
import { useToast } from '@/hooks/use-toast';
import type { Agent } from '@/lib/agents-data';
import { agents as allAgentsData } from '@/lib/agents-data';
import { v4 as uuidv4 } from 'uuid';


export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  const { toast } = useToast();
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedAgents, setSelectedAgents] = React.useState<Agent[]>([]);
  const [sessionId] = React.useState(uuidv4());
  const [allAgents, setAllAgents] = React.useState<Agent[]>(allAgentsData);


  const processStream = async (stream: ReadableStream<string>) => {
    let fullResponse = '';
    const reader = stream.getReader();
    const responseId = uuidv4();
    const agentName = selectedAgents.length > 0 ? selectedAgents.map(a => a.name).join(', ') : 'TECHismust AI';
    const modelName = selectedAgents.length > 0 ? selectedAgents[0].model : 'Gemini 2.5';

    // Add an empty assistant message to start
    setMessages(prev => [...prev, { 
        id: responseId, 
        role: 'assistant', 
        content: '',
        agentUsed: agentName,
        modelUsed: modelName,
        timestamp: new Date().toISOString()
    }]);

    while (true) {
        try {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            fullResponse += value;
            setMessages(prev =>
                prev.map((msg) =>
                    msg.id === responseId ? { ...msg, content: fullResponse } : msg
                )
            );
        } catch (error) {
             toast({
                title: "⚠️ Something went wrong",
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
    const userMessage: ChatMessage = { 
        id: uuidv4(), 
        role: 'user', 
        content: query,
        timestamp: new Date().toISOString()
    };
    const newMessages: ChatMessage[] = [userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const stream = await continueChat({history: newMessages, selectedAgents, sessionId});
      await processStream(stream);
    } catch (error) {
      toast({
        title: "⚠️ Something went wrong",
        description: "Sorry, I couldn’t reach the server. Please try again.",
        variant: "destructive",
      });
      console.error(error);
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [toast, selectedAgents, sessionId]);


  React.useEffect(() => {
    if (initialQuery && messages.length === 0 && !isLoading) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery, messages.length, isLoading, handleInitialQuery]);
  

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = { 
        id: uuidv4(), 
        role: 'user', 
        content: inputValue,
        timestamp: new Date().toISOString()
    };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const stream = await continueChat({history: newMessages, selectedAgents, sessionId});
      await processStream(stream);
    } catch (error) {
       toast({
        title: "⚠️ Something went wrong",
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

      const userMessageIndex = messages.slice(0, messageIndex).reverse().findIndex(msg => msg.role === 'user');
      if (userMessageIndex === -1) return;
      
      const lastUserMessageIndex = messageIndex - 1 - userMessageIndex;
      const historyToResend = messages.slice(0, lastUserMessageIndex + 1);

      // Remove the old assistant response and any subsequent messages
      setMessages(prev => prev.slice(0, messageIndex));

      setIsLoading(true);
       try {
            const stream = await continueChat({ history: historyToResend, selectedAgents, sessionId });
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
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
      setMessages={setMessages}
      selectedAgents={selectedAgents}
      setSelectedAgents={setSelectedAgents}
      handleRegenerate={handleRegenerate}
      allAgents={allAgents}
      setAllAgents={setAllAgents}
    />
  );
}
