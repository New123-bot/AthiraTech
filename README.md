# Athira Technology - Enterprise AI Software Engineering Platform

Athira Technology is an enterprise-grade AI software engineering platform powered by 7 specialized autonomous SDLC agents (Planning, Design, Development, Testing, Integration, Security, and Deployment).

---

## 🌟 Key Features

- **7 Autonomous SDLC Agents**:
  1. **Planning Agent**: Parses PRDs, specs, and requirements to generate roadmap milestones.
  2. **Design Agent**: Synthesizes type-safe OpenAPI contracts and relational database schemas.
  3. **Development Agent**: Generates production-ready TypeScript code and backend architectures.
  4. **Testing Agent**: Executes WebAssembly sandboxed mutation tests and unit suites.
  5. **Integration Agent**: Configures CI/CD pipelines and external API contracts.
  6. **Security Agent**: Performs AST static analysis and SOC2/HIPAA vulnerability audits.
  7. **Deployment Agent**: Generates Kubernetes manifests, IaC, and blue-green rollouts.

- **Interactive Agent Playground**: Live interactive terminal modal powered by server-side Gemini API (`@google/genai`).
- **Enterprise Services & Pricing**: Transparent plan tiers with interactive agent capacity estimators and comprehensive feature matrices.
- **Insights & Innovation CMS**: Multi-category technical publication hub with markdown rendering, category filters, and search.
- **Contact & Corporate Portal**: Glassmorphic inquiry submission with real-time GPS coordinate telemetry and corporate HQ info.
- **Enterprise Control Center (Admin Portal)**:
  - System performance analytics dashboard (Recharts latency, cluster load, top pages).
  - User management CRUD with role-based badges (admin, developer, editor, viewer).
  - CMS content editor for articles, agents, and pricing plans.
  - Global AI system prompt & model parameters control (`gemini-2.5-pro` / `gemini-2.5-flash`).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Node.js, Express, Vite Middleware Integration
- **AI Integration**: `@google/genai` TypeScript SDK (Server-Side Proxy)
- **Database Schema**: MySQL & Prisma ORM (`/prisma/schema.prisma`)
- **Build & Bundling**: Esbuild CommonJS production bundle (`dist/server.cjs`)

---

## 🚀 Environment Variables setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/athira_db"

# Gemini AI API Key (Managed Server-Side)
GEMINI_API_KEY="your-gemini-api-key"

# NextAuth / JWT Secret
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 💻 Development & Production Scripts

```bash
# Start development server with tsx and Vite middleware on port 3000
npm run dev

# Compile backend server with esbuild and frontend with Vite
npm run build

# Run production CommonJS server
npm run start
```
