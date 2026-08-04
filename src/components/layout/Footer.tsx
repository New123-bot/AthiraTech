import React from 'react';
import { Bot, Github, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-100 dark:bg-[#0A192F] text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto transition-colors">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0A192F] dark:bg-[#112240] border border-cyan-500/30 flex items-center justify-center text-[#00D4FF]">
              <Bot className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white font-sans">Athira Technology</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            © 2024 Athira Technology Inc. Enterprise-Grade AI Solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <button onClick={() => onSelectTab('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => onSelectTab('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Terms of Service
          </button>
          <button onClick={() => onSelectTab('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
            Security & SOC2
          </button>
          <button onClick={() => onSelectTab('contact')} className="hover:text-[#00D4FF] transition-colors">
            Contact Engineering
          </button>
          <button onClick={() => onSelectTab('admin')} className="text-cyan-600 dark:text-cyan-400 hover:underline">
            Admin Control Center
          </button>
        </div>
      </div>
    </footer>
  );
};
