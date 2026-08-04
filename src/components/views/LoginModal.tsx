import React, { useState } from 'react';
import { X, LogIn, Shield, User, Key, Check } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('sarah.j@athira.com');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, selectedRole);
    onClose();
  };

  const quickPresets = [
    { name: 'Sarah Jenkins (Admin)', email: 'sarah.j@athira.com', role: 'admin' as UserRole },
    { name: 'Michael Chen (Dev)', email: 'm.chen@athira.com', role: 'developer' as UserRole },
    { name: 'Elena Rostova (Editor)', email: 'elena.r@athira.com', role: 'editor' as UserRole }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A192F] border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle Cyan Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF]" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#112240] border border-cyan-500/30 flex items-center justify-center text-[#00D4FF]">
              <LogIn className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-lg text-white font-sans">Athira Platform Login</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Quick Login Buttons */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-slate-400 uppercase block">Quick Select Preset Role:</label>
          <div className="space-y-1.5">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setEmail(preset.email);
                  setSelectedRole(preset.role);
                }}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  email === preset.email
                    ? 'bg-[#112240] border-[#00D4FF] text-white'
                    : 'bg-[#050C1A] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold block">{preset.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{preset.email}</span>
                </div>
                {email === preset.email && <Check className="w-4 h-4 text-[#00D4FF]" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800 text-xs">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#112240] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#00D4FF]"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Access Role Permission</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-[#112240] border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#00D4FF]"
            >
              <option value="admin">admin (Full Control Center Access)</option>
              <option value="developer">developer (SDLC Agents & API)</option>
              <option value="editor">editor (CMS Content Manager)</option>
              <option value="viewer">viewer (Read Only)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#33DDFF] text-[#0A192F] font-bold shadow-md shadow-cyan-500/20"
            >
              Log In as {selectedRole.toUpperCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
