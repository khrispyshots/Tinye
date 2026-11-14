import { test } from "node:test";
import assert from "node:assert/strict";

const origin = process.env.TINYE_APP_ORIGIN || "http://127.0.0.1:3010";
const request = (path: string, init: RequestInit = {}) => fetch(origin + path, { ...init, signal: AbortSignal.timeout(20000) });

test("private profile and goal metadata cannot be read without wallet ownership", async () => {
  for (const path of ["/api/profile", "/api/profile/metadata"]) {
    const response = await request(path);
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(typeof (await response.json()).error, "string");
  }
});

test("cross-origin profile and metadata writes fail before persistence", async () => {
  for (const [path, method] of [["/api/profile", "PATCH"], ["/api/profile/metadata", "POST"]]) {
    const response = await request(path, {
      method,
      headers: { Origin: "https://attacker.invalid", "Content-Type": "application/json" },
      body: JSON.stringify({ accountId: "victim.testnet", displayName: "Changed" }),
    });
    assert.equal(response.status, 403);
  }
});

test("same-origin writes still require verified wallet identity", async () => {
  for (const [path, method] of [["/api/profile", "PATCH"], ["/api/profile/metadata", "POST"]]) {
    const response = await request(path, {
      method,
      headers: { Origin: origin, "Content-Type": "application/json" },
      body: JSON.stringify({ accountId: "victim.testnet" }),
    });
    assert.equal(response.status, 401);
  }
});

test("storage readiness exposes only readiness, never credentials or private rows", async () => {
  const response = await request("/api/profile/storage");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const value = await response.json();
  assert.deepEqual(Object.keys(value).sort(), ["configured", "ready", "reason"]);
  assert.equal(typeof value.configured, "boolean");
  assert.equal(typeof value.ready, "boolean");
  if (!value.configured) assert.equal(value.ready, false);
});
