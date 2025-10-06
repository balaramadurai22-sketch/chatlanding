
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  category: 'Predictive' | 'Generative' | 'Automation' | 'Quantum' | 'Research';
}

export const projects: Project[] = [
  {
    id: 'project-q-mechanics',
    title: 'Project Q-Mechanics',
    description: 'An AI-driven platform for simulating quantum algorithms.',
    longDescription: 'Project Q-Mechanics is a research initiative aimed at demystifying quantum computing. Our platform provides an intuitive interface for building and running quantum circuits, visualizing qubit states, and understanding the principles of superposition and entanglement. We aim to accelerate quantum research and development.',
    imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzIwNzMzMjM3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'quantum circuit',
    status: 'Ongoing',
    category: 'Quantum',
  },
  {
    id: 'project-sentinel',
    title: 'Project Sentinel',
    description: 'Autonomous security system using deep learning for threat detection.',
    longDescription: 'Sentinel is a next-generation security solution that leverages a network of sensors and AI models to provide 24/7 monitoring. It can identify anomalies, classify threats, and initiate automated countermeasures, significantly reducing response times and improving safety in complex environments.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhaSUyMHNlY3VyaXR5fGVufDB8fHx8MTcyMDczMTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'security camera',
    status: 'Completed',
    category: 'Predictive',
  },
  {
    id: 'project-nexus',
    title: 'Project Nexus',
    description: 'A decentralized data-sharing protocol ensuring privacy and data sovereignty.',
    longDescription: 'Project Nexus addresses the critical challenge of data privacy in the digital age. It utilizes blockchain and cryptographic techniques to create a secure and transparent network where users have full control over their personal information, granting and revoking access on their own terms.',
    imageUrl: 'https://images.unsplash.com/photo-1639744682282-358dc34d4a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkZWNlbnRyYWxpemVkJTIwbmV0d29yayUyMGFic3RyYWN0fGVufDB8fHx8MTcyMDczMjU4Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'data network',
    status: 'Completed',
    category: 'Automation',
  },
  {
    id: 'project-automata',
    title: 'Project Automata',
    description: 'Intelligent automation tools to streamline business and creative workflows.',
    longDescription: 'Automata is more than just a task scheduler. It\'s an adaptive workflow engine that learns from user behavior to optimize processes, automate repetitive tasks, and even suggest creative solutions. From code generation to content creation, Automata is a powerful assistant for modern professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1678835898382-74b6b694fe71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b3JrZmxvdyUyMGF1dG9tYXRpb24lMjBhYnN0cmFjdHxlbnwwfHx8fDE3MjA3MzI3NDB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'workflow automation',
    status: 'Ongoing',
    category: 'Automation',
  },
  {
    id: 'project-aurora',
    title: 'Project Aurora',
    description: 'Immersive UI/UX framework for creating dynamic, data-driven applications in VR/AR.',
    longDescription: 'Project Aurora is a design and development framework that bridges the gap between complex data and immersive experiences. It provides tools for creating stunning 3D data visualizations, intuitive interactive environments, and collaborative virtual spaces, paving the way for the next generation of user interfaces.',
    imageUrl: 'https://images.unsplash.com/photo-1593369522949-c42407a1e1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx2ciUyMGludGVyZmFjZSUyMGFic3RyYWN0fGVufDB8fHx8MTcyMDczMjgwNnww&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'vr interface',
    status: 'Upcoming',
    category: 'Generative',
  },
  {
    id: 'project-origin',
    title: 'Project Origin',
    description: 'AI model trained to generate novel solutions to complex environmental challenges.',
    longDescription: 'Project Origin is our moonshot initiative to combat climate change. This large-scale AI is fed vast datasets on climate, biology, and materials science to generate innovative hypotheses for carbon capture, renewable energy, and sustainable agriculture. It\'s a tool for scientific discovery.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906-8b235f3755b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlbnZpcm9ubWVudGFsJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3MjA3MzI5NzJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'earth data',
    status: 'Ongoing',
    category: 'Generative',
  },
  {
    id: 'tim-ai-2',
    title: 'TIM-AI 2.0',
    description: 'Advanced text-only intelligence for conversational reasoning.',
    longDescription: 'TIM-AI 2.0 is our flagship language model, designed for nuanced, multi-turn conversations. It excels at maintaining context, understanding complex queries, and generating human-like text for a variety of applications, from customer support to creative writing.',
    imageUrl: 'https://images.unsplash.com/photo-1696253915883-9a852a394bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYiUyMGNoYXRib3QlMjBhYnN0cmFjdHxlbnwwfHx8fDE3MjA3MzMwNTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'ai chat',
    status: 'Ongoing',
    category: 'Generative',
  },
  {
    id: 'aura-voice-ai',
    title: 'AURA Voice AI',
    description: 'Multimodal voice processing for understanding and generating speech.',
    longDescription: 'AURA is a multimodal AI that processes and understands both text and voice. It can analyze vocal tone, sentiment, and intent, while also being capable of generating natural, emotionally-aware speech for seamless human-computer interaction.',
    imageUrl: 'https://images.unsplash.com/photo-1599481238638-89b4f4c84a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMHdhdmUlMjBhYnN0cmFjdHxlbnwwfHx8fDE3MjA3MzMxNDB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'sound wave',
    status: 'Ongoing',
    category: 'Generative',
  },
  {
    id: 'genesis-code-generator',
    title: 'GENESIS Code Generator',
    description: 'A completed prototype for automatic code synthesis.',
    longDescription: 'GENESIS is an AI model trained on vast codebases to understand programming patterns and generate functional, efficient code from natural language prompts. This prototype has demonstrated significant potential in accelerating software development cycles.',
    imageUrl: 'https://images.unsplash.com/photo-1550063873-ab792950096b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb2RlJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzIwNzMzMTkyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'code generation',
    status: 'Completed',
    category: 'Generative',
  },
  {
    id: 'echo-conversational-ai',
    title: 'ECHO Conversational AI',
    description: 'An upcoming AI model currently in the testing phase for advanced dialogue.',
    longDescription: 'ECHO is the next evolution of our conversational AI, focusing on proactive, goal-oriented dialogue. It\'s being designed to not just respond, but to anticipate user needs and guide conversations toward a productive outcome.',
    imageUrl: 'https://images.unsplash.com/photo-1696253915883-9a852a394bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYiUyMGNoYXRib3QlMjBhYnN0cmFjdHxlbnwwfHx8fDE3MjA3MzMwNTB8MA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'dialogue bubbles',
    status: 'Upcoming',
    category: 'Generative',
  },
  {
    id: 'synapse-predictive-engine',
    title: 'SYNAPSE Predictive Engine',
    description: 'An active industrial application for forecasting and analytics.',
    longDescription: 'SYNAPSE is a powerful predictive analytics engine used in supply chain management, financial forecasting, and operational planning. It analyzes historical data to identify trends and predict future outcomes with high accuracy.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcmVkaWN0aXZlJTIwZ3JhcGh8ZW58MHx8fHwxNzIwNzMzNDQxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'predictive graph',
    status: 'Completed',
    category: 'Predictive',
  },
  {
    id: 'quantix-quantum-simulation',
    title: 'QUANTIX Quantum Simulation',
    description: 'An experimental project for neural network-based quantum simulation.',
    longDescription: 'QUANTIX is a research project at the intersection of AI and quantum computing. It uses neural networks to simulate complex quantum systems, aiming to make quantum research more accessible and computationally efficient.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljcyUyMGFic3RyYWN0fGVufDB8fHx8MTcyMDczMzQ5NXww&ixlib=rb-4.0.3&q=80&w=1080',
    imageHint: 'quantum physics',
    status: 'Ongoing',
    category: 'Quantum',
  },
];
