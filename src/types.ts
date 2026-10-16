export type GameGenre = 'Action' | 'Racing' | 'Adventure' | 'Stealth Action' | 'Sports' | 'Multiplayer';

export type GameStatus = 'Available Now' | 'Limited Capacity' | 'Coming Soon' | 'Under Maintenance';

export interface Game {
  id: string;
  title: string;
  genre: GameGenre;
  ageRating: string;
  pricePerHour: number; // in INR
  status: GameStatus;
  description: string;
  longDescription: string;
  coverImage: string;
  bannerImage: string;
  themeColor: string;
  tags: string[];
  streamingQuality: string;
  cloudSpecs: {
    resolution: string;
    targetFps: string;
    recommendedSpeed: string;
    serverLocation: string;
  };
  controls: {
    key: string;
    action: string;
  }[];
  featured?: boolean;
  gameType: 'action-shooter' | 'cyber-racer' | 'dungeon-adventure' | 'sports-soccer' | 'stealth-infiltrator';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number; // in INR (0 = Free)
  access: string;
  playtimeMinutes: number;
  playtimeDisplay: string;
  validity: string;
  quality: string;
  description: string;
  badgeHighlight?: 'Best Value' | 'Popular' | 'Premium';
  features: string[];
  savings?: string;
}

export interface PaymentRecord {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  playtimeMinutes: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Wallet';
  upiApp?: string;
  status: 'SUCCESS' | 'FAILED' | 'REFUNDED';
  timestamp: string;
  transactionRef: string;
}

export interface SessionRecord {
  id: string;
  gameId: string;
  gameTitle: string;
  durationMinutes: number;
  durationSeconds: number;
  startTime: string;
  endTime: string;
  serverNode: string;
  avgLatencyMs: number;
  avgFps: number;
  dataUsedMb: number;
}

export interface NetworkTestResult {
  status: 'idle' | 'testing' | 'completed';
  progress: number;
  currentStep: string;
  browserCompatible: boolean;
  downloadSpeedMbps: number;
  latencyMs: number;
  jitterMs: number;
  packetLossPercent: number;
  controllerDetected: boolean;
  verdict: 'Great for Gaming' | 'Playable' | 'Not Recommended';
  serverNode: string;
  testedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  playtimeSeconds: number; // remaining playable seconds
  tier: string;
  joinedDate: string;
  preferredServer: string;
  recentGame: string;
  wishlist: string[];
}

export interface AdminStats {
  totalRegisteredUsers: number;
  activeSessions: number;
  currentQueueLength: number;
  gpuUtilizationPercent: number;
  revenueTodayInr: number;
}

export interface ServerNode {
  id: string;
  city: string;
  state: string;
  latencyMs: number;
  loadPercent: number;
  status: 'ONLINE' | 'HIGH_LOAD' | 'MAINTENANCE';
}
