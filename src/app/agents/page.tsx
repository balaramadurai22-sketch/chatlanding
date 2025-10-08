
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Bot, Search, Filter, Cpu, CheckCircle, Activity } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { agents } from '@/lib/agents-data';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
            <div className="container flex h-20 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Agents</h1>
                    <p className="text-muted-foreground">Create, manage, and deploy your AI agents.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Agent
                    </Button>
                </div>
            </div>
        </header>

        <main className="container py-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {filteredAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                            <Bot className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="font-headline text-lg">{agent.name}</CardTitle>
                          </div>
                      </div>
                      <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                        {agent.status === 'Active' ? <CheckCircle className="mr-1 h-3 w-3" /> : <Activity className="mr-1 h-3 w-3" />}
                        {agent.status}
                      </Badge>
                    </div>
                    <CardDescription className="pt-2">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-xs text-muted-foreground space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="h-3 w-3" />
                            <span>Model: {agent.model}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <span>Owner: {agent.owner}</span>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                     {agent.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                     ))}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
}
