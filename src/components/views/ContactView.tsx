import React from 'react';
import { ContactForm } from '../forms/ContactForm';
import { ContactInquiry } from '../../types';
import { ShieldCheck, Award, Lock, Server, Sparkles } from 'lucide-react';

interface ContactViewProps {
  onSubmitInquiry: (inquiry: ContactInquiry) => Promise<boolean>;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSubmitInquiry }) => {
  return (
    <div className="py-16 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header matching Screenshot 5 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-[#00D4FF] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE SOLUTIONS ARCHITECTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A192F] dark:text-white font-sans tracking-tight">
            Contact Athira Technology
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Have questions about our autonomous SDLC agents, custom fine-tuning, or enterprise SLAs? Our AI engineering specialists are standing by.
          </p>
        </div>

        {/* Contact Form & Map Section matching Screenshot 5 */}
        <ContactForm onSubmitInquiry={onSubmitInquiry} />

        {/* Trust & Security Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 rounded-xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-[#00D4FF] mx-auto" />
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white">SOC 2 Type II</h4>
            <p className="text-[10px] text-slate-500">Audited Annually</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <Award className="w-6 h-6 text-[#00D4FF] mx-auto" />
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white">HIPAA Certified</h4>
            <p className="text-[10px] text-slate-500">Healthcare Ready</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <Lock className="w-6 h-6 text-[#00D4FF] mx-auto" />
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white">Zero-Data Retention</h4>
            <p className="text-[10px] text-slate-500">Private Code Context</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <Server className="w-6 h-6 text-[#00D4FF] mx-auto" />
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white">99.99% Uptime</h4>
            <p className="text-[10px] text-slate-500">24/7 SLA Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};
