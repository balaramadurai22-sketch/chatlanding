
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Bot, Cog, FlaskConical, Rocket, TestTube, Briefcase, BarChart, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/projects';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


const solutionDomains = [
    {
        icon: <BrainCircuit className="size-8" />,
        title: 'Predictive Intelligence',
        description: 'Anticipate trends and forecast outcomes with unparalleled accuracy.',
    },
    {
        icon: <Bot className="size-8" />,
        title: 'Generative AI',
        description: 'Create novel content, from text and images to complex code.',
    },
    {
        icon: <Cog className="size-8" />,
        title: 'Autonomous Tools',
        description: 'Streamline workflows with intelligent, self-adapting automation.',
    },
    {
        icon: <FlaskConical className="size-8" />,
        title: 'AI-Powered Research',
        description: 'Accelerate discovery by analyzing vast datasets for hidden insights.',
    },
    {
        icon: <Rocket className="size-8" />,
        title: 'Quantum Frameworks',
        description: 'Exploring the next frontier of computation with hybrid quantum-neural models.',
    },
     {
        icon: <TestTube className="size-8" />,
        title: 'Adaptive Learning',
        description: 'Engines that evolve and improve from real-time interaction.',
    },
];

const models = [
  {
    name: 'TIM-AI 2.0',
    tagline: 'Advanced Conversational Reasoning',
  },
  {
    name: 'AURA',
    tagline: 'Multimodal Vision + Text Model',
  },
  {
    name: 'GENESIS',
    tagline: 'Code Generation Engine',
  },
  {
    name: 'ECHO',
    tagline: 'Conversational Speech Model',
  },
    {
    name: 'SYNAPSE',
    tagline: 'Predictive Forecasting Engine',
  },
    {
    name: 'QUANTIX',
    tagline: 'Experimental Quantum AI',
  },
];


export default function SolutionsPage() {

  const scrollTo = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <main>
          {/* Hero Section */}
          <section className="relative flex h-screen items-center justify-center text-center overflow-hidden">
            <Particles className="absolute inset-0 -z-10" quantity={150} />
            <div className="container z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-headline text-4xl font-bold tracking-tight uppercase sm:text-6xl"
              >
                Reimagining Intelligence
                <br/>
                <span>
                    Through AI Solutions
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 flex justify-center gap-4"
              >
                <Button size="lg" onClick={() => scrollTo('solutions-carousel')}>
                  Explore Solutions
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo('ai-models')}>
                  Meet Our Models
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Solution Domains Carousel */}
          <section id="solutions-carousel" className="py-24 sm:py-32">
            <div className="container">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">Our Core AI Dimensions</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We craft intelligent systems across multiple domains, each representing a pillar of our innovation strategy.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutionDomains.map((domain, index) => (
                        <motion.div
                            key={domain.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary mb-4">
                                        {domain.icon}
                                    </div>
                                    <h3 className="font-headline text-xl font-bold">{domain.title}</h3>
                                    <p className="text-muted-foreground">{domain.description}</p>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
          </section>

          {/* Proprietary AI Model Showcase */}
          <section id="ai-models" className="py-24 sm:py-32 bg-muted/30">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-16">
                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">Meet Our Minds</h2>
                <p className="mt-4 text-lg text-muted-foreground">Each model is a living entity with a unique identity, powering the next generation of intelligent applications.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {models.map((model, index) => (
                     <motion.div
                        key={model.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                     >
                        <Card className="h-full overflow-hidden transition-all duration-300 group hover:shadow-2xl">
                           <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-xl font-bold">{model.name}</h3>
                                <Badge variant="outline">v{index + 1}.0</Badge>
                            </div>
                             <p className="text-muted-foreground mt-2">{model.tagline}</p>
                           </CardContent>
                           <div className="h-48 bg-black overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                <Image 
                                    src={`https://picsum.photos/seed/model${index}/600/400`}
                                    alt={model.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                           </div>
                        </Card>
                     </motion.div>
                 ))}
              </div>
            </div>
          </section>

            {/* Case Studies Grid */}
            <section className="py-24 sm:py-32">
                <div className="container">
                    <div className="mx-auto max-w-4xl text-center mb-16">
                        <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">Real-World Intelligence</h2>
                        <p className="mt-4 text-lg text-muted-foreground">From theory to impact. Explore how our AI solutions are reshaping industries.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.slice(0,6).map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer group">
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    data-ai-hint={project.imageHint}
                                                />
                                            </div>
                                            <CardHeader>
                                                <h3 className="font-headline text-lg font-bold">{project.title}</h3>
                                                <p className="text-muted-foreground text-sm flex-grow">{project.description}</p>
                                            </CardHeader>
                                            <CardContent className="mt-auto">
                                                <div className="text-sm font-semibold text-primary flex items-center">
                                                    View Details <ChevronRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                      <DialogHeader>
                                        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
                                             <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={project.imageHint}
                                            />
                                        </div>
                                        <DialogTitle className="font-headline text-2xl">{project.title}</DialogTitle>
                                        <DialogDescription className="text-base">
                                          {project.longDescription}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Link href={`/projects/${project.id}`} passHref>
                                          <Button>
                                            View Case Study <ExternalLink className="ml-2 h-4 w-4" />
                                          </Button>
                                        </Link>
                                      </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


          {/* Collaboration CTA */}
            <section className="py-24 sm:py-32 bg-muted/30">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                         <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Shape the Future With Us</h2>
                         <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            TECHISMUST partners with pioneers across industries to redefine what AI can achieve.
                            Collaborate. Create. Challenge the impossible.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button asChild size="lg">
                                <Link href="/contact">Join as a Partner</Link>
                            </Button>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/contact">Build With Our API</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
