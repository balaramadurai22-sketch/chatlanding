
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
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleOpenChat = (query?: string) => {
    if (query) {
      router.push(`/chat?query=${encodeURIComponent(query)}`);
    } else {
      router.push('/chat');
    }
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
