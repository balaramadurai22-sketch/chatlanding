
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Particles from "./particles";
import { Input } from "../ui/input";
import Link from "next/link";

type HeroProps = {
  onChatSubmit: (query: string) => void;
};

export default function Hero({ onChatSubmit }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onChatSubmit(query);
      setQuery("");
    } else {
      onChatSubmit('');
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      <Particles className="absolute inset-0 -z-10" />
      <div className="container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-headline text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          Turning the Impossible Into Possible With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
        >
          Innovating the future, one algorithm at a time. Ask our AI anything.
        </motion.p>
        
        <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 max-w-xl"
        >
          <div className="relative">
             <MessageSquare className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ask anything... TECHISMUST AI is listening."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 w-full rounded-full bg-background/50 pl-12 pr-32 text-base shadow-lg backdrop-blur-sm"
            />
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            >
              Chat <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
