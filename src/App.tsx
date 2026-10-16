import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { GameLibrary } from './components/GameLibrary';
import { PricingView } from './components/PricingView';
import { ConnectionTest } from './components/ConnectionTest';
import { GamingSessionScreen } from './components/GamingSessionScreen';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { GameDetailsModal } from './components/GameDetailsModal';
import { PricingModal } from './components/PricingModal';
import { LegalModals } from './components/LegalModals';

const AppContent: React.FC = () => {
  const {
    activeTab,
    selectedGameForDetails,
    setSelectedGameForDetails,
    isPricingModalOpen,
    setIsPricingModalOpen,
    inGameSession,
  } = useGame();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 flex flex-col selection:bg-purple-600 selection:text-white font-sans relative overflow-x-hidden">
      {/* Immersive Background Glow Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none z-0" />

      {/* Global Header / Navbar */}
      <Navbar />

      {/* Main Routed View */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && <LandingPage />}
        {activeTab === 'library' && <GameLibrary />}
        {activeTab === 'pricing' && <PricingView />}
        {activeTab === 'test' && <ConnectionTest />}
        {activeTab === 'session' && <GamingSessionScreen />}
        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer (Hidden if in full active gaming session unless user scrolls) */}
      <Footer />

      {/* Modals & Overlays */}
      <GameDetailsModal
        game={selectedGameForDetails}
        onClose={() => setSelectedGameForDetails(null)}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />

      <LegalModals />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
