"use client";
import React, { useState, useEffect } from "react";
import {
  Wallet,
  Target,
  History,
  Award,
  ShieldCheck,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  ChevronRight,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatNear } from "../services/near";
export function ProfileView() {
  const {
    user,
    connected,
    walletBalance,
    totalSavings,
    totalWithdrawn,
    savingsVerified,
    setActiveTab,
    disconnectWallet,
    connectWallet,
  } = useApp();
  const [notice, setNotice] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [preferences, setPreferences] = useState({ notifications: false, reducedMotion: false });
  const [storageReady, setStorageReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    let alive = true;
    setDisplayName(""); setStorageReady(false);
    if (connected) void fetch('/api/profile').then(async r => {
      const data = await r.json(); if (!alive) return;
      if (r.ok) { setStorageReady(true); setDisplayName(data.profile?.display_name || user.name); setPreferences(data.profile?.preferences || { notifications:false,reducedMotion:false }); }
    }).catch(() => {});
    return () => { alive = false; };
  }, [connected, user.walletAddress]);
  async function saveProfile(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setNotice('');
    try {
      const response = await fetch('/api/profile', { method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({displayName,preferences}) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setStorageReady(true); setNotice('Profile saved to your account.'); setEditing(false);
      document.documentElement.dataset.reducedMotion = preferences.reducedMotion ? 'true' : 'false';
    } catch(e) { setNotice((e as Error).message || 'Profile could not be saved.'); }
    finally { setSaving(false); }
  }
  const groups = [
    [
      {
        icon: Wallet,
        label: "My Wallet",
        action: () => setActiveTab("wallet"),
      },
      {
        icon: Target,
        label: "Savings Goals",
        action: () => setActiveTab("goals"),
      },
      {
        icon: History,
        label: "Transaction History",
        action: () => setActiveTab("activity"),
      },
      {
        icon: Award,
        label: "Rewards & Points",
        action: () => setActiveTab("rewards"),
      },
      {
        icon: TrendingUp,
        label: "Savings Reputation",
        action: () => setActiveTab('rewards'),
      },
    ],
    [
      {
        icon: ShieldCheck,
        label: "Security & Privacy",
        action: () =>
          setNotice(
            "Wallet ownership is verified with a signed message. Sessions expire after 30 minutes. Never share your recovery phrase.",
          ),
      },
      {
        icon: Bell,
        label: "Notifications",
        action: () => setEditing(true),
      },
      {
        icon: Settings,
        label: "Preferences",
        action: () => setEditing(true),
      },
    ],
    [
      {
        icon: HelpCircle,
        label: "Help & Support",
        action: () => setActiveTab("help"),
      },
      {
        icon: FileText,
        label: "Terms, Privacy & Risks",
        action: () =>
          setNotice(
            "Testnet only. Tokens have no real monetary value. Contracts are experimental and not independently audited. Final legal terms are under review.",
          ),
      },
    ],
  ];
  return (
    <div className="foundation space-y-6">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MAKE YOURSELF AT HOME</span>
          <h1>Your profile</h1>
          <p>Your account, your preferences, your peace of mind.</p>
        </div>
      </div>
      <section className="profile-identity">
        <div className="avatar">
          {connected ? user.name.slice(0, 2).toUpperCase() : <Wallet />}
        </div>
        <div className="min-w-0">
          <h2>{connected ? displayName || user.name : "Welcome to Tinye"}</h2>
          <p className="text-sm text-muted break-all">
            {connected
              ? user.walletAddress
              : "Connect your wallet to make this space yours."}
          </p>
          <span className="network-badge mt-2">
            <i />
            {connected ? "Connected · NEAR Testnet" : "Not connected · Testnet"}
          </span>
        </div>
      </section>
      <section className="profile-financials" aria-label="Financial overview">
        {[
          {
            label: "Wallet balance",
            value: walletBalance !== null ? formatNear(walletBalance) : "—",
          },
          {
            label: "Total savings",
            value: savingsVerified ? formatNear(totalSavings) : "—",
          },
          {
            label: "Total withdrawn",
            value: totalWithdrawn !== null ? formatNear(totalWithdrawn) : "—",
          },
        ].map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>
              {item.value}
              <small> NEAR</small>
            </strong>
          </div>
        ))}
      </section>
      <p className="text-xs text-muted">
        Withdrawn: settled savings withdrawals, all time, for this account and
        contract. Wallet transfers are excluded.
      </p>
      {connected && <section className="surface-list p-5 space-y-4">
        <div className="flex justify-between items-center gap-3"><h2 className="font-semibold text-sm">Profile & preferences</h2><button className="quiet-action" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit profile'}</button></div>
        {!storageReady && <p className="text-xs text-muted">Cloud profile storage is not available yet. Your savings remain on NEAR.</p>}
        {editing && <form onSubmit={saveProfile} className="space-y-4">
          <label className="block text-sm">Display name<input required maxLength={60} value={displayName} onChange={e=>setDisplayName(e.target.value)} className="lens-input w-full rounded-xl h-11 px-3 mt-2" /></label>
          <label className="flex gap-3 text-sm items-start"><input type="checkbox" className="mt-1" checked={preferences.notifications} onChange={e=>setPreferences({...preferences,notifications:e.target.checked})} /><span>Save notification preference <small className="block text-muted">Email and push delivery are not enabled yet.</small></span></label>
          <label className="flex gap-3 text-sm items-center"><input type="checkbox" checked={preferences.reducedMotion} onChange={e=>setPreferences({...preferences,reducedMotion:e.target.checked})} />Reduce animations</label>
          <button disabled={saving} className="primary-action">{saving?'Saving…':'Save profile'}</button>
        </form>}
      </section>}
      {groups.map((rows, index) => (
        <section className="surface-list" key={index}>
          {rows.map(({ icon: Icon, label, action }) => (
            <button className="settings-row" key={label} onClick={action}>
              <span>
                <Icon size={18} />
                {label}
              </span>
              <ChevronRight size={16} />
            </button>
          ))}
        </section>
      ))}
      {notice && (
        <div className="state-notice" role="status">
          {notice}
          <button className="ml-3 underline" onClick={() => setNotice("")}>
            Dismiss
          </button>
        </div>
      )}
      <button
        className="quiet-action"
        onClick={() =>
          connected ? void disconnectWallet() : void connectWallet()
        }
      >
        <LogOut size={17} />
        {connected ? "Disconnect & log out" : "Connect wallet"}
      </button>
      <p className="text-xs text-muted">
        NEAR Testnet · No real funds. Recovery is managed by your wallet
        provider.
      </p>
    </div>
  );
}
