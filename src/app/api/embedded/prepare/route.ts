import { NextResponse } from "next/server";
import { getSession, sameOrigin } from "@/server/session";
import { embeddedReady, EmbeddedUnavailable, makeOnboarding, prepareTransaction, rateLimit } from "@/server/embedded";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  try {
    rateLimit(request);
    await embeddedReady();
    if (Number(request.headers.get("content-length") || 0) > 8192) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const text = await request.text();
    if (text.length > 8192) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const body = JSON.parse(text);
    const owner = await getSession();
    if (body.kind === "transaction" && !owner) return NextResponse.json({ error: "Reconnect your wallet first." }, { status: 401 });
    if (!["onboard", "transaction"].includes(body.kind)) return NextResponse.json({ error: "Invalid wallet request." }, { status: 400 });
    const pending = body.kind === "onboard" ? makeOnboarding(request.headers.get("origin")!) : await prepareTransaction(owner!, body);
    const response = NextResponse.json({ id: pending.id, payload: pending.payload }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set("tinye_embedded_pending", pending.id, { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "strict", path: "/", maxAge: 300 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof EmbeddedUnavailable ? error.message : "Unable to prepare this wallet request. Verify your session, testnet configuration and signing limit." }, { status: error instanceof EmbeddedUnavailable ? 503 : 400 });
  }
}
