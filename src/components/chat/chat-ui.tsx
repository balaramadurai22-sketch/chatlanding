
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Bot,
  Sparkles,
  Search,
  Plus,
  Settings2,
  Send,
  User,
  PanelLeft,
  ChevronsRight,
  Bug,
  Lightbulb,
  X,
  Star,
  Users,
  BrainCircuit,
  Tag,
  Rocket,
  Pin,
  PinOff,
  MoreVertical,
  Trash2,
  Copy,
  Edit,
  Heart,
  Twitter,
  Github,
  Linkedin,
  Filter,
  Code,
  LineChart,
  Palette,
} from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Switch } from '../ui/switch';
import { agents as initialAgents, Agent } from '@/lib/agents-data';


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
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center">
        <div className="w-6 h-6 relative">
          <div className="w-2 h-2 bg-black absolute bottom-0 left-0"></div>
          <div className="w-2 h-2 bg-black absolute bottom-0 left-2"></div>
          <div className="w-2 h-2 bg-black absolute bottom-0 left-4"></div>
          <div className="w-2 h-2 bg-black absolute bottom-2 left-2"></div>
        </div>
      </div>
      <span className="font-bold text-lg">Le Chat</span>
    </Link>
);


const bugReportSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  steps: z.string().min(1, 'Steps to reproduce are required.'),
  severity: z.enum(['Low', 'Medium', 'High']),
});
type BugReportFormValues = z.infer<typeof bugReportSchema>;

const featureRequestSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  priority: z.enum(['Low', 'Medium', 'High']),
});
type FeatureRequestFormValues = z.infer<typeof featureRequestSchema>;

const newAgentSchema = z.object({
  name: z.string().min(3, "Agent name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.string().min(1, "Category is required."),
  model: z.string().min(1, "Model is required."),
  purpose: z.string().min(10, "Purpose must be at least 10 characters."),
});
type NewAgentFormValues = z.infer<typeof newAgentSchema>;


const AgentCard = ({ agent, onToggle, onPin }: { agent: Agent, onToggle: (id: string) => void, onPin: (id: string) => void }) => {
    
const getSymbolicVisual = (category: string) => {
    const animationProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, ease: 'easeInOut' },
    };

    switch (category) {
      case 'Coding':
        return (
          <motion.div {...animationProps} className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-black h-[1px]"
                  style={{
                    top: `${i * 10}%`,
                    width: `${Math.random() * 40 + 10}%`,
                    left: `${Math.random() * 50}%`,
                  }}
                  initial={{ x: '-110%' }}
                  animate={{ x: '110%' }}
                  transition={{
                    duration: Math.random() * 4 + 4,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        );
      case 'Analysis':
        return (
          <motion.div {...animationProps} className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
            <LineChart size={120} className="text-black/5 absolute -rotate-12" strokeWidth={0.5} />
            <motion.div
                className="absolute bottom-4 left-4 right-4 h-1/2"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full border border-black/10 rounded-md p-1">
                    <div className="w-full h-full bg-gradient-to-t from-black/5 to-transparent rounded-sm"/>
                </div>
            </motion.div>
          </motion.div>
        );
      case 'Creative':
        return (
           <motion.div {...animationProps} className="absolute inset-0 overflow-hidden">
             <Palette size={120} className="text-black/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12" strokeWidth={0.5} />
               {Array.from({ length: 5 }).map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute rounded-full border border-black/10"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: 'circOut',
                        delay: Math.random() * 3
                    }}
                 />
               ))}
           </motion.div>
        );
      default:
        return (
          <motion.div {...animationProps} className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <Bot size={120} className="text-black/5 absolute" strokeWidth={0.5} />
             {Array.from({ length: 10 }).map((_, i) => (
                <motion.circle
                    key={i}
                    cx={Math.random() * 100 + '%'}
                    cy={Math.random() * 100 + '%'}
                    r={Math.random() * 2 + 1}
                    className="absolute fill-black/10"
                    animate={{
                        x: [0, Math.random() * 20 - 10, 0],
                        y: [0, Math.random() * 20 - 10, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut'
                    }}
                 />
             ))}
          </motion.div>
        );
    }
  };
    
    return (
    <Dialog>
        <DialogTrigger asChild>
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square w-full bg-white border border-black rounded-lg p-4 flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
            >
                <div className="absolute inset-0 -z-10">{getSymbolicVisual(agent.category)}</div>
                
                {/* Top Section */}
                <div className="z-10">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg truncate mr-2">{agent.name}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                           <div className={cn("w-2 h-2 rounded-full transition-colors", agent.active ? 'bg-green-500' : 'bg-red-500')}></div>
                           <Switch checked={agent.active} onCheckedChange={() => onToggle(agent.id)} className="h-5 w-9" />
                        </div>
                    </div>
                     <div className="flex items-center gap-4 text-xs mt-1 text-black/70">
                         <Badge variant="outline" className="text-xs font-normal">{agent.model}</Badge>
                         <Badge variant="outline" className="text-xs font-normal">{agent.category}</Badge>
                     </div>
                </div>

                {/* Bottom Section */}
                <div className="z-10">
                    <p className="text-xs text-black/70 mb-2 line-clamp-2 h-8">{agent.purpose}</p>
                    <div className="flex justify-between items-center text-xs text-black/60">
                        <div className="flex items-center gap-1">
                            <Users size={12} /> 
                            <span>{(agent.peopleUsed / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart size={12} />
                            <span>{(agent.likes / 1000).toFixed(1)}k</span>
                        </div>
                    </div>
                </div>

                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onPin(agent.id); }} className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    {agent.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                </Button>

            </motion.div>
        </DialogTrigger>
         <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{agent.name}</DialogTitle>
                <DialogDescription>
                    {agent.purpose}
                </DialogDescription>
            </DialogHeader>
             <div className="my-4">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-black">
                     <Image src={agent.creator.imageUrl} alt={agent.creator.name} width={48} height={48} className="rounded-full border-2 border-black" />
                     <div>
                         <p className="font-semibold">{agent.creator.name}</p>
                         <div className="flex items-center gap-3 mt-1">
                             <a href={agent.creator.social.x} target="_blank" rel="noopener noreferrer"><Twitter size={16} /></a>
                             <a href={agent.creator.social.github} target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
                             <a href={agent.creator.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
                         </div>
                     </div>
                </div>
                 <p className="text-sm text-black/80 mb-4">{agent.description}</p>
                 <div className="flex justify-between text-sm">
                    <span>Model: <Badge variant="secondary">{agent.model}</Badge></span>
                    <span>Category: <Badge variant="secondary">{agent.category}</Badge></span>
                 </div>
             </div>
             <DialogFooter className="flex-col items-start gap-4">
                 <p className="font-semibold">Support the Creator</p>
                 <div className="flex w-full gap-2">
                    <Input type="number" placeholder="Amount ($)" className="border-black" />
                    <Button className="bg-black text-white">Donate</Button>
                 </div>
             </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}

const AgentsView = () => {
    const [agents, setAgents] = React.useState<Agent[]>(initialAgents);
    const [filter, setFilter] = React.useState('All');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isAddAgentOpen, setAddAgentOpen] = React.useState(false);
    const { toast } = useToast();
    
    const categories = ['All', ...Array.from(new Set(initialAgents.map(a => a.category)))];

    const filteredAgents = agents.filter(agent => {
        const categoryMatch = filter === 'All' || agent.category === filter;
        const searchMatch = searchTerm === '' || 
            agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.category.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const pinnedAgents = filteredAgents.filter(a => a.pinned);
    const unpinnedAgents = filteredAgents.filter(a => !a.pinned);

    const handleToggle = (id: string) => {
        setAgents(agents.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };
    
    const handlePin = (id: string) => {
        setAgents(agents.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
    };
    
    const addAgentForm = useForm<NewAgentFormValues>({ resolver: zodResolver(newAgentSchema) });

    const onAddAgentSubmit: SubmitHandler<NewAgentFormValues> = (data) => {
        const newAgent: Agent = {
            id: `agent-${Date.now()}`,
            active: true,
            pinned: false,
            name: data.name,
            description: data.description,
            model: data.model,
            category: data.category as any,
            purpose: data.purpose,
            peopleUsed: 0,
            likes: 0,
            creator: { 
                name: 'New User',
                imageUrl: 'https://picsum.photos/seed/newuser/100/100',
                profileUrl: '#',
                social: { x: '#', github: '#', linkedin: '#' }
            }
        };
        setAgents(prev => [newAgent, ...prev]);
        addAgentForm.reset();
        setAddAgentOpen(false);
        toast({ title: 'Agent Added!', description: `${data.name} has been added to your agents.` });
    };

    return (
        <div className="flex flex-col h-full bg-white p-4 md:p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Agents</h1>
                    <Button onClick={() => setAddAgentOpen(true)}><Plus className="mr-2 h-4 w-4"/>Add New Agent</Button>
                </div>
                 <div className="mt-4 flex items-center gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
                        <Input 
                            placeholder="Search by name, model, or category..." 
                            className="pl-10 border-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                 </div>
                 <div className="mt-4 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2">
                        {categories.map(cat => (
                            <Button key={cat} variant={filter === cat ? 'default' : 'outline'} size="sm" onClick={() => setFilter(cat)}>
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {pinnedAgents.length > 0 && (
                        <div className="mb-8">
                            <h2 className="font-bold text-sm uppercase text-black/60 mb-2">Pinned</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {pinnedAgents.map(agent => <AgentCard key={agent.id} agent={agent} onToggle={handleToggle} onPin={handlePin}/>)}
                            </div>
                        </div>
                    )}
                    <div>
                         <h2 className="font-bold text-sm uppercase text-black/60 mb-2">All Agents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {unpinnedAgents.map(agent => <AgentCard key={agent.id} agent={agent} onToggle={handleToggle} onPin={handlePin}/>)}
                        </div>
                    </div>
                </AnimatePresence>
            </div>
             <Dialog open={isAddAgentOpen} onOpenChange={setAddAgentOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>
                    Create a new AI agent to handle specific tasks and workflows.
                  </DialogDescription>
                </DialogHeader>
                 <Form {...addAgentForm}>
                    <form onSubmit={addAgentForm.handleSubmit(onAddAgentSubmit)} className="space-y-4">
                        <FormField name="name" control={addAgentForm.control} render={({ field }) => (
                            <FormItem><FormLabel>Agent Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Code Reviewer" className="border-black" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField name="description" control={addAgentForm.control} render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="A detailed description of what this agent does." className="border-black" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField name="purpose" control={addAgentForm.control} render={({ field }) => (
                            <FormItem><FormLabel>Purpose / "How it works"</FormLabel><FormControl><Input {...field} placeholder="e.g., Analyzes pull requests for style issues." className="border-black" /></FormControl><FormMessage /></FormItem>
                        )} />
                         <div className="grid grid-cols-2 gap-4">
                            <FormField name="category" control={addAgentForm.control} render={({ field }) => (
                                <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} placeholder="e.g., Coding" className="border-black" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField name="model" control={addAgentForm.control} render={({ field }) => (
                                <FormItem><FormLabel>Model</FormLabel><FormControl><Input {...field} placeholder="e.g., GPT-4" className="border-black" /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-black text-white">Create Agent</Button>
                        </DialogFooter>
                    </form>
                 </Form>
              </DialogContent>
            </Dialog>
        </div>
    );
}

export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
  setMessages,
}: ChatUIProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState('chat'); // 'chat' or 'agents'
  const { toast } = useToast();

  const bugReportForm = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: { severity: 'Medium' },
  });
  const featureRequestForm = useForm<FeatureRequestFormValues>({
    resolver: zodResolver(featureRequestSchema),
    defaultValues: { priority: 'Medium' },
  });

  const onBugReportSubmit: SubmitHandler<BugReportFormValues> = data => {
    console.log('Bug Report:', data);
    toast({ title: 'Bug Report Submitted!', description: 'Thank you for your feedback.' });
    bugReportForm.reset();
  };

  const onFeatureRequestSubmit: SubmitHandler<FeatureRequestFormValues> = data => {
    console.log('Feature Request:', data);
    toast({ title: 'Feature Request Submitted!', description: 'Thank you for your suggestion.' });
    featureRequestForm.reset();
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
          <Search className="mr-3" /> Search
          <span className="ml-auto text-xs opacity-60">Ctrl+K</span>
        </Button>
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-black">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sm font-bold border border-black hover:bg-black hover:text-white">
              <Bug className="mr-3 h-4 w-4" /> Bug Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Submit a Bug Report</DialogTitle>
            </DialogHeader>
            <Form {...bugReportForm}>
              <form onSubmit={bugReportForm.handleSubmit(onBugReportSubmit)} className="space-y-4">
                <FormField name="title" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="description" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="steps" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Steps to Reproduce</FormLabel><FormControl><Textarea {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="severity" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Severity</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="border-black"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" className="bg-black text-white">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sm font-bold border border-black hover:bg-black hover:text-white">
              <Lightbulb className="mr-3 h-4 w-4" /> Feature Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Request a Feature</DialogTitle>
            </DialogHeader>
            <Form {...featureRequestForm}>
              <form onSubmit={featureRequestForm.handleSubmit(onFeatureRequestSubmit)} className="space-y-4">
                <FormField name="title" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Feature Title</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="description" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="priority" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Priority</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="border-black"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit" className="bg-black text-white">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                {activeView === 'chat' ? <ChatView /> : <AgentsView />}
              </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </>
  );
}
