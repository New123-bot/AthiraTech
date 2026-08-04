import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "Athira's autonomous agents transformed our engineering team's sprint velocity. The Testing and Development agents generated 100% compliant code with zero regression bugs.",
      author: 'Marcus Vance',
      role: 'VP of Engineering, CloudScale Systems',
      company: 'CloudScale'
    },
    {
      quote: "The Planning and Design agents saved us over 120 hours of manual OpenAPI contract and database schema drafting. It is like having 10 senior architects on demand.",
      author: 'Dr. Aris Thorne',
      role: 'Chief Technology Officer, FinTech Nexus',
      company: 'FinTech Nexus'
    },
    {
      quote: "Zero-trust sandbox execution gave our security compliance board complete peace of mind. Athira is the gold standard for enterprise AI software engineering.",
      author: 'Samantha Zhao',
      role: 'Head of Infrastructure, Global Logistics Corp',
      company: 'Global Logistics'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A192F]/90 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D4FF]">PROVEN RESULTS</span>
          <h2 className="text-3xl font-extrabold text-[#0A192F] dark:text-white font-sans">
            What Engineering Leaders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-50 dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#00D4FF] opacity-40" />
                <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{rev.author}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
