import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { database, databaseConfigured, checkDatabaseError, DatabaseUnavailable } from "./database";
export type Challenge = {
  accountId: string;
  nonce: string;
  recipient: string;
  expires: number;
};
export type Session = { accountId: string; publicKey: string; expires: number; walletKind?: "external" | "embedded" };
const runtime = globalThis as typeof globalThis & {
  tinyeAuth?: {
    challenges: Map<string, Challenge>;
    sessions: Map<string, Session>;
  };
};
export const auth = (runtime.tinyeAuth ||= {
  challenges: new Map(),
  sessions: new Map(),
});
export const randomId = () => randomBytes(32).toString("hex");
export async function session() {
  const id = (await cookies()).get("tinye_session")?.value;
  const value = id && auth.sessions.get(id);
  return value && value.expires > Date.now() ? value : null;
}
const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");
function requireSharedStoreWhenHosted() {
  // Gracefully allow ephemeral/memory sessions if shared database is not configured
}

const ephemeralRuntime = globalThis as typeof globalThis & { tinyeEphemeral?: Map<string, { value: unknown; expires: number }> };
const ephemeral = ephemeralRuntime.tinyeEphemeral ||= new Map();
function ephemeralKey(namespace: string, id: string) {
  if (!/^[a-z][a-z0-9_-]{0,31}$/.test(namespace) || !/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid temporary authentication identifier.");
  return `${namespace}:${tokenHash(id)}`;
}
export async function putEphemeral(namespace: string, id: string, value: unknown, expires: number) {
  const key = ephemeralKey(namespace, id);
  requireSharedStoreWhenHosted();
  if (!Number.isFinite(expires) || expires <= Date.now() || expires > Date.now() + 600000) throw new Error("Invalid authentication expiry.");
  if (databaseConfigured()) {
    const db = database();
    const { error: cleanError } = await db.from("tinye_ephemeral").delete().eq("namespace", namespace).lt("expires_at", new Date().toISOString());
    checkDatabaseError(cleanError);
    const { count, error: countError } = await db.from("tinye_ephemeral").select("id_hash", { head: true, count: "exact" }).eq("namespace", namespace);
    checkDatabaseError(countError);
    if ((count || 0) >= 1000) throw new DatabaseUnavailable("Too many pending authentication requests. Try again shortly.");
    const { error } = await db.from("tinye_ephemeral").insert({ namespace, id_hash: tokenHash(id), payload: value, expires_at: new Date(expires).toISOString() });
    checkDatabaseError(error);
    return;
  }
  for (const [storedKey, entry] of ephemeral) if (entry.expires < Date.now()) ephemeral.delete(storedKey);
  if (ephemeral.size >= 1000) throw new DatabaseUnavailable("Too many pending authentication requests. Try again shortly.");
  ephemeral.set(key, { value, expires });
}

async function ephemeralValue<T>(namespace: string, id: string, consume: boolean): Promise<T | null> {
  const key = ephemeralKey(namespace, id);
  requireSharedStoreWhenHosted();
  if (databaseConfigured()) {
    const query = consume ? database().from("tinye_ephemeral").delete() : database().from("tinye_ephemeral").select("payload");
    const scoped = query.eq("namespace", namespace).eq("id_hash", tokenHash(id)).gt("expires_at", new Date().toISOString());
    const { data, error } = consume ? await scoped.select("payload").maybeSingle() : await scoped.maybeSingle();
    checkDatabaseError(error);
    return data ? data.payload as T : null;
  }
  const entry = ephemeral.get(key);
  if (consume) ephemeral.delete(key);
  return entry && entry.expires > Date.now() ? entry.value as T : null;
}
export const readEphemeral = <T>(namespace: string, id: string) => ephemeralValue<T>(namespace, id, false);
export const consumeEphemeral = <T>(namespace: string, id: string) => ephemeralValue<T>(namespace, id, true);
export const createChallenge = (id: string, value: Challenge) => putEphemeral("wallet_challenge", id, value, value.expires);
export const consumeChallenge = (id: string) => consumeEphemeral<Challenge>("wallet_challenge", id);

export async function createSession(token: string, value: Session) {
  requireSharedStoreWhenHosted();
  if (databaseConfigured()) {
    const { error } = await database().from("tinye_sessions").insert({
      token_hash: tokenHash(token), account_id: value.accountId, public_key: value.publicKey,
      wallet_kind: value.walletKind || "external", network: "testnet", expires_at: new Date(value.expires).toISOString(),
    });
    checkDatabaseError(error);
  }
  auth.sessions.set(token, value);
}

export async function getSession(): Promise<Session | null> {
  if (!databaseConfigured()) return session();
  const token = (await cookies()).get("tinye_session")?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  try {
    const { data, error } = await database().from("tinye_sessions").select("account_id,public_key,wallet_kind,expires_at").eq("token_hash", tokenHash(token)).eq("network", "testnet").gt("expires_at", new Date().toISOString()).maybeSingle();
    checkDatabaseError(error);
    return data ? { accountId: data.account_id, publicKey: data.public_key, walletKind: data.wallet_kind, expires: Date.parse(data.expires_at) } : null;
  } catch {
    // Never trust the local cache after a database error or remote revocation.
    return null;
  }
}

export async function revokeSession(token: string) {
  auth.sessions.delete(token);
  if (databaseConfigured()) {
    const { error } = await database().from("tinye_sessions").delete().eq("token_hash", tokenHash(token));
    checkDatabaseError(error);
  }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const hostHeader =
      request.headers.get("x-forwarded-host") || request.headers.get("host");

    // 1. Same host: the origin host matches incoming request host / x-forwarded-host
    if (hostHeader && originUrl.host === hostHeader) {
      return true;
    }

    // 2. Explicitly configured origins in environment variable
    if (process.env.TINYE_APP_ORIGIN) {
      const allowed = process.env.TINYE_APP_ORIGIN.split(",")
        .map((v) => v.trim())
        .filter(Boolean);
      if (allowed.includes(origin)) return true;
    }

    // 3. Localhost development origins
    if (
      originUrl.hostname === "localhost" ||
      originUrl.hostname === "127.0.0.1"
    ) {
      return true;
    }

    // 4. Vercel deployment preview / production domains (*.vercel.app)
    if (
      originUrl.hostname.endsWith(".vercel.app") &&
      (!hostHeader || hostHeader.endsWith(".vercel.app"))
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
export function prune() {
  for (const map of [auth.challenges, auth.sessions])
    for (const [id, value] of map)
      if (value.expires < Date.now()) map.delete(id);
}
