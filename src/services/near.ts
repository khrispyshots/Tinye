export const NETWORK = "testnet" as const;
export const RPC_URL =
  process.env.NEXT_PUBLIC_NEAR_RPC_URL || "https://test.rpc.fastnear.com";
export const EXPLORER = "https://testnet.nearblocks.io";
export const SAVINGS_CONTRACT =
  process.env.NEXT_PUBLIC_TINYE_SAVINGS_CONTRACT || "";
const UNIT = BigInt("1000000000000000000000000");
export function parseNear(value: string): string {
  if (!/^(0|[1-9]\d*)(\.\d{1,24})?$/.test(value))
    throw new Error(
      "Enter a positive NEAR amount with at most 24 decimal places.",
    );
  const [whole, fraction = ""] = value.split(".");
  const amount = BigInt(whole) * UNIT + BigInt(fraction.padEnd(24, "0"));
  if (
    amount <= BigInt(0) ||
    amount > BigInt("340282366920938463463374607431768211455")
  )
    throw new Error("Amount is outside the supported range.");
  return amount.toString();
}
export function formatNear(units: string, digits = 4): string {
  const amount = BigInt(units || "0");
  const fractional = (amount % UNIT)
    .toString()
    .padStart(24, "0")
    .slice(0, digits)
    .replace(/0+$/, "");
  if (amount > BigInt(0) && amount < UNIT && !fractional)
    return "<0." + "0".repeat(digits - 1) + "1";
  return (
    (amount / UNIT).toLocaleString("en-US") +
    (fractional ? "." + fractional : "")
  );
}
export function inputNear(units: string): string {
  const amount = BigInt(units);
  const f = (amount % UNIT).toString().padStart(24, "0").replace(/0+$/, "");
  return (amount / UNIT).toString() + (f ? "." + f : "");
}
export async function rpc(method: string, params: object | unknown[]) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: "tinye", method, params }),
    signal: AbortSignal.timeout(20000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("NEAR RPC unavailable. Please retry.");
  const data = await response.json();
  if (data.error)
    throw new Error(
      data.error.cause?.name || data.error.message || "NEAR RPC request failed",
    );
  return data.result;
}
let networkCheckedAt = 0;
export async function ensureTestnet() {
  if (Date.now() - networkCheckedAt < 30000) return;
  const status = await rpc("status", []);
  if (status.chain_id !== "testnet")
    throw new Error("Wrong NEAR network. Only testnet is enabled.");
  networkCheckedAt = Date.now();
}
export async function view(method_name: string, args: object = {}) {
  await ensureTestnet();
  if (!SAVINGS_CONTRACT)
    throw new Error("Savings contract is not deployed/configured yet.");
  const bytes = new TextEncoder().encode(JSON.stringify(args));
  const result = await rpc("query", {
    request_type: "call_function",
    finality: "final",
    account_id: SAVINGS_CONTRACT,
    method_name,
    args_base64: btoa(
      Array.from(bytes, (c) => String.fromCharCode(c)).join(""),
    ),
  });
  return JSON.parse(new TextDecoder().decode(new Uint8Array(result.result)));
}
let connectorPromise:
  Promise<import("@hot-labs/near-connect").NearConnector> | undefined;
let activeWalletKind: 'external' | 'embedded' = 'external';
export function setWalletKind(kind: 'external' | 'embedded') { activeWalletKind = kind; }
export function getWalletKind() { return activeWalletKind; }
export function openWalletApproval(): Window | undefined {
  if (activeWalletKind !== 'embedded') return undefined;
  const popup = window.open('', 'tinye-near-auth', 'width=480,height=720,popup=yes');
  if (!popup) throw new Error('Allow the wallet approval popup and try again.');
  return popup;
}
export async function connector() {
  if (typeof window === "undefined")
    throw new Error("Wallet connection is available in the browser only.");
  connectorPromise ||= import("@hot-labs/near-connect").then(
    ({ NearConnector }) =>
      new NearConnector({
        network: NETWORK,
        features: { testnet: true, signMessage: true },
        autoConnect: false,
      }),
  );
  return connectorPromise;
}
export async function accountBalance(accountId: string) {
  await ensureTestnet();
  const [account, protocol] = await Promise.all([
    rpc("query", {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    }),
    rpc("EXPERIMENTAL_protocol_config", { finality: "final" }),
  ]);
  const available =
    BigInt(account.amount) -
    BigInt(account.storage_usage) *
      BigInt(protocol.runtime_config.storage_amount_per_byte);
  return {
    total: account.amount as string,
    available: (available > BigInt(0) ? available : BigInt(0)).toString(),
    blockHeight: account.block_height,
  };
}
export type ChainReceipt = {
  transactionHash: string;
  explorerUrl: string;
  blockHeight: number;
  gasBurnedTgas?: number;
  status: "SUCCESS_VALUE";
};
export class FailedTransaction extends Error {
  constructor(public transactionHash: string) {
    super("NEAR transaction execution failed. No success was recorded.");
  }
}
export class UnknownTransaction extends Error {
  constructor(public transactionHash?: string) {
    super(
      "Transaction status is unknown. Refresh to reconcile; do not submit again.",
    );
  }
}
export async function verifyTransaction(
  hash: string,
  signer: string,
  receiver: string,
): Promise<ChainReceipt> {
  let outcome: any;
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      outcome = await rpc("tx", {
        tx_hash: hash,
        sender_account_id: signer,
        wait_until: "FINAL",
      });
      if (outcome.final_execution_status === "FINAL") break;
    } catch {
      /* retain unknown */
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  if (!outcome || outcome.final_execution_status !== "FINAL")
    throw new UnknownTransaction(hash);
  if (
    outcome.transaction.signer_id !== signer ||
    outcome.transaction.receiver_id !== receiver
  )
    throw new Error("Transaction identity did not match the reviewed request.");
  if (
    outcome.status?.Failure ||
    outcome.receipts_outcome?.some((r: any) => r.outcome.status?.Failure)
  )
    throw new FailedTransaction(hash);
  const block = await rpc("block", {
    block_id: outcome.transaction_outcome.block_hash,
  });
  return {
    transactionHash: hash,
    explorerUrl: `${EXPLORER}/txns/${hash}`,
    blockHeight: block.header.height,
    status: "SUCCESS_VALUE",
  };
}
export async function signCall(
  accountId: string,
  methodName: string,
  args: object,
  deposit: string,
  approval?: Window,
) {
  await ensureTestnet();
  if (!SAVINGS_CONTRACT) throw new Error("Savings contract is not configured.");
  if (activeWalletKind === 'embedded') {
    const { signEmbeddedCall } = await import('./embedded');
    const result = await signEmbeddedCall(accountId, methodName, args, deposit, approval);
    return verifyTransaction(result.transactionHash, accountId, SAVINGS_CONTRACT);
  }
  const wallet = await (await connector()).wallet();
  const accounts = await wallet.getAccounts();
  if (accounts[0]?.accountId !== accountId)
    throw new Error(
      "Wallet changed. Connect and authorise this account again.",
    );
  const outcome = await wallet.signAndSendTransaction({
    network: NETWORK,
    signerId: accountId,
    receiverId: SAVINGS_CONTRACT,
    actions: [
      {
        type: "FunctionCall",
        params: { methodName, args, gas: "100000000000000", deposit },
      },
    ],
  });
  const hash = outcome?.transaction?.hash;
  if (!hash) throw new UnknownTransaction();
  return verifyTransaction(hash, accountId, SAVINGS_CONTRACT);
}
