import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { AnalyticsSummary } from '../../types';
import { Activity, Clock, ShieldAlert, Cpu, Eye, ArrowUpRight } from 'lucide-react';

interface AnalyticsChartProps {
  data: AnalyticsSummary;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Top Metric Cards matching Screenshot 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Avg Response Time</span>
            <Clock className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {data.avgResponseTimeMs} ms
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              -12% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Cluster Status</span>
            <Cpu className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {data.clusterStatus}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">100% HEALTH</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Daily Visitors</span>
            <Eye className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {data.dailyVisitors.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112240] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono uppercase">Active Alerts</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {data.activeAlertsCount}
            </span>
            <span className="text-xs font-mono text-amber-400">LOW SEVERITY</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid matching Screenshot 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor & Traffic Trends */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">
              Weekly Traffic & Page Views
            </h3>
            <span className="text-[10px] font-mono text-[#00D4FF] bg-cyan-950/60 px-2 py-0.5 rounded">
              REAL-TIME TELEMETRY
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.visitorData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="pageViews" stroke="#00D4FF" strokeWidth={2} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Utilization Bar Chart */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">
              30-Day SDLC Agent Cluster Load (%)
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
              OPTIMIZED
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="#00D4FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Visited Pages List */}
      <div className="bg-white dark:bg-[#112240] p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans border-b border-slate-100 dark:border-slate-800 pb-3">
          Top Performing Application Pages
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {data.topPages.map((page, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-800 dark:text-slate-200">{page.path}</span>
              <span className="text-[#00D4FF] font-bold">{page.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
