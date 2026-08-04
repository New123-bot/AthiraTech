import React, { useState } from 'react';
import { Bot, ChevronRight, User, Lock, LogIn, LayoutDashboard, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { User as UserType } from '../../types';

interface NavbarProps {
  currentTab?: string;
  activeTab?: string;
  onSelectTab: (tab: string) => void;
  userRole?: string;
  currentUser?: UserType;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenLoginModal?: () => void;
  onOpenLogin?: () => void;
  onOpenPlayground?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  userRole,
  currentUser,
  isDarkMode = true,
  onToggleTheme,
  onOpenLoginModal,
  onOpenLogin,
  onOpenPlayground
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const active = activeTab || currentTab || 'home';
  const handleLogin = onOpenLogin || onOpenLoginModal;

  const handleNavClick = (tab: string) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    if (onOpenPlayground) {
      onOpenPlayground();
    } else {
      onSelectTab('agents');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 dark:bg-[#0A192F]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-md bg-[#0A192F] dark:bg-[#112240] border border-cyan-500/30 flex items-center justify-center text-[#00D4FF] shadow-sm group-hover:border-[#00D4FF] transition-all">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex items-center">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#0A192F] dark:text-white font-sans">
              Athira Technology
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">
              AI PLATFORM
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all ${
              active === 'home'
                ? 'text-[#0A192F] dark:text-white bg-slate-100 dark:bg-slate-800/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('agents')}
            className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all ${
              active === 'agents'
                ? 'text-[#0A192F] dark:text-white bg-slate-100 dark:bg-slate-800/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            Solutions
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all ${
              active === 'services'
                ? 'text-[#0A192F] dark:text-white bg-slate-100 dark:bg-slate-800/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all ${
              active === 'blog'
                ? 'text-[#0A192F] dark:text-white bg-slate-100 dark:bg-slate-800/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all ${
              active === 'contact'
                ? 'text-[#0A192F] dark:text-white bg-slate-100 dark:bg-slate-800/60 font-semibold border-b-2 border-[#0A192F] dark:border-[#00D4FF]'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            Company
          </button>
          
          {/* Direct Admin Control Center Portal Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`ml-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono tracking-wide transition-all border flex items-center gap-1.5 ${
              active === 'admin'
                ? 'bg-cyan-500/20 text-[#00D4FF] border-[#00D4FF]'
                : 'bg-slate-900/80 text-cyan-400 border-cyan-500/30 hover:border-[#00D4FF] hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#00D4FF]" />
            Control Center
          </button>
        </div>

        {/* Action Controls & Mobile/Tablet Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          )}

          {/* Login Button (Desktop & Tablet) */}
          {handleLogin && (
            <button
              onClick={() => {
                handleLogin();
                setIsMobileMenuOpen(false);
              }}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A192F] dark:hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>{currentUser ? currentUser.name.split(' ')[0] : 'Login'}</span>
            </button>
          )}

          {/* Desktop/Tablet CTA Button */}
          <button
            onClick={handleGetStarted}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold bg-[#0A192F] dark:bg-[#112240] hover:bg-[#112240] dark:hover:bg-[#1d3557] text-white border border-slate-700 hover:border-[#00D4FF] shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] transition-all"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 text-[#00D4FF]" />
          </button>

          {/* Mobile/Tablet Menu Hamburger Button (visible below lg) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#00D4FF]" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#0A192F]/98 border-b border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all ${
                active === 'home'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-[#0A192F] dark:text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Home</span>
              {active === 'home' && <ChevronRight className="w-4 h-4 text-[#00D4FF]" />}
            </button>

            <button
              onClick={() => handleNavClick('agents')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all ${
                active === 'agents'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-[#0A192F] dark:text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Solutions (Agents)</span>
              {active === 'agents' && <ChevronRight className="w-4 h-4 text-[#00D4FF]" />}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all ${
                active === 'services'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-[#0A192F] dark:text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Services & Pricing</span>
              {active === 'services' && <ChevronRight className="w-4 h-4 text-[#00D4FF]" />}
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all ${
                active === 'blog'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-[#0A192F] dark:text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Blog & Articles</span>
              {active === 'blog' && <ChevronRight className="w-4 h-4 text-[#00D4FF]" />}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all ${
                active === 'contact'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-[#0A192F] dark:text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span>Company & Contact</span>
              {active === 'contact' && <ChevronRight className="w-4 h-4 text-[#00D4FF]" />}
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-all border ${
                active === 'admin'
                  ? 'bg-cyan-950/60 text-[#00D4FF] border-[#00D4FF]'
                  : 'bg-slate-900/90 text-cyan-400 border-cyan-500/30 hover:border-[#00D4FF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#00D4FF]" />
                <span className="font-mono text-sm tracking-wide">Control Center</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest bg-cyan-900/80 text-cyan-200 px-2 py-0.5 rounded uppercase">
                Admin
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            {/* User Profile / Login row on mobile */}
            {handleLogin && (
              <button
                onClick={() => {
                  handleLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
              >
                <LogIn className="w-4 h-4 text-[#00D4FF]" />
                <span>{currentUser ? `Account: ${currentUser.name}` : 'Sign In / Account'}</span>
              </button>
            )}

            {/* Mobile CTA Button */}
            <button
              onClick={handleGetStarted}
              className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-[#00D4FF] text-[#0A192F] hover:bg-[#33DDFF] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#0A192F]" />
              <span>Get Started - Explore AI Agents</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

