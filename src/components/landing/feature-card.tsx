"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

export default function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full text-center transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary/20">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <CardTitle className="pt-4 font-headline text-xl font-bold">{title}</CardTitle>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
