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
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 pointer-events-none z-0" />

        {/* The Globe Background (centered to fill the empty space) */}
        <div className="absolute inset-0 w-full h-[110%] top-[-5%] pointer-events-none z-0 opacity-100 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* --- LEFT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-between w-[50%] h-full pt-16 pb-32 pl-32 pr-8">
          
          <div>
            {/* Header Logos */}
            <div className="flex items-center gap-6 bg-white px-8 py-3 rounded-full mb-8 max-w-fit shadow-lg ml-0 -translate-x-3">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-10 w-auto object-contain" />
              <span className="text-gray-300 font-light">×</span>
              <img src="/Partners/Brandforyoufull.png" alt="Brand For You" className="h-8 w-auto object-contain" />
            </div>



            <h1 className="text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-6 font-sans drop-shadow-2xl uppercase">
              GLOBAL <br />
              <span className="text-gradient-purple-orange">TALENT</span> HUNT 2026
            </h1>
            
            <div className="flex flex-col items-start gap-5 mt-4 mb-6">
              <p className="text-xl font-bold tracking-[0.4em] text-white/70 uppercase">
                Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
              </p>
              <div className="inline-flex items-center px-8 py-3.5 bg-[#0a0a0f]/90 border border-white/10 rounded-full backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
                <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70" />
                <div className="absolute bottom-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70" />
                <span className="relative z-10 text-white/90 text-[13px] font-black tracking-[0.3em] uppercase flex items-center gap-3">
                  FIRST COHORT STARTS <span className="text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.4)]">30TH AUG 2026</span>
                </span>
              </div>
            </div>
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
            <div className="mt-6 relative overflow-hidden bg-gradient-to-r from-emerald-900/60 to-emerald-900/40 rounded-3xl w-full max-w-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] border border-emerald-500/30">
              <div className="bg-[#050505]/80 backdrop-blur-xl rounded-3xl py-7 px-8 w-full flex flex-col items-start justify-center relative z-10">
                
                <span className="text-[28px] font-black text-white tracking-tight uppercase mb-3 drop-shadow-lg leading-tight">
                  <span className="text-emerald-400 mr-2">EVERY PARTICIPANT GETS:</span><br/>
                  Assured Internships & Interviews
                </span>
                
                <div className="flex items-center">
                  <span className="text-emerald-300 font-semibold tracking-[0.1em] text-sm leading-relaxed">
                    Lifetime free access to JobFinderAI &amp; Fundfy.app — unlocking funding, grants, jobs, &amp; internships.
                  </span>
                </div>

              </div>
            </div>
            
          </div>
        </div>

        {/* --- RIGHT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-center items-center w-[50%] h-full pt-16 pb-32 pr-32 pl-12 gap-12">
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 w-full max-w-xl flex flex-col items-center justify-center text-center shadow-[0_0_80px_rgba(255,255,255,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="text-[4rem] font-black text-white whitespace-nowrap tracking-tight leading-[1.1] drop-shadow-lg uppercase">
              ₹50 LAKHS
            </span>
            <span className="text-[13px] md:text-sm font-black tracking-[0.2em] text-gray-300 uppercase mt-3 text-center max-w-[85%] leading-relaxed">
              STARTUP FUNDING & GRANTS
            </span>
          </div>

          <div className="relative glass-panel rounded-[2.5rem] p-10 w-full max-w-lg flex flex-col items-center border border-white/20 bg-gradient-to-br from-purple-900/60 to-blue-900/40 backdrop-blur-3xl shadow-[0_0_60px_rgba(168,85,247,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-2 relative z-10 text-center mb-8">
              <span className="text-sm font-black tracking-[0.5em] text-purple-300 uppercase">Ready To Transform?</span>
              <span className="text-4xl font-black text-white tracking-tight">
                START YOUR JOURNEY
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-44 h-44 bg-white rounded-3xl p-4 shadow-[0_0_50px_rgba(255,255,255,0.3)] relative group">
                <div className="absolute -inset-1 border-2 border-purple-500/70 rounded-[1.8rem] animate-pulse pointer-events-none" />
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-2xl" />
              </div>
              <span className="text-lg font-black tracking-[0.4em] text-white/90 uppercase mt-2">SCAN TO APPLY</span>
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
              <img src="/Partners/TechMahindra.png" className="h-10 scale-[1.3] object-contain ml-2 mr-2" alt="Tech Mahindra" />
              <img src="/Partners/Foxconn.svg" className="h-6 object-contain" alt="Foxconn" />
            </div>
          </div>
          
          <div className="flex items-center gap-8 border-l border-gray-300 pl-8">
            <span className="text-xs text-black/40 tracking-[0.4em] font-black uppercase whitespace-nowrap">Partners</span>
            <div className="flex items-center gap-6 opacity-100">
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
