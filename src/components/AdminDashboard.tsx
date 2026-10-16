import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  Zap,
  Server,
  Plus,
  Minus,
  CheckCircle,
  TrendingUp,
  History,
  CreditCard,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { GameStatus } from '../types';
import { SERVER_NODES, GAME_FALLBACK_IMAGES } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const {
    adminStats,
    games,
    updateGameStatus,
    adjustUserBalance,
    user,
    sessions,
    payments,
  } = useGame();

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (gameId: string, newStatus: GameStatus) => {
    updateGameStatus(gameId, newStatus);
    showToast(`Updated "${gameId}" status to "${newStatus}"`);
  };

  const handleAddDemoMinutes = (mins: number) => {
    adjustUserBalance(mins);
    showToast(`Added ${mins} demo minutes to ${user.name}'s balance!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#A855F7] to-[#00D5F5] text-white px-4 py-2.5 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-cyan-400/50 backdrop-blur-md animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-white" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 backdrop-blur-md">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Simulated Admin & Fleet Telemetry Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            CloudArk Operations Desk
          </h1>
          <p className="text-xs text-gray-400">
            Real-time cluster metrics, cloud GPU allocation, game availability switches, and user management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
          </span>
          <span className="text-xs font-mono font-semibold text-[#22C55E]">ALL EDGE NODES HEALTHY</span>
        </div>
      </div>

      {/* KPI Stats Grid (PRD Section 12) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric 1: Total Users */}
        <div className="glass-card border border-white/[0.08] rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Total Users</span>
            <Users className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
            {adminStats.totalRegisteredUsers.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#22C55E] flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3 inline" /> +16% this week
          </div>
        </div>

        {/* Metric 2: Active Sessions */}
        <div className="glass-card border border-white/[0.08] rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Active Sessions</span>
            <Activity className="w-4 h-4 text-[#00D5F5]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#00D5F5] font-mono">
            {adminStats.activeSessions}
          </div>
          <div className="text-[10px] text-gray-400">Live WebRTC streams</div>
        </div>

        {/* Metric 3: Server Queue Length */}
        <div className="glass-card border border-white/[0.08] rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Queue Length</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
            {adminStats.currentQueueLength}
          </div>
          <div className="text-[10px] text-gray-400">Avg wait: ~3.5s</div>
        </div>

        {/* Metric 4: Estimated GPU Utilization */}
        <div className="glass-card border border-white/[0.08] rounded-2xl p-4 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>GPU Utilization</span>
            <Server className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
            {adminStats.gpuUtilizationPercent}%
          </div>
          <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-gradient-to-r from-[#A855F7] to-rose-500 h-full"
              style={{ width: `${adminStats.gpuUtilizationPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 5: Revenue Today */}
        <div className="glass-card border border-white/[0.08] rounded-2xl p-4 shadow-lg space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Revenue Today</span>
            <span className="text-[#22C55E] font-bold">₹</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#22C55E] font-mono">
            ₹{adminStats.revenueTodayInr.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-400">Prepaid packs</div>
        </div>
      </div>

      {/* Game Availability Controls Table (PRD Section 12) */}
      <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Server className="w-4 h-4 text-[#A855F7]" />
              <span>Catalog Availability Controls</span>
            </h3>
            <p className="text-xs text-gray-400">
              Toggle availability status on the fly. Affects live catalog badges and queue states instantly.
            </p>
          </div>
          <span className="text-xs text-gray-400 font-mono">{games.length} Titles Loaded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="glass-panel-subtle text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Game Title</th>
                <th className="py-3 px-3">Genre</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Change Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {games.map((g) => (
                <tr key={g.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-3">
                    <img
                      src={g.coverImage}
                      alt={g.title}
                      className="w-10 h-7 rounded-md object-cover border border-white/[0.1]"
                      onError={(e) => {
                        const fallback = GAME_FALLBACK_IMAGES[g.id] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
                        if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                          (e.currentTarget as HTMLImageElement).src = fallback;
                        }
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <span>{g.title}</span>
                  </td>
                  <td className="py-3 px-3 text-purple-300">{g.genre}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        g.status === 'Available Now'
                          ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                          : g.status === 'Limited Capacity'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : g.status === 'Under Maintenance'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={g.status}
                      onChange={(e) => handleStatusChange(g.id, e.target.value as GameStatus)}
                      className="bg-black/50 border border-white/[0.12] rounded-lg px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-[#00D5F5] font-medium cursor-pointer"
                    >
                      <option value="Available Now" className="bg-[#111118] text-white">Available Now</option>
                      <option value="Limited Capacity" className="bg-[#111118] text-white">Limited Capacity</option>
                      <option value="Coming Soon" className="bg-[#111118] text-white">Coming Soon</option>
                      <option value="Under Maintenance" className="bg-[#111118] text-white">Under Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Grid: User Lookup & Node Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Lookup & Demo Credit Tool (PRD Section 12) */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Users className="w-4 h-4 text-[#00D5F5]" />
              <span>User Lookup & Demo Credit Tool</span>
            </h3>
            <span className="text-xs text-[#22C55E] font-mono">Demo User Active</span>
          </div>

          <div className="glass-panel-subtle p-4 rounded-xl border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Current Playtime</div>
                <div className="text-base font-bold text-[#22C55E] font-mono">
                  {Math.floor(user.playtimeSeconds / 60)} Mins
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex flex-wrap gap-2">
              <button
                onClick={() => handleAddDemoMinutes(30)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#22C55E]/15 hover:bg-[#22C55E]/30 border border-[#22C55E]/40 rounded-lg text-xs font-semibold text-[#22C55E] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>+30 Mins Courtesy Credit</span>
              </button>

              <button
                onClick={() => handleAddDemoMinutes(60)}
                className="flex items-center gap-1 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 rounded-lg text-xs font-semibold text-purple-300 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>+60 Mins Power Pack</span>
              </button>

              <button
                onClick={() => handleAddDemoMinutes(-15)}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/35 border border-rose-500/40 rounded-lg text-xs font-semibold text-rose-300 transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
                <span>-15 Mins Deduct</span>
              </button>
            </div>
          </div>
        </div>

        {/* National Edge Server Farm Status */}
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Server className="w-4 h-4 text-[#22C55E]" />
              <span>National Edge Server Farm Status</span>
            </h3>
            <span className="text-xs text-purple-300 font-mono">4 Edge Hubs</span>
          </div>

          <div className="space-y-2.5">
            {SERVER_NODES.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between glass-panel-subtle p-3 rounded-xl border border-white/[0.08] text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <div>
                    <div className="font-bold text-white">{node.city} Hub ({node.id})</div>
                    <div className="text-[10px] text-gray-400">{node.state}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono text-[#00D5F5] font-bold">{node.latencyMs}ms</div>
                    <div className="text-[10px] text-gray-400">Ping</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-purple-300 font-bold">{node.loadPercent}%</div>
                    <div className="text-[10px] text-gray-400">GPU Load</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sessions & Recent Payments Tables (PRD Section 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <History className="w-4 h-4 text-[#A855F7]" />
            <span>Recent Sessions</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="glass-panel-subtle text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">User</th>
                  <th className="py-2.5 px-2">Game</th>
                  <th className="py-2.5 px-2">Duration</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {sessions.map((ses) => (
                  <tr key={ses.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white">{user.name.split(' ')[0]}</td>
                    <td className="py-2.5 px-2 text-[#00D5F5]">{ses.gameTitle}</td>
                    <td className="py-2.5 px-2 font-mono">{ses.durationMinutes}m</td>
                    <td className="py-2.5 px-3 font-mono text-[#22C55E]">{ses.avgLatencyMs}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <CreditCard className="w-4 h-4 text-[#22C55E]" />
            <span>Recent Payments</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="glass-panel-subtle text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">User</th>
                  <th className="py-2.5 px-2">Pack</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white">{user.name.split(' ')[0]}</td>
                    <td className="py-2.5 px-2 text-gray-200">{p.planName}</td>
                    <td className="py-2.5 px-2 font-mono font-bold text-[#22C55E]">₹{p.amount}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/20 text-[#22C55E]">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
