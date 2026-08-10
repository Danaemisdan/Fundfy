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
          
          <div className="text-center mb-6 mt-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
              {contest.title}
            </h2>
            <p className="text-sm text-gray-300 font-medium px-4">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool & Credits */}
          <div className="flex items-center justify-center gap-4 w-full mb-6">
            <div className="glass-panel bg-black/60 backdrop-blur-md rounded-2xl p-4 flex-1 flex flex-col items-center justify-center text-center border border-white/10">
              <span className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Prize Pool</span>
              <span className="text-xl sm:text-2xl font-black text-white whitespace-nowrap">₹50 LAKHS</span>
            </div>
            
            <div className="glass-panel bg-black/60 backdrop-blur-md rounded-2xl p-4 flex-1 flex flex-col items-center justify-center text-center border border-white/10">
              <span className="text-[10px] sm:text-xs font-bold text-orange-400 leading-tight">
                AWS is sponsoring $5,000 for each winner*
              </span>
            </div>
          </div>

          {/* Powered By Sponsors */}
          <div className="flex flex-col items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl py-4 px-6 mx-2">
            <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3">Powered By</span>
            <div className="flex items-center justify-center gap-4 w-full px-2">
              <div className="bg-white px-3 py-2 rounded-lg shadow-md flex items-center justify-center h-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-6 object-contain" />
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-md flex items-center justify-center h-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-6 object-contain" />
              </div>
              <div className="bg-white px-3 py-2 rounded-lg shadow-md flex items-center justify-center h-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 object-contain" />
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION (QR & Footer Partners) --- */}
        <div className="relative z-10 flex flex-col items-center pb-6 px-6">
          <div className="glass-panel rounded-3xl p-5 w-full flex items-center justify-between border border-white/20 bg-black/60 backdrop-blur-xl mb-6">
            
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

          {/* Bottom Partners Strip */}
          <div className="w-full flex flex-col gap-3 items-center px-1 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-12 h-[1px] bg-gray-700" />
              <span className="text-[7px] text-gray-400 tracking-[0.3em] font-bold uppercase whitespace-nowrap">Our Partners</span>
              <div className="w-12 h-[1px] bg-gray-700" />
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 opacity-100 w-full px-2">
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/Epic_Games_logo.svg.webp" className="h-full object-contain" alt="Epic Games" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/DiceArtFilms_v2.png" className="h-full object-contain" alt="Dice Art" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/JobFinderAI.png?v=3" className="h-full object-contain" alt="JobFinderAI" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/MoreYeahs.png?v=3" className="h-full object-contain" alt="MoreYeahs" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/XOXO_v2.png" className="h-full object-contain" alt="XOXO" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/Young_v2.png" className="h-full object-contain" alt="Young Coders" /></div>
              <div className="bg-white p-1.5 rounded-lg shadow-sm h-10 flex items-center justify-center"><img src="/Partners/TingoAI.png" className="h-full object-contain" alt="Tingo" /></div>
            </div>
          </div>

        </div>
        
      </div>

    </div>
  );
}
