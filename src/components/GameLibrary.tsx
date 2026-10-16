import React, { useState, useMemo } from 'react';
import {
  Search,
  Play,
  Info,
  Sparkles,
  Zap,
  Flame,
  Heart,
} from 'lucide-react';
import { Game, GameGenre, GameStatus } from '../types';
import { useGame } from '../context/GameContext';
import { GAME_FALLBACK_IMAGES } from '../data/mockData';

export const GameLibrary: React.FC = () => {
  const {
    games,
    setSelectedGameForDetails,
    startSession,
    user,
    setIsPricingModalOpen,
    toggleWishlist,
    isInWishlist,
  } = useGame();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Popular' | 'Newest' | 'Price' | 'Availability'>('Popular');

  // PRD Section 6 exact genre filters: Action, Racing, Sports, Adventure, Multiplayer
  const genres = ['All', 'Action', 'Racing', 'Sports', 'Adventure', 'Multiplayer'];

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchesSearch =
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre || (selectedGenre === 'Multiplayer' && game.genre === 'Multiplayer');
        const matchesStatus = selectedAvailability === 'All' || game.status === selectedAvailability;

        return matchesSearch && matchesGenre && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'Popular') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'Newest') {
          return b.id.localeCompare(a.id);
        }
        if (sortBy === 'Price') {
          return a.pricePerHour - b.pricePerHour;
        }
        if (sortBy === 'Availability') {
          const rank: Record<GameStatus, number> = {
            'Available Now': 1,
            'Limited Capacity': 2,
            'Coming Soon': 3,
            'Under Maintenance': 4,
          };
          return (rank[a.status] || 99) - (rank[b.status] || 99);
        }
        return 0;
      });
  }, [games, searchQuery, selectedGenre, selectedAvailability, sortBy]);

  const handleQuickPlay = (game: Game, e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.playtimeSeconds < 60) {
      setIsPricingModalOpen(true);
    } else {
      startSession(game);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D5F5]" />
            <span className="text-gray-300">CloudArk Game Library</span>
            <span className="text-[#00D5F5] font-semibold">· Zero Local Storage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Browse All Games
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            Choose any game to stream in up to 1080p / 60 FPS directly in your browser.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            id="input-game-search"
            placeholder="Search game title, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00D5F5] transition-colors backdrop-blur-md"
          />
        </div>
      </div>

      {/* Genre Filters & Sort Controls (PRD Section 6) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
        {/* Genre buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-[#A855F7] to-indigo-600 text-white shadow-md border border-purple-400/30'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Availability Filter & Sort Dropdowns */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Availability:</span>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="bg-[#111118] border border-white/[0.1] rounded-xl px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-[#00D5F5] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Available Now">Available Now</option>
              <option value="Limited Capacity">Limited Capacity</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111118] border border-white/[0.1] rounded-xl px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-[#00D5F5] cursor-pointer"
            >
              <option value="Popular">Popular</option>
              <option value="Newest">Newest</option>
              <option value="Price">Price</option>
              <option value="Availability">Availability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Game Cards Grid */}
      {filteredGames.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <p className="text-gray-400 text-base">No games found matching your current filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('All');
              setSelectedAvailability('All');
              setSortBy('Popular');
            }}
            className="px-4 py-2 rounded-xl bg-[#A855F7] text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              id={`game-card-${game.id}`}
              onClick={() => setSelectedGameForDetails(game)}
              className="group relative glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const fallback = GAME_FALLBACK_IMAGES[game.id] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
                    if ((e.currentTarget as HTMLImageElement).src !== fallback) {
                      (e.currentTarget as HTMLImageElement).src = fallback;
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />

                {/* Availability Badge (PRD Section 6 exact badges) */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-md ${
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
                  {game.featured && (
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#00D5F5] text-black shadow-md flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-black" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Wishlist toggle icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(game.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-colors cursor-pointer border border-white/10"
                  title={isInWishlist(game.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(game.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-300'
                    }`}
                  />
                </button>

                {/* Cloud Stream indicator */}
                <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[10px] text-[#00D5F5] font-medium bg-black/80 px-2 py-0.5 rounded backdrop-blur-md border border-white/10 font-mono">
                  <Zap className="w-3 h-3 text-[#00D5F5]" />
                  <span>Up to 1080p / 60 FPS</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A855F7] mb-1">
                    <span>{game.genre}</span>
                    <span className="text-gray-400 text-[11px] font-mono">{game.ageRating}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors leading-snug">
                    {game.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGameForDetails(game);
                    }}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
                    title="View System & Cloud Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleQuickPlay(game, e)}
                    disabled={game.status === 'Under Maintenance' || game.status === 'Coming Soon'}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl cloudark-gradient-btn text-white text-xs font-bold shadow-md transition-all hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>
                      {game.status === 'Limited Capacity'
                        ? 'Queue & Play'
                        : game.status === 'Coming Soon'
                        ? 'Coming Soon'
                        : 'Play Now'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
