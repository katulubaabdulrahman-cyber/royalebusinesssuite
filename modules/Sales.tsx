
import React, { useState } from 'react';
import { Product, Sale, PaymentMethod, SaleItem } from '../types';

interface SalesProps {
  products: Product[];
  onSale: (sale: Sale) => void;
}

const Sales: React.FC<SalesProps> = ({ products, onSale }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [tender, setTender] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const product = products.find(p => p.id === id);
      if (product && next > product.quantity) return prev;
      return { ...prev, [id]: next };
    });
  };

  // Fixed line 29: Use type assertion for Object.entries to ensure qty is recognized as a number
  const total = (Object.entries(cart) as [string, number][]).reduce((sum, [id, qty]) => {
    const p = products.find(prod => prod.id === id);
    return sum + (p ? p.sellingPrice * qty : 0);
  }, 0);

  const handleAuthorize = () => {
    if (total === 0) return;
    // Fixed line 34, 35, 43: Cast entries to [string, number][] to fix 'unknown' type issues from Object.entries
    const entries = Object.entries(cart) as [string, number][];
    const saleItems: SaleItem[] = entries
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const p = products.find(prod => prod.id === id)!;
        return {
          productId: id,
          productName: p.name,
          quantity: qty,
          priceAtSale: p.sellingPrice,
          total: p.sellingPrice * qty
        };
      });

    onSale({
      id: crypto.randomUUID(),
      items: saleItems,
      totalAmount: total,
      paymentMethod: tender,
      timestamp: Date.now()
    });
    setCart({});
    alert("Transaction Authorized");
  };

  return (
    <div className="space-y-6 animate-slide-up pb-32">
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#A09E97]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input 
          type="text" 
          placeholder="SEARCH PRODUCTS..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-[#E5E1D8] rounded-full px-12 py-5 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#3E4A34]/20 shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-[#E5E1D8] shadow-sm flex justify-between items-center">
            <div>
              <h4 className="text-sm font-black text-[#3E4A34] uppercase">{p.name}</h4>
              <p className="text-xs font-black text-[#3E4A34] mt-1">Shs {p.sellingPrice.toLocaleString()}</p>
              <p className="text-[9px] font-bold text-[#A09E97] uppercase tracking-widest mt-1">{p.quantity} UNITS AVAILABLE</p>
            </div>
            <div className="bg-[#FDFBF7] p-1.5 rounded-full border border-[#E5E1D8] flex items-center gap-4">
              <button 
                onClick={() => updateQty(p.id, -1)}
                className="w-10 h-10 rounded-full bg-white border border-[#E5E1D8] shadow-sm flex items-center justify-center text-[#3E4A34]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 12H4"/></svg>
              </button>
              <span className="text-sm font-black text-[#3E4A34] w-4 text-center">{cart[p.id] || 0}</span>
              <button 
                onClick={() => updateQty(p.id, 1)}
                className="w-10 h-10 rounded-full bg-[#3E4A34] text-white shadow-lg flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-[#E5E1D8] shadow-lg space-y-6">
        <div>
          <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-[0.2em] mb-4">TENDER TYPE</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: PaymentMethod.CASH, label: 'CASH', icon: '💵' },
              { id: PaymentMethod.MOBILE_MONEY, label: 'M-MONEY', icon: '📱' },
              { id: PaymentMethod.CREDIT, label: 'CREDIT', icon: '💳' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setTender(m.id)}
                className={`py-6 rounded-3xl border flex flex-col items-center gap-2 transition-all ${
                  tender === m.id ? 'bg-[#3E4A34] text-white border-[#3E4A34]' : 'bg-white text-[#3E4A34] border-[#E5E1D8]'
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[10px] font-black text-[#A09E97] uppercase tracking-[0.2em]">TOTAL TRANSACTION</p>
          <h3 className="text-3xl font-black text-[#3E4A34]">Shs {total.toLocaleString()}</h3>
        </div>

        <button 
          onClick={handleAuthorize}
          disabled={total === 0}
          className={`w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
            total > 0 ? 'bg-[#3E4A34] text-white shadow-xl' : 'bg-[#E5E1D8] text-[#A09E97] cursor-not-allowed'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${total > 0 ? 'border-white' : 'border-[#A09E97]'}`}>
            {total > 0 && <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
          </div>
          AUTHORIZE SALE
        </button>
      </div>
    </div>
  );
};

export default Sales;
