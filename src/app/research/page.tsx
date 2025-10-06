import Link from "next/link";
import { ArrowLeft, BookOpen, FlaskConical, TestTube } from "lucide-react";
import { researchExperiments } from "@/lib/research";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResearchPage() {
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
              Back to About
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl animated-gradient-text">
            Research & Development
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Our lab is at the forefront of AI innovation, exploring fundamental questions and developing groundbreaking technologies that will shape the future.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {researchExperiments.map((item) => (
            <Card key={item.id} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                       <TestTube className="size-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex justify-between">
                <Badge variant="outline" className="font-normal">{item.aiField}</Badge>
                <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'}>
                  {item.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
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
