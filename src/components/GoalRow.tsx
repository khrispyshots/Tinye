'use client';
import {formatNear} from '../services/near';


import React from 'react';
import { Goal } from '../types';
import { ShieldAlert, Laptop, Home, GraduationCap, Plane, Sparkles, ChevronRight } from 'lucide-react';

interface GoalRowProps {
  goal: Goal;
  onClick: () => void;
}

export const GoalRow: React.FC<GoalRowProps> = ({ goal, onClick }) => {
  const percentage = BigInt(goal.targetAmount)>BigInt(0)?Math.min(100,Number(BigInt(goal.currentAmount)*BigInt(100)/BigInt(goal.targetAmount))):0;
  const isReached = BigInt(goal.currentAmount) >= BigInt(goal.targetAmount);
  const remainder = (BigInt(goal.targetAmount)>BigInt(goal.currentAmount)?BigInt(goal.targetAmount)-BigInt(goal.currentAmount):BigInt(0)).toString();

  const getCategoryIcon = () => {
    switch (goal.category) {
      case 'emergency':
        return <ShieldAlert className="w-5 h-5 text-[#78A738]" />;
      case 'laptop':
        return <Laptop className="w-5 h-5 text-[#78A738]" />;
      case 'housing':
        return <Home className="w-5 h-5 text-[#78A738]" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-[#78A738]" />;
      case 'travel':
        return <Plane className="w-5 h-5 text-[#78A738]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#78A738]" />;
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group w-full lens-card-interactive rounded-[20px] p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 focus:outline-none focus:ring-2 focus:ring-[#78A738]"
    >
      {/* Left: Icon, Name & Category */}
      <div className="flex items-center space-x-4 min-w-[220px]">
        <div className="w-12 h-12 rounded-[14px] bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#78A738]/40 transition-colors">
          {getCategoryIcon()}
        </div>
        <div className="space-y-0.5">
          <h3 className="text-base font-semibold text-[#1A1B1E] group-hover:text-[#78A738] transition-colors tracking-tight">
            {goal.name}
          </h3>
          <p className="text-xs text-[#5F6368] line-clamp-1">
            {goal.notes || 'Discipline-backed goal vault'}
          </p>
        </div>
      </div>

      {/* Right: Progress bar, Amounts, Status */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1 md:max-w-[440px] justify-end">
        {/* Progress track & percentage */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1A1B1E] tabular-nums">
              {formatNear(goal.currentAmount)} <span className="font-normal text-[#5F6368]">{goal.asset}</span>
            </span>
            <span className="text-[#5F6368] tabular-nums text-[11px]">
              target: {formatNear(goal.targetAmount)} {goal.asset}
            </span>
          </div>

          {/* Visual Track */}
          <div className="w-full h-2 rounded-full bg-[#E2E8DE] overflow-hidden">
            <div
              className="h-full bg-[#78A738] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
              role="progressbar" aria-label="Goal progress" aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#507222] font-semibold tabular-nums">
              {percentage}% saved
            </span>
            <span className="text-[#5F6368] font-medium">
              {isReached ? (
                <span className="text-[#507222] font-bold">Target reached</span>
              ) : (
                `${formatNear(remainder)} ${goal.asset} to go`
              )}
            </span>
          </div>
        </div>

        {/* Chevron icon */}
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.03] text-[#5F6368] group-hover:text-[#1A1B1E] group-hover:bg-black/[0.06] group-hover:translate-x-0.5 transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
