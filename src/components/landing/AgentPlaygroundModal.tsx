import React, { useState } from 'react';
import { AgentSpec } from '../../types';
import { X, Play, Loader2, Sparkles, Copy, Check, Terminal, Cpu } from 'lucide-react';

interface AgentPlaygroundModalProps {
  agent: AgentSpec | null;
  allAgents: AgentSpec[];
  onClose: () => void;
  onSelectAgent: (agent: AgentSpec) => void;
}

export const AgentPlaygroundModal: React.FC<AgentPlaygroundModalProps> = ({
  agent,
  allAgents,
  onClose,
  onSelectAgent
}) => {
  const selectedAgent = agent || allAgents[0];

  const [promptInput, setPromptInput] = useState(
    selectedAgent?.slug === 'planning'
      ? 'Create an architecture spec for a high-concurrency payment processing service with MySQL database and Redis caching.'
      : selectedAgent?.slug === 'development'
      ? 'Implement a TypeScript authentication middleware function with JWT token verification and rate limiting.'
      : 'Generate unit test suite for user registration service with edge case validation.'
  );

  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [executionStats, setExecutionStats] = useState<{ timeMs: number; source: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleRun = async () => {
    if (!promptInput.trim()) return;
    setIsRunning(true);
    setOutputResult(null);

    try {
      const res = await fetch('/api/ai/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentSlug: selectedAgent.slug,
          prompt: promptInput
        })
      });

      const data = await res.json();
      setOutputResult(data.output || 'Agent execution completed.');
      setExecutionStats({
        timeMs: data.executionTimeMs || 124,
        source: data.source || 'Athira AI Engine'
      });
    } catch (err) {
      setOutputResult('Error executing agent. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A192F] border border-slate-800 text-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#112240]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0A192F] border border-cyan-500/40 flex items-center justify-center text-[#00D4FF]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Athira Autonomous Agent Playground</h3>
              <p className="text-xs text-cyan-400 font-mono">Live AI Code & Specs Generator</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Select Agent Tabs */}
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-2">Select Target Agent:</label>
            <div className="flex flex-wrap gap-2">
              {allAgents.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onSelectAgent(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    a.slug === selectedAgent.slug
                      ? 'bg-[#00D4FF] text-[#0A192F] border-[#00D4FF] shadow-md shadow-cyan-500/20'
                      : 'bg-[#112240] text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-slate-400">Agent Task Prompt:</label>
              <span className="text-[11px] font-mono text-cyan-400">Powered by Gemini 2.5 Flash</span>
            </div>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={3}
              placeholder="Describe the code, schema, tests, or architecture to generate..."
              className="w-full bg-[#112240] border border-slate-700 focus:border-[#00D4FF] rounded-lg p-3 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#00D4FF] resize-none"
            />
          </div>

          {/* Run Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Terminal className="w-4 h-4 text-[#00D4FF]" />
              <span>Agent System Prompt Enforced</span>
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning || !promptInput.trim()}
              className="px-6 py-2.5 rounded-lg bg-[#00D4FF] hover:bg-[#33DDFF] disabled:opacity-50 text-[#0A192F] font-bold text-sm transition-all flex items-center gap-2 shadow-md shadow-cyan-500/20"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#0A192F]" />
                  <span>Execute {selectedAgent.name}</span>
                </>
              )}
            </button>
          </div>

          {/* Execution Output Window */}
          {outputResult && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-[#00D4FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Execution Output ({executionStats?.source})</span>
                  {executionStats && (
                    <span className="text-slate-400">({executionStats.timeMs}ms)</span>
                  )}
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-[#050C1A] border border-slate-800 rounded-lg p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto">
                {outputResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
