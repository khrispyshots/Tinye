import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyMessage } from "near-api-js/nep413";
import { JsonRpcProvider } from "near-api-js";
import { consumeChallenge, createSession, revokeSession, randomId, sameOrigin } from "@/server/session";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  try {
    const { id, accountId, publicKey, signature } = await request.json();
    if (typeof id !== "string" || (await cookies()).get("tinye_challenge")?.value !== id) throw new Error("Challenge cookie mismatched");
    const challenge = await consumeChallenge(id);
    if (
      !challenge ||
      (await cookies()).get("tinye_challenge")?.value !== id ||
      challenge.expires < Date.now() ||
      challenge.accountId !== accountId
    )
      throw new Error("Challenge expired or mismatched");
    const provider = new JsonRpcProvider({
      url:
        process.env.NEXT_PUBLIC_NEAR_RPC_URL || "https://rpc.testnet.near.org",
    });
    await verifyMessage({
      signerAccountId: accountId,
      signerPublicKey: publicKey,
      signature: new Uint8Array(Buffer.from(signature, "base64")),
      payload: {
        message:
          "Sign in to Tinye on NEAR testnet. This does not transfer funds.",
        recipient: challenge.recipient,
        nonce: new Uint8Array(Buffer.from(challenge.nonce, "base64")),
      },
      provider,
    });
    const access = await provider.query<any>({
      request_type: "view_access_key",
      finality: "final",
      account_id: accountId,
      public_key: publicKey,
    });
    if (access.permission !== "FullAccess")
      throw new Error("Full-access proof required");
    const previous = (await cookies()).get("tinye_session")?.value;
    if (previous) await revokeSession(previous);
    const token = randomId();
    await createSession(token, {
      accountId,
      publicKey,
      expires: Date.now() + 1800000,
      walletKind: "external",
    });
    const response = NextResponse.json({ accountId, network: "testnet" });
    response.cookies.set("tinye_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: new URL(request.url).protocol === "https:",
      path: "/",
      maxAge: 1800,
    });
    response.cookies.delete("tinye_challenge");
    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Wallet ownership verification failed. Reconnect and try again.",
      },
      { status: 401 },
    );
  }
}
