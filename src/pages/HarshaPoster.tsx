import React from 'react';
import { useParams, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { CONTESTS } from '../data/contests';
import Globe from '../components/ui/globe';

export default function HarshaPoster() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref') || 'harshasai';
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const targetUrl = `https://fundfy.app/?contest=${contest.id}&ref=${ref}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl)}&color=000000&bgcolor=ffffff`;
  
  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-0 selection:bg-purple-500/30 font-sans">
      
      {/* 1080x1350 Canvas (Instagram Portrait Ratio 4:5) */}
      <div className="w-[1080px] h-[1350px] relative overflow-hidden flex flex-col justify-between bg-[#050505] py-8">
        
        {/* The Globe Background */}
        <div className="absolute top-[-5%] -right-[20%] w-[150%] h-[150%] pointer-events-none z-0 opacity-85 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 pointer-events-none z-0" />

        {/* --- TOP SECTION --- */}
        <div className="relative z-10 flex flex-col pt-8 px-16 text-center">



          <h1 className="text-[5.5rem] font-black text-white leading-[0.85] tracking-tighter mb-4 font-sans uppercase drop-shadow-2xl">
            GLOBAL <br />
            <span className="text-gradient-purple-orange">TALENT</span> <br />
            HUNT 2026
          </h1>

          <h4 className="text-[16px] tracking-[0.3em] text-gray-300 font-bold uppercase mb-4 mt-2">
            SHOWCASE. COMPETE. GET <span className="text-purple-400">DISCOVERED.</span>
          </h4>
          
          <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent self-center mb-1" />
        </div>

        {/* --- MIDDLE SECTION (Contest Details) --- */}
        <div className="relative z-10 flex flex-col px-12 flex-1 justify-center gap-6 py-4">
          
          <div className="text-center relative px-2">
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight drop-shadow-2xl">
              {contest.title}
            </h2>
            <p className="text-lg text-gray-400 font-bold px-8 tracking-[0.3em] uppercase">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool */}
          <div className="flex flex-col gap-4 w-full relative z-10 items-center px-12">
            <div className="bg-white rounded-[2rem] py-6 px-8 w-full flex flex-col items-center justify-center text-center shadow-[0_0_80px_rgba(255,255,255,0.2)]">
              <span className="text-lg font-black tracking-[0.4em] text-gray-500 uppercase mb-2">GET BACKED</span>
              <span className="text-7xl font-black text-black whitespace-nowrap tracking-tight">
                ₹50 LAKHS
              </span>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/90 via-emerald-800/90 to-emerald-900/90 rounded-[2rem] p-[2px] w-full shadow-[0_0_50px_rgba(16,185,129,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 animate-pulse" />
              <div className="bg-[#050505]/95 backdrop-blur-xl rounded-[2rem] py-5 px-6 w-full flex flex-col items-center justify-center text-center relative z-10 border border-emerald-500/20">
                <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-[0.3em] rounded-full uppercase border border-emerald-500/20 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  ASSURED PLACEMENTS & SUPPORT
                </span>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tight uppercase mb-1 drop-shadow-lg leading-tight">
                  <span className="text-emerald-400 mr-2">FOR EVERY PARTICIPANT:</span><br/>
                  Assured Internships & Interviews
                </span>
                <span className="text-[11px] font-bold text-emerald-400/90 tracking-wide uppercase mt-1 leading-relaxed max-w-[320px] text-center">
                  Lifetime free access to JobFinderAI and Momentum EDU+ <span className="text-white/60">for upskilling on any skill</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Powered By Sponsors */}
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl border border-white/10 rounded-2xl py-4 px-6 mx-8 shadow-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-black/40 uppercase mb-3">Powered By</span>
            <div className="flex items-center justify-center gap-8 w-full px-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 object-contain" />
            </div>
          </div>
          
        </div>

        {/* --- BOTTOM SECTION (Partners & QR) --- */}
        <div className="relative z-10 flex flex-col items-center pt-0 w-full">
          
          <div className="px-12 w-full mb-4">
            <div className="relative glass-panel rounded-[2.5rem] p-6 w-full flex items-center justify-between border border-white/20 bg-gradient-to-br from-purple-900/40 to-blue-900/20 backdrop-blur-xl">
              
              <div className="flex flex-col items-start gap-2 pl-4 relative z-10">
                <span className="text-base font-bold tracking-[0.3em] text-purple-300 uppercase">The World Is Watching</span>
                <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 tracking-tight">
                  PROVE YOUR WORTH
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10 pr-4">
                <div className="w-32 h-32 bg-white rounded-2xl p-2 relative">
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-xl" />
                </div>
                <span className="text-xs font-black tracking-[0.3em] text-white/70 uppercase">Scan to apply</span>
              </div>
            </div>
          </div>

          {/* Special Harsha Sai Partners Strip */}
          <div className="w-full bg-white/95 backdrop-blur-xl flex flex-col gap-3 items-center py-5 shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
            <div className="w-full text-center flex items-center justify-center gap-4 px-12">
              <div className="h-[1px] bg-gray-300 flex-1" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">In Association With</span>
              <div className="h-[1px] bg-gray-300 flex-1" />
            </div>
            <div className="flex items-center gap-3 opacity-100 px-2 justify-center w-full max-w-full">
              <img src="/Partners/Fundfy.app.png" className="h-14 object-contain" alt="Fundfy" />
              <img src="/Partners/BrandForYou.png" className="h-16 object-contain" alt="BrandForYou" />
              <div className="w-[1px] h-8 bg-gray-300 mx-1 hidden md:block" />
              <img src="/Partners/Dice Art Films.PNG" className="h-6 object-contain" alt="Dice Art Films" />
              <img src="/Partners/Neon Monkey Fest.png" className="h-10 object-contain" alt="Neon Monkey Fest" />
              <img src="/Partners/Zoza_AI_processed.png" className="h-14 object-contain" alt="Zoza AI" />
              <img src="/Partners/JobFinderAI.png?v=3" className="h-6 object-contain" alt="JobFinderAI" />
              <img src="/Partners/MoreYeahs.png?v=3" className="h-6 object-contain" alt="MoreYeahs" />
              <img src="/Partners/XOXO_v2.png" className="h-7 object-contain" alt="XOXO" />
              <img src="/Partners/Young_v2.png" className="h-7 object-contain" alt="Young Coders" />
              <img src="/Partners/TingoAI.png" className="h-6 object-contain" alt="Tingo" />
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
