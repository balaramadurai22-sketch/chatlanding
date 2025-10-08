
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Bot,
  Sparkles,
  Search,
  Folder,
  ArrowUpCircle,
  Plus,
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
                <div className="w-4 h-4 bg-black"></div>
            </div>
            <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
            </div>
            <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
            </div>
             <div className="flex justify-center h-4">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black">