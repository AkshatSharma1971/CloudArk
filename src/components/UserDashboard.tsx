import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Play,
  History,
  CreditCard,
  Wifi,
  RotateCcw,
  Sparkles,
  Server,
  ChevronRight,
  LogOut,
  Heart,
  User as UserIcon,
  Shield,
  Trash2,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Game } from '../types';
import { GAME_FALLBACK_IMAGES, HERO_FALLBACK_IMAGE } from '../data/mockData';

export const UserDashboard: React.FC = () => {
  const {
    user,
    sessions,
    payments,
    games,
    startSession,
    setIsPricingModalOpen,
    setActiveTab,
    resetDemoData,
    networkTest,
    selectedServer,
    setSelectedGameForDetails,
    toggleWishlist,
  } = useGame();

  // Find recent game or default to Neon Siege
  const recentGame = games.find((g) => g.title === user.recentGame || g.id === 'neon-siege') || games[0];

  // Wishlisted games
  const wishlistedGames = games.filter((g) => (user.wishlist || []).includes(g.id));

  const formatHoursMins = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins} Minutes`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* 1. Header Profile Banner (PRD Section 11: Welcome message, balance, profile settings) */}
      <div className="relative glass-panel border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#00D5F5] shadow-lg shadow-purple-950/60"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
              }}
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#22C55E] text-black text-[9px] font-black rounded-full uppercase tracking-wider">
              Active
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Welcome back, {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                {user.tier}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              {user.email} · Member since {user.joinedDate}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#00D5F5] pt-0.5 font-mono">
              <Server className="w-3.5 h-3.5" />
              <span>Connected Node: {selectedServer}</span>
            </div>
          </div>
        </div>

        {/* Quick Profile Actions (PRD Section 11: Logout, Reset demo) */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setActiveTab('test')}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Wifi className="w-3.5 h-3.5 text-[#00D5F5]" />
            <span>Connection Test</span>
          </button>

          <button
            onClick={resetDemoData}
            className="px-4 py-2 rounded-xl bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to 2-hour seeded Arnav Sharma demo account"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/40 text-xs font-semibold text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards: Playtime Balance, Continue Playing, Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Playtime Balance (PRD Section 11) */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A855F7]">
              Current Playtime Balance
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30">
              <Clock className="w-5 h-5 text-[#A855F7]" />
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {formatHoursMins(user.playtimeSeconds)}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Counts down strictly during active cloud game streaming
            </p>
          </div>

          <button
            id="btn-dashboard-topup"
            onClick={() => setIsPricingModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl cloudark-gradient-btn text-white text-xs font-bold shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Playtime Credits (from ₹29)</span>
          </button>
        </div>

        {/* Card 2: Continue Playing Section (PRD Section 11: Neon Siege) */}
        <div className="relative glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-lg overflow-hidden flex flex-col justify-between space-y-4">
          <img
            src={recentGame.coverImage}
            alt={recentGame.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            onError={(e) => {
              const fallback = GAME_FALLBACK_IMAGES[recentGame.id] || HERO_FALLBACK_IMAGE;
              if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                (e.currentTarget as HTMLImageElement).src = fallback;
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/85 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#00D5F5]">
              Continue Playing
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40">
              Cloud Saved
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white font-display">{recentGame.title}</h3>
            <p className="text-xs text-gray-300 line-clamp-1">{recentGame.description}</p>
          </div>

          <button
            id="btn-dashboard-continue-playing"
            onClick={() => startSession(recentGame)}
            className="relative z-10 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00D5F5] hover:bg-cyan-300 text-black font-extrabold text-xs shadow-md transition-all hover:scale-102 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Resume Gaming Session</span>
          </button>
        </div>

        {/* Card 3: Connection Status (PRD Section 11) */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#22C55E]">
              Connection Status
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <Wifi className="w-5 h-5 text-[#22C55E]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Stream Quality:</span>
              <span className="text-white font-bold font-mono">1080p @ 60 FPS</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Estimated Latency:</span>
              <span className="text-[#22C55E] font-bold font-mono">~{networkTest.latencyMs} ms</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Nearest Edge Hub:</span>
              <span className="text-[#00D5F5] font-semibold">{selectedServer.split(' ')[0]}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('test')}
            className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
          >
            Re-run Connection Diagnostic
          </button>
        </div>
      </div>

      {/* 3. Wishlist Section (PRD Section 11) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlistedGames.length})</span>
          </h2>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs text-[#00D5F5] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>Explore More Titles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {wishlistedGames.length === 0 ? (
          <div className="glass-panel rounded-2xl p-6 text-center text-xs text-gray-400">
            Your wishlist is empty. Browse the game library to save your favorite games.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {wishlistedGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGameForDetails(game)}
                className="group relative glass-card border border-white/[0.08] hover:border-[#00D5F5]/60 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const fallback = GAME_FALLBACK_IMAGES[game.id] || HERO_FALLBACK_IMAGE;
                      if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                        (e.currentTarget as HTMLImageElement).src = fallback;
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(game.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-rose-400 hover:text-rose-300 border border-white/10"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-[#00D5F5] bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                    <Play className="w-2.5 h-2.5 fill-[#00D5F5]" />
                    <span>Play Now</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-[#A855F7] font-semibold">{game.genre}</div>
                  <div className="text-sm font-bold text-white truncate">{game.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Recently Played Games (PRD Section 11) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Sparkles className="w-4 h-4 text-[#00D5F5]" />
            <span>Recently Played Games</span>
          </h2>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>View All Library</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {games.slice(0, 4).map((game) => (
            <div
              key={game.id}
              onClick={() => startSession(game)}
              className="group relative glass-card border border-white/[0.08] hover:border-[#00D5F5]/60 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const fallback = GAME_FALLBACK_IMAGES[game.id] || HERO_FALLBACK_IMAGE;
                    if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                      (e.currentTarget as HTMLImageElement).src = fallback;
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-[#00D5F5] bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                  <Play className="w-2.5 h-2.5 fill-[#00D5F5]" />
                  <span>Instant Play</span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[10px] text-[#A855F7] font-semibold">{game.genre}</div>
                <div className="text-sm font-bold text-white truncate">{game.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Session History & Payment History (PRD Section 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session History Table */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <History className="w-4 h-4 text-[#A855F7]" />
              <span>Gaming Session History</span>
            </h3>
            <span className="text-xs text-gray-400 font-mono">{sessions.length} Sessions</span>
          </div>

          {sessions.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No gaming sessions recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="glass-panel-subtle text-[11px] uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Game</th>
                    <th className="py-2.5 px-2">Duration</th>
                    <th className="py-2.5 px-2">Avg Latency</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Server</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {sessions.map((ses) => (
                    <tr key={ses.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-white">{ses.gameTitle}</td>
                      <td className="py-2.5 px-2 font-mono text-[#00D5F5]">{ses.durationMinutes}m</td>
                      <td className="py-2.5 px-2 font-mono text-[#22C55E]">{ses.avgLatencyMs}ms</td>
                      <td className="py-2.5 px-3 text-gray-400 truncate max-w-[100px]">{ses.serverNode.split(' ')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payment History Table */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <CreditCard className="w-4 h-4 text-[#22C55E]" />
              <span>Payment & Top-Up History</span>
            </h3>
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="text-xs text-[#00D5F5] hover:underline font-semibold cursor-pointer"
            >
              + Add Playtime
            </button>
          </div>

          {payments.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No payment transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="glass-panel-subtle text-[11px] uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Pack</th>
                    <th className="py-2.5 px-2">Amount</th>
                    <th className="py-2.5 px-2">Mode</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-white">{p.planName}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{p.transactionRef}</div>
                      </td>
                      <td className="py-2.5 px-2 font-mono font-bold text-white">₹{p.amount}</td>
                      <td className="py-2.5 px-2 text-gray-300">
                        <span className="px-1.5 py-0.5 bg-black/40 rounded border border-white/[0.08] text-[10px]">
                          {p.upiApp || p.paymentMethod}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'SUCCESS'
                              ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
