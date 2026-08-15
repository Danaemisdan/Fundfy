import React from 'react';
import { useParams, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { CONTESTS } from '../data/contests';
import Globe from '../components/ui/globe';

export default function Poster() {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const targetUrl = `https://fundfy.app/?contest=${contest.id}${ref ? `&ref=${ref}` : ''}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}&color=000000&bgcolor=ffffff`;
  
  const supportFund = contest.statistics.find(s => s.label === 'Support Fund' || s.label === 'Prize Pool')?.value || '₹50 LAKHS';

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans">
      
      {/* Poster Container */}
      <div className="w-full max-w-[500px] min-h-[850px] relative rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-between bg-[#050505] border border-white/5 py-4">
        
        {/* The Globe from Home */}
        <div className="absolute top-[-5%] -right-[20%] w-[150%] h-[150%] pointer-events-none z-0 opacity-85 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark overlay to ensure text is readable over globe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 pointer-events-none z-0" />

        {/* --- TOP SECTION --- */}
        <div className="relative z-10 flex flex-col pt-10 px-6 text-center">
          
          {/* Header Logos */}
          <div className="flex items-center justify-center gap-6 bg-white/10 backdrop-blur-md px-10 py-4 rounded-[2rem] border border-white/20 shadow-lg mb-6 self-center mx-auto max-w-fit">
            <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-14 w-auto object-contain" />
            <span className="text-gray-500 font-light text-2xl">|</span>
            <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-16 w-auto object-contain" />
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 sm:pt-10 z-10 w-full px-4">
            

            <h1 className="text-[2.75rem] sm:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-2 font-sans uppercase drop-shadow-xl">
              GLOBAL <br />
              <span className="text-gradient-purple-orange">TALENT</span> HUNT 2026
            </h1>
            
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-white/70 uppercase mt-3 mb-8">
              Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
            </p>
          </div>

          <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent self-center" />
        </div>

        {/* --- MIDDLE SECTION (Contest Details) --- */}
        <div className="relative z-10 flex flex-col px-6 flex-1 justify-center gap-6 sm:gap-8 py-4">
          
          <div className="flex flex-col items-center justify-center text-center mt-2 z-10 w-full px-4 relative">
            <h2 className="text-4xl sm:text-[3.25rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight drop-shadow-2xl px-2">
              {contest.title}
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-400 font-bold px-4 tracking-[0.3em] uppercase">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool & Credits */}
          <div className="flex flex-col gap-3 w-full relative z-10">
            <div className="bg-white rounded-[2rem] py-6 px-4 w-full flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(255,255,255,0.2)] relative overflow-hidden">
              <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase mb-2 relative z-10">GET BACKED</span>
              <span className="text-5xl sm:text-6xl font-black text-black whitespace-nowrap relative z-10 tracking-tight">
                ₹50 LAKHS
              </span>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/90 via-emerald-800/90 to-emerald-900/90 rounded-[1.5rem] p-[2px] w-full shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 animate-pulse" />
              <div className="bg-[#050505]/95 backdrop-blur-xl rounded-[1.5rem] py-4 px-4 w-full flex flex-col items-center justify-center text-center relative z-10 border border-emerald-500/20">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] font-black tracking-[0.3em] rounded-full uppercase border border-emerald-500/20 mb-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  ASSURED PLACEMENTS & SUPPORT
                </span>
                <span className="text-[1.1rem] sm:text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tracking-tight uppercase mb-1 drop-shadow-lg leading-tight">
                  <span className="text-emerald-400 mr-2">FOR EVERY PARTICIPANT:</span><br/>
                  Assured Internships & Interviews
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400/90 tracking-wide uppercase mt-1 leading-relaxed max-w-[250px] sm:max-w-xs">
                  Lifetime free access to JobFinderAI and Momentum EDU+ <span className="text-white/60">for upskilling on any skill</span>
                </span>
              </div>
            </div>
          </div>

          {/* Powered By Sponsors */}
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl border border-white/10 rounded-2xl py-5 px-6 mx-2 shadow-2xl">
            <span className="text-[9px] font-bold tracking-[0.25em] text-black/40 uppercase mb-4">Powered By</span>
            <div className="flex items-center justify-center gap-6 sm:gap-8 w-full px-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-7 sm:h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-7 sm:h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 sm:h-6 object-contain" />
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION (QR & Footer Partners) --- */}
        <div className="relative z-10 flex flex-col items-center pt-2">
          
          <div className="px-6 w-full mb-8">
            <div className="relative glass-panel rounded-[2rem] p-5 w-full flex items-center justify-between border border-white/20 bg-gradient-to-br from-purple-900/40 to-blue-900/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none" />
              
              <div className="flex flex-col items-start gap-1.5 pl-2 relative z-10">
                <span className="text-[9px] font-bold tracking-[0.3em] text-purple-300 uppercase">Ready To Transform?</span>
                <span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-1 tracking-tight">
                  START YOUR JOURNEY
                </span>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="w-24 sm:w-28 h-24 sm:h-28 bg-white rounded-2xl p-2 relative shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                  <div className="absolute inset-0 border border-purple-500/30 rounded-2xl animate-pulse pointer-events-none" />
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-xl" />
                </div>
                <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-white/70 uppercase">Scan to apply</span>
              </div>
            </div>
          </div>

          {/* Bottom Partners Strip - Solid White Banner */}
          <div className="w-full bg-white/95 backdrop-blur-xl flex flex-col gap-3 items-center py-5 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <span className="text-[8px] text-black/40 tracking-[0.3em] font-bold uppercase whitespace-nowrap">Our Partners</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 opacity-100 w-full px-2 max-w-sm">
              <img src="/Partners/BrandForYou.png" className="h-6 object-contain" alt="BrandForYou" />
              <img src="/Partners/Epic_Games_logo.svg.webp" className="h-6 object-contain" alt="Epic Games" />
              <img src="/Partners/DiceArtFilms_v2.png" className="h-6 object-contain" alt="Dice Art" />
              <img src="/Partners/JobFinderAI.png?v=3" className="h-5 object-contain" alt="JobFinderAI" />
              <img src="/Partners/MoreYeahs.png?v=3" className="h-5 object-contain" alt="MoreYeahs" />
              <img src="/Partners/XOXO_v2.png" className="h-6 object-contain" alt="XOXO" />
              <img src="/Partners/Young_v2.png" className="h-6 object-contain" alt="Young Coders" />
              <img src="/Partners/TingoAI.png" className="h-6 object-contain" alt="Tingo" />
            </div>
          </div>

        </div>
        
      </div>

    </div>
  );
}
