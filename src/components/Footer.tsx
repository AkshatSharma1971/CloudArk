import React from 'react';
import { Gamepad2, Shield, Heart, HelpCircle, FileText, RefreshCw, Server, Zap } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setActiveLegalModal, setIsDisclaimerModalOpen } = useGame();

  return (
    <footer className="bg-[#07070A] border-t border-white/[0.08] text-gray-400 text-sm">
      {/* Interactive Prototype Banner */}
      <div className="bg-white/[0.02] border-b border-white/[0.08] py-4 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D5F5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D5F5]"></span>
            </span>
            <span className="font-semibold text-white">Prototype Note:</span>
            <span>CloudArk is a product prototype. Game availability, streaming quality, and pricing may vary in a live service.</span>
          </div>
          <button
            onClick={() => setIsDisclaimerModalOpen(true)}
            className="text-[#00D5F5] hover:text-cyan-300 underline underline-offset-4 whitespace-nowrap font-medium cursor-pointer"
          >
            Product Architecture & Assumptions
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Brand & Tagline (PRD Section 2) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D5F5] p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#07070A] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-[#00D5F5]" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight font-display">
                CloudArk <span className="text-[#00D5F5] text-sm font-sans font-semibold">India</span>
              </span>
            </div>
            {/* PRD Section 2 Tagline */}
            <p className="text-sm text-gray-300 max-w-sm font-medium">
              “Don’t buy the gaming PC. Just access one.”
            </p>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Play high-quality PC games instantly from your browser without buying expensive hardware, downloading 100 GB files, or installing local updates.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-gray-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>Simulated edge nodes in Mumbai, Bengaluru, Delhi-NCR & Hyderabad</span>
            </div>
          </div>

          {/* Col 3: Platform Navigation (PRD Section 4) */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-[#A855F7]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('library')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Games Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('how-it-works-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Pricing Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('test')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Connection Test
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Player Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Fictional Games */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-[#A855F7]">
              Fictional Catalog
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Neon Siege (Tactical Action)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Velocity Drift (Racing)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Kingdoms of Ash (Adventure)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Shadow Protocol (Stealth Action)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Goal Legends (Sports)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-300 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>
                  Galactic Frontline (Multiplayer)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider text-[#A855F7]">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('privacy')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy (India)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('refund')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Fair Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('support')}
                  className="hover:text-[#00D5F5] transition-colors text-left cursor-pointer"
                >
                  Help & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-amber-400 hover:text-amber-300 transition-colors text-left font-mono cursor-pointer"
                >
                  Admin Console (Demo)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory PRD Disclaimer (Section 14) */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center md:text-left leading-relaxed">
            CloudArk is a product prototype. Game availability, streaming quality, and pricing may vary in a live service.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-gray-500 shrink-0">
            <span>© {new Date().getFullYear()} CloudArk Technologies</span>
            <span>·</span>
            <span>Made for Indian Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
