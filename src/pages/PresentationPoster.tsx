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
        
        {/* Deep space background with subtle grid and radial glow */}
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* The Globe Background */}
        <div className="absolute inset-0 w-full h-[110%] top-[-5%] pointer-events-none z-0 opacity-80 flex items-center justify-center mix-blend-screen">
          <Globe />
        </div>

        {/* Dark gradient fade from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-0" />

        {/* --- LEFT CONTENT SECTION --- */}
        <div className="relative z-10 flex flex-col justify-center gap-10 w-[55%] h-full pt-8 pb-28 pl-32 pr-12">
          
          <div>
            {/* Header Logos */}
            <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full mb-8 max-w-fit shadow-lg ml-0 -translate-x-3 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-10 w-auto object-contain brightness-0 invert" />
              <span className="text-gray-500 font-light">×</span>
              <img src="/Partners/Brandforyoufull.png" alt="Brand For You" className="h-8 w-auto object-contain brightness-0 invert" />
            </div>

            {/* Typography mimicking Slide 1 */}
            <h1 className="text-[105px] font-black text-white leading-[0.95] tracking-tighter mb-4 font-sans drop-shadow-2xl">
              GLOBAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-orange-400 to-yellow-500 drop-shadow-lg">
                TALENT
              </span> HUNT<br />
              <span className="text-white">2026</span>
            </h1>
            
            <div className="flex flex-col items-start gap-5 mt-4 mb-2">
              <p className="text-[20px] font-bold tracking-[0.4em] text-white/70 uppercase">
                Showcase. Compete. Get <span className="text-purple-400">Discovered.</span>
              </p>
              
              <div className="inline-flex items-center px-8 py-4 bg-[#0a0a0f]/90 border border-white/10 rounded-full backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20" />
                <span className="relative z-10 text-white/90 text-[14px] font-black tracking-[0.3em] uppercase flex items-center gap-4">
                  FIRST COHORT STARTS <span className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-white drop-shadow-md">5TH SEPT 2026</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-3xl">
            <div className="relative">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-[1.1] mb-2 tracking-tight drop-shadow-2xl">
                {contest.title}
              </h2>
              <p className="text-lg text-gray-400 font-bold tracking-[0.2em] uppercase">
                {contest.subtitle}
              </p>
            </div>

            {/* Premium Bento Card for "Every Participant Gets" */}
            <div className="mt-4 relative rounded-[2rem] p-[1px] overflow-hidden group shadow-[0_20px_60px_rgba(16,185,129,0.1)] w-full max-w-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 via-emerald-500/10 to-transparent opacity-80" />
              <div className="w-full bg-[#05100a] rounded-[2rem] py-8 px-10 flex flex-col relative z-10 border border-white/5 shadow-[inset_0_0_40px_rgba(16,185,129,0.05)] overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-[32px] font-black text-white tracking-tight mb-3 leading-none">
                    EVERY PARTICIPANT GETS
                  </h3>
                  <p className="text-[18px] text-emerald-100/70 font-medium leading-relaxed">
                    Lifetime free access to <strong className="text-white">JobFinderAI</strong> &amp; <strong className="text-white">Fundfy.app</strong> — unlocking funding, grants, jobs, &amp; internships. Assured interviews for everyone*.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* --- RIGHT CONTENT SECTION (BENTO GRID) --- */}
        <div className="relative z-10 flex flex-col w-[45%] h-[800px] pt-20 pr-32 pl-4 gap-6 self-center justify-center">
          
          {/* Top Bento Card: ₹50 Lakhs / Free AI Education */}
          <div className="relative rounded-[2.5rem] p-[1px] overflow-hidden group shadow-[0_30px_80px_rgba(168,85,247,0.15)] w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-500/30 to-purple-500/50 opacity-100" />
            <div className="w-full bg-[#0a0510] rounded-[2.4rem] p-12 flex flex-col justify-center items-center text-center relative z-10 border border-white/5 overflow-hidden min-h-[280px]">
              {/* Mesh background effect */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block bg-white/10 text-white text-[12px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {ref === 'chinni' ? 'GUARANTEED OPPORTUNITIES' : 'THE ULTIMATE GRANT POOL'}
                </span>
                <div className={`flex flex-col items-center justify-center tracking-tighter ${ref === 'chinni' ? 'mt-1 mb-2' : ''}`}>
                  {ref === 'chinni' ? (
                    <>
                      <span className="text-[70px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] leading-[0.85]">
                        AI EDUCATION
                      </span>
                      <span className="text-[65px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-500 drop-shadow-lg leading-[0.85] mt-2">
                        & PLACEMENTS
                      </span>
                    </>
                  ) : (
                    <span className="text-[100px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-2xl leading-[0.9]">
                      ₹50 LAKHS
                    </span>
                  )}
                </div>
                <p className="text-[15px] font-bold text-white/70 max-w-sm mx-auto mt-4 leading-relaxed uppercase tracking-[0.2em]">
                  {ref === 'chinni' ? 'ADVANCED AI TRAINING AND GUARANTEED PLACEMENT OPPORTUNITIES' : 'FUNDING EXCEPTIONAL INDIVIDUALS & STARTUPS'}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bento Card: QR Code & Call to Action */}
          <div className="relative rounded-[2.5rem] p-[1px] overflow-hidden group shadow-[0_20px_60px_rgba(59,130,246,0.15)] w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-purple-500/10 opacity-80" />
            <div className="w-full bg-[#050a14] rounded-[2.4rem] p-10 flex flex-col justify-between items-center relative z-10 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden min-h-[400px]">
              <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <span className="text-sm font-black tracking-[0.5em] text-blue-400 uppercase mb-2">Ready To Transform?</span>
                <h3 className="text-5xl font-black text-white tracking-tight mb-8 drop-shadow-lg text-center">
                  START YOUR JOURNEY
                </h3>

                <div className="flex w-full items-center justify-center gap-12 px-4">
                  {/* QR Code */}
                  <div className="w-48 h-48 bg-white rounded-3xl p-4 shadow-[0_0_50px_rgba(255,255,255,0.15)] relative group z-10 shrink-0">
                    <div className="absolute -inset-1 border border-blue-500/50 rounded-[1.8rem] opacity-50 pointer-events-none" />
                    <img src={qrCodeUrl} alt="QR Code" className="w-full h-full rounded-2xl" />
                  </div>

                  {/* URL Text & CTA next to it */}
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="text-2xl font-black tracking-[0.4em] text-white/90 uppercase leading-snug drop-shadow-md">Scan to Apply</span>
                    <span className="text-[22px] font-bold tracking-widest text-blue-400">fundfy.app/{ref || ''}</span>
                    <span className="text-[13px] font-bold tracking-[0.3em] text-emerald-400 uppercase mt-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse">Registrations Open</span>
                  </div>
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
