import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNear, formatNear, inputNear } from "../src/services/near";
test("NEAR amounts preserve all 24 decimal places", () => {
  assert.equal(parseNear("1"), "1000000000000000000000000");
  assert.equal(parseNear("0.000000000000000000000001"), "1");
  assert.equal(
    inputNear("1000000000000000000000001"),
    "1.000000000000000000000001",
  );
});
test("unsafe and ambiguous monetary input rejected", () => {
  for (const value of [
    "-1",
    "0",
    "NaN",
    "Infinity",
    "1e3",
    "01",
    "1.0000000000000000000000001",
    " 1",
    "1,000",
  ])
    assert.throws(() => parseNear(value));
});
test("dust is never presented as zero", () => {
  assert.equal(formatNear("1"), "<0.0001");
  assert.equal(formatNear("0"), "0");
  assert.equal(formatNear("1234500000000000000000000"), "1.2345");
});
