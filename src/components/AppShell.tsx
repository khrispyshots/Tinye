'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Wallet,
  Target,
  History,
  Award,
  User,
  HelpCircle,
  ShieldAlert,
  PlusCircle,
  RotateCcw
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { activeTab, setActiveTab, setIsSaveModalOpen, resetOnboarding, user } = useApp();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-10">
      {/* Desktop Persistent Sidebar (Lens Style) */}
      <aside className="hidden md:flex flex-col justify-between w-60 bg-white/90 backdrop-blur-xl border-r border-black/[0.06] p-6 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-8">
          {/* Brand header */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-2xl font-bold tracking-tight text-[#1A1B1E]">tinye</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#78A738]/15 text-[#507222] border border-[#78A738]/30">
              {user.environment === 'testnet' ? 'Testnet' : 'Demo'}
            </span>
          </div>

          <button onClick={() => setActiveTab('wallet')} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-[12px] text-sm font-semibold text-[#174D38] bg-[#E5F0E8]"><Wallet className="w-4 h-4"/> My Wallet</button>
          {/* Main Navigation Links */}
          <button onClick={() => setActiveTab('groups')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold text-[#174D38] hover:bg-[#E5F0E8]">Group savings</button>
          <nav aria-label="Main navigation" className="space-y-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#121316] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('goals')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
                activeTab === 'goals'
                  ? 'bg-[#121316] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
              }`}
            >
              <Target className="w-4 h-4 shrink-0" />
              <span>Goals</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
                activeTab === 'activity'
                  ? 'bg-[#121316] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
              }`}
            >
              <History className="w-4 h-4 shrink-0" />
              <span>Activity</span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
                activeTab === 'rewards'
                  ? 'bg-[#121316] text-white shadow-sm'
                  : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Rewards</span>
            </button>
          </nav>
        </div>

        {/* Lower Sidebar Navigation: Profile, Admin, Help */}
        <div className="space-y-1 pt-6 border-t border-black/[0.06]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#121316] text-white'
                : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
              activeTab === 'help'
                ? 'bg-[#121316] text-white'
                : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Help</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-[#121316] text-white'
                : 'text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.03]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Admin Audit</span>
          </button>

          {/* Restart Onboarding Button */}
          <div className="pt-4">
            <button
              onClick={() => resetOnboarding()}
              className="w-full text-xs text-[#5F6368] hover:text-[#1A1B1E] py-2 px-3 flex items-center justify-center space-x-2 rounded-[10px] lens-pill hover:bg-black/[0.06] transition-all font-medium"
              title="Return to 3-screen Onboarding"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Onboarding</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen pb-24 md:pb-12">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-[#1A1B1E]">tinye</span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#78A738]/15 text-[#507222] border border-[#78A738]/30">
              {user.environment === 'testnet' ? 'Testnet' : 'Demo'}
            </span>
          </div>

          <button
            onClick={() => resetOnboarding()}
            className="text-xs text-[#5F6368] px-2.5 py-1 rounded-[8px] lens-pill font-medium"
          >
            Onboarding
          </button>
        </header>

        {/* Centered Main Page Container */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-black/[0.06] z-30 px-4 py-2 flex items-center justify-around pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 text-xs font-semibold transition-colors ${
            activeTab === 'home' ? 'text-[#121316]' : 'text-[#5F6368]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`flex flex-col items-center py-1 px-2 text-xs font-semibold transition-colors ${
            activeTab === 'goals' ? 'text-[#121316]' : 'text-[#5F6368]'
          }`}
        >
          <Target className="w-5 h-5 mb-0.5" />
          <span>Goals</span>
        </button>

        {/* Center Save Action */}
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="flex flex-col items-center py-1 px-3 -mt-5 text-xs font-medium"
        >
          <div className="w-12 h-12 rounded-full bg-[#121316] text-white shadow-lg shadow-black/20 flex items-center justify-center hover:bg-[#27272A] transition-transform active:scale-95">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] font-bold text-[#1A1B1E] mt-0.5">Save</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center py-1 px-2 text-xs font-semibold transition-colors ${
            activeTab === 'rewards' ? 'text-[#121316]' : 'text-[#5F6368]'
          }`}
        >
          <Award className="w-5 h-5 mb-0.5" />
          <span>Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1 px-2 text-xs font-semibold transition-colors ${
            activeTab === 'profile' ? 'text-[#121316]' : 'text-[#5F6368]'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};
