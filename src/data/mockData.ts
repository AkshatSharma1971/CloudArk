import { Game, PricingPlan, ServerNode, UserProfile, SessionRecord, PaymentRecord } from '../types';

import heroStreamImg from '../assets/images/cloudark_hero_stream_1792093751616.jpg';
import gameNeonSiegeImg from '../assets/images/game_neon_siege_1792093752529.jpg';
import gameVelocityDriftImg from '../assets/images/game_velocity_drift_1792093752414.jpg';
import gameKingdomsOfAshImg from '../assets/images/game_kingdoms_of_ash_1792093753415.jpg';
import gameShadowProtocolImg from '../assets/images/game_shadow_protocol_1792093768474.jpg';
import gameGoalLegendsImg from '../assets/images/game_goal_legends_1792093767783.jpg';
import gameGalacticFrontlineImg from '../assets/images/game_galactic_frontline_1792093752821.jpg';

export const HERO_STREAM_IMAGE = heroStreamImg;

export const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80';

export const GAME_FALLBACK_IMAGES: Record<string, string> = {
  'neon-siege': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  'velocity-drift': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  'kingdoms-of-ash': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  'shadow-protocol': 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
  'goal-legends': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  'galactic-frontline': 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
};

export const GAME_IMAGES: Record<string, string> = {
  'neon-siege': gameNeonSiegeImg,
  'velocity-drift': gameVelocityDriftImg,
  'kingdoms-of-ash': gameKingdomsOfAshImg,
  'shadow-protocol': gameShadowProtocolImg,
  'goal-legends': gameGoalLegendsImg,
  'galactic-frontline': gameGalacticFrontlineImg,
};

export const INITIAL_GAMES: Game[] = [
  {
    id: 'neon-siege',
    title: 'Neon Siege',
    genre: 'Action',
    ageRating: '16+',
    pricePerHour: 29,
    status: 'Available Now',
    description: 'Tactical cyberpunk action where rogue cyber-commandos battle mega-corp battle droids in Neo-Mumbai.',
    longDescription: 'Set in Neo-Mumbai 2099, take command of an elite synth-operative squad. Hack enemy turrets, deploy overload shields, and blast through waves of hostile assault mechs in real-time ray-traced urban battlegrounds with zero downloads.',
    coverImage: gameNeonSiegeImg,
    bannerImage: gameNeonSiegeImg,
    themeColor: 'purple',
    tags: ['Tactical Action', 'Cyberpunk', 'Ray Tracing', 'Explosive Action', 'Co-op'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS Ultra',
      recommendedSpeed: '15 Mbps Fiber / 5G',
      serverLocation: 'Mumbai Central Edge',
    },
    controls: [
      { key: 'W / A / S / D', action: 'Move Operative' },
      { key: 'Mouse Left', action: 'Plasma Cannon Fire' },
      { key: 'Mouse Right', action: 'Cyber Shield' },
      { key: 'Spacebar', action: 'Pulse Dash' },
      { key: 'Q / E', action: 'Deploy Drones & Overload' },
    ],
    featured: true,
    gameType: 'action-shooter',
  },
  {
    id: 'velocity-drift',
    title: 'Velocity Drift',
    genre: 'Racing',
    ageRating: 'All Ages',
    pricePerHour: 29,
    status: 'Available Now',
    description: 'Precision neon-lit street racing across Indian coastal highways and hyper-speed expressways.',
    longDescription: 'Tear through the Mumbai-Pune Expressway and Western Ghats night circuits in exotic hypercars tuned to perfection. Feel every tire slip with zero input delay powered by CloudArk edge servers.',
    coverImage: gameVelocityDriftImg,
    bannerImage: gameVelocityDriftImg,
    themeColor: 'cyan',
    tags: ['Street Racing', 'Hypercars', 'Arcade Physics', 'Night Circuits'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS Dynamic',
      recommendedSpeed: '12 Mbps Stable',
      serverLocation: 'Bengaluru South Node',
    },
    controls: [
      { key: 'W / Up Arrow', action: 'Accelerate' },
      { key: 'S / Down Arrow', action: 'Brake / Reverse' },
      { key: 'A / D', action: 'Steer Vehicle' },
      { key: 'Spacebar', action: 'Handbrake Drift' },
      { key: 'Shift', action: 'Nitro Boost' },
    ],
    featured: true,
    gameType: 'cyber-racer',
  },
  {
    id: 'kingdoms-of-ash',
    title: 'Kingdoms of Ash',
    genre: 'Adventure',
    ageRating: '16+',
    pricePerHour: 29,
    status: 'Limited Capacity',
    description: 'An epic dark fantasy open-world adventure RPG featuring ancient fortresses, dragons, and sorcery.',
    longDescription: 'Explore a breathtaking ruined empire of crumbling citadels and cursed catacombs. Master arcane spells and dual-wield celestial blades against colossal world bosses without ever downloading a single gigabyte.',
    coverImage: gameKingdomsOfAshImg,
    bannerImage: gameKingdomsOfAshImg,
    themeColor: 'purple',
    tags: ['Fantasy Adventure', 'Open World', 'Souls-like', 'Boss Battles'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS High',
      recommendedSpeed: '15 Mbps Fiber',
      serverLocation: 'Delhi-NCR Cloud Hub',
    },
    controls: [
      { key: 'W / A / S / D', action: 'Movement' },
      { key: 'Mouse Left', action: 'Light Attack' },
      { key: 'Mouse Right', action: 'Parry / Guard' },
      { key: 'Spacebar', action: 'Roll / Evade' },
      { key: 'F', action: 'Cast Fire Sorcery' },
    ],
    featured: true,
    gameType: 'dungeon-adventure',
  },
  {
    id: 'shadow-protocol',
    title: 'Shadow Protocol',
    genre: 'Stealth Action',
    ageRating: '18+',
    pricePerHour: 29,
    status: 'Available Now',
    description: 'Tactical stealth espionage in biometric-guarded skyscraper fortresses and black sites.',
    longDescription: 'Infiltrate corporate mega-structures in absolute darkness. Use silenced electromagnetic pulse pistols, thermal vision implants, and grapple-ziplines to bypass military lasers and AI cameras.',
    coverImage: gameShadowProtocolImg,
    bannerImage: gameShadowProtocolImg,
    themeColor: 'cyan',
    tags: ['Stealth Action', 'Espionage', 'Silenced Combat', 'Hacking'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS Ultra',
      recommendedSpeed: '15 Mbps Fiber',
      serverLocation: 'Hyderabad Edge Node',
    },
    controls: [
      { key: 'W / A / S / D', action: 'Sneak / Crouch Walk' },
      { key: 'C', action: 'Toggle Stealth Crouch' },
      { key: 'Mouse Left', action: 'Takedown / Silenced Shot' },
      { key: 'V', action: 'Thermal Vision Scan' },
      { key: 'F', action: 'Hack Terminals' },
    ],
    featured: true,
    gameType: 'stealth-infiltrator',
  },
  {
    id: 'goal-legends',
    title: 'Goal Legends',
    genre: 'Sports',
    ageRating: 'All Ages',
    pricePerHour: 29,
    status: 'Available Now',
    description: 'Next-gen football stadium simulator with ultra-fluid ball physics and multiplayer leagues.',
    longDescription: 'Compete in electric stadium matches with realistic turf deformation, dynamic weather, and lightning-fast passing combos. Instant cloud matchmaking puts you right onto the pitch in 3 seconds.',
    coverImage: gameGoalLegendsImg,
    bannerImage: gameGoalLegendsImg,
    themeColor: 'emerald',
    tags: ['Sports', 'Football', 'Tournaments', 'Controller Support'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS Fluid',
      recommendedSpeed: '10 Mbps Fiber',
      serverLocation: 'Mumbai Central Edge',
    },
    controls: [
      { key: 'W / A / S / D', action: 'Run & Dribble' },
      { key: 'J / Mouse Left', action: 'Shoot at Goal' },
      { key: 'K', action: 'Short Pass' },
      { key: 'L', action: 'Through Ball' },
      { key: 'Shift', action: 'Sprint' },
    ],
    featured: true,
    gameType: 'sports-soccer',
  },
  {
    id: 'galactic-frontline',
    title: 'Galactic Frontline',
    genre: 'Multiplayer',
    ageRating: '16+',
    pricePerHour: 29,
    status: 'Limited Capacity',
    description: 'Massive orbital planetary warfare with zero-G jump jets and squad tactical multiplayer shooter combat.',
    longDescription: 'Drop from low-orbit cruisers directly onto alien outpost planets. Deploy automated barrier walls, pulse turrets, and energy cannons alongside fellow squadmates.',
    coverImage: gameGalacticFrontlineImg,
    bannerImage: gameGalacticFrontlineImg,
    themeColor: 'purple',
    tags: ['Multiplayer Shooter', 'Sci-Fi', 'Team Deathmatch', 'Jetpacks'],
    streamingQuality: 'Up to 1080p / 60 FPS',
    cloudSpecs: {
      resolution: '1080p / 60 FPS',
      targetFps: '60 FPS High',
      recommendedSpeed: '15 Mbps 5G / Fiber',
      serverLocation: 'Bengaluru South Node',
    },
    controls: [
      { key: 'W / A / S / D', action: 'Maneuver' },
      { key: 'Spacebar', action: 'Jetpack Thrust' },
      { key: 'Mouse Left', action: 'Photon Blaster' },
      { key: 'Mouse Right', action: 'Aim Down Sights' },
      { key: 'R', action: 'Recharge Energy Cell' },
    ],
    featured: true,
    gameType: 'action-shooter',
  },
];

// Exact Pricing Table from PRD Section 9
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter-trial',
    name: 'Starter Trial',
    price: 0,
    access: '30 minutes',
    playtimeMinutes: 30,
    playtimeDisplay: '30 Minutes',
    validity: '1 day',
    quality: '720p / 30 FPS',
    description: 'Instant zero-cost trial to test latency and stream clarity directly on your laptop.',
    features: [
      '30 minutes instant cloud access',
      '720p / 30 FPS standard stream',
      'Access to all fictional games',
      'Zero credit card or payment needed',
    ],
  },
  {
    id: 'quick-match',
    name: 'Quick Match',
    price: 29,
    access: '2 hours',
    playtimeMinutes: 120,
    playtimeDisplay: '2 Hours',
    validity: '3 days',
    quality: 'Up to 1080p / 60 FPS',
    description: 'Perfect for a gaming break after college lectures or an evening session.',
    features: [
      '2 hours high-speed playtime',
      'Up to 1080p / 60 FPS low-latency stream',
      'Cloud save progression retained',
      'Instant UPI 1-click checkout',
    ],
  },
  {
    id: 'weekend-rush',
    name: 'Weekend Rush',
    price: 99,
    access: '8 hours',
    playtimeMinutes: 480,
    playtimeDisplay: '8 Hours',
    validity: '7 days',
    quality: 'Up to 1080p / 60 FPS',
    badgeHighlight: 'Popular',
    description: 'Ideal for weekend multiplayer squads, campaign sprints, or casual tournaments.',
    savings: 'Popular Choice',
    features: [
      '8 hours (480 mins) dedicated playtime',
      'Up to 1080p / 60 FPS smooth video',
      'Priority routing on nearest Indian edge cluster',
      'Unlimited cloud save snapshots',
      'Valid for full 7 days',
    ],
  },
  {
    id: 'power-pack',
    name: 'Power Pack',
    price: 249,
    access: '25 hours',
    playtimeMinutes: 1500,
    playtimeDisplay: '25 Hours',
    validity: '30 days',
    quality: 'Up to 1080p / 60 FPS',
    badgeHighlight: 'Best Value',
    description: 'Our most economical value pack for regular gamers and college students.',
    savings: 'Best Value • ₹10/hr',
    features: [
      '25 hours (1,500 mins) playtime',
      'Queue-skip priority on busy server nodes',
      'Up to 1080p / 60 FPS ultra clarity',
      'Play across Laptop, Desktop & Mobile Chrome',
      'Valid for 30 full days',
    ],
  },
  {
    id: 'ark-unlimited-pro',
    name: 'Ark Unlimited Pro',
    price: 699,
    access: 'Up to 100 priority hours',
    playtimeMinutes: 6000,
    playtimeDisplay: '100 Hours',
    validity: '30 days',
    quality: '1080p–1440p / 60 FPS',
    badgeHighlight: 'Premium',
    description: 'Ultimate monthly tier with maximum priority and pristine 1440p high-bitrate streaming.',
    savings: 'Flagship Tier',
    features: [
      'Up to 100 priority hours / month',
      'Pristine 1080p–1440p / 60 FPS stream',
      'Guaranteed zero queue wait time',
      'Dedicated Indian high-spec GPU slice',
      'Full controller & vibration feedback support',
    ],
  },
];

// Seeded Demo Account as specified in PRD Section 11
export const INITIAL_USER: UserProfile = {
  id: 'usr_cloudark_001',
  name: 'Arnav Sharma',
  email: 'arnav.sharma@cloudark.in',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  playtimeSeconds: 2 * 60 * 60, // Exactly 2 hours initial balance as required
  tier: 'Power Pack',
  joinedDate: 'October 2026',
  preferredServer: 'Mumbai Central Node (12ms)',
  recentGame: 'Neon Siege',
  wishlist: ['kingdoms-of-ash', 'shadow-protocol'],
};

export const INITIAL_SESSIONS: SessionRecord[] = [
  {
    id: 'ses_8102',
    gameId: 'neon-siege',
    gameTitle: 'Neon Siege',
    durationMinutes: 32,
    durationSeconds: 1920,
    startTime: 'Today, 4:15 PM',
    endTime: 'Today, 4:47 PM',
    serverNode: 'Mumbai Central Node (BOM-01)',
    avgLatencyMs: 14,
    avgFps: 60,
    dataUsedMb: 1840,
  },
  {
    id: 'ses_8091',
    gameId: 'velocity-drift',
    gameTitle: 'Velocity Drift',
    durationMinutes: 20,
    durationSeconds: 1200,
    startTime: 'Yesterday, 8:10 PM',
    endTime: 'Yesterday, 8:30 PM',
    serverNode: 'Bengaluru South Node (BLR-02)',
    avgLatencyMs: 18,
    avgFps: 60,
    dataUsedMb: 1150,
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_ark_9912',
    planId: 'power-pack',
    planName: 'Power Pack (25 Hours)',
    amount: 249,
    playtimeMinutes: 1500,
    paymentMethod: 'UPI',
    upiApp: 'Google Pay',
    status: 'SUCCESS',
    timestamp: 'Yesterday, 7:55 PM',
    transactionRef: 'UPI/7719284910/GPAY',
  },
];

export const SERVER_NODES: ServerNode[] = [
  { id: 'node-bom', city: 'Mumbai', state: 'Maharashtra', latencyMs: 12, loadPercent: 64, status: 'ONLINE' },
  { id: 'node-blr', city: 'Bengaluru', state: 'Karnataka', latencyMs: 18, loadPercent: 71, status: 'ONLINE' },
  { id: 'node-del', city: 'Delhi-NCR', state: 'New Delhi', latencyMs: 24, loadPercent: 79, status: 'ONLINE' },
  { id: 'node-hyd', city: 'Hyderabad', state: 'Telangana', latencyMs: 16, loadPercent: 52, status: 'ONLINE' },
];

export const FAQS = [
  {
    q: 'Do I really need no gaming PC or graphics card?',
    a: 'Yes! All graphics, ray-tracing, and world physics compute on cloud GPU servers in our Indian edge data centers. Your browser simply streams the high-speed video feed and transmits your controller or keyboard inputs.',
  },
  {
    q: 'What internet speed do I need to play smoothly on CloudArk?',
    a: 'A minimum of 10 to 15 Mbps on broadband fiber (JioFiber, Airtel Xstream, ACT, etc.) or 5G with <35ms ping is recommended for 1080p 60 FPS gameplay. Run our built-in Connection Test to check your readiness.',
  },
  {
    q: 'When does my purchased playtime start counting down?',
    a: 'Your playtime starts strictly AFTER your gaming session begins and the interactive video stream connects. Browsing the game library, queueing, and testing your connection consumes zero credits.',
  },
  {
    q: 'Which payment methods are supported in India?',
    a: 'We support all popular Indian payment options including Instant UPI (Google Pay, PhonePe, Paytm, BHIM, CRED), RuPay/Visa/Mastercard debit and credit cards, Net Banking, and digital wallets.',
  },
  {
    q: 'Can I connect a physical controller or gamepad?',
    a: 'Yes! CloudArk supports Xbox, PlayStation DualShock/DualSense, and standard USB/Bluetooth gamepads via the native browser Gamepad API, as well as full keyboard and mouse input.',
  },
];
