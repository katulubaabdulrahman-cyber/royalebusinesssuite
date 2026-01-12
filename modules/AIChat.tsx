
import React, { useState, useRef, useEffect } from 'react';
import { chatWithRoyale } from '../services/gemini';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (forcedText?: string) => {
    const textToSend = forcedText || input;
    if (!textToSend.trim() || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);
    
    const response = await chatWithRoyale([], textToSend);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-slide-up flex flex-col h-[75vh]">
      {/* Header Banner */}
      <div className="bg-[#3E4A34] p-8 rounded-[3rem] text-white flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C5B358]" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">BUSINESS ORACLE</h3>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-0.5">GEMINI 3 PRO EXECUTIVE</p>
          </div>
        </div>
        <button className="bg-white text-[#3E4A34] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          GO LIVE
        </button>
      </div>

      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <svg viewBox="0 0 24 24" className="w-20 h-20 text-[#3E4A34] mb-4" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v4m0 4h.01"/></svg>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E4A34]">CONSULT THE EXECUTIVE ORACLE</p>
            <p className="text-[8px] font-bold text-[#A09E97] uppercase tracking-widest mt-2">MARKET INSIGHTS • RISK ASSESSMENT • STRATEGY</p>
          </div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-xs font-medium leading-relaxed shadow-sm ${
              m.role === 'user' ? 'bg-[#3E4A34] text-white rounded-tr-none' : 'bg-white text-[#3E4A34] border border-[#E5E1D8] rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-[#E5E1D8] flex gap-1.5">
               <div className="w-1.5 h-1.5 bg-[#3E4A34] rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-[#3E4A34] rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-[#3E4A34] rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Inputs Area */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => handleSend("Analyze current market prices in Kampala")} className="bg-white px-5 py-3 rounded-full border border-[#E5E1D8] text-[9px] font-black uppercase tracking-widest text-[#3E4A34]">MARKET PRICES</button>
          <button onClick={() => handleSend("Perform logistics audit on my inventory")} className="bg-white px-5 py-3 rounded-full border border-[#E5E1D8] text-[9px] font-black uppercase tracking-widest text-[#3E4A34]">LOGISTICS AUDIT</button>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="CONSULT ORACLE..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            className="w-full bg-white border border-[#E5E1D8] rounded-full px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] focus:outline-none shadow-lg pr-24"
          />
          <div className="absolute right-3 inset-y-0 flex items-center gap-2">
             <button className="text-[#A09E97]"><svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg></button>
             <button onClick={() => handleSend()} className="w-12 h-12 bg-[#3E4A34] rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
