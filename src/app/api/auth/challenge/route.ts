import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { auth, createChallenge, randomId, sameOrigin, prune } from "@/server/session";
import { DatabaseUnavailable } from "@/server/database";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  prune();
  if (auth.challenges.size > 1000)
    return NextResponse.json({ error: "Try again later" }, { status: 429 });
  let accountId: unknown;
  try {
    const text = await request.text();
    if (text.length > 1024) throw new Error("Too large");
    accountId = JSON.parse(text).accountId;
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (
    typeof accountId !== "string" ||
    !/^(([a-z0-9]+[-_])*[a-z0-9]+\.)*([a-z0-9]+[-_])*[a-z0-9]+$/.test(
      accountId,
    ) ||
    accountId.length < 2 ||
    accountId.length > 64
  )
    return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
  const id = randomId(),
    nonce = randomBytes(32).toString("base64"),
    recipient = request.headers.get("origin")!;
  try { await createChallenge(id, {
    accountId,
    nonce,
    recipient,
    expires: Date.now() + 300000,
  }); } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseUnavailable ? error.message : "Authentication storage unavailable." }, { status: 503 });
  }
  const response = NextResponse.json({
    id,
    nonce,
    recipient,
    message: "Sign in to Tinye on NEAR testnet. This does not transfer funds.",
  });
  response.cookies.set("tinye_challenge", id, {
    httpOnly: true,
    sameSite: "strict",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: 300,
  });
  return response;
}
