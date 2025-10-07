
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Company', href: '/company' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' },
  { name: 'AI Lab', href: '/ai-lab' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      if (pathname === '/') {
        const sections = navLinks.filter(l => l.href.startsWith('/#')).map(link => document.getElementById(link.href.substring(2)));
        let currentSection = '';

        for (const section of sections) {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section.id;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  const getIsActive = (link: {href: string}) => {
     if (link.href.startsWith('/#')) {
      if (pathname === '/') {
         const sectionId = link.href.substring(2);
         if (!activeSection && sectionId === 'home') return true;
         return activeSection === sectionId;
      }
      return false;
    }
    // For non-hash links, check if the pathname starts with the href.
    // This makes parent routes active for nested routes (e.g. /solutions is active for /solutions/predictive)
    if (link.href === '/') return pathname === '/';
    return pathname.startsWith(link.href);
  }

  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || isMenuOpen || !isHomePage ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="/" className="font-headline text-xl font-bold animated-gradient-text">
            TECHismust AI
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              // Only render hash links on the homepage
              if (link.href.startsWith('/#') && !isHomePage) {
                return null;
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                      'text-sm font-medium transition-colors text-foreground/80 hover:text-foreground',
                      getIsActive(link) ? 'text-primary' : ''
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:block">
            <a href={isHomePage ? "/ai-lab" : "/ai-lab"}>
              <Button variant="ghost" className="transition-all hover:bg-foreground/10">Explore AI</Button>
            </a>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto flex h-20 items-center justify-between">
               <Link href="/" className="font-headline text-xl font-bold animated-gradient-text" onClick={handleMenuLinkClick}>
                TECHismust AI
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col items-center gap-8">
              {navLinks.map((link, i) => {
                 if (link.href.startsWith('/#') && !isHomePage) {
                    return null;
                 }
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleMenuLinkClick}
                    className="text-2xl font-medium transition-colors hover:text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    {link.name}
                  </motion.a>
                )
              })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * navLinks.length, duration: 0.5 }}
                >
                    <a href={isHomePage ? "/ai-lab" : "/ai-lab"} onClick={handleMenuLinkClick}>
                        <Button variant="outline" size="lg">Explore AI</Button>
                    </a>
                </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
