
import React, { useState } from 'react';
import { Product } from '../types';

interface InventoryProps {
  products: Product[];
  onAdd: (product: Product) => void;
  onDelete: (id: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ products, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-slide-up pb-32">
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#A09E97]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input 
          type="text" 
          placeholder="FIND LEDGER ENTRY..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E5E1D8] rounded-full px-12 py-5 text-[11px] font-black uppercase tracking-widest focus:outline-none shadow-sm"
        />
        <button className="absolute inset-y-0 right-3 flex items-center p-3 text-[#3E4A34]">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
        </button>
      </div>

      <div className="flex justify-between items-center px-2">
        <h3 className="text-[10px] font-black text-[#C5B358] uppercase tracking-[0.2em]">MASTER INVENTORY</h3>
        <button className="flex items-center gap-1.5 text-[9px] font-black text-[#3E4A34] uppercase tracking-widest">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          EXPORT LEDGER
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-[2.5rem] border-2 border-[#3E4A34] shadow-sm flex justify-between items-center relative group">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-[#3E4A34] uppercase">{p.name}</h4>
                {p.quantity <= p.lowStockThreshold && (
                  <span className="text-red-700">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-widest">{p.category || 'GENERAL'}</p>
                <p className="text-[10px] font-black text-[#3E4A34] uppercase">SHS {p.sellingPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-[#3E4A34] leading-none">{p.quantity}</p>
              <p className="text-[9px] font-black text-[#A09E97] uppercase tracking-widest mt-1">UNITS</p>
            </div>
            <button 
              onClick={() => onDelete(p.id)}
              className="absolute -right-2 -top-2 w-8 h-8 bg-red-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          </div>
        ))}

        <button 
          onClick={() => setIsAdding(true)}
          className="w-full py-8 border-2 border-dashed border-[#E5E1D8] rounded-[3rem] flex items-center justify-center gap-3 text-[11px] font-black text-[#3E4A34] uppercase tracking-[0.2em] active:scale-95 transition-all"
        >
          <span className="text-xl">+</span>
          NEW PRODUCT ENTRY
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl space-y-4">
              <h3 className="text-xl font-black text-[#3E4A34] uppercase tracking-tight">ADD PRODUCT</h3>
              <input id="p_name" type="text" placeholder="PRODUCT NAME" className="w-full bg-[#FDFBF7] border border-[#E5E1D8] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest" />
              <input id="p_price" type="number" placeholder="SELLING PRICE" className="w-full bg-[#FDFBF7] border border-[#E5E1D8] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest" />
              <input id="p_qty" type="number" placeholder="INITIAL STOCK" className="w-full bg-[#FDFBF7] border border-[#E5E1D8] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest" />
              <div className="flex gap-3 pt-4">
                 <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-[#A09E97]">CANCEL</button>
                 <button 
                  onClick={() => {
                    const name = (document.getElementById('p_name') as HTMLInputElement).value;
                    const price = Number((document.getElementById('p_price') as HTMLInputElement).value);
                    const qty = Number((document.getElementById('p_qty') as HTMLInputElement).value);
                    if (name && price >= 0) {
                      onAdd({ id: crypto.randomUUID(), name, sellingPrice: price, quantity: qty, category: 'GENERAL', costPrice: price * 0.8, lowStockThreshold: 5, updatedAt: Date.now() });
                      setIsAdding(false);
                    }
                  }}
                  className="flex-1 bg-[#3E4A34] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                 >SAVE ENTRY</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
