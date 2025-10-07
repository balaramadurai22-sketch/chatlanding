'use client';

import { motion } from 'framer-motion';
import { Linkedin, Instagram, Twitter, BrainCircuit, Users, Award, GitCommitHorizontal } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { teamMembers } from '@/lib/company-data';

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  // This is a simplified counter; a more complex one would use a library or more advanced Framer Motion hooks.
  return (
    <div className="text-center">
      <p className="font-headline text-4xl font-bold text-primary">{value}+</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <main>
          {/* Hero Section */}
          <section className="relative flex h-[70vh] items-center justify-center text-center overflow-hidden">
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="container z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-headline text-4xl font-bold tracking-tight sm:text-6xl"
              >
                Meet the Visionaries Behind TECHISMUST
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
              >
                We are a collective of creators, thinkers, and innovators dedicated to building the future of artificial intelligence. Our strength lies in our collaborative spirit and relentless pursuit of the impossible.
              </motion.p>
            </div>
          </section>

          {/* Team Showcase */}
          <section className="py-24 sm:py-32">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-16">
                 <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">The Minds Behind the Magic</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="group relative text-center rounded-lg border bg-card/50 p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2">
                       <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-colors">
                           <Image 
                                src={member.imageUrl}
                                alt={member.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                           />
                       </div>
                       <h3 className="font-headline text-lg font-bold">{member.name}</h3>
                       <p className="text-sm text-primary">{member.role}</p>
                       <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin size={18} /></a>
                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram size={18} /></a>
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter size={18} /></a>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Milestones */}
          <section className="py-24 sm:py-32 bg-muted/30">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Core Principles</h2>
                        <p className="mt-4 text-lg text-muted-foreground">We are driven by a set of values that guide our research, our products, and our impact on the world.</p>
                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-1">
                                    <BrainCircuit size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Pioneer Innovation</h4>
                                    <p className="text-muted-foreground">Challenge the status quo and explore uncharted territories in AI.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-1">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Collaborate Radically</h4>
                                    <p className="text-muted-foreground">Foster an open environment where ideas are shared and built upon collectively.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-1">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Deliver Excellence</h4>
                                    <p className="text-muted-foreground">Strive for the highest quality in our research, products, and partnerships.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <AnimatedCounter value={12} label="Projects Completed" />
                        <AnimatedCounter value={45} label="Active Models" />
                        <AnimatedCounter value={20} label="Research Papers" />
                        <AnimatedCounter value={15} label="Global Collaborations" />
                    </div>
                </div>
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}
