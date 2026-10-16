import React from 'react';
import {
  CheckCircle2,
  Zap,
  CreditCard,
  QrCode,
  Clock,
  ArrowRight,
  Sparkles,
  Shield,
  Wallet,
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import { useGame } from '../context/GameContext';

export const PricingView: React.FC = () => {
  const { setIsPricingModalOpen } = useGame();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#00D5F5]" />
          <span className="text-gray-300">CloudArk Prepaid Plans</span>
          <span className="text-[#00D5F5] font-semibold">· INR & UPI Ready</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Simple, Transparent Cloud Gaming Plans
        </h1>
        <p className="text-sm text-gray-400">
          No expensive hardware EMIs or recurring subscriptions. Pay only for the gaming hours you actually use.
        </p>
      </div>

      {/* Mandatory PRD Notice: Exact statement from Section 9 */}
      <div className="glass-panel border border-white/[0.1] rounded-2xl p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-gray-200 shadow-xl backdrop-blur-md">
        <Clock className="w-5 h-5 text-[#00D5F5] shrink-0" />
        <div>
          <strong className="text-white">Fair Play Guarantee:</strong> Your playtime starts only after your gaming session begins. Browsing games, queueing, and testing your connection consumes zero balance.
        </div>
      </div>

      {/* Pricing Cards Grid (All 5 plans from PRD Section 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PRICING_PLANS.map((plan) => {
          const isBestValue = plan.badgeHighlight === 'Best Value';
          const isPopular = plan.badgeHighlight === 'Popular';
          const isPremium = plan.badgeHighlight === 'Premium';

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 flex flex-col justify-between space-y-5 border transition-all ${
                isBestValue
                  ? 'bg-[#111118] border-[#00D5F5] shadow-2xl ring-1 ring-[#00D5F5]/60'
                  : isPopular
                  ? 'bg-[#111118] border-[#A855F7] shadow-xl ring-1 ring-[#A855F7]/50'
                  : isPremium
                  ? 'bg-[#111118] border-indigo-400/60 shadow-xl ring-1 ring-indigo-400/40'
                  : 'glass-card border-white/[0.08] hover:border-white/[0.2]'
              }`}
            >
              {/* Highlight Badges required by PRD Section 9 */}
              {isBestValue && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00D5F5] text-black text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  Best Value
                </div>
              )}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#A855F7] text-white text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  Popular
                </div>
              )}
              {isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                  Premium
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                </div>

                <div className="my-3">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.id === 'ark-unlimited-pro' && (
                    <span className="text-xs text-gray-400 ml-1">/month</span>
                  )}
                </div>

                {/* Key Spec Badges */}
                <div className="space-y-1.5 py-2 text-xs border-t border-b border-white/[0.08] my-3">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Access:</span>
                    <strong className="text-white font-mono">{plan.access}</strong>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Validity:</span>
                    <span className="text-gray-200">{plan.validity}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-400">Quality:</span>
                    <span className="text-[#00D5F5] font-mono text-[11px]">{plan.quality}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {plan.description}
                </p>

                <div className="space-y-1.5 text-xs text-gray-300">
                  {plan.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsPricingModalOpen(true)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isBestValue || isPopular || isPremium
                    ? 'cloudark-gradient-btn text-white shadow-md'
                    : 'bg-white/[0.06] text-gray-200 hover:bg-white/[0.1] hover:text-white border border-white/[0.08]'
                }`}
              >
                {plan.price === 0 ? 'Claim Free Trial' : `Select Pack (₹${plan.price})`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Plan Matrix Table (PRD Section 9 exact table) */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
        <h3 className="text-lg font-bold text-white font-display">
          Full Plan Comparison Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Plan</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Streaming Quality</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {PRICING_PLANS.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <span>{p.name}</span>
                    {p.badgeHighlight && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#00D5F5]/20 text-[#00D5F5] border border-[#00D5F5]/30">
                        {p.badgeHighlight}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white font-mono">
                    {p.price === 0 ? 'Free' : `₹${p.price}`}
                  </td>
                  <td className="py-3.5 px-4 text-gray-200">{p.access}</td>
                  <td className="py-3.5 px-4 text-gray-400">{p.validity}</td>
                  <td className="py-3.5 px-4 text-[#00D5F5] font-mono">{p.quality}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setIsPricingModalOpen(true)}
                      className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold cursor-pointer border border-white/[0.08]"
                    >
                      Top Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Supported (UPI, Card, Wallet icons required by PRD Section 9) */}
      <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        <h3 className="text-lg font-bold text-white font-display">
          Supported Indian Payment Options
        </h3>
        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          Instant account activation with end-to-end encrypted UPI, Card, and Wallet gateways.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-300">
          <div className="px-4 py-2 glass-panel-subtle rounded-xl border border-white/[0.08] flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#00D5F5]" />
            <span>UPI (Google Pay, PhonePe, Paytm, CRED)</span>
          </div>
          <div className="px-4 py-2 glass-panel-subtle rounded-xl border border-white/[0.08] flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#22C55E]" />
            <span>RuPay, Visa & Mastercard</span>
          </div>
          <div className="px-4 py-2 glass-panel-subtle rounded-xl border border-white/[0.08] flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#A855F7]" />
            <span>Digital Wallets & Net Banking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
