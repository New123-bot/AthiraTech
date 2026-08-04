import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { ContactInquiry } from '../../types';

interface ContactFormProps {
  onSubmitInquiry: (inquiry: ContactInquiry) => Promise<boolean>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmitInquiry }) => {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    company: '',
    subject: 'Enterprise AI Solutions',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const success = await onSubmitInquiry(formData);
    setIsSubmitting(false);

    if (success) {
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Enterprise AI Solutions',
        message: ''
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Glassmorphic Contact Form (7 cols) matching Screenshot 5 */}
      <div className="lg:col-span-7 bg-white/80 dark:bg-[#112240]/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg relative overflow-hidden">
        {/* Subtle cyan top gradient border accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-60" />

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-sans">
          Send a Message
        </h2>

        {submittedSuccess ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-[#00D4FF] mx-auto" />
            <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Thank you for reaching out to Athira Technology. An Enterprise AI Solutions Architect will contact you shortly.
            </p>
            <button
              onClick={() => setSubmittedSuccess(false)}
              className="mt-2 text-xs font-mono text-[#00D4FF] hover:underline"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Inquiry Type
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-all"
              >
                <option value="Enterprise AI Solutions">Enterprise AI Solutions</option>
                <option value="SDLC Automation">SDLC Automation</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnerships">Partnerships</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you achieve your goals?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 focus:border-[#00D4FF] rounded-md p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00D4FF] transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-md font-bold text-sm bg-[#00D4FF] hover:bg-[#33DDFF] disabled:opacity-50 text-[#0A192F] transition-all flex items-center gap-2 shadow-md shadow-cyan-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right: Corporate Info Card + Map Visual (5 cols) matching Screenshot 5 */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white/80 dark:bg-[#112240]/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 font-sans">
            Corporate Headquarters
          </h3>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#00D4FF] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Address</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  One World Trade Center<br />
                  Suite 4500<br />
                  New York, NY 10007
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#00D4FF] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Email</span>
                <a href="mailto:contact@athira.tech" className="text-xs text-slate-600 dark:text-slate-300 hover:text-[#00D4FF] block">
                  contact@athira.tech
                </a>
                <a href="mailto:support@athira.tech" className="text-xs text-slate-600 dark:text-slate-300 hover:text-[#00D4FF] block">
                  support@athira.tech
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#00D4FF] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Phone</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">+1 (800) 555-0199</p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Mon-Fri, 9am - 6pm EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Card Visual matching Screenshot 5 */}
        <div className="bg-[#0A192F] rounded-2xl p-1 h-60 relative overflow-hidden border border-slate-800 shadow-md group">
          <div
            className="w-full h-full rounded-xl bg-cover bg-center grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBARWNHhwXbV9AOVXajnhEa7RAHOpLCOWO9K9A3Gz76-pnfg8A-Ys0S8JfBRXLgdWgt_ukOzymQ0mFFBT1JYuWyPs4Y-z30ddqxqNrHyNuBWHDKcjhm-VpU0EY1BybLaQlErFhZTtZynnrjeicxFN-93A0Boo_Npb1SJLOWRirtRBI-_djLlng1Cv5znlJsmFq1I5eNcVd2vR7QswSeyuXO6MOAcmk4kETHMUZVtDzyPV6IPitV9dLH")'
            }}
          />

          <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-[10px] font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
            <span>SYS.ONLINE</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-[#0A192F]/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700 text-[11px] font-mono text-[#00D4FF] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>40.7127° N, -74.0134° W</span>
          </div>
        </div>
      </div>
    </div>
  );
};
