import React from 'react';
import {
  X,
  Play,
  Zap,
  HardDrive,
  Wifi,
  Monitor,
  Clock,
  Sparkles,
  Layers,
  Heart,
} from 'lucide-react';
import { Game } from '../types';
import { useGame } from '../context/GameContext';
import { GAME_FALLBACK_IMAGES } from '../data/mockData';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const { user, startSession, setIsPricingModalOpen, toggleWishlist, isInWishlist } = useGame();

  if (!game) return null;

  const hasEnoughCredit = user.playtimeSeconds >= 60;
  const isWishlisted = isInWishlist(game.id);

  const handlePlayNow = () => {
    onClose();
    if (hasEnoughCredit) {
      startSession(game);
    } else {
      setIsPricingModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl glass-panel border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-gray-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Game Visual (PRD Section 7) */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-black">
          <img
            src={game.bannerImage}
            alt={game.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const fallback = GAME_FALLBACK_IMAGES[game.id] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
              if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                (e.currentTarget as HTMLImageElement).src = fallback;
              }
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111118] via-transparent to-transparent" />

          {/* Availability, Genre & Rating */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold shadow-md ${
                game.status === 'Available Now'
                  ? 'bg-[#22C55E] text-black'
                  : game.status === 'Limited Capacity'
                  ? 'bg-amber-400 text-black'
                  : game.status === 'Under Maintenance'
                  ? 'bg-rose-500 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {game.status}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/70 text-gray-200 border border-white/10 backdrop-blur-md">
              Age Rating: {game.ageRating}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#A855F7]/30 text-purple-200 border border-[#A855F7]/40 backdrop-blur-md">
              {game.genre}
            </span>
          </div>

          {/* Title and CloudArk Banner Callout (PRD Section 7) */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                {game.title}
              </h2>
              {/* Exact required copy: "Runs in CloudArk — no download required" */}
              <div className="flex items-center gap-2 mt-1 text-xs text-[#00D5F5] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Runs in CloudArk — no download required</span>
              </div>
            </div>

            <div className="glass-panel-subtle rounded-xl px-4 py-2 text-right">
              <div className="text-[11px] text-gray-400">Streaming Quality</div>
              <div className="text-sm font-extrabold text-white font-mono">
                Up to 1080p / 60 FPS
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-300">
          {/* Main Description */}
          <div>
            <h3 className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-gray-200 font-normal">
              {game.longDescription || game.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs bg-white/[0.04] border border-white/[0.08] text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Streaming Specs & Suggested Network Requirement */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 glass-panel-subtle rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#00D5F5]/10 text-[#00D5F5] border border-[#00D5F5]/20">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Streaming Quality</div>
                <div className="text-sm font-bold text-white font-mono">Up to 1080p / 60 FPS</div>
                <div className="text-[11px] text-[#22C55E]">Zero Storage Consumed</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/20">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Suggested Network</div>
                <div className="text-sm font-bold text-white font-mono">{game.cloudSpecs.recommendedSpeed}</div>
                <div className="text-[11px] text-gray-400">&lt;35ms Ping recommended</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Current Availability</div>
                <div className="text-sm font-bold text-white">{game.status}</div>
                <div className="text-[11px] text-gray-400">{game.cloudSpecs.serverLocation}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div>
            <h3 className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Input & Keybindings</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {game.controls.map((ctrl) => (
                <div
                  key={ctrl.key}
                  className="flex items-center justify-between bg-white/[0.04] px-3 py-2 rounded-lg border border-white/[0.08]"
                >
                  <span className="font-mono font-bold text-[#00D5F5] bg-black/60 px-1.5 py-0.5 rounded border border-[#00D5F5]/30">
                    {ctrl.key}
                  </span>
                  <span className="text-gray-300">{ctrl.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer (PRD Section 7: Play Now button, Add to Wishlist button, Credit check) */}
        <div className="p-4 sm:p-6 bg-black/50 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#A855F7]" />
            <span>
              Your CloudArk Balance:{' '}
              <strong className="text-white font-mono">
                {Math.floor(user.playtimeSeconds / 60)} minutes
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Add to Wishlist Button (PRD Section 7) */}
            <button
              onClick={() => toggleWishlist(game.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-300'}`} />
              <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {/* Play Now Button (PRD Section 7: If not enough credits, redirect to pricing) */}
            {hasEnoughCredit ? (
              <button
                id="btn-modal-play-now"
                onClick={handlePlayNow}
                disabled={game.status === 'Under Maintenance' || game.status === 'Coming Soon'}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{game.status === 'Limited Capacity' ? 'Enter Queue & Play' : 'Play Now'}</span>
              </button>
            ) : (
              <button
                id="btn-modal-get-time"
                onClick={handlePlayNow}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Top Up Playtime to Play</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
