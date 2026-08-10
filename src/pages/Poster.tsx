import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CONTESTS } from '../data/contests';

export default function Poster() {
  const { id } = useParams();
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://fundfy.app/contests/${contest.id}`)}&color=000000&bgcolor=ffffff`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans">
      
      {/* Poster Container (Fixed Aspect Ratio 9:16 for stories/posters) */}
      <div 
        className="w-full max-w-[500px] aspect-[9/16] relative rounded-[2rem] overflow-hidden shadow-2xl flex flex-col justify-between"
        style={{
          backgroundImage: `url('/Partners/ChatGPT Image Aug 10, 2026, 03_20_07 PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />

        {/* --- TOP SECTION --- */}
        <div className="relative z-10 flex flex-col items-center pt-8 px-6 text-center">
          
          {/* Header Logos */}
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg mb-6">
            <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 w-auto object-contain" />
            <span className="text-white/30 font-light text-xs">|</span>
            <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-7 w-auto object-contain" />
          </div>

          <h4 className="text-[10px] tracking-[0.4em] text-gray-400 font-bold uppercase mb-1">
            PRESENTS
          </h4>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-2 font-futuristic">
            GLOBAL <br />
            <span className="text-gradient-purple-orange">TALENT</span> <br />
            HUNT 2026
          </h1>
          
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase mt-2 mb-6">
            Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
          </p>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* --- MIDDLE SECTION (Contest Details) --- */}
        <div className="relative z-10 flex flex-col px-8 flex-1 justify-center py-4">
          
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              {contest.category}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
              {contest.title}
            </h2>
            <p className="text-sm text-gray-300 font-medium px-4">
              {contest.subtitle}
            </p>
          </div>

          {/* Prize Pool Highlights */}
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="glass-panel rounded-2xl p-4 flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">Prize Pool</span>
              <span className="text-xl sm:text-2xl font-black text-white">{contest.prizeHighlight}</span>
            </div>
            
            <div className="glass-panel rounded-2xl p-4 flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">AWS Credits</span>
              <span className="text-xl sm:text-2xl font-black text-orange-400">$5,000</span>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION (QR & Call to Action) --- */}
        <div className="relative z-10 flex flex-col items-center pb-8 px-6">
          <div className="glass-panel rounded-3xl p-6 w-full flex items-center justify-between border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl">
            
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">The world is watching.</span>
              <span className="text-lg sm:text-xl font-black text-white">ARE YOU READY?</span>
              <span className="mt-2 text-sm font-bold text-purple-400 uppercase tracking-widest border-b border-purple-400/50 pb-1">
                Register Now
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-white rounded-xl p-1.5 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-lg" />
              </div>
              <span className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase">Scan to enter</span>
            </div>

          </div>
        </div>
        
      </div>

    </div>
  );
}
