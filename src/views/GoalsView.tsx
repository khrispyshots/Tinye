'use client';
import {formatNear} from '../services/near';


import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GoalRow } from '../components/GoalRow';
import { Plus } from 'lucide-react';
import { Goal } from '../types';

export const GoalsView: React.FC = () => {
  const { goals, setIsCreateGoalOpen, setIsSaveModalOpen, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const filteredGoals = goals.filter(g => {
    if (filter === 'active') return g.status === 'active';
    if (filter === 'completed') return g.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1B1E]">
            Savings Goals
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1">
            Track your purpose-locked earmarked vaults
          </p>
        </div>

        <button
          onClick={() => setIsCreateGoalOpen(true)}
          className="h-11 px-5 rounded-[16px] bg-[#121316] hover:bg-[#25272C] text-[#FFFFFF] text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <button className="quiet-action" onClick={() => setActiveTab('groups')}>Group savings <span aria-hidden="true">→</span></button>
      <div className="flex items-center space-x-2 border-b border-[#EAEAEA] pb-3 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-[12px] transition-colors ${
            filter === 'all'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          All ({goals.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3.5 py-1.5 rounded-[12px] transition-colors ${
            filter === 'active'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          In Progress ({goals.filter(g => g.status === 'active').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3.5 py-1.5 rounded-[12px] transition-colors ${
            filter === 'completed'
              ? 'bg-[#121316] text-[#FFFFFF] font-semibold'
              : 'lens-pill text-[#5F6368] hover:text-[#1A1B1E]'
          }`}
        >
          Completed ({goals.filter(g => g.status === 'completed').length})
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-3.5">
        {filteredGoals.length === 0 ? (
          <div className="p-8 rounded-[22px] lens-card text-center text-xs text-[#5F6368]">
            No goals matching this filter.
          </div>
        ) : (
          filteredGoals.map(goal => (
            <GoalRow
              key={goal.id}
              goal={goal}
              onClick={() => setSelectedGoal(goal)}
            />
          ))
        )}
      </div>

      {/* Goal Modal */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] w-full max-w-[480px] rounded-[28px] shadow-2xl p-7 space-y-5 border border-[#EAEAEA]">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <h3 className="font-bold text-lg text-[#1A1B1E]">{selectedGoal.name}</h3>
              <button
                onClick={() => setSelectedGoal(null)}
                className="text-xs text-[#5F6368] hover:text-[#1A1B1E] px-3 py-1 rounded-[10px] lens-pill"
              >
                Close
              </button>
            </div>
            <div className="p-5 rounded-[20px] bg-[#F2F5F0] border border-[#EAEAEA] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Saved so far:</span>
                <span className="font-bold text-[#1A1B1E] tabular-nums">{formatNear(selectedGoal.currentAmount)} NEAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Target:</span>
                <span className="font-semibold text-[#1A1B1E] tabular-nums">{formatNear(selectedGoal.targetAmount)} NEAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6368]">Vault status:</span>
                <span className="text-[#2D5A27] font-semibold">Earmarked in Contract</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedGoal(null);
                setIsSaveModalOpen(true);
              }}
              className="w-full h-12 rounded-[16px] bg-[#121316] hover:bg-[#25272C] text-[#FFFFFF] font-semibold text-xs transition-colors shadow-sm"
            >
              Add funds
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
