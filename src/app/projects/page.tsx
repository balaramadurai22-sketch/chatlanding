
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Layers, Filter, CheckCircle, Clock, PlayCircle, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/projects-data';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['All', 'Ongoing', 'Completed', 'Upcoming', 'Predictive', 'Generative', 'Automation', 'Quantum'];

const proposalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  proposal: z.string().min(20, "Proposal must be at least 20 characters."),
});

const joinSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  project: z.string().min(1, "Please select a project."),
  interest: z.string().min(10, "Please tell us why you're interested."),
});


export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const { toast } = useToast();

  const proposalForm = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: { name: "", email: "", proposal: "" },
  });

  const joinForm = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: { name: "", email: "", project: "", interest: "" },
  });

  const handleProposalSubmit = async (data: z.infer<typeof proposalSchema>) => {
    const result = await submitContactForm({name: data.name, email: data.email, message: `PROPOSAL: ${data.proposal}`});
    if (result.success) {
      toast({
        title: "Proposal Sent!",
        description: "Thank you for your submission. We'll be in touch soon.",
      });
      proposalForm.reset();
      setIsProposalOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error,
      });
    }
  };

  const handleJoinSubmit = async (data: z.infer<typeof joinSchema>) => {
    const result = await submitContactForm({name: data.name, email: data.email, message: `JOIN REQUEST for ${data.project}: ${data.interest}`});
     if (result.success) {
      toast({
        title: "Request Sent!",
        description: "Thank you for your interest. We'll get back to you shortly.",
      });
      joinForm.reset();
      setIsJoinOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error,
      });
    }
  };

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter || p.status === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return <Clock className="mr-2 h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="mr-2 h-4 w-4" />;
      case 'Upcoming':
        return <PlayCircle className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <main>
          {/* Hero Section */}
          <section className="relative flex h-[80vh] items-center justify-center text-center overflow-hidden">
            <Particles className="absolute inset-0 -z-10" quantity={150} />
            <div className="container z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-headline text-4xl font-bold tracking-tight uppercase sm:text-6xl"
              >
                Bringing Artificial Intelligence
                <br />
                <span className="animated-gradient-text">From Vision to Reality</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
              >
                Explore our AI projects — shaping industries, research, and the future.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <Button size="lg" asChild>
                  <a href="#projects-grid">
                    View Ongoing Projects <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Project Filters & Showcase */}
          <section id="projects-grid" className="py-24 sm:py-32">
            <div className="container">
              <div className="flex items-center justify-center mb-12 flex-wrap gap-2">
                <Filter className="mr-4 h-5 w-5 text-muted-foreground" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(category)}
                    className="transition-all"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Card className="h-full flex flex-col group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
                       <CardHeader>
                          <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                              <Image
                                  src={project.imageUrl}
                                  alt={project.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                          </div>
                          <div className="flex justify-between items-center">
                            <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                            <Badge variant="secondary">{project.category}</Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                       </CardHeader>
                       <CardContent className="mt-auto flex justify-between items-center">
                          <Badge variant="outline" className="flex items-center">
                             {getStatusIcon(project.status)}
                             {project.status}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                              <Link href={`/projects/${project.id}`}>
                                Learn More
                              </Link>
                          </Button>
                       </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
          
           {/* CTA */}
            <section className="py-24 sm:py-32 bg-muted/50">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                         <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Build the Future With TECHISMUST</h2>
                         <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            Have an idea that could change the world? We want to hear it.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Dialog open={isProposalOpen} onOpenChange={setIsProposalOpen}>
                                <DialogTrigger asChild>
                                    <Button size="lg">Submit Your Proposal</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="font-headline">Submit a Proposal</DialogTitle>
                                        <DialogDescription>Share your innovative idea with us. We review every submission.</DialogDescription>
                                    </DialogHeader>
                                    <Form {...proposalForm}>
                                        <form onSubmit={proposalForm.handleSubmit(handleProposalSubmit)} className="space-y-4">
                                            <FormField control={proposalForm.control} name="name" render={({ field }) => (
                                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                             <FormField control={proposalForm.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={proposalForm.control} name="proposal" render={({ field }) => (
                                                <FormItem><FormLabel>Your Proposal</FormLabel><FormControl><Textarea placeholder="Describe your idea in detail..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <DialogFooter>
                                                <Button type="submit" disabled={proposalForm.formState.isSubmitting}>
                                                    {proposalForm.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                                    Submit
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>

                             <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen}>
                                <DialogTrigger asChild>
                                     <Button size="lg" variant="outline">Join a Project</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="font-headline">Join a Project</DialogTitle>
                                        <DialogDescription>Interested in contributing to one of our ongoing projects? Let us know.</DialogDescription>
                                    </DialogHeader>
                                    <Form {...joinForm}>
                                        <form onSubmit={joinForm.handleSubmit(handleJoinSubmit)} className="space-y-4">
                                            <FormField control={joinForm.control} name="name" render={({ field }) => (
                                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                             <FormField control={joinForm.control} name="email" render={({ field }) => (
                                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                             <FormField control={joinForm.control} name="project" render={({ field }) => (
                                                <FormItem><FormLabel>Project of Interest</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a project" /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            {projects.filter(p => p.status === 'Ongoing').map(p => (
                                                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={joinForm.control} name="interest" render={({ field }) => (
                                                <FormItem><FormLabel>Why are you interested?</FormLabel><FormControl><Textarea placeholder="Tell us about your skills and why you want to join..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <DialogFooter>
                                                <Button type="submit" disabled={joinForm.formState.isSubmitting}>
                                                    {joinForm.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                                    Submit Request
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
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
