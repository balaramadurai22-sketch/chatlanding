
export interface ShowcaseProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  builder: {
    name: string;
    role: string;
    imageUrl: string;
  };
  modelUsed: 'TIM 2.0' | 'Generative AI' | 'Predictive AI';
  type: 'Startup' | 'Tool' | 'App' | 'Research';
  buildTime: string;
  impact: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'sp-1',
    name: 'CodeScribe AI',
    description: 'An AI-powered tool that automatically generates documentation for complex codebases.',
    imageUrl: 'https://picsum.photos/seed/showcase1/600/400',
    builder: {
      name: 'Elena Vance',
      role: 'Lead Developer',
      imageUrl: 'https://picsum.photos/seed/builder1/100/100',
    },
    modelUsed: 'TIM 2.0',
    type: 'Tool',
    buildTime: '3 Weeks',
    impact: 'Reduced documentation time by 80% for early-stage startups.'
  },
  {
    id: 'sp-2',
    name: 'Insightify',
    description: 'A market analysis startup using predictive AI to forecast consumer trends with 95% accuracy.',
    imageUrl: 'https://picsum.photos/seed/showcase2/600/400',
    builder: {
      name: 'Marcus Holloway',
      role: 'Founder & CEO',
      imageUrl: 'https://picsum.photos/seed/builder2/100/100',
    },
    modelUsed: 'Predictive AI',
    type: 'Startup',
    buildTime: '6 Months',
    impact: 'Secured $1.5M in seed funding based on model performance.'
  },
  {
    id: 'sp-3',
    name: 'Artisan AI',
    description: 'A mobile app that generates unique, high-resolution art based on user sketches.',
    imageUrl: 'https://picsum.photos/seed/showcase3/600/400',
    builder: {
      name: 'Jasmine Kaur',
      role: 'Indie Developer',
      imageUrl: 'https://picsum.photos/seed/builder3/100/100',
    },
    modelUsed: 'Generative AI',
    type: 'App',
    buildTime: '2 Months',
    impact: 'Featured on multiple design blogs, with 50,000+ downloads.'
  },
  {
    id: 'sp-4',
    name: 'CureConnect',
    description: 'A research platform that uses AI to match patients with clinical trials.',
    imageUrl: 'https://picsum.photos/seed/showcase4/600/400',
    builder: {
      name: 'Dr. Alan Grant',
      role: 'Medical Researcher',
      imageUrl: 'https://picsum.photos/seed/builder4/100/100',
    },
    modelUsed: 'Predictive AI',
    type: 'Research',
    buildTime: '8 Months',
    impact: 'Accelerated patient recruitment for 3 major clinical trials.'
  },
  {
    id: 'sp-5',
    name: 'DevFlow',
    description: 'An intelligent project management tool that optimizes sprint planning using predictive analytics.',
    imageUrl: 'https://picsum.photos/seed/showcase5/600/400',
    builder: {
      name: 'Chloe Decker',
      role: 'Product Manager',
      imageUrl: 'https://picsum.photos/seed/builder5/100/100',
    },
    modelUsed: 'Predictive AI',
    type: 'Tool',
    buildTime: '4 Months',
    impact: 'Improved team velocity by an average of 25% for pilot users.'
  },
  {
    id: 'sp-6',
    name: 'StoryForge',
    description: 'A collaborative storytelling app where users and AI co-write interactive narratives.',
    imageUrl: 'https://picsum.photos/seed/showcase6/600/400',
    builder: {
      name: 'Leo Fitz',
      role: 'Creative Technologist',
      imageUrl: 'https://picsum.photos/seed/builder6/100/100',
    },
    modelUsed: 'Generative AI',
    type: 'App',
    buildTime: '1 Month',
    impact: 'Won "Most Innovative App" at a global hackathon.'
  },
];
