'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Check, Lock, Target } from 'lucide-react';

interface OnboardingWelcomeProps {
  onComplete: () => void;
}

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({ onComplete }) => {
  const { connectWallet, connectEmbeddedWallet, loading, error } = useApp();
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3>(1);
  const [selectedWallet, setSelectedWallet] = useState<'near_testnet' | 'embedded'>('near_testnet');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);
  const [localWalletRedirect, setLocalWalletRedirect] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('wallet') === 'create') setCurrentScreen(3);
    const sharedClient = !process.env.NEXT_PUBLIC_NEAR_AUTH_CLIENT_ID || process.env.NEXT_PUBLIC_NEAR_AUTH_CLIENT_ID === 'np8paqIpMWmNbzT4xAvOOapZBjsOpptl';
    setLocalWalletRedirect(sharedClient && ['http://127.0.0.1:3010', 'http://localhost:3010', 'http://127.0.0.1:3005', 'http://localhost:3005', 'http://127.0.0.1:3000'].includes(window.location.origin));
  }, []);
  const beginWallet = () => {
    if (selectedWallet === 'embedded' && localWalletRedirect) { window.location.assign('http://localhost:3000/?wallet=create'); return; }
    void (selectedWallet === 'embedded' ? connectEmbeddedWallet() : connectWallet());
  };

  // SCREEN 1: A Quiet Welcome (Lens Style)
  if (currentScreen === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full max-w-[460px] lens-card rounded-[28px] p-8 sm:p-11 flex flex-col items-center text-center space-y-8 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.08]">
          {/* Top Header inside card */}
          <div className="w-full flex items-center justify-between">
            <span className="text-2xl font-bold tracking-tight text-[#1A1B1E]">tinye</span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-semibold text-[#5F6368]">1 of 3</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#78A738]/15 text-[#507222] border border-[#78A738]/30">
                Testnet
              </span>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="w-56 h-56 relative flex items-center justify-center my-2">
            <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
              <defs>
                <linearGradient id="lensSage" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EEF5E8" />
                  <stop offset="100%" stopColor="#DFEDD6" />
                </linearGradient>
              </defs>

              {/* Base Sage Card */}
              <rect
                x="28"
                y="38"
                width="184"
                height="154"
                rx="20"
                fill="url(#lensSage)"
                stroke="#163829"
                strokeWidth="1.2"
                strokeOpacity="0.15"
              />

              <rect x="50" y="64" width="44" height="12" rx="4" fill="#163829" fillOpacity="0.85" />
              <rect x="50" y="86" width="102" height="20" rx="6" fill="#1A1B1E" />
              <rect x="50" y="114" width="65" height="9" rx="3" fill="#163829" fillOpacity="0.6" />
              
              <rect x="50" y="142" width="140" height="12" rx="6" fill="#CDE2C2" />
              <rect x="50" y="142" width="105" height="12" rx="6" fill="#78A738" />

              {/* Floating Tile 1: Top Right */}
              <g className="animate-pulse">
                <rect
                  x="148"
                  y="18"
                  width="68"
                  height="50"
                  rx="14"
                  fill="#78A738"
                  className="drop-shadow-md"
                />
                <circle cx="170" cy="43" r="6" fill="#FFFFFF" />
                <rect x="183" y="40" width="18" height="6" rx="3" fill="#FFFFFF" />
              </g>

              {/* Floating Tile 2: Bottom Left */}
              <g>
                <rect
                  x="14"
                  y="152"
                  width="64"
                  height="52"
                  rx="14"
                  fill="#FFFFFF"
                  stroke="#163829"
                  strokeWidth="1.2"
                  strokeOpacity="0.15"
                  className="drop-shadow-sm"
                />
                <path
                  d="M 36 179 L 46 169 L 56 179"
                  stroke="#78A738"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
          </div>

          {/* Title & Copy */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1B1E]">
              Make room for what matters.
            </h1>
            <p className="text-sm text-[#5F6368] font-normal">
              Your goals. Your pace.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3 pt-2">
            <button
              onClick={() => setCurrentScreen(2)}
              className="w-full h-12 rounded-[14px] bg-[#121316] hover:bg-[#27272A] text-white font-semibold text-xs tracking-tight transition-all shadow-md flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {onComplete();}}
              className="text-xs text-[#5F6368] hover:text-[#1A1B1E] transition-colors py-2 block w-full font-medium"
            >
              Preview the interface? <span className="underline underline-offset-4 font-semibold text-[#1A1B1E]">Explore</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 2: Product Introduction & How It Works (Lens Style)
  if (currentScreen === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full max-w-[500px] lens-card rounded-[28px] p-7 sm:p-9 space-y-7 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.08]">
          {/* Header with step progress */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentScreen(1)}
              className="text-xs text-[#5F6368] hover:text-[#1A1B1E] flex items-center space-x-1 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-semibold text-[#507222]">Screen 2 of 3</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full lens-pill text-[#5F6368]">
                How it works
              </span>
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B1E]">
              Purpose-built savings vaults
            </h2>
            <p className="text-xs text-[#5F6368] leading-relaxed">
              Tinye replaces passive balances with active, disciplined goal earmarking.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="space-y-3">
            <div className="p-4 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-[10px] bg-white text-[#78A738] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs">
                <strong className="text-sm font-semibold text-[#1A1B1E] block">1. Earmark Every Token</strong>
                <p className="text-[#5F6368] leading-relaxed">
                  Create a goal and keep its savings separate from the available NEAR in your personal wallet.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-[10px] bg-white text-[#78A738] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs">
                <strong className="text-sm font-semibold text-[#1A1B1E] block">2. Non-Custodial & Non-Punitive</strong>
                <p className="text-[#5F6368] leading-relaxed">
                  You authorise actions in your wallet. Experimental testnet contracts enforce their published savings and withdrawal rules.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-[10px] bg-white text-[#B45309] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs">
                <strong className="text-sm font-semibold text-[#1A1B1E] block">3. Zero Speculation in MVP</strong>
                <p className="text-[#5F6368] leading-relaxed">
                  Tinye does not offer lending yield, speculative returns, or financial guarantees. Healthy habits are their own reward.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen(3)}
            className="w-full h-12 rounded-[14px] bg-[#121316] hover:bg-[#27272A] text-white font-semibold text-xs tracking-tight transition-all shadow-md flex items-center justify-center space-x-2 active:scale-[0.99]"
          >
            <span>Next: Wallet Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 3: Wallet Selection & Consent (Lens Style)
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      <div className="w-full max-w-[500px] lens-card rounded-[28px] p-7 sm:p-9 space-y-6 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.08]">
        {/* Header with step progress */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen(2)}
            className="text-xs text-[#5F6368] hover:text-[#1A1B1E] flex items-center space-x-1 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-semibold text-[#507222]">Screen 3 of 3</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full lens-pill text-[#5F6368]">
              Wallet & Consent
            </span>
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B1E]">
            Connect your wallet
          </h2>
          <p className="text-xs text-[#5F6368] leading-relaxed">
            Choose how you would like to operate your testnet goal vault.
          </p>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3">
          <button
            type="button"
            aria-pressed={selectedWallet === 'embedded'}
            onClick={() => setSelectedWallet('embedded')}
            className={`w-full text-left p-4 rounded-[16px] cursor-pointer transition-all ${
              selectedWallet === 'embedded'
                ? 'bg-[#E3EDDA] border-2 border-[#78A738] shadow-sm'
                : 'bg-[#F2F5F0] border border-black/[0.04] hover:border-black/[0.1]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-sm text-[#1A1B1E]">Create new wallet</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#507222] border border-[#78A738]/30">
                    Embedded
                  </span>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Sign in with the email or social options offered by NEAR Auth. Create or restore your own testnet wallet without installing an extension.
                </p>
              </div>
              {selectedWallet === 'embedded' && (
                <CheckCircle2 className="w-5 h-5 text-[#78A738] shrink-0 mt-0.5" />
              )}
            </div>
          </button>

          <button
            type="button"
            aria-pressed={selectedWallet === 'near_testnet'}
            onClick={() => setSelectedWallet('near_testnet')}
            className={`w-full text-left p-4 rounded-[16px] cursor-pointer transition-all ${
              selectedWallet === 'near_testnet'
                ? 'bg-[#E3EDDA] border-2 border-[#78A738] shadow-sm'
                : 'bg-[#F2F5F0] border border-black/[0.04] hover:border-black/[0.1]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-sm text-[#1A1B1E]">Connect existing wallet</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#5F6368] border border-black/[0.08]">
                    NEAR Connect
                  </span>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Select a supported NEAR testnet wallet and verify ownership with a signed message.
                </p>
              </div>
              {selectedWallet === 'near_testnet' && (
                <CheckCircle2 className="w-5 h-5 text-[#78A738] shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        </div>

        {/* Required Consents */}
        <div className="p-4 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] space-y-2.5">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={e => setTermsAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-black/20 text-[#121316] focus:ring-[#78A738]"
            />
            <span className="text-xs text-[#5F6368] group-hover:text-[#1A1B1E] transition-colors leading-relaxed">
              I agree to the Tinye Testnet Terms of Service and NDPC Data Privacy Policy.
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={riskAcknowledged}
              onChange={e => setRiskAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-black/20 text-[#121316] focus:ring-[#78A738]"
            />
            <span className="text-xs text-[#5F6368] group-hover:text-[#1A1B1E] transition-colors leading-relaxed">
              I acknowledge testnet tokens have zero monetary value and this is a financial wellness prototype.
            </span>
          </label>
        </div>

        <button
          disabled={!termsAgreed || !riskAcknowledged || loading}
          onClick={beginWallet}
          className={`w-full h-12 rounded-[14px] font-semibold text-xs tracking-tight transition-all flex items-center justify-center space-x-2 ${
            termsAgreed && riskAcknowledged
              ? 'bg-[#121316] hover:bg-[#27272A] text-white shadow-md'
              : 'bg-black/5 text-[#5F6368]/40 cursor-not-allowed border border-black/[0.04]'
          }`}
        >
          <span>{loading ? 'Verifying wallet…' : selectedWallet === 'embedded' ? 'Create wallet & continue' : 'Connect wallet & continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {selectedWallet === 'embedded' && localWalletRedirect && <p className="text-xs leading-relaxed text-[#507222]">Wallet setup continues in the local wallet-ready preview at localhost:3000.</p>}
        {selectedWallet === 'embedded' && <p className="text-[11px] leading-relaxed text-[#5F6368]">NEAR Auth opens a secure approval popup. Recovery depends on your login provider and NEAR Auth’s MPC service. Signing approvals are verified on-chain; use testnet tokens only.</p>}
        {error && <p role="alert" className="text-xs leading-relaxed text-red-700 break-words">{error}</p>}
      </div>
    </div>
  );
};
