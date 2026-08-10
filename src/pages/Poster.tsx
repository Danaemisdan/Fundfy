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
  
  // Use 50 Lakhs as requested for the premium look
  const prizePool = '₹50 LAKHS';

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 selection:bg-purple-500/30 font-sans">
      
      {/* Poster Container */}
      <div className="w-full max-w-[500px] aspect-[9/16] relative rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_100px_rgba(168,85,247,0.1)] flex flex-col justify-between bg-black border border-white/10 ring-1 ring-white/5">
        
        {/* Premium Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none z-0 mix-blend-screen" />
        
        {/* The Globe from Home */}
        <div className="absolute top-[10%] -right-[30%] w-[160%] h-[160%] pointer-events-none z-0 opacity-80 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark overlay to ensure text is readable over globe while keeping it vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/95 pointer-events-none z-0" />

        {/* --- TOP SECTION --- */}
        <div className="relative z-10 flex flex-col pt-12 px-8 text-center">
          
          {/* Header Logos - White Background for visibility */}
          <div className="flex items-center justify-center gap-4 bg-white/95 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-8 self-center mx-auto max-w-fit">
            <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 w-auto object-contain brightness-0" />
            <span className="text-gray-300 font-light text-sm">|</span>
            <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-6 w-auto object-contain" />
          </div>

          <h4 className="text-[10px] tracking-[0.5em] text-gray-300 font-bold uppercase mb-2">
            PRESENTS
          </h4>

          <h1 className="text-5xl sm:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-3 font-futuristic drop-shadow-2xl">
            GLOBAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">TALENT</span> <br />
            HUNT 2026
          </h1>
          
          <p className="text-xs font-semibold tracking-[0.25em] text-white/80 uppercase mt-3 mb-6">
            Showcase. Compete. Get <span className="text-purple-400 font-bold">Discovered.</span>
          </p>

          <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent self-center" />
        </div>

        {/* --- MIDDLE SECTION (Contest Details) --- */}
        <div className="relative z-10 flex flex-col px-6 sm:px-8 flex-1 justify-center py-2 mt-4">
          
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
              {contest.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-medium px-4">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool & Credits */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full mb-8">
            <div className="glass-panel bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 flex-1 flex flex-col items-center justify-center text-center border border-white/10 shadow-xl">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Prize Pool</span>
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">{prizePool}</span>
            </div>
            
            <div className="glass-panel bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 flex-1 flex flex-col items-center justify-center text-center border border-white/10 shadow-xl">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">AWS Credits</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-400 drop-shadow-md">$5,000</span>
            </div>
          </div>

          {/* Powered By Sponsors */}
          <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl py-5 px-8 shadow-xl">
            <span className="text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase mb-5">Powered By</span>
            <div className="flex items-center justify-center gap-8 sm:gap-12 w-full px-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-7 sm:h-8 object-contain brightness-0 invert opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-6 sm:h-7 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 sm:h-6 object-contain brightness-0 invert opacity-90" />
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION (QR & Footer Partners) --- */}
        <div className="relative z-10 flex flex-col items-center pb-8 px-6 sm:px-8 mt-2">
          <div className="glass-panel rounded-3xl p-6 w-full flex items-center justify-between border border-white/10 bg-white/5 backdrop-blur-2xl mb-8 shadow-2xl">
            
            <div className="flex flex-col items-start gap-1.5 pl-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">The world is watching.</span>
              <span className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">ARE YOU READY?</span>
              <span className="text-sm sm:text-base font-bold text-purple-400 uppercase tracking-[0.2em] border-b-2 border-purple-400/50 pb-1">
                Register Now
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-2xl p-1.5 shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-xl" />
              </div>
              <span className="text-[8px] font-bold tracking-[0.25em] text-gray-400 uppercase">Scan to enter</span>
            </div>
          </div>

          {/* Bottom Partners Strip */}
          <div className="w-full flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-gray-500 font-bold tracking-[0.25em] uppercase whitespace-nowrap">Our Partners</span>
              <div className="w-10 h-[1px] bg-gray-800" />
            </div>
            <div className="flex items-center justify-end gap-4 opacity-70">
              <img src="/Partners/DiceArtFilms_v2.png" className="h-4 sm:h-5 object-contain" alt="Dice Art" />
              <img src="/Partners/JobFinderAI.png?v=3" className="h-4 sm:h-5 object-contain" alt="JobFinderAI" />
              <img src="/Partners/MoreYeahs.png?v=3" className="h-4 sm:h-5 object-contain" alt="MoreYeahs" />
              <img src="/Partners/Young_v2.png" className="h-5 sm:h-6 object-contain" alt="Young Coders" />
              <img src="/Partners/TingoAI.png" className="h-4 sm:h-5 object-contain" alt="Tingo" />
            </div>
          </div>

        </div>
        
      </div>

    </div>
  );
}
