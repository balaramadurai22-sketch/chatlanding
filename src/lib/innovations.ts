export interface Innovation {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'Ongoing';
  imageUrl: string;
  imageHint: string;
}

export const innovations: Innovation[] = [
  {
    id: 'inno-1',
    title: 'Real-Time Emotion Analysis',
    description: 'An API that analyzes facial expressions from video streams to determine emotional states, with applications in user experience research.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno1/600/400',
    imageHint: 'facial analysis'
  },
  {
    id: 'inno-2',
    title: 'AI-Generated Music Composer',
    description: 'A generative model that creates original royalty-free music scores based on mood and genre inputs.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno2/600/400',
    imageHint: 'music notes'
  },
  {
    id: 'inno-3',
    title: 'Code Refactoring Assistant',
    description: 'An IDE plugin that suggests and applies code refactoring improvements using machine learning patterns.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno3/600/400',
    imageHint: 'code screen'
  },
  {
    id: 'inno-4',
    title: 'Predictive Supply Chain Optimizer',
    description: 'A system that forecasts demand and optimizes logistics to reduce waste and improve delivery times.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno4/600/400',
    imageHint: 'supply chain'
  },
  {
    id: 'inno-5',
    title: 'Personalized Learning Pathways',
    description: 'An educational platform that adapts curriculum content and pacing for individual student needs.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno5/600/400',
    imageHint: 'online learning'
  },
  {
    id: 'inno-6',
    title: 'Automated 3D Model Generation',
    description: 'A tool that converts 2D sketches into detailed 3D models for use in gaming and simulation.',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/inno6/600/400',
    imageHint: '3d model'
  },
  {
    id: 'inno-7',
    title: 'Swarm Robotics Coordination',
    description: 'Developing decentralized algorithms for coordinating large fleets of autonomous drones for complex tasks.',
    status: 'Ongoing',
    imageUrl: 'https://picsum.photos/seed/inno7/600/400',
    imageHint: 'drone swarm'
  },
  {
    id: 'inno-8',
    title: 'Neural Language Translation for Obscure Dialects',
    description: 'Training models to preserve and translate endangered languages and rare dialects with high fidelity.',
    status: 'Ongoing',
    imageUrl: 'https://picsum.photos/seed/inno8/600/400',
    imageHint: 'ancient text'
  },
];
