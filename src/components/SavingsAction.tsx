"use client";
import React, { useState, useEffect } from "react";
import { useDialog } from "./useDialog";
import { X, CheckCircle2, ExternalLink } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatNear, parseNear, SAVINGS_CONTRACT } from "../services/near";
export function SavingsAction({
  kind,
  isOpen,
  onClose,
  onDirect,
}: {
  kind: "deposit" | "withdrawal";
  isOpen: boolean;
  onClose: () => void;
  onDirect?: () => void;
}) {
  const dialogRef = useDialog(isOpen, onClose);
  const app = useApp();
  const [goalId, setGoalId] = useState(""),
    [amount, setAmount] = useState(""),
    [step, setStep] = useState<"form" | "review" | "signing" | "success">(
      "form",
    ),
    [error, setError] = useState(""),
    [receipt, setReceipt] = useState<any>(null);
  useEffect(() => {
    if (isOpen) {
      setGoalId(app.selectedGoalForAction?.id || app.goals[0]?.id || "");
      setAmount("");
      setStep("form");
      setError("");
      setReceipt(null);
    }
  }, [isOpen, app.selectedGoalForAction?.id]);
  if (!isOpen) return null;
  const goal = app.goals.find((g) => g.id === goalId);
  const withdraw = kind === "withdrawal";
  function review() {
    try {
      const units = parseNear(amount);
      if (!goal) throw new Error("Create a verified goal first.");
      if (
        withdraw &&
        BigInt(units) >
          BigInt(goal.currentAmount) - BigInt(goal.reservedAmount || "0")
      )
        throw new Error("Amount exceeds the available savings balance.");
      setError("");
      setStep("review");
    } catch (e) {
      setError(String((e as Error).message));
    }
  }
  async function submit() {
    setError("");
    setStep("signing");
    try {
      const result = await (withdraw
        ? app.withdrawFromGoal(goalId, amount)
        : app.depositToGoal(goalId, amount));
      setReceipt(result);
      setStep("success");
    } catch (e) {
      setError((e as Error).message);
      setStep("review");
    }
  }
  return (
    <div className="modal-backdrop">
      <section
        ref={dialogRef}
        className="receive-sheet items-stretch text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="savings-action-title"
      >
        <button
          autoFocus
          className="sheet-close"
          aria-label="Close savings action"
          onClick={onClose}
        >
          <X />
        </button>
        <span className="network-badge self-start">NEAR Testnet</span>
        <h2 id="savings-action-title">
          {withdraw ? "Withdraw savings" : "Add to your goal"}
        </h2>
        {!app.connected ? (
          <>
            <p className="text-sm text-muted">
              Connect and verify your wallet to continue.
            </p>
            <button
              className="primary-action"
              onClick={() => void app.connectWallet()}
            >
              Connect wallet
            </button>
          </>
        ) : !SAVINGS_CONTRACT ? (
          <div className="state-notice">
            Savings contract deployment is not yet configured. No transaction
            can be submitted.
          </div>
        ) : step === "success" ? (
          <>
            <CheckCircle2 className="text-[#174D38]" size={34} />
            <h3 className="font-semibold">
              {withdraw ? "Withdrawal" : "Deposit"} verified
            </h3>
            <p className="text-sm text-muted">
              {amount} NEAR · {goal?.name}
            </p>
            <a
              href={receipt.explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="quiet-action"
            >
              View transaction
              <ExternalLink size={15} />
            </a>
            <button className="primary-action" onClick={onClose}>
              Done
            </button>
          </>
        ) : (
          <>
            {step === "form" ? (
              <>
                <label className="text-sm">
                  Savings goal
                  <select
                    className="lens-input w-full rounded-xl px-3 h-12 mt-2"
                    value={goalId}
                    onChange={(e) => setGoalId(e.target.value)}
                  >
                    {app.goals.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} · {formatNear(g.currentAmount)} NEAR
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  Amount in NEAR
                  <input
                    autoComplete="off"
                    className="lens-input w-full rounded-xl px-3 h-12 mt-2"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </label>
                <button
                  className="primary-action"
                  disabled={!goal}
                  onClick={review}
                >
                  Review {withdraw ? "withdrawal" : "deposit"}
                </button>
              </>
            ) : (
              <>
                <div className="surface-list p-5 space-y-3 text-sm">
                  <p>
                    {withdraw ? "Withdraw from" : "Deposit into"}{" "}
                    <strong>{goal?.name}</strong>
                  </p>
                  <p className="text-2xl font-semibold">{amount} NEAR</p>
                  <p className="text-muted break-all">
                    Contract: {SAVINGS_CONTRACT}
                  </p>
                  <p className="text-muted">
                    {withdraw
                      ? "Network gas and 1 yoctoNEAR approval are paid separately."
                      : "Adds 0.01 NEAR prepaid contract storage; only the entered principal credits savings. Network gas is separate."}{" "}
                    Review the full cost in your wallet.
                  </p>
                </div>
                <button
                  className="primary-action"
                  disabled={step === "signing"}
                  onClick={() => void submit()}
                >
                  {step === "signing"
                    ? "Awaiting wallet and blockchain…"
                    : "Approve in wallet"}
                </button>
                {step !== "signing" && (
                  <button
                    className="quiet-action"
                    onClick={() => setStep("form")}
                  >
                    Edit amount
                  </button>
                )}
              </>
            )}
          </>
        )}
        {error && (
          <div className="state-notice" role="alert">
            {error}
          </div>
        )}
        {!withdraw && (
          <button
            className="quiet-action"
            onClick={() => {
              onClose();
              onDirect?.();
            }}
          >
            Direct Deposits — Coming Soon
          </button>
        )}
      </section>
    </div>
  );
}
