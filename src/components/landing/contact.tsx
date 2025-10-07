
"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="container text-center bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Let's Build Together
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Have a project in mind or just want to connect? Our virtual doors are always open. We'd love to hear from you.
        </p>
        <Button
          size="lg"
          className="mt-8"
          asChild
        >
          <Link href="/contact">
            <MessageSquare className="mr-2" />
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}

    