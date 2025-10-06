import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { innovations } from "@/lib/innovations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InnovationPage() {
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
            Innovation Hub
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our portfolio of completed and ongoing innovations. We are committed to pushing the boundaries of what AI can achieve.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {innovations.map((item) => (
            <Card key={item.id} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                    />
                </div>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Badge variant={item.status === 'Completed' ? 'secondary' : 'outline'}>
                  {item.status}
                </Badge>
              </CardFooter>
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
