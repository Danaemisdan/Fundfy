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
        <div className="relative z-10 flex flex-col justify-between w-[60%] h-full py-16 pl-24 pr-12">
          
          <div>
            {/* Header Logos */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 mb-8 max-w-fit">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-6 w-auto object-contain brightness-0 invert" />
              <span className="text-gray-500 font-light text-xl">|</span>
              <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>

            <h4 className="text-[14px] tracking-[0.5em] text-gray-400 font-bold uppercase mb-4">
              PRESENTS
            </h4>

            <h1 className="text-7xl font-black text-white leading-[0.95] tracking-tighter mb-4 font-futuristic">
              GLOBAL <br />
              <span className="text-gradient-purple-orange">TALENT</span> HUNT 2026
            </h1>
            
            <p className="text-lg font-bold tracking-[0.3em] text-white/70 uppercase mt-4 mb-12">
              Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative">
              <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight drop-shadow-2xl max-w-3xl">
                {contest.title}
              </h2>
              <p className="text-2xl text-gray-400 font-bold tracking-[0.2em] uppercase">
                {contest.subtitle}
              </p>
            </div>

            {contest.id === 'ai-education-innovation-contest' ? (
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/90 via-emerald-800/90 to-emerald-900/90 rounded-[2rem] p-[2px] w-full max-w-3xl shadow-[0_0_40px_rgba(16,185,129,0.3)] mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 animate-pulse" />
                <div className="bg-[#050505]/95 backdrop-blur-xl rounded-[2rem] py-6 px-8 w-full flex flex-col items-start relative z-10 border border-emerald-500/20">
                  <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[12px] font-black tracking-[0.4em] rounded-full uppercase border border-emerald-500/20 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    FOR EVERY PARTICIPANT
                  </span>
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight uppercase mb-2 drop-shadow-lg leading-tight">
                    Assured Internships & Interviews
                  </span>
                  <span className="text-lg font-bold text-emerald-400/90 tracking-wide uppercase">
                    With Lifetime JobFinderAI & Momentum EDU+
                  </span>
                </div>
              </div>
            ) : (
              <div className="glass-panel bg-orange-500/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-3xl border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.15)] mt-4">
                <span className="text-2xl font-bold text-orange-400 tracking-wide">
                  AWS is sponsoring $5,000 for each winner*
                </span>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-center items-end w-[40%] h-full py-16 pr-24 pl-12 gap-12">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] py-10 px-12 w-full max-w-lg flex flex-col items-center justify-center text-center shadow-[0_0_80px_rgba(255,255,255,0.15)] transform hover:scale-105 transition-transform duration-500">
            <span className="text-xl font-black tracking-[0.5em] text-gray-500 uppercase mb-4">Prize Pool</span>
            <span className="text-8xl font-black text-black whitespace-nowrap tracking-tight leading-none">
              ₹50 LAKHS
            </span>
          </div>

          <div className="relative glass-panel rounded-[3rem] p-8 w-full max-w-lg flex flex-col items-center border border-white/20 bg-gradient-to-br from-purple-900/60 to-blue-900/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-2 relative z-10 text-center mb-8">
              <span className="text-sm font-bold tracking-[0.4em] text-purple-300 uppercase">The World Is Watching</span>
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-tight">
                PROVE YOUR WORTH
              </span>
            </div>

            <div className="flex items-center gap-8 relative z-10">
              <div className="w-48 h-48 bg-white rounded-3xl p-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative">
                <div className="absolute inset-0 border-2 border-purple-500/50 rounded-3xl animate-pulse pointer-events-none" />
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-2xl" />
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-lg font-black tracking-[0.4em] text-white/90 uppercase">Scan to<br/>Apply</span>
                <div className="bg-white text-black px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.4)] text-center">
                  Apply Now
                </div>
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
