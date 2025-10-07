
'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { continueChat, ChatMessage } from '@/app/actions';
import { Send, Loader, User, Bot, MessageSquarePlus, History, FolderKanban, Bug, Lightbulb } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Particles from '@/components/landing/particles';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


const sidebarLinks = [
  { href: '#', icon: <MessageSquarePlus />, label: 'New Chat' },
  { href: '#', icon: <History />, label: 'Chat History' },
  { href: '/projects', icon: <FolderKanban />, label: 'Projects' },
  { href: '#', icon: <Bug />, label: 'Bug Report' },
  { href: '#', icon: <Lightbulb />, label: 'Features Request' },
];


export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialQueryHandled = useRef(false);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query && !initialQueryHandled.current) {
        initialQueryHandled.current = true;
        handleInitialQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInitialQuery = async (query: string) => {
    const userMessage: ChatMessage = { role: 'user', content: query };
    setMessages([userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await continueChat([userMessage]);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = { role: 'assistant', content: "Sorry, I couldn't connect to the AI. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await continueChat(newMessages);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = { role: 'assistant', content: "Sorry, I had trouble processing that. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Link href="/" className="font-headline text-lg font-bold">TECHismust AI</Link>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {sidebarLinks.map(link => (
                            <SidebarMenuItem key={link.label}>
                                <Link href={link.href} className="w-full">
                                    <SidebarMenuButton>
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <main className="flex-1 flex flex-col relative pt-8 md:pt-0">
                    <Particles className="absolute inset-0 -z-10" quantity={50} />
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'assistant' && (
                            <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <Bot size={20} />
                            </div>
                            )}
                            <div className={`max-w-xl w-full p-4 rounded-xl shadow-md ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.role === 'user' && (
                            <div className="flex-shrink-0 size-8 rounded-full bg-muted flex items-center justify-center">
                                <User size={20} />
                            </div>
                            )}
                        </motion.div>
                        ))}
                        {isLoading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-4 justify-start"
                            >
                                <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <Bot size={20} />
                                </div>
                                <div className="max-w-xl w-full p-4 rounded-xl shadow-md bg-card flex items-center gap-2">
                                    <span className="text-muted-foreground">TIM is thinking...</span>
                                    <Loader className="animate-spin text-primary size-4" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {messages.length === 0 && !isLoading && (
                        <div className="text-center text-muted-foreground pt-24">
                            <h2 className="font-headline text-2xl mb-2">Welcome to TECHismust AI Chat</h2>
                            <p>Ask me anything about AI, our projects, or how we can collaborate.</p>
                        </div>
                    )}
                    </div>
                    
                    <div className="sticky bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
                    <form onSubmit={handleSubmit} className="container max-w-3xl mx-auto flex gap-2">
                        <Input
                        type="text"
                        placeholder="Ask TIM AI anything..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        disabled={isLoading}
                        className="h-12 text-base"
                        />
                        <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader className="animate-spin" /> : <Send />}
                        </Button>
                    </form>
                    </div>
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
