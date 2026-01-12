
import React, { useState, useEffect } from 'react';
import { db } from './db';
import { Product, Sale } from './types';
import Layout from './components/Layout';
import Insights from './modules/Insights';
import Inventory from './modules/Inventory';
import Sales from './modules/Sales';
import Compliance from './modules/Compliance';
import AIChat from './modules/AIChat';

// Debt module integrated directly to keep file structure simple for the redesign
const DebtModule: React.FC = () => (
  <div className="space-y-6 animate-slide-up pb-32">
    <div className="bg-[#3E4A34] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-2">TOTAL OUTSTANDING CREDIT</p>
        <h2 className="text-4xl font-black">Shs 45,000</h2>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div className="flex justify-between items-center px-2">
      <h3 className="text-[10px] font-black text-[#C5B358] uppercase tracking-[0.2em]">DEBTORS LEDGER</h3>
      <button className="flex items-center gap-1 text-[9px] font-black text-[#3E4A34] uppercase tracking-widest">
        <span className="text-sm">+</span> QUICK ADD
      </button>
    </div>

    <div className="bg-white p-8 rounded-[3.5rem] border-2 border-[#C5B358] shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-black text-[#3E4A34] uppercase">SARAH MUKASA</h4>
          <p className="text-[9px] font-bold text-[#A09E97] mt-1 flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            256700000000
          </p>
        </div>
        <p className="text-lg font-black text-[#3E4A34]">Shs 45,000</p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-[#3E4A34] text-white py-4 rounded-3xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          SEND REMINDER
        </button>
        <button className="bg-[#FDFBF7] border border-[#E5E1D8] text-[#3E4A34] px-6 py-4 rounded-3xl text-[9px] font-black uppercase tracking-widest">
          AUDIT
        </button>
      </div>
    </div>

    <button className="w-full py-8 border-2 border-dashed border-[#E5E1D8] rounded-[3rem] flex items-center justify-center gap-3 text-[11px] font-black text-[#3E4A34] uppercase tracking-[0.2em]">
      <span className="text-xl">+</span>
      NEW CREDIT RECORD
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await db.init();
        const storedProducts = await db.getAllProducts();
        const storedSales = await db.getAllSales();
        setProducts(storedProducts);
        setSales(storedSales);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };
    initApp();
  }, []);

  const handleAddProduct = async (product: Product) => {
    await db.saveProduct(product);
    setProducts([...products, product]);
  };

  const handleNewSale = async (sale: Sale) => {
    await db.saveSale(sale);
    setSales([...sales, sale]);
    const updatedProducts = await db.getAllProducts();
    setProducts(updatedProducts);
  };

  if (isInitializing) return (
    <div className="flex items-center justify-center min-h-screen bg-[#FEF9E7]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#3E4A34] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-[#3E4A34] font-black tracking-widest text-lg uppercase">ROYALE</h1>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Insights products={products} sales={sales} onViewHistory={() => setActiveTab('ledger')} />;
      case 'pos': return <Sales products={products} onSale={handleNewSale} />;
      case 'ledger': return <Compliance sales={sales} />;
      case 'ai': return <AIChat />;
      case 'stock': return <Inventory products={products} onAdd={handleAddProduct} onDelete={async (id) => { await db.deleteProduct(id); setProducts(products.filter(p => p.id !== id)); }} />;
      case 'debt': return <DebtModule />;
      default: return <Insights products={products} sales={sales} onViewHistory={() => setActiveTab('ledger')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
