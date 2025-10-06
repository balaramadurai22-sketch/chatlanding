import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Projects from '@/components/landing/projects';
import Chat from '@/components/landing/chat';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Solutions from '@/components/landing/solutions';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Solutions />
        <Projects />
        <Chat />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
