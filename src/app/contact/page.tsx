
'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, MessageSquare, Bot, Code, Users, Briefcase, FileText, Upload, Send, Loader } from 'lucide-react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import Particles from '@/components/landing/particles';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  inquiryType: z.string().min(1, "Please select an inquiry type."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  attachment: z.any().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "Email", icon: <Mail />, url: "mailto:support@techismust.com", handle: "support@techismust.com" },
  { name: "LinkedIn", icon: <Linkedin />, url: "https://linkedin.com", handle: "linkedin.com/techismust" },
  { name: "Twitter", icon: <Twitter />, url: "https://twitter.com", handle: "@techismust" },
  { name: "WhatsApp", icon: <MessageSquare />, url: "https://wa.me/your-number", handle: "Live Chat (9am-6pm IST)" },
];

const collaborationTypes = [
    { icon: <Bot size={24} />, title: "AI Model Integration", description: "Integrate our models into your stack." },
    { icon: <Code size={24} />, title: "Custom Solutions", description: "Bespoke AI solutions for your business." },
    { icon: <Users size={24} />, title: "Research Partnerships", description: "Collaborate on groundbreaking research." },
    { icon: <Briefcase size={24} />, title: "Enterprise Support", description: "Dedicated support for large-scale deployments." },
]

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        console.log("Contact Form Submission:", data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({ title: "Message Sent!", description: "Thank you for reaching out. We will get back to you shortly." });
        form.reset();
    };

    const scrollToForm = () => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }

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
                className="font-headline text-4xl font-bold tracking-tight sm:text-6xl"
              >
                Connect with TECHISMUST
                <br />
                <span className="animated-gradient-text">Fully Virtual, Globally Accessible</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
              >
                We operate in a virtual office, allowing us to collaborate with innovators and partners from anywhere in the world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <Button size="lg" onClick={scrollToForm}>
                  Start a Conversation
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Contact Methods Section */}
          <section className="py-24 sm:py-32">
              <div className="container">
                  <div className="mx-auto max-w-4xl text-center mb-16">
                      <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Virtual Office</h2>
                      <p className="mt-4 text-lg text-muted-foreground">Reach us through the channel that works best for you. Our team is distributed globally to ensure we're always available.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                      {socialLinks.map((link, i) => (
                           <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <Card className="h-full text-center group transition-all hover:shadow-xl hover:-translate-y-2">
                                        <CardHeader>
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
                                                <div className="text-primary group-hover:text-primary transition-colors h-8 w-8">{link.icon}</div>
                                            </div>
                                            <CardTitle className="pt-4 font-headline text-xl">{link.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{link.handle}</p>
                                        </CardHeader>
                                    </Card>
                                </a>
                           </motion.div>
                      ))}
                  </div>
              </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact-form" className="py-24 sm:py-32 bg-muted/30">
            <div className="container grid md:grid-cols-2 gap-16 items-center">
                 <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                 >
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Let's Create Together</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Whether it's a project proposal, a research collaboration, or a general inquiry, we're ready to listen.</p>
                     <div className="mt-8 grid grid-cols-2 gap-6">
                        {collaborationTypes.map(item => (
                            <div key={item.title} className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-1">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </motion.div>
                 <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="rounded-lg border bg-card p-8 shadow-lg"
                 >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="inquiryType" render={({ field }) => (
                                <FormItem><FormLabel>Inquiry Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a reason for contact" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                            <SelectItem value="collaboration">Collaboration</SelectItem>
                                            <SelectItem value="proposal">Project Proposal</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                            <SelectItem value="research">Research</SelectItem>
                                        </SelectContent>
                                    </Select>
                                <FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea className="min-h-[100px]" placeholder="Tell us about your project or question..." {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="attachment" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attachment (Optional)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type="file" className="pl-12 file:text-sm file:font-medium" onChange={(e) => field.onChange(e.target.files)} />
                                            <Upload className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                            </Button>
                        </form>
                    </Form>
                 </motion.div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

    