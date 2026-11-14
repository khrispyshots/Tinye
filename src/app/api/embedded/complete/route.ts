import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, sameOrigin, createSession, revokeSession, randomId } from "@/server/session";
import { completeEmbedded, consumePending, EmbeddedUnavailable, rateLimit } from "@/server/embedded";
export const runtime = "nodejs";
export const maxDuration = 180;
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  try {
    rateLimit(request);
    const text = await request.text();
    if (text.length > 12000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const { id, jwt } = JSON.parse(text);
    if (typeof id !== "string" || (await cookies()).get("tinye_embedded_pending")?.value !== id) return NextResponse.json({ error: "Wallet approval cookie is missing or mismatched." }, { status: 401 });
    const pending = consumePending(id);
    const owner = await getSession();
    const result = await completeEmbedded(jwt, pending, owner);
    const response = NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
    response.cookies.delete("tinye_embedded_pending");
    if ("accountId" in result) {
      const previous = (await cookies()).get("tinye_session")?.value;
      if (previous) await revokeSession(previous);
      const token = randomId();
      await createSession(token, { accountId: result.accountId, publicKey: result.publicKey, walletKind: "embedded", expires: Date.now() + 1800000 });
      response.cookies.set("tinye_session", token, { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "strict", path: "/", maxAge: 1800 });
    }
    return response;
  } catch (error) {
    // Approval JWTs and provider diagnostics are intentionally never logged.
    return NextResponse.json({ error: error instanceof EmbeddedUnavailable ? error.message : "Wallet approval could not be verified or its testnet operation is unresolved. Check your account before retrying; no financial success was recorded." }, { status: error instanceof EmbeddedUnavailable ? 503 : 401 });
  }
}
