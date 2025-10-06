"use client";

import * as React from "react";
import { BrainCircuit, Bot, Cog, FlaskConical } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { motion } from "framer-motion";

const solutions = [
  {
    icon: <BrainCircuit className="size-10 text-foreground" />,
    title: "Predictive AI Systems",
    description:
      "Leverage machine learning to forecast trends, anticipate needs, and make data-driven decisions with unparalleled accuracy.",
  },
  {
    icon: <Bot className="size-10 text-foreground" />,
    title: "Generative AI Applications",
    description:
      "Create novel content, from text and images to complex code, with our cutting-edge generative models.",
  },
  {
    icon: <Cog className="size-10 text-foreground" />,
    title: "Automation Tools",
    description:
      "Streamline your workflows and boost efficiency with intelligent automation that adapts to your business needs.",
  },
  {
    icon: <FlaskConical className="size-10 text-foreground" />,
    title: "AI-Powered Research",
    description:
      "Accelerate discovery and innovation with AI platforms that analyze vast datasets and uncover hidden insights.",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            AI-Driven Solutions for a Smarter Future
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We build intelligent systems that learn, adapt, and create.
            Explore our core solutions designed to solve complex challenges.
          </p>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {solutions.map((solution, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full hover:border-foreground/20 hover:shadow-md transition-all bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="pb-4">{solution.icon}</div>
                        <CardTitle className="font-headline text-xl font-bold">
                          {solution.title}
                        </CardTitle>
                        <CardDescription className="pt-2 text-base text-muted-foreground">
                          {solution.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
