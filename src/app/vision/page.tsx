import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const timeline = [
  {
    date: '2023',
    title: 'Project Sentinel Launch',
    description: 'Successfully deployed our autonomous security system, reducing threat response times by 90%.',
    status: 'Completed',
    icon: <CheckCircle className="size-5" />,
  },
  {
    date: 'Q2 2024',
    title: 'GenAI Platform v1 Release',
    description: 'Launched our first-generation generative AI platform for enterprise content creation.',
    status: 'Completed',
    icon: <CheckCircle className="size-5" />,
  },
    {
    date: 'Q4 2024',
    title: 'Launch GenAI Platform v2',
    description: 'Introducing advanced features for enterprise-level generative AI applications, including custom model fine-tuning.',
    status: 'Upcoming',
    icon: <Clock className="size-5" />,
  },
  {
    date: '2025',
    title: 'Open Source Ethical AI Toolkit',
    description: 'Releasing a set of tools to help developers audit and mitigate bias in their models.',
    status: 'Upcoming',
    icon: <Clock className="size-5" />,
  },
  {
    date: '2026',
    title: 'Project Origin: Alpha Test',
    description: 'Begin alpha testing for our AI model designed to generate solutions for environmental challenges.',
    status: 'Future',
    icon: <Rocket className="size-5" />,
  },
    {
    date: '2027',
    title: 'Decentralized AI Network',
    description: 'Pioneering a decentralized network for federated learning, ensuring data privacy and security.',
    status: 'Future',
    icon: <Rocket className="size-5" />,
  },
];

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container py-4 flex justify-between items-center">
          <Link href="/" className="font-headline text-xl font-bold animated-gradient-text">
            TECHismust AI
          </Link>
          <Button asChild variant="ghost" className="transition-all hover:bg-foreground/10">
            <Link href="/#about">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl animated-gradient-text">
            Our Vision for the Future
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We are not just building technology; we are building the future. Our roadmap outlines our commitment to innovation, ethical AI, and solving the world's most complex challenges.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-border -z-10"></div>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center justify-center">
                <div className="w-full md:w-2/5">
                   {index % 2 === 0 ? (
                    <Card className="text-right">
                       <CardHeader>
                        <div className="flex items-center justify-end gap-4 mb-2">
                           <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>{item.status}</Badge>
                           <p className="text-sm font-semibold text-muted-foreground">{item.date}</p>
                        </div>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                       </CardHeader>
                    </Card>
                   ) : <div />}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary text-primary">
                  {item.icon}
                </div>

                <div className="w-full md:w-2/5">
                   {index % 2 !== 0 ? (
                     <Card className="ml-auto">
                       <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                           <p className="text-sm font-semibold text-muted-foreground">{item.date}</p>
                           <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>{item.status}</Badge>
                        </div>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                       </CardHeader>
                     </Card>
                   ) : <div />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-background">
        <div className="container py-6 text-center text-muted-foreground">
             &copy; {new Date().getFullYear()} TECHismust. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
