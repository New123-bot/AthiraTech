import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { UserTable } from '../admin/UserTable';
import { ContentEditor } from '../admin/ContentEditor';
import { AnalyticsChart } from '../admin/AnalyticsChart';
import { User, AgentSpec, ServicePlan, BlogPost, AnalyticsSummary, SystemSettings } from '../../types';
import { Bot, User as UserIcon, Shield, Sparkles, Terminal, Cpu, Database, Save, Check } from 'lucide-react';

interface AdminViewProps {
  currentUser: User;
  users: User[];
  agents: AgentSpec[];
  services: ServicePlan[];
  posts: BlogPost[];
  analytics: AnalyticsSummary;
  settings: SystemSettings;
  onLogout: () => void;
  onAddUser: (user: Partial<User>) => void;
  onUpdateUser: (id: number, user: Partial<User>) => void;
  onDeleteUser: (id: number) => void;
  onCreatePost: (post: Partial<BlogPost>) => void;
  onUpdatePost: (id: number, post: Partial<BlogPost>) => void;
  onDeletePost: (id: number) => void;
  onSaveSettings: (newSettings: Partial<SystemSettings>) => void;
  onShowToast: (title: string, type: 'success' | 'error' | 'info') => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  currentUser,
  users,
  agents,
  services,
  posts,
  analytics,
  settings,
  onLogout,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onSaveSettings,
  onShowToast
}) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [systemPromptInput, setSystemPromptInput] = useState(settings.systemPrompt);
  const [selectedModel, setSelectedModel] = useState(settings.geminiModel);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      systemPrompt: systemPromptInput,
      geminiModel: selectedModel
    });
    setIsSaved(true);
    onShowToast('System settings saved successfully', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleGenerateReport = () => {
    onShowToast('Generating Enterprise System Audit PDF Report...', 'info');
    setTimeout(() => {
      onShowToast('Report generated successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-72px)] bg-[#F8F9FA] dark:bg-[#0A192F] text-slate-900 dark:text-white transition-colors">
      {/* Sidebar navigation */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onLogout={onLogout}
        onGenerateReport={handleGenerateReport}
      />

      {/* Main Admin Dashboard Portal Area matching Screenshot 6 */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-x-hidden">
        {/* Admin Header matching Screenshot 6 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#112240] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D4FF] uppercase">
              <Bot className="w-4 h-4" />
              <span>ATHIRA CONTROL CENTER PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900 dark:text-white">
              Enterprise Control Center
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Cluster Node: us-east-1a • Uptime: 99.99% • MySQL Status: {settings.dbStatus}
            </p>
          </div>

          {/* Current User Pill */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#0A192F] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-9 h-9 rounded-full bg-[#00D4FF] text-[#0A192F] font-bold flex items-center justify-center font-mono">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">{currentUser.name}</span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            <AnalyticsChart data={analytics} />

            {/* Quick System Settings Card */}
            <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-[#00D4FF]">
                  <Terminal className="w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-sans">
                    Global AI Agent System Prompt & Model Config
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Gemini SDK v2.5</span>
              </div>

              <form onSubmit={handleSaveSystemSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    System Level Prompt (Injected across all 7 SDLC Agents):
                  </label>
                  <textarea
                    rows={3}
                    value={systemPromptInput}
                    onChange={(e) => setSystemPromptInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#00D4FF] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="text-xs font-mono text-slate-400">Target Gemini Model:</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00D4FF]"
                    >
                      <option value="gemini-2.5-flash">gemini-2.5-flash (Fastest Inference)</option>
                      <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Architecture Reasoning)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#33DDFF] text-[#0A192F] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {isSaved ? <Check className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
                    <span>{isSaved ? 'Saved Settings' : 'Save Config'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Management Section */}
        {activeSection === 'users' && (
          <div className="animate-in fade-in">
            <UserTable
              users={users}
              onAddUser={onAddUser}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
            />
          </div>
        )}

        {/* Content CMS Section */}
        {activeSection === 'content' && (
          <div className="animate-in fade-in">
            <ContentEditor
              posts={posts}
              agents={agents}
              services={services}
              onCreatePost={onCreatePost}
              onUpdatePost={onUpdatePost}
              onDeletePost={onDeletePost}
            />
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div className="animate-in fade-in">
            <AnalyticsChart data={analytics} />
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
              System Settings & Integration Credentials
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[#00D4FF] font-bold block">DATABASE_URL (MySQL Connection)</span>
                <p className="text-slate-400">mysql://username:****@localhost:3306/athira_db</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[#00D4FF] font-bold block">GEMINI_API_KEY</span>
                <p className="text-slate-400">AI Studio Runtime Key Injected (Server Proxy Active)</p>
              </div>
            </div>
          </div>
        )}

        {/* Support Section */}
        {activeSection === 'support' && (
          <div className="bg-white dark:bg-[#112240] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 animate-in fade-in">
            <Bot className="w-12 h-12 text-[#00D4FF] mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
              Athira Enterprise Technical Support
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our 24/7 Enterprise Solutions Engineers are available to assist with custom model tuning, VPC deployment, and SOC2 audits.
            </p>
            <button
              onClick={() => onShowToast('Dedicated Solutions Engineer assigned.', 'info')}
              className="px-6 py-2.5 rounded-lg bg-[#00D4FF] text-[#0A192F] font-bold text-xs"
            >
              Contact Dedicated Engineer
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
