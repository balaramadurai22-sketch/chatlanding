
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
} from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

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
import { agents as initialAgents, Agent } from '@/lib/agents-data';
import { Switch } from '../ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

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

const agentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  role: z.string().min(1, { message: "Task/Role is required." }),
  tools: z.string().optional(),
  memory: z.string().optional(),
});
type AgentFormValues = z.infer<typeof agentSchema>;

const AgentsView = ({
  agents,
  setAgents,
  openAddAgentModal,
  setOpenAddAgentModal,
}: {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  openAddAgentModal: boolean;
  setOpenAddAgentModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [agentForDetail, setAgentForDetail] = React.useState<Agent | null>(null);

  const categories = ['All', ...Array.from(new Set(initialAgents.map(a => a.category)))];

  const agentForm = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
  });

  const onAddAgentSubmit: SubmitHandler<AgentFormValues> = data => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: data.name,
      description: data.description,
      howItWorks: data.description,
      model: 'GPT-4o Mini',
      category: 'Custom',
      purpose: data.role,
      status: 'Active',
      peopleUsed: 0,
      likes: 0,
      pinned: false,
      creator: { name: 'You', profileUrl: '#' },
    };
    setAgents(prev => [newAgent, ...prev]);
    toast({ title: 'Agent Created!', description: `${data.name} has been added.` });
    agentForm.reset();
    setOpenAddAgentModal(false);
  };

  const handleToggle = (id: string) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === id ? { ...agent, status: agent.status === 'Active' ? 'Inactive' : 'Active' } : agent
      )
    );
  };

  const handlePin = (id: string) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === id ? { ...agent, pinned: !agent.pinned } : agent
      )
    );
  };

  const filteredAgents = agents
    .filter(agent => {
      const categoryMatch = activeFilter === 'All' || agent.category === activeFilter;
      const searchMatch =
        searchTerm === '' ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const pinnedAgents = filteredAgents.filter(a => a.pinned);
  const unpinnedAgents = filteredAgents.filter(a => !a.pinned);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Button onClick={() => setOpenAddAgentModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Agent
        </Button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
          <Input
            placeholder="Search agents by name, model, or category..."
            className="pl-10 border-black"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "whitespace-nowrap border-black",
                activeFilter === category && "bg-black text-white hover:bg-black/90"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {pinnedAgents.length > 0 && (
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center"><Pin className="mr-2 h-4 w-4" /> Pinned Agents</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pinnedAgents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} onToggle={handleToggle} onPin={handlePin} onCardClick={() => setAgentForDetail(agent)} />
                ))}
            </div>
             <hr className="my-8 border-black/20" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {unpinnedAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} onToggle={handleToggle} onPin={handlePin} onCardClick={() => setAgentForDetail(agent)} />
        ))}
      </div>

      {/* Add New Agent Modal */}
      <Dialog open={openAddAgentModal} onOpenChange={setOpenAddAgentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Agent</DialogTitle>
            <DialogDescription>Create a new agent to automate your tasks.</DialogDescription>
          </DialogHeader>
          <Form {...agentForm}>
            <form onSubmit={agentForm.handleSubmit(onAddAgentSubmit)} className="space-y-4">
              <FormField name="name" control={agentForm.control} render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} placeholder="e.g., Support Ticket Summarizer" className="border-black" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="description" control={agentForm.control} render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="What does this agent do?" className="border-black" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="role" control={agentForm.control} render={({ field }) => (
                <FormItem><FormLabel>Task / Role</FormLabel><FormControl><Input {...field} placeholder="e.g., Summarizes tickets" className="border-black" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="tools" control={agentForm.control} render={({ field }) => (
                <FormItem><FormLabel>Allowed Tools</FormLabel><FormControl><Input {...field} placeholder="e.g., GitHub, Jira (optional)" className="border-black" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="memory" control={agentForm.control} render={({ field }) => (
                <FormItem><FormLabel>Memory Options</FormLabel><FormControl><Input {...field} placeholder="e.g., Short-term (optional)" className="border-black" /></FormControl><FormMessage /></FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" className="bg-black text-white">Create Agent</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
       {/* Agent Detail Modal */}
      {agentForDetail && (
        <Dialog open={!!agentForDetail} onOpenChange={() => setAgentForDetail(null)}>
            <DialogContent>
                 <DialogClose className="absolute right-4 top-4 rounded-full p-1 border border-black bg-white text-black transition-opacity hover:bg-black hover:text-white">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{agentForDetail.name}</DialogTitle>
                     <div className="flex items-center gap-2 text-sm text-black/60 pt-2">
                        <span>by {agentForDetail.creator.name}</span>
                        <span>&middot;</span>
                        <a href={agentForDetail.creator.profileUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">View Profile</a>
                    </div>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-base">{agentForDetail.howItWorks}</p>
                    <div className="flex justify-between items-center bg-white border border-black rounded-lg p-3">
                       <div className="flex items-center gap-4">
                           <div className="text-center">
                                <p className="font-bold text-lg">{agentForDetail.likes}</p>
                                <p className="text-xs text-black/60">Likes</p>
                           </div>
                           <div className="text-center">
                               <p className="font-bold text-lg">{agentForDetail.peopleUsed}</p>
                                <p className="text-xs text-black/60">Users</p>
                           </div>
                       </div>
                        <Button variant="outline" className="border-black">
                            <Heart className="mr-2 h-4 w-4" /> Donate to Creator
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
};


const AgentCard = ({ agent, onToggle, onPin, onCardClick }: { agent: Agent; onToggle: (id: string) => void; onPin: (id: string) => void; onCardClick: () => void; }) => {
    return (
        <motion.div 
            className="border border-black rounded-lg p-4 flex flex-col justify-between aspect-square cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onCardClick}
            layout
        >
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg pr-2">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onPin(agent.id); }} className="p-1 hover:bg-black/10 rounded-full">
                           <Pin className={cn("h-4 w-4", agent.pinned ? "fill-current" : "")} />
                        </button>
                        <Switch checked={agent.status === 'Active'} onCheckedChange={() => onToggle(agent.id)} onClick={(e) => e.stopPropagation()} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                    <Badge variant="outline" className="border-black text-xs">{agent.model}</Badge>
                    <Badge variant="outline" className="border-black text-xs">{agent.category}</Badge>
                </div>
                 <p className="text-xs text-black/70 mb-2">
                    <span className="font-semibold">Purpose:</span> {agent.purpose}
                </p>
                 <p className="text-xs text-black/70">
                    <span className="font-semibold">How it works:</span> {agent.howItWorks}
                </p>
            </div>
             <div className="flex items-center gap-4 text-xs text-black/60 mt-auto">
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{agent.peopleUsed}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{agent.likes}</span>
                </div>
            </div>
        </motion.div>
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
  const [activeView, setActiveView] = React.useState('chat'); // 'chat' or 'agents'
  const [agents, setAgents] = React.useState<Agent[]>(initialAgents);
  const [openAddAgentModal, setOpenAddAgentModal] = React.useState(false);
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
          onClick={() => setActiveView('chat')}
          variant={activeView === 'chat' ? 'default' : 'ghost'}
          className="w-full justify-start text-base font-bold border border-black hover:bg-black hover:text-white data-[variant=default]:bg-black data-[variant=default]:text-white"
        >
          <MessageCircle className="mr-3" /> Chat
        </Button>
        <Button
          onClick={() => setActiveView('agents')}
          variant={activeView === 'agents' ? 'default' : 'ghost'}
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

      <div className="mt-8 flex-grow overflow-y-auto">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Projects</h3>
        {/* Placeholder for projects */}
      </div>


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
          {activeView === 'chat' ? (
            <ChatView />
          ) : (
            <AgentsView
              agents={agents}
              setAgents={setAgents}
              openAddAgentModal={openAddAgentModal}
              setOpenAddAgentModal={setOpenAddAgentModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
