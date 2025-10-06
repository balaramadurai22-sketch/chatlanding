export interface Collaboration {
  id: string;
  title: string;
  partners: string[];
  summary: string;
  status: 'Completed' | 'Ongoing';
}

export const collaborations: Collaboration[] = [
  {
    id: 'collab-1',
    title: 'Open-Source AI Ethics Toolkit',
    partners: ['AI Foundation', 'TechForGood NGO'],
    summary: 'A joint initiative to develop and release a suite of tools for auditing and mitigating bias in machine learning models.',
    status: 'Completed',
  },
  {
    id: 'collab-2',
    title: 'Climate Change Prediction Model',
    partners: ['National Research Institute', 'Global Weather Corp'],
    summary: 'A large-scale collaboration to build a more accurate and long-range climate prediction model using federated learning.',
    status: 'Ongoing',
  },
  {
    id: 'collab-3',
    title: 'Genkit.js Contribution',
    partners: ['Google', 'Open-Source Community'],
    summary: 'Active contributions to the Genkit.js framework, improving its capabilities for building production-ready AI systems.',
    status: 'Ongoing',
  },
  {
    id: 'collab-4',
    title: 'Autonomous Vehicle Safety Standard',
    partners: ['Auto Innovators Alliance', 'University Robotics Lab'],
    summary: 'Working with industry partners to define a common safety and validation framework for Level 4/5 autonomous driving systems.',
    status: 'Completed',
  },
  {
    id: 'collab-5',
    title: 'AI for Accessible Education',
    partners: ['Accessible Learning Foundation'],
    summary: 'Developing AI-powered tools that provide real-time sign language translation and audio descriptions for educational content.',
    status: 'Ongoing',
  },
  {
    id: 'collab-6',
    title: 'Project Gutenberg AI Archive',
    partners: ['Project Gutenberg'],
    summary: 'Utilizing natural language processing to categorize, tag, and create semantic search capabilities for the entire Project Gutenberg library.',
    status: 'Completed',
  },
];
