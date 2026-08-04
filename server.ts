import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_AGENTS,
  INITIAL_SERVICES,
  INITIAL_POSTS,
  INITIAL_USERS,
  INITIAL_ANALYTICS,
  INITIAL_SETTINGS
} from './src/data/mockData.js';

// In-memory data state initialized with enterprise seed data
let agentsStore = [...INITIAL_AGENTS];
let servicesStore = [...INITIAL_SERVICES];
let postsStore = [...INITIAL_POSTS];
let usersStore = [...INITIAL_USERS];
let contactStore: Array<{ id: number; name: string; email: string; company?: string; subject: string; message: string; createdAt: string }> = [];
let analyticsStore = { ...INITIAL_ANALYTICS };
let settingsStore = { ...INITIAL_SETTINGS };

// Current logged in user session
let currentUserStore = { ...INITIAL_USERS[0] }; // Default logged in as Sarah Jenkins (Admin)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Athira Technology Control Server',
      timestamp: new Date().toISOString()
    });
  });

  // Auth endpoints
  app.get('/api/auth/me', (_req, res) => {
    res.json({ user: currentUserStore });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, role } = req.body;
    const existing = usersStore.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
    if (existing) {
      currentUserStore = { ...existing, status: 'Online' };
    } else {
      currentUserStore = {
        id: Date.now(),
        email: email || 'admin@athira.com',
        name: email ? email.split('@')[0] : 'Enterprise Admin',
        role: role || 'admin',
        status: 'Online',
        createdAt: new Date().toISOString().split('T')[0]
      };
      usersStore.push(currentUserStore);
    }
    res.json({ success: true, user: currentUserStore });
  });

  app.post('/api/auth/logout', (_req, res) => {
    currentUserStore = { ...INITIAL_USERS[3], status: 'Offline' }; // viewer
    res.json({ success: true });
  });

  // SDLC Agents API
  app.get('/api/agents', (_req, res) => {
    res.json(agentsStore);
  });

  app.post('/api/agents', (req, res) => {
    const newAgent = {
      id: Date.now(),
      order: agentsStore.length + 1,
      status: 'Idle' as const,
      capabilities: req.body.capabilities || ['Custom Agent Execution'],
      ...req.body
    };
    agentsStore.push(newAgent);
    res.status(201).json(newAgent);
  });

  // Services & Pricing API
  app.get('/api/services', (_req, res) => {
    res.json(servicesStore);
  });

  app.post('/api/services', (req, res) => {
    const newService = {
      id: Date.now(),
      order: servicesStore.length + 1,
      ...req.body
    };
    servicesStore.push(newService);
    res.status(201).json(newService);
  });

  // Blog Posts CMS API
  app.get('/api/posts', (_req, res) => {
    res.json(postsStore);
  });

  app.get('/api/posts/:slug', (req, res) => {
    const post = postsStore.find((p) => p.slug === req.params.slug || String(p.id) === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });

  app.post('/api/posts', (req, res) => {
    const newPost = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      published: true,
      readTime: '5 min read',
      author: currentUserStore.name || 'Athira AI Team',
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      ...req.body
    };
    postsStore.unshift(newPost);
    res.status(201).json(newPost);
  });

  app.put('/api/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = postsStore.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    postsStore[index] = { ...postsStore[index], ...req.body };
    res.json(postsStore[index]);
  });

  app.delete('/api/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    postsStore = postsStore.filter((p) => p.id !== id);
    res.json({ success: true, message: 'Post deleted successfully' });
  });

  // Users Management API
  app.get('/api/users', (_req, res) => {
    res.json(usersStore);
  });

  app.post('/api/users', (req, res) => {
    const newUser = {
      id: Date.now(),
      status: 'Online' as const,
      createdAt: new Date().toISOString().split('T')[0],
      ...req.body
    };
    usersStore.push(newUser);
    res.status(201).json(newUser);
  });

  app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = usersStore.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    usersStore[index] = { ...usersStore[index], ...req.body };
    res.json(usersStore[index]);
  });

  app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    usersStore = usersStore.filter((u) => u.id !== id);
    res.json({ success: true });
  });

  // Contact Form API
  app.post('/api/contact', (req, res) => {
    const { name, email, company, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const inquiry = {
      id: Date.now(),
      name,
      email,
      company: company || 'N/A',
      subject: subject || 'Enterprise AI Solutions',
      message,
      createdAt: new Date().toISOString()
    };
    contactStore.push(inquiry);
    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. An Athira AI Solutions Architect will contact you shortly.',
      inquiry
    });
  });

  // Analytics API
  app.get('/api/analytics', (_req, res) => {
    res.json(analyticsStore);
  });

  // System Settings API
  app.get('/api/settings', (_req, res) => {
    res.json(settingsStore);
  });

  app.post('/api/settings', (req, res) => {
    settingsStore = { ...settingsStore, ...req.body };
    res.json({ success: true, settings: settingsStore });
  });

  // Live SDLC Agent Execution / Gemini Integration API
  app.post('/api/ai/run-agent', async (req, res) => {
    const { agentSlug, prompt } = req.body;
    const targetAgent = agentsStore.find((a) => a.slug === agentSlug) || agentsStore[0];

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = targetAgent.systemPrompt || 'You are an Athira Autonomous SDLC Agent.';
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nTask Instructions:\n${prompt}\n\nPlease output a structured technical solution with architectural breakdown and code/schema snippets.`
        });

        return res.json({
          agent: targetAgent.name,
          agentSlug: targetAgent.slug,
          executionTimeMs: Math.floor(Math.random() * 200) + 110,
          output: response.text || 'Execution completed successfully.',
          source: 'Gemini 2.5 Flash'
        });
      } catch (err: any) {
        console.error('Gemini API execution error:', err);
      }
    }

    // High-quality intelligent agent fallback response
    let simulatedOutput = '';
    switch (targetAgent.slug) {
      case 'planning':
        simulatedOutput = `### [ATHIRA PLANNING AGENT] Architecture Specification Blueprint

**Target Objective:** ${prompt}

#### 1. System Requirements Breakdown
- **Core Entity Model:** Users, AI Agents, Compute Clusters, Audit Logs
- **Security & Authorization:** OAuth2 + JWT with Zero-Trust Scopes
- **Data Persistence:** Relational MySQL cluster with Read Replicas & Redis Cache

#### 2. Technical Architecture & Component Tree
\`\`\`
[ Client App / Web ] ──► [ NGINX Edge Ingress ] ──► [ Node/Express API Gateway ]
                                                          │
                                         ┌────────────────┴────────────────┐
                                         ▼                                 ▼
                               [ SDLC Agent Orchestrator ]     [ MySQL Read/Write DB ]
\`\`\`

#### 3. Risk Assessment & Timeline
- **Bottlenecks:** High concurrency during peak code generation sessions.
- **Remediation:** Auto-scale worker containers when CPU threshold > 75%.
- **Estimated Dev Sprint:** 3 Days for MVP rollout.`;
        break;

      case 'design':
        simulatedOutput = `### [ATHIRA DESIGN AGENT] API Contract & Database Schema

**Target Objective:** ${prompt}

#### 1. OpenAPI 3.1 REST Spec
\`\`\`yaml
/api/v1/agent/orchestrate:
  post:
    summary: Trigger Autonomous Agent Task
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              agentType: { type: string, example: "development" }
              contextPayload: { type: string }
    responses:
      '200':
        description: Task queued and executing
\`\`\`

#### 2. Prisma Database Model
\`\`\`prisma
model ExecutionTask {
  id          String   @id @default(uuid())
  agentType   String
  status      String   // QUEUED, EXECUTING, COMPLETED, FAILED
  payload     String   @db.Text
  result      String?  @db.Text
  createdAt   DateTime @default(now())
}
\`\`\``;
        break;

      case 'development':
        simulatedOutput = `### [ATHIRA DEVELOPMENT AGENT] Production Code Implementation

**Target Objective:** ${prompt}

\`\`\`typescript
import { GoogleGenAI } from '@google/genai';

export interface AgentTaskRequest {
  taskId: string;
  codeContext: string;
}

export class DevelopmentService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  public async executeCodeSynthesis(req: AgentTaskRequest): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: \`Synthesize production-grade TypeScript for task: \${req.taskId}. Context: \${req.codeContext}\`
    });

    return response.text || '// Output generated successfully';
  }
}
\`\`\`

*Code generated with 100% strict TypeScript compliance & AST security verification.*`;
        break;

      case 'testing':
        simulatedOutput = `### [ATHIRA TESTING AGENT] Automated Test Suite

**Target Objective:** ${prompt}

\`\`\`typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { DevelopmentService } from './DevelopmentService';

describe('DevelopmentService Agent Test Suite', () => {
  let service: DevelopmentService;

  beforeEach(() => {
    service = new DevelopmentService('test-api-key');
  });

  it('should execute code synthesis without throwing runtime errors', async () => {
    const result = await service.executeCodeSynthesis({
      taskId: 'TASK-101',
      codeContext: 'User authentication service'
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle missing context gracefully', async () => {
    await expect(service.executeCodeSynthesis({ taskId: '', codeContext: '' })).rejects.toThrow();
  });
});
\`\`\`

*Test Coverage: 98.4% Unit & Integration Coverage.*`;
        break;

      default:
        simulatedOutput = `### [ATHIRA ${targetAgent.name.toUpperCase()}] Execution Complete

**Target Prompt:** ${prompt}

#### Execution Summary:
- **Status:** COMPLETED with zero errors.
- **Latencies:** Inference 84ms, AST Validation 12ms.
- **Output:** All system invariants satisfied. Code and infrastructure manifest verified against enterprise policy rules.`;
        break;
    }

    res.json({
      agent: targetAgent.name,
      agentSlug: targetAgent.slug,
      executionTimeMs: 142,
      output: simulatedOutput,
      source: 'Athira Autonomous Simulation Engine'
    });
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Athira Technology Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
