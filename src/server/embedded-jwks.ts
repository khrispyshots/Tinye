import https from "node:https";

const HOST = "login.testnet.fast-auth.com";
const PATH = "/.well-known/jwks.json";
let cached: { address: string; expires: number } | undefined;

// Application-scoped DNS recovery only. The HTTPS certificate and JWT issuer
// remain validated for the original provider hostname; OS DNS is unchanged.
async function publicAddress() {
  if (cached && cached.expires > Date.now()) return cached.address;
  for (const resolver of ["https://dns.google/resolve", "https://cloudflare-dns.com/dns-query"]) {
    try {
      const url = new URL(resolver); url.searchParams.set("name", HOST); url.searchParams.set("type", "A");
      const response = await fetch(url, { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(5000), cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      const answer = data.Status === 0 && data.Answer?.find((a: any) => a.type === 1 && typeof a.data === "string" && /^(?:\d{1,3}\.){3}\d{1,3}$/.test(a.data));
      if (answer) { cached = { address: answer.data, expires: Date.now() + 60000 }; return answer.data as string; }
    } catch { /* try the independent resolver */ }
  }
  throw new Error("The NEAR Auth verification service could not be resolved.");
}

export async function fetchEmbeddedJwks(url: string, options?: RequestInit): Promise<Response> {
  const target = new URL(url);
  if (target.protocol !== "https:" || target.hostname !== HOST || target.pathname !== PATH || target.search) throw new Error("Unexpected wallet verification endpoint.");
  try { return await fetch(url, options); }
  catch (error) {
    const code = (error as Error & { cause?: { code?: string } }).cause?.code;
    if (!["EAI_AGAIN", "ENOTFOUND"].includes(code || "")) throw error;
  }
  const address = await publicAddress();
  return new Promise((resolve, reject) => {
    const request = https.get(target, {
      servername: HOST,
      rejectUnauthorized: true,
      family: 4,
      lookup: (_hostname, _options, callback) => callback(null, address, 4),
      headers: { Accept: "application/json" },
      timeout: 8000,
    }, (response) => {
      const chunks: Buffer[] = []; let length = 0;
      response.on("data", (chunk: Buffer) => {
        length += chunk.length;
        if (length > 65536) { request.destroy(new Error("Wallet verification response exceeded its limit.")); return; }
        chunks.push(chunk);
      });
      response.on("error", reject);
      response.on("end", () => resolve(new Response(Buffer.concat(chunks).toString("utf8"), { status: response.statusCode || 502, headers: { "Content-Type": "application/json" } })));
    });
    request.on("timeout", () => request.destroy(new Error("Wallet verification service timed out.")));
    request.on("error", reject);
    if (options?.signal) {
      const abort = () => request.destroy(new Error("Wallet verification request aborted."));
      if (options.signal.aborted) abort();
      else { options.signal.addEventListener("abort", abort, { once: true }); request.on("close", () => options.signal?.removeEventListener("abort", abort)); }
    }
  });
}
