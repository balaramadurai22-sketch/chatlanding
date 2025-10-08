
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
}

export const agents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Bug Triage Assistant',
    description: 'Classifies incoming bug reports and assigns priority.',
    owner: 'engineering-team',
    status: 'Active',
    tags: ['Triage', 'GitHub', 'Classification'],
    model: 'gpt-4o-mini',
    isActivated: true,
    pinned: true,
  },
  {
    id: 'agent-002',
    name: 'Meeting Summarizer',
    description: 'Converts meeting transcripts to concise notes and tasks.',
    owner: 'product-team',
    status: 'Active',
    tags: ['Summarization', 'Productivity'],
    model: 'gpt-4o-mini',
    isActivated: true,
    pinned: true,
  },
  {
    id: 'agent-003',
    name: 'CRM Updater',
    description: 'Parses emails for contact info and updates Salesforce.',
    owner: 'sales-ops',
    status: 'Paused',
    tags: ['CRM', 'Salesforce', 'Data Entry'],
    model: 'claude-3-sonnet',
    isActivated: false,
    pinned: false,
  },
  {
    id: 'agent-004',
    name: 'CI/CD Failure Analyst',
    description: 'Analyzes failed CI/CD pipeline logs to find root causes.',
    owner: 'devops-team',
    status: 'Active',
    tags: ['DevOps', 'CI/CD', 'Debugging'],
    model: 'gemini-1.5-pro',
    isActivated: true,
    pinned: true,
  },
  {
    id: 'agent-005',
    name: 'Customer Support Responder',
    description: 'Provides initial responses to common support queries.',
    owner: 'support-team',
    status: 'Draft',
    tags: ['Support', 'Customer Service', 'RAG'],
    model: 'gpt-4o-mini',
    isActivated: false,
    pinned: false,
  },
  {
    id: 'agent-006',
    name: 'Social Media Monitor',
    description: 'Monitors Twitter for brand mentions and performs sentiment analysis.',
    owner: 'marketing-team',
    status: 'Active',
    tags: ['Social Media', 'Marketing', 'Sentiment'],
    model: 'gemini-1.5-flash',
    isActivated: true,
    pinned: false,
  },
  {
    id: 'agent-007',
    name: 'Inventory Forecaster',
    description: 'Predicts stock needs based on sales data and seasonality.',
    owner: 'retail-ops',
    status: 'Active',
    tags: ['Forecasting', 'Retail', 'Logistics'],
    model: 'claude-3-opus',
    isActivated: true,
    pinned: false,
  },
  {
    id: 'agent-008',
    name: 'Real-time Translator',
    description: 'Translates live audio streams into multiple languages.',
    owner: 'global-comms',
    status: 'Active',
    tags: ['Translation', 'Audio', 'Real-time'],
    model: 'gemini-1.5-pro',
    isActivated: true,
    pinned: false,
  },
  {
    id: 'agent-009',
    name: 'Code Review Helper',
    description: 'Scans pull requests for common errors and style issues.',
    owner: 'engineering-team',
    status: 'Paused',
    tags: ['Code', 'Review', 'Quality'],
    model: 'gpt-4o',
    isActivated: false,
    pinned: false,
  },
  {
    id: 'agent-010',
    name: 'Market Research Analyst',
    description: 'Gathers and summarizes news and reports on market trends.',
    owner: 'strategy-team',
    status: 'Active',
    tags: ['Research', 'Finance', 'Summarization'],
    model: 'gpt-4o',
    isActivated: true,
    pinned: false,
  },
  ...Array.from({ length: 40 }, (_, i) => {
    const id = i + 11;
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
    };
  }),
];
