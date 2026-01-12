
import React from 'react';
import { Sale } from '../types';

interface ComplianceProps {
  sales: Sale[];
}

const Compliance: React.FC<ComplianceProps> = ({ sales }) => {
  return (
    <div className="space-y-6 animate-slide-up pb-32">
      {/* 7-Day Revenue Pulse */}
      <div className="bg-white p-8 rounded-[3rem] border border-[#E5E1D8] shadow-sm space-y-8">
        <h3 className="text-[10px] font-black text-[#3E4A34] uppercase tracking-[0.3em] text-center">7-DAY REVENUE PULSE</h3>
        
        <div className="h-40 flex items-end justify-between gap-2 px-2">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full bg-[#3E4A34] rounded-full opacity-20" style={{ height: `${Math.random() * 20 + 5}px` }}></div>
              <span className="text-[8px] font-black text-[#A09E97]">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#A09E97]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input 
          type="text" 
          placeholder="ARCHIVE SEARCH (PRODUCT, METHOD)..."
          className="w-full bg-white border border-[#E5E1D8] rounded-full px-12 py-5 text-[10px] font-black uppercase tracking-widest focus:outline-none shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <input type="text" placeholder="START DATE" className="w-full bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 text-[9px] font-black uppercase tracking-widest focus:outline-none" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#A09E97]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <div className="relative">
          <input type="text" placeholder="END DATE" className="w-full bg-white border border-[#E5E1D8] rounded-2xl px-5 py-4 text-[9px] font-black uppercase tracking-widest focus:outline-none" />
          <svg viewBox="0 0 24 24" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#A09E97]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['ALL', 'CASH', 'MOBILE MONEY', 'CREDIT'].map((f, i) => (
          <button key={f} className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${i === 0 ? 'bg-[#3E4A34] text-white border-[#3E4A34]' : 'bg-white text-[#3E4A34] border-[#E5E1D8]'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-[#E5E1D8]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black text-[#C5B358] uppercase tracking-[0.2em]">MASTER AUDIT LOG</h3>
          <button className="flex items-center gap-1.5 text-[9px] font-black text-[#A09E97] opacity-30 uppercase tracking-widest cursor-not-allowed">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            EXPORT CSV
          </button>
        </div>
        
        <div className="py-20 text-center flex flex-col items-center opacity-30">
          <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-[0.2em]">{sales.length} ENTRIES FOUND</p>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
