import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// This module is server-only. Never import it into a client component.
export class DatabaseUnavailable extends Error {
  constructor(message = "Profile storage is not configured. Your savings remain on NEAR testnet.") {
    super(message);
    this.name = "DatabaseUnavailable";
  }
}

export function databaseConfigured() {
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return !!(process.env.SUPABASE_URL && key.length > 20 && !/[•*]|YOUR[-_ ]/i.test(key));
}

let client: SupabaseClient | undefined;
export function database() {
  if (!databaseConfigured()) throw new DatabaseUnavailable();
  client ||= createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(10000), cache: "no-store" }) },
  });
  return client;
}

export function checkDatabaseError(error: { message?: string } | null) {
  // Do not expose provider internals, credentials or schema details to clients.
  if (error) throw new DatabaseUnavailable("Profile storage is temporarily unavailable. No changes were saved.");
}

export type ProfilePreferences = { notifications: boolean; reducedMotion: boolean };
export type StoredProfile = {
  account_id: string;
  network: "testnet";
  display_name: string;
  preferences: ProfilePreferences;
  created_at: string;
  updated_at: string;
};

export async function readProfile(accountId: string): Promise<StoredProfile | null> {
  const { data, error } = await database().from("tinye_profiles").select("account_id,network,display_name,preferences,created_at,updated_at").eq("account_id", accountId).eq("network", "testnet").maybeSingle();
  checkDatabaseError(error);
  return data;
}

export async function saveProfile(accountId: string, values: { display_name: string; preferences: ProfilePreferences }) {
  const { data, error } = await database().from("tinye_profiles").upsert({ account_id: accountId, network: "testnet", ...values, updated_at: new Date().toISOString() }, { onConflict: "account_id,network" }).select("account_id,network,display_name,preferences,created_at,updated_at").single();
  checkDatabaseError(error);
  return data as StoredProfile;
}

export async function databaseDiagnostic() {
  if (!databaseConfigured()) return { configured: false, ready: false, reason: "A complete server-side Supabase secret key is required." };
  try {
    const results = await Promise.all(["tinye_profiles", "tinye_goal_metadata", "tinye_sessions", "tinye_ephemeral"].map(table => database().from(table).select("*", { head: true }).limit(0)));
    const failed = results.some(result => result.error);
    return { configured: true, ready: !failed, reason: failed ? "Apply the Supabase migration and verify server credentials." : null };
  } catch {
    return { configured: true, ready: false, reason: "Supabase could not be reached." };
  }
}
