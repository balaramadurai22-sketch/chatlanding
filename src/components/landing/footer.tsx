'use client';

import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Research', href: '#research' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Lab', href: '#ai-lab' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t bg-background">
      <div className="container relative py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#home" className="font-headline text-lg font-bold animated-gradient-text" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              TECHismust AI
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TECHismust. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-5 right-6 rounded-full bg-background transition-all hover:bg-foreground/10"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
}
