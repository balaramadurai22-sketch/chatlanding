
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Layers, Filter, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/projects-data';
import { useState } from 'react';

const categories = ['All', 'Ongoing', 'Completed', 'Upcoming', 'Predictive', 'Generative', 'Automation', 'Quantum'];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

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
                            <Button asChild size="lg">
                                <Link href="/contact">Submit Your Proposal</Link>
                            </Button>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/contact">Join a Project</Link>
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
