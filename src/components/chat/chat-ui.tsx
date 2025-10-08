
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Bot,
  Sparkles,
  Search,
  Folder,
  Plus,
  Settings2,
  Send,
  User,
  PanelLeft,
  ChevronsRight,
  Infinity,
  Lightbulb,
  Grid,
  Bug,
  Loader,
  Edit,
  Trash,
  Copy,
  MoreVertical,
  X,
  Filter as FilterIcon,
  Pin,
  PinOff,
  Heart,
  Users as UsersIcon,
  Star,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { agents as initialAgents, Agent } from '@/lib/agents-data';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    <div className="w-16 h-16 flex items-center justify-center">
        <div className="w-12 h-12 relative">
            <div className="w-4 h-4 bg-black absolute bottom-0 left-0"></div>
            <div className="w-4 h-4 bg-black absolute bottom-0 left-4"></div>
            <div className="w-4 h-4 bg-black absolute bottom-0 left-8"></div>
            <div className="w-4 h-4 bg-black absolute bottom-4 left-4"></div>
        </div>
    </div>
);

const newAgentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  task: z.string().min(3, 'Task/Role is required.'),
  tools: z.string().optional(),
  memory: z.string().optional(),
});
type NewAgentFormValues = z.infer<typeof newAgentSchema>;


export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
}: ChatUIProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'agents'>('chat');
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  
  const { toast } = useToast();

  const newAgentForm = useForm<NewAgentFormValues>({
    resolver: zodResolver(newAgentSchema),
  });

  const onAddNewAgent: SubmitHandler<NewAgentFormValues> = (data) => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: data.name,
      description: data.description,
      owner: 'current_user',
      status: 'Draft',
      tags: data.task.split(',').map(t => t.trim()),
      model: 'gpt-4o-mini',
      isActivated: false,
      pinned: false,
      peopleUsed: 0,
      likes: 0,
      creator: { name: 'You', social: '#' },
      purpose: data.task,
      category: data.task.split(',')[0]?.trim() || 'General',
    };
    setAgents(prev => [newAgent, ...prev]);
    toast({ title: 'Agent Created!', description: `${data.name} has been added.` });
    newAgentForm.reset();
  };
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-black p-4 border-r border-black">
      <div className="flex items-center gap-3 p-2 border border-black rounded-md">
        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        <div>
          <p className="font-bold">bala</p>
          <p className="text-sm">Le Chat Free</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hover:bg-black hover:text-white border border-transparent hover:border-black"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        <Button
          variant={activeView === 'chat' ? 'default' : 'ghost'}
          onClick={() => setActiveView('chat')}
          className="w-full justify-start text-base font-bold border border-black hover:bg-black hover:text-white data-[variant=default]:bg-black data-[variant=default]:text-white"
        >
          <MessageCircle className="mr-3" /> Chat
        </Button>
        <Button
          variant={activeView === 'agents' ? 'default' : 'ghost'}
          onClick={() => setActiveView('agents')}
          className="w-full justify-start text-base font-bold border border-black hover:bg-black hover:text-white data-[variant=default]:bg-black data-[variant=default]:text-white"
        >
          <Bot className="mr-3" /> Agents
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border border-black hover:bg-black hover:text-white"
        >
          <Sparkles className="mr-3" /> Intelligence
          <Badge variant="secondary" className="ml-auto bg-black text-white">
            Beta
          </Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border border-black hover:bg-black hover:text-white"
        >
          <Search className="mr-3" /> Search
          <span className="ml-auto text-xs opacity-60">Ctrl+K</span>
        </Button>
      </nav>

      <div className="mt-8 flex-grow overflow-y-auto">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Projects</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase text-black/60 mb-2">Yesterday</p>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start font-normal truncate border border-black">
                  <Folder className="mr-2 h-4 w-4" />
                  New project idea
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start font-normal truncate border border-black">
                  <Folder className="mr-2 h-4 w-4" />
                  Genkit introduction
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-black/60 mb-2">Previous 7 days</p>
            <ul className="space-y-1">
              <li>
                <Button variant="ghost" className="w-full justify-start font-normal truncate border border-black">
                  <Folder className="mr-2 h-4 w-4" />
                  My trip to San Francisco
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-black">
        {/* The "Upgrade to Pro" section is preserved as requested. */}
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 mt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Sparkles className="text-orange-500" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700">
                    Upgrade to <span className="font-bold text-red-600">Pro</span>
                    </p>
                </div>
                </div>
                <div className="w-10 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\`{3}[\s\S]*?\`{3}|\`.*?\`|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.substring(3, part.length - 3);
        return (
          <pre key={index} className="bg-black text-white p-4 rounded-md my-2 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        );
      }
      if (part.startsWith('`')) {
        return <code key={index} className="bg-black text-white px-1 py-0.5 rounded-sm">{part.substring(1, part.length - 1)}</code>;
      }
      if (part.startsWith('**')) {
        return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
      }
      if (part.startsWith('*')) {
        return <em key={index}>{part.substring(1, part.length - 1)}</em>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-black underline">{linkMatch[1]}</a>;
      }
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>{line}{lineIndex < part.split('\n').length - 1 && <br />}</React.Fragment>
      ));
    });
  };

  const ChatView = () => (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto h-full">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <PixelLogo />
              <h1 className="text-2xl font-bold mt-6">Ask Le Chat anything</h1>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-xl p-4 border border-black rounded-lg', m.role === 'user' ? 'bg-white' : 'bg-white')}>
                    {m.role !== 'user' && <div className="font-bold mb-2">Assistant</div>}
                    <div className="text-base break-words">{renderMessageContent(m.content)}</div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="max-w-xl p-4 border border-black rounded-lg bg-white">
                    <div className="font-bold mb-2">Assistant</div>
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 md:p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="relative">
            <div className="relative flex items-center p-2 border border-black rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-black">
              <Button type="button" variant="ghost" className="p-2 h-auto rounded-md border-black hover:bg-black hover:text-white">
                <Plus className="w-5 h-5" />
              </Button>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e as any); }}}
                placeholder="Ask Le Chat anything..."
                className="flex-1 resize-none border-0 bg-transparent px-4 py-2 text-base focus-visible:ring-0 shadow-none"
              />
              <Button type="submit" variant="outline" className="p-2 h-auto rounded-md border-black bg-black text-white hover:bg-white hover:text-black" disabled={isLoading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </footer>
    </>
  );

  const AgentsView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const allCategories = ['All', ...Array.from(new Set(agents.flatMap(a => a.tags)))];

    const filteredAgents = agents.filter(agent => {
        const categoryMatch = activeCategory === 'All' || agent.tags.includes(activeCategory);
        const searchMatch = searchTerm === '' || 
            agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return categoryMatch && searchMatch;
    });

    const pinnedAgents = filteredAgents.filter(a => a.pinned);
    const unpinnedAgents = filteredAgents.filter(a => !a.pinned);

    const toggleActivation = (id: string) => {
      setAgents(agents.map(a => a.id === id ? { ...a, isActivated: !a.isActivated } : a));
    };

    const togglePin = (id: string) => {
        setAgents(agents.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
    };

    const AgentCard = ({ agent }: { agent: Agent }) => (
      <Dialog>
        <DialogTrigger asChild>
            <motion.div 
                className="border border-black rounded-lg p-4 flex flex-col aspect-square justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer bg-white"
                layout
            >
                <div>
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg mb-1 pr-2">{agent.name}</h3>
                        <Switch checked={agent.isActivated} onCheckedChange={() => toggleActivation(agent.id)} />
                    </div>
                    <p className="text-xs text-black/60 font-semibold uppercase">How it works</p>
                    <p className="text-sm text-black/70 flex-grow line-clamp-2 mt-1">{agent.description}</p>
                </div>
                <div className="flex flex-col gap-2 mt-4 text-xs">
                    <div className="flex items-center gap-1">
                        <Bot className="h-3 w-3" />
                        <span className="font-semibold">Model:</span>
                        <span>{agent.model}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <UsersIcon className="h-3 w-3" />
                        <span className="font-semibold">Used by:</span>
                        <span>{agent.peopleUsed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span className="font-semibold">Likes:</span>
                        <span>{agent.likes}</span>
                    </div>
                     <div className="flex flex-wrap gap-1 mt-1">
                        {agent.tags.slice(0,2).map(tag => (
                            <Badge key={tag} variant="outline" className="border-black text-black">{tag}</Badge>
                        ))}
                    </div>
                </div>
            </motion.div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-bold text-2xl">{agent.name}</DialogTitle>
                <DialogDescription>
                    Created by: <a href={agent.creator.social} target="_blank" rel="noopener noreferrer" className="underline">{agent.creator.name}</a>
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <p className="font-semibold">Full Description:</p>
                <p>{agent.description}</p>
                 <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">Donate to Creator</Button>
            </div>
        </DialogContent>
      </Dialog>
    );

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col bg-white">
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Agents</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-black bg-black text-white hover:bg-white hover:text-black transition-colors">
                                <Plus className="mr-2 h-4 w-4" /> Add New Agent
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a New Agent</DialogTitle>
                            </DialogHeader>
                            <Form {...newAgentForm}>
                                <form onSubmit={newAgentForm.handleSubmit(onAddNewAgent)} className="space-y-4">
                                     <FormField control={newAgentForm.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel>Agent Name</FormLabel><FormControl><Input placeholder="e.g., Meeting Summarizer" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={newAgentForm.control} name="description" render={({ field }) => (
                                        <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="What does this agent do?" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={newAgentForm.control} name="task" render={({ field }) => (
                                        <FormItem><FormLabel>Task/Role (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., Summarization, Productivity" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={newAgentForm.control} name="tools" render={({ field }) => (
                                        <FormItem><FormLabel>Allowed Tools (Optional)</FormLabel><FormControl><Input placeholder="e.g., Calendar API" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={newAgentForm.control} name="memory" render={({ field }) => (
                                        <FormItem><FormLabel>Memory/Context (Optional)</FormLabel><FormControl><Input placeholder="e.g., Last 5 interactions" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <DialogFooter>
                                        <Button type="submit" className="bg-black text-white hover:bg-gray-800">Create Agent</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
                    <Input placeholder="Search agents..." className="pl-10 w-full border-black" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md mt-4">
                    <div className="flex w-max space-x-2 pb-2">
                        {allCategories.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className="border-black data-[variant=default]:bg-black data-[variant=default]:text-white"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
                 {pinnedAgents.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-4">Pinned Agents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                           {pinnedAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
                        </div>
                    </div>
                 )}
               <div>
                 <h2 className="text-sm font-bold uppercase tracking-wider mb-4">All Agents</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unpinnedAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
                  </div>
               </div>
            </div>
        </main>
    );
  }

  return (
    <>
      <div className="flex h-screen w-full bg-white text-black font-sans">
        {isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="fixed top-4 left-4 z-20 bg-white border border-black hover:bg-black hover:text-white"
            >
              <PanelLeft />
            </Button>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed inset-0 z-40"
                  style={{ width: '80%' }}
                >
                  <SidebarContent />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 z-50 bg-white border border-black hover:bg-black hover:text-white"
                  >
                    <ChevronsRight />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {!isMobile && (
          <div className="w-[300px] flex-shrink-0">
            <SidebarContent />
          </div>
        )}

        <div className="flex flex-1 flex-col">
            {activeView === 'chat' ? <ChatView /> : <AgentsView />}
        </div>
      </div>
    </>
  );
}
