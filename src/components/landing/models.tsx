'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, Bot, Cog, FlaskConical, Rocket, ArrowRight, Mic, Camera, FileText, FastForward, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '../ui/badge';

// Visual Components for modals
const TypingEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = React.useState('');

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        i = 0;
        setDisplayedText('');
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);
  
  return <p className="font-mono text-sm text-foreground/80">{displayedText}<span className="animate-ping">|</span></p>;
};

const Waveform = () => (
    <div className="flex items-center justify-center w-full h-full gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
                key={i}
                className="w-1 bg-primary/50"
                initial={{ height: '4px' }}
                animate={{ height: ['4px', `${Math.random() * 60 + 10}px`, '4px'] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
            />
        ))}
    </div>
);

const ImageReveal = ({ src, alt }: { src: string, alt: string }) => (
    <motion.div className="w-full h-full bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${src})` }}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
    />
);

const NeuralGraph = () => (
     <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
            <motion.path id="flow1" d="M10 25 C 30 10, 40 10, 50 25" stroke="hsl(var(--border))" strokeWidth="0.5" fill="none" />
            <motion.path id="flow2" d="M50 25 C 60 40, 70 40, 90 25" stroke="hsl(var(--border))" strokeWidth="0.5" fill="none" />
            <motion.path id="flow3" d="M10 25 C 30 40, 70 10, 90 25" stroke="hsl(var(--border))" strokeWidth="0.5" fill="none" />
        </defs>
        <motion.circle cx="10" cy="25" r="3" fill="hsl(var(--primary))" />
        <motion.circle cx="50" cy="25" r="5" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <motion.circle cx="90" cy="25" r="3" fill="hsl(var(--primary))" />
        <motion.circle r="1" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <offsetPath href="#flow1" />
        </motion.circle>
        <motion.circle r="1" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }}>
            <offsetPath href="#flow2" />
        </motion.circle>
        <motion.circle r="1" fill="hsl(var(--primary))" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }}>
            <offsetPath href="#flow3" />
        </motion.circle>
    </svg>
)

const models = [
  {
    name: 'TIM-AI',
    version: '2.0',
    tagline: 'Advanced Conversational Reasoning',
    description: 'Our flagship model excels at understanding complex queries, maintaining context over long conversations, and providing nuanced, human-like responses.',
    capabilities: [
      { name: 'Text', icon: <FileText className="size-4" /> },
      { name: 'Reasoning', icon: <BrainCircuit className="size-4" /> },
      { name: 'Speed', icon: <FastForward className="size-4" /> },
    ],
    visual: <TypingEffect text="Hello, I’m TIM-AI 2.0. Ask me anything about complex problem-solving..." />,
  },
  {
    name: 'AURA',
    version: 'V1',
    tagline: 'Multimodal Vision + Text Model',
    description: 'AURA can see, read, and understand. It processes images and text simultaneously to provide rich, context-aware descriptions, analyses, and answers.',
    capabilities: [
      { name: 'Vision', icon: <Camera className="size-4" /> },
      { name: 'Text', icon: <FileText className="size-4" /> },
      { name: 'Multimodal', icon: <Bot className="size-4" /> },
    ],
    visual: <ImageReveal src="https://picsum.photos/seed/aura/400/200" alt="AURA vision" />,
  },
  {
    name: 'SONA X',
    version: 'X',
    tagline: 'Voice Interaction & Synthesis',
    description: 'The voice of our AI. SONA X offers real-time, natural-sounding speech generation and voice recognition for seamless human-computer interaction.',
    capabilities: [
      { name: 'Voice', icon: <Mic className="size-4" /> },
      { name: 'Real-time', icon: <FastForward className="size-4" /> },
    ],
    visual: <Waveform />,
  },
  {
    name: 'NEURA EDGE',
    version: 'V2.1',
    tagline: 'Real-Time Predictive Intelligence',
    description: 'Built for speed, NEURA EDGE runs on-device to deliver instant predictive insights for applications requiring low-latency responses, like IoT and analytics.',
    capabilities: [
      { name: 'Predictive', icon: <Activity className="size-4" /> },
      { name: 'Edge AI', icon: <Cog className="size-4" /> },
      { name: 'Speed', icon: <FastForward className="size-4" /> },
    ],
    visual: <NeuralGraph />,
  },
  {
    name: 'GENISYS',
    version: 'V1.5',
    tagline: 'Generative Creation Model',
    description: 'Our creative powerhouse. GENISYS can generate high-quality text, images, and is being trained for video, turning simple prompts into complex creations.',
    capabilities: [
      { name: 'Generative', icon: <FlaskConical className="size-4" /> },
      { name: 'Image', icon: <Camera className="size-4" /> },
      { name: 'Text', icon: <FileText className="size-4" /> },
    ],
    visual: <ImageReveal src="https://picsum.photos/seed/genisys/400/200" alt="GENISYS generation" />,
  },
  {
    name: 'QUANTA CORE',
    version: 'Alpha',
    tagline: 'Hybrid Neural Quantum Prototype',
    description: 'A glimpse into the future. QUANTA CORE is our experimental prototype exploring the intersection of quantum computing and neural networks to solve intractable problems.',
    capabilities: [
        { name: 'Quantum', icon: <Rocket className="size-4" /> },
        { name: 'Research', icon: <FlaskConical className="size-4" /> }
    ],
    visual: <NeuralGraph />,
  },
];

const ModelDialogContent = ({ model }: { model: (typeof models)[0] }) => (
    <DialogContent className="max-w-xl">
        <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
                <DialogTitle className="font-headline text-2xl">{model.name} {model.version}</DialogTitle>
                <Badge variant="outline">{model.tagline}</Badge>
            </div>
            <div className="h-32 w-full bg-muted/30 rounded-md flex items-center justify-center p-4 my-4">
                {model.visual}
            </div>
            <DialogDescription className="text-base text-muted-foreground text-left">
                {model.description}
            </DialogDescription>
             <div className="flex flex-wrap gap-2 mt-4">
                {model.capabilities.map(cap => (
                    <Badge key={cap.name} variant="secondary" className="gap-1.5">
                        {cap.icon} {cap.name}
                    </Badge>
                ))}
            </div>
        </DialogHeader>
        <DialogFooter>
            <Button variant="outline" className="transition-all hover:bg-foreground/10">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </DialogFooter>
    </DialogContent>
);

const DesktopModels = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const scheduleRotation = React.useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % models.length);
        }, 3000);
    }, []);

    React.useEffect(() => {
        scheduleRotation();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [scheduleRotation]);

    const handleModelClick = (index: number) => {
        setActiveIndex(index);
        scheduleRotation(); // Reset the timer on manual interaction
    };
    
    const displayModels = React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push(models[(activeIndex + i) % models.length]);
        }
        return result;
    }, [activeIndex]);

    const [featured, next1, next2] = displayModels;

    return (
         <div 
            className="hidden md:grid md:grid-cols-2 gap-8 min-h-[450px]"
        >
            <AnimatePresence initial={false}>
                <Dialog>
                    <DialogTrigger asChild>
                        <motion.div
                            key={activeIndex}
                            className="p-8 rounded-lg border bg-card shadow-sm flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                            initial={{ opacity: 0.5, x: -50, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
                            exit={{ opacity: 0, position: 'absolute', transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                        >
                            <div>
                                <h3 className="font-headline text-3xl font-bold">{featured.name} <span className="text-lg font-light text-muted-foreground">{featured.version}</span></h3>
                                <p className="text-lg text-primary mt-1 mb-4">{featured.tagline}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {featured.capabilities.map(cap => (
                                      <Badge key={cap.name} variant="secondary" className="gap-1.5 font-normal">
                                          {cap.icon} {cap.name}
                                      </Badge>
                                  ))}
                                </div>
                            </div>
                            <div className="h-32 w-full bg-muted/30 rounded-md flex items-center justify-center p-4 mt-6">
                                {featured.visual}
                            </div>
                        </motion.div>
                    </DialogTrigger>
                    <ModelDialogContent model={featured} />
                </Dialog>
            </AnimatePresence>

            <div className="flex flex-col gap-4 justify-center">
                 <AnimatePresence initial={false}>
                    {[next1, next2].map((model, index) => {
                         const originalIndex = models.findIndex(m => m.name === model.name);
                        return (
                             <Dialog key={model.name}>
                                <DialogTrigger asChild>
                                    <motion.div
                                        className="p-4 rounded-lg border bg-card/70 shadow-sm flex flex-col items-start gap-2 cursor-pointer transition-all hover:bg-card hover:shadow-md"
                                        onClick={() => handleModelClick(originalIndex)}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] } }}
                                        exit={{ opacity: 0, x: -30, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
                                    >
                                        <h4 className="font-headline font-semibold text-lg">{model.name} <span className="text-sm font-light text-muted-foreground">{model.version}</span></h4>
                                        <p className="text-sm text-muted-foreground">{model.tagline}</p>
                                    </motion.div>
                                </DialogTrigger>
                                <ModelDialogContent model={model} />
                            </Dialog>
                        )
                    })}
                 </AnimatePresence>
            </div>
        </div>
    );
};


const MobileModels = () => {
  return (
    <div className="md:hidden">
      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent>
          {models.map((model, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-3/4">
              <div className="p-1 h-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="group flex flex-col justify-between h-full bg-card cursor-pointer border rounded-lg overflow-hidden p-6">
                            <h3 className="font-headline text-2xl font-bold">{model.name} <span className="text-lg font-light text-muted-foreground">{model.version}</span></h3>
                            <p className="text-md text-primary mt-1 mb-4">{model.tagline}</p>
                            <div className="h-32 w-full bg-muted/30 rounded-md flex items-center justify-center p-4 my-4">
                                {model.visual}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {model.capabilities.map(cap => (
                                    <Badge key={cap.name} variant="secondary" className="gap-1.5 font-normal">
                                        {cap.icon} {cap.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </DialogTrigger>
                    <ModelDialogContent model={model} />
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}


export default function Models() {
  const isMobile = useIsMobile();
  return (
    <section id="models" className="bg-muted/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_60%)] -z-10"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Meet Our Models — The Evolution of Intelligence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From text to vision, from understanding to creation — explore the brains powering TECHismust Innovation Lab.
          </p>
        </motion.div>

        <div className="mt-16">
           {isMobile === undefined ? <div className="min-h-[450px]" /> : (isMobile ? <MobileModels /> : <DesktopModels />)}
        </div>
      </div>
    </section>
  );
}
