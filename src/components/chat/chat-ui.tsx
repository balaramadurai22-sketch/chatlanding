
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Bot,
  Sparkles,
  Search,
  Folder,
  ArrowUpCircle,
  Plus,
  Mic,
  Settings2,
  Paperclip,
  Send,
  User,
  PanelLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface ChatUIProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  handleSendMessage: (e: React.FormEvent) => void;
  setInput: (input: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black delay-0"></span>
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black delay-200"></span>
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black delay-400"></span>
  </div>
);

const PixelLogo = () => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-16 flex flex-col">
            <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-[#FFD15B]"></div>
            </div>
            <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-[#FF9F43]"></div>
                <div className="w-4 h-4 bg-[#FF9F43]"></div>
                <div className="w-4 h-4 bg-[#FF9F43]"></div>
            </div>
            <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-[#FF6B35]"></div>
                <div className="w-4 h-4 bg-[#FF6B35]"></div>
                <div className="w-4 h-4 bg-[#FF6B35]"></div>
                <div className="w-4 h-4 bg-[#FF6B35]"></div>
            </div>
             <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-[#E84A5F]"></div>
                <div className="w-4 h-4 bg-[#E84A5F]"></div>
                <div className="w-4 h-4 bg-[#E84A5F]"></div>
                <div className="w-4 h-4 bg-[#E84A5F]"></div>
                <div className="w-4 h-4 bg-[#E84A5F]"></div>
            </div>
        </div>
    </div>
);


const projects = [
    { name: 'Onboarding intros', time: 'Yesterday' },
    { name: 'Website copy', time: 'Yesterday' },
    { name: 'UX Research', time: 'Previous 7 days' },
    { name: 'Social Media Strategy', time: 'Previous 7 days' },
    { name: 'Q3 Report Analysis', time: 'Previous 30 days' },
];

export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
  setMessages,
}: ChatUIProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const groupedProjects = projects.reduce((acc, project) => {
    const { time } = project;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const sidebarContent = (
    <div className="flex h-full flex-col p-3">
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-md bg-[#D9D9D9]">
                    <AvatarFallback className="bg-transparent text-white font-bold">B</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm text-[#333]">bala</p>
                    <p className="text-xs text-[#888]">Le Chat Free</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:bg-gray-200">
                <Settings2 className="h-4 w-4" />
            </Button>
        </div>

        <nav className="mt-6 flex-1">
            <ul className="space-y-1">
                <li>
                    <a href="#" className="flex items-center gap-3 rounded-md bg-[#F0F0F0] px-3 py-2 text-sm font-medium text-gray-800 border-l-4 border-orange-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                        <Bot className="h-4 w-4" />
                        <span>Agents</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                        <Sparkles className="h-4 w-4" />
                        <span>Intelligence</span>
                        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 text-xs">Beta</Badge>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                        <span className="ml-auto text-xs text-gray-500">Ctrl+K</span>
                    </a>
                </li>
            </ul>

            <div className="mt-8">
                <h3 className="px-3 text-xs font-semibold uppercase text-gray-400">Projects</h3>
                <ul className="mt-2 space-y-1">
                     <li>
                        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                            <Folder className="h-4 w-4" />
                            <span>New project</span>
                        </a>
                    </li>
                    {Object.entries(groupedProjects).map(([time, projects]) => (
                        <React.Fragment key={time}>
                            <li className="px-3 pt-4 pb-1 text-xs italic text-gray-500">{time}</li>
                            {projects.map(p => (
                                <li key={p.name}>
                                     <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 truncate">
                                        <span className="truncate">{p.name}</span>
                                    </a>
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </nav>
        
        <div className="mt-auto">
            <div className="cursor-pointer rounded-lg border bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ArrowUpCircle className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="text-sm text-gray-600">Upgrade to <span className="font-bold text-red-500">Pro</span></p>
                        </div>
                    </div>
                    <div className="h-2 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-[#FAFAFA]">
      {/* Left Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col flex-shrink-0 bg-[#F8F8F8] h-full border-r transition-all duration-300",
        isSidebarOpen ? 'w-[280px]' : 'w-0'
      )}>
        {sidebarContent}
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col items-center overflow-hidden">
        <header className="md:hidden flex items-center justify-between w-full p-2 border-b">
             <Link href="/" className="font-headline text-lg font-bold animated-gradient-text">
                TECHismust AI
              </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
        </header>

        {/* Mobile Sidebar */}
        <AnimatePresence>
        {isSidebarOpen && (
            <motion.div 
              className="md:hidden fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
        )}
        <motion.div 
            className="md:hidden fixed top-0 left-0 h-full w-[280px] bg-[#F8F8F8] z-50"
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? '0%' : '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
           {sidebarContent}
        </motion.div>
        </AnimatePresence>
        
        <main className="flex flex-1 w-full flex-col overflow-y-auto pt-6 pb-24">
          <div className="mx-auto w-full max-w-3xl px-4 flex flex-col h-full">
            {messages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <PixelLogo />
                <p className="mt-4 text-xl font-medium text-gray-700">Le Chat</p>
              </div>
            ) : (
                <>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn('flex items-start gap-3 my-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 flex-shrink-0 border bg-black text-white">
                            <AvatarFallback className="bg-transparent"><Bot size={16} /></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={cn('max-w-[75%] rounded-lg border p-3 text-sm shadow-sm',
                        message.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                     {message.role === 'user' && (
                        <Avatar className="h-8 w-8 flex-shrink-0 border bg-orange-500 text-white">
                            <AvatarFallback className="bg-transparent"><User size={16} /></AvatarFallback>
                        </Avatar>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                     <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 my-3"
                    >
                         <Avatar className="h-8 w-8 flex-shrink-0 border bg-black text-white">
                            <AvatarFallback className="bg-transparent"><Bot size={16} /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg border bg-white p-2 shadow-sm">
                            <TypingIndicator />
                        </div>
                    </motion.div>
                )}
                </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="w-full pb-4 px-4">
          <div className="w-full max-w-3xl mx-auto">
             <div className="relative rounded-xl border bg-white p-2 shadow-md">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 rounded-full bg-orange-500 text-white hover:bg-orange-600">
                        M
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-gray-500 hover:bg-gray-100">
                        <Plus className="h-5 w-5" />
                    </Button>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                        placeholder="Ask Le Chat anything..."
                        className="flex-1 resize-none border-none bg-transparent shadow-none focus-visible:ring-0 text-base"
                        rows={1}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-gray-500 hover:bg-gray-100">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                         <Button
                            type="submit"
                            onClick={handleSendMessage}
                            size="icon"
                            className="h-9 w-9 flex-shrink-0 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-500"
                            disabled={isLoading || !input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
    