'use client';

import React from 'react';
import { X, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        role="dialog"
        aria-modal="true"
        className="lens-card w-full max-w-[540px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-black/[0.1]"
      >
        <div className="flex items-center justify-between p-6 border-b border-black/[0.06]">
          <h2 className="font-bold text-lg text-[#1A1B1E]">How Tinye works</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.04] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-sm text-[#5F6368]">
          {/* Section 1: Savings Vault & Earmarking */}
          <div className="p-5 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] space-y-2">
            <div className="flex items-center space-x-2 text-[#163829] font-bold text-sm">
              <Lock className="w-4 h-4 text-[#78A738]" />
              <span>Goal Earmarking & Vault</span>
            </div>
            <p className="text-xs leading-relaxed text-[#5F6368]">
              When you add NEAR to a goal, it is transferred into a purpose-locked smart contract vault. This separates your earmarked savings from daily spending balances in your wallet, preserving mental discipline without losing sovereignty.
            </p>
          </div>

          {/* Section 2: How withdrawals work */}
          <div className="p-5 rounded-[16px] bg-[#F2F5F0] border border-black/[0.04] space-y-2">
            <div className="flex items-center space-x-2 text-[#163829] font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#78A738]" />
              <span>How Withdrawals Work</span>
            </div>
            <p className="text-xs leading-relaxed text-[#5F6368]">
              Tinye believes in non-punitive savings. You can withdraw your earmarked funds at any time. When you request a withdrawal, the vault settles directly back to your connected NEAR wallet. Testnet network gas and prepaid storage costs are separate from savings principal. No yield or monetary rewards are provided.
            </p>
          </div>

          {/* Section 3: MVP Policy Disclosures */}
          <div className="p-5 rounded-[16px] bg-[#FEF3C7] border border-[#F59E0B]/30 space-y-2">
            <div className="flex items-center space-x-2 text-[#92400E] font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-[#B45309]" />
              <span>MVP Boundaries & Testnet Policy</span>
            </div>
            <ul className="text-xs space-y-1.5 list-disc list-inside text-[#92400E]">
              <li><strong>Zero Yield:</strong> MVP does not generate interest, lending yields, or speculative returns.</li>
              <li><strong>Test Assets Only:</strong> Current environment uses NEAR Testnet only. Direct account deposits are unavailable.</li>
              <li><strong>Loyalty Points:</strong> Points are non-cash discipline rewards and cannot be redeemed for fiat or cryptocurrency in MVP.</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full h-12 rounded-[14px] bg-[#121316] hover:bg-[#27272A] text-white font-semibold text-xs tracking-tight transition-all"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
};
