export interface ResearchExperiment {
  id: string;
  title: string;
  description: string;
  aiField: string;
  status: 'Completed' | 'Ongoing';
}

export const researchExperiments: ResearchExperiment[] = [
  {
    id: 'res-1',
    title: 'Few-Shot Learning Generalization',
    description: 'Investigating methods to improve model performance on new tasks with minimal training data.',
    aiField: 'Meta-Learning',
    status: 'Ongoing',
  },
  {
    id: 'res-2',
    title: 'Ethical Bias in Large Language Models',
    description: 'A quantitative analysis of inherent biases in popular LLMs and techniques for mitigation.',
    aiField: 'AI Ethics',
    status: 'Completed',
  },
  {
    id: 'res-3',
    title: 'Causal Inference in Reinforcement Learning',
    description: 'Exploring how agents can build and use causal models of their environment to make better decisions.',
    aiField: 'Reinforcement Learning',
    status: 'Ongoing',
  },
  {
    id: 'res-4',
    title: 'Energy-Efficient Neural Network Architectures',
    description: 'Designing novel deep learning models that require significantly less computational power.',
    aiField: 'Hardware Acceleration',
    status: 'Completed',
  },
  {
    id: 'res-5',
    title: 'Adversarial Attack Robustness',
    description: 'Developing new defense mechanisms to make computer vision models more resilient to adversarial examples.',
    aiField: 'Computer Vision',
    status: 'Completed',
  },
  {
    id: 'res-6',
    title: 'Explainable AI (XAI) for Medical Diagnosis',
    description: 'Creating models that can explain their diagnostic reasoning to clinicians in an understandable way.',
    aiField: 'Explainable AI',
    status: 'Ongoing',
  },
   {
    id: 'res-7',
    title: 'AI in Quantum Computing Simulation',
    description: 'Using neural networks to approximate and speed up simulations of complex quantum systems.',
    aiField: 'Quantum AI',
    status: 'Ongoing',
  },
   {
    id: 'res-8',
    title: 'Graph Neural Networks for Drug Discovery',
    description: 'Applying GNNs to model molecular structures and predict their efficacy for new drug candidates.',
    aiField: 'Computational Biology',
    status: 'Completed',
  }
];
