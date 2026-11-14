import { NextResponse } from "next/server";
import { getSession, sameOrigin } from "@/server/session";
import { DatabaseUnavailable, readProfile, saveProfile } from "@/server/database";
import { validateProfile } from "@/server/database-validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const response = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const current = await getSession();
  if (!current) return response({ error: "Verify your wallet first." }, 401);
  try {
    return response({ profile: await readProfile(current.accountId), persistent: true });
  } catch (error) {
    return response({ error: error instanceof DatabaseUnavailable ? error.message : "Profile could not be loaded.", persistent: false }, 503);
  }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return response({ error: "Origin rejected." }, 403);
  const current = await getSession();
  if (!current) return response({ error: "Verify your wallet first." }, 401);
  let values;
  try {
    const text = await request.text();
    if (text.length > 4096) throw new Error("Profile is too large.");
    values = validateProfile(JSON.parse(text));
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : "Invalid profile." }, 400);
  }
  try {
    return response({ profile: await saveProfile(current.accountId, values), persistent: true });
  } catch (error) {
    return response({ error: error instanceof DatabaseUnavailable ? error.message : "Profile could not be saved.", persistent: false }, 503);
  }
}
