
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
}

export const agents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Bug Triage Assistant',
    description: 'Classifies incoming bug reports, triages severity, and creates GitHub issues.',
    owner: 'engineering-team',
    status: 'Active',
    lastRun: '2 min ago',
    avgLatency: '800ms',
    cost: '$0.50/day',
    tags: ['Triage', 'GitHub', 'Classification'],
    model: 'gpt-4o-mini'
  },
  {
    id: 'agent-002',
    name: 'Meeting Summarizer',
    description: 'Converts meeting transcripts to concise notes, tasks, and follow-ups.',
    owner: 'product-team',
    status: 'Active',
    lastRun: '1 hour ago',
    avgLatency: '2.5s',
    cost: '$1.20/day',
    tags: ['Summarization', 'Meetings', 'Productivity'],
    model: 'gpt-4o-mini'
  },
  {
    id: 'agent-003',
    name: 'CRM Updater',
    description: 'Parses incoming emails for contact information and updates Salesforce records.',
    owner: 'sales-ops',
    status: 'Paused',
    lastRun: '3 days ago',
    avgLatency: '1.2s',
    cost: '$0.25/day',
    tags: ['CRM', 'Salesforce', 'Data Entry'],
    model: 'claude-3-sonnet'
  },
  {
    id: 'agent-004',
    name: 'CI/CD Failure Analyst',
    description: 'Analyzes failed CI/CD pipeline logs to identify root causes and suggest fixes.',
    owner: 'devops-team',
    status: 'Active',
    lastRun: '15 min ago',
    avgLatency: '3.1s',
    cost: '$2.10/day',
    tags: ['DevOps', 'CI/CD', 'Debugging'],
    model: 'gemini-1.5-pro'
  },
    {
    id: 'agent-005',
    name: 'Customer Support Responder',
    description: 'Provides initial responses to common customer support queries based on documentation.',
    owner: 'support-team',
    status: 'Draft',
    tags: ['Support', 'Customer Service', 'RAG'],
    model: 'gpt-4o-mini'
  },
      {
    id: 'agent-006',
    name: 'Social Media Monitor',
    description: 'Monitors Twitter for brand mentions and performs sentiment analysis.',
    owner: 'marketing-team',
    status: 'Active',
    lastRun: 'now',
    avgLatency: '500ms',
    cost: '$3.50/day',
    tags: ['Social Media', 'Marketing', 'Sentiment Analysis'],
    model: 'gemini-1.5-flash'
  }
];
