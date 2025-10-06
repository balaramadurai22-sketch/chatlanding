import { PlaceHolderImages, ImagePlaceholder } from './placeholder-images';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
}

function findImage(id: string): ImagePlaceholder {
  const image = PlaceHolderImages.find(p => p.id === id);
  if (!image) {
    return {
      id: 'default',
      description: 'Default placeholder',
      imageUrl: 'https://picsum.photos/seed/default/600/400',
      imageHint: 'abstract placeholder'
    };
  }
  return image;
}

export const projects: Project[] = [
  {
    id: 'project-q-mechanics',
    title: 'Project Q-Mechanics',
    description: 'An AI-driven platform for simulating quantum algorithms and exploring their potential applications.',
    longDescription: 'Project Q-Mechanics is a research initiative aimed at demystifying quantum computing. Our platform provides an intuitive interface for building and running quantum circuits, visualizing qubit states, and understanding the principles of superposition and entanglement. We aim to accelerate quantum research and development.',
    imageUrl: findImage('project-1').imageUrl,
    imageHint: findImage('project-1').imageHint,
  },
  {
    id: 'project-sentinel',
    title: 'Project Sentinel',
    description: 'An autonomous security system that uses deep learning for real-time threat detection and response.',
    longDescription: 'Sentinel is a next-generation security solution that leverages a network of sensors and AI models to provide 24/7 monitoring. It can identify anomalies, classify threats, and initiate automated countermeasures, significantly reducing response times and improving safety in complex environments.',
    imageUrl: findImage('project-2').imageUrl,
    imageHint: findImage('project-2').imageHint,
  },
  {
    id: 'project-nexus',
    title: 'Project Nexus',
    description: 'A decentralized data-sharing protocol ensuring privacy and data sovereignty for users.',
    longDescription: 'Project Nexus addresses the critical challenge of data privacy in the digital age. It utilizes blockchain and cryptographic techniques to create a secure and transparent network where users have full control over their personal information, granting and revoking access on their own terms.',
    imageUrl: findImage('project-3').imageUrl,
    imageHint: findImage('project-3').imageHint,
  },
  {
    id: 'project-automata',
    title: 'Project Automata',
    description: 'A suite of intelligent automation tools designed to streamline business operations and creative workflows.',
    longDescription: 'Automata is more than just a task scheduler. It\'s an adaptive workflow engine that learns from user behavior to optimize processes, automate repetitive tasks, and even suggest creative solutions. From code generation to content creation, Automata is a powerful assistant for modern professionals.',
    imageUrl: findImage('project-4').imageUrl,
    imageHint: findImage('project-4').imageHint,
  },
  {
    id: 'project-aurora',
    title: 'Project Aurora',
    description: 'An immersive UI/UX framework for creating dynamic, data-driven applications in virtual and augmented reality.',
    longDescription: 'Project Aurora is a design and development framework that bridges the gap between complex data and immersive experiences. It provides tools for creating stunning 3D data visualizations, intuitive interactive environments, and collaborative virtual spaces, paving the way for the next generation of user interfaces.',
    imageUrl: findImage('project-5').imageUrl,
    imageHint: findImage('project-5').imageHint,
  },
  {
    id: 'project-origin',
    title: 'Project Origin',
    description: 'An AI model trained to generate novel solutions to complex environmental challenges.',
    longDescription: 'Project Origin is our moonshot initiative to combat climate change. This large-scale AI is fed vast datasets on climate, biology, and materials science to generate innovative hypotheses for carbon capture, renewable energy, and sustainable agriculture. It\'s a tool for scientific discovery.',
    imageUrl: findImage('project-6').imageUrl,
    imageHint: findImage('project-6').imageHint,
  },
];
