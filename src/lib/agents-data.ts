
export interface Agent {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: 'Active' | 'Paused' | 'Draft';
  lastRun?: string;
  avgLatency?: string;
  cost?: string;
  tags: string[];
  model: string;
  isActivated: boolean;
  pinned: boolean;
  peopleUsed: number;
  likes: number;
  creator: {
    name: string;
    social: string;
  };
  purpose: string;
  category: string;
}

export const agents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Bug Triage Assistant',
    description: 'Classifies incoming bug reports and assigns priority. Helps engineering teams streamline their workflow and focus on what matters.',
    owner: 'engineering-team',
    status: 'Active',
    tags: ['Triage', 'GitHub', 'Classification'],
    model: 'gpt-4o-mini',
    isActivated: true,
    pinned: true,
    peopleUsed: 1204,
    likes: 312,
    creator: { name: 'TechisMust', social: 'https://twitter.com/techismust' },
    purpose: 'Bug classification and prioritization.',
    category: 'Triage',
  },
  {
    id: 'agent-002',
    name: 'Meeting Summarizer',
    description: 'Converts meeting transcripts to concise notes and tasks. Ideal for product managers and team leads.',
    owner: 'product-team',
    status: 'Active',
    tags: ['Summarization', 'Productivity'],
    model: 'gpt-4o-mini',
    isActivated: true,
    pinned: true,
    peopleUsed: 5432,
    likes: 1200,
    creator: { name: 'Alice', social: '#' },
    purpose: 'Transcript to notes and tasks.',
    category: 'Summarization',
  },
  {
    id: 'agent-003',
    name: 'CRM Updater',
    description: 'Parses emails for contact info and updates Salesforce. A must-have for sales operations.',
    owner: 'sales-ops',
    status: 'Paused',
    tags: ['CRM', 'Salesforce', 'Data Entry'],
    model: 'claude-3-sonnet',
    isActivated: false,
    pinned: false,
    peopleUsed: 350,
    likes: 45,
    creator: { name: 'Bob', social: '#' },
    purpose: 'Automated CRM data entry from emails.',
    category: 'CRM',
  },
  {
    id: 'agent-004',
    name: 'CI/CD Failure Analyst',
    description: 'Analyzes failed CI/CD pipeline logs to find root causes, saving valuable developer time.',
    owner: 'devops-team',
    status: 'Active',
    tags: ['DevOps', 'CI/CD', 'Debugging'],
    model: 'gemini-1.5-pro',
    isActivated: true,
    pinned: true,
    peopleUsed: 876,
    likes: 250,
    creator: { name: 'TechisMust', social: '#' },
    purpose: 'Root cause analysis for CI/CD failures.',
    category: 'DevOps',
  },
  {
    id: 'agent-005',
    name: 'Customer Support Responder',
    description: 'Provides initial responses to common support queries using a retrieval-augmented generation (RAG) approach.',
    owner: 'support-team',
    status: 'Draft',
    tags: ['Support', 'Customer Service', 'RAG'],
    model: 'gpt-4o-mini',
    isActivated: false,
    pinned: false,
    peopleUsed: 0,
    likes: 0,
    creator: { name: 'Charlie', social: '#' },
    purpose: 'Initial response for common support questions.',
    category: 'Support',
  },
  ...Array.from({ length: 45 }, (_, i) => {
    const id = i + 6;
    const agentTypes = ['Data Scraper', 'Email Classifier', 'Image Generator', 'Report Creator', 'API Integrator', 'Slack Bot', 'Discord Mod', 'Knowledge Base QA', 'HR Onboarding Helper', 'Contract Analyzer'];
    const models = ['gpt-4o-mini', 'claude-3-sonnet', 'gemini-1.5-pro', 'gpt-4o', 'gemini-1.5-flash'];
    const statuses: ('Active' | 'Paused' | 'Draft')[] = ['Active', 'Paused', 'Draft'];
    const agentType = agentTypes[i % agentTypes.length];
    
    return {
        id: `agent-${String(id).padStart(3, '0')}`,
        name: `${agentType} #${Math.floor(id / agentTypes.length) + 1}`,
        description: `An agent that performs tasks related to ${agentType.toLowerCase()}.`,
        owner: `team-${i % 5 + 1}`,
        status: statuses[i % statuses.length],
        tags: [agentType.split(' ')[0], `v${Math.floor(id / agentTypes.length) + 1}`],
        model: models[i % models.length],
        isActivated: Math.random() > 0.5,
        pinned: false,
        peopleUsed: Math.floor(Math.random() * 2000),
        likes: Math.floor(Math.random() * 500),
        creator: { name: `Creator ${i+1}`, social: '#' },
        purpose: `Automates ${agentType.toLowerCase()} tasks.`,
        category: agentType.split(' ')[0],
    };
  }),
];
