
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z"/></svg>
    ), label: 'HOME' },
    { id: 'pos', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
    ), label: 'POS' },
    { id: 'ledger', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ), label: 'LEDGER' },
    { id: 'ai', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    ), label: 'AI' },
    { id: 'stock', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    ), label: 'STOCK' },
    { id: 'debt', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    ), label: 'DEBT' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FEF9E7] pb-24">
      {/* Custom Header */}
      <header className="px-6 py-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-[#3E4A34] tracking-tight leading-none uppercase">CREAMIZON</h1>
          <p className="text-[10px] font-bold text-[#C5B358] tracking-[0.2em] mt-1 uppercase">ROYALE EDITION</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#E5E1D8] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[9px] font-black text-[#3E4A34] uppercase tracking-wider">STANDARD TERMINAL</span>
          </div>
          <button className="p-3 bg-white rounded-2xl shadow-sm border border-[#E5E1D8]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3E4A34]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 max-w-lg mx-auto w-full">
        {children}
      </main>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-black/10 border border-white/20 p-2 flex justify-between items-center h-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
                activeTab === tab.id ? 'text-[#3E4A34] scale-110' : 'text-[#A09E97]'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute -top-1 w-10 h-10 bg-[#3E4A34]/5 rounded-full -z-10" />
              )}
              <div className={activeTab === tab.id ? 'text-[#3E4A34]' : 'text-[#A09E97]'}>
                {tab.icon}
              </div>
              <span className={`text-[8px] font-black mt-1 tracking-tighter transition-all ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#3E4A34]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
