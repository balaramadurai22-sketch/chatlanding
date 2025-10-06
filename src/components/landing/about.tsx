import { BrainCircuit, Bot, LayoutTemplate } from "lucide-react";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: <BrainCircuit className="size-8 text-primary" />,
    title: "AI Research",
    description: "We pioneer advancements in machine learning and neural networks to create intelligent, self-improving systems.",
  },
  {
    icon: <LayoutTemplate className="size-8 text-primary" />,
    title: "Product Design",
    description: "Our human-centric approach to design ensures that our innovations are not only powerful but also intuitive and accessible.",
  },
  {
    icon: <Bot className="size-8 text-primary" />,
    title: "Automation Lab",
    description: "We develop sophisticated automation solutions that streamline complex processes and boost efficiency.",
  },
];

export default function About() {
  return (
    <section id="about" className="container">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          A Fusion of Creativity and Technology
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          At TECHismust, our mission is to harness the power of artificial
          intelligence and web technologies to build the next generation of
          digital experiences. We are researchers, designers, and engineers
          passionate about innovation.
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
