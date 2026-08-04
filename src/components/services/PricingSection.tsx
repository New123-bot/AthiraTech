import React, { useState } from 'react';
import { ServicePlan, FeatureComparison } from '../../types';
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

interface PricingSectionProps {
  services: ServicePlan[];
  comparison: FeatureComparison[];
  onSelectPlan: (plan: ServicePlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  services,
  comparison,
  onSelectPlan
}) => {
  const [agentsCount, setAgentsCount] = useState(10);
  const calculatedPrice = Math.max(499, Math.round(agentsCount * 45));

  return (
    <section className="py-16 bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A192F] dark:text-white font-sans tracking-tight">
            Enterprise-Grade AI Services
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Transparent pricing for high-performance computing and advanced AI integration.
          </p>
        </div>

        {/* Pricing Cards Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {services.map((plan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  isPopular
                    ? 'bg-[#112240] text-white border-2 border-[#00D4FF] shadow-2xl scale-105 z-10'
                    : 'bg-white dark:bg-[#112240]/60 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-md'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D4FF] text-[#0A192F] text-xs font-mono font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-sans">{plan.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/mo</span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-sm ${
                      isPopular
                        ? 'bg-[#00D4FF] text-[#0A192F] hover:bg-[#33DDFF] shadow-cyan-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : `Choose ${plan.title}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Calculator widget */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-4xl mx-auto shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#00D4FF]">
            <Calculator className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-sans">
              Custom Capacity & Agent Concurrency Estimator
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Concurrent Active SDLC Agents:</span>
                <span className="text-[#00D4FF] font-bold text-sm">{agentsCount} Agents</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={agentsCount}
                onChange={(e) => setAgentsCount(Number(e.target.value))}
                className="w-full accent-[#00D4FF] cursor-pointer"
              />
            </div>

            <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">ESTIMATED MONTHLY</span>
              <span className="text-2xl font-extrabold text-[#00D4FF] font-mono">${calculatedPrice}/mo</span>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table matching Screenshot 3 */}
        <div className="space-y-6 max-w-5xl mx-auto pt-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] dark:text-white font-sans">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240]">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 font-mono text-xs uppercase text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-semibold">Feature</th>
                  <th className="py-4 px-6 font-semibold">Starter</th>
                  <th className="py-4 px-6 font-semibold text-[#00D4FF]">Pro</th>
                  <th className="py-4 px-6 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-white font-sans">{row.feature}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-400">{row.starter}</td>
                    <td className="py-4 px-6 font-mono text-xs text-[#00D4FF] font-bold">{row.pro}</td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-400">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
