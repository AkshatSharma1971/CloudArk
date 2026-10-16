import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Game,
  GameStatus,
  PricingPlan,
  UserProfile,
  SessionRecord,
  PaymentRecord,
  NetworkTestResult,
  AdminStats,
} from '../types';
import {
  INITIAL_GAMES,
  INITIAL_USER,
  INITIAL_SESSIONS,
  INITIAL_PAYMENTS,
} from '../data/mockData';

interface GameContextType {
  user: UserProfile;
  games: Game[];
  activeGame: Game | null;
  inGameSession: boolean;
  isConnectingQueue: boolean;
  isReconnecting: boolean;
  queuePosition: number;
  sessionRemainingSeconds: number;
  sessionElapsedSeconds: number;
  isPaused: boolean;
  streamQuality: '720p60' | '1080p60';
  isAudioMuted: boolean;
  telemetry: {
    fps: number;
    latencyMs: number;
    bitrateMbps: number;
    packetLoss: number;
  };
  showFiveMinWarning: boolean;
  dismissFiveMinWarning: () => void;
  sessionSummary: SessionRecord | null;
  closeSessionSummary: () => void;
  payments: PaymentRecord[];
  sessions: SessionRecord[];
  networkTest: NetworkTestResult;
  adminStats: AdminStats;
  selectedServer: string;
  setSelectedServer: (server: string) => void;
  // Navigation & Modals helpers
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedGameForDetails: Game | null;
  setSelectedGameForDetails: (game: Game | null) => void;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: (open: boolean) => void;
  isSpeedTestModalOpen: boolean;
  setIsSpeedTestModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isDisclaimerModalOpen: boolean;
  setIsDisclaimerModalOpen: (open: boolean) => void;
  activeLegalModal: 'support' | 'privacy' | 'terms' | 'refund' | null;
  setActiveLegalModal: (modal: 'support' | 'privacy' | 'terms' | 'refund' | null) => void;
  // Wishlist
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  // Actions
  startSession: (game: Game) => void;
  endSession: () => void;
  togglePause: () => void;
  setStreamQuality: (quality: '720p60' | '1080p60') => void;
  toggleAudioMute: () => void;
  simulateDisconnect: () => void;
  addPlaytime: (
    plan: PricingPlan,
    paymentMethod: PaymentRecord['paymentMethod'],
    upiApp?: string,
    simulateFailure?: boolean
  ) => Promise<boolean>;
  runNetworkTest: () => Promise<void>;
  updateGameStatus: (gameId: string, status: GameStatus) => void;
  adjustUserBalance: (minutes: number) => void;
  resetDemoData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'cloudark_user_v2',
  GAMES: 'cloudark_games_v2',
  SESSIONS: 'cloudark_sessions_v2',
  PAYMENTS: 'cloudark_payments_v2',
  SERVER: 'cloudark_server_v2',
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedGameForDetails, setSelectedGameForDetails] = useState<Game | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [isSpeedTestModalOpen, setIsSpeedTestModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'support' | 'privacy' | 'terms' | 'refund' | null>(null);

  // Core User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USER;
  });

  // Games State
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GAMES);
    if (saved) {
      try {
        const parsed: Game[] = JSON.parse(saved);
        // Ensure image URLs are up-to-date and not stale /src/ paths
        return parsed.map((pg) => {
          const fresh = INITIAL_GAMES.find((ig) => ig.id === pg.id);
          if (fresh) {
            return {
              ...pg,
              coverImage: fresh.coverImage,
              bannerImage: fresh.bannerImage,
            };
          }
          return pg;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_GAMES;
  });

  // Sessions and Payments History
  const [sessions, setSessions] = useState<SessionRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SESSIONS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PAYMENTS;
  });

  const [selectedServer, setSelectedServer] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SERVER) || 'Mumbai Central Node (12ms)';
  });

  // Active Session State
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [inGameSession, setInGameSession] = useState<boolean>(false);
  const [isConnectingQueue, setIsConnectingQueue] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [queuePosition, setQueuePosition] = useState<number>(0);
  const [sessionRemainingSeconds, setSessionRemainingSeconds] = useState<number>(0);
  const [sessionElapsedSeconds, setSessionElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [streamQuality, setStreamQuality] = useState<'720p60' | '1080p60'>('1080p60');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [showFiveMinWarning, setShowFiveMinWarning] = useState<boolean>(false);
  const [sessionSummary, setSessionSummary] = useState<SessionRecord | null>(null);

  // Dynamic Telemetry
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    latencyMs: 14,
    bitrateMbps: 18.5,
    packetLoss: 0.0,
  });

  // Admin Stats
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalRegisteredUsers: 18450,
    activeSessions: 418,
    currentQueueLength: 6,
    gpuUtilizationPercent: 82,
    revenueTodayInr: 58240,
  });

  // Network Test State - Initial realistic simulated values as per PRD
  const [networkTest, setNetworkTest] = useState<NetworkTestResult>({
    status: 'idle',
    progress: 0,
    currentStep: 'Ready to benchmark',
    browserCompatible: true,
    downloadSpeedMbps: 95.0,
    latencyMs: 28,
    jitterMs: 1.8,
    packetLossPercent: 0.2,
    controllerDetected: false,
    verdict: 'Great for Gaming',
    serverNode: 'Mumbai Central Node (BOM-01)',
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVER, selectedServer);
  }, [selectedServer]);

  // Wishlist Methods
  const toggleWishlist = (gameId: string) => {
    setUser((prev) => {
      const current = prev.wishlist || [];
      const updated = current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId];
      return { ...prev, wishlist: updated };
    });
  };

  const isInWishlist = (gameId: string) => {
    return (user.wishlist || []).includes(gameId);
  };

  // Session Tick Timer
  const warningShownRef = useRef<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (inGameSession && !isPaused && !isConnectingQueue && !isReconnecting && activeGame) {
      interval = setInterval(() => {
        setSessionRemainingSeconds((prevRem) => {
          if (prevRem <= 1) {
            clearInterval(interval!);
            endSession();
            return 0;
          }

          // 5 minute warning (300 seconds)
          if (prevRem <= 300 && !warningShownRef.current) {
            setShowFiveMinWarning(true);
            warningShownRef.current = true;
          }

          return prevRem - 1;
        });

        setSessionElapsedSeconds((prevElapsed) => prevElapsed + 1);

        // Decrement user persistent balance in background
        setUser((prevUser) => ({
          ...prevUser,
          playtimeSeconds: Math.max(0, prevUser.playtimeSeconds - 1),
        }));

        // Subtle realistic telemetry fluctuations
        setTelemetry((prev) => ({
          fps: 59 + Math.floor(Math.random() * 2),
          latencyMs: Math.max(12, Math.min(30, prev.latencyMs + (Math.random() > 0.5 ? 1 : -1))),
          bitrateMbps: Number((17 + Math.random() * 3).toFixed(1)),
          packetLoss: Math.random() > 0.96 ? 0.1 : 0.0,
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inGameSession, isPaused, isConnectingQueue, isReconnecting, activeGame]);

  // Start Cloud Gaming Session
  const startSession = useCallback(
    (game: Game) => {
      // Prevent session from starting if user has no playtime balance (PRD Section 13)
      if (user.playtimeSeconds < 60) {
        setIsPricingModalOpen(true);
        return;
      }

      setActiveGame(game);
      warningShownRef.current = false;
      setShowFiveMinWarning(false);
      setIsReconnecting(false);
      setSessionElapsedSeconds(0);
      setSessionRemainingSeconds(user.playtimeSeconds);
      setActiveTab('session');

      // Update recent game on user profile
      setUser((prev) => ({
        ...prev,
        recentGame: game.title,
      }));

      if (game.status === 'Limited Capacity') {
        setIsConnectingQueue(true);
        setQueuePosition(2);

        setTimeout(() => {
          setQueuePosition(1);
        }, 1800);

        setTimeout(() => {
          setIsConnectingQueue(false);
          setInGameSession(true);
        }, 3400);
      } else {
        setIsConnectingQueue(false);
        setInGameSession(true);
      }

      setAdminStats((prev) => ({
        ...prev,
        activeSessions: prev.activeSessions + 1,
      }));
    },
    [user.playtimeSeconds]
  );

  // End Cloud Gaming Session
  const endSession = useCallback(() => {
    if (!activeGame || !inGameSession) {
      setInGameSession(false);
      setIsConnectingQueue(false);
      setIsReconnecting(false);
      return;
    }

    const elapsed = sessionElapsedSeconds;
    const elapsedMinutes = Math.max(1, Math.round(elapsed / 60));
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: SessionRecord = {
      id: `ses_${Date.now().toString().slice(-4)}`,
      gameId: activeGame.id,
      gameTitle: activeGame.title,
      durationMinutes: elapsedMinutes,
      durationSeconds: elapsed,
      startTime: timeString,
      endTime: timeString,
      serverNode: selectedServer,
      avgLatencyMs: telemetry.latencyMs,
      avgFps: 60,
      dataUsedMb: Math.round(elapsed * 2.1),
    };

    setSessions((prev) => [newRecord, ...prev]);
    setSessionSummary(newRecord);
    setInGameSession(false);
    setIsConnectingQueue(false);
    setIsReconnecting(false);

    setAdminStats((prev) => ({
      ...prev,
      activeSessions: Math.max(0, prev.activeSessions - 1),
    }));
  }, [activeGame, inGameSession, sessionElapsedSeconds, selectedServer, telemetry.latencyMs]);

  const togglePause = () => setIsPaused((prev) => !prev);
  const toggleAudioMute = () => setIsAudioMuted((prev) => !prev);
  const dismissFiveMinWarning = () => setShowFiveMinWarning(false);
  const closeSessionSummary = () => setSessionSummary(null);

  // Simulate temporary connection dropout & automatic reconnect
  const simulateDisconnect = () => {
    if (!inGameSession) return;
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
    }, 2800);
  };

  // Add Playtime Purchase
  const addPlaytime = useCallback(
    async (
      plan: PricingPlan,
      paymentMethod: PaymentRecord['paymentMethod'],
      upiApp?: string,
      simulateFailure?: boolean
    ): Promise<boolean> => {
      await new Promise((res) => setTimeout(res, 1200));

      if (simulateFailure) {
        const failedRecord: PaymentRecord = {
          id: `pay_err_${Date.now().toString().slice(-4)}`,
          planId: plan.id,
          planName: `${plan.name} (${plan.playtimeDisplay})`,
          amount: plan.price,
          playtimeMinutes: plan.playtimeMinutes,
          paymentMethod,
          upiApp,
          status: 'FAILED',
          timestamp: 'Just now',
          transactionRef: `FAILED/TIMEOUT`,
        };
        setPayments((prev) => [failedRecord, ...prev]);
        return false;
      }

      const addedSeconds = plan.playtimeMinutes * 60;
      const ref = `UPI/${Date.now().toString().slice(-8)}/${(upiApp || 'IND').toUpperCase()}`;

      const newPayment: PaymentRecord = {
        id: `pay_${Date.now().toString().slice(-4)}`,
        planId: plan.id,
        planName: `${plan.name} (${plan.playtimeDisplay})`,
        amount: plan.price,
        playtimeMinutes: plan.playtimeMinutes,
        paymentMethod,
        upiApp,
        status: 'SUCCESS',
        timestamp: 'Just now',
        transactionRef: ref,
      };

      setPayments((prev) => [newPayment, ...prev]);

      setUser((prevUser) => {
        const nextSeconds = prevUser.playtimeSeconds + addedSeconds;
        return {
          ...prevUser,
          playtimeSeconds: nextSeconds,
          tier: plan.name,
        };
      });

      setSessionRemainingSeconds((prev) => prev + addedSeconds);

      setAdminStats((prev) => ({
        ...prev,
        revenueTodayInr: prev.revenueTodayInr + plan.price,
      }));

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00D5F5', '#A855F7', '#22C55E', '#ffffff'],
        });
      } catch (e) {
        console.error(e);
      }

      return true;
    },
    []
  );

  // Network Test Diagnostics (PRD Section 8 realistic simulated values)
  const runNetworkTest = useCallback(async () => {
    setNetworkTest((prev) => ({
      ...prev,
      status: 'testing',
      progress: 10,
      currentStep: 'Validating browser WebRTC streaming engine & WebGL 2.0...',
    }));

    // Real Gamepad check if available
    let hasGamepad = false;
    if (typeof navigator !== 'undefined' && navigator.getGamepads) {
      try {
        const gp = navigator.getGamepads();
        hasGamepad = Array.from(gp).some((pad) => pad !== null);
      } catch {
        // ignore
      }
    }

    await new Promise((r) => setTimeout(r, 600));
    setNetworkTest((prev) => ({
      ...prev,
      progress: 35,
      currentStep: 'Pinging CloudArk edge clusters (Mumbai BOM-01 & Bengaluru BLR-02)...',
    }));

    await new Promise((r) => setTimeout(r, 700));
    // PRD Section 8 realistic values: ~28 ms latency, 95 Mbps speed, 0.2% packet loss
    const simLatency = 28 + (Math.random() > 0.6 ? 2 : -1);
    setNetworkTest((prev) => ({
      ...prev,
      progress: 65,
      latencyMs: simLatency,
      jitterMs: 1.8,
      currentStep: 'Measuring sustained downlink bandwidth & jitter stability...',
    }));

    await new Promise((r) => setTimeout(r, 800));
    const simSpeed = Number((94 + Math.random() * 4).toFixed(1)); // ~95 Mbps
    const simLoss = 0.2;

    let verdict: NetworkTestResult['verdict'] = 'Great for Gaming';
    if (simLatency > 65 || simSpeed < 15 || simLoss > 2) {
      verdict = 'Not Recommended';
    } else if (simLatency > 40 || simSpeed < 25) {
      verdict = 'Playable';
    }

    setNetworkTest({
      status: 'completed',
      progress: 100,
      currentStep: 'Network benchmark completed successfully',
      browserCompatible: true,
      downloadSpeedMbps: simSpeed,
      latencyMs: simLatency,
      jitterMs: 1.8,
      packetLossPercent: simLoss,
      controllerDetected: hasGamepad,
      verdict,
      serverNode: 'Mumbai Central Node (BOM-01)',
      testedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }, []);

  const updateGameStatus = (gameId: string, status: GameStatus) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, status } : g))
    );
  };

  const adjustUserBalance = (minutes: number) => {
    const deltaSeconds = minutes * 60;
    setUser((prev) => ({
      ...prev,
      playtimeSeconds: Math.max(0, prev.playtimeSeconds + deltaSeconds),
    }));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.GAMES);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.SERVER);
    setUser(INITIAL_USER);
    setGames(INITIAL_GAMES);
    setSessions(INITIAL_SESSIONS);
    setPayments(INITIAL_PAYMENTS);
    setSelectedServer('Mumbai Central Node (12ms)');
  };

  return (
    <GameContext.Provider
      value={{
        user,
        games,
        activeGame,
        inGameSession,
        isConnectingQueue,
        isReconnecting,
        queuePosition,
        sessionRemainingSeconds,
        sessionElapsedSeconds,
        isPaused,
        streamQuality,
        isAudioMuted,
        telemetry,
        showFiveMinWarning,
        dismissFiveMinWarning,
        sessionSummary,
        closeSessionSummary,
        payments,
        sessions,
        networkTest,
        adminStats,
        selectedServer,
        setSelectedServer,
        activeTab,
        setActiveTab,
        selectedGameForDetails,
        setSelectedGameForDetails,
        isPricingModalOpen,
        setIsPricingModalOpen,
        isSpeedTestModalOpen,
        setIsSpeedTestModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isDisclaimerModalOpen,
        setIsDisclaimerModalOpen,
        activeLegalModal,
        setActiveLegalModal,
        toggleWishlist,
        isInWishlist,
        startSession,
        endSession,
        togglePause,
        setStreamQuality,
        toggleAudioMute,
        simulateDisconnect,
        addPlaytime,
        runNetworkTest,
        updateGameStatus,
        adjustUserBalance,
        resetDemoData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
