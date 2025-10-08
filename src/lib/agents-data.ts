
export interface Agent {
  id: string;
  name: string;
  description: string;
  howItWorks: string;
  model: string;
  category: string;
  purpose: string;
  status: 'Active' | 'Inactive';
  peopleUsed: number;
  likes: number;
  pinned: boolean;
  creator: {
    name: string;
    profileUrl: string;
    imageUrl: string;
    social: {
        x: string;
        github: string;
        linkedin: string;
    }
  };
}

export const agents: Agent[] = Array.from({ length: 50 }, (_, i) => {
    const categories = ['Productivity', 'Analysis', 'Coding', 'Social', 'Creative'];
    const models = ['GPT-4o Mini', 'Claude 3 Sonnet', 'Gemini Pro', 'Llama 3'];
    const purposes = ['Summarization', 'Data Triage', 'Code Generation', 'Content Creation', 'Task Automation'];

    const category = categories[i % categories.length];
    const likes = Math.floor(Math.random() * 2000);

    return {
        id: `agent-${i + 1}`,
        name: `${category} Agent ${i + 1}`,
        description: `An agent for ${purposes[i % purposes.length].toLowerCase()}.`,
        howItWorks: `This agent uses the ${models[i % models.length]} model to perform ${purposes[i % purposes.length].toLowerCase()} tasks efficiently. It's optimized for speed and accuracy in its domain.`,
        model: models[i % models.length],
        category: category,
        purpose: purposes[i % purposes.length],
        status: i % 3 === 0 ? 'Inactive' : 'Active',
        peopleUsed: Math.floor(Math.random() * 5000),
        likes: likes,
        pinned: likes > 1800, // Pin agents with more than 1800 likes
        creator: {
            name: `Creator ${i + 1}`,
            profileUrl: '#',
            imageUrl: `https://picsum.photos/seed/creator${i+1}/100/100`,
            social: {
                x: '#',
                github: '#',
                linkedin: '#',
            }
        },
    };
});

    