import React from 'react';
import {
  BrainCircuit,
  Layout,
  Code2,
  Bug,
  CloudUpload,
  Activity,
  BookOpen,
  ArrowRight,
  Cpu,
  CheckCircle,
  Play
} from 'lucide-react';
import { AgentSpec } from '../../types';

interface AgentGridProps {
  agents: AgentSpec[];
  onSelectAgent: (agent: AgentSpec) => void;
  onConfigureAgent: (agent: AgentSpec) => void;
}

export const AgentGrid: React.FC<AgentGridProps> = ({
  agents,
  onSelectAgent,
  onConfigureAgent
}) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'planning':
        return BrainCircuit;
      case 'design':
        return Layout;
      case 'development':
        return Code2;
      case 'testing':
        return Bug;
      case 'deployment':
        return CloudUpload;
      case 'monitoring':
        return Activity;
      case 'documentation':
        return BookOpen;
      default:
        return Cpu;
    }
  };

  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0A192F]/95 text-slate-900 dark:text-white transition-colors border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner Header matching Screenshot 2 */}
        <div className="bg-[#0A192F] text-white rounded-xl p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00D4FF] uppercase">
              <Cpu className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Autonomous SDLC Agents
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Deploy highly specialized, context-aware AI agents across your entire software development lifecycle to accelerate delivery and enforce enterprise-grade quality.
            </p>
          </div>

          <div className="bg-[#112240] border border-cyan-500/30 px-5 py-3 rounded-lg flex items-center gap-3 shrink-0 shadow-md">
            <div className="w-3 h-3 rounded-full bg-[#00D4FF] animate-ping" />
            <div>
              <div className="text-xs font-mono text-cyan-400">Cluster Status</div>
              <div className="text-sm font-bold text-white font-mono">7 Agents Active</div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const IconComponent = getIcon(agent.slug);
            const isFeatured = agent.slug === 'planning';

            return (
              <div
                key={agent.id}
                className={`group rounded-xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-1 bg-white dark:bg-[#112240]/80 border-slate-200 dark:border-cyan-500/40 shadow-lg'
                    : 'bg-white/80 dark:bg-[#112240]/50 border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-cyan-500/30 flex items-center justify-center text-[#0A192F] dark:text-[#00D4FF] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                        agent.status === 'Active'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      Status: {agent.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans group-hover:text-[#00D4FF] transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800/80">
                    {agent.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectAgent(agent)}
                    className="text-xs font-semibold text-[#00D4FF] hover:underline flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#00D4FF]" />
                    <span>Run Agent</span>
                  </button>

                  <button
                    onClick={() => onConfigureAgent(agent)}
                    className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
