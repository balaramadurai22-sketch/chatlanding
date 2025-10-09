
'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Plus, X, ChevronsRight, PanelLeft, Bot, Sparkles, Search, Settings2, Bug, Lightbulb, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Agent } from '@/lib/agents-data';


interface ChatUIProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  handleSendMessage: (e: React.FormEvent) => void;
  setInput: (input: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  selectedAgents: Agent[];
  setSelectedAgents: (agents: Agent[]) => void;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4">
    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground delay-0"></span>
    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground delay-200"></span>
    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground delay-400"></span>
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

export default function ChatUI({
  messages,
  input,
  isLoading,
  handleSendMessage,
  setInput,
  setMessages,
  agents,
  setAgents,
  selectedAgents,
  setSelectedAgents,
}: ChatUIProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = React.useState(!isMobile);
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
    <div className="flex flex-col h-full bg-muted/50 text-foreground p-4 border-r">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="font-headline text-xl font-bold animated-gradient-text">
          TECHismust AI
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronsRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 p-3 border rounded-lg bg-background">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <p className="font-semibold">User</p>
          <p className="text-sm text-muted-foreground">Free Plan</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
        <Button
          variant="secondary"
          className="w-full justify-start text-base"
        >
          <MessageCircle className="mr-3" /> Chat
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base"
        >
          <Sparkles className="mr-3" /> Agents
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-base"
        >
          <Search className="mr-3" /> Search
          <span className="ml-auto text-xs opacity-60">⌘K</span>
        </Button>
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sm">
              <Bug className="mr-3 h-4 w-4" /> Bug Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Submit a Bug Report</DialogTitle>
            </DialogHeader>
            <Form {...bugReportForm}>
              <form onSubmit={bugReportForm.handleSubmit(onBugReportSubmit)} className="space-y-4">
                <FormField name="title" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="description" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="steps" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Steps to Reproduce</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="severity" control={bugReportForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Severity</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sm">
              <Lightbulb className="mr-3 h-4 w-4" /> Feature Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <DialogHeader>
              <DialogTitle>Request a Feature</DialogTitle>
            </DialogHeader>
            <Form {...featureRequestForm}>
              <form onSubmit={featureRequestForm.handleSubmit(onFeatureRequestSubmit)} className="space-y-4">
                <FormField name="title" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Feature Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="description" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="priority" control={featureRequestForm.control} render={({ field }) => (
                  <FormItem><FormLabel>Priority</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(`{3}[\s\S]*?`{3}|`.*?`|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.substring(3, part.length - 3);
        return (
          <pre key={index} className="bg-muted p-4 rounded-md my-2 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        );
      }
      if (part.startsWith('`')) {
        return <code key={index} className="bg-muted px-1 py-0.5 rounded-sm">{part.substring(1, part.length - 1)}</code>;
      }
      if (part.startsWith('**')) {
        return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
      }
      if (part.startsWith('*')) {
        return <em key={index}>{part.substring(1, part.length - 1)}</em>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline">{linkMatch[1]}</a>;
      }
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <>
      <div className="flex h-screen w-full bg-background font-sans">
        {isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="fixed top-4 left-4 z-20"
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
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-4xl mx-auto h-full">
              {messages.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-4 bg-muted rounded-full">
                    <Bot className="w-12 h-12" />
                  </div>
                  <h1 className="text-2xl font-semibold mt-6">Ask me anything</h1>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((m, i) => (
                    <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <div className={cn('max-w-xl p-4 rounded-lg shadow-sm', m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                        {m.role !== 'user' && <div className="font-bold mb-2">Assistant</div>}
                        <div className="text-base break-words">{renderMessageContent(m.content)}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex justify-start">
                      <div className="max-w-xl p-4 rounded-lg bg-muted shadow-sm">
                        <div className="font-bold mb-2">Assistant</div>
                        <TypingIndicator />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>

          <footer className="p-4 md:p-6 bg-background border-t">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSendMessage} className="relative">
                <div className="relative flex items-center p-2 border rounded-lg bg-muted/50 focus-within:ring-2 focus-within:ring-ring">
                  <Button type="button" variant="ghost" className="p-2 h-auto rounded-md">
                    <Plus className="w-5 h-5" />
                  </Button>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e as any); }}}
                    placeholder="Ask me anything..."
                    className="flex-1 resize-none border-0 bg-transparent px-4 py-2 text-base focus-visible:ring-0 shadow-none"
                  />
                  <Button type="submit" variant="ghost" className="p-2 h-auto rounded-md" disabled={isLoading || !input.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
