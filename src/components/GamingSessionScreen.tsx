import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Square,
  AlertTriangle,
  Zap,
  Activity,
  Wifi,
  Settings,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  Shield,
  Gamepad,
  ArrowRight,
  HardDrive,
  Clock,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Game } from '../types';

export const GamingSessionScreen: React.FC = () => {
  const {
    activeGame,
    inGameSession,
    isConnectingQueue,
    isReconnecting,
    queuePosition,
    sessionRemainingSeconds,
    sessionElapsedSeconds,
    isPaused,
    togglePause,
    streamQuality,
    setStreamQuality,
    isAudioMuted,
    toggleAudioMute,
    telemetry,
    showFiveMinWarning,
    dismissFiveMinWarning,
    endSession,
    sessionSummary,
    closeSessionSummary,
    startSession,
    setActiveTab,
    setIsPricingModalOpen,
    simulateDisconnect,
    selectedServer,
    user,
  } = useGame();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEndConfirmModal, setShowEndConfirmModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format MM:SS or HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Interactive 60 FPS Procedural Simulation Canvas
  useEffect(() => {
    if (!canvasRef.current || !inGameSession || isConnectingQueue || !activeGame) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 960);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 540);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Simulation entity states
    let playerX = width / 2;
    let playerY = height * 0.75;
    let targetX = width / 2;
    let score = 0;
    let frameCount = 0;

    // Stars / Road Grid particles
    const stars: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 4,
        size: 1 + Math.random() * 2.5,
        color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
      });
    }

    // Interactive pointer
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Keyboard controls
    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Render loop
    const render = () => {
      frameCount++;
      if (!isPaused) {
        score += 2;

        // Smooth player tracking
        if (keys['a'] || keys['arrowleft']) targetX -= 6;
        if (keys['d'] || keys['arrowright']) targetX += 6;
        targetX = Math.max(40, Math.min(width - 40, targetX));
        playerX += (targetX - playerX) * 0.15;
      }

      // Clear with deep dark atmospheric gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#070913');
      bgGrad.addColorStop(0.5, '#0b0f24');
      bgGrad.addColorStop(1, '#111736');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Synthwave Horizon Grid
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.25)';
      ctx.lineWidth = 1;
      const horizonY = height * 0.45;

      // Horizon glow
      const horizonGrad = ctx.createRadialGradient(
        width / 2,
        horizonY,
        10,
        width / 2,
        horizonY,
        width * 0.6
      );
      horizonGrad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      horizonGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)');
      horizonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 80, width, 160);

      // Perspective grid lines
      const gridSpeed = (frameCount * 2.5) % 30;
      for (let y = horizonY; y < height; y += 18) {
        const lineY = y + gridSpeed * ((y - horizonY) / (height - horizonY));
        if (lineY < height) {
          ctx.beginPath();
          ctx.moveTo(0, lineY);
          ctx.lineTo(width, lineY);
          ctx.stroke();
        }
      }

      for (let x = -width; x < width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(width / 2, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Moving Starfield / Energy Particles
      stars.forEach((star) => {
        if (!isPaused) {
          star.y += star.speed * (streamQuality === '1080p60' ? 1.2 : 1);
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Render Game-specific avatar / vehicle / operative
      ctx.save();
      ctx.translate(playerX, playerY);

      if (activeGame.gameType === 'cyber-racer') {
        // High speed neon racer car
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;
        // Tail thrust flame
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(-10, 25);
        ctx.lineTo(0, 45 + Math.sin(frameCount * 0.5) * 10);
        ctx.lineTo(10, 25);
        ctx.fill();

        // Chassis
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.roundRect(-22, -30, 44, 60, 8);
        ctx.fill();

        // Cockpit glass
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 30, 4);
        ctx.fill();

        // Headlights
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-18, -32, 8, 4);
        ctx.fillRect(10, -32, 8, 4);
      } else if (activeGame.gameType === 'sports-soccer') {
        // Football pitch simulation avatar
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(Math.cos(frameCount * 0.05) * 30, Math.sin(frameCount * 0.05) * 30, 8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Sci-Fi Mech / Cyber Operative
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 18;
        // Jet thrusters
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(-16, 18, 6, 14 + Math.sin(frameCount * 0.4) * 6);
        ctx.fillRect(10, 18, 6, 14 + Math.sin(frameCount * 0.4) * 6);

        // Armor body
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(24, 18);
        ctx.lineTo(0, 10);
        ctx.lineTo(-24, 18);
        ctx.closePath();
        ctx.fill();

        // Energy Core
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, -4, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // On-Canvas Real-Time HUD Watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`STREAM: CLOUDARK_EDGE_${selectedServer.slice(0, 3).toUpperCase()}`, 20, 30);
      ctx.fillText(`SCORE: ${score.toLocaleString()}`, 20, 50);

      if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('STREAM PAUSED', width / 2, height / 2);
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('Press SPACE or Resume to continue playing', width / 2, height / 2 + 35);
        ctx.textAlign = 'left';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inGameSession, isConnectingQueue, isPaused, activeGame, selectedServer, streamQuality]);

  // If no active game session
  if (!activeGame && !sessionSummary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl glass-panel border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
          <Gamepad className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Active Cloud Gaming Stream</h2>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          Select a title from our library to launch an instant cloud session directly inside your browser.
        </p>
        <button
          onClick={() => setActiveTab('library')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer border border-purple-400/20"
        >
          Browse Game Library
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-4 ${
        isFullscreen ? 'p-0 max-w-none h-screen bg-black flex flex-col justify-between' : ''
      }`}
    >
      {/* 5-Minute Warning Toast Alert */}
      {showFiveMinWarning && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-black px-4 py-2.5 rounded-xl shadow-2xl flex items-center justify-between font-bold text-xs sm:text-sm animate-bounce border border-amber-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 fill-black text-amber-500 shrink-0" />
            <span>⚠️ 5 Minutes of Playtime Remaining! Top up now to continue without interruption.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="px-3 py-1 bg-black text-white rounded-lg text-xs hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Top Up Playtime
            </button>
            <button
              onClick={dismissFiveMinWarning}
              className="p-1 hover:bg-black/10 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Stream Container */}
      <div className="relative w-full aspect-[16/9] bg-black/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* RECONNECTING STATE (PRD Section 10) */}
        {isReconnecting && (
          <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full border-4 border-[#00D5F5]/30 border-t-[#00D5F5] animate-spin flex items-center justify-center" />
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                Connection Interrupted
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Reconnecting to CloudArk GPU Stream...</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Recovering stream session on {selectedServer}. Gameplay state and cloud progress are safe.
              </p>
            </div>
          </div>
        )}

        {/* LIMITED CAPACITY QUEUE CONNECTING STATE */}
        {isConnectingQueue && (
          <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-cyan-400 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white font-mono">
                #{queuePosition}
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                Limited Capacity Queue
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display">
                Allocating Cloud GPU Instance in {selectedServer.split(' ')[0]}...
              </h3>
              <p className="text-xs text-gray-400 max-w-md">
                You are #{queuePosition} in line. GPU blades are initializing shaders. Your playtime timer is paused until connection is live.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono glass-panel-subtle px-4 py-2 rounded-xl border border-white/[0.08]">
              <span>Bitrate Target: 60 FPS</span>
              <span>•</span>
              <span className="text-emerald-400">Zero Storage Consumed</span>
            </div>
          </div>
        )}

        {/* Top Stream HUD Bar */}
        <div className="relative z-20 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-3 sm:p-4 flex items-center justify-between text-xs text-white">
          {/* Game Title & Cloud Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white tracking-wide">{activeGame?.title}</span>
              <span className="text-[10px] text-cyan-300 hidden sm:inline">• {selectedServer}</span>
            </div>

            <span className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 text-[10px] text-gray-300 border border-white/10">
              <HardDrive className="w-3 h-3 text-cyan-400" />
              <span>Prototype Stream Simulation</span>
            </span>
          </div>

          {/* Center: Live Countdown Timer */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-500/30 font-mono">
            <Clock className={`w-4 h-4 ${sessionRemainingSeconds <= 300 ? 'text-amber-400 animate-spin' : 'text-cyan-400'}`} />
            <span className="text-gray-400 text-[11px] hidden sm:inline">Time Left:</span>
            <span
              className={`font-bold text-sm ${
                sessionRemainingSeconds <= 300 ? 'text-amber-400 font-black animate-pulse' : 'text-emerald-300'
              }`}
            >
              {formatTime(sessionRemainingSeconds)}
            </span>
          </div>

          {/* Right: Live Telemetry HUD */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">{telemetry.fps} FPS</span>
              <span className="text-gray-500">|</span>
              <span className="text-cyan-400">{telemetry.latencyMs} ms</span>
              <span className="text-gray-500">|</span>
              <span className="text-purple-300">{telemetry.bitrateMbps} Mbps</span>
            </div>

            <button
              onClick={() => setShowControlsOverlay(!showControlsOverlay)}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Toggle Keybindings Guide"
            >
              <Gamepad className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Canvas Game Stream */}
        <div className="relative flex-1 w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain cursor-crosshair block"
          />

          {/* Floating Keybindings Overlay */}
          {showControlsOverlay && (
            <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-purple-500/30 text-xs text-gray-200 space-y-1 max-w-xs animate-in fade-in">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 pb-1 border-b border-white/10">
                <span>Interactive Stream Controls</span>
                <button onClick={() => setShowControlsOverlay(false)} className="text-gray-400 hover:text-white cursor-pointer">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] pt-1">
                <span><kbd className="bg-white/10 px-1 rounded font-mono text-cyan-300">W/A/S/D</kbd> Move</span>
                <span><kbd className="bg-white/10 px-1 rounded font-mono text-cyan-300">Mouse</kbd> Aim / Steer</span>
                <span><kbd className="bg-white/10 px-1 rounded font-mono text-cyan-300">Space</kbd> Boost / Action</span>
                <span><kbd className="bg-white/10 px-1 rounded font-mono text-cyan-300">Click</kbd> Attack / Fire</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stream Control Toolbar */}
        <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 flex items-center justify-between text-xs text-white">
          {/* Left: Pause / Play & Mute */}
          <div className="flex items-center gap-2">
            <button
              id="btn-pause-stream"
              onClick={togglePause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
              <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            <button
              id="btn-mute-stream"
              onClick={toggleAudioMute}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>

            <select
              value={streamQuality}
              onChange={(e) => setStreamQuality(e.target.value as any)}
              className="bg-black/60 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none cursor-pointer"
            >
              <option value="720p60">720p @ 60 FPS (Fastest)</option>
              <option value="1080p60">1080p @ 60 FPS (Ultra HD)</option>
            </select>
          </div>

          {/* Right: Fullscreen, Test Network Drop, & End Session */}
          <div className="flex items-center gap-2">
            <button
              onClick={simulateDisconnect}
              className="hidden sm:inline-flex px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-gray-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
              title="Test simulated packet drop / reconnecting state"
            >
              Simulate Drop
            </button>

            <button
              id="btn-fullscreen-toggle"
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button
              id="btn-end-session"
              onClick={() => setShowEndConfirmModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>End Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* End Session Confirmation Modal */}
      {showEndConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white font-display">End Cloud Gaming Session?</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Your game progress is automatically saved to the cloud. Remaining playtime (
              <strong className="text-emerald-400">{formatTime(sessionRemainingSeconds)}</strong>) will stay in your account for future sessions.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEndConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 cursor-pointer"
              >
                Continue Playing
              </button>
              <button
                id="btn-confirm-end-session"
                onClick={() => {
                  setShowEndConfirmModal(false);
                  endSession();
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg cursor-pointer"
              >
                Yes, Save & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Session Summary Modal (Required PRD Section 10) */}
      {sessionSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#00D5F5] p-0.5 mx-auto">
              <div className="w-full h-full bg-[#07070A] rounded-[14px] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-[#00D5F5]" />
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#A855F7]">
                Session Complete
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1 font-display">
                {sessionSummary.gameTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Progress securely saved to CloudArk cloud storage
              </p>
            </div>

            {/* Metrics Breakdown (PRD Section 10: Game played, Session duration, Remaining playtime, Average latency) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 glass-panel-subtle p-4 rounded-xl border border-white/[0.08] text-left">
              <div>
                <div className="text-[10px] text-gray-400">Duration</div>
                <div className="text-base font-bold text-white font-mono">
                  {sessionSummary.durationMinutes} mins
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400">Remaining Balance</div>
                <div className="text-base font-bold text-[#22C55E] font-mono">
                  {Math.floor(user.playtimeSeconds / 60)}m left
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400">Avg Latency</div>
                <div className="text-base font-bold text-[#00D5F5] font-mono">
                  {sessionSummary.avgLatencyMs} ms
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400">Data Streamed</div>
                <div className="text-base font-bold text-purple-300 font-mono">
                  {sessionSummary.dataUsedMb} MB
                </div>
              </div>
            </div>

            {/* Actions: Play Again button (PRD Section 10) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="btn-play-again"
                onClick={() => {
                  closeSessionSummary();
                  if (activeGame) startSession(activeGame);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>

              <button
                onClick={() => {
                  closeSessionSummary();
                  setActiveTab('dashboard');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer border border-white/[0.08]"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
