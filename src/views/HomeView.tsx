"use client";
import React from "react";
import { ArrowUpRight, Plus, Wallet, ArrowRight, Leaf } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SavingsSummary } from "../components/SavingsSummary";
import { GoalRow } from "../components/GoalRow";
import { formatNear } from "../services/near";
export function HomeView() {
  const {
    user,
    connected,
    goals,
    transactions,
    error,
    setActiveTab,
    setIsCreateGoalOpen,
    setSelectedGoalForAction,
    setIsSaveModalOpen,
    setIsHelpModalOpen,
  } = useApp();
  return (
    <div className="foundation space-y-7">
      <header className="page-heading">
        <div>
          <span className="eyebrow">SMALL STEPS. MEANINGFUL PROGRESS.</span>
          <h1>
            {connected ? `Hello, ${user.name}.` : "Make room for tomorrow."}
          </h1>
          <p>Put something aside. Build something bigger.</p>
        </div>
        <button
          className="quiet-action"
          aria-label="Open wallet"
          onClick={() => setActiveTab("wallet")}
        >
          <Wallet size={18} />
          <span className="hidden sm:inline">My wallet</span>
        </button>
      </header>
      {error && (
        <div className="state-notice" role="alert">
          {error}
        </div>
      )}
      <SavingsSummary />
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Your goals</h2>
          <button
            className="quiet-action"
            onClick={() => setIsCreateGoalOpen(true)}
          >
            <Plus size={15} />
            Create goal
          </button>
        </div>
        {goals.length ? (
          <div className="space-y-3">
            {goals.slice(0, 3).map((goal) => (
              <GoalRow
                key={goal.id}
                goal={goal}
                onClick={() => {
                  setSelectedGoalForAction(goal);
                  setIsSaveModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="surface-list p-7 flex gap-4 items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E5F0E8] text-[#174D38] grid place-items-center shrink-0">
              <Leaf size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">
                Something worth saving for.
              </h3>
              <p className="text-sm text-muted mt-1">
                Your first verified savings goal will appear here.
              </p>
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Recent activity
          </h2>
          <button
            className="text-sm text-[#174D38] flex gap-1 items-center"
            onClick={() => setActiveTab("activity")}
          >
            View all
            <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="surface-list">
          {transactions.length ? (
            transactions.slice(0, 3).map((t) => (
              <div className="settings-row" key={t.id}>
                <span className="capitalize">
                  {t.type} · {t.status}
                </span>
                <strong>{formatNear(t.amount)} NEAR</strong>
              </div>
            ))
          ) : (
            <p className="p-5 text-sm text-muted">
              A fresh start. Your transactions will appear here after you use
              Tinye.
            </p>
          )}
        </div>
      </section>
      <button
        className="w-full flex items-center justify-between text-sm text-muted py-3"
        onClick={() => setIsHelpModalOpen(true)}
      >
        New to saving with a wallet?
        <ArrowRight size={17} />
      </button>
    </div>
  );
}
