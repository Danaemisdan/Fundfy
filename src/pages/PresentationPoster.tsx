import React from 'react';
import { useParams, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { CONTESTS } from '../data/contests';
import Globe from '../components/ui/globe';

export default function PresentationPoster() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const contest = CONTESTS.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/" replace />;
  }

  const targetUrl = `https://fundfy.app/?contest=${contest.id}${ref ? `&ref=${ref}` : ''}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl)}&color=000000&bgcolor=ffffff`;
  
  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-0 selection:bg-purple-500/30 font-sans">
      
      {/* 1920x1080 Canvas (16:9 Presentation Ratio) */}
      <div className="w-[1920px] h-[1080px] relative overflow-hidden flex bg-[#050505]">
        
        {/* The Globe Background (shifted to the right) */}
        <div className="absolute top-[-10%] right-[-20%] w-[120%] h-[120%] pointer-events-none z-0 opacity-85 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent pointer-events-none z-0" />

        {/* --- LEFT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-between w-[55%] h-full pt-12 pb-28 pl-24 pr-12">
          
          <div>
            {/* Header Logos */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-4 max-w-fit shadow-lg">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 w-auto object-contain brightness-0 invert" />
              <span className="text-gray-500 font-light text-xl">|</span>
              <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-6 w-auto object-contain brightness-0 invert" />
            </div>

            <h4 className="text-[12px] tracking-[0.5em] text-gray-400 font-bold uppercase mb-2">
              PRESENTS
            </h4>

            <h1 className="text-[100px] font-black text-white leading-[0.85] tracking-tighter mb-4 font-sans drop-shadow-2xl uppercase">
              GLOBAL <br />
              <span className="text-gradient-purple-orange">TALENT</span> HUNT 2026
            </h1>
            
            <p className="text-xl font-bold tracking-[0.4em] text-white/70 uppercase mt-4 mb-6">
              Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight drop-shadow-2xl max-w-3xl">
                {contest.title}
              </h2>
              <p className="text-xl text-gray-400 font-bold tracking-[0.2em] uppercase">
                {contest.subtitle}
              </p>
            </div>

            {/* Benefits Banner */}
            <div className="mt-4 relative overflow-hidden bg-gradient-to-r from-emerald-900/80 via-emerald-800/80 to-emerald-900/80 rounded-3xl p-[2px] w-full max-w-3xl shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 animate-pulse" />
              <div className="bg-[#050505]/95 backdrop-blur-2xl rounded-[1.4rem] py-6 px-8 w-full flex flex-col items-start justify-center relative z-10 border border-emerald-500/30">
                
                <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-[0.4em] rounded-full uppercase border border-emerald-500/20 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Assured Benefits
                </span>
                
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 tracking-tight uppercase mb-2 drop-shadow-2xl leading-tight">
                  Assured Internships & Interviews
                </span>
                
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">
                    + Lifetime JobFinderAI
                  </span>
                  <span className="text-gray-600">|</span>
                  <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">
                    + Free Momentum EDU+
                  </span>
                </div>

              </div>
            </div>
            
          </div>
        </div>

        {/* --- RIGHT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-center items-end w-[45%] h-full pt-12 pb-28 pr-24 pl-4 gap-10">
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 w-full max-w-lg flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(255,255,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="text-base font-black tracking-[0.5em] text-gray-300 uppercase mb-2">Prize Pool</span>
            <span className="text-7xl font-black text-white whitespace-nowrap tracking-tight leading-none drop-shadow-lg">
              ₹50 LAKHS
            </span>
          </div>

          <div className="relative glass-panel rounded-[2rem] p-8 w-full max-w-lg flex flex-col items-center border border-white/20 bg-gradient-to-br from-purple-900/60 to-blue-900/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-1 relative z-10 text-center mb-6">
              <span className="text-xs font-bold tracking-[0.4em] text-purple-300 uppercase">The World Is Watching</span>
              <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-tight">
                PROVE YOUR WORTH
              </span>
            </div>

            <div className="flex items-center gap-8 relative z-10">
              <div className="w-40 h-40 bg-white rounded-3xl p-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative">
                <div className="absolute inset-0 border-2 border-purple-500/50 rounded-3xl animate-pulse pointer-events-none" />
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-2xl" />
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-base font-black tracking-[0.4em] text-white/90 uppercase leading-snug">Scan to<br/>Apply</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* --- BOTTOM PARTNERS STRIP --- */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl flex items-center justify-between py-6 px-24 shadow-[0_-10px_50px_rgba(0,0,0,0.5)] z-20">
          <div className="flex items-center gap-6">
            <span className="text-xs text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Powered By</span>
            <div className="flex items-center gap-8 border-l border-gray-300 pl-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 object-contain" />
            </div>
          </div>
          
          <div className="flex items-center gap-8 border-l border-gray-300 pl-8">
            <span className="text-xs text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Partners</span>
            <div className="flex items-center gap-6 opacity-100">
              <img src="/Partners/BrandForYou.png" className="h-8 object-contain" alt="BrandForYou" />
              <img src="/Partners/DiceArtFilms_v2.png" className="h-8 object-contain" alt="Dice Art" />
              <img src="/Partners/JobFinderAI.png?v=3" className="h-7 object-contain" alt="JobFinderAI" />
              <img src="/Partners/MoreYeahs.png?v=3" className="h-7 object-contain" alt="MoreYeahs" />
              <img src="/Partners/XOXO_v2.png" className="h-8 object-contain" alt="XOXO" />
              <img src="/Partners/Young_v2.png" className="h-8 object-contain" alt="Young Coders" />
              <img src="/Partners/TingoAI.png" className="h-8 object-contain" alt="Tingo" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
