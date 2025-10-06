import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
        <header className="bg-background border-b">
            <div className="container py-4 flex justify-between items-center">
                <Link href="/" className="font-headline text-xl font-bold animated-gradient-text">
                    TECHismust
                </Link>
                <Button asChild variant="outline">
                    <Link href="/#projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
            </div>
        </header>

      <main className="container py-12 md:py-20">
        <article className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex gap-2">
                <Badge>AI</Badge>
                <Badge variant="secondary">Research</Badge>
                <Badge variant="outline">Innovation</Badge>
            </div>
          </div>

          <div className="relative my-8 aspect-video w-full overflow-hidden rounded-lg border shadow-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.imageHint}
              priority
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">{project.description}</p>
            <p>{project.longDescription}</p>
            
            <h2 className="font-headline">Core Technologies</h2>
            <p>
              This project leverages a sophisticated stack of modern technologies to achieve its goals. Our team employed machine learning frameworks like TensorFlow and PyTorch for model training, alongside a robust cloud infrastructure on Google Cloud Platform for scalable processing. The frontend is built with Next.js for optimal performance and user experience.
            </p>

            <ul>
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Cloud-native Architecture</li>
                <li>Data Science & Analytics</li>
                <li>Next-generation Web Interfaces</li>
            </ul>

            <h2 className="font-headline">Project Impact</h2>
            <p>
              The outcomes of {project.title} are set to redefine industry standards. By providing a more efficient, intelligent, and scalable solution, we are enabling businesses and researchers to tackle previously unsolvable problems. The project has already garnered attention for its innovative approach and potential to drive significant economic and social value.
            </p>
          </div>
        </article>
      </main>
      <footer className="border-t bg-background">
        <div className="container py-6 text-center text-muted-foreground">
             &copy; {new Date().getFullYear()} TECHismust. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
