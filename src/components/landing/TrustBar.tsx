import React from 'react';
import { ShieldCheck, Award, Lock, Server } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-[#0A192F] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
          TRUSTED BY LEADING ENTERPRISE ENGINEERING TEAMS WORLDWIDE
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#112240]/40 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">SOC 2 TYPE II CERTIFIED</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#112240]/40 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center gap-3">
            <Award className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">HIPAA COMPLIANT</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#112240]/40 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center gap-3">
            <Lock className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">ZERO-RETENTION VAULT</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#112240]/40 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center gap-3">
            <Server className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">99.99% UPTIME SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
