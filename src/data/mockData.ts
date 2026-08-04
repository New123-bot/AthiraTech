import { AgentSpec, ServicePlan, FeatureComparison, BlogPost, User, AnalyticsSummary, SystemSettings } from '../types';

export const INITIAL_AGENTS: AgentSpec[] = [
  {
    id: 1,
    name: 'Planning Agent',
    slug: 'planning',
    category: 'Planning',
    description: 'Analyzes requirements, generates user stories, and formulates technical architecture blueprints based on enterprise standards. It anticipates resource bottlenecks before they occur.',
    status: 'Idle',
    icon: 'BrainCircuit',
    order: 1,
    capabilities: [
      'Automated PRD & User Story Generation',
      'Architecture Blueprint Drafting',
      'Resource & Timeline Estimations',
      'Dependency & Risk Matrix Mapping'
    ],
    systemPrompt: 'You are the Athira Planning Agent. Analyze input requirements and output structured architectural blueprints, technical user stories, and data flow diagrams.'
  },
  {
    id: 2,
    name: 'Design Agent',
    slug: 'design',
    category: 'Design',
    description: 'Translates architecture into API contracts, schema designs, and UI wireframes ensuring UX consistency across multi-platform web and mobile frontends.',
    status: 'Active',
    icon: 'Layout',
    order: 2,
    capabilities: [
      'OpenAPI 3.1 Contract Generation',
      'Database Schema Optimization',
      'Design System Token Enforcement',
      'Component Tree Wireframing'
    ],
    systemPrompt: 'You are the Athira Design Agent. Create REST/GraphQL API specs, Prisma database models, and clean component interface layouts.'
  },
  {
    id: 3,
    name: 'Development Agent',
    slug: 'development',
    category: 'Development',
    description: 'Generates boilerplate, implements complex logic patterns, and auto-completes repetitive coding tasks in real-time with full TypeScript & security compliance.',
    status: 'Active',
    icon: 'Code2',
    order: 3,
    capabilities: [
      'Full-Stack Code Synthesis (React/Node/Go/Python)',
      'Type-Safe State & API Integrations',
      'Automated Refactoring & Clean Code Patterns',
      'Security Vulnerability Patching'
    ],
    systemPrompt: 'You are the Athira Development Agent. Write clean, production-grade TypeScript code adhering strictly to modern software engineering patterns.'
  },
  {
    id: 4,
    name: 'Testing Agent',
    slug: 'testing',
    category: 'Testing',
    description: 'Automatically generates unit, integration, and E2E tests based on code context to maximize coverage and catch regression bugs before deployment.',
    status: 'Idle',
    icon: 'Bug',
    order: 4,
    capabilities: [
      'Unit & Integration Test Suite Generation (Jest/Vitest)',
      'E2E Test Scripting (Playwright/Cypress)',
      'Edge-Case Mutation Testing',
      'Automated Code Coverage Auditing'
    ],
    systemPrompt: 'You are the Athira Testing Agent. Generate exhaustive test cases including edge cases, mock services, and assertion matrices.'
  },
  {
    id: 5,
    name: 'Deployment Agent',
    slug: 'deployment',
    category: 'Deployment',
    description: 'Manages CI/CD pipelines, handles infrastructure as code, and oversees zero-downtime rollouts across Kubernetes, AWS, and GCP environments.',
    status: 'Active',
    icon: 'CloudUpload',
    order: 5,
    capabilities: [
      'Dockerfile & Kubernetes Manifest Creation',
      'Terraform / CloudFormation IaC Synthesis',
      'Blue-Green & Canary Deployment Orchestration',
      'Automated Rollback & Health Probing'
    ],
    systemPrompt: 'You are the Athira Deployment Agent. Formulate deployment runbooks, Dockerfiles, and cloud infrastructure manifests.'
  },
  {
    id: 6,
    name: 'Monitoring Agent',
    slug: 'monitoring',
    category: 'Monitoring',
    description: 'Continuously analyzes logs and telemetry, detecting anomalies and proactively suggesting remediation steps before service degradation impacts users.',
    status: 'Active',
    icon: 'Activity',
    order: 6,
    capabilities: [
      'Real-Time Log Telemetry Anomaly Detection',
      'Automated Root Cause Analysis (RCA)',
      'Performance Bottleneck Profiling',
      'Self-Healing Alert Triggers'
    ],
    systemPrompt: 'You are the Athira Monitoring Agent. Analyze incident logs, identify latency spikes or memory leaks, and recommend immediate patches.'
  },
  {
    id: 7,
    name: 'Documentation Agent',
    slug: 'documentation',
    category: 'Documentation',
    description: 'Keeps API specs, runbooks, and inline code comments synchronized with the latest deployed version without manual developer intervention.',
    status: 'Idle',
    icon: 'BookOpen',
    order: 7,
    capabilities: [
      'Auto-Generated API Documentation (Swagger/Redoc)',
      'Inline JSDoc / TSDoc Comment Injection',
      'Architecture Decision Record (ADR) Logging',
      'Interactive Code Walkthrough Guides'
    ],
    systemPrompt: 'You are the Athira Documentation Agent. Synthesize comprehensive technical documentation, API guides, and architectural decision records.'
  }
];

export const INITIAL_SERVICES: ServicePlan[] = [
  {
    id: 1,
    title: 'Starter',
    slug: 'starter',
    description: 'Essential AI tools for growing teams looking to accelerate initial feature delivery.',
    price: '$499',
    features: [
      'Basic SDLC Agents (Planning, Dev, Testing)',
      'Standard Analytics Dashboard',
      'Email Support (24hr response time)',
      'Up to 5 Concurrent Agent Executions',
      '30 Days Log & Data Retention'
    ],
    order: 1
  },
  {
    id: 2,
    title: 'Pro',
    slug: 'pro',
    description: 'Advanced control and full agent suite for enterprise development environments.',
    price: '$1,499',
    isPopular: true,
    features: [
      'All 7 Specialized SDLC Agents',
      'Predictive Analytics & Anomaly Detection',
      'Priority 24/7 Dedicated Support',
      'Up to 50 Concurrent Agent Executions',
      '1 Year Historical Data Retention',
      'Custom CI/CD Pipeline Integrations'
    ],
    order: 2
  },
  {
    id: 3,
    title: 'Enterprise',
    slug: 'enterprise',
    description: 'Tailored solutions, dedicated compute clusters, and custom AI model fine-tuning for massive scale.',
    price: 'Custom',
    features: [
      'Dedicated On-Premise / VPC Infrastructure',
      'Custom AI Model Training & Fine-Tuning',
      'Dedicated Account Manager & Solutions Architect',
      'Unlimited Concurrent Agent Executions',
      'Unlimited Data Retention & Custom SLA',
      'SOC2 Type II & HIPAA Compliance Guarantee'
    ],
    order: 3
  }
];

export const FEATURE_COMPARISON: FeatureComparison[] = [
  { feature: 'Concurrent Agents', starter: 'Up to 5', pro: 'Up to 50', enterprise: 'Unlimited' },
  { feature: 'Data Retention', starter: '30 Days', pro: '1 Year', enterprise: 'Unlimited' },
  { feature: 'SLA Uptime', starter: '99.0%', pro: '99.9%', enterprise: '99.99%' },
  { feature: 'Custom Model Fine-Tuning', starter: 'Unavailable', pro: 'Add-on', enterprise: 'Included' },
  { feature: 'Security Compliance', starter: 'Standard SSL/TLS', pro: 'SOC2 Type I', enterprise: 'SOC2 Type II + HIPAA' },
  { feature: 'Deployment Target', starter: 'Shared Cloud', pro: 'Isolated Cloud Container', enterprise: 'Dedicated VPC / On-Prem' }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Architecting Scalable LLM Pipelines for Enterprise Data',
    slug: 'architecting-scalable-llm-pipelines',
    category: 'ENGINEERING',
    excerpt: 'Discover how we leverage distributed computing and advanced retrieval-augmented generation to ensure zero-latency pipeline orchestration.',
    content: `
### Introduction

In modern software engineering, integrating Large Language Models (LLMs) into mission-critical production pipelines requires more than simply calling an API. Enterprise engineering workloads demand predictable latency, deterministic guardrails, and fault-tolerant concurrency control.

### Distributed Agent Orchestration

At **Athira Technology**, our autonomous SDLC agents operate over a decentralized event bus. Rather than executing linear prompts, agents decompose software tasks into directed acyclic graphs (DAGs).

1. **Planning Phase:** Requirements are ingested and transformed into explicit JSON schemas.
2. **Context Retrieval:** Fine-grained code embeddings are fetched from vector indices.
3. **Synthesis & Verification:** The Development and Testing agents execute in parallel, evaluating outputs against strict static analysis AST parsers.

\`\`\`typescript
interface PipelineConfig {
  maxConcurrency: number;
  timeoutMs: number;
  fallbackStrategy: 'graceful_degrade' | 'retry_exponential';
}
\`\`\`

### Results in Production

By decoupling context indexing from LLM inference, we reduced cluster idle times by 40% while maintaining a 99.99% uptime guarantee across our enterprise deployments.
    `,
    author: 'Athira AI Team',
    date: 'Oct 24, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    published: true,
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Zero-Trust Frameworks in Agentic Workflows',
    slug: 'zero-trust-frameworks-in-agentic-workflows',
    category: 'SECURITY',
    excerpt: 'As autonomous AI agents take on more complex tasks, securing their operational boundaries is critical. We detail our multi-layer authorization protocol.',
    content: `
### Security at the Edge

Autonomous AI agents possess the capability to generate, inspect, and deploy code. Granting unrestricted access to internal repositories presents significant security risks if authorization boundaries are blurred.

### Key Pillars of Athira Zero-Trust Security

- **Least-Privilege Agent Roles:** Each agent (Planning, Testing, Deployment) operates with isolated IAM credentials.
- **Ephemeral Sandbox Execution:** Code generated by agents runs exclusively in transient webassembly or containerized runtimes.
- **Human-in-the-Loop Gatekeeping:** Sensitive actions (such as production rollouts or database migrations) require explicit cryptographic sign-off.
    `,
    author: 'Athira AI Team',
    date: 'Oct 18, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    published: true,
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Optimizing Compute Allocation for Fine-Tuning',
    slug: 'optimizing-compute-allocation',
    category: 'INFRASTRUCTURE',
    excerpt: 'A deep dive into our dynamic resource allocation engine that reduces cluster idle time by 40% during large-scale model fine-tuning.',
    content: `
### Compute Bottlenecks in Modern AI

Fine-tuning proprietary models for specific domain codebases can quickly consume GPU quota if jobs are improperly scheduled. Our monitoring agent actively profiles cluster memory and GPU utilization to dynamic scale workers up or down.
    `,
    author: 'Athira AI Team',
    date: 'Oct 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    published: true,
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Overcoming Hallucinations in Financial AI',
    slug: 'overcoming-hallucinations-in-financial-ai',
    category: 'RESEARCH',
    excerpt: 'Exploring our multi-agent verification protocol that dramatically reduces hallucination rates in generative models deployed in strict compliance environments.',
    content: `
### The Challenge of Accuracy

In financial software engineering, even a single invalid syntax or off-by-one algorithmic bug can cause significant financial loss. Our dual-agent verification system pairs generator agents with critic/auditor agents to continuously validate outputs.
    `,
    author: 'Athira AI Team',
    date: 'Oct 05, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    published: true,
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Deploying Autonomous SDLC Agents Across 50+ Teams',
    slug: 'deploying-autonomous-sdlc-agents-case-study',
    category: 'CASE STUDY',
    excerpt: 'A comprehensive review of how a Fortune 500 financial institution integrated our SDLC agents, resulting in a 30% acceleration in feature delivery.',
    content: `
### Case Study Overview

A leading global bank with over 1,200 developers deployed Athira Technology's autonomous SDLC platform across 50 engineering sub-teams.

### Key Results
- **30% Faster Sprint Velocity**
- **65% Reduction in Deployment Regression Incidents**
- **100% Automated Documentation Compliance**
    `,
    author: 'Athira AI Team',
    date: 'Sep 28, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    published: true,
    readTime: '8 min read'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.j@athira.com',
    role: 'admin',
    status: 'Online',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@athira.com',
    role: 'developer',
    status: 'Offline',
    createdAt: '2024-02-01'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    email: 'elena.r@athira.com',
    role: 'editor',
    status: 'Online',
    createdAt: '2024-03-10'
  },
  {
    id: 4,
    name: 'David Kalu',
    email: 'david.k@athira.com',
    role: 'viewer',
    status: 'Busy',
    createdAt: '2024-04-05'
  }
];

export const INITIAL_ANALYTICS: AnalyticsSummary = {
  avgResponseTimeMs: 124,
  activeAlertsCount: 3,
  clusterStatus: '7 Agents Active',
  activeAgentsCount: 7,
  dailyVisitors: 4820,
  utilizationData: [
    { label: 'Day 1', value: 25 },
    { label: 'Day 5', value: 42 },
    { label: 'Day 10', value: 38 },
    { label: 'Day 15', value: 65 },
    { label: 'Day 20', value: 78 },
    { label: 'Day 25', value: 52 },
    { label: 'Day 30', value: 88 }
  ],
  visitorData: [
    { date: 'Mon', visitors: 1200, pageViews: 3400 },
    { date: 'Tue', visitors: 1900, pageViews: 4800 },
    { date: 'Wed', visitors: 2400, pageViews: 5900 },
    { date: 'Thu', visitors: 2800, pageViews: 6700 },
    { date: 'Fri', visitors: 3200, pageViews: 7800 },
    { date: 'Sat', visitors: 1800, pageViews: 4100 },
    { date: 'Sun', visitors: 2100, pageViews: 4900 }
  ],
  topPages: [
    { path: '/', views: 12450 },
    { path: '/agents', views: 8920 },
    { path: '/services', views: 6540 },
    { path: '/blog', views: 4310 },
    { path: '/admin/dashboard', views: 3200 }
  ]
};

export const INITIAL_SETTINGS: SystemSettings = {
  systemPrompt: 'Athira Autonomous SDLC Enterprise Engine: Enforce strict TypeScript typing, AST security validation, zero-trust sandbox execution, and OpenAPI compliance.',
  geminiModel: 'gemini-2.5-flash',
  enableAutoOptimize: true,
  maxConcurrentAgents: 50,
  dbStatus: 'Connected'
};

// Convenient aliases for imports
export const MOCK_AGENTS = INITIAL_AGENTS;
export const MOCK_SERVICES = INITIAL_SERVICES;
export const MOCK_FEATURE_COMPARISON = FEATURE_COMPARISON;
export const MOCK_BLOG_POSTS = INITIAL_POSTS;
export const MOCK_USERS = INITIAL_USERS;
export const MOCK_ANALYTICS = INITIAL_ANALYTICS;
export const DEFAULT_SETTINGS = INITIAL_SETTINGS;
