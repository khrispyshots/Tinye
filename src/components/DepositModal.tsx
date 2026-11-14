'use client';
import React from 'react';import {SavingsAction} from './SavingsAction';
export function DepositModal({isOpen,onClose,onOpenDemoBank}:{isOpen:boolean;onClose:()=>void;onOpenDemoBank:()=>void}){return <SavingsAction kind="deposit" isOpen={isOpen} onClose={onClose} onDirect={onOpenDemoBank}/>;}
