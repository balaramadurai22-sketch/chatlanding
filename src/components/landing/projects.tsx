import { projects } from "@/lib/projects";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <section id="projects" className="bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Our Innovation Showcase
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore some of the groundbreaking projects and experiments born in our lab.
            Each one is a testament to our commitment to pushing the boundaries of what's possible.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
