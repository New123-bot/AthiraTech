import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Users,
  LineChart,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  Sparkles,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  onLogout: () => void;
  onGenerateReport?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  onLogout,
  onGenerateReport
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'SDLC Agents', icon: Cpu },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content CMS', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-[#0A192F] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 p-4 transition-colors">
      <div className="space-y-6">
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded bg-[#0A192F] dark:bg-[#112240] border border-cyan-500/40 flex items-center justify-center text-[#00D4FF]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Athira Admin</h3>
            <span className="text-[10px] font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              ENTERPRISE CONTROL
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0A192F] dark:bg-[#112240] text-white border-l-4 border-[#00D4FF] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00D4FF]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onGenerateReport}
          className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#00D4FF] text-[#0A192F] hover:bg-[#33DDFF] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Report</span>
        </button>

        <a
          href="#docs"
          onClick={(e) => {
            e.preventDefault();
            alert('Athira Enterprise SDLC Documentation v2.4 loaded.');
          }}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md transition-colors"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          <span>Documentation</span>
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
};
