import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const token = process.env.SUPABASE_ACCESS_TOKEN || "";
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const projectRef = /^https:\/\/([a-z0-9]+)\.supabase\.co\/?$/.exec(url)?.[1];
if (!projectRef || token.length < 20 || /[•*]|YOUR[-_ ]/i.test(token)) {
  console.error("Migration not applied: configure a valid SUPABASE_ACCESS_TOKEN locally and the Supabase project URL. Do not pass credentials in command-line arguments or chat.");
  process.exit(1);
}

const query = await readFile(fileURLToPath(new URL("../supabase/migrations/202611140001_tinye_profiles.sql", import.meta.url)), "utf8");
try {
  const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }), signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Supabase management API returned HTTP ${response.status}.`);
  // Deliberately never log the credential or provider response body.
  console.log(`Profile, metadata and hashed-session migration applied to ${projectRef}.`);
} catch (error) {
  console.error(error instanceof Error && /^Supabase management/.test(error.message) ? error.message : "Supabase migration request failed. No successful migration was verified.");
  process.exitCode = 1;
}
