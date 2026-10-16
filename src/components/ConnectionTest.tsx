import React, { useState } from 'react';
import {
  Gauge,
  Wifi,
  Activity,
  Gamepad,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Server,
  Zap,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const ConnectionTest: React.FC = () => {
  const { networkTest, runNetworkTest, setActiveTab, selectedServer } = useGame();
  const [isRunning, setIsRunning] = useState(false);

  const handleStartTest = async () => {
    setIsRunning(true);
    await runNetworkTest();
    setIsRunning(false);
  };

  const getVerdictDetails = () => {
    switch (networkTest.verdict) {
      case 'Great for Gaming':
        return {
          title: 'Great for Gaming — recommended',
          description: 'Your network latency, packet stability, and downlink speed are optimal for 1080p 60 FPS streaming with fluid responsiveness.',
          color: 'text-[#22C55E]',
          bgColor: 'bg-[#22C55E]/10 border-[#22C55E]/30',
          icon: CheckCircle2,
          recommendation: 'Your connection is primed for fast-paced action and competitive gaming.',
        };
      case 'Playable':
        return {
          title: 'Playable — stream quality may adapt',
          description: 'Stream quality may dynamically scale resolution between 720p and 1080p during bandwidth or jitter peaks.',
          color: 'text-amber-400',
          bgColor: 'bg-amber-950/20 border-amber-500/30',
          icon: AlertTriangle,
          recommendation: 'Tip: For peak stability, switch to 5GHz Wi-Fi or plug in a LAN cable.',
        };
      case 'Not Recommended':
      default:
        return {
          title: 'Not Recommended — unstable connection',
          description: 'High latency or packet loss detected. Streaming gameplay may suffer from noticeable input lag or visual compression artifacts.',
          color: 'text-rose-400',
          bgColor: 'bg-rose-950/20 border-rose-500/30',
          icon: XCircle,
          recommendation: 'Check your Wi-Fi signal or connect through broadband fiber (JioFiber, Airtel Xstream, ACT) for best results.',
        };
    }
  };

  const verdict = getVerdictDetails();
  const VerdictIcon = verdict.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold backdrop-blur-md">
          <Gauge className="w-3.5 h-3.5 text-[#00D5F5]" />
          <span className="text-gray-300">CloudArk Connection Diagnostics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Network & Device Benchmark
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Test whether your device and internet connection are ready for low-latency cloud gaming before you jump into a session.
        </p>
      </div>

      {/* Main Benchmark Box */}
      <div className="glass-panel border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Server & Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[#00D5F5]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Target Benchmark Cluster</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{selectedServer}</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              </div>
            </div>
          </div>

          {/* Exact button label: Run Connection Test (PRD Section 8) */}
          <button
            id="btn-run-speed-test"
            onClick={handleStartTest}
            disabled={isRunning}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl cloudark-gradient-btn text-white font-extrabold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                <span>Running Test...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>Run Connection Test</span>
              </>
            )}
          </button>
        </div>

        {/* Animated Progress Bar */}
        {isRunning && (
          <div className="space-y-3 glass-panel-subtle p-4 rounded-xl border border-white/[0.08] animate-pulse">
            <div className="flex justify-between text-xs text-gray-300">
              <span className="font-semibold text-[#00D5F5]">{networkTest.currentStep}</span>
              <span className="font-mono text-[#A855F7]">{networkTest.progress}%</span>
            </div>
            <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#A855F7] via-indigo-500 to-[#00D5F5] transition-all duration-300"
                style={{ width: `${networkTest.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 5 Animated Test Process Indicators (PRD Section 8) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Check 1: Browser Compatibility */}
          <div className="glass-card p-4 rounded-xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Browser Compatibility</span>
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="text-lg font-bold text-white">
              {networkTest.browserCompatible ? 'Fully Compatible' : 'Incompatible'}
            </div>
            <p className="text-[11px] text-gray-400">
              WebRTC & WebGL 2.0 Hardware Decoder
            </p>
          </div>

          {/* Check 2: Download Speed */}
          <div className="glass-card p-4 rounded-xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Download Speed</span>
              <Wifi className="w-4 h-4 text-[#00D5F5]" />
            </div>
            <div className="text-2xl font-black font-mono text-white flex items-baseline gap-1">
              <span>{networkTest.status === 'idle' ? '95.0' : networkTest.downloadSpeedMbps}</span>
              <span className="text-xs font-normal text-gray-400">Mbps</span>
            </div>
            <p className="text-[11px] text-[#22C55E]">
              15+ Mbps required for 1080p 60 FPS
            </p>
          </div>

          {/* Check 3: Estimated Latency */}
          <div className="glass-card p-4 rounded-xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Estimated Latency</span>
              <Activity className="w-4 h-4 text-[#A855F7]" />
            </div>
            <div className="text-2xl font-black font-mono text-white flex items-baseline gap-1">
              <span>{networkTest.status === 'idle' ? '28' : networkTest.latencyMs}</span>
              <span className="text-xs font-normal text-gray-400">ms</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Sub-35ms optimal for instant reflex
            </p>
          </div>

          {/* Check 4: Packet Loss */}
          <div className="glass-card p-4 rounded-xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Packet Loss</span>
              <ShieldCheck className="w-4 h-4 text-[#00D5F5]" />
            </div>
            <div className="text-2xl font-black font-mono text-white flex items-baseline gap-1">
              <span>{networkTest.status === 'idle' ? '0.2' : networkTest.packetLossPercent}</span>
              <span className="text-xs font-normal text-gray-400">%</span>
            </div>
            <p className="text-[11px] text-gray-400">
              &lt;1% ensures stutter-free audio & video
            </p>
          </div>

          {/* Check 5: Controller Compatibility */}
          <div className="glass-card p-4 rounded-xl border border-white/[0.08] space-y-2 sm:col-span-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Controller Compatibility</span>
              <Gamepad className="w-4 h-4 text-[#00D5F5]" />
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              {networkTest.controllerDetected ? (
                <>
                  <span className="text-[#22C55E]">Physical Controller Detected</span>
                  <span className="text-xs text-gray-400">· Ready</span>
                </>
              ) : (
                <>
                  <span className="text-gray-200">Keyboard & Mouse (Active)</span>
                  <span className="text-xs text-gray-400">· Gamepad API Ready</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-400">
              Plug in Xbox, PlayStation DualSense, or Bluetooth gamepads anytime.
            </p>
          </div>
        </div>

        {/* Mandatory PRD Note (Section 8) */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-gray-300 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#00D5F5] shrink-0" />
          <span>
            <strong>Note:</strong> Connection quality affects streaming quality and game responsiveness.
          </span>
        </div>

        {/* Verdict Display Card */}
        <div className={`p-6 rounded-2xl border ${verdict.bgColor} space-y-4 backdrop-blur-md`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-black/60 ${verdict.color}`}>
              <VerdictIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                Evaluation Verdict:
              </div>
              <h3 className={`text-xl font-bold ${verdict.color} font-display`}>{verdict.title}</h3>
              <p className="text-sm text-gray-200">{verdict.description}</p>
              <div className="pt-2 text-xs text-gray-300">
                💡 {verdict.recommendation}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400">
              Tested node: <span className="text-[#00D5F5] font-semibold">{networkTest.serverNode}</span>
            </div>

            <button
              onClick={() => setActiveTab('library')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl cloudark-gradient-btn text-white font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore Cloud Games</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
