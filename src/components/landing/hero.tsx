
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          Innovating the future, one algorithm at a time.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="#solutions">Discover Our Solutions</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all hover:bg-primary hover:text-primary-foreground" asChild>
            <Link href="/contact">Join the Lab</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
