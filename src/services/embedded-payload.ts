// NEP-413 Borsh layout, matching NEAR Auth's official Browser SDK reference.
export function encodeEmbeddedMessage(message: string, recipient: string, nonce: Uint8Array): number[] {
  if (nonce.length !== 32) throw new Error("A 32-byte authentication nonce is required.");
  const out: number[] = [];
  const u32 = (n: number) => out.push(n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255);
  const string = (value: string) => { const bytes = new TextEncoder().encode(value); u32(bytes.length); for (const b of bytes) out.push(b); };
  u32(2147484061); string(message); for (const b of nonce) out.push(b); string(recipient); out.push(0);
  return out;
}

export function matchesEmbeddedPayload(actual: unknown, expected: number[]): boolean {
  return Array.isArray(actual) && actual.length === expected.length && actual.every((n, i) => Number.isInteger(n) && n >= 0 && n <= 255 && n === expected[i]);
}
