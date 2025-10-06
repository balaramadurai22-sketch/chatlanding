'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, Bot, Cog, FlaskConical, Rocket, ArrowRight, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const solutions = [
  {
    icon: <BrainCircuit className="size-8 text-foreground" />,
    title: 'Predictive AI Systems',
    description: 'Forecast trends and anticipate needs with unparalleled accuracy.',
    longDescription: 'Leverage machine learning to forecast trends, anticipate needs, and make data-driven decisions with unparalleled accuracy. Our predictive systems can help you optimize inventory, predict customer behavior, and mitigate risks before they arise.',
    diagram: (
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
                <motion.path
                    id="flow-path-1"
                    d="M10 25 C 30 10, 40 10, 50 25"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                    fill="none"
                />
                <motion.path
                    id="flow-path-2"
                    d="M50 25 C 60 40, 70 40, 90 25"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                    fill="none"
                />
            </defs>
            <motion.circle cx="10" cy="25" r="3" fill="hsl(var(--primary))" />
            <motion.circle cx="50" cy="25" r="5" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            <motion.circle cx="90" cy="25" r="3" fill="hsl(var(--primary))" />

            <motion.circle r="1" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                <offsetPath href="#flow-path-1" />
            </motion.circle>
             <motion.circle r="1" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }}>
                <offsetPath href="#flow-path-2" />
            </motion.circle>
        </svg>
    ),
  },
  {
    icon: <Bot className="size-8 text-foreground" />,
    title: 'Generative AI Applications',
    description: 'Create novel content, from text and images to complex code.',
    longDescription: 'Create novel content, from text and images to complex code, with our cutting-edge generative models. Build anything from creative storytelling tools to powerful code assistants that accelerate your development cycle.',
     diagram: (
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <motion.circle cx="50" cy="25" r="5" fill="hsl(var(--primary))" />
            <motion.line x1="50" y1="25" x2="30" y2="10" stroke="hsl(var(--border))" strokeWidth="0.5" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.line x1="50" y1="25" x2="70" y2="10" stroke="hsl(var(--border))" strokeWidth="0.5" 
                 initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}/>
            <motion.line x1="50" y1="25" x2="30" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" 
                 initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}/>
            <motion.line x1="50" y1="25" x2="70" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" 
                 initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}/>
        </svg>
    ),
  },
  {
    icon: <Cog className="size-8 text-foreground" />,
    title: 'Automation Tools',
    description: 'Streamline workflows and boost efficiency with intelligent automation.',
    longDescription: 'Streamline your workflows and boost efficiency with intelligent automation that adapts to your business needs. From simple task automation to complex process orchestration, our tools help you save time and reduce errors.',
     diagram: (
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
             <defs>
                <motion.path id="flow-path-cog" d="M10 25 H 90" stroke="hsl(var(--border))" strokeWidth="0.5" fill="none" />
             </defs>
             <motion.rect x="25" y="22" width="6" height="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" />
             <motion.rect x="47" y="22" width="6" height="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" />
             <motion.rect x="69" y="22" width="6" height="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" />
             <motion.circle r="1.5" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <offsetPath href="#flow-path-cog" />
            </motion.circle>
        </svg>
    ),
  },
  {
    icon: <FlaskConical className="size-8 text-foreground" />,
    title: 'AI-Powered Research',
    description: 'Accelerate discovery with AI platforms that analyze vast datasets.',
    longDescription: 'Accelerate discovery and innovation with AI platforms that analyze vast datasets and uncover hidden insights. Our research tools empower scientists and analysts to find patterns and correlations that would be impossible to detect manually.',
     diagram: (
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <motion.circle cx="20" cy="25" r="2" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="40" cy="25" r="2" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="60" cy="25" r="2" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="80" cy="25" r="2" fill="hsl(var(--primary))" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
    ),
  },
  {
    icon: <Rocket className="size-8 text-foreground" />,
    title: 'Innovative Prototyping',
    description: 'Turn impossible ideas into functional AI-driven products.',
    longDescription: 'Turn impossible ideas into functional AI-driven products and prototypes, ready for real-world testing and validation. Our rapid prototyping process integrates AI from the ground up, allowing you to iterate and innovate faster than ever before.',
     diagram: (
        <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M20 35 C 40 35, 40 15, 60 15 S 80 15, 80 35" stroke="hsl(var(--border))" strokeDasharray="2 2" strokeWidth="0.5" fill="none"/>
            <motion.circle cx="20" cy="35" r="3" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" />
            <motion.circle cx="80" cy="35" r="3" fill="hsl(var(--primary))" />
             <motion.circle r="1.5" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <offsetPath path="M20 35 C 40 35, 40 15, 60 15 S 80 15, 80 35" />
            </motion.circle>
        </svg>
    ),
  },
];

const SolutionDialogContent = ({ solution }: { solution: (typeof solutions)[0] }) => (
    <DialogContent className="max-w-xl">
        <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                    {solution.icon}
                </div>
                <DialogTitle className="font-headline text-2xl">{solution.title}</DialogTitle>
            </div>
            <div className="h-32 w-full bg-muted/30 rounded-md flex items-center justify-center p-4 my-4">
                {solution.diagram}
            </div>
            <DialogDescription className="text-base text-muted-foreground text-left">
                {solution.longDescription}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant="outline" className="transition-all hover:bg-foreground/10">
                View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </DialogFooter>
    </DialogContent>
);


const DesktopSolutions = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % solutions.length);
        }, 3000); // Increased interval to 3s

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleMouseEnter = (index: number) => {
        setIsHovered(true);
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const activeSolution = solutions[activeIndex];
    const otherSolutions = solutions.filter((_, i) => i !== activeIndex);

    return (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[450px]">
            <Dialog>
                 <DialogTrigger asChild>
                    <motion.div
                        layoutId={`solution-card-${activeSolution.title}`}
                        className="lg:col-span-2 p-8 rounded-lg border bg-card shadow-sm flex flex-col justify-between cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(activeIndex)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted mb-6">
                                {React.cloneElement(activeSolution.icon, { className: "size-10 text-foreground"})}
                            </div>
                            <h3 className="font-headline text-3xl font-bold">{activeSolution.title}</h3>
                            <p className="text-lg text-muted-foreground mt-2">{activeSolution.description}</p>
                        </div>
                        <div className="h-32 w-full bg-muted/30 rounded-md flex items-center justify-center p-4 mt-6">
                            {activeSolution.diagram}
                        </div>
                    </motion.div>
                </DialogTrigger>
                <SolutionDialogContent solution={activeSolution} />
            </Dialog>


            <div className="flex flex-col gap-4">
                 <AnimatePresence>
                    {otherSolutions.map((solution, index) => {
                        const originalIndex = solutions.findIndex(s => s.title === solution.title);
                        return (
                            <Dialog key={solution.title}>
                                <DialogTrigger asChild>
                                    <motion.div
                                        layoutId={`solution-card-${solution.title}`}
                                        className="p-4 rounded-lg border bg-card/70 shadow-sm flex items-center gap-4 cursor-pointer transition-all hover:bg-card"
                                        onMouseEnter={() => handleMouseEnter(originalIndex)}
                                        onMouseLeave={handleMouseLeave}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                                            {solution.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-semibold">{solution.title}</h4>
                                        </div>
                                    </motion.div>
                                </DialogTrigger>
                                <SolutionDialogContent solution={solution} />
                            </Dialog>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MobileSolutions = () => {
  return (
    <div className="md:hidden">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {solutions.map((solution, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2">
              <div className="p-1 h-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="group flex flex-col justify-between h-full hover:shadow-lg transition-all bg-card cursor-pointer border overflow-hidden">
                            <CardHeader>
                                <div className="h-24 w-full bg-muted/30 group-hover:bg-muted/50 transition-colors flex items-center justify-center p-4">
                                    {solution.diagram}
                                </div>
                                <CardTitle className="font-headline text-xl font-bold pt-4 flex items-center gap-3">
                                  {solution.icon}
                                  {solution.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground transition-all duration-300">
                                {solution.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <SolutionDialogContent solution={solution} />
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default function Solutions() {
    const isMobile = useIsMobile();
  return (
    <section id="solutions" className="bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            AI-Driven Solutions for a Smarter Future
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Intelligent systems that learn, adapt, and create — turning complex challenges into actionable solutions.
          </p>
        </motion.div>

        <div className="mt-16">
            { isMobile ? <MobileSolutions /> : <DesktopSolutions /> }
        </div>
      </div>
    </section>
  );
}

    