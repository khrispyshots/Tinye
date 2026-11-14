"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Goal,
  Transaction,
  RewardMilestone,
  RewardPerk,
  UserProfile,
} from "../types";
import {
  accountBalance,
  connector,
  view,
  signCall,
  parseNear,
  SAVINGS_CONTRACT,
  UnknownTransaction,
  FailedTransaction,
  EXPLORER,
  setWalletKind,
  getWalletKind,
  openWalletApproval,
} from "../services/near";
type Tab =
  | "home"
  | "wallet"
  | "goals"
  | "groups"
  | "activity"
  | "rewards"
  | "profile"
  | "admin"
  | "help";
type Draft = Omit<Goal, "id" | "currentAmount" | "createdAt" | "status">;
type Context = {
  user: UserProfile;
  goals: Goal[];
  transactions: Transaction[];
  milestones: RewardMilestone[];
  perks: RewardPerk[];
  activeTab: Tab;
  setActiveTab: (v: Tab) => void;
  isOnboarded: boolean;
  setIsOnboarded: (v: boolean) => void;
  resetOnboarding: () => void;
  isSaveModalOpen: boolean;
  setIsSaveModalOpen: (v: boolean) => void;
  isWithdrawModalOpen: boolean;
  setIsWithdrawModalOpen: (v: boolean) => void;
  isCreateGoalOpen: boolean;
  setIsCreateGoalOpen: (v: boolean) => void;
  isDemoTransferOpen: boolean;
  setIsDemoTransferOpen: (v: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (v: boolean) => void;
  selectedGoalForAction: Goal | null;
  setSelectedGoalForAction: (v: Goal | null) => void;
  totalSavings: string;
  availableSavings: string;
  pendingWithdrawals: string;
  totalWithdrawn: string | null;
  walletBalance: string | null;
  loading: boolean;
  error: string;
  connected: boolean;
  savingsVerified: boolean;
  connectWallet: () => Promise<void>;
  connectEmbeddedWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  refresh: () => Promise<void>;
  addGoal: (draft: Draft) => Promise<Goal>;
  depositToGoal: (id: string, amount: string) => Promise<any>;
  withdrawFromGoal: (id: string, amount: string) => Promise<any>;
  claimMilestone: (id: string) => boolean;
  redeemPerk: (id: string) => boolean;
  completeDemoTransfer: (...args: any[]) => void;
};
const AppContext = createContext<Context | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState(""),
    [goals, setGoals] = useState<Goal[]>([]),
    [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("home"),
    [isOnboarded, setIsOnboarded] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false),
    [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false),
    [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false),
    [isDemoTransferOpen, setIsDemoTransferOpen] = useState(false),
    [isHelpModalOpen, setIsHelpModalOpen] = useState(false),
    [selectedGoalForAction, setSelectedGoalForAction] = useState<Goal | null>(
      null,
    );
  const [walletBalance, setWalletBalance] = useState<string | null>(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [savingsVerified, setSavingsVerified] = useState(false),
    [totalWithdrawn, setTotalWithdrawn] = useState<string | null>(null);
  const current = useRef("");
  const busy = useRef(false);
  function clear() {
    current.current = "";
    setAccount("");
    setGoals([]);
    setTransactions([]);
    setWalletBalance(null);
    setSavingsVerified(false);
    setTotalWithdrawn(null);
    setSelectedGoalForAction(null);
    setIsSaveModalOpen(false);
    setIsWithdrawModalOpen(false);
    setIsCreateGoalOpen(false);
  }
  async function load(owner: string) {
    if (!owner) return;
    setLoading(true);
    setError("");
    setSavingsVerified(false);
    try {
      const balance = await accountBalance(owner);
      if (current.current !== owner) return;
      setWalletBalance(balance.available);
      if (SAVINGS_CONTRACT) {
        const rows = await view("list_goals", {
          owner,
          from_index: 0,
          limit: 100,
        });
        if (current.current !== owner) return;
        let metadata: Record<string, any> = {};
        try {
          metadata = JSON.parse(
            localStorage.getItem(`tinye:metadata:${owner}`) || "{}",
          );
        } catch {}
        try {
          const response = await fetch('/api/profile/metadata', { cache:'no-store' });
          if (response.ok) {
            const stored = await response.json();
            metadata = { ...metadata, ...stored.metadata };
          }
        } catch { /* Financial state remains on-chain; local names remain available. */ }
        if (current.current !== owner) return;
        const pendingGoal = localStorage.getItem(
          `tinye:create-pending:${owner}`,
        );
        if (
          pendingGoal &&
          rows.some((g: any) => g.goal_id === pendingGoal && g.owner === owner)
        )
          localStorage.removeItem(`tinye:create-pending:${owner}`);
        setGoals(
          rows.map((g: any) => ({
            id: g.goal_id,
            name: metadata[g.goal_id]?.name || "Savings goal",
            category: metadata[g.goal_id]?.category || "custom",
            notes: metadata[g.goal_id]?.notes,
            currentAmount: g.confirmed_liability,
            reservedAmount: g.reserved_amount,
            targetAmount: g.target_amount,
            asset: "NEAR",
            status:
              BigInt(g.confirmed_liability) >= BigInt(g.target_amount)
                ? "completed"
                : "active",
            createdAt: new Date(Number(BigInt(g.created_at) / BigInt(1000000)))
              .toISOString()
              .slice(0, 10),
          })),
        );
        const withdrawn = await view("get_total_withdrawn", { owner });
        if (current.current !== owner) return;
        setTotalWithdrawn(withdrawn);
        setSavingsVerified(true);
        const history: Transaction[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            !key?.startsWith(`tinye:pending:${owner}:`) &&
            !key?.startsWith(`tinye:history:${owner}:`)
          )
            continue;
          try {
            const record = JSON.parse(
              localStorage.getItem(key) || "null",
            ) as Transaction;
            if (!record) continue;
            const operation = await view("get_operation", {
              owner,
              request_id: record.id,
            });
            if (
              operation &&
              operation.goal_id === record.goalId &&
              operation.amount === record.amount &&
              operation.kind ===
                (record.type === "deposit" ? "Deposit" : "Withdrawal")
            ) {
              record.timestamp = new Date(
                Number(BigInt(operation.timestamp) / BigInt(1000000)),
              ).toISOString();
              record.status =
                operation.state === "Settled"
                  ? "confirmed"
                  : operation.state === "Released"
                    ? "failed"
                    : "pending";
              if (
                key.startsWith(`tinye:pending:${owner}:`) &&
                (record.status === "confirmed" || record.status === "failed")
              ) {
                localStorage.setItem(
                  `tinye:history:${owner}:${record.id}`,
                  JSON.stringify(record),
                );
                localStorage.removeItem(key);
                i--;
              }
            } else record.status = "unknown";
            if (!history.some((t) => t.id === record.id)) history.push(record);
          } catch {
            /* keep unavailable history unresolved */
          }
        }
        if (current.current === owner)
          setTransactions(
            history.sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
          );
      }
    } catch (e) {
      if (current.current === owner)
        setError(
          e instanceof Error ? e.message : "Unable to refresh blockchain data",
        );
    } finally {
      if (current.current === owner) setLoading(false);
    }
  }
  async function refresh() {
    await load(current.current);
  }
  async function disconnectWallet() {
    const embedded = getWalletKind() === 'embedded';
    clear();
    await fetch("/api/auth/logout", { method: "POST" });
    setWalletKind('external');
    if (embedded) {
      try { await (await import('../services/embedded')).disconnectEmbeddedWallet(); } catch {}
      return;
    }
    try {
      await (await connector()).disconnect();
    } catch {}
  }
  async function connectWallet() {
    if (getWalletKind() === 'embedded') {
      try { await (await import('../services/embedded')).disconnectEmbeddedWallet(); } catch {}
    }
    setWalletKind('external');
    clear();
    setLoading(true);
    setError("");
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      const c = await connector();
      await c.connect();
      const wallet = await c.wallet();
      const accounts = await wallet.getAccounts();
      const owner = accounts[0]?.accountId;
      if (!owner) throw new Error("No testnet account selected.");
      const challengeResponse = await fetch("/api/auth/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: owner }),
      });
      const challenge = await challengeResponse.json();
      if (!challengeResponse.ok) throw new Error(challenge.error);
      const proof = await wallet.signMessage({
        network: "testnet",
        signerId: owner,
        message: challenge.message,
        recipient: challenge.recipient,
        nonce: Uint8Array.from(atob(challenge.nonce), (c) => c.charCodeAt(0)),
      });
      const verified = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: challenge.id, ...proof }),
      });
      const result = await verified.json();
      if (!verified.ok) throw new Error(result.error);
      current.current = owner;
      setAccount(owner);
      setIsOnboarded(true);
      await load(owner);
    } catch (e) {
      clear();
      setError(
        e instanceof Error
          ? e.message
          : "Wallet connection rejected or unavailable.",
      );
    } finally {
      setLoading(false);
    }
  }
  async function connectEmbeddedWallet() {
    const approval = window.open('', 'tinye-near-auth', 'width=480,height=720,popup=yes');
    clear(); setLoading(true); setError('');
    try {
      if (!approval) throw new Error('Allow the wallet approval popup and try again.');
      await fetch('/api/auth/logout', {method:'POST'});
      try { await (await connector()).disconnect(); } catch {}
      const { createEmbeddedWallet } = await import('../services/embedded');
      const verified = await createEmbeddedWallet(approval);
      setWalletKind('embedded'); current.current = verified.accountId;
      setAccount(verified.accountId); setIsOnboarded(true); await load(verified.accountId);
    } catch(e) {
      approval?.close();
      clear(); setWalletKind('external');
      setError(e instanceof Error ? e.message : 'Embedded wallet creation could not be verified.');
    } finally { setLoading(false); }
  }
  useEffect(() => {
    let stopped = false;
    let detach = () => {};
    void connector()
      .then((c) => {
        if (stopped) return;
        const changed = (payload: any) => {
          if (getWalletKind() === 'embedded') return;
          if (
            current.current &&
            payload.accounts?.[0]?.accountId !== current.current
          ) {
            clear();
            void fetch("/api/auth/logout", { method: "POST" });
            setError("Wallet changed. Verify your selected account again.");
          }
        };
        const signedOut = () => {
          if (getWalletKind() === 'embedded') return;
          clear();
          void fetch("/api/auth/logout", { method: "POST" });
        };
        c.on("wallet:signIn", changed);
        c.on("wallet:signOut", signedOut);
        detach = () => {
          c.off("wallet:signIn", changed);
          c.off("wallet:signOut", signedOut);
        };
      })
      .catch(() => {});
    return () => {
      stopped = true;
      detach();
    };
  }, []);
  useEffect(() => {
    let alive = true;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((s) => {
        if (alive && s.accountId) {
          setWalletKind(s.walletKind === 'embedded' ? 'embedded' : 'external');
          current.current = s.accountId;
          setAccount(s.accountId);
          setIsOnboarded(true);
          void load(s.accountId);
        }
      })
      .catch(() => {});
    const timer = setInterval(() => {
      void fetch("/api/auth/session")
        .then((r) => r.json())
        .then((s) => {
          if (current.current && s.accountId !== current.current) {
            clear();
            setError("Session expired. Connect your wallet again.");
          }
        });
    }, 30000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);
  async function requireOwner() {
    const owner = current.current;
    if (!owner) throw new Error("Connect and verify your wallet first.");
    const s = await fetch("/api/auth/session").then((r) => r.json());
    if (s.accountId !== owner) {
      clear();
      throw new Error("Session expired. Reconnect your wallet.");
    }
    return owner;
  }
  async function addGoal(draft: Draft) {
    if (busy.current) throw new Error("An operation is already in progress.");
    const approval = openWalletApproval();
    const owner = await requireOwner().catch(error => { approval?.close(); throw error; });
    busy.current = true;
    try {
      if (!SAVINGS_CONTRACT)
        throw new Error("Savings contract is not configured.");
      const target = parseNear(draft.targetAmount);
      const pendingKey = `tinye:create-pending:${owner}`;
      const existing = localStorage.getItem(pendingKey);
      if (existing)
        throw new Error(
          "A goal creation is unresolved. Refresh goals before creating another.",
        );
      const id = crypto.randomUUID();
      localStorage.setItem(pendingKey, id);
      await signCall(
        owner,
        "create_goal",
        {
          goal_id: id,
          asset_id: SAVINGS_CONTRACT,
          rule_version: 1,
          target_amount: target,
        },
        parseNear("0.02"),
        approval,
      );
      const goal = await view("get_goal", { goal_id: id });
      if (goal?.owner !== owner)
        throw new Error("Goal creation could not be verified.");
      const key = `tinye:metadata:${owner}`;
      let metadata = {};
      try {
        metadata = JSON.parse(localStorage.getItem(key) || "{}");
      } catch {}
      localStorage.setItem(
        key,
        JSON.stringify({
          ...metadata,
          [id]: {
            name: draft.name,
            category: draft.category,
            notes: draft.notes,
          },
        }),
      );
      localStorage.removeItem(pendingKey);
      try {
        await fetch('/api/profile/metadata', { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({goalId:id,name:draft.name,category:draft.category,notes:draft.notes}) });
      } catch { /* A failed metadata sync must not retry a confirmed chain transaction. */ }
      await load(owner);
      return {
        ...draft,
        id,
        targetAmount: goal.target_amount,
        currentAmount: goal.confirmed_liability,
        createdAt: new Date().toISOString(),
        status: "active",
      } as Goal;
    } catch (e) {
      if (
        e instanceof FailedTransaction ||
        /reject|cancel|denied/i.test(String(e))
      )
        localStorage.removeItem(`tinye:create-pending:${owner}`);
      throw e;
    } finally {
      approval?.close();
      busy.current = false;
    }
  }
  async function transact(
    kind: "deposit" | "withdrawal",
    id: string,
    amount: string,
  ) {
    if (busy.current) throw new Error("An operation is already in progress.");
    if (!SAVINGS_CONTRACT)
      throw new Error("Savings contract is not configured.");
    const units = parseNear(amount);
    const approval = openWalletApproval();
    const owner = await requireOwner().catch(error => { approval?.close(); throw error; });
    const request = crypto.randomUUID();
    busy.current = true;
    const key = `tinye:pending:${owner}:${id}`;
    if (localStorage.getItem(key)) {
      approval?.close();
      busy.current = false;
      throw new Error(
        "An unresolved transaction exists for this goal. Reconcile it before trying again.",
      );
    }
    const record: Transaction = {
      id: request,
      type: kind,
      amount: units,
      asset: "NEAR",
      status: "pending",
      timestamp: new Date().toISOString(),
      goalId: id,
      receiptId: request,
      environment: "testnet",
    };
    try {
      localStorage.setItem(key, JSON.stringify(record));
      setTransactions((prev) => [record, ...prev]);
      const receipt = await signCall(
        owner,
        kind === "deposit" ? "deposit_native" : "withdraw",
        kind === "deposit"
          ? { goal_id: id, request_id: request, amount: units }
          : { goal_id: id, amount: units, request_id: request },
        kind === "deposit"
          ? (BigInt(units) + BigInt(parseNear("0.01"))).toString()
          : "1",
        approval,
      );
      const operation = await view("get_operation", {
        owner,
        request_id: request,
      });
      if (
        operation?.state !== "Settled" ||
        operation.amount !== units ||
        operation.goal_id !== id
      )
        throw new UnknownTransaction(receipt.transactionHash);
      if (current.current === owner)
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === request
              ? {
                  ...t,
                  status: "confirmed",
                  txHash: receipt.transactionHash,
                  explorerUrl: receipt.explorerUrl,
                }
              : t,
          ),
        );
      localStorage.setItem(
        `tinye:history:${owner}:${request}`,
        JSON.stringify({
          ...record,
          status: "confirmed",
          txHash: receipt.transactionHash,
          explorerUrl: receipt.explorerUrl,
        }),
      );
      localStorage.removeItem(key);
      await load(owner);
      return receipt;
    } catch (e) {
      const status =
        e instanceof FailedTransaction
          ? "failed"
          : e instanceof UnknownTransaction
            ? "unknown"
            : /reject|cancel|denied/i.test(String(e))
              ? "rejected"
              : "unknown";
      if (current.current === owner)
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === request
              ? {
                  ...t,
                  status,
                  txHash:
                    e instanceof UnknownTransaction
                      ? e.transactionHash
                      : undefined,
                }
              : t,
          ),
        );
      if (status === "failed") {
        localStorage.setItem(
          `tinye:history:${owner}:${request}`,
          JSON.stringify({
            ...record,
            status,
            txHash: (e as FailedTransaction).transactionHash,
          }),
        );
        localStorage.removeItem(key);
      } else if (status === "rejected") localStorage.removeItem(key);
      else
        localStorage.setItem(
          key,
          JSON.stringify({
            ...record,
            status,
            txHash:
              e instanceof UnknownTransaction ? e.transactionHash : undefined,
          }),
        );
      throw e;
    } finally {
      approval?.close();
      busy.current = false;
    }
  }
  const totalSavings = goals
    .reduce((sum, g) => sum + BigInt(g.currentAmount), BigInt(0))
    .toString();
  const pendingWithdrawals = goals
    .reduce((sum, g) => sum + BigInt(g.reservedAmount || "0"), BigInt(0))
    .toString();
  const user: UserProfile = {
    id: account,
    name: account ? account.split(".")[0] : "",
    walletAddress: account,
    environment: "testnet",
    joinedAt: "",
    points: 0,
    streakDays: 0,
    currency: "NEAR",
  };
  return (
    <AppContext.Provider
      value={{
        user,
        goals,
        transactions,
        milestones: [],
        perks: [],
        activeTab,
        setActiveTab,
        isOnboarded,
        setIsOnboarded,
        resetOnboarding: () => setIsOnboarded(false),
        isSaveModalOpen,
        setIsSaveModalOpen,
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        isCreateGoalOpen,
        setIsCreateGoalOpen,
        isDemoTransferOpen,
        setIsDemoTransferOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        selectedGoalForAction,
        setSelectedGoalForAction,
        totalSavings,
        availableSavings: (
          BigInt(totalSavings) - BigInt(pendingWithdrawals)
        ).toString(),
        pendingWithdrawals,
        totalWithdrawn,
        walletBalance,
        loading,
        error,
        connected: !!account,
        savingsVerified,
        connectWallet,
        connectEmbeddedWallet,
        disconnectWallet,
        refresh,
        addGoal,
        depositToGoal: (id, a) => transact("deposit", id, a),
        withdrawFromGoal: (id, a) => transact("withdrawal", id, a),
        claimMilestone: () => false,
        redeemPerk: () => false,
        completeDemoTransfer: () => {
          throw new Error("Direct deposits are coming soon.");
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("AppProvider missing");
  return value;
}
