

"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ChatProps = {
  onTriggerClick: (query?: string) => void;
};


export default function Chat({ onTriggerClick }: ChatProps) {

  const handleTriggerClick = () => {
    // Link to contact page instead of chat
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
          Have a question or a brilliant idea? Our team is ready to connect. Explore concepts, ask about our research, or just say hello.
        </p>
        <Button
          size="lg"
          className="mt-8"
          asChild
        >
          <Link href="/contact">
            <MessageSquare className="mr-2" />
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
