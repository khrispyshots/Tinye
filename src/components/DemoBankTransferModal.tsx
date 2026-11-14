'use client';
import React from 'react';
import {X} from 'lucide-react';
export function DemoBankTransferModal({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}){if(!isOpen)return null;return <div className="modal-backdrop"><section className="receive-sheet" role="dialog" aria-modal="true" aria-labelledby="direct-title"><button className="sheet-close" aria-label="Close direct deposits" onClick={onClose}><X/></button><h2 id="direct-title">Direct Deposits — Coming Soon</h2><p className="text-muted">We're working on a simpler way to fund your Tinye account. For now, you can receive supported tokens directly into your connected NEAR wallet.</p><button className="primary-action" disabled>Coming Soon</button></section></div>;}
