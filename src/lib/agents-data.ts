
export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  category: 'Coding' | 'Analysis' | 'Creative' | 'Productivity' | 'Research';
  purpose: string;
  tools?: string;
  memory?: string;
  active: boolean;
  pinned: boolean;
  peopleUsed: number;
  likes: number;
  creator: {
    name: string;
    imageUrl: string;
    social: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      paypal?: string;
      upi?: string;
      btc?: string;
    };
  };
}

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Code Reviewer',
    description: 'An AI assistant that reviews your code for style, errors, and best practices.',
    model: 'GPT-4',
    category: 'Coding',
    purpose: 'Analyzes pull requests and provides feedback.',
    tools: 'github_api, linter',
    memory: 'short-term',
    active: true,
    pinned: true,
    peopleUsed: 2300,
    likes: 1200,
    creator: {
      name: 'Bala Ramadurai',
      imageUrl: 'https://picsum.photos/seed/bala/100/100',
      social: {
        twitter: 'https://x.com/techismust',
        github: 'https://github.com/techismust',
        linkedin: 'https://linkedin.com/in/balaramadurai',
        paypal: 'paypal@example.com',
      },
    },
  },
  {
    id: 'agent-2',
    name: 'Data Analyst',
    description: 'Processes and visualizes data from CSVs and databases.',
    model: 'Gemini 1.5',
    category: 'Analysis',
    purpose: 'Generates charts and insights from raw data.',
    tools: 'chart_generator, sql_runner',
    memory: 'long-term',
    active: false,
    pinned: true,
    peopleUsed: 5400,
    likes: 3200,
    creator: {
      name: 'Vijay K',
      imageUrl: 'https://picsum.photos/seed/vijay/100/100',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#',
        upi: 'vijay@okhdfcbank',
      },
    },
  },
  {
    id: 'agent-3',
    name: 'Creative Writer',
    description: 'Helps brainstorm and write creative content.',
    model: 'Claude 3',
    category: 'Creative',
    purpose: 'Assists with blog posts, scripts, and marketing copy.',
    active: true,
    pinned: false,
    peopleUsed: 1800,
    likes: 950,
    creator: {
      name: 'Parthiban',
      imageUrl: 'https://picsum.photos/seed/parthiban/100/100',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#',
        btc: 'bc1q...',
      },
    },
  },
  {
    id: 'agent-4',
    name: 'UX Researcher',
    description: 'Summarizes user feedback and identifies pain points.',
    model: 'GPT-4o',
    category: 'Research',
    purpose: 'Analyzes user interviews and surveys for actionable insights.',
    active: true,
    pinned: false,
    peopleUsed: 890,
    likes: 450,
    creator: {
      name: 'Sathyanarayanan',
      imageUrl: 'https://picsum.photos/seed/sathya/100/100',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
  },
  {
    id: 'agent-5',
    name: 'Task Automator',
    description: 'Automates repetitive tasks and workflows.',
    model: 'Mistral',
    category: 'Productivity',
    purpose: 'Connects to various APIs to automate processes.',
    active: true,
    pinned: false,
    peopleUsed: 3200,
    likes: 1800,
    creator: {
      name: 'Manoj Kumar',
      imageUrl: 'https://picsum.photos/seed/manoj/100/100',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#',
      },
    },
  },
  // Add more agents to reach 50
  ...Array.from({ length: 45 }).map((_, i) => {
    const categories: Agent['category'][] = ['Coding', 'Analysis', 'Creative', 'Productivity', 'Research'];
    const models = ['GPT-4', 'Gemini 1.5', 'Claude 3', 'Mistral', 'GPT-4o'];
    const category = categories[i % categories.length];
    return {
      id: `agent-${i + 6}`,
      name: `Agent ${i + 6}`,
      description: `A versatile AI agent for ${category.toLowerCase()} tasks.`,
      model: models[i % models.length],
      category,
      purpose: `Automates and assists in ${category.toLowerCase()} workflows.`,
      tools: 'web_search',
      memory: 'short-term',
      active: Math.random() > 0.5,
      pinned: false,
      peopleUsed: Math.floor(Math.random() * 5000),
      likes: Math.floor(Math.random() * 2500),
      creator: {
        name: `Creator ${i + 6}`,
        imageUrl: `https://picsum.photos/seed/creator${i + 6}/100/100`,
        social: { twitter: '#', github: '#', linkedin: '#' },
      },
    };
  }),
];
