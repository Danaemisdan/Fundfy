import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CONTESTS } from '../data/contests';
import Globe from '../components/ui/globe';

export default function Poster() {
  const { id } = useParams();
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://fundfy.app/contests/${contest.id}`)}&color=000000&bgcolor=ffffff`;
  
  const prizePool = contest.statistics.find(s => s.label === 'Prize Pool')?.value || '₹50 LAKHS';

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans">
      
      {/* Poster Container */}
      <div className="w-full max-w-[500px] min-h-[850px] relative rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-between bg-[#050505] border border-white/5 py-4">
        
        {/* The Globe from Home */}
        <div className="absolute top-[20%] -right-[30%] w-[150%] h-[150%] pointer-events-none z-0 opacity-70 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark overlay to ensure text is readable over globe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 pointer-events-none z-0" />

        {/* --- TOP SECTION --- */}
        <div className="relative z-10 flex flex-col pt-10 px-6 text-center">
          
          {/* Header Logos - White Background for visibility */}
          <div className="flex items-center justify-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-lg mb-6 self-center mx-auto max-w-fit">
            <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-4 w-auto object-contain brightness-0" />
            <span className="text-gray-300 font-light text-xs">|</span>
            <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-5 w-auto object-contain" />
          </div>

          <h4 className="text-[9px] tracking-[0.4em] text-gray-400 font-bold uppercase mb-1">
            PRESENTS
          </h4>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-2 font-futuristic">
            GLOBAL <br />
            <span className="text-gradient-purple-orange">TALENT</span> <br />
            HUNT 2026
          </h1>
          
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase mt-2 mb-4">
            Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
          </p>

          <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent self-center" />
        </div>

        {/* --- MIDDLE SECTION (Contest Details) --- */}
        <div className="relative z-10 flex flex-col px-6 flex-1 justify-center py-2">
          
          <div className="text-center mb-6 mt-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none" />
            <h2 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-purple-300 leading-tight mb-3 drop-shadow-sm relative z-10">
              {contest.title}
            </h2>
            <p className="text-sm text-gray-300 font-medium px-4 relative z-10">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool & Credits */}
          <div className="flex flex-col gap-3 w-full mb-8 mt-2 relative z-10">
            <div className="glass-panel bg-gradient-to-b from-white/10 to-black/60 backdrop-blur-xl rounded-[2rem] py-6 px-4 w-full flex flex-col items-center justify-center text-center border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
              <span className="text-[9px] font-black tracking-[0.4em] text-gray-400 uppercase mb-2 relative z-10">Total Prize Pool</span>
              <span className="text-5xl sm:text-6xl font-black text-white whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] relative z-10 tracking-tight">
                ₹50 LAKHS
              </span>
            </div>
            
            <div className="glass-panel bg-orange-500/10 backdrop-blur-md rounded-xl p-3 w-full flex items-center justify-center text-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <span className="text-xs sm:text-sm font-bold text-orange-400 tracking-wide">
                <span className="mr-1">⭐</span> AWS is sponsoring $5,000 for each winner*
              </span>
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
            <div className="glass-panel rounded-3xl p-5 w-full flex items-center justify-between border border-white/20 bg-black/60 backdrop-blur-xl">
              
              <div className="flex flex-col items-start gap-1 pl-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">The world is watching.</span>
                <span className="text-base sm:text-lg font-black text-white mb-1">ARE YOU READY?</span>
                <span className="text-sm font-bold text-purple-400 uppercase tracking-widest border-b border-purple-400/50 pb-0.5">
                  Register Now
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-20 h-20 bg-white rounded-xl p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-lg" />
                </div>
                <span className="text-[7px] font-bold tracking-[0.2em] text-gray-400 uppercase">Scan to enter</span>
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
