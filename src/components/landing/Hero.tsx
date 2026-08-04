import React from 'react';
import { Play, Sparkles, ArrowRight, Shield, Zap, Terminal } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onViewDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onViewDemo }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors border-b border-slate-200/80 dark:border-slate-800">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Soft Cyan Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-cyan-500/30 text-xs font-mono text-cyan-600 dark:text-[#00D4FF] shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENTERPRISE-GRADE SDLC AUTOMATION ENGINE v2.4</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A192F] dark:text-white max-w-4xl mx-auto leading-[1.1] font-sans">
          Your AI Software Engineer
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans font-normal">
          Athira Technology delivers enterprise-grade AI agents that write, test, and deploy code with unprecedented precision and speed. Transform your SDLC with intelligent automation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 rounded-md text-base font-semibold bg-[#0A192F] dark:bg-[#00D4FF] text-white dark:text-[#0A192F] hover:bg-[#112240] dark:hover:bg-[#33DDFF] shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 font-sans"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewDemo}
            className="px-8 py-3.5 rounded-md text-base font-semibold bg-white dark:bg-[#112240] text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-cyan-500/50 shadow-sm transition-all flex items-center gap-2"
          >
            <span>View Demo</span>
            <Play className="w-4 h-4 text-[#00D4FF] fill-[#00D4FF]" />
          </button>
        </div>

        {/* Key Feature Badges */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-lg bg-white/70 dark:bg-[#112240]/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800">
            <Shield className="w-5 h-5 text-[#00D4FF] mb-2" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Zero-Trust Sandbox</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Isolated AST code execution</p>
          </div>
          <div className="p-4 rounded-lg bg-white/70 dark:bg-[#112240]/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800">
            <Zap className="w-5 h-5 text-[#00D4FF] mb-2" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">124ms Avg Latency</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time code synthesis</p>
          </div>
          <div className="p-4 rounded-lg bg-white/70 dark:bg-[#112240]/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800">
            <Terminal className="w-5 h-5 text-[#00D4FF] mb-2" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">7 Autonomous Agents</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full SDLC orchestration</p>
          </div>
          <div className="p-4 rounded-lg bg-white/70 dark:bg-[#112240]/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800">
            <Sparkles className="w-5 h-5 text-[#00D4FF] mb-2" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">99.99% Uptime SLA</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enterprise SLA guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};
