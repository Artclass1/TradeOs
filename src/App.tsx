import React, { useState } from 'react';
import { analyzeTradeRoute, TradeData } from './lib/gemini';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TradeData | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeTradeRoute(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col p-4 md:p-8">
      {/* Global Header */}
      <header className="flex justify-between items-end mb-10 pb-4 border-b border-zinc-800">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">TradeOS / Intelligence Platform</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">EX/IM<br/>ENGINE</h1>
        </div>
        <div className="text-right flex-col items-end hidden md:flex">
          <div className="flex gap-4 mb-4">
            <span className="px-3 py-1 border border-zinc-700 rounded-full text-[11px] font-medium text-zinc-400">V 2.0.4 - BETA</span>
            <span className="px-3 py-1 bg-white text-black rounded-full text-[11px] font-bold">DEAL READY</span>
          </div>
          <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed">
            Contact <span className="text-zinc-200">artclassstudio11@gmail.com</span> for commercial acquisition.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {!data && (
          <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl mx-auto space-y-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., I want to import organic coffee to Europe..."
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-6 text-xl md:text-2xl font-bold placeholder:text-zinc-700 focus:outline-none focus:border-white transition-colors text-zinc-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full mt-4 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Scanning Global Trade Networks...' : 'Execute Analysis'}
              </button>
            </form>
            {error && (
               <div className="w-full p-4 border border-red-900 bg-red-950/50 text-red-400 text-sm font-bold uppercase tracking-widest text-center">
                 {error}
               </div>
            )}
            
            {(!isLoading) && (
              <div className="w-full flex justify-between gap-4 mt-8 opacity-50 overflow-x-auto pb-2">
                 {['Export electronics to SEA', 'Source leather from Vietnam', 'Import saffron to USA'].map((s) => (
                    <button key={s} type="button" onClick={() => setQuery(s)} className="text-[10px] font-bold border-b border-zinc-700 pb-1 uppercase hover:text-white transition-colors text-left shrink-0 whitespace-nowrap">{s}</button>
                 ))}
              </div>
            )}
          </div>
        )}

        {data && (
          <div className="flex flex-col gap-6 fade-in">
            {/* Executive Summary Row */}
            <div className="col-span-12 border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between gap-8 pb-4">
               <div>
                  <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">01 / Executive Summary</h2>
                  <h3 className="text-4xl md:text-5xl font-black uppercase max-w-4xl tracking-tighter">{data.productName}</h3>
               </div>
               <div className="md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right">
                  <p className="text-zinc-400 text-lg leading-relaxed">{data.executiveSummary}</p>
                  <button onClick={() => {setData(null); setQuery('');}} className="no-print mt-4 text-[10px] uppercase font-bold tracking-widest border-b border-zinc-600 hover:text-white pb-1">← New Query</button>
               </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Discovery & Sourcing (Left) */}
              <section className="lg:col-span-4 bg-zinc-900/50 border-t border-zinc-800 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6 font-bold">02 / Sourcing & Markets</h2>
                  <div className="space-y-8">
                    {/* Sourcing */}
                    <div>
                       <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Sourcing Origins</label>
                       {data.sourcing.map((s, idx) => (
                          <div key={idx} className="mb-4 text-sm border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                             <div className="flex gap-2 justify-between items-center mb-2">
                                <span className="text-xl font-bold uppercase">{s.country}</span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-300 rounded font-bold uppercase">{s.cost} COST</span>
                             </div>
                             <div className="text-zinc-400 mb-1"><span className="text-zinc-600 uppercase text-[10px] font-bold">Quality:</span> {s.quality}</div>
                             <div className="text-zinc-500 text-xs italic">{s.regulations}</div>
                          </div>
                       ))}
                    </div>

                    {/* Markets */}
                    <div>
                       <label className="block text-[10px] text-zinc-600 uppercase tracking-widest mb-4 border-t border-zinc-800 pt-6">Target Markets</label>
                       {data.markets.map((m, idx) => (
                           <div key={idx} className="mb-4">
                             <div className="flex justify-between items-center mb-1">
                               <span className="text-lg font-bold uppercase">{m.country}</span>
                               <span className="text-green-400 font-bold text-sm tracking-tight">{m.margin}</span>
                             </div>
                             <div className="text-xs text-zinc-500 italic mb-1">{m.competition} Comp.</div>
                             <div className="text-[10px] text-zinc-600 uppercase">Duties: {m.duties}</div>
                           </div>
                       ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Market Intelligence (Center) */}
              <section className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex-1 bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col">
                  <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6 font-bold">03 / Market Dynamics</h2>
                  
                  {/* Chart Abstract */}
                  <div className="flex items-end gap-2 h-24 mb-8">
                    <div className="bg-zinc-800 w-full h-1/3"></div>
                    <div className="bg-zinc-800 w-full h-1/2"></div>
                    <div className="bg-zinc-800 w-full h-2/3"></div>
                    <div className="bg-white w-full h-full"></div>
                    <div className="bg-zinc-800 w-full h-4/5"></div>
                    <div className="bg-zinc-800 w-full h-1/2"></div>
                    <div className="bg-zinc-800 w-full h-1/4"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="p-4 bg-zinc-800/40">
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Demand Index</div>
                      <div className="text-lg md:text-xl font-bold uppercase italic tracking-tighter truncate" title={data.metrics.demand}>{data.metrics.demand}</div>
                    </div>
                    <div className="p-4 bg-zinc-800/40">
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Volatility</div>
                      <div className="text-lg md:text-xl font-bold uppercase italic tracking-tighter truncate" title={data.metrics.volatility}>{data.metrics.volatility}</div>
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-white text-black p-6 flex flex-col justify-between min-h-[160px]">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xs uppercase tracking-widest font-black">04 / Freight & Logistics</h2>
                    <span className="text-[10px] font-bold underline">LOGISTICS.SYS</span>
                  </div>
                  <div className="flex justify-between items-end gap-4 overflow-hidden">
                    <div className="flex-shrink-0">
                      <div className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none mb-1">{data.metrics.cycleTime}</div>
                      <div className="text-[10px] font-bold uppercase opacity-60">Avg Cycle Time</div>
                    </div>
                    <div className="text-right truncate">
                      <div className="text-lg md:text-xl font-black leading-none mb-1 truncate">{data.logistics.costs}</div>
                      <div className="text-[10px] font-bold uppercase opacity-60 truncate">{data.logistics.freight[0]} / {data.logistics.couriers[0]}</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Regulation & Safety (Right) */}
              <section className="lg:col-span-3 bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col">
                <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6 font-bold">05 / Compliance</h2>
                <div className="space-y-5 mb-auto">
                  {data.terms.map((term, i) => (
                    <div key={i} className="flex gap-3 items-start border-b border-zinc-800 pb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0"></div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest mb-1">Incoterm / Cond</div>
                        <p className="text-[10px] text-zinc-400">{term}</p>
                      </div>
                    </div>
                  ))}
                  {data.logistics.safety.map((safe, i) => (
                    <div key={`s-${i}`} className="flex gap-3 items-start border-b border-zinc-800 pb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0"></div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest mb-1">Safety Reqt</div>
                        <p className="text-[10px] text-zinc-400">{safe}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => window.print()}
                  className="no-print w-full mt-6 py-4 border-2 border-zinc-700 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Export PDF Report
                </button>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Alert Bar */}
      <footer className="no-print mt-8 pt-4 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-8">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">TradeOS Online</span>
          </div>
        </div>
        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          GITHUB: TRADECORE-ENGINE-MINIMAL-V2
        </div>
      </footer>
    </div>
  );
}
