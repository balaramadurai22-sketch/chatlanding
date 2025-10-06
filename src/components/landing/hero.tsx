"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "./particles";

export default function Hero() {
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
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
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
