
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
  Paperclip,
  Send,
  User,
  PanelLeft,
  ChevronsRight,
  Infinity,
  Lightbulb,
  Grid,
  Mic,
  Bug,
  Loader,
  Edit,
  Trash,
  Copy,
  MoreVertical,
  X,
  Filter as FilterIcon
} from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

interface ChatUIProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  handleSendMessage: (e: React.FormEvent) => void;
  setInput: (input: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const bugReportSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  stepsToReproduce: z.string().min(10, 'Steps to reproduce are required.'),
  severity: z.enum(['Low', 'Medium', 'High']),
});

type BugReportFormValues = z.infer<typeof bugReportSchema>;

const featureRequestSchema = z.object({
  featureTitle: z.string().min(1, 'Title is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  priority: z.enum(['Low', 'Medium', 'High']),
});

type FeatureRequestFormValues = z.infer<typeof featureRequestSchema>;

const newAgentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  model: z.string().min(1, "Please select a model."),
});

type NewAgentFormValues = z.infer<typeof newAgentSchema>;

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

const agentCategories = ['All', ...Array.from(new Set(initialAgents.flatMap(agent => agent.tags)))];


export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
}: ChatUIProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [isFeatureRequestOpen, setIsFeatureRequestOpen] = useState(false);
  const [isNewAgentOpen, setIsNewAgentOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'agents'>('chat');
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [activeFilter, setActiveFilter] = useState('All');

  const { toast } = useToast();

  const bugReportForm = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: { severity: 'Medium' },
  });
  const featureRequestForm = useForm<FeatureRequestFormValues>({
    resolver: zodResolver(featureRequestSchema),
    defaultValues: { priority: 'Medium' },
  });
  const newAgentForm = useForm<NewAgentFormValues>({
    resolver: zodResolver(newAgentSchema),
  });

  const onBugSubmit: SubmitHandler<BugReportFormValues> = async (data) => {
    console.log('Bug Report:', data);
    await new Promise((res) => setTimeout(res, 1000));
    toast({ title: 'Bug Report Submitted!', description: 'Thank you for your feedback.' });
    bugReportForm.reset();
    setIsBugReportOpen(false);
  };

  const onFeatureSubmit: SubmitHandler<FeatureRequestFormValues> = async (data) => {
    console.log('Feature Request:', data);
    await new Promise((res) => setTimeout(res, 1000));
    toast({ title: 'Feature Request Submitted!', description: 'Thank you for your suggestion.' });
    featureRequestForm.reset();
    setIsFeatureRequestOpen(false);
  };
  
  const onNewAgentSubmit: SubmitHandler<NewAgentFormValues> = async (data) => {
    const newAgent: Agent = {
      id: `agent-${String(agents.length + 1).padStart(3, '0')}`,
      name: data.name,
      description: data.description,
      model: data.model,
      owner: 'current-user',
      status: 'Draft',
      tags: ['New'],
      isActivated: false,
    };
    setAgents(prev => [newAgent, ...prev]);
    toast({ title: 'Agent Created!', description: `${data.name} has been added.` });
    newAgentForm.reset();
    setIsNewAgentOpen(false);
  };

  const toggleAgentActivation = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, isActivated: !agent.isActivated } : agent
    ));
  };
  
  const filteredAgents = activeFilter === 'All' 
    ? agents 
    : agents.filter(agent => agent.tags.includes(activeFilter));


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
          variant={activeView === 'chat' ? 'outline' : 'ghost'}
          onClick={() => setActiveView('chat')}
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white data-[variant=outline]:bg-black data-[variant=outline]:text-white"
        >
          <MessageCircle className="mr-3" /> Chat
        </Button>
        <Button
          variant={activeView === 'agents' ? 'outline' : 'ghost'}
          onClick={() => setActiveView('agents')}
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white data-[variant=outline]:bg-black data-[variant=outline]:text-white"
        >
          <Bot className="mr-3" /> Agents
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white"
        >
          <Sparkles className="mr-3" /> Intelligence
          <Badge variant="secondary" className="ml-auto bg-black text-white">
            Beta
          </Badge>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white"
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
                <Button variant="ghost" className="w-full justify-start font-normal truncate">
                  <Folder className="mr-2 h-4 w-4" />
                  New project idea
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start font-normal truncate">
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
                <Button variant="ghost" className="w-full justify-start font-normal truncate">
                  <Folder className="mr-2 h-4 w-4" />
                  My trip to San Francisco
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-black">
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white"
          onClick={() => setIsBugReportOpen(true)}
        >
          <Bug className="mr-3" /> Bug Report
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-base font-bold border-black hover:bg-black hover:text-white"
          onClick={() => setIsFeatureRequestOpen(true)}
        >
          <Lightbulb className="mr-3" /> Feature Request
        </Button>

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
    // A simple parser for basic markdown
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
        return (
          <code key={index} className="bg-black text-white px-1 py-0.5 rounded-sm">
            {part.substring(1, part.length - 1)}
          </code>
        );
      }
      if (part.startsWith('**')) {
        return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
      }
      if (part.startsWith('*')) {
        return <em key={index}>{part.substring(1, part.length - 1)}</em>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-black underline">
            {linkMatch[1]}
          </a>
        );
      }
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
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
                <div
                  key={i}
                  className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-xl p-4 border border-black rounded-lg',
                      m.role === 'user' ? 'bg-white' : 'bg-white'
                    )}
                  >
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
              <Button
                type="button"
                variant="ghost"
                className="p-2 h-auto rounded-md border-black hover:bg-black hover:text-white"
              >
                <Plus className="w-5 h-5" />
              </Button>

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as any);
                  }
                }}
                placeholder="Ask Le Chat anything..."
                className="flex-1 resize-none border-0 bg-transparent px-4 py-2 text-base focus-visible:ring-0 shadow-none"
              />

              <Button
                type="submit"
                variant="outline"
                className="p-2 h-auto rounded-md border-black bg-black text-white hover:bg-white hover:text-black"
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
  
  const AgentsView = () => (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Agents</h1>
            <Button variant="outline" className="border-black bg-black text-white hover:bg-white hover:text-black" onClick={() => setIsNewAgentOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Agent
            </Button>
        </div>
        <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
                <FilterIcon className="mr-2 h-4 w-4" />
                {agentCategories.map(category => (
                    <Button 
                        key={category}
                        variant={activeFilter === category ? "outline" : "ghost"}
                        onClick={() => setActiveFilter(category)}
                        className={cn(
                            "border-black",
                            activeFilter === category ? "bg-black text-white" : "bg-white text-black"
                        )}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map(agent => (
                <Dialog key={agent.id}>
                    <DialogTrigger asChild>
                        <div className="border border-black rounded-lg p-4 flex flex-col cursor-pointer hover:bg-black/5 transition-colors duration-200">
                          <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-lg mb-1 pr-2">{agent.name}</h3>
                              <Switch 
                                checked={agent.isActivated}
                                onCheckedChange={(checked) => {
                                    // Prevent dialog from opening when switch is clicked
                                    const e = window.event as any;
                                    e.stopPropagation();
                                    toggleAgentActivation(agent.id)
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                          </div>
                          <p className="text-sm text-black/70 flex-grow">{agent.description}</p>
                          <div className="flex flex-wrap gap-1 mt-4">
                              {agent.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="border-black text-black">{tag}</Badge>
                              ))}
                          </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black border-black sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="font-bold text-xl">{agent.name}</DialogTitle>
                            <DialogDescription className="text-black/70">{agent.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Status</span>
                                <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'} className={cn(agent.status === 'Active' ? "bg-green-600" : "bg-gray-500", "text-white")}>{agent.status}</Badge>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-1">Model</h4>
                                <p className="text-sm p-2 border border-black rounded-md bg-black/5">{agent.model}</p>
                            </div>
                             <div>
                                <h4 className="text-sm font-medium mb-1">Owner</h4>
                                <p className="text-sm p-2 border border-black rounded-md bg-black/5">{agent.owner}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-1">Tags</h4>
                                <div className="flex flex-wrap gap-1">
                                    {agent.tags.map(tag => <Badge key={tag} variant="outline" className="border-black">{tag}</Badge>)}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="border-black hover:bg-black hover:text-white">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
    </main>
  );


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

       {/* Modals */}
      <Dialog open={isBugReportOpen} onOpenChange={setIsBugReportOpen}>
        <DialogContent
          className="bg-white text-black border-black"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
           <DialogClose asChild>
            <button className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
           </DialogClose>
          <DialogHeader>
            <DialogTitle className="font-bold text-black">Submit a Bug Report</DialogTitle>
            <DialogDescription className="text-black/80">
              Help us improve by reporting any issues you encounter.
            </DialogDescription>
          </DialogHeader>
          <Form {...bugReportForm}>
            <form onSubmit={bugReportForm.handleSubmit(onBugSubmit)} className="space-y-4">
              <FormField
                control={bugReportForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="e.g., UI glitch on chat page"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={bugReportForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="Describe the bug in detail..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={bugReportForm.control}
                name="stepsToReproduce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Steps to Reproduce</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="1. Go to '...'\n2. Click on '...'\n3. See error"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={bugReportForm.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Severity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-black bg-white text-black">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-black bg-white text-black">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full bg-white text-black border-black hover:bg-black hover:text-white"
                  disabled={bugReportForm.formState.isSubmitting}
                >
                  {bugReportForm.formState.isSubmitting ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}{' '}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isFeatureRequestOpen} onOpenChange={setIsFeatureRequestOpen}>
        <DialogContent
          className="bg-white text-black border-black"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogClose asChild>
            <button className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="font-bold text-black">Request a Feature</DialogTitle>
            <DialogDescription className="text-black/80">
              Have an idea for a new feature? Let us know!
            </DialogDescription>
          </DialogHeader>
          <Form {...featureRequestForm}>
            <form onSubmit={featureRequestForm.handleSubmit(onFeatureSubmit)} className="space-y-4">
              <FormField
                control={featureRequestForm.control}
                name="featureTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Feature Title</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="e.g., Add dark mode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={featureRequestForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="Describe the feature and why it would be useful..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={featureRequestForm.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-black bg-white text-black">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-black bg-white text-black">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full bg-white text-black border-black hover:bg-black hover:text-white"
                  disabled={featureRequestForm.formState.isSubmitting}
                >
                  {featureRequestForm.formState.isSubmitting ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}{' '}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isNewAgentOpen} onOpenChange={setIsNewAgentOpen}>
        <DialogContent
          className="bg-white text-black border-black"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogClose asChild>
           <button className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="font-bold text-black">Create a New Agent</DialogTitle>
            <DialogDescription className="text-black/80">
              Configure and launch a new autonomous agent.
            </DialogDescription>
          </DialogHeader>
          <Form {...newAgentForm}>
            <form onSubmit={newAgentForm.handleSubmit(onNewAgentSubmit)} className="space-y-4">
              <FormField
                control={newAgentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Agent Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="e.g., Daily Report Generator"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={newAgentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-black bg-white text-black placeholder:text-black/50"
                        placeholder="Describe what this agent does..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={newAgentForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-bold">Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-black bg-white text-black">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-black bg-white text-black">
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full bg-white text-black border-black hover:bg-black hover:text-white"
                  disabled={newAgentForm.formState.isSubmitting}
                >
                  {newAgentForm.formState.isSubmitting ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}{' '}
                  Create Agent
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

    