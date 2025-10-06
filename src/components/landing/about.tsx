import { Zap, Share2, Rocket } from "lucide-react";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: <Zap className="size-8 text-primary" />,
    title: "Innovation",
    description: "Pushing the boundaries of what's possible with artificial intelligence.",
  },
  {
    icon: <Rocket className="size-8 text-primary" />,
    title: "Research",
    description: "Turning ambitious concepts into real-world, impactful solutions.",
  },
  {
    icon: <Share2 className="size-8 text-primary" />,
    title: "Collaboration",
    description: "Fostering open-source and teamwork-oriented development for shared success.",
  },
];

export default function About() {
  return (
    <section id="about" className="container">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          We turn the impossible into possible.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          TECHismust Innovation Lab is a collective of forward-thinkers, researchers, and engineers dedicated to solving humanity's most challenging problems through artificial intelligence. Our mission is to build a future where technology empowers everyone.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}
