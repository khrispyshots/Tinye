import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { encodeEmbeddedMessage, matchesEmbeddedPayload } from "../src/services/embedded-payload";

test("embedded authentication uses the exact NEP-413 signed payload", async () => {
  const { KeyPair, KeyPairSigner } = await import("near-api-js");
  const key = KeyPair.fromRandom("ed25519");
  const payload = { message: "Create my testnet wallet", recipient: "http://127.0.0.1:3010", nonce: new Uint8Array(32).fill(42) };
  const { signature } = await new KeyPairSigner(key).signNep413Message("test.testnet", payload);
  const hash = createHash("sha256").update(new Uint8Array(encodeEmbeddedMessage(payload.message, payload.recipient, payload.nonce))).digest();
  assert.equal(key.getPublicKey().verify(hash, signature), true);
});

test("approval payload binding rejects mutation, truncation and non-byte values", () => {
  const expected = [0, 128, 255];
  assert.equal(matchesEmbeddedPayload(expected, expected), true);
  for (const actual of [[0, 128], [0, 127, 255], [0, 128, 256], [0, 128, "255"], null, {}]) assert.equal(matchesEmbeddedPayload(actual, expected), false);
  assert.throws(() => encodeEmbeddedMessage("test", "tinye", new Uint8Array(31)), /32-byte/);
});
