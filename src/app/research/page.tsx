
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Beaker, BrainCircuit, Dna, Rocket, TestTube, FileText, Upload, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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

const fellowshipSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  affiliation: z.string().min(2, "Affiliation is required."),
  areaOfInterest: z.string().min(5, "Please describe your area of interest."),
  motivation: z.string().min(20, "Motivation statement must be at least 20 characters."),
  resume: z.any().optional(), // File upload validation is complex on the client-side
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FellowshipFormValues = z.infer<typeof fellowshipSchema>;
type ContactFormValues = z.infer<typeof contactSchema>;

export default function ResearchPage() {
    const { toast } = useToast();
    const [isFellowshipOpen, setFellowshipOpen] = useState(false);
    const [isContactOpen, setContactOpen] = useState(false);

    const fellowshipForm = useForm<FellowshipFormValues>({ resolver: zodResolver(fellowshipSchema) });
    const contactForm = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

    const onFellowshipSubmit: SubmitHandler<FellowshipFormValues> = async (data) => {
        console.log("Fellowship Application:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({ title: "Application Sent!", description: "Thank you for your interest. We will be in touch shortly." });
        fellowshipForm.reset();
        setFellowshipOpen(false);
    };

    const onContactSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        console.log("Contact Form Submission:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({ title: "Message Sent!", description: "Your message has been sent to our research team." });
        contactForm.reset();
        setContactOpen(false);
    };

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
                                Pushing the Frontiers
                                <br />
                                <span>of AI Research</span>
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
                                className="mt-8 flex justify-center gap-4"
                            >
                                <Button size="lg" onClick={() => setFellowshipOpen(true)}>
                                    Apply for Fellowship
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => setContactOpen(true)}>
                                    Contact Research Team
                                </Button>
                            </motion.div>
                        </div>
                    </section>

                    {/* Research Pillars */}
                    <section id="research-pillars" className="py-24 sm:py-32">
                        <div className="container">
                            <div className="mx-auto max-w-4xl text-center mb-16">
                                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase sm:text-4xl">Our Core Research Domains</h2>
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

                    {/* CTA - same as hero but can be its own section */}
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
                                    <Button size="lg" onClick={() => setFellowshipOpen(true)}>
                                        Apply for Fellowship
                                    </Button>
                                    <Button size="lg" variant="outline" onClick={() => setContactOpen(true)}>
                                        Contact Research Team
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Fellowship Application Modal */}
            <Dialog open={isFellowshipOpen} onOpenChange={setFellowshipOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Apply for Fellowship</DialogTitle>
                        <DialogDescription>Submit your application to join our research team.</DialogDescription>
                    </DialogHeader>
                    <Form {...fellowshipForm}>
                        <form onSubmit={fellowshipForm.handleSubmit(onFellowshipSubmit)} className="space-y-4 py-4">
                            <FormField control={fellowshipForm.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={fellowshipForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={fellowshipForm.control} name="affiliation" render={({ field }) => (
                                <FormItem><FormLabel>Affiliation / Organization</FormLabel><FormControl><Input placeholder="University or Company" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={fellowshipForm.control} name="areaOfInterest" render={({ field }) => (
                                <FormItem><FormLabel>Area of Interest</FormLabel><FormControl><Input placeholder="e.g., Quantum AI, Ethical AI" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={fellowshipForm.control} name="motivation" render={({ field }) => (
                                <FormItem><FormLabel>Motivation Statement</FormLabel><FormControl><Textarea placeholder="Why do you want to join our lab?" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={fellowshipForm.control} name="resume" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CV/Resume</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type="file" className="pl-12" onChange={(e) => field.onChange(e.target.files)} />
                                            <Upload className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <DialogFooter>
                                <Button type="submit" disabled={fellowshipForm.formState.isSubmitting}>
                                    {fellowshipForm.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Contact Research Team Modal */}
            <Dialog open={isContactOpen} onOpenChange={setContactOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Contact Research Team</DialogTitle>
                        <DialogDescription>Have a question or proposal? Let us know.</DialogDescription>
                    </DialogHeader>
                    <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4 py-4">
                            <FormField control={contactForm.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={contactForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={contactForm.control} name="subject" render={({ field }) => (
                                <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Question about..." {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={contactForm.control} name="message" render={({ field }) => (
                                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Your detailed message..." {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <DialogFooter>
                                <Button type="submit" disabled={contactForm.formState.isSubmitting}>
                                    {contactForm.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Footer />
        </>
    );
}
