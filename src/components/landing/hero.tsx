"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "./particles";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <Particles className="absolute inset-0 -z-10" />
      <div className="container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-headline text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          Empowering the Future with{" "}
          <span className="animated-gradient-text">
            Innovation and Intelligence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
        >
          Where creativity meets AI to build the next generation of digital
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="mt-10"
        >
          <a href="#about">
            <Button size="lg" className="glow">
              Start Exploring
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
