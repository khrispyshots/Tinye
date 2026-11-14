'use client';

import React, { useState, useEffect } from 'react';
import { useDialog } from './useDialog';
import { parseNear, SAVINGS_CONTRACT } from '../services/near';
import { useApp } from '../context/AppContext';
import { X, Target, ShieldAlert, Laptop, Home, GraduationCap, Plane, Sparkles } from 'lucide-react';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ isOpen, onClose }) => {
  const { addGoal, connected, user } = useApp();
  const dialog = useDialog(isOpen, () => { if (!busy) onClose(); });
  const [reviewing, setReviewing] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'emergency' | 'laptop' | 'housing' | 'education' | 'travel' | 'custom'>('emergency');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');

  const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
  useEffect(() => { if (isOpen) { setReviewing(false); setError(''); } }, [isOpen]);
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!connected) { setError('Connect and verify your wallet first.'); return; }
    try { parseNear(targetAmount); } catch (e) { setError((e as Error).message); return; }
    if (!reviewing) { setReviewing(true); setError(''); return; }
    setBusy(true);setError('');try {

    await addGoal({
      name: name.trim(),
      category,
      targetAmount,
      asset: 'NEAR',
      targetDate: targetDate || undefined,
      notes: notes.trim() || undefined
    });

    onClose();
    }catch(e){setError((e as Error).message);}finally{setBusy(false);}
  };

  const categories = [
    { id: 'emergency', label: 'Emergency Fund', icon: ShieldAlert },
    { id: 'laptop', label: 'Tech / Workstation', icon: Laptop },
    { id: 'housing', label: 'Rent / Housing', icon: Home },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'travel', label: 'Travel / Move', icon: Plane },
    { id: 'custom', label: 'Custom Purpose', icon: Sparkles },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        role="dialog"
        ref={dialog as React.RefObject<HTMLDivElement>}
        aria-modal="true"
        aria-label="Create savings goal"
        className="lens-card w-full max-w-[480px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-black/[0.1]"
      >
        <div className="flex items-center justify-between p-6 border-b border-black/[0.06]">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-[#78A738]" />
            <h2 className="font-bold text-lg text-[#1A1B1E]">Create savings goal</h2>
          </div>
          <button
            onClick={onClose} disabled={busy} aria-label="Close goal creation"
            className="p-1 rounded-full text-[#5F6368] hover:text-[#1A1B1E] hover:bg-black/[0.04] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error&&<p role="alert" className="state-notice m-5">{error}</p>}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 overflow-y-auto space-y-4">
          {reviewing ? <div className="space-y-4 text-sm">
            <h3 className="font-semibold">Review your goal</h3>
            <dl className="space-y-3"><div><dt className="text-muted">Goal</dt><dd>{name}</dd></div><div><dt className="text-muted">Target</dt><dd>{targetAmount} NEAR</dd></div><div><dt className="text-muted">Account</dt><dd className="break-all">{user.walletAddress}</dd></div><div><dt className="text-muted">Contract · testnet</dt><dd className="break-all">{SAVINGS_CONTRACT}</dd></div></dl>
            <p className="state-notice">Creation attaches 0.02 testnet NEAR for storage, plus network gas. Your target is a savings goal, not a lock or yield promise.</p>
            <button type="button" disabled={busy} className="quiet-action" onClick={() => setReviewing(false)}>Edit goal</button>
          </div> : <>
          <div className="space-y-1.5">
            <label htmlFor="goal-name" className="text-xs font-semibold text-[#1A1B1E]">Goal Name</label>
            <input
              id="goal-name" maxLength={100}
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rainy Day Reserve"
              className="w-full h-11 px-3.5 lens-input rounded-[12px] text-sm text-[#1A1B1E] placeholder-[#5F6368]/60 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1A1B1E]">Category / Purpose</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`flex items-center space-x-2 p-2.5 rounded-[12px] border text-xs transition-all ${
                      category === c.id
                        ? 'border-[#78A738] bg-[#E3EDDA] text-[#163829] font-bold shadow-sm'
                        : 'border-black/[0.06] text-[#5F6368] hover:bg-[#F2F5F0]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-[#78A738]" />
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="goal-target" className="text-xs font-semibold text-[#1A1B1E]">Target Amount (NEAR)</label>
            <div className="relative flex items-center">
              <input
                id="goal-target" type="text" inputMode="decimal"
                required
                value={targetAmount}
                onChange={e => setTargetAmount(e.target.value)}
                placeholder="10.00"
                className="w-full h-11 px-3.5 pr-16 lens-input rounded-[12px] text-sm text-[#1A1B1E] font-semibold tabular-nums focus:outline-none"
              />
              <span className="absolute right-4 text-xs font-bold text-[#5F6368]">
                NEAR
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="goal-date" className="text-xs font-semibold text-[#1A1B1E]">Target Date (Optional)</label>
            <input
              id="goal-date"
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full h-11 px-3.5 lens-input rounded-[12px] text-xs text-[#1A1B1E] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="goal-notes" className="text-xs font-semibold text-[#1A1B1E]">Discipline Note (Optional)</label>
            <textarea
              id="goal-notes" maxLength={500}
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Why this goal matters to you..."
              className="w-full p-3 lens-input rounded-[12px] text-xs text-[#1A1B1E] placeholder-[#5F6368]/60 focus:outline-none resize-none"
            />
          </div>
          </>}
          <button
            type="submit" disabled={busy}
            className="w-full h-12 rounded-[14px] bg-[#121316] hover:bg-[#27272A] text-white font-semibold text-xs tracking-tight transition-all mt-2 shadow-md"
          >
            {busy?'Approve creation in wallet…':reviewing?'Approve goal in wallet':'Review goal'}
          </button>
        </form>
      </div>
    </div>
  );
};
