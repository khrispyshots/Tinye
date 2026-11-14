"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useDialog } from "../components/useDialog";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Clock3,
  Copy,
  ExternalLink,
  RefreshCw,
  Wallet,
  X,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatNear, EXPLORER, SAVINGS_CONTRACT } from "../services/near";
export function WalletView() {
  const {
    user,
    connected,
    connectWallet,
    disconnectWallet,
    walletBalance,
    totalSavings,
    savingsVerified,
    loading,
    error,
    refresh,
    setActiveTab,
  } = useApp();
  const [receive, setReceive] = useState(false),
    [qr, setQr] = useState(""),
    [copied, setCopied] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    let alive = true;
    setQr("");
    setCopied(false);
    if (connected)
      QRCode.toDataURL(user.walletAddress, {
        width: 256,
        margin: 2,
        color: { dark: "#174D38", light: "#FFFFFF" },
      })
        .then((url) => {
          if (alive) setQr(url);
        })
        .catch(() => setNotice("QR unavailable. Use Copy address."));
    return () => {
      alive = false;
    };
  }, [connected, user.walletAddress]);
  const dialogRef = useDialog(receive, () => setReceive(false));
  async function copy() {
    try {
      await navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
    } catch {
      setNotice("Clipboard unavailable. Select and copy the account ID.");
    }
  }
  return (
    <div className="foundation space-y-6">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR MONEY, YOUR WALLET</span>
          <h1>My Wallet</h1>
          <p>A clear view of what is available and what is saved.</p>
        </div>
        <span className="network-badge">
          <i />
          NEAR Testnet
        </span>
      </div>
      {error && (
        <div className="state-notice" role="alert">
          {error}
        </div>
      )}
      <section className="balance-surface">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Available wallet balance</span>
          <Wallet size={20} />
        </div>
        <div className="balance-figure">
          {walletBalance !== null ? formatNear(walletBalance) : "—"}{" "}
          <span>NEAR</span>
        </div>
        <p className="text-xs opacity-70">
          Testnet assets · no real monetary value
        </p>
        <div className="account-line">
          <span className="truncate">
            {connected ? user.walletAddress : "No wallet connected"}
          </span>
          {connected && (
            <button aria-label="Copy wallet address" onClick={copy}>
              <Copy size={16} />
            </button>
          )}
        </div>
      </section>
      <div className="wallet-actions">
        <button
          onClick={() => (connected ? setReceive(true) : void connectWallet())}
        >
          <span>
            <ArrowDownToLine />
          </span>
          Receive
        </button>
        <button
          disabled
          title="Send will be enabled after signing and verification testing"
        >
          <span>
            <ArrowUpRight />
          </span>
          Send <small>Coming soon</small>
        </button>
        <button onClick={() => setActiveTab("activity")}>
          <span>
            <Clock3 />
          </span>
          History
        </button>
      </div>
      {!connected && (
        <button
          className="primary-action w-full"
          disabled={loading}
          onClick={() => void connectWallet()}
        >
          {loading ? "Connecting…" : "Connect existing wallet"}
        </button>
      )}
      <section className="surface-list">
        <div className="settings-row">
          <span>
            <ShieldCheck size={18} />
            Tinye savings
          </span>
          <strong>
            {savingsVerified
              ? `${formatNear(totalSavings)} NEAR`
              : "Unavailable"}
          </strong>
        </div>
        <p className="px-5 pb-5 text-sm text-muted">
          Held separately in the savings contract. Your wallet balance does not
          include these funds.
          {!SAVINGS_CONTRACT ? " The contract is not configured yet." : ""}
        </p>
      </section>
      <section className="coming-soon">
        <div>
          <span className="eyebrow">A SIMPLER WAY TO ADD FUNDS</span>
          <h2>Direct Deposits — Coming Soon</h2>
          <p>
            We're working on a simpler way to fund your Tinye account. For now,
            you can receive supported tokens directly into your connected NEAR
            wallet.
          </p>
        </div>
        <button disabled>Coming Soon</button>
      </section>
      {connected && (
        <div className="flex flex-wrap gap-3">
          <button
            className="quiet-action"
            onClick={() => void refresh()}
            disabled={loading}
          >
            <RefreshCw size={16} />
            {loading ? "Refreshing…" : "Refresh balances"}
          </button>
          <a
            className="quiet-action"
            href={`${EXPLORER}/address/${user.walletAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Explorer
            <ExternalLink size={15} />
          </a>
          <button
            className="quiet-action"
            onClick={() => void disconnectWallet()}
          >
            Disconnect
          </button>
          <button className="quiet-action" onClick={() => void connectWallet()}>
            Switch wallet
          </button>
        </div>
      )}
      {(copied || notice) && (
        <p role="status" className="text-sm text-muted">
          {copied ? "Address copied." : notice}
        </p>
      )}
      {receive && connected && (
        <div
          className="modal-backdrop"
          onKeyDown={(e) => {
            if (e.key === "Escape") setReceive(false);
          }}
        >
          <section
            ref={dialogRef}
            className="receive-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="receive-title"
          >
            <button
              autoFocus
              className="sheet-close"
              aria-label="Close receive screen"
              onClick={() => setReceive(false)}
            >
              <X />
            </button>
            <span className="network-badge">NEAR Testnet</span>
            <h2 id="receive-title">Receive NEAR</h2>
            <p className="text-muted text-sm">
              Straight to your personal wallet.
            </p>
            {qr ? (
              <img
                src={qr}
                width={224}
                height={224}
                alt={`QR code encoding the plain NEAR account ID ${user.walletAddress}`}
              />
            ) : (
              <p>Generating QR…</p>
            )}
            <p className="account-address">{user.walletAddress}</p>
            <p className="text-xs text-muted">
              QR format: plain NEAR account ID
            </p>
            <div className="flex gap-3">
              <button className="primary-action" onClick={copy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}Copy address
              </button>
              <button
                className="quiet-action"
                onClick={async () => {
                  try {
                    if (navigator.share)
                      await navigator.share({
                        title: "My NEAR Testnet account",
                        text: user.walletAddress,
                      });
                    else await copy();
                  } catch {
                    setNotice("Sharing cancelled.");
                  }
                }}
              >
                Share
              </button>
            </div>
            <p className="receive-warning">
              Only send assets supported by this wallet on the selected NEAR
              network. Sending assets on the wrong network may result in loss of
              funds.
            </p>
            <p className="text-xs text-muted">
              Receiving here does not deposit into a savings goal.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
