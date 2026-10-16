import React, { useState } from 'react';
import {
  Gamepad2,
  HardDrive,
  Clock,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Play,
  Gauge,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Layers,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { FAQS, HERO_STREAM_IMAGE, HERO_FALLBACK_IMAGE, GAME_FALLBACK_IMAGES } from '../data/mockData';
import { Game } from '../types';

export const LandingPage: React.FC = () => {
  const {
    games,
    setActiveTab,
    setSelectedGameForDetails,
    startSession,
  } = useGame();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Six fictional games as required by PRD Section 5
  const featuredGames = games.slice(0, 6);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-24 pb-20 animate-in fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-[#A855F7]/20 via-[#00D5F5]/15 to-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00D5F5]" />
                <span className="text-gray-300">Don’t buy the gaming PC.</span>
                <span className="text-[#00D5F5] font-semibold">Just access one.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                AAA Gaming. <br />
                <span className="bg-gradient-to-r from-white via-purple-200 to-[#00D5F5] bg-clip-text text-transparent">
                  No Gaming PC Required.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Play premium games instantly from your browser. No downloads, no installs, no storage required.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="btn-hero-explore-games"
                  onClick={() => setActiveTab('library')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl cloudark-gradient-btn text-white font-extrabold text-sm shadow-xl transition-all cursor-pointer border border-purple-400/20"
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>Explore Games</span>
                </button>

                <button
                  id="btn-hero-check-connection"
                  onClick={() => setActiveTab('test')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-gray-200 hover:text-white font-bold text-sm backdrop-blur-md transition-all cursor-pointer"
                >
                  <Gauge className="w-4 h-4 text-[#00D5F5]" />
                  <span>Check My Connection</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>0 GB Local Storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D5F5]" />
                  <span>Up to 1080p / 60 FPS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A855F7]" />
                  <span>Instant UPI & Card in INR</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Laptop connected to glowing cloud/GPU gaming stream */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-[#111118] border border-white/[0.1] p-2.5 shadow-2xl backdrop-blur-xl overflow-hidden group">
                {/* Live stream preview badge */}
                <div className="flex items-center justify-between px-3 py-2 bg-black/60 rounded-xl mb-2 text-xs border border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="font-bold text-white">Cloud GPU Stream Active</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-[#00D5F5]">14ms Latency</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-[#22C55E]">60 FPS</span>
                  </div>
                </div>

                {/* Cinematic Laptop Stream Asset */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-white/[0.06]">
                  <img
                    src={HERO_STREAM_IMAGE}
                    alt="Laptop connected to CloudArk gaming stream"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = HERO_FALLBACK_IMAGE;
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#00D5F5] font-semibold uppercase tracking-wider">
                          Browser-First GPU Cloud
                        </div>
                        <div className="text-sm font-bold text-white">Neon Siege • Ray Tracing</div>
                      </div>
                      <button
                        onClick={() => {
                          const neon = games.find((g) => g.id === 'neon-siege') || games[0];
                          startSession(neon);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D5F5] hover:bg-cyan-300 text-black text-xs font-extrabold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Launch Stream</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-gray-400 px-1">
                  <span>Decoder: WebRTC / Hardware AV1</span>
                  <span className="text-[#22C55E] font-medium">Mumbai BOM-01 Edge Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION (Four visually distinct benefit cards required by PRD Section 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase tracking-wider font-bold text-[#00D5F5]">
            Engineered For Indian Gamers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Why Gamers Choose CloudArk
          </h2>
          <p className="text-sm text-gray-400">
            High-tier gaming without expensive hardware or massive storage penalties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Affordable */}
          <div className="glass-card rounded-2xl p-6 shadow-xl space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] group-hover:scale-110 transition-all">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors">
              1. Affordable
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pay only for the time you play. No need to spend ₹70,000+ upfront on a gaming PC. Pick packs starting at just ₹29.
            </p>
          </div>

          {/* Card 2: Instant */}
          <div className="glass-card rounded-2xl p-6 shadow-xl space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#00D5F5]/15 border border-[#00D5F5]/30 flex items-center justify-center text-[#00D5F5] group-hover:scale-110 transition-all">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors">
              2. Instant
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              No downloads, installs, or updates. Never wait hours for massive 100 GB patches. Games launch in seconds.
            </p>
          </div>

          {/* Card 3: Storage-Free */}
          <div className="glass-card rounded-2xl p-6 shadow-xl space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-all">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors">
              3. Storage-Free
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Games run in the cloud, not on your device. Keep your local SSD free for your college assignments and projects.
            </p>
          </div>

          {/* Card 4: Browser-First */}
          <div className="glass-card rounded-2xl p-6 shadow-xl space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-all">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors">
              4. Browser-First
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Open CloudArk and start playing on supported devices — your regular college laptop, Mac, or desktop browser.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3-Step Horizontal Flow required by PRD Section 5) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 border border-white/[0.08]">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs uppercase tracking-wider font-bold text-[#00D5F5]">
              Seamless 3-Step Flow
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              How It Works
            </h2>
            <p className="text-xs text-gray-400">
              Go from zero to playing AAA games in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border-2 border-[#A855F7]/50 flex items-center justify-center text-xl font-extrabold text-white shadow-lg">
                1
              </div>
              <h3 className="text-base font-bold text-white">1. Open CloudArk</h3>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Launch your Chrome, Edge, or Safari browser on any laptop. No heavy client downloads or installations required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border-2 border-[#00D5F5]/50 flex items-center justify-center text-xl font-extrabold text-[#00D5F5] shadow-lg">
                2
              </div>
              <h3 className="text-base font-bold text-white">2. Choose a Game</h3>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Pick from action, racing, adventure, sports, and multiplayer titles in our catalog. Select your playtime pack.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border-2 border-[#22C55E]/50 flex items-center justify-center text-xl font-extrabold text-[#22C55E] shadow-lg">
                3
              </div>
              <h3 className="text-base font-bold text-white">3. Start Playing</h3>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Click Play Now and jump right into the action with your keyboard, mouse, or connected gamepad with fluid 60 FPS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED GAMES (Six fictional games required by PRD Section 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#A855F7] mb-1">
              Fictional Cloud Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Featured Games
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Runs in CloudArk — no download or GPU installation required.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('library')}
            className="text-xs text-[#00D5F5] hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View All Games</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGameForDetails(game)}
              className="group relative glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
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
                
                {/* Availability badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-md ${
                      game.status === 'Available Now'
                        ? 'bg-[#22C55E] text-black'
                        : game.status === 'Limited Capacity'
                        ? 'bg-amber-400 text-black'
                        : 'bg-purple-900 text-purple-200'
                    }`}
                  >
                    {game.status}
                  </span>
                </div>

                {/* Stream quality indicator */}
                <div className="absolute bottom-2 left-3 text-[10px] text-[#00D5F5] font-mono bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  {game.streamingQuality}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A855F7] mb-1">
                    <span>{game.genre}</span>
                    <span className="font-mono text-gray-300 text-[11px]">{game.ageRating}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00D5F5] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-gray-400">Zero Storage</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startSession(game);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#00D5F5] hover:bg-cyan-300 text-black font-extrabold flex items-center gap-1 shadow-md hover:scale-105 transition-transform cursor-pointer text-xs"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    <span>Play Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRUST SECTION (Required by PRD Section 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Built For Seamless Cloud Performance
              </h3>
              <p className="text-xs text-gray-400">
                High-bandwidth edge infrastructure optimized for Indian fiber and 5G connections.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] text-gray-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00D5F5]" />
              prototype/demo data
            </span>
          </div>

          {/* Simple Statistics required by PRD Section 5 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-4 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                0
              </div>
              <div className="text-xs text-gray-400">Downloads Required</div>
              <div className="text-[10px] text-[#22C55E]">100% In-Browser</div>
            </div>

            <div className="glass-card rounded-xl p-4 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#00D5F5] font-mono">
                1080p
              </div>
              <div className="text-xs text-gray-400">Up to 60 FPS Stream</div>
              <div className="text-[10px] text-gray-400">Low-latency AV1</div>
            </div>

            <div className="glass-card rounded-xl p-4 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#22C55E] font-mono">
                INR & UPI
              </div>
              <div className="text-xs text-gray-400">Friendly Payments</div>
              <div className="text-[10px] text-gray-400">Google Pay, PhonePe, Paytm</div>
            </div>

            <div className="glass-card rounded-xl p-4 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#A855F7] font-mono">
                Browser
              </div>
              <div className="text-xs text-gray-400">Based Access</div>
              <div className="text-[10px] text-gray-400">Chrome, Edge & Safari</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-400">
            Everything you need to know about accessing high-end gaming on CloudArk.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-panel-subtle rounded-xl overflow-hidden shadow-md transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#00D5F5] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#A855F7] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/[0.08] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
