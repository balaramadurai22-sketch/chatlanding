'use client';

import { motion } from 'framer-motion';
import { Award, Bot, HeartHandshake, Users } from 'lucide-react';
import AboutPanels from '@/components/landing/about';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const achievements = [
  {
    icon: <Award className="size-8 text-primary" />,
    value: '12',
    label: 'Completed Innovations',
  },
  {
    icon: <Bot className="size-8 text-primary" />,
    value: '5',
    label: 'Ongoing R&D Projects',
  },
  {
    icon: <HeartHandshake className="size-8 text-primary" />,
    value: '8',
    label: 'Industry Collaborations',
  },
];

const team = [
  {
    name: 'Dr. Evelyn Reed',
    role: 'Chief AI Scientist',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    name: 'Marcus Chen',
    role: 'Lead Innovation Engineer',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
  {
    name: 'Aria Sharma',
    role: 'Head of Collaborative Projects',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
  },
   {
    name: 'Leo Martinez',
    role: 'Vision & Strategy Lead',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-20 sm:py-24 md:py-32 text-center container relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_60%)] -z-10"></div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-headline text-4xl font-bold tracking-tight sm:text-5xl animated-gradient-text"
          >
            About TECHismust Innovation Lab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Turning Impossible into Possible with Cutting-Edge AI Solutions.
          </motion.p>
        </section>

        {/* Re-using the interactive panels component */}
        <AboutPanels />
        
        {/* Achievements Section */}
        <section className="py-20 sm:py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Milestones</h2>
                <p className="mt-4 text-lg text-muted-foreground">Quantifying our journey of innovation and collaboration.</p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="text-center p-6 border rounded-lg bg-card"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold font-headline">{item.value}</div>
                  <p className="text-muted-foreground mt-2">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Meet the Innovators</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The minds behind our mission to redefine what's possible with AI.</p>
                </div>
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, i) => (
                         <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="text-center group"
                         >
                            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover"/>
                            </div>
                            <h4 className="mt-4 text-lg font-bold font-headline">{member.name}</h4>
                            <p className="text-muted-foreground">{member.role}</p>
                         </motion.div>
                    ))}
                </div>
            </div>
        </section>

         {/* CTA Section */}
        <section className="py-20 sm:py-24 text-center container">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Ready to build the future?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Let's connect and explore how we can turn your vision into reality.</p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/solutions">Explore Our Solutions</Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
