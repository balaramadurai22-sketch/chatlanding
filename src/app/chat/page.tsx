
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader, Send, User, Bot, Sparkles } from 'lucide-react';
import { continueChat, type ChatMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1 p-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"></span>
        </div>
    );
}


function ChatPageContent() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const searchParams = useSearchParams();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const isInitialQueryHandled = useRef(false);

    useEffect(() => {
        const query = searchParams.get('query');
        if (query && !isInitialQueryHandled.current) {
            handleInitialQuery(decodeURIComponent(query));
            isInitialQueryHandled.current = true;
        } else if (!messages.length && !isInitialQueryHandled.current) {
             setMessages([{ role: 'assistant', content: "Hello! I am TIM, the TECHismust Intelligent Model. How can I help you explore the future of AI today?" }]);
             isInitialQueryHandled.current = true;
        }
    }, [searchParams, messages.length]);
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isThinking]);


    const handleInitialQuery = async (query: string) => {
        const userQuery: ChatMessage = { role: 'user', content: query };
        
        setMessages([userQuery]);
        setIsThinking(true);
        
        const response = await continueChat([userQuery]);
        setMessages(prev => [...prev, response]);
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

        const response = await continueChat(newMessages);
        setMessages(prev => [...prev, response]);
        setIsThinking(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center pt-20 relative">
                <Particles className="absolute inset-0 -z-10" quantity={100} />
                <div className="container max-w-4xl w-full h-[calc(100vh-10rem)] flex flex-col border rounded-lg bg-card/80 backdrop-blur-sm shadow-2xl">
                    <div className="p-4 border-b flex items-center justify-center gap-2">
                        <Sparkles className="text-primary h-5 w-5" />
                        <h1 className="font-headline text-xl text-center animated-gradient-text">
                          TECHismust Neural Dialogue
                        </h1>
                    </div>
                     <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                                >
                                    {msg.role === 'assistant' && (
                                        <Avatar className="h-8 w-8 border">
                                            <AvatarFallback className="bg-primary/10"><Bot size={18} className="text-primary" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div 
                                        className={cn(
                                            'max-w-xl rounded-xl px-4 py-3 text-sm whitespace-pre-wrap shadow-md', 
                                            msg.role === 'user' 
                                                ? 'bg-primary text-primary-foreground rounded-br-none' 
                                                : 'bg-muted rounded-bl-none'
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8 border">
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
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback className="bg-primary/10"><Bot size={18} className="text-primary" /></AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-xs rounded-xl px-4 py-3 bg-muted rounded-bl-none shadow-md">
                                        <TypingIndicator />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="border-t p-4 bg-background/50 rounded-b-lg">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                placeholder="Ask TIM anything..."
                                className="flex-1 h-12 text-base"
                                disabled={isThinking}
                            />
                            <Button type="submit" size="icon" className="h-12 w-12" disabled={isThinking || !currentMessage.trim()}>
                                {isThinking ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <div className="h-12" /> 
        </div>
    );
}


export default function ChatPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}

