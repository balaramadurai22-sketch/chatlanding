'use client';

import { useState } from 'react';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Solutions from '@/components/landing/solutions';
import Research from '@/components/landing/research';
import Projects from '@/components/landing/projects';
import Chat from '@/components/landing/chat';
import Contact from '@/components/landing/contact';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

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
    <>
      <Hero onChatSubmit={handleOpenChat} />
      <About />
      <Solutions />
      <Research />
      <Projects />
      <Chat isOpen={isChatOpen} onOpenChange={handleCloseChat} initialQuery={initialQuery} onTriggerClick={() => handleOpenChat()} />
      <Contact />
    </>
  );
}
