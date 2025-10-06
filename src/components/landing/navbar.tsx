"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Research", href: "#research" },
  { name: "Projects", href: "#projects" },
  { name: "AI Lab", href: "#ai-lab" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(s => s);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="font-headline text-xl font-bold animated-gradient-text">
            TECHismust AI
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                    "text-sm font-medium transition-colors text-foreground/80 hover:text-foreground",
                    activeSection === link.href.substring(1) && "text-primary"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#ai-lab" onClick={(e) => handleNavClick(e, '#ai-lab')}>
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
               <a href="#home" className="font-headline text-xl font-bold animated-gradient-text" onClick={(e) => handleNavClick(e, '#home')}>
                TECHismust AI
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-medium transition-colors hover:text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {link.name}
                </motion.a>
              ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * navLinks.length, duration: 0.5 }}
                >
                    <a href="#ai-lab" onClick={(e) => handleNavClick(e, '#ai-lab')}>
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
