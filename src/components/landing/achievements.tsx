'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Database, Share2, Zap } from 'lucide-react';
import StatsChart from './stats-chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MiniChart from './mini-chart';

const initialStats = [
  {
    id: 'models',
    value: '45',
    unit: 'models',
    label: 'Active Models',
    icon: <Cpu className="size-6" />,
  },
  {
    id: 'api',
    value: '1.2M',
    unit: 'req/min',
    label: 'API Requests',
    icon: <Share2 className="size-6" />,
  },
  {
    id: 'tasks',
    value: '320K',
    unit: 'tasks',
    label: 'Tasks Processed',
    icon: <Zap className="size-6" />,
  },
  {
    id: 'training',
    value: '3',
    unit: 'training',
    label: 'Models Training',
    icon: <Database className="size-6" />,
  },
];

export default function Achievements() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const [country, setCountry] = useState('all');
  const [model, setModel] = useState('tim-ai-2.0');
  const [userCategory, setUserCategory] = useState('all');
  const [stats, setStats] = useState(initialStats);
  const [isTimModel, setIsTimModel] = useState(true);

  useEffect(() => {
    const isTim = model.startsWith('tim-ai');
    setIsTimModel(isTim);
    
    let intervalId: NodeJS.Timeout;

    if (isTim) {
      // Animate the API requests value
      let counter = 0;
      intervalId = setInterval(() => {
        const randomValue = Math.floor(Math.random() * (60 - 38 + 1)) + 38;
        setStats(prevStats => prevStats.map(stat => 
          stat.id === 'api' ? { ...stat, value: `${randomValue}K` } : stat
        ));
        counter++;
        if (counter > 20) { // Stop after some iterations and set a final-ish value
            const finalRandomValue = Math.floor(Math.random() * (60 - 38 + 1)) + 38;
            setStats(prevStats => prevStats.map(stat => 
              stat.id === 'api' ? { ...stat, value: `${finalRandomValue}K` } : stat
            ));
            clearInterval(intervalId);
        }
      }, 100);
    } else {
       // Revert to a default value if not a TIM model
       setStats(prevStats => prevStats.map(stat => 
        stat.id === 'api' ? { ...stat, value: '15K' } : stat
      ));
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [model]);


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="achievements" className="py-20 sm:py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.01)_0%,_transparent_50%)]"></div>
      <div className="container">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Driving AI Innovation — By the Numbers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-time insights into our models, API usage, and AI-driven progress.
          </p>
        </motion.div>

        <motion.div 
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5"
        >
            <motion.div
                variants={itemVariants}
                className="lg:col-span-3 rounded-lg border bg-card/50 p-6 shadow-sm backdrop-blur-sm"
            >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                  <div>
                    <h3 className="font-headline text-lg font-semibold">Models Used per Hour</h3>
                    <p className="text-sm text-muted-foreground">Live data from our model inference servers.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="w-full sm:w-[120px] text-xs h-8">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Countries</SelectItem>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="eu">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={model} onValueChange={setModel}>
                        <SelectTrigger className="w-full sm:w-[120px] text-xs h-8">
                          <SelectValue placeholder="Model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Models</SelectItem>
                          <SelectItem value="tim-ai-2.0">TIM AI - 2.0</SelectItem>
                          <SelectItem value="tim-ai-1.5-pro">TIM AI - 1.5 Pro</SelectItem>
                          <SelectItem value="sentinel-v1">Sentinel v1</SelectItem>
                          <SelectItem value="other">Other Models</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={userCategory} onValueChange={setUserCategory}>
                        <SelectTrigger className="w-full sm:w-[120px] text-xs h-8 col-span-2 sm:col-span-1">
                          <SelectValue placeholder="User" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="it">IT Professional</SelectItem>
                          <SelectItem value="research">Researcher</SelectItem>
                        </SelectContent>
                      </Select>
                  </div>
                </div>
                <div className="h-[250px] w-full">
                    <StatsChart key={`${country}-${model}-${userCategory}`} />
                </div>
            </motion.div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.id}
                        variants={itemVariants}
                        className="relative flex flex-col items-start justify-center gap-2 rounded-lg border bg-card/50 p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md backdrop-blur-sm overflow-hidden"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">{stat.icon}</div>
                        <div>
                            <span className="font-headline text-3xl font-bold text-primary">
                                {stat.value}
                            </span>
                            <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        {stat.id === 'api' && (
                          <div className="absolute bottom-2 right-2 h-8 w-16">
                            <MiniChart isActive={isTimModel} />
                          </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
}
