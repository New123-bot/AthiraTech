import React from 'react';
import { FileCode, Cpu, ShieldCheck, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Requirements & Context Ingestion',
      desc: 'Specify feature goals in natural language or upload JIRA/Figma specs. The Planning Agent parses PRDs and models system dependencies.',
      icon: FileCode
    },
    {
      num: '02',
      title: 'Autonomous Agent Synthesis',
      desc: 'Design, Development, and Testing agents operate in parallel—generating OpenAPI contracts, type-safe code, and exhaustive test matrices.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'AST Verification & Mutation Testing',
      desc: 'Code is executed inside a sandboxed webassembly runtime. AST parsers audit security boundaries and eliminate hallucinations.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Zero-Downtime Deployment',
      desc: 'The Deployment Agent handles Kubernetes manifests, IaC, and blue-green rollouts while the Documentation Agent updates API specs.',
      icon: Rocket
    }
  ];

  return (
    <section className="py-20 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">
            END-TO-END SDLC AUTOMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] dark:text-white font-sans">
            How Athira Transforms Software Engineering
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            From initial PRD to verified production rollout, our multi-agent architecture accelerates delivery without sacrificing quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#112240] p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-4 relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-[#00D4FF] opacity-80">{step.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-cyan-500/20 flex items-center justify-center text-[#0A192F] dark:text-[#00D4FF]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{step.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
