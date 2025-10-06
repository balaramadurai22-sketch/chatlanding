import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { collaborations } from "@/lib/collaborations";
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

export default function CollaborationPage() {
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
            Collaborative Efforts
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe in the power of partnership. Discover the projects we've built and contributed to with the community and industry leaders.
          </p>
        </div>

        <div className="space-y-8">
          {collaborations.map((item) => (
            <Card key={item.id} className="transition-all hover:shadow-md">
              <CardHeader className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                    <CardDescription className="mt-2">{item.summary}</CardDescription>
                </div>
                <div className="flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                        <Users className="size-4" />
                        Partners
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {item.partners.map(partner => (
                            <Badge key={partner} variant="secondary" className="font-normal">{partner}</Badge>
                        ))}
                    </div>
                </div>
              </CardHeader>
              <CardFooter>
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
