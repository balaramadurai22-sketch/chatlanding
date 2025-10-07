
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
import type { ChatMessage } from '@/app/actions';

interface ChatUIProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  handleSendMessage: (e: React.FormEvent) => void;
  setInput: (input: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
  setMessages,
}: ChatUIProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-white">
        {/* Left Sidebar */}
        <Sidebar className="flex-shrink-0 w-72 bg-white border-r">
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 p-4">
              <Link
                href="/"
                className="text-xl font-bold font-inter text-gray-900"
              >
                TECHismust Chat
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent className="border-b">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setMessages([])}
                  tooltip="Start a new chat"
                >
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
            <div className="flex items-center gap-3 p-4">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/bala/100/100" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  Bala
                </span>
                <span className="text-xs text-gray-500">Free</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Chat Area */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-sm px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden">
                <PanelLeft />
              </SidebarTrigger>
              <h2 className="text-lg font-semibold">AI Conversational Assistant</h2>
            </div>
          </header>

          {/* Chat Messages */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col space-y-6">
              {messages.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center text-center mt-20">
                  <Bot size={48} className="mb-4 text-black" />
                  <h1 className="text-2xl font-bold">TECHismust Chat</h1>
                  <p className="text-gray-500 mt-2">
                    Ask me anything to get started.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 w-full ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot size={16} />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-prose rounded-lg p-3 text-sm ${
                        message.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-white border'
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User size={16} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-1 rounded-lg bg-white p-3 border">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-200"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-400"></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* Input */}
          <footer className="border-t bg-white/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl mx-auto">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
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
                  className="w-full resize-none rounded-full border border-gray-300 py-2 px-4 pr-20 focus:outline-none focus:ring-2 focus:ring-black"
                  rows={1}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 h-10 w-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-gray-800"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
