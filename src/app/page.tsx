

'use client';

import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import Achievements from '@/components/landing/achievements';
import Models from '@/components/landing/models';
import Solutions from '@/components/landing/solutions';
import Research from '@/components/landing/research';
import Projects from '@/components/landing/projects';
import Contact from '@/components/landing/contact';
import About from '@/components/landing/about';
import Footer from '@/components/landing/footer';

export default function Home() {

  const handleOpenChat = (query?: string) => {
    // This function is now empty as the chat page has been removed.
  };

  return (
    <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
            <Hero onChatSubmit={handleOpenChat} />
            <Achievements />
            <Models />
            <About />
            <Solutions />
            <Research />
            <Projects />
            <Contact />
        </main>
        <Footer />
    </div>
  );
}
