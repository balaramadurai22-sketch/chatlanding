'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Bot, Briefcase, Globe, Award, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    value: 120,
    label: 'AI Models Deployed',
    icon: <Bot className="size-8" />,
  },
  {
    value: 15,
    label: 'Patents Filed',
    icon: <FileText className="size-8" />,
  },
  {
    value: 30,
    label: 'Global Collaborations',
    icon: <Globe className="size-8" />,
  },
  {
    value: 25,
    label: 'Research Papers Published',
    icon: <BookOpen className="size-8" />,
  },
  {
    value: 18,
    label: 'Innovation Projects Ongoing',
    icon: <Briefcase className="size-8" />,
  },
  {
    value: 10,
    label: 'Awards & Recognitions',
    icon: <Award className="size-8" />,
  },
];

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = {
        stop: () => {},
      };
      
      let frameId: number;
      const start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime > duration) {
          setCount(value);
          return;
        }
        const progress = elapsedTime / duration;
        setCount(Math.round(start + progress * (value - start)));
        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);

      controls.stop = () => {
        cancelAnimationFrame(frameId);
      };

      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}+</span>;
}

export default function Achievements() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="achievements" className="py-20 sm:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.01)_0%,_transparent_50%)]"></div>
        <div className="container">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mx-auto max-w-4xl text-center"
            >
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Driving AI Innovation — By the Numbers
                </h2>
            </motion.div>

            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: isInView ? index * 0.1 : 0 }}
                        className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                         <div className="text-primary">{stat.icon}</div>
                        <p className="font-headline text-3xl font-bold text-primary">
                            <AnimatedCounter value={stat.value} />
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
