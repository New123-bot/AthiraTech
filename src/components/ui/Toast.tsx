import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl backdrop-blur-xl border transition-all duration-300 animate-in slide-in-from-bottom-5 ${
        toast.type === 'success'
          ? 'bg-[#0A192F]/95 text-white border-cyan-500/40 shadow-cyan-500/10'
          : toast.type === 'error'
          ? 'bg-red-950/90 text-white border-red-500/40'
          : 'bg-[#112240]/95 text-white border-slate-700'
      }`}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
        {toast.description && <p className="text-xs text-slate-300 mt-1">{toast.description}</p>}
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="text-slate-400 hover:text-white p-1 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onDismiss} />
      ))}
    </div>
  );
};
