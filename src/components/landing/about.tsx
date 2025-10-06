import { Zap, FlaskConical, Share2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: <Zap className="size-8 text-foreground" />,
    title: "Innovation",
    description: "Pushing the boundaries of what's possible with artificial intelligence.",
    longDescription: "Our innovation principle is the driving force behind our quest to challenge the status quo. We believe in creative exploration, rapid prototyping, and failing fast to learn faster. This mindset allows us to venture into uncharted territories and develop truly novel AI solutions that can reshape industries.",
    link: "/innovation",
  },
  {
    icon: <FlaskConical className="size-8 text-foreground" />,
    title: "Research",
    description: "Turning ambitious concepts into real-world, impactful solutions.",
    longDescription: "At TECHismust, research is not just an academic exercise; it's the foundation of our product development. We invest heavily in fundamental and applied AI research to stay at the forefront of technology, ensuring our solutions are not only innovative but also robust, ethical, and scientifically sound.",
    link: "/research",
  },
  {
    icon: <Share2 className="size-8 text-foreground" />,
    title: "Collaboration",
    description: "Fostering open-source and teamwork for shared success.",
    longDescription: "We believe that the greatest challenges can only be solved through collective effort. Our commitment to collaboration extends from our internal teams to the global open-source community. By sharing knowledge and building partnerships, we accelerate innovation and create a positive impact that is greater than the sum of its parts.",
    link: "/collaboration",
  },
];

export default function About() {
  return (
    <section id="about" className="container relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.05)_0%,_transparent_50%)] -z-10"></div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl animated-gradient-text">
          We turn the impossible into possible.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          TECHismust Innovation Lab is a collective of forward-thinkers, researchers, and engineers dedicated to solving humanity's most challenging problems through artificial intelligence. Our mission is to build a future where technology empowers everyone.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
            <Dialog key={feature.title}>
              <DialogTrigger asChild>
                <div>
                    <FeatureCard {...feature} index={i} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        {feature.icon}
                    </div>
                    <DialogTitle className="font-headline text-2xl">{feature.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-base text-muted-foreground text-left">
                    {feature.longDescription}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link href={feature.link} passHref>
                    <Button variant="outline" className="transition-all hover:bg-foreground/10">
                      View More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        ))}
      </div>
    </section>
  );
}
