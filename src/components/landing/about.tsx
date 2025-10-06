"use client";

import { motion } from "framer-motion";
import { Zap, FlaskConical, Share2, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { innovations } from "@/lib/innovations";
import { researchExperiments } from "@/lib/research";
import { collaborations } from "@/lib/collaborations";
import { Badge } from "../ui/badge";

const panels = [
  {
    icon: <Zap className="size-8 text-foreground" />,
    title: "Impossible Made Possible",
    description: "Showcasing our core philosophy: turning ambitious AI concepts into tangible, real-world innovations.",
    link: "/innovation",
    dialogContent: (
      <>
        <DialogDescription className="text-base text-muted-foreground text-left mb-4">
          Our innovation principle is the driving force behind our quest to challenge the status quo. We believe in creative exploration, rapid prototyping, and failing fast to learn faster. Here are a few examples of how we make the impossible, possible.
        </DialogDescription>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {innovations.slice(0,4).map(item => (
                <div key={item.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
            ))}
        </div>
      </>
    ),
  },
  {
    icon: <FlaskConical className="size-8 text-foreground" />,
    title: "AI Research & Experimentation",
    description: "Pushing the frontiers of AI with fundamental and applied research in cutting-edge domains.",
    link: "/research",
     dialogContent: (
      <>
        <DialogDescription className="text-base text-muted-foreground text-left mb-4">
          At TECHismust, research is not just an academic exercise; it's the foundation of our product development. We invest heavily in R&D to stay at the forefront of technology.
        </DialogDescription>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {researchExperiments.slice(0,4).map(item => (
                <div key={item.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.aiField}</p>
                </div>
            ))}
        </div>
      </>
    ),
  },
  {
    icon: <Share2 className="size-8 text-foreground" />,
    title: "Collaborative Innovation",
    description: "Building the future of AI together with partners, clients, and the open-source community.",
    link: "/collaboration",
     dialogContent: (
      <>
        <DialogDescription className="text-base text-muted-foreground text-left mb-4">
         We believe that the greatest challenges can only be solved through collective effort. By sharing knowledge and building partnerships, we accelerate innovation and create a positive impact.
        </DialogDescription>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {collaborations.slice(0,4).map(item => (
                <div key={item.id} className="p-3 border rounded-md">
                     <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{item.title}</h4>
                        <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Partners: {item.partners.join(', ')}</p>
                </div>
            ))}
        </div>
      </>
    ),
  },
    {
    icon: <Eye className="size-8 text-foreground" />,
    title: "Future Vision & AI Impact",
    description: "Charting the course for the next wave of artificial intelligence and its transformative impact on society.",
    link: "/vision",
     dialogContent: (
      <>
        <DialogDescription className="text-base text-muted-foreground text-left mb-4">
         Our roadmap is focused on creating responsible, powerful, and accessible AI. We are exploring next-generation models, ethical frameworks, and novel applications that will shape the future.
        </DialogDescription>
        <div className="space-y-3">
            <div className="p-3 border rounded-md">
                <h4 className="font-semibold">Q4 2024: Launch GenAI Platform v2</h4>
                <p className="text-sm text-muted-foreground mt-1">Introducing advanced features for enterprise-level generative AI applications.</p>
            </div>
             <div className="p-3 border rounded-md">
                <h4 className="font-semibold">2025: Open Source Ethical AI Toolkit</h4>
                <p className="text-sm text-muted-foreground mt-1">Releasing a set of tools to help developers audit and mitigate bias in their models.</p>
            </div>
        </div>
      </>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="container relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_60%)] -z-10"></div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          We turn the impossible into possible.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          TECHismust Innovation Lab is a collective of forward-thinkers, researchers, and engineers dedicated to solving humanity's most challenging problems through artificial intelligence. Our mission is to build a future where technology empowers everyone.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {panels.map((panel, i) => (
            <Dialog key={panel.title}>
              <DialogTrigger asChild>
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="h-full"
                >
                  <div className="h-full text-left p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card/50 backdrop-blur-sm rounded-lg border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4">
                        {panel.icon}
                    </div>
                    <h3 className="pt-2 font-headline text-xl font-bold">{panel.title}</h3>
                    <p className="pt-2 text-muted-foreground text-sm">{panel.description}</p>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        {panel.icon}
                    </div>
                    <DialogTitle className="font-headline text-2xl">{panel.title}</DialogTitle>
                  </div>
                  {panel.dialogContent}
                </DialogHeader>
                <DialogFooter>
                  <Link href={panel.link} passHref>
                    <Button variant="outline" className="transition-all hover:bg-foreground/10">
                      View More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        ))}
      </div>
    </section>
  );
}
