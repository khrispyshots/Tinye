"use client";
import { Auth0Client } from "@auth0/auth0-spa-js";

const DOMAIN = "login.testnet.fast-auth.com";
const CLIENT = process.env.NEXT_PUBLIC_NEAR_AUTH_CLIENT_ID || "np8paqIpMWmNbzT4xAvOOapZBjsOpptl";
const AUDIENCE = "auth0.jwt.fast-auth.testnet";
let provider: Auth0Client | undefined;
function auth0() {
  if (typeof window === "undefined") throw new Error("Embedded wallets require a browser.");
  return provider ||= new Auth0Client({ domain: DOMAIN, clientId: CLIENT, cacheLocation: "memory", authorizationParams: { redirect_uri: window.location.origin } });
}
async function request(path: string, body: object) {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "The embedded wallet request could not be completed.");
  return data;
}
async function approve(kind: "nep413" | "transaction", payload: number[], popup: Window) {
  await auth0().loginWithPopup({ authorizationParams: { audience: AUDIENCE, scope: "transaction:sign", [kind]: payload } }, { popup, timeoutInSeconds: 180 });
  return auth0().getTokenSilently({ authorizationParams: { audience: AUDIENCE, scope: "transaction:sign" } });
}
function approvalWindow() {
  const popup = window.open("", "tinye-near-auth", "width=480,height=720,popup=yes");
  if (!popup) throw new Error("Allow the wallet approval popup and try again.");
  return popup;
}
export async function createEmbeddedWallet(preopenedPopup?: Window): Promise<{ accountId: string; walletKind: "embedded" }> {
  const popup = preopenedPopup || approvalWindow();
  try {
    const pending = await request("/api/embedded/prepare", { kind: "onboard" });
    const jwt = await approve("nep413", pending.payload, popup);
    return await request("/api/embedded/complete", { id: pending.id, jwt });
  } finally {
    popup.close();
  }
}
export async function signEmbeddedCall(accountId: string, methodName: string, args: object, deposit: string, preopenedPopup?: Window): Promise<{ transactionHash: string }> {
  const popup = preopenedPopup || approvalWindow();
  try {
    const pending = await request("/api/embedded/prepare", { kind: "transaction", accountId, methodName, args, deposit });
    const jwt = await approve("transaction", pending.payload, popup);
    return await request("/api/embedded/complete", { id: pending.id, jwt });
  } finally {
    popup.close();
  }
}
export async function disconnectEmbeddedWallet() {
  if (provider) await provider.logout({ openUrl: false });
  provider = undefined;
}
