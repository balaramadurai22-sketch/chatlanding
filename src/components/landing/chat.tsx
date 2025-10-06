"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Send, MessageSquare, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { startChatSession, continueChat } from "@/app/actions";

const chatSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  interest: z.string().min(1, "Please select your field of interest."),
});

type ChatFormData = z.infer<typeof chatSchema>;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatState, setChatState] = useState<"form" | "chat">("form");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const form = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
    defaultValues: { name: "", email: "", interest: "" },
  });

  const handleFormSubmit = async (data: ChatFormData) => {
    setIsThinking(true);
    const result = await startChatSession({ name: data.name, email: data.email, experience: data.interest });
    if (result.success && result.initialMessage) {
      setMessages([result.initialMessage]);
      setChatState("chat");
    } else {
      console.error(result.error);
    }
    setIsThinking(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || isThinking) return;

    const newMessage: ChatMessage = { role: "user", content: currentMessage };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsThinking(true);

    const result = await continueChat(messages, newMessage);
    if (result.success && result.response) {
      setMessages([...newMessages, result.response]);
    }
    setIsThinking(false);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentMessage("");
    setChatState("form");
    form.reset();
  }

  const handleOpenChange = (open: boolean) => {
    setIsChatOpen(open);
    if (!open) {
      // Delay reset to allow for closing animation
      setTimeout(resetChat, 300);
    }
  }

  return (
    <section id="ai-lab" className="container text-center bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to the AI Lab
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Have a question or a brilliant idea? Our AI assistant is ready to chat. Explore concepts, ask about our research, or just say hello.
        </p>
        <Button
          size="lg"
          className="mt-8"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageSquare className="mr-2" />
          Chat with Our AI
        </Button>
      </motion.div>

      <Dialog open={isChatOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md p-0">
          <AnimatePresence mode="wait">
            {chatState === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="p-6">
                  <DialogTitle className="font-headline text-2xl">
                    Before we begin...
                  </DialogTitle>
                  <DialogDescription>
                    Tell us a bit about yourself so we can tailor the
                    conversation.
                  </DialogDescription>
                </DialogHeader>
                <div className="px-6 pb-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleFormSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Ada Lovelace" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ada@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field of Interest</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your interest" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="AI">AI</SelectItem>
                                <SelectItem value="Product">Product</SelectItem>
                                <SelectItem value="Research">Research</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isThinking}>
                        {isThinking ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Start Chat"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex h-[60vh] flex-col"
              >
                <DialogHeader className="relative p-4 border-b">
                   <DialogTitle className="font-headline text-lg text-center pr-8">
                    AI Assistant
                  </DialogTitle>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={resetChat}>
                      <X className="size-4" />
                   </Button>
                </DialogHeader>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex items-end gap-2 ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`max-w-xs rounded-lg px-3 py-2 md:max-w-sm ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </motion.div>
                      </div>
                    ))}
                    {isThinking && (
                      <div className="flex items-end gap-2 justify-start">
                        <div className="max-w-xs rounded-lg px-3 py-2 bg-muted">
                           <Loader className="animate-spin size-5 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1"
                      disabled={isThinking}
                    />
                    <Button type="submit" size="icon" disabled={isThinking || !currentMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
