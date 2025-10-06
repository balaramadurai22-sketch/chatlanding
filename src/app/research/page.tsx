'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Beaker, BrainCircuit, Dna, Rocket, TestTube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { researchExperiments } from '@/lib/research';

const researchPillars = [
    {
        icon: <BrainCircuit className="size-8" />,
        title: 'Synthetic Cognition',
        description: 'Simulating thought, context, and emotion in artificial systems.',
    },
    {
        icon: <Dna className="size-8" />,
        title: 'Neural Evolution Systems',
        description: 'AI that rewires itself to evolve beyond programmed limits.',
    },
    {
        icon: <Beaker className="size-8" />,
        title: 'Autonomous Creativity',
        description: 'Exploring AI’s ability to originate—not just imitate—art, code, and design.',
    },
    {
        icon: <Rocket className="size-8" />,
        title: 'Quantum-Integrated Intelligence',
        description: 'Merging quantum mechanics with neural networks for next-gen processing.',
    },
];

export default function ResearchPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background text-foreground">
                <main>
                    {/* Hero Section */}
                    <section className="relative flex h-screen items-center justify-center text-center overflow-hidden">
                        <Particles className="absolute inset-0 -z-10" quantity={200} />
                        <div className="container z-10">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                                className="font-headline text-4xl font-bold tracking-tight uppercase sm:text-6xl"
                            >
                                Where Ideas Evolve
                                <br />
                                <span>Into Intelligence</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
                            >
                                TECHISMUST Innovation Lab is pioneering deep research into cognition, reasoning, and creativity—rethinking what machines can become.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="mt-8"
                            >
                                <a href="#research-pillars">
                                    <Button size="lg">
                                        Explore Research Areas
                                    </Button>
                                </a>
                            </motion.div>
                        </div>
                    </section>

                    {/* Research Pillars */}
                    <section id="research-pillars" className="py-24 sm:py-32">
                        <div className="container">
                            <div className="mx-auto max-w-4xl text-center mb-16">
                                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">The Four Dimensions of AI Discovery</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {researchPillars.map((pillar, index) => (
                                    <motion.div
                                        key={pillar.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="h-full text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                            <CardHeader>
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary mb-4">
                                                    {pillar.icon}
                                                </div>
                                                <CardTitle className="font-headline text-xl font-bold">{pillar.title}</CardTitle>
                                                <CardDescription className="text-muted-foreground">{pillar.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Deep Research Projects */}
                    <section className="py-24 sm:py-32 bg-muted/30">
                        <div className="container">
                            <div className="mx-auto max-w-4xl text-center mb-16">
                                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">Experiments That Redefine Limits</h2>
                                <p className="mt-4 text-lg text-muted-foreground">A glimpse into the experiments and breakthroughs happening at TECHismust.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {researchExperiments.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
                                            <CardHeader>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                                                        <TestTube className="size-5 text-primary" />
                                                    </div>
                                                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                                                </div>
                                                <CardDescription>{item.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="mt-auto flex justify-between">
                                                <Badge variant="outline">{item.aiField}</Badge>
                                                <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'}>
                                                    {item.status}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-24 sm:py-32">
                        <div className="container text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Become Part of the Experiment</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                                    Whether you’re a researcher, developer, or dreamer—our lab is open to those who dare to explore.
                                </p>
                                <div className="mt-8 flex justify-center gap-4">
                                    <Button asChild size="lg">
                                        <Link href="/contact">Apply for Fellowship</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href="/contact">Contact Research Team</Link>
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
