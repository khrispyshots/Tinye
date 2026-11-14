import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarizeSavings, contributionProof } from '../src/services/savings-insights';
import { Goal, Transaction } from '../src/types';
const goal = (id:string,current:string,target:string):Goal=>({id,name:id,category:'custom',currentAmount:current,targetAmount:target,asset:'NEAR',createdAt:'2026-11-01',status:'active'});
test('recognition uses integer balances and current target evidence, never display status',()=>{const data=summarizeSavings([goal('a','1','100'),goal('b','100','100'),goal('c','0','100')],[]);assert.equal(data.createdGoals,3);assert.equal(data.fundedGoals,2);assert.equal(data.reachedGoals,1);});
test('duplicate contribution IDs do not inflate counts and UTC months derive from chain time',()=>{const timestamp=(BigInt(Date.parse('2026-11-01T00:00:00Z'))*BigInt(1000000)).toString();const row={requestId:'settled-1',goalId:'a',amount:'1',timestamp};const data=summarizeSavings([],[row,row,{...row,requestId:'settled-2'}]);assert.equal(data.verifiedContributions,2);assert.equal(data.activeMonths,1);});
test('a forged local confirmed flag cannot earn recognition without matching settled contract proof',()=>{
  const candidate={id:'d1',type:'deposit',goalId:'a',amount:'100',status:'confirmed'} as Transaction;
  const operation={goal_id:'a',amount:'100',kind:'Deposit',state:'Settled',timestamp:'1'};
  assert.equal(contributionProof(candidate,null),null);
  assert.equal(contributionProof(candidate,{...operation,state:'PendingReservation'}),null);
  assert.equal(contributionProof(candidate,{...operation,kind:'Withdrawal'}),null);
  assert.equal(contributionProof(candidate,{...operation,amount:'101'}),null);
  assert.equal(contributionProof(candidate,{...operation,goal_id:'someone-else'}),null);
  assert.equal(contributionProof(candidate,operation)?.requestId,'d1');
});
