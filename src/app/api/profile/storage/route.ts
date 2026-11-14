import { NextResponse } from "next/server";
import { databaseDiagnostic } from "@/server/database";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await databaseDiagnostic(), { headers: { "Cache-Control": "no-store" } });
}
