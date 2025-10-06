'use client';

import { useState } from 'react';
import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Solutions from '@/components/landing/solutions';
import Research from '@/components/landing/research';
import Projects from '@/components/landing/projects';
import Chat from '@/components/landing/chat';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const router = useRouter();

  const handleOpenChat = (query?: string) => {
    if (query) {
      setInitialQuery(query);
    }
    setIsChatOpen(true);
  };
  
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setInitialQuery('');
  };

  return (
    <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
            <Hero onChatSubmit={handleOpenChat} />
            <Solutions />
            <Research />
            <Projects />
            <Chat isOpen={isChatOpen} onOpenChange={handleCloseChat} initialQuery={initialQuery} onTriggerClick={handleOpenChat} />
            <Contact />
        </main>
        <Footer />
    </div>
  );
}
