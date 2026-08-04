export type UserRole = 'admin' | 'editor' | 'viewer' | 'developer';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  status: 'Online' | 'Offline' | 'Busy';
  createdAt: string;
}

export interface AgentSpec {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: 'Planning' | 'Design' | 'Development' | 'Testing' | 'Deployment' | 'Monitoring' | 'Documentation';
  status: 'Idle' | 'Active' | 'Optimizing' | 'Error';
  icon: string;
  order: number;
  capabilities: string[];
  systemPrompt?: string;
}

export interface ServicePlan {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  isPopular?: boolean;
  features: string[];
  order: number;
}

export interface FeatureComparison {
  feature: string;
  starter: string;
  pro: string;
  enterprise: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  published: boolean;
  readTime: string;
}

export interface ContactInquiry {
  id?: number;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface AnalyticsSummary {
  avgResponseTimeMs: number;
  activeAlertsCount: number;
  clusterStatus: string;
  activeAgentsCount: number;
  dailyVisitors: number;
  utilizationData: { label: string; value: number }[];
  visitorData: { date: string; visitors: number; pageViews: number }[];
  topPages: { path: string; views: number }[];
}

export interface SystemSettings {
  systemPrompt: string;
  geminiModel: string;
  enableAutoOptimize: boolean;
  maxConcurrentAgents: number;
  dbStatus: 'Connected' | 'Reconnecting' | 'Disconnected';
}
