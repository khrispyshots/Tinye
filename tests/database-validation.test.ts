import test from "node:test";
import assert from "node:assert/strict";
import { validateGoalMetadata, validateProfile } from "../src/server/database-validation";

test("profile writes cannot inject account identities, balances or administrative fields", () => {
  const base = { displayName: "Chidi", preferences: { notifications: false, reducedMotion: true } };
  assert.deepEqual(validateProfile({ ...base, displayName: "  Chidi  " }), { display_name: "Chidi", preferences: base.preferences });
  for (const key of ["accountId", "account_id", "balance", "points", "admin", "walletKind"])
    assert.throws(() => validateProfile({ ...base, [key]: "attacker.testnet" }));
  assert.throws(() => validateProfile({ ...base, displayName: " " }));
  assert.throws(() => validateProfile({ ...base, preferences: { notifications: "yes", reducedMotion: false } }));
  assert.throws(() => validateProfile({ ...base, preferences: { ...base.preferences, admin: true } }));
});

test("goal labels cannot supply financial state or another owner", () => {
  const base = { goalId: "goal-123", name: "Emergency fund", category: "emergency" };
  assert.deepEqual(validateGoalMetadata(base), { goal_id: "goal-123", name: "Emergency fund", category: "emergency", notes: "" });
  for (const key of ["accountId", "owner", "currentAmount", "amount", "contractId", "confirmed_liability"])
    assert.throws(() => validateGoalMetadata({ ...base, [key]: "attacker.testnet" }));
  assert.throws(() => validateGoalMetadata({ ...base, goalId: "a/b" }));
  assert.throws(() => validateGoalMetadata({ ...base, notes: "x".repeat(1001) }));
  assert.throws(() => validateGoalMetadata({ ...base, category: "yield" }));
});
