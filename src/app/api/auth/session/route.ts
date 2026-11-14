import { NextResponse } from "next/server";
import { getSession } from "@/server/session";
import { databaseConfigured } from "@/server/database";
export const dynamic = "force-dynamic";
export async function GET() {
  const current = await getSession();
  return NextResponse.json(
    current
      ? { accountId: current.accountId, network: "testnet", walletKind: current.walletKind || "external", persistent: databaseConfigured() }
      : { accountId: null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
