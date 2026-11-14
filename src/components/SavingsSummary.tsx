"use client";
import React from "react";
import { Plus, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatNear } from "../services/near";
export function SavingsSummary() {
  const {
    totalSavings,
    availableSavings,
    savingsVerified,
    connected,
    connectWallet,
    setIsSaveModalOpen,
    setIsWithdrawModalOpen,
  } = useApp();
  return (
    <section className="balance-surface">
      <div className="flex justify-between items-center">
        <span className="text-sm opacity-80">Total savings</span>
        <span className="balance-status">
          <ShieldCheck size={13} />
          {savingsVerified ? "Verified on testnet" : "NEAR Testnet"}
        </span>
      </div>
      <div className="balance-figure">
        {savingsVerified ? formatNear(totalSavings) : "—"} <span>NEAR</span>
      </div>
      <p className="text-sm opacity-75">
        {savingsVerified
          ? `${formatNear(availableSavings)} NEAR available to withdraw`
          : "A little set aside. A future taking shape."}
      </p>
      <div className="flex gap-3 mt-6 flex-wrap">
        <button
          className="savings-primary"
          onClick={() =>
            connected ? setIsSaveModalOpen(true) : void connectWallet()
          }
        >
          <Plus size={18} />
          {connected ? "Add to goal" : "Connect your wallet"}
        </button>
        {connected && (
          <button
            className="savings-secondary"
            onClick={() => setIsWithdrawModalOpen(true)}
            disabled={!savingsVerified}
          >
            <ArrowUpRight size={17} />
            Withdraw
          </button>
        )}
      </div>
      <p className="text-xs opacity-60 mt-5">
        Testnet tokens have no real monetary value.
      </p>
    </section>
  );
}
