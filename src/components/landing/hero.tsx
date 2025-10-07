
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Particles from "./particles";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

type HeroProps = {
  onChatSubmit: (query: string) => void;
};

export default function Hero({ onChatSubmit }: HeroProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/contact?query=${encodeURIComponent(query)}`);
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
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="mx-auto mt-8 max-w-xl"
        >
          <form onSubmit={handleFormSubmit}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Have a question? Get in touch..."
                className="h-12 w-full rounded-full border-border/50 bg-background/50 pl-6 pr-12 text-base shadow-sm backdrop-blur-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#solutions">
            <Button size="lg" className="w-full sm:w-auto">
              Discover Our Solutions
            </Button>
          </a>
          <a href="#ai-lab">
            <Button size="lg" variant="outline" className="w-full sm:w-auto transition-all hover:bg-primary hover:text-primary-foreground">
              Join the Lab
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
