
'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { continueChat, ChatMessage } from '@/app/actions';
import { Send, Loader, User, Bot, MessageSquarePlus, History, FolderKanban, Bug, Lightbulb, Search, Library } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const sidebarLinks = [
  { href: '#', icon: <MessageSquarePlus className="size-4" />, label: 'New Chat' },
  { href: '#', icon: <Search className="size-4" />, label: 'Search Chats' },
  { href: '#', icon: <Library className="size-4" />, label: 'Library' },
  { href: '/projects', icon: <FolderKanban className="size-4" />, label: 'Projects' },
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

  const PageContent = () => (
    <main className="flex-1 flex flex-col relative bg-white dark:bg-[#212121]">
      {messages.length === 0 && !isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Where should we begin?</h1>
            <div className="w-full max-w-2xl mt-8">
                <form onSubmit={handleSubmit} className="relative">
                    <Input
                        type="text"
                        placeholder="Ask anything..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="h-14 w-full rounded-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-6 pr-14 text-base shadow-sm"
                    />
                    <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader className="animate-spin" /> : <Send className="size-5" />}
                    </Button>
                </form>
            </div>
        </div>
      ) : (
        <>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                        <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Bot size={20} />
                        </div>
                        )}
                        <div className={`p-4 rounded-xl shadow-md ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                             <p className="text-xs mt-2 opacity-50">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        {msg.role === 'user' && (
                        <div className="flex-shrink-0 size-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
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
                            className="flex items-start gap-4 max-w-4xl mx-auto justify-start"
                        >
                            <div className="flex-shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <Bot size={20} />
                            </div>
                            <div className="p-4 rounded-xl shadow-md bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                                <span className="text-muted-foreground">TIM is thinking</span>
                                <div className="flex gap-1">
                                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#212121]/80 backdrop-blur-sm border-t dark:border-gray-800">
                <form onSubmit={handleSubmit} className="container max-w-3xl mx-auto flex gap-2">
                    <Input
                    type="text"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                    className="h-12 text-base rounded-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-visible:ring-1"
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0 rounded-full" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader className="animate-spin" /> : <Send />}
                    </Button>
                </form>
            </div>
        </>
      )}
    </main>
  );

  return (
    <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-[#f7f7f8] dark:bg-[#212121]">
            <Sidebar side="left" className="bg-[#f7f7f8] dark:bg-black/10 border-r dark:border-gray-800">
                <SidebarHeader className="border-b dark:border-gray-800">
                    <div className="flex items-center gap-2 h-12">
                        <SidebarTrigger />
                        <Link href="/" className="font-headline text-lg font-bold">TECHismust AI</Link>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {sidebarLinks.map(link => (
                            <SidebarMenuItem key={link.label}>
                                <Link href={link.href} className="w-full">
                                    <SidebarMenuButton className="dark:hover:bg-gray-800">
                                        {link.icon}
                                        <span className="text-sm">{link.label}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarHeader className="border-t dark:border-gray-800 mt-auto">
                    <div className="flex items-center gap-2 h-14">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                             <span className="text-sm font-medium">bala (Free)</span>
                        </div>
                    </div>
                </SidebarHeader>
            </Sidebar>

            <SidebarInset>
                <PageContent />
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}

    