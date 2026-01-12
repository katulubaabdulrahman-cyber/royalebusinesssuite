
import React, { useState, useEffect } from 'react';
import { Product, Sale } from '../types';
import { getBusinessAdvice } from '../services/gemini';

interface InsightsProps {
  products: Product[];
  sales: Sale[];
  onViewHistory: () => void;
}

const Insights: React.FC<InsightsProps> = ({ products, sales, onViewHistory }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(true);

  const todayRevenue = sales
    .filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.totalAmount, 0);

  const lowStockCount = products.filter(p => p.quantity <= p.lowStockThreshold).length;

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAdvice(true);
      const res = await getBusinessAdvice(products, sales);
      setAdvice(res);
      setLoadingAdvice(false);
    };
    fetchAdvice();
  }, [products.length, sales.length]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Total Revenue Card */}
      <div className="bg-white p-8 rounded-[3rem] border-2 border-[#3E4A34] shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-[0.2em] mb-2">TOTAL REVENUE</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black text-[#3E4A34]">Shs {todayRevenue.toLocaleString()}</h2>
            <div className="bg-[#E9F7EF] text-[#27AE60] text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17l9.272-9.272M16.272 7.728L17 17l-9.272-.728"/></svg>
              +12%
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3E4A34]/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Credit Bal Card */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-[#E5E1D8] shadow-sm">
          <p className="text-[9px] font-black text-[#A09E97] uppercase tracking-widest mb-1">CREDIT BAL.</p>
          <p className="text-xl font-black text-[#3E4A34]">Shs 45,000</p>
        </div>
        {/* Low Stock Card */}
        <div className="bg-white p-6 rounded-[2.5rem] border-2 border-red-800 shadow-sm">
          <p className="text-[9px] font-black text-red-800 uppercase tracking-widest mb-1">LOW STOCK</p>
          <p className="text-xl font-black text-[#3E4A34]">{lowStockCount} Items</p>
        </div>
      </div>

      {/* Business Truth Section */}
      <div className="bg-[#3E4A34] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black uppercase tracking-widest">BUSINESS TRUTH</h3>
                <span className="text-lg">✨</span>
              </div>
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider mt-1">AI MARKET SENTIMENT</p>
            </div>
            <button className="p-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {loadingAdvice ? (
              <div className="space-y-2 opacity-30">
                <div className="h-2 w-full bg-white rounded-full"></div>
                <div className="h-2 w-3/4 bg-white rounded-full"></div>
                <div className="h-2 w-1/2 bg-white rounded-full"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed font-medium text-white/90">
                {advice}
              </p>
            )}
          </div>
        </div>
        
        {/* Decorative Graphic */}
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
           <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
             <path d="M50 10L60 40L90 50L60 60L50 90L40 60L10 50L40 40Z" />
           </svg>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-[#E5E1D8]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black text-[#3E4A34] uppercase tracking-widest">RECENT ACTIVITY</h3>
          <button onClick={onViewHistory} className="text-[9px] font-black text-[#C5B358] uppercase tracking-widest">VIEW HISTORY</button>
        </div>
        
        <div className="space-y-1 py-10 text-center border-t border-dashed border-[#E5E1D8]">
          <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-[0.2em]">ZERO ACTIVE RECORDS</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
