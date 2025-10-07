"use client";

import { useState, useEffect } from "react";
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
import { startChatSession, continueChat, type ChatMessage } from "@/app/actions";
import { useRouter } from "next/navigation";


const chatSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  interest: z.string().min(1, "Please select your field of interest."),
});

type ChatFormData = z.infer<typeof chatSchema>;

type ChatProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
  onTriggerClick: (query?: string) => void;
};


export default function Chat({ isOpen, onOpenChange, initialQuery, onTriggerClick }: ChatProps) {
  const router = useRouter();

  const handleTriggerClick = () => {
    router.push('/chat');
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
          onClick={handleTriggerClick}
        >
          <MessageSquare className="mr-2" />
          Chat with Our AI
        </Button>
      </motion.div>
    </section>
  );
}
