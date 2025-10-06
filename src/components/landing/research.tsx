import { researchExperiments } from "@/lib/research";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Research() {
  return (
    <section id="research" className="bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl animated-gradient-text">
            From Our Research Lab
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into the experiments and breakthroughs happening at TECHismust. We are constantly exploring new frontiers in AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {researchExperiments.slice(0, 3).map((experiment) => (
            <Card key={experiment.id} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{experiment.title}</CardTitle>
                <CardDescription>{experiment.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow justify-between">
                <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">AI FIELD: {experiment.aiField}</p>
                </div>
                <div className="flex items-center justify-between">
                    <Badge variant={experiment.status === 'Completed' ? 'secondary' : 'outline'}>
                        {experiment.status}
                    </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
