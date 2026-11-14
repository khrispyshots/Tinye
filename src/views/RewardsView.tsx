'use client';
import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Target, TrendingUp, CalendarDays, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loadSavingsInsights, SavingsInsights } from '../services/savings-insights';
export function RewardsView() {
  const { user, goals, transactions, savingsVerified, connected, setActiveTab } = useApp();
  const [tab,setTab] = useState<'milestones'|'reputation'|'catalogue'>('milestones');
  const [insights,setInsights] = useState<SavingsInsights|null>(null);
  const [error,setError] = useState('');
  useEffect(()=>{let active=true;setInsights(null);setError('');if(connected && savingsVerified) void loadSavingsInsights(user.walletAddress,goals,transactions).then(value=>{if(active)setInsights(value);}).catch(()=>{if(active)setError('Savings history could not be verified. Refresh your account and try again.');});return()=>{active=false;};},[user.walletAddress,goals,transactions,savingsVerified,connected]);
  const milestones = insights ? [
    {title:'A purpose to save for',description:'Personal goals verified on the savings contract.',count:insights.createdGoals,icon:Target},
    {title:'Savings in motion',description:'Goals with a positive confirmed savings balance today.',count:insights.fundedGoals,icon:TrendingUp},
    {title:'Target reached',description:'Goals whose current confirmed balance meets their target.',count:insights.reachedGoals,icon:Award},
  ] : [];
  return <div className="space-y-6 sm:space-y-8 animate-fadeIn">
    <div><h1 className="text-3xl font-semibold tracking-tight text-[#1A1B1E]">Rewards & Discipline</h1><p className="text-sm text-[#5F6368] mt-1">Recognise your progress with evidence you can inspect.</p></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <section className="p-6 rounded-[26px] lens-summary-card"><div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#2D5A27]"><Award size={17}/> Verified milestones</div><strong className="block mt-3 text-4xl">{insights ? milestones.filter(m=>m.count>0).length : '—'}<span className="text-base font-medium text-[#5F6368]"> / 3</span></strong><p className="text-xs text-[#5F6368] mt-2">Recognition only. No cash value or promised yield.</p></section>
      <section className="p-6 rounded-[26px] lens-card"><div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#5F6368]"><CalendarDays size={17}/> Verified saving months</div><strong className="block mt-3 text-4xl">{insights?.activeMonths ?? '—'}</strong><p className="text-xs text-[#5F6368] mt-2">UTC months represented in this browser’s verified deposit history.</p></section>
    </div>
    <div className="flex gap-2 overflow-x-auto pb-3 border-b border-[#EAEAEA]" aria-label="Savings recognition">{(['milestones','reputation','catalogue'] as const).map(value=><button key={value} aria-pressed={tab===value} onClick={()=>setTab(value)} className={`px-4 py-2 rounded-[14px] text-xs font-semibold whitespace-nowrap ${tab===value?'bg-[#121316] text-white':'lens-pill text-[#5F6368]'}`}>{value==='milestones'?'Milestones':value==='reputation'?'Savings reputation':'Rewards store'}</button>)}</div>
    {!connected && <div className="state-notice">Connect and verify your wallet to see your savings history.<button className="ml-2 underline" onClick={()=>setActiveTab('wallet')}>Open wallet</button></div>}
    {error && <div role="alert" className="state-notice">{error}</div>}
    {connected && !insights && !error && <p role="status" className="text-sm text-[#5F6368]">Verifying savings history…</p>}
    {tab==='milestones' && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{milestones.map(({title,description,count,icon:Icon})=><section className="lens-card p-5 rounded-[24px] space-y-3" key={title}><div className="flex items-center justify-between"><Icon className="text-[#174D38]" size={22}/>{count>0?<CheckCircle2 className="text-[#23875A]" size={20}/>:<Lock className="text-[#86908B]" size={18}/>}</div><h2 className="font-semibold">{title}</h2><p className="text-xs text-[#5F6368] leading-relaxed">{description}</p><strong className="block text-2xl">{count}</strong><span className="text-xs text-[#174D38]">{count>0?'Verified':'Start with a savings goal'}</span></section>)}</div>}
    {tab==='reputation' && <section className="lens-card p-5 sm:p-7 rounded-[24px] space-y-5"><div><h2 className="font-semibold text-lg">Your savings history</h2><p className="text-xs text-[#5F6368] mt-1">A descriptive record, never a credit score or lending promise.</p></div><dl className="grid grid-cols-2 gap-5">{[['Goals created',insights?.createdGoals],['Currently funded goals',insights?.fundedGoals],['Targets currently reached',insights?.reachedGoals],['Verified contributions',insights?.verifiedContributions]].map(([label,value])=><div key={String(label)}><dt className="text-xs text-[#5F6368]">{label}</dt><dd className="font-semibold text-2xl mt-1">{value??'—'}</dd></div>)}</dl><p className="text-xs text-[#5F6368]">Contribution history is limited to transaction IDs retained by this browser and independently checked against the contract. Activity made elsewhere may be missing. Goal counts use the connected account’s contract state.</p></section>}
    {tab==='catalogue' && <section className="lens-card p-7 rounded-[24px] space-y-3"><Award className="text-[#174D38]"/><h2 className="font-semibold">Rewards store — Coming soon</h2><p className="text-sm text-[#5F6368]">Points, earning thresholds and partner fulfilment are not activated. No redemption, stock or financial benefit is promised.</p></section>}
    <div className="p-5 rounded-[22px] bg-[#F2F5F0] border border-[#EAEAEA] flex gap-3"><ShieldCheck className="text-[#174D38] shrink-0" size={20}/><p className="text-xs text-[#5F6368] leading-relaxed">Milestones reflect verified savings state. They do not increase your NEAR balance. Numeric loyalty points stay disabled until the earning and anti-abuse rules are approved.</p></div>
  </div>;
}
