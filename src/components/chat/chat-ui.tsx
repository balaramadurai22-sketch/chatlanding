
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MessageSquare,
  History,
  LayoutGrid,
  Bug,
  Lightbulb,
  Send,
  Bot,
  User,
  PanelLeft,
  Settings,
  LogOut,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/app/actions';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sidebarVariants = {
    open: { width: '280px', transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const topNavItems = [
    { icon: <Plus className="h-4 w-4" />, text: 'New Chat', action: () => setMessages([]) },
    { icon: <LayoutGrid className="h-4 w-4" />, text: 'Projects', href: '/projects' },
    { icon: <History className="h-4 w-4" />, text: 'Chat History' },
  ];

  const bottomNavItems = [
    { icon: <Bug className="h-4 w-4" />, text: 'Bug Report' },
    { icon: <Lightbulb className="h-4 w-4" />, text: 'Features Request' },
  ];

  const SidebarNavItem = ({ item }: {item: {icon: React.ReactNode, text: string, action?: () => void, href?: string}}) => {
    const content = (
      <div
        className={cn(
          'w-full flex items-center gap-3 p-3 rounded-lg border border-black bg-white text-black shadow-sm transition-all hover:bg-black hover:text-white cursor-pointer',
          !isSidebarOpen && 'justify-center'
        )}
      >
        {item.icon}
        <span className={cn('font-medium', !isSidebarOpen && 'hidden')}>{item.text}</span>
      </div>
    );
    
    const buttonOrLink = item.href ? (
        <Link href={item.href} className="w-full text-left">{content}</Link>
    ) : (
        <button onClick={item.action} className="w-full text-left">{content}</button>
    );

    return buttonOrLink;
  };

  return (
    <div className="flex h-screen w-screen bg-white text-black">
      {/* Left Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="hidden md:flex flex-col flex-shrink-0 bg-white h-full border-r border-black/20"
      >
        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 h-10">
            <Link
              href="/"
              className={cn(
                'text-lg font-bold text-black transition-opacity duration-300 whitespace-nowrap',
                !isSidebarOpen && 'opacity-0'
              )}
            >
              TECHismust Chat
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-black/10 text-black"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            {/* Top Section */}
            <nav className="space-y-2">
              {topNavItems.map((item, index) => <SidebarNavItem key={index} item={item} />)}
            </nav>

            {/* Bottom Section */}
            <div className="space-y-2">
              {bottomNavItems.map((item, index) => <SidebarNavItem key={index} item={item} />)}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-3 p-3 h-auto rounded-lg border border-black bg-white text-black shadow-sm hover:bg-black hover:text-white">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/bala/100/100" />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div className={cn("flex flex-col items-start", !isSidebarOpen && 'hidden')}>
                      <span className="text-sm font-semibold">Bala</span>
                      <span className="text-xs text-black/60">Free</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="bg-white border-black/20 text-black">
                  <DropdownMenuItem className="focus:bg-black/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-black/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col items-center overflow-hidden">
        <main className="flex flex-1 w-full overflow-y-auto pt-6 pb-24">
          <div className="mx-auto w-full max-w-3xl px-4 flex flex-col">
            <AnimatePresence initial={false}>
              {messages.length === 0 && !isLoading ? (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full"
                >
                  <div className="mb-4 rounded-full bg-black/10 p-4 border border-black/20">
                    <Bot size={32} className="text-black" />
                  </div>
                  <h1 className="text-2xl font-semibold">Where should we begin?</h1>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'flex items-start gap-3 w-full my-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 flex-shrink-0 border border-black/20">
                        <AvatarFallback className="bg-transparent text-black">
                          <Bot size={16} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-[75%] rounded-2xl p-3 text-sm shadow-sm border',
                        message.role === 'user'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/20'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                         <AvatarFallback className="bg-black text-white">
                          <User size={16} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 my-3"
              >
                <Avatar className="h-8 w-8 flex-shrink-0 border border-black/20">
                  <AvatarFallback className="bg-transparent text-black">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl bg-black/5 p-3 border border-black/20 shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="w-full pb-4 px-4">
          <div className="w-full max-w-3xl mx-auto">
            <form
              onSubmit={handleSendMessage}
              className="relative flex items-center"
            >
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
                className="w-full resize-none rounded-2xl border border-black/30 bg-white py-3 px-4 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-black/60"
                rows={1}
                style={{ minHeight: '52px' }}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg flex items-center justify-center bg-black text-white hover:bg-gray-800 disabled:bg-gray-600"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}
  
