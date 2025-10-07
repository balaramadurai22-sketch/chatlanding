
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Bot, Code, Filter, Search, Linkedin, Twitter, Dribbble, ExternalLink, Send, Loader } from 'lucide-react';
import Image from 'next/image';
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
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { showcaseProjects } from '@/lib/showcase-projects';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['All', 'Startup', 'Tool', 'App', 'Research'];
const models = ['All', 'TIM 2.0', 'Generative AI', 'Predictive AI'];

const submissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  projectName: z.string().min(3, "Project name is required."),
  modelUsed: z.string().min(1, "Please select a model."),
  description: z.string().min(20, "Please provide a detailed description."),
  impact: z.string().min(10, "Describe the project's impact."),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

export default function GrowWithUsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModel, setActiveModel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitOpen, setSubmitOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubmissionFormValues>({ resolver: zodResolver(submissionSchema) });

  const onSubmit: SubmitHandler<SubmissionFormValues> = async (data) => {
    console.log("Project Submission:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({ title: "Project Submitted!", description: "Thank you for sharing your innovation. It will be reviewed by our team." });
    form.reset();
    setSubmitOpen(false);
  };

  const filteredProjects = showcaseProjects.filter(p => {
    const categoryMatch = activeCategory === 'All' || p.type === activeCategory;
    const modelMatch = activeModel === 'All' || p.modelUsed === activeModel;
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && modelMatch && searchMatch;
  });

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
                Grow With TECHISMUST AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
              >
                See how innovators worldwide are building the next generation of apps, products, and startups with our AI models.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <Button size="lg" asChild>
                  <a href="#showcase">
                    Explore Showcase <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Projects Showcase */}
          <section id="showcase" className="py-24 sm:py-32">
            <div className="container">
              <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <div>
                        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Innovation Showcase</h2>
                        <p className="text-muted-foreground mt-2">Projects built by our community of developers and partners.</p>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search projects..." 
                            className="pl-10 w-full md:w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                 <div className="flex items-center justify-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className="transition-all"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Bot className="mr-2 h-4 w-4 text-muted-foreground" />
                        {models.map((model) => (
                             <Button
                                key={model}
                                variant={activeModel === model ? 'secondary' : 'outline'}
                                onClick={() => setActiveModel(model)}
                                className="transition-all"
                            >
                                {model}
                            </Button>
                        ))}
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Card className="h-full flex flex-col group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                               <CardHeader>
                                  <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                                      <Image
                                          src={project.imageUrl}
                                          alt={project.name}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                  </div>
                                  <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
                                  <CardDescription>{project.description}</CardDescription>
                               </CardHeader>
                               <CardContent className="mt-auto">
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <Badge variant="outline">{project.modelUsed}</Badge>
                                        <p>~{project.buildTime}</p>
                                    </div>
                               </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle className="font-headline text-2xl">{project.name}</DialogTitle>
                                <DialogDescription>
                                    <Badge variant="secondary" className="my-2">{project.type}</Badge>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Builder</h4>
                                    <div className="flex items-center gap-3 mt-2">
                                        <Image src={project.builder.imageUrl} alt={project.builder.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <p>{project.builder.name}</p>
                                            <p className="text-sm text-muted-foreground">{project.builder.role}</p>
                                        </div>
                                        <div className="flex gap-2 ml-auto">
                                            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={16} /></a>
                                            <a href="#" className="text-muted-foreground hover:text-primary"><Twitter size={16} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Impact</h4>
                                    <p className="text-muted-foreground text-sm mt-1">{project.impact}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">AI Model Used</h4>
                                    <p className="text-muted-foreground text-sm mt-1">{project.modelUsed}</p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" asChild>
                                    <Link href="#">View Project <ExternalLink size={16} className="ml-2" /></Link>
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-32 bg-muted/50">
            <div className="container text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Have an Innovation to Share?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                If you've built something amazing with our AI, we want to see it. Submit your project to be featured in our showcase.
              </p>
              <Button size="lg" className="mt-8" onClick={() => setSubmitOpen(true)}>
                <Code className="mr-2 h-4 w-4" />
                Submit Your Project
              </Button>
            </div>
          </section>
        </main>
      </div>

       {/* Submit Project Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setSubmitOpen}>
          <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">Submit Your Project</DialogTitle>
                  <DialogDescription>Share your innovation built with TECHISMUST AI.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Ada Lovelace" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="ada@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="projectName" render={({ field }) => (
                          <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="My Awesome AI App" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="modelUsed" render={({ field }) => (
                          <FormItem><FormLabel>AI Model Used</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a model" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="TIM 2.0">TIM 2.0</SelectItem>
                                    <SelectItem value="Generative AI">Generative AI</SelectItem>
                                    <SelectItem value="Predictive AI">Predictive AI</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="description" render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea className="min-h-[100px]" placeholder="Describe what your project does..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="impact" render={({ field }) => (
                          <FormItem><FormLabel>Impact</FormLabel><FormControl><Textarea className="min-h-[80px]" placeholder="What problem does it solve or what value does it create?" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <DialogFooter>
                          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                              {form.formState.isSubmitting ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-4 w-4" /> Submit for Review</>}
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
