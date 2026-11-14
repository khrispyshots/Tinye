'use client';
import {formatNear} from '../services/near';


import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Receipt
} from 'lucide-react';

export const ActivityView: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'deposits' | 'withdrawals' | 'demo'>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'deposits') return tx.type === 'deposit';
    if (filter === 'withdrawals') return tx.type === 'withdrawal';
    if (filter === 'demo') return tx.type === 'simulated_bank_deposit';
    return true;
  });

  const getTxIcon = (tx: Transaction) => {
    switch (tx.type) {
      case 'deposit':
        return (
          <div className="w-11 h-11 rounded-[14px] bg-[#E3EDDA] text-[#2D5A27] flex items-center justify-center shrink-0">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
        );
      case 'withdrawal':
        return (
          <div className="w-11 h-11 rounded-[14px] bg-[#FFF4E5] text-[#B76E00] flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        );
      case 'simulated_bank_deposit':
        return (
          <div className="w-11 h-11 rounded-[14px] bg-[#F2F5F0] text-[#1A1B1E] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        );
    }
  };

  const getTxTitle = (tx: Transaction) => {
    switch (tx.type) {
      case 'deposit':
        return `Deposit to ${tx.goalName || 'Goal'}`;
      case 'withdrawal':
        return `Withdrawal from ${tx.goalName || 'Goal'}`;
      case 'simulated_bank_deposit':
        return `Simulated Bank Deposit (${tx.fiatCurrency || 'Demo'})`;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1B1E]">
          Activity
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] mt-1">
          Immutable ledger of verified testnet deposits, withdrawals, and demo transfers
        </p>
      </div>

      <p className="state-notice">History covers savings operations initiated on this browser. Incoming wallet transfers and other devices are not indexed yet. Status is checked against contract operations.</p>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#EAEAEA] pb-3 text-xs overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-[12px] whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          All Activity ({transactions.length})
        </button>
        <button
          onClick={() => setFilter('deposits')}
          className={`px-3.5 py-1.5 rounded-[12px] whitespace-nowrap transition-colors ${
            filter === 'deposits'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          Deposits
        </button>
        <button
          onClick={() => setFilter('withdrawals')}
          className={`px-3.5 py-1.5 rounded-[12px] whitespace-nowrap transition-colors ${
            filter === 'withdrawals'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          Withdrawals
        </button>
        <button
          onClick={() => setFilter('demo')}
          className={`px-3.5 py-1.5 rounded-[12px] whitespace-nowrap transition-colors ${
            filter === 'demo'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          Bank Transfer Demos
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 rounded-[22px] lens-card text-center text-xs text-[#5F6368]">
            No transactions found in this view.
          </div>
        ) : (
          filteredTransactions.map(tx => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="p-5 rounded-[22px] lens-card-interactive cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                {getTxIcon(tx)}
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm text-[#1A1B1E] truncate">
                      {getTxTitle(tx)}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      tx.environment === 'demo'
                        ? 'bg-[#F2F5F0] text-[#5F6368] border-[#EAEAEA]'
                        : 'bg-[#E3EDDA] text-[#2D5A27] border-[#C8DEC0]'
                    }`}>
                      {tx.environment === 'demo' ? 'Demo' : 'Testnet'}
                    </span>
                  </div>
                  <div className="text-xs text-[#5F6368] mt-0.5 flex items-center space-x-2">
                    <span>{new Date(tx.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] truncate">{tx.receiptId}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={`text-base font-bold tabular-nums ${
                  tx.type === 'withdrawal' ? 'text-[#B76E00]' : 'text-[#1A1B1E]'
                }`}>
                  {tx.type === 'withdrawal' ? '-' : '+'}{formatNear(tx.amount)} {tx.asset}
                </div>
                <div className="text-[11px] text-[#2D5A27] flex items-center justify-end space-x-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Settled</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] w-full max-w-[480px] rounded-[28px] shadow-2xl p-7 space-y-5 border border-[#EAEAEA] text-[#1A1B1E]">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-[#2D5A27]" />
                <h3 className="font-bold text-lg text-[#1A1B1E]">Transaction Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-xs text-[#5F6368] hover:text-[#1A1B1E] px-3 py-1 rounded-[10px] lens-pill"
              >
                Close
              </button>
            </div>

            <div className="p-5 rounded-[20px] bg-[#F2F5F0] border border-[#EAEAEA] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Amount:</span>
                <span className="font-bold text-base text-[#1A1B1E] tabular-nums">
                  {formatNear(selectedTx.amount)} {selectedTx.asset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Type:</span>
                <span className="text-[#1A1B1E] capitalize">{selectedTx.type.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Environment:</span>
                <span className="text-[#1A1B1E] font-semibold">{selectedTx.environment}</span>
              </div>
              <div className="flex justify-between border-t border-[#EAEAEA] pt-2">
                <span className="text-[#5F6368]">Receipt ID:</span>
                <span className="font-mono text-[#1A1B1E]">{selectedTx.receiptId}</span>
              </div>
              {selectedTx.txHash && <a className="quiet-action" href={`https://testnet.nearblocks.io/txns/${selectedTx.txHash}`} target="_blank" rel="noreferrer">View verified transaction on Explorer</a>}
              {selectedTx.reference && (
                <div className="flex justify-between">
                  <span className="text-[#5F6368]">Bank Reference:</span>
                  <span className="font-mono text-[#2D5A27]">{selectedTx.reference}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Timestamp:</span>
                <span className="text-[#1A1B1E]">{new Date(selectedTx.timestamp).toUTCString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full h-12 rounded-[16px] bg-[#121316] hover:bg-[#25272C] text-[#FFFFFF] font-semibold text-xs transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
