import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeSession, sameOrigin } from "@/server/session";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  const id = (await cookies()).get("tinye_session")?.value;
  let revoked = true;
  try { if (id) await revokeSession(id); } catch { revoked = false; }
  const response = NextResponse.json(revoked ? { ok: true } : { error: "Session cookie cleared. Remote session revocation could not be confirmed; it expires within 30 minutes." }, { status: revoked ? 200 : 503 });
  response.cookies.delete("tinye_session");
  return response;
}
