import React, { useState } from 'react';
import {
  Gamepad2,
  Zap,
  Clock,
  Plus,
  Server,
  ChevronDown,
  User,
  LogOut,
  RotateCcw,
  Menu,
  X,
  Gauge,
  Shield,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { SERVER_NODES } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    user,
    activeTab,
    setActiveTab,
    setIsPricingModalOpen,
    selectedServer,
    setSelectedServer,
    resetDemoData,
    inGameSession,
  } = useGame();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServerMenuOpen, setIsServerMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatPlaytime = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const navLinks = [
    { id: 'library', label: 'Games' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'test', label: 'Connection Test' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'how-it-works') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setActiveTab(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07070A]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-purple-950/40 py-1 px-4 text-xs text-center text-gray-300 border-b border-white/[0.05] flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
          PROTOTYPE DEMO
        </span>
        <span className="text-gray-300">
          Don’t buy the gaming PC. Just access one with <strong className="text-white font-semibold">CloudArk</strong>.
        </span>
        <span className="hidden md:inline text-[#00D5F5]">• Instant browser access with UPI & INR payments</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: CloudArk Brand Wordmark */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] via-indigo-600 to-[#00D5F5] p-0.5 shadow-lg shadow-purple-950/50 group-hover:shadow-cyan-500/30 transition-all">
              <div className="w-full h-full bg-[#07070A] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#00D5F5] group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#07070A] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  CloudArk
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/[0.08] text-gray-300 border border-white/10 uppercase tracking-widest hidden sm:inline">
                  India
                </span>
              </div>
              <p className="text-[10px] text-gray-400 -mt-1 hidden sm:block tracking-wide">
                Zero Downloads • Browser GPU Stream
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links (single line, no wrap) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive =
                item.id === 'how-it-works'
                  ? false
                  : activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#A855F7] to-indigo-600 text-white shadow-md shadow-purple-900/40 border border-purple-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions — Edge Node + Balance + Sign In / Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Active edge node selector */}
            <div className="relative hidden xl:block">
              <button
                id="btn-server-selector"
                onClick={() => setIsServerMenuOpen(!isServerMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-gray-300 border border-white/[0.08] transition-colors cursor-pointer"
                title="Active Cloud Edge Node"
              >
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <Server className="w-3.5 h-3.5 text-[#00D5F5]" />
                <span className="font-medium text-gray-200">{selectedServer.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {isServerMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#111118] border border-white/[0.12] backdrop-blur-xl rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#A855F7]">
                    CloudArk Edge Clusters
                  </div>
                  {SERVER_NODES.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => {
                        setSelectedServer(`${node.city} (${node.latencyMs}ms)`);
                        setIsServerMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-white/[0.06] text-gray-200 transition-colors cursor-pointer"
                    >
                      <div className="text-left">
                        <div className="font-medium">{node.city}</div>
                        <div className="text-[10px] text-gray-400">{node.state}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#22C55E] font-mono font-semibold">{node.latencyMs}ms</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-Game Active Session Quick Return */}
            {inGameSession && activeTab !== 'session' && (
              <button
                onClick={() => setActiveTab('session')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-semibold animate-pulse hover:bg-[#22C55E]/25 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Session Active</span>
              </button>
            )}

            {/* Playtime balance pill & Top Up */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-xl p-1 shadow-inner">
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs">
                <Clock className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="text-gray-400 hidden sm:inline">Balance:</span>
                <span className="font-bold font-mono text-[#00D5F5]">
                  {formatPlaytime(user.playtimeSeconds)}
                </span>
              </div>
              <button
                id="btn-topup-header"
                onClick={() => setIsPricingModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#00D5F5] hover:opacity-90 text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>Top Up</span>
              </button>
            </div>

            {/* Profile / Sign In Dropdown Button */}
            <div className="relative">
              <button
                id="btn-profile-dropdown"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
                title="Account & Settings"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover border border-[#A855F7]/40"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-semibold text-gray-200 hidden md:block max-w-[95px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden md:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#111118] border border-white/[0.12] backdrop-blur-xl rounded-xl shadow-2xl p-3 z-50 animate-in fade-in">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[#A855F7]/40"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <div className="text-sm font-bold text-white truncate">{user.name}</div>
                      <div className="text-xs text-gray-400 truncate">{user.email}</div>
                      <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                        {user.tier}
                      </div>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-gray-200 hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#00D5F5]" />
                      <span>User Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('test');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-gray-200 hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
                    >
                      <Gauge className="w-3.5 h-3.5 text-[#A855F7]" />
                      <span>Connection Test</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-gray-300 hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Console (Demo)</span>
                    </button>
                    <button
                      onClick={() => {
                        resetDemoData();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-amber-300 hover:bg-amber-950/40 transition-colors text-left cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reset Demo Account</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex justify-between items-center text-[11px] text-gray-400">
                    <span>CloudArk v1.0</span>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('home');
                      }}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] text-gray-300 hover:text-white border border-white/[0.08]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#07070A]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-[#A855F7] text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
            <span>Server: {selectedServer}</span>
            <button
              onClick={() => {
                setActiveTab('test');
                setIsMobileMenuOpen(false);
              }}
              className="text-[#00D5F5] font-medium cursor-pointer"
            >
              Test Connection →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
