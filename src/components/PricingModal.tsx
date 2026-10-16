import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  QrCode,
  CreditCard,
  Building2,
  Wallet,
  AlertCircle,
  RefreshCw,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/mockData';
import { useGame } from '../context/GameContext';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlanId?: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  preselectedPlanId,
}) => {
  const { addPlaytime, user } = useGame();

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(() => {
    return (
      PRICING_PLANS.find((p) => p.id === preselectedPlanId) ||
      PRICING_PLANS.find((p) => p.id === 'power-pack') ||
      PRICING_PLANS[0]
    );
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Wallet'>('UPI');
  const [upiApp, setUpiApp] = useState<string>('Google Pay');
  const [upiIdInput, setUpiIdInput] = useState<string>('arnav@oksbi');
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Flow step: 'select-pack' | 'pay-gateway' | 'success' | 'failed'
  const [paymentStep, setPaymentStep] = useState<'select-pack' | 'pay-gateway' | 'success' | 'failed'>('select-pack');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartCheckout = () => {
    if (selectedPlan.price === 0) {
      handleProcessPayment(false);
    } else {
      setPaymentStep('pay-gateway');
    }
  };

  const handleProcessPayment = async (failOverride?: boolean) => {
    setIsProcessing(true);
    const shouldFail = failOverride !== undefined ? failOverride : simulateFailure;

    const success = await addPlaytime(
      selectedPlan,
      paymentMethod,
      paymentMethod === 'UPI' ? upiApp : undefined,
      shouldFail
    );

    setIsProcessing(false);
    if (success) {
      setPaymentStep('success');
    } else {
      setPaymentStep('failed');
    }
  };

  const resetFlow = () => {
    setPaymentStep('select-pack');
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-3xl glass-panel border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 text-[#00D5F5]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {paymentStep === 'select-pack'
                  ? 'Select CloudArk Playtime Pack'
                  : paymentStep === 'pay-gateway'
                  ? 'Simulated Indian Payment Gateway'
                  : paymentStep === 'success'
                  ? 'Playtime Credited'
                  : 'Payment Unsuccessful'}
              </h3>
              <p className="text-xs text-gray-400">
                Instant access to cloud GPUs • Pay in INR with UPI or Cards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory PRD Notice */}
        <div className="bg-[#111118] px-5 py-2.5 border-b border-white/[0.08] flex items-center gap-2 text-xs text-gray-300">
          <Clock className="w-4 h-4 text-[#00D5F5] shrink-0" />
          <span>
            <strong className="text-white">Fair countdown rule:</strong> Your playtime starts only after your gaming session begins.
          </span>
        </div>

        {/* Step 1: Pack Selection */}
        {paymentStep === 'select-pack' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRICING_PLANS.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative rounded-xl p-4 cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#111118] border-[#00D5F5] shadow-lg ring-1 ring-[#00D5F5]'
                        : 'glass-card border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    {plan.badgeHighlight && (
                      <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#A855F7] to-[#00D5F5] text-[9px] font-black text-black uppercase tracking-wider shadow-md">
                        {plan.badgeHighlight}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h4 className="text-base font-bold text-white">{plan.name}</h4>
                        <div className="text-xs font-semibold text-[#00D5F5]">
                          {plan.access} · {plan.validity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-white font-mono">
                          {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-400 mb-2">
                      Quality: <span className="text-[#00D5F5] font-mono">{plan.quality}</span>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-white/[0.08] text-xs text-gray-300">
                      {plan.features.slice(0, 2).map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                          <span className="text-[11px]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Breakdown Footer */}
            <div className="glass-panel-subtle rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/[0.08]">
              <div>
                <div className="text-xs text-gray-400">Selected Plan</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedPlan.name} ({selectedPlan.access})</span>
                  <span className="text-[#00D5F5] font-mono">
                    {selectedPlan.price === 0 ? '₹0' : `₹${selectedPlan.price}`}
                  </span>
                </div>
              </div>

              <button
                id="btn-proceed-to-pay"
                onClick={handleStartCheckout}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{selectedPlan.price === 0 ? 'Claim 30 Min Free Trial' : `Pay ₹${selectedPlan.price}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Gateway Simulation */}
        {paymentStep === 'pay-gateway' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between glass-panel-subtle p-3 rounded-xl border border-white/[0.08]">
              <div className="text-xs">
                <span className="text-gray-400">Order: </span>
                <strong className="text-white">{selectedPlan.name} ({selectedPlan.access})</strong>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Payable: </span>
                <strong className="text-[#00D5F5] font-mono text-base">₹{selectedPlan.price}</strong>
              </div>
            </div>

            {/* Indian Payment Modes (PRD Section 9: UPI, Card, Wallet) */}
            <div>
              <label className="text-xs font-semibold text-[#A855F7] uppercase tracking-wider mb-2 block">
                Select Indian Payment Option
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'UPI', label: 'Instant UPI', icon: QrCode },
                  { id: 'Credit/Debit Card', label: 'RuPay / Card', icon: CreditCard },
                  { id: 'Net Banking', label: 'Net Banking', icon: Building2 },
                  { id: 'Wallet', label: 'Wallets', icon: Wallet },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#111118] border-[#00D5F5] text-white shadow-md'
                          : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#00D5F5]' : 'text-gray-400'}`} />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPI Flow */}
            {paymentMethod === 'UPI' && (
              <div className="glass-panel-subtle p-4 rounded-xl space-y-4 border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Dynamic UPI QR */}
                  <div className="bg-white p-3 rounded-xl flex flex-col items-center shadow-lg shrink-0">
                    <div className="w-32 h-32 bg-[#07070A] rounded-lg p-2 flex flex-col items-center justify-center text-center">
                      <QrCode className="w-20 h-20 text-[#00D5F5]" />
                      <span className="text-[9px] font-mono text-white mt-1">UPI: ₹{selectedPlan.price}</span>
                    </div>
                    <span className="text-[10px] text-gray-700 font-semibold mt-1">Scan via any UPI App</span>
                  </div>

                  {/* UPI Apps & Input */}
                  <div className="space-y-3 w-full">
                    <label className="text-xs text-gray-300 font-medium">Or choose quick UPI app:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Google Pay', 'PhonePe', 'Paytm', 'CRED'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center justify-between cursor-pointer ${
                            upiApp === app
                              ? 'bg-[#A855F7]/25 border-[#00D5F5] text-white'
                              : 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          <span>{app}</span>
                          {upiApp === app && <Check className="w-3.5 h-3.5 text-[#00D5F5]" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] text-gray-400 mb-1 block">Your UPI ID (VPA):</label>
                      <input
                        type="text"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        placeholder="e.g. name@upi"
                        className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D5F5] font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card Flow */}
            {paymentMethod === 'Credit/Debit Card' && (
              <div className="glass-panel-subtle p-4 rounded-xl space-y-3 text-xs border border-white/[0.08]">
                <div>
                  <label className="text-gray-400 block mb-1">RuPay / Visa / Mastercard Number (Demo):</label>
                  <input
                    type="text"
                    defaultValue="5081 •••• •••• 9214"
                    className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-400 block mb-1">Expiry:</label>
                    <input
                      type="text"
                      defaultValue="09/28"
                      className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">CVV:</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Prototype Error Testing Toggle */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Simulate payment gateway failure to test fallback UX</span>
              </div>
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="rounded bg-black border-purple-500 text-purple-600 focus:ring-0"
                />
                <span className="text-[11px] font-semibold text-amber-400">Force Failure</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPaymentStep('select-pack')}
                className="text-xs text-gray-400 hover:text-white cursor-pointer"
              >
                ← Back to Packs
              </button>

              <button
                id="btn-confirm-payment"
                type="button"
                onClick={() => handleProcessPayment()}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-cyan-400 hover:opacity-90 text-black font-extrabold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Pay ₹{selectedPlan.price} & Activate {selectedPlan.name}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {paymentStep === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-display">Playtime Activated!</h3>
              <p className="text-sm text-gray-300 mt-1">
                Successfully credited <strong className="text-[#00D5F5]">{selectedPlan.access}</strong> to your CloudArk account.
              </p>
            </div>

            <div className="glass-panel-subtle p-4 rounded-xl max-w-sm mx-auto text-xs space-y-1.5 text-left border border-white/[0.08]">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Playtime Balance:</span>
                <span className="text-[#22C55E] font-bold font-mono">
                  {Math.floor(user.playtimeSeconds / 60)} Minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction Reference:</span>
                <span className="text-gray-300 font-mono">UPI/{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="text-white font-bold font-mono">₹{selectedPlan.price}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Your playtime timer starts strictly when your cloud stream begins.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                Browse & Play Games Now
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Failure Screen */}
        {paymentStep === 'failed' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-display">Payment Declined</h3>
              <p className="text-sm text-gray-300 mt-1">
                The simulated transaction was not authorized. No money was deducted from your account.
              </p>
            </div>

            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/40 max-w-sm mx-auto text-xs space-y-1.5 text-left text-rose-200">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-mono text-rose-400">SIMULATED_GATEWAY_TIMEOUT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Action:</span>
                <span>Retry UPI or choose RuPay / Card</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setSimulateFailure(false);
                  setPaymentStep('pay-gateway');
                }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Payment</span>
              </button>

              <button
                onClick={resetFlow}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Choose Another Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
