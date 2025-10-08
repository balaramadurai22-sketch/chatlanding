

'use client';

import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  Bitcoin,
  DollarSign,
  Apple,
  CreditCard,
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
import { agents as allAgents, type Agent } from '@/lib/agents-data';
import { useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

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
  model: z.string().min(1, "Please select a model."),
  category: z.enum(['Coding', 'Analysis', 'Creative', 'Productivity', 'Research']),
  purpose: z.string().min(10, "Task/Role must be at least 10 characters."),
  creatorName: z.string().min(2, "Creator name is required."),
  linkedin: z.string().url("Please enter a valid LinkedIn URL.").optional().or(z.literal('')),
  github: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal('')),
  twitter: z.string().url("Please enter a valid Twitter/X URL.").optional().or(z.literal('')),
  paypal: z.string().email("Invalid PayPal email").optional().or(z.literal('')),
  upi: z.string().optional(),
  btc: z.string().optional(),
  tools: z.string().min(1, "Please specify allowed tools."),
  memory: z.string().min(1, "Please specify memory options."),
});
type NewAgentFormValues = z.infer<typeof newAgentSchema>;

const donationSchema = z.object({
  amount: z.coerce.number().min(1, "Please enter an amount greater than 0."),
});
type DonationFormValues = z.infer<typeof donationSchema>;


const getSymbolicVisual = (category: Agent['category']) => {
    const commonProps = {
        className: "absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity",
    };

    switch (category) {
        case 'Coding':
            const codeLines = [
              "const fetchData = async () => {",
              "  const response = await fetch(API_URL);",
              "  const data = await response.json();",
              "  return data;",
              "};",
              "fetchData().then(console.log);",
            ];
             return (
                <div {...commonProps} className="font-mono text-xs p-2 overflow-hidden">
                    {codeLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                delay: i * 0.3 + Math.random() * 1,
                            }}
                        >
                           <span className="text-purple-400">const</span> <span className="text-yellow-400">fetchData</span> = ...
                        </motion.div>
                    ))}
                </div>
            );
        case 'Analysis':
             const points = Array.from({ length: 7 }, (_, i) => `${i * 15},${30 + Math.random() * 40 - 20}`).join(' ');
            return (
                <motion.svg {...commonProps} viewBox="0 0 100 60">
                    <motion.polyline
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                    />
                </motion.svg>
            );
        case 'Creative':
            return (
                <motion.svg {...commonProps} viewBox="0 0 100 100">
                    <motion.path
                        d="M20,50 C20,80 80,80 80,50 C80,20 20,20 20,50 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        animate={{
                            d: [
                                "M20,50 C20,80 80,80 80,50 C80,20 20,20 20,50 Z",
                                "M30,50 C10,70 90,70 70,50 C90,30 10,30 30,50 Z",
                                "M20,50 C20,80 80,80 80,50 C80,20 20,20 20,50 Z",
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.svg>
            );
        case 'Research':
             return (
                <motion.svg {...commonProps} viewBox="0 0 100 100">
                     {/* Nodes */}
                     {[...Array(5)].map((_, i) => (
                         <motion.circle
                             key={`node-${i}`}
                             cx={20 + (i * 15)}
                             cy={50 + Math.sin(i) * 20}
                             r="3"
                             fill="currentColor"
                             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                         />
                     ))}
                     {/* Connections */}
                     <motion.path d="M20 50 L35 70 L50 50 L65 30 L80 50" stroke="currentColor" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}/>
                </motion.svg>
             )
        default: // Productivity & others
             return (
                <motion.svg {...commonProps} viewBox="0 0 100 100">
                     {Array.from({ length: 5 }).map((_, i) => (
                        <motion.circle
                            key={i}
                            r="2"
                            fill="currentColor"
                            initial={{
                                cx: 50,
                                cy: 50,
                                opacity: 0
                            }}
                            animate={{
                                cx: 50 + 40 * Math.cos( (i/5) * 2 * Math.PI),
                                cy: 50 + 40 * Math.sin( (i/5) * 2 * Math.PI),
                                opacity: [0, 1, 0],
                                rotate: 360
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </motion.svg>
            );
    }
};

const TypingEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true }); // `once: true` makes it fire only once when it enters view

  React.useEffect(() => {
    if (isInView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust speed here
      return () => clearInterval(interval);
    }
  }, [isInView, text]);

  // Reset when it goes out of view, to replay when it comes back
  React.useEffect(() => {
    if (!isInView) {
      setDisplayedText('');
    }
  }, [isInView]);


  return (
    <p ref={ref} className="text-xs text-black/80 h-8">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};


const AgentCard = ({ agent, onUpdate }: { agent: Agent, onUpdate: (agent: Agent) => void }) => {
    const [isPinned, setIsPinned] = React.useState(agent.pinned);
    const [isActive, setIsActive] = React.useState(agent.active);
    const donationForm = useForm<DonationFormValues>({ resolver: zodResolver(donationSchema) });
    const [currency, setCurrency] = React.useState('usd');

    const handlePinToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newPinned = !isPinned;
        setIsPinned(newPinned);
        onUpdate({ ...agent, pinned: newPinned });
    };

    const handleActiveToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newActive = !isActive;
      setIsActive(newActive);
      onUpdate({ ...agent, active: newActive });
    }

    const onDonationSubmit: SubmitHandler<DonationFormValues> = (data) => {
      console.log(`Donating $${data.amount} to ${agent.creator.name}`);
      // toast({ title: 'Donation Successful!', description: `Thank you for supporting ${agent.creator.name}!` });
      donationForm.reset();
    };

    const renderPaymentOptions = () => {
        switch (currency) {
            case 'usd':
                return (
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-black"><DollarSign size={16} className="mr-2" /> PayPal</Button>
                        <Button variant="outline" className="flex-1 border-black"><Apple size={16} className="mr-2" /> Apple Pay</Button>
                        <Button variant="outline" className="flex-1 border-black"><CreditCard size={16} className="mr-2" /> Card</Button>
                    </div>
                );
            case 'inr':
                 return (
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-black">GPay</Button>
                        <Button variant="outline" className="flex-1 border-black">PhonePe</Button>
                        <Button variant="outline" className="flex-1 border-black">UPI</Button>
                    </div>
                );
            case 'crypto':
                return (
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" className="w-full border-black">Binance Pay</Button>
                        <Button variant="outline" className="w-full border-black">Trust Wallet</Button>
                        <Button variant="outline" className="w-full border-black">Phantom</Button>
                    </div>
                );
            default:
                return null;
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
                    className="relative aspect-square flex flex-col justify-between p-4 border border-black rounded-lg bg-white shadow-sm cursor-pointer group hover:shadow-md transition-shadow hover:-translate-y-1"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        {getSymbolicVisual(agent.category)}
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-2">
                                <span className={cn("w-2 h-2 rounded-full", isActive ? 'bg-green-500' : 'bg-red-500')} />
                                <h3 className="font-bold text-lg leading-tight">{agent.name}</h3>
                            </div>
                             <button onClick={handlePinToggle} className="p-1 text-black/40 hover:text-black">
                                {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-1 text-black/60">
                           <span>{agent.model}</span>
                           <span>&middot;</span>
                           <span>{agent.category}</span>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="p-2 border border-black/10 rounded-md bg-white/50 backdrop-blur-sm">
                           <TypingEffect text={agent.description} />
                        </div>
                        <div className="flex justify-between items-center text-xs text-black/60 mt-2">
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{(agent.peopleUsed / 1000).toFixed(1)}k</span>
                            </div>
                             <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                <span>{(agent.likes / 1000).toFixed(1)}k</span>
                            </div>
                            <Switch checked={isActive} onClick={handleActiveToggle} className="h-4 w-7 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-3" />
                        </div>
                    </div>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                 <DialogClose className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    <div className="flex flex-col gap-4">
                        <Image src={agent.creator.imageUrl} alt={agent.creator.name} width={128} height={128} className="rounded-lg border-2 border-black w-full aspect-square object-cover" />
                        <div className="p-4 border rounded-lg flex flex-col gap-4">
                            <h4 className="font-semibold text-center">Support the Creator</h4>
                            <Tabs value={currency} onValueChange={setCurrency} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="usd">USD</TabsTrigger>
                                    <TabsTrigger value="inr">INR</TabsTrigger>
                                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Form {...donationForm}>
                                <form onSubmit={donationForm.handleSubmit(onDonationSubmit)} className="space-y-4">
                                    <FormField name="amount" control={donationForm.control} render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/60">{currency === 'usd' ? '$' : currency === 'inr' ? '₹' : ''}</span>
                                                    <Input type="number" placeholder="10" {...field} className="pl-6 border-black" />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                    {renderPaymentOptions()}
                                    <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black border border-black">Donate</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                     <div className="md:col-span-2 flex flex-col gap-6">
                        <div>
                            <DialogTitle className="text-3xl font-bold">{agent.name}</DialogTitle>
                            <div className="text-sm text-black/60">by {agent.creator.name}</div>
                            <div className="flex gap-3 mt-2">
                                {agent.creator.social.twitter && <a href={agent.creator.social.twitter} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black"><Twitter size={16} /></a>}
                                {agent.creator.social.github && <a href={agent.creator.social.github} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black"><Github size={16} /></a>}
                                {agent.creator.social.linkedin && <a href={agent.creator.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black"><Linkedin size={16} /></a>}
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">How it works</h4>
                            <p className="text-sm text-black/80">{agent.description}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Purpose / Task</h4>
                            <p className="text-sm text-black/80">{agent.purpose}</p>
                        </div>
                         <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 border rounded-lg"><span className="font-semibold">Model:</span> {agent.model}</div>
                            <div className="p-3 border rounded-lg"><span className="font-semibold">Category:</span> {agent.category}</div>
                            <div className="p-3 border rounded-lg"><span className="font-semibold">Tools:</span> {agent.tools}</div>
                            <div className="p-3 border rounded-lg"><span className="font-semibold">Memory:</span> {agent.memory}</div>
                        </div>
                         <div className="p-4 border rounded-lg flex justify-around text-center mt-auto">
                            <div>
                                <div className="font-bold text-lg">{(agent.peopleUsed/1000).toFixed(1)}k</div>
                                <div className="text-xs text-black/60">Users</div>
                            </div>
                             <div>
                                <div className="font-bold text-lg">{(agent.likes/1000).toFixed(1)
                                }k</div>
                                <div className="text-xs text-black/60">Likes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const AgentsView = ({agents, setAgents}: {agents: Agent[], setAgents: (agents: Agent[]) => void}) => {
    const [filter, setFilter] = React.useState('All');
    const [searchTerm, setSearchTerm] = React.useState('');
    const newAgentForm = useForm<NewAgentFormValues>({ resolver: zodResolver(newAgentSchema) });
    const { toast } = useToast();
    const [isAddAgentOpen, setIsAddAgentOpen] = React.useState(false);

    const filteredAgents = useMemo(() => {
        return agents.filter(agent => {
            const categoryMatch = filter === 'All' || agent.category === filter;
            const searchMatch = searchTerm === '' || 
                agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.model.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [agents, filter, searchTerm]);

    const pinnedAgents = useMemo(() => filteredAgents.filter(a => a.pinned), [filteredAgents]);
    const unpinnedAgents = useMemo(() => filteredAgents.filter(a => !a.pinned), [filteredAgents]);

    const categories = ['All', 'Coding', 'Analysis', 'Creative', 'Productivity', 'Research'];

    const onNewAgentSubmit: SubmitHandler<NewAgentFormValues> = (data) => {
        const newAgent: Agent = {
            id: `agent-${Date.now()}`,
            active: true,
            pinned: false,
            peopleUsed: 0,
            likes: 0,
            creator: {
                name: data.creatorName,
                imageUrl: `https://picsum.photos/seed/${data.creatorName}/100/100`,
                social: {
                    twitter: data.twitter || undefined,
                    github: data.github || undefined,
                    linkedin: data.linkedin || undefined,
                    paypal: data.paypal || undefined,
                    upi: data.upi || undefined,
                    btc: data.btc || undefined,
                },
            },
            ...data
        };
        setAgents([newAgent, ...agents]);
        toast({ title: "Agent Created!", description: `${data.name} is now available.` });
        newAgentForm.reset();
        setIsAddAgentOpen(false);
    };

    const handleAgentUpdate = (updatedAgent: Agent) => {
        setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-6 bg-white">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Agents</h1>
                <p className="text-black/60">Browse, manage, and create powerful AI agents.</p>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                        <Input 
                            placeholder="Search by name, model..."
                            className="pl-10 border-black w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <Button 
                                key={cat}
                                variant={filter === cat ? 'default' : 'outline'}
                                onClick={() => setFilter(cat)}
                                className={cn("border-black", filter === cat ? "bg-black text-white hover:bg-black" : "hover:bg-gray-100")}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                     <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
                        <DialogTrigger asChild>
                             <Button className="bg-black text-white hover:bg-white hover:text-black border border-black w-full md:w-auto shadow-sm hover:shadow-md transition-shadow"><Plus className="mr-2 h-4 w-4" /> Add New Agent</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogClose className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Close</span>
                            </DialogClose>
                            <DialogHeader><DialogTitle className="text-2xl font-bold text-center my-4">Create a New Agent</DialogTitle></DialogHeader>
                            <Form {...newAgentForm}>
                                <form onSubmit={newAgentForm.handleSubmit(onNewAgentSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        {/* Column 1: Agent Info */}
                                        <div className="space-y-4 p-4 border rounded-lg">
                                            <h3 className="font-bold text-sm uppercase text-black/60">Agent Information</h3>
                                            <FormField name="name" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Agent Name</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="description" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="purpose" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Task / Role</FormLabel><FormControl><Textarea {...field} className="border-black" placeholder="What is the primary task of this agent?" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                             <FormField name="model" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Model</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger className="border-black"><SelectValue placeholder="Select a model" /></SelectTrigger></FormControl><SelectContent><SelectItem value="GPT-4">GPT-4</SelectItem><SelectItem value="Gemini 1.5">Gemini 1.5</SelectItem><SelectItem value="Claude 3">Claude 3</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="category" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger className="border-black"><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Coding">Coding</SelectItem><SelectItem value="Analysis">Analysis</SelectItem><SelectItem value="Creative">Creative</SelectItem><SelectItem value="Productivity">Productivity</SelectItem><SelectItem value="Research">Research</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="tools" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Allowed Tools / Access</FormLabel><FormControl><Input {...field} className="border-black" placeholder="e.g., calculator, web_search" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="memory" control={newAgentForm.control} render={({ field }) => (
                                                <FormItem><FormLabel>Memory / Context Options</FormLabel><FormControl><Input {...field} className="border-black" placeholder="e.g., short-term, long-term" /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>

                                        <div className="space-y-6">
                                            {/* Column 2: Creator & Socials */}
                                            <div className="space-y-4 p-4 border rounded-lg">
                                                <h3 className="font-bold text-sm uppercase text-black/60">Creator Information</h3>
                                                <FormField name="creatorName" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>Creator Name</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField name="linkedin" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField name="github" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField name="twitter" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>Twitter/X URL</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                            </div>
                                            {/* Column 4: Donations */}
                                             <div className="space-y-4 p-4 border rounded-lg">
                                                 <h3 className="font-bold text-sm uppercase text-black/60">Support the Creator (Optional)</h3>
                                                 <FormField name="paypal" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>PayPal Email</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                 <FormField name="upi" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>UPI ID (for India)</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                 <FormField name="btc" control={newAgentForm.control} render={({ field }) => (
                                                    <FormItem><FormLabel>BTC Wallet Address</FormLabel><FormControl><Input {...field} className="border-black" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                            </div>
                                        </div>
                                     </div>
                                    <DialogFooter><Button type="submit" className="bg-black text-white w-full">Create Agent</Button></DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {pinnedAgents.length > 0 && (
                        <motion.div
                            key="pinned-section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-8"
                        >
                            <h2 className="font-bold text-sm uppercase text-black/60 mb-2">Pinned</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {pinnedAgents.map(agent => (
                                    <AgentCard key={agent.id} agent={agent} onUpdate={handleAgentUpdate} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {unpinnedAgents.length > 0 && (
                         <motion.div
                            key="all-agents-section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                         >
                            <h2 className="font-bold text-sm uppercase text-black/60 mb-2">All Agents</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                               {unpinnedAgents.map(agent => (
                                    <AgentCard key={agent.id} agent={agent} onUpdate={handleAgentUpdate} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                 {filteredAgents.length === 0 && (
                    <div className="text-center py-16 text-black/60">
                        <p>No agents found.</p>
                        <p className="text-sm">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


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
  const { toast } = useToast();
  const [activeView, setActiveView] = React.useState('chat');
  const [agents, setAgents] = React.useState<Agent[]>(allAgents);

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
          <Sparkles className="mr-3" /> Agents
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
              {activeView === 'chat' ? (
                <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                >
                    <ChatView />
                </motion.div>
              ) : (
                <motion.div
                    key="agents"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col"
                >
                    <AgentsView agents={agents} setAgents={setAgents} />
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </>
  );
}
