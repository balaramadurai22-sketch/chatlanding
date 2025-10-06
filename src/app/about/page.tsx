'use client';

import { motion } from 'framer-motion';
import { Award, Dna, Bot, Users, Milestone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Particles from '@/components/landing/particles';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

const coreValues = [
  {
    icon: <Bot className="size-8" />,
    title: 'Innovation',
    description: 'Redefining limits with AI technology.',
    details: 'We are committed to pushing the boundaries of what is possible. Our team constantly explores new algorithms, models, and applications to create solutions that are not just better, but revolutionary.'
  },
  {
    icon: <Award className="size-8" />,
    title: 'Integrity',
    description: 'Transparent, ethical, and responsible AI.',
    details: 'We believe that with great power comes great responsibility. Our AI systems are built on a foundation of fairness, transparency, and respect for privacy, ensuring our technology serves humanity positively.'
  },
  {
    icon: <Users className="size-8" />,
    title: 'Collaboration',
    description: 'Open-source and teamwork-oriented initiatives.',
    details: 'The future of AI will be built together. We actively partner with academic institutions, industry leaders, and the open-source community to share knowledge and accelerate collective progress.'
  },
  {
    icon: <Dna className="size-8" />,
    title: 'Excellence',
    description: 'Cutting-edge solutions with measurable impact.',
    details: 'We set the highest standards for ourselves and our work. From initial concept to final deployment, we focus on delivering robust, scalable, and effective AI solutions that provide real-world value.'
  },
];

const timeline = [
  { year: '2021', title: 'Lab Founded', description: 'TECHismust Innovation Lab was established with a mission to explore the frontiers of AI.' },
  { year: '2022', title: 'Project Sentinel Launch', description: 'Our first major breakthrough in autonomous security systems.' },
  { year: '2023', title: 'Open-Source Contribution', description: 'Released our ethical AI auditing toolkit to the open-source community.' },
  { year: '2024', title: 'GenAI Platform v1', description: 'Launched our enterprise-grade generative AI platform.' },
  { year: 'Future', title: 'Project Origin', description: 'Developing AI to tackle complex environmental challenges.' },
];

const team = [
  { name: 'Dr. Evelyn Reed', role: 'Chief AI Scientist', expertise: 'Machine Learning, Neural Networks', image: 'https://picsum.photos/seed/team1/200/200' },
  { name: 'Marcus Chen', role: 'Head of Engineering', expertise: 'Distributed Systems, AI Infrastructure', image: 'https://picsum.photos/seed/team2/200/200' },
  { name: 'Javier Solis', role: 'Lead Product Designer', expertise: 'Human-AI Interaction, UX Research', image: 'https://picsum.photos/seed/team3/200/200' },
  { name: 'Amina Khan', role: 'Senior Research Engineer', expertise: 'Natural Language Processing, Ethics in AI', image: 'https://picsum.photos/seed/team4/200/200' },
];

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background text-foreground">
       <main>
        {/* Hero Section */}
        <section className="relative flex h-[60vh] items-center justify-center text-center overflow-hidden">
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="container">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="font-headline text-4xl font-bold tracking-tight sm:text-6xl"
                >
                    Turning the Impossible into Possible
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                    className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
                >
                    Innovating the future with intelligent systems, research, and collaboration.
                </motion.p>
            </div>
        </section>

        {/* Company Overview */}
        <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-5xl text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Purpose</h2>
                 <div className="mt-12 grid md:grid-cols-2 gap-12 text-left">
                     <div>
                        <h3 className="font-headline text-2xl font-bold">Mission</h3>
                        <p className="mt-4 text-lg text-muted-foreground">Empower businesses and individuals with AI solutions that push the boundaries of technology and create a measurable, positive impact on the world.</p>
                     </div>
                     <div>
                        <h3 className="font-headline text-2xl font-bold">Vision</h3>
                        <p className="mt-4 text-lg text-muted-foreground">Create an ecosystem where impossible ideas become reality through collaborative, ethical, and groundbreaking AI-driven innovation.</p>
                     </div>
                 </div>
            </div>
        </section>
        
        {/* Core Values */}
        <section className="py-24 sm:py-32 bg-muted/50">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {coreValues.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Card className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {value.icon}
                                    </div>
                                    <CardTitle className="pt-4 font-headline text-xl">{value.title}</CardTitle>
                                    <CardDescription>{value.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-5xl text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
                 <div className="relative mt-16">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-border -z-10"></div>
                     <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative flex items-center justify-center">
                                <div className={`w-full md:w-2/5 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <Card className="inline-block">
                                        <CardHeader>
                                            <p className="text-sm font-semibold text-primary">{item.year}</p>
                                            <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                            <CardDescription>{item.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary text-primary">
                                    <Milestone className="size-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="py-24 sm:py-32 bg-muted/50">
             <div className="container mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Meet the Innovators</h2>
                <p className="mt-4 text-lg text-muted-foreground">We are a collective of researchers, engineers, and dreamers passionate about building the future.</p>
                <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {team.map((member) => (
                        <div key={member.name} className="group relative text-center">
                             <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-background group-hover:border-primary transition-all duration-300">
                                <Image src={member.image} alt={member.name} fill className="object-cover"/>
                            </div>
                            <h4 className="mt-4 font-headline text-lg font-bold">{member.name}</h4>
                            <p className="text-sm text-primary">{member.role}</p>
                            <p className="text-xs text-muted-foreground">{member.expertise}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
            <div className="container text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Join Our Mission</h2>
                 <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    We are always looking for passionate individuals and ambitious partners to help us shape the future of artificial intelligence.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/solutions">Explore Our Solutions</Link>
                    </Button>
                     <Button asChild size="lg" variant="outline">
                        <Link href="/contact">Get in Touch <ArrowRight className="ml-2 size-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
       </main>
    </div>
    <Footer />
    </>
  );
}
