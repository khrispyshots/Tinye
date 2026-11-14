import { Goal, Transaction } from '../types';
import { view } from './near';
export type VerifiedContribution = { requestId: string; goalId: string; amount: string; timestamp: string };
export function contributionProof(candidate: Transaction, operation: any): VerifiedContribution|null {
  if(operation?.state !== 'Settled' || operation.kind !== 'Deposit' || operation.goal_id !== candidate.goalId || operation.amount !== candidate.amount || !/^\d+$/.test(operation.amount) || BigInt(operation.amount)<=BigInt(0))return null;
  return {requestId:candidate.id,goalId:operation.goal_id,amount:operation.amount,timestamp:operation.timestamp};
}
export function summarizeSavings(goals: Goal[], contributions: VerifiedContribution[]) {
  const unique = [...new Map(contributions.map(row => [row.requestId, row])).values()];
  const months = new Set(unique.map(row => new Date(Number(BigInt(row.timestamp) / BigInt(1000000))).toISOString().slice(0, 7)));
  const funded = goals.filter(goal => BigInt(goal.currentAmount) > BigInt(0));
  const reached = goals.filter(goal => BigInt(goal.currentAmount) >= BigInt(goal.targetAmount));
  return { createdGoals: goals.length, fundedGoals: funded.length, reachedGoals: reached.length, verifiedContributions: unique.length, activeMonths: months.size, contributions: unique };
}
/** Browser history supplies candidate IDs only. The contract independently proves eligibility. */
export async function loadSavingsInsights(owner: string, goals: Goal[], history: Transaction[]) {
  const candidates = [...new Map(history.filter(row => row.type === 'deposit').map(row => [row.id, row])).values()];
  const contributions: VerifiedContribution[] = [];
  for (let start=0;start<candidates.length;start+=8) {
    const verified=await Promise.all(candidates.slice(start,start+8).map(async candidate=>{
      const operation = await view('get_operation', { owner, request_id: candidate.id });
      return contributionProof(candidate,operation);
    }));
    for(const row of verified) if(row) contributions.push(row);
  }
  return summarizeSavings(goals, contributions);
}
export type SavingsInsights = ReturnType<typeof summarizeSavings>;
