'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader, Send, User, Bot } from 'lucide-react';
import { continueChat, type ChatMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></span>
        </div>
    );
}

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const searchParams = useSearchParams();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            handleInitialQuery(query);
        } else {
             setMessages([{ role: 'assistant', content: "Hello! How can I help you today? Ask me anything about AI, our projects, or TECHismust." }]);
        }
    }, [searchParams]);
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isThinking]);


    const handleInitialQuery = async (query: string) => {
        const welcomeMessage: ChatMessage = { role: 'assistant', content: "Hello! How can I help you today?" };
        const userQuery: ChatMessage = { role: 'user', content: query };
        
        setMessages([welcomeMessage, userQuery]);
        setIsThinking(true);
        
        const result = await continueChat([userQuery], userQuery);
        if (result.success && result.response) {
            setMessages(prev => [...prev, result.response]);
        } else {
            setMessages(prev => [...prev, { role: 'assistant', content: "I had an issue processing that. Please try again."}]);
        }
        setIsThinking(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim() || isThinking) return;

        const newMessage: ChatMessage = { role: 'user', content: currentMessage };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setCurrentMessage('');
        setIsThinking(true);

        const result = await continueChat(messages, newMessage);
        if (result.success && result.response) {
            setMessages(prev => [...prev, result.response]);
        } else {
            setMessages(prev => [...prev, { role: 'assistant', content: "I had an issue processing that. Please try again."}]);
        }
        setIsThinking(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 relative">
                <Particles className="absolute inset-0 -z-10" quantity={100} />
                <div className="container max-w-3xl w-full h-[75vh] flex flex-col border rounded-lg bg-card shadow-lg">
                    <div className="p-4 border-b">
                        <h1 className="font-headline text-xl text-center">AI Assistant</h1>
                    </div>
                     <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`max-w-md rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        {msg.content}
                                    </div>
                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><User size={18} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </motion.div>
                            ))}
                             {isThinking && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-start gap-3 justify-start"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-xs rounded-xl px-4 py-3 bg-muted">
                                        <TypingIndicator />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="border-t p-4 bg-background rounded-b-lg">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1"
                                disabled={isThinking}
                            />
                            <Button type="submit" size="icon" disabled={isThinking || !currentMessage.trim()}>
                                {isThinking ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
