import { randomBytes, createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { access, mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createRemoteJWKSet, jwtVerify, customFetch } from "jose";
import { PublicKey } from "near-api-js";
import { transactions, utils, connect, keyStores, KeyPair } from "near-api-legacy";
import { FastAuthSignature } from "@fast-auth-near/browser-sdk";
import { encodeEmbeddedMessage, matchesEmbeddedPayload } from "@/services/embedded-payload";
import { fetchEmbeddedJwks } from "@/server/embedded-jwks";

export const EMBEDDED_MESSAGE = "Create or restore my Tinye wallet on NEAR testnet. This does not authorise a savings transfer.";
export const AUTH_ISSUER = "https://login.testnet.fast-auth.com/";
const AUTH_CLIENT = process.env.NEXT_PUBLIC_NEAR_AUTH_CLIENT_ID || "np8paqIpMWmNbzT4xAvOOapZBjsOpptl";
const AUTH_AUDIENCE = "auth0.jwt.fast-auth.testnet";
const AUTH_CONTRACT = "fast-auth.testnet";
const MPC_CONTRACT = "v1.signer-prod.testnet";
const JWKS = createRemoteJWKSet(new URL(`${AUTH_ISSUER}.well-known/jwks.json`), { [customFetch]: fetchEmbeddedJwks, timeoutDuration: 25000 });
const rpcUrl = process.env.NEXT_PUBLIC_NEAR_RPC_URL || "https://test.rpc.fastnear.com";
type Pending = { id: string; kind: "onboard" | "transaction"; payload: number[]; expires: number; accountId?: string; publicKey?: string; transaction?: string };
const runtime = globalThis as typeof globalThis & { tinyeEmbedded?: { pending: Map<string, Pending>; calls: number; day: string; queue: Promise<unknown>; rates: Map<string, { count: number; expires: number }> } };
const state = runtime.tinyeEmbedded ||= { pending: new Map(), calls: 0, day: "", queue: Promise.resolve(), rates: new Map() };
export class EmbeddedUnavailable extends Error {}
export async function chain(method: string, params: object | unknown[]) {
  const response = await fetch(rpcUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: "tinye-embedded", method, params }), cache: "no-store", signal: AbortSignal.timeout(25000) });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error?.cause?.name || "Testnet RPC unavailable");
  return data.result;
}
let cachedSponsorAccount: any = null;
export async function getSponsorAccount() {
  const privateKey = process.env.TINYE_EMBEDDED_SPONSOR_PRIVATE_KEY;
  if (!privateKey) return null;
  const sponsor = process.env.TINYE_EMBEDDED_SPONSOR_ACCOUNT || "tinye.testnet";
  if (cachedSponsorAccount && cachedSponsorAccount.accountId === sponsor) return cachedSponsorAccount;
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(privateKey as any);
  await keyStore.setKey("testnet", sponsor, keyPair);
  const near = await connect({
    networkId: "testnet",
    nodeUrl: rpcUrl,
    keyStore,
  });
  cachedSponsorAccount = await near.account(sponsor);
  return cachedSponsorAccount;
}

export async function embeddedReady() {
  if (process.env.TINYE_EMBEDDED_SPONSOR_ENABLED !== "true") throw new EmbeddedUnavailable("Embedded wallet sponsorship is not configured on this server. Connect an existing wallet while the operator enables it.");
  const network = await chain("status", []);
  if (network.chain_id !== "testnet") throw new Error("Only NEAR testnet is permitted.");

  if (process.env.TINYE_EMBEDDED_SPONSOR_PRIVATE_KEY) {
    return "native-signer";
  }

  const path = process.env.TINYE_NEAR_CLI_PATH || (process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, "Tinye", "near-cli", "node_modules", "near-cli-rs", "node_modules", ".bin_real", "near.exe") : "");
  if (!path) throw new EmbeddedUnavailable("Embedded wallet sponsorship requires a self-hosted signing relayer. Please use NEAR Connect to connect an existing testnet wallet.");
  try { await access(path); } catch { throw new EmbeddedUnavailable("Embedded wallet sponsorship requires a self-hosted signing relayer. Please use NEAR Connect to connect an existing testnet wallet."); }
  return path;
}
export function rateLimit(request: Request) {
  const key = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0] || "local").digest("hex");
  const now = Date.now();
  for (const [id, record] of state.pending) if (record.expires < now) state.pending.delete(id);
  for (const [id, rate] of state.rates) if (rate.expires < now) state.rates.delete(id);
  const entry = state.rates.get(key) || { count: 0, expires: now + 3600000 };
  if (++entry.count > 30 || state.pending.size >= 200) throw new Error("Wallet request limit reached. Please retry later.");
  state.rates.set(key, entry);
}
export function makeOnboarding(recipient: string) {
  return storePending({ kind: "onboard", payload: encodeEmbeddedMessage(EMBEDDED_MESSAGE, recipient, new Uint8Array(randomBytes(32))) });
}
function storePending(fields: Omit<Pending, "id" | "expires">) {
  const value: Pending = { ...fields, id: randomBytes(32).toString("hex"), expires: Date.now() + 5 * 60000 };
  state.pending.set(value.id, value); return value;
}
export function consumePending(id: string) {
  const item = state.pending.get(id); state.pending.delete(id);
  if (!item || item.expires < Date.now()) throw new Error("Wallet approval expired. Start again.");
  return item;
}
export async function prepareTransaction(owner: { accountId: string; publicKey: string; walletKind?: string }, body: any) {
  const contract = process.env.NEXT_PUBLIC_TINYE_SAVINGS_CONTRACT;
  if (owner.walletKind !== "embedded" || body.accountId !== owner.accountId || !contract || !/^[a-z0-9_.-]+\.testnet$/.test(contract)) throw new Error("Reconnect and verify the embedded wallet first.");
  if (!["create_goal", "deposit_native", "withdraw", "create_group", "join_group", "leave_group", "close_group", "invite_group_member", "revoke_group_invitation"].includes(body.methodName)) throw new Error("Unsupported savings operation.");
  if (!body.args || typeof body.args !== "object" || Array.isArray(body.args) || JSON.stringify(body.args).length > 2048) throw new Error("Invalid savings arguments.");
  if (typeof body.deposit !== "string" || !/^\d{1,27}$/.test(body.deposit) || BigInt(body.deposit) > 100n * 10n ** 24n) throw new Error("Deposit exceeds the testnet signing limit.");
  if (body.methodName === "withdraw" && body.deposit !== "1") throw new Error("Withdrawals require exactly one yoctoNEAR.");
  if (["create_group", "join_group"].includes(body.methodName) && body.deposit !== "20000000000000000000000") throw new Error("Group creation and membership require the reviewed storage deposit.");
  if (["leave_group", "close_group", "revoke_group_invitation"].includes(body.methodName) && body.deposit !== "1") throw new Error("Group membership changes require one yoctoNEAR.");
  if (body.methodName === "invite_group_member" && body.deposit !== "5000000000000000000000") throw new Error("Group invitations require the reviewed storage deposit.");
  const access = await chain("query", { request_type: "view_access_key", account_id: owner.accountId, public_key: owner.publicKey, finality: "final" });
  if (access.permission !== "FullAccess") throw new Error("The embedded wallet key is no longer authorised.");
  const tx = transactions.createTransaction(owner.accountId, utils.PublicKey.fromString(owner.publicKey), contract, BigInt(access.nonce) + 1n, [transactions.functionCall(body.methodName, body.args, 100000000000000n, BigInt(body.deposit))], utils.serialize.base_decode(access.block_hash));
  const bytes = transactions.encodeTransaction(tx);
  return storePending({ kind: "transaction", payload: Array.from(bytes), transaction: Buffer.from(bytes).toString("base64"), accountId: owner.accountId, publicKey: owner.publicKey });
}
async function identity(jwt: string, pending: Pending) {
  if (typeof jwt !== "string" || Buffer.byteLength(jwt, "utf8") > 7168) throw new Error("Invalid wallet approval.");
  const { payload } = await jwtVerify(jwt, JWKS, { issuer: AUTH_ISSUER, audience: AUTH_AUDIENCE, algorithms: ["RS256"], maxTokenAge: "10m" });
  if (!payload.sub || (payload.azp && payload.azp !== AUTH_CLIENT) || !matchesEmbeddedPayload(payload.fatxn, pending.payload)) throw new Error("Wallet approval did not match this request.");
  const path = `jwt#${AUTH_ISSUER}#${payload.sub}`;
  const keyResult = await chain("query", { request_type: "call_function", account_id: MPC_CONTRACT, method_name: "derived_public_key", args_base64: Buffer.from(JSON.stringify({ path, predecessor: AUTH_CONTRACT, domain_id: 1 })).toString("base64"), finality: "final" });
  const key = JSON.parse(Buffer.from(keyResult.result).toString("utf8"));
  if (typeof key !== "string" || !key.startsWith("ed25519:")) throw new Error("The wallet provider did not return a supported NEAR key.");
  return { publicKey: key, accountId: Buffer.from(PublicKey.from(key).data).toString("hex") };
}
async function runCli(args: string[]) {
  const binary = await embeddedReady();
  return new Promise<string>((resolve, reject) => execFile(binary, ["--quiet", ...args], { timeout: 180000, maxBuffer: 1024 * 1024, windowsHide: true }, (error, stdout, stderr) => {
    // Never forward CLI diagnostics: signing approval JWTs can appear in them.
    if (error) reject(new EmbeddedUnavailable("The testnet signing service could not complete this request. No financial success was recorded."));
    else resolve(stdout + "\n" + stderr);
  }));
}
async function extractOutcome(output: string, signer: string, receiver: string) {
  const candidates = Array.from(new Set(output.match(/[1-9A-HJ-NP-Za-km-z]{43,44}/g) || []));
  for (const hash of candidates.reverse()) {
    try {
      const result = await chain("tx", { tx_hash: hash, sender_account_id: signer, wait_until: "FINAL" });
      if (result.final_execution_status !== "FINAL" || result.transaction.signer_id !== signer || result.transaction.receiver_id !== receiver) continue;
      if (result.status?.Failure || result.receipts_outcome?.some((r: any) => r.outcome.status?.Failure)) throw new Error("Testnet signing execution failed.");
      return result;
    } catch (error) { if ((error as Error).message === "Testnet signing execution failed.") throw error; }
  }
  throw new Error("Testnet signing status is unknown. Check your account before retrying.");
}
async function sponsoredSignature(jwt: string, pending: Pending) {
  const sponsor = process.env.TINYE_EMBEDDED_SPONSOR_ACCOUNT || "tinye.testnet";
  if (!sponsor.endsWith(".testnet")) throw new Error("Only a testnet sponsor may be used.");
  const day = new Date().toISOString().slice(0, 10);
  if (state.day !== day) { state.day = day; state.calls = 0; }
  if (++state.calls > 100) throw new EmbeddedUnavailable("The testnet sponsor daily request budget is exhausted.");

  const sponsorAccount = await getSponsorAccount();
  if (sponsorAccount) {
    const outcome = await sponsorAccount.signAndSendTransaction({
      receiverId: AUTH_CONTRACT,
      actions: [
        transactions.functionCall(
          "sign",
          Buffer.from(JSON.stringify({ guard_id: `jwt#${AUTH_ISSUER}`, verify_payload: jwt, sign_payload: pending.payload, algorithm: "eddsa" })),
          300000000000000n,
          1n
        )
      ]
    });
    if (typeof outcome.status?.SuccessValue !== "string" || !outcome.status.SuccessValue) throw new Error("NEAR Auth returned no signature.");
    return FastAuthSignature.fromBase64(outcome.status.SuccessValue).recover("ed25519");
  }

  const dir = await mkdtemp(join(tmpdir(), "tinye-approval-"));
  try {
    const path = join(dir, "approval.json");
    await writeFile(path, JSON.stringify({ guard_id: `jwt#${AUTH_ISSUER}`, verify_payload: jwt, sign_payload: pending.payload, algorithm: "eddsa" }), { mode: 0o600 });
    const output = await runCli(["contract", "call-function", "as-transaction", AUTH_CONTRACT, "sign", "file-args", path, "prepaid-gas", "300 Tgas", "attached-deposit", "1 yoctoNEAR", "sign-as", sponsor, "network-config", "testnet", "sign-with-keychain", "send"]);
    const outcome = await extractOutcome(output, sponsor, AUTH_CONTRACT);
    if (typeof outcome.status?.SuccessValue !== "string" || !outcome.status.SuccessValue) throw new Error("NEAR Auth returned no signature.");
    return FastAuthSignature.fromBase64(outcome.status.SuccessValue).recover("ed25519");
  } finally { await rm(dir, { recursive: true, force: true }); }
}
async function ensureAccount(accountId: string, publicKey: string) {
  try { await chain("query", { request_type: "view_account", account_id: accountId, finality: "final" }); }
  catch (error) {
    if ((error as Error).message !== "UNKNOWN_ACCOUNT") throw error;
    const sponsor = process.env.TINYE_EMBEDDED_SPONSOR_ACCOUNT || "tinye.testnet";
    const balance = await chain("query", { request_type: "view_account", account_id: sponsor, finality: "final" });
    if (BigInt(balance.amount) < 2n * 10n ** 24n) throw new EmbeddedUnavailable("The testnet wallet sponsor needs funding before creating more wallets.");

    const sponsorAccount = await getSponsorAccount();
    if (sponsorAccount) {
      await sponsorAccount.signAndSendTransaction({
        receiverId: accountId,
        actions: [transactions.transfer(100000000000000000000000n)]
      });
    } else {
      const output = await runCli(["tokens", sponsor, "send-near", accountId, "0.1 NEAR", "network-config", "testnet", "sign-with-keychain", "send"]);
      await extractOutcome(output, sponsor, accountId);
    }
  }
  const access = await chain("query", { request_type: "view_access_key", account_id: accountId, public_key: publicKey, finality: "final" });
  if (access.permission !== "FullAccess") throw new Error("The created account could not authorise transactions.");
}
export async function completeEmbedded(jwt: string, pending: Pending, owner?: { accountId: string; publicKey: string; walletKind?: string } | null) {
  const user = await identity(jwt, pending);
  if (pending.kind === "transaction" && (!owner || owner.walletKind !== "embedded" || owner.accountId !== pending.accountId || owner.publicKey !== user.publicKey || pending.publicKey !== user.publicKey)) throw new Error("Wallet or session changed. Reconnect before signing.");
  // Serialise sponsor operations to avoid overlapping access-key nonces.
  const operation = state.queue.then(async () => {
    const signature = await sponsoredSignature(jwt, pending);
    const hash = new Uint8Array(createHash("sha256").update(new Uint8Array(pending.payload)).digest());
    if (!PublicKey.from(user.publicKey).verify(hash, signature)) throw new Error("The wallet signature could not be verified.");
    if (pending.kind === "onboard") { await ensureAccount(user.accountId, user.publicKey); return { ...user, walletKind: "embedded" as const }; }
    const tx = transactions.Transaction.decode(Buffer.from(pending.transaction!, "base64"));
    const signed = new transactions.SignedTransaction({ transaction: tx, signature: new transactions.Signature({ keyType: 0, data: signature }) });
    const result = await chain("broadcast_tx_commit", [Buffer.from(signed.encode()).toString("base64")]);
    if (!result.transaction?.hash) throw new Error("Transaction status is unknown. Reconcile before retrying.");
    return { transactionHash: result.transaction.hash };
  });
  state.queue = operation.catch(() => undefined);
  return operation;
}
