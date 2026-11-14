'use client';

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const HelpView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1B1E]">
          Help & Architecture Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] mt-1">
          Understand Tinye's disciplined non-custodial earmarking and testnet boundary
        </p>
      </div>

      <div className="space-y-5">
        <div className="p-6 rounded-[24px] lens-card space-y-2.5">
          <div className="flex items-center space-x-2 text-sm font-semibold text-[#1A1B1E]">
            <Lock className="w-4 h-4 text-[#2D5A27]" />
            <span>How Goal Earmarking Works</span>
          </div>
          <p className="text-xs text-[#5F6368] leading-relaxed">
            Tinye isolates your earmarked savings from regular daily spending. When you fund a goal, the tokens are transferred to a smart contract vault on NEAR Testnet and locked to your specified purpose.
          </p>
        </div>

        <div className="p-6 rounded-[24px] lens-card space-y-2.5">
          <div className="flex items-center space-x-2 text-sm font-semibold text-[#1A1B1E]">
            <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
            <span>Withdrawals & Non-Punitive Commitment</span>
          </div>
          <p className="text-xs text-[#5F6368] leading-relaxed">
            You always maintain access to your funds. When you withdraw, tokens are unlocked and sent directly back to your connected NEAR wallet. Tinye never charges early withdrawal penalty fees or hidden maintenance costs.
          </p>
        </div>

        <div className="p-6 rounded-[24px] lens-card space-y-2.5">
          <div className="flex items-center space-x-2 text-sm font-semibold text-[#1A1B1E]">
            <AlertTriangle className="w-4 h-4 text-[#B76E00]" />
            <span>Direct Deposits — Coming Soon</span>
          </div>
          <p className="text-xs text-[#5F6368] leading-relaxed">
            Direct account deposits are disabled. Receive testnet NEAR into your own wallet, then separately authorise a savings deposit. Experimental contracts have not been independently audited; deployment access keys can upgrade their code.
          </p>
        </div>
      </div>
    </div>
  );
};
