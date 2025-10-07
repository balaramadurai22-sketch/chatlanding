
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { continueChat } from '@/app/actions';
import type { ChatMessage } from '@/app/actions';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  MessageSquare,
  History,
  LayoutGrid,
  Bug,
  Lightbulb,
  Send,
  Loader,
  Bot,
  User,
  PanelLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (initialQuery && messages.length === 0 && !isLoading) {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery, messages, isLoading]);
  
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
    <SidebarProvider>
      <div className="flex h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Link href="/" className="font-headline text-lg font-bold animated-gradient-text">
                TECHismust AI
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setMessages([])} tooltip="Start a new chat">
                  <MessageSquare />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="View past conversations">
                  <History />
                  <span>Chat History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/projects" className="w-full">
                    <SidebarMenuButton tooltip="Explore our projects">
                      <LayoutGrid />
                      <span>Projects</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Report a bug">
                  <Bug />
                  <span>Bug Report</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Request a new feature">
                  <Lightbulb />
                  <span>Feature Request</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-3">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/bala/100/100" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Bala</span>
                <span className="text-xs text-muted-foreground">Free</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden">
                        <PanelLeft />
                    </SidebarTrigger>
                    <h2 className="text-lg font-semibold">AI Conversational Assistant</h2>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="mx-auto max-w-3xl">
                {messages.length === 0 && !isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Bot size={48} className="mb-4 text-primary" />
                    <h1 className="text-2xl font-bold">TECHismust Chat</h1>
                    <p className="text-muted-foreground">Ask me anything to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-3 ${
                          message.role === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="size-8 border">
                            <AvatarFallback>
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-prose rounded-lg p-3 text-sm ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card'
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.role === 'user' && (
                           <Avatar className="size-8 border">
                            <AvatarFallback>
                              <User size={16} />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                    {isLoading && (
                       <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3"
                      >
                         <Avatar className="size-8 border">
                            <AvatarFallback>
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                        <div className="flex items-center space-x-1 rounded-lg bg-card p-3">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></span>
                          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:0.2s]"></span>
                          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:0.4s]"></span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </main>
            <footer className="border-t bg-background/80 backdrop-blur-sm p-4">
              <div className="mx-auto max-w-3xl">
                <form onSubmit={handleSendMessage} className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Ask anything..."
                    className="w-full resize-none rounded-lg border py-2 pl-4 pr-20"
                    rows={1}
                    maxRows={5}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
