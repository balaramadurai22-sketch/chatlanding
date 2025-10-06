
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Bot, Dna, FlaskConical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/projects-data';

const labPrinciples = [
    {
        icon: <Dna className="size-8" />,
        title: 'Evolutionary Learning',
        description: 'Our models aren\'t just trained; they evolve, adapt, and learn from every interaction.',
    },
    {
        icon: <FlaskConical className="size-8" />,
        title: 'Radical Experimentation',
        description: 'We test the limits of AI, turning hypotheses into functional prototypes.',
    },
    {
        icon: <Bot className="size-8" />,
        title: 'Human-Centric Design',
        description: 'Intelligence with purpose. We build AI that empowers, assists, and collaborates.',
    },
];

const modelsInLab = projects.filter(p => ['Ongoing', 'Upcoming'].includes(p.status)).slice(0, 6);


export default function AiLabPage() {
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
                Where Intelligence Learns,
                <br />
                <span className="animated-gradient-text">Evolves, and Creates</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
              >
                Welcome to the AI Lab — the heart of innovation and experimentation at TECHISMUST.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <Button size="lg" asChild>
                  <a href="#live-models">
                    Explore the Lab <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Live Models Section */}
          <section id="live-models" className="py-24 sm:py-32">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-16">
                 <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Live Model Arena</h2>
                 <p className="mt-4 text-lg text-muted-foreground">Witness our AI models in their active states of training, testing, and deployment. This is intelligence in motion.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modelsInLab.map((model, i) => (
                  <motion.div 
                    key={model.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="h-full flex flex-col group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
                       <CardHeader>
                          <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                              <Image
                                  src={model.imageUrl}
                                  alt={model.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end p-4">
                                  <Badge variant={model.status === 'Ongoing' ? 'default' : 'secondary'}>{model.status}</Badge>
                               </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <CardTitle className="font-headline text-xl">{model.title}</CardTitle>
                          </div>
                          <CardDescription>{model.description}</CardDescription>
                       </CardHeader>
                       <CardContent className="mt-auto flex justify-between items-center">
                          <Badge variant="outline">{model.category}</Badge>
                          <Button variant="ghost" size="sm" asChild>
                              <Link href={`/projects/${model.id}`}>
                                View Details
                              </Link>
                          </Button>
                       </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

           {/* Lab Principles */}
          <section className="py-24 sm:py-32 bg-muted/50">
            <div className="container">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Lab Principles</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our research is guided by a core philosophy that blends ambition with responsibility.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {labPrinciples.map((principle, i) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Card className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {principle.icon}
                                    </div>
                                    <CardTitle className="pt-4 font-headline text-xl">{principle.title}</CardTitle>
                                    <CardDescription>{principle.description}</CardDescription>
                                </CardHeader>
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
                         <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Experience the Future of AI</h2>
                         <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            TECHISMUST AI Lab is where intelligence grows, evolves, and becomes reality. Join us on the frontier of innovation.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button asChild size="lg">
                                <Link href="/research">Explore Research</Link>
                            </Button>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/contact">Join Our Team</Link>
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
