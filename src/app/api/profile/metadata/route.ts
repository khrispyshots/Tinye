import { NextResponse } from "next/server";
import { getSession, sameOrigin } from "@/server/session";
import { database, checkDatabaseError, DatabaseUnavailable } from "@/server/database";
import { validateGoalMetadata } from "@/server/database-validation";
import { view, SAVINGS_CONTRACT } from "@/services/near";

export const dynamic = "force-dynamic";
const response = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const current = await getSession();
  if (!current) return response({ error: "Verify your wallet first." }, 401);
  try {
    const { data, error } = await database().from("tinye_goal_metadata").select("goal_id,name,category,notes").eq("account_id", current.accountId).eq("network", "testnet").eq("contract_id", SAVINGS_CONTRACT);
    checkDatabaseError(error);
    return response({ metadata: Object.fromEntries((data || []).map(row => [row.goal_id, { name: row.name, category: row.category, notes: row.notes }])), persistent: true });
  } catch (error) {
    return response({ error: error instanceof DatabaseUnavailable ? error.message : "Goal labels could not be loaded.", persistent: false }, 503);
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return response({ error: "Origin rejected." }, 403);
  const current = await getSession();
  if (!current) return response({ error: "Verify your wallet first." }, 401);
  let metadata;
  try {
    const text = await request.text();
    if (text.length > 8192) throw new Error("Goal metadata is too large.");
    metadata = validateGoalMetadata(JSON.parse(text));
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : "Invalid goal labels." }, 400);
  }
  try {
    database(); // fail before RPC if storage is not configured
    const goal = await view("get_goal", { goal_id: metadata.goal_id });
    if (goal?.owner !== current.accountId) return response({ error: "This wallet does not own the goal." }, 403);
    const { error } = await database().from("tinye_goal_metadata").upsert({ account_id: current.accountId, network: "testnet", contract_id: SAVINGS_CONTRACT, ...metadata, updated_at: new Date().toISOString() }, { onConflict: "account_id,network,contract_id,goal_id" });
    checkDatabaseError(error);
    return response({ saved: true, persistent: true });
  } catch (error) {
    return response({ error: error instanceof DatabaseUnavailable ? error.message : "Goal labels could not be saved. Your on-chain goal is unchanged.", persistent: false }, 503);
  }
}
