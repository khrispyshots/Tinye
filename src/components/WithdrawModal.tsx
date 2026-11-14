'use client';
import React from 'react';import {SavingsAction} from './SavingsAction';
export function WithdrawModal({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}){return <SavingsAction kind="withdrawal" isOpen={isOpen} onClose={onClose}/>;}
