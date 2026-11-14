import { rpc, view, signCall, parseNear, SAVINGS_CONTRACT } from "./near";
export const CONTRACT_ID = SAVINGS_CONTRACT;
export const contractClient = {
  async getRpcStatus() {
    const s = await rpc("status", []);
    return {
      chainId: s.chain_id,
      latestBlockHeight: s.sync_info.latest_block_height,
      syncing: s.sync_info.syncing,
    };
  },
  async getVaultTotals() {
    const v = await view("get_vault_totals");
    return {
      totalLiabilitiesNear: v[0],
      totalReservedNear: v[1],
      isPaused: v[2],
    };
  },
  submitDepositTransaction: (owner: string, goal: string, amount: string) =>
    signCall(
      owner,
      "deposit_native",
      {
        goal_id: goal,
        request_id: crypto.randomUUID(),
        amount: parseNear(amount),
      },
      (BigInt(parseNear(amount)) + BigInt(parseNear("0.01"))).toString(),
    ),
  submitWithdrawalTransaction: (owner: string, goal: string, amount: string) =>
    signCall(
      owner,
      "withdraw",
      {
        goal_id: goal,
        amount: parseNear(amount),
        request_id: crypto.randomUUID(),
      },
      "1",
    ),
};
