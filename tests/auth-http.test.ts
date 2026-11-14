import { test } from "node:test";
import assert from "node:assert/strict";
const origin = process.env.TINYE_APP_ORIGIN || "http://127.0.0.1:3005";
test("session starts without an authenticated identity", async () => {
  const r = await fetch(origin + "/api/auth/session");
  assert.equal(r.status, 200);
  assert.equal((await r.json()).accountId, null);
});
test("cross-origin challenge is rejected", async () => {
  const r = await fetch(origin + "/api/auth/challenge", {
    method: "POST",
    headers: {
      Origin: "https://attacker.invalid",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId: "tinye.testnet" }),
  });
  assert.equal(r.status, 403);
});
test("invalid account IDs cannot create challenges", async () => {
  const r = await fetch(origin + "/api/auth/challenge", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify({ accountId: "INVALID ACCOUNT" }),
  });
  assert.equal(r.status, 400);
});
test("forged ownership proof and replay are rejected", async () => {
  const r = await fetch(origin + "/api/auth/challenge", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify({ accountId: "tinye.testnet" }),
  });
  assert.equal(r.status, 200);
  const challenge = await r.json();
  const cookie = r.headers.get("set-cookie")!.split(";")[0];
  const request = {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify({
      id: challenge.id,
      accountId: "tinye.testnet",
      publicKey: "ed25519:invalid",
      signature: "invalid",
    }),
  };
  assert.equal((await fetch(origin + "/api/auth/verify", request)).status, 401);
  assert.equal((await fetch(origin + "/api/auth/verify", request)).status, 401);
});
