import React, { useState } from 'react';
import {
  X,
  Shield,
  FileText,
  RefreshCw,
  HelpCircle,
  CheckCircle,
  MessageSquare,
  Mail,
  Send,
  Info,
  Server,
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const LegalModals: React.FC = () => {
  const { activeLegalModal, setActiveLegalModal, isDisclaimerModalOpen, setIsDisclaimerModalOpen } = useGame();
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');

  if (!activeLegalModal && !isDisclaimerModalOpen) return null;

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setActiveLegalModal(null);
      setSupportMsg('');
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2.5">
            {isDisclaimerModalOpen ? (
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Info className="w-5 h-5" />
              </div>
            ) : activeLegalModal === 'support' ? (
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <HelpCircle className="w-5 h-5" />
              </div>
            ) : activeLegalModal === 'privacy' ? (
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Shield className="w-5 h-5" />
              </div>
            ) : activeLegalModal === 'terms' ? (
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <FileText className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <RefreshCw className="w-5 h-5" />
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-white">
                {isDisclaimerModalOpen
                  ? 'Product Architecture & Assumptions'
                  : activeLegalModal === 'support'
                  ? '24/7 Gamer Support Desk'
                  : activeLegalModal === 'privacy'
                  ? 'CloudArk Privacy Policy'
                  : activeLegalModal === 'terms'
                  ? 'Terms & Conditions'
                  : 'CloudArk Refund Policy'}
              </h3>
              <p className="text-[11px] text-gray-400">CloudArk India Prototype Documentation</p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveLegalModal(null);
              setIsDisclaimerModalOpen(false);
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-300 leading-relaxed">
          {/* DISCLAIMER / ARCHITECTURE */}
          {isDisclaimerModalOpen && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-purple-200">
                <strong className="text-white">Important Prototype Notice:</strong> CloudArk is an interactive product prototype created to demonstrate how cloud gaming eliminates expensive hardware hurdles for Indian students and casual gamers.
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">Key Product Assumptions & Technical Validations:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                  <li><strong>GPU Infrastructure:</strong> A production cloud gaming system requires enterprise cloud GPUs (such as NVIDIA L40S/RTX Ada or AMD Instinct) colocated at tier-4 edge data centers.</li>
                  <li><strong>Sub-25ms Latency:</strong> Low latency relies on direct fiber peering with JioFiber, Airtel Xstream, ACT Fibernet, and national 5G networks in Mumbai, Bengaluru, Delhi, and Hyderabad.</li>
                  <li><strong>Game Licensing:</strong> Commercial game titles necessitate cloud streaming distribution rights or publisher integration agreements.</li>
                  <li><strong>Unit Economics:</strong> Hourly pricing scales around server occupancy, dynamic power efficiency, and localized UPI processing fees.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 24/7 SUPPORT */}
          {activeLegalModal === 'support' && (
            <div className="space-y-4">
              {supportSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Ticket Created Successfully</h4>
                  <p className="text-gray-400">Our gaming engineer in Bengaluru will inspect your connection diagnostic within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-3">
                  <p className="text-gray-300">
                    Experiencing latency, controller calibration issues, or payment status questions? Reach out to our India gamer support team.
                  </p>
                  <div>
                    <label className="block text-gray-400 mb-1">Subject:</label>
                    <input
                      type="text"
                      defaultValue="Stream Latency / Connection Help"
                      className="w-full bg-black/40 border border-white/[0.08] rounded-lg p-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Your Issue Description:</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what happened during your gaming session..."
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      className="w-full bg-black/40 border border-white/[0.08] rounded-lg p-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs cursor-pointer shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Priority Gamer Ticket</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeLegalModal === 'privacy' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">1. Data Storage & Indian Privacy Standards</h4>
              <p>We believe in strict data sovereignty. All user profiles, cloud game saves, and telemetry are encrypted and securely retained in Indian data facilities conforming with the Digital Personal Data Protection (DPDP) Act.</p>
              <h4 className="font-bold text-white">2. Video Stream Telemetry</h4>
              <p>During active cloud gaming, only anonymous performance metrics (FPS, network jitter, bitrate, and dropped frames) are monitored to dynamically adjust video compression quality.</p>
            </div>
          )}

          {/* TERMS */}
          {activeLegalModal === 'terms' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">1. Prepaid Playtime Terms</h4>
              <p>Playtime minutes purchased in prepaid packs do not expire for 60 days. Playtime only deducts while an active game stream is connected to an edge GPU.</p>
              <h4 className="font-bold text-white">2. Acceptable Use</h4>
              <p>Cloud instances are dedicated solely to interactive video gaming. Unlawful modifications, cryptocurrency mining, or bot scripts will result in immediate termination.</p>
            </div>
          )}

          {/* REFUND */}
          {activeLegalModal === 'refund' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">100% Gamer Satisfaction & Disconnection Protection</h4>
              <p>If an ISP drop or server issue causes disconnection within the first 5 minutes of a session, your playtime credit is instantly returned to your balance.</p>
              <p>Unused prepaid playtime packs purchased via UPI or Card can be refunded within 7 days of purchase upon request.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black/40 border-t border-white/[0.08] flex justify-end shrink-0">
          <button
            onClick={() => {
              setActiveLegalModal(null);
              setIsDisclaimerModalOpen(false);
            }}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
