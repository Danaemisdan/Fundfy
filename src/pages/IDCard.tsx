import React, { useEffect } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';

// Referrer data — add all referrers here
const REFERRERS: Record<string, { name: string; designation: string; employeeId: string }> = {
  chinni:            { name: 'Chinni Ganapathi',    designation: 'Chief Marketing Officer', employeeId: 'GTH-2026-001' },
  hgnma50:           { name: 'Ambassador',           designation: 'Brand Ambassador',       employeeId: 'GTH-2026-002' },
  uiapm3492:         { name: 'Ambassador',           designation: 'Brand Ambassador',       employeeId: 'GTH-2026-003' },
  shruti1:           { name: 'Shruti',               designation: 'Campus Ambassador',      employeeId: 'GTH-2026-004' },
  shruti:            { name: 'Shruti',               designation: 'Campus Ambassador',      employeeId: 'GTH-2026-005' },
  uhg0192ha:         { name: 'Ambassador',           designation: 'Brand Ambassador',       employeeId: 'GTH-2026-006' },
  shrishtipaagal:    { name: 'Shrishti',             designation: 'Campus Ambassador',      employeeId: 'GTH-2026-007' },
  harshasai:         { name: 'Harsha Sai',           designation: 'Senior Ambassador',      employeeId: 'GTH-2026-008' },
  'dannyk.virtualex':{ name: 'Danny K',              designation: 'Marketing Partner',      employeeId: 'GTH-2026-009' },
  admin:             { name: 'Admin',                designation: 'Administrator',          employeeId: 'GTH-2026-000' },
  chandra:           { name: 'Chandra',              designation: 'Brand Ambassador',       employeeId: 'GTH-2026-010' },
};

export default function IDCard() {
  const { ref } = useParams<{ ref: string }>();
  const [searchParams] = useSearchParams();

  if (!ref || !REFERRERS[ref]) {
    return <Navigate to="/" replace />;
  }

  const person = REFERRERS[ref];
  const referralUrl = `https://fundfy.app/?ref=${ref}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(referralUrl)}&color=ffffff&bgcolor=000000`;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden relative">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* The ID Card Container with glowing gradient border */}
      <div className="relative group perspective-1000">
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-[2.5rem] blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-gradient-xy"
        />
        
        {/* Full complete gradient border wrapper */}
        <div className="relative p-[3px] rounded-[2rem] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 shadow-2xl">
          {/* CR80 standard ID card aspect ratio: 1012×638px at 300dpi */}
          <div className="w-[900px] h-[567px] relative bg-[#0a0a0a] backdrop-blur-3xl rounded-[calc(2rem-3px)] overflow-hidden flex flex-col">
            
            {/* Lanyard Hole */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-[#050505] border border-white/10 shadow-inner z-50 flex items-center justify-center">
              <div className="w-12 h-1 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Animated Sheen/Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-40 pointer-events-none" />

          {/* ── CONTENT ── */}
          <div className="relative z-10 flex h-full p-10 mt-4">
            
            {/* LEFT SECTION */}
            <div className="flex flex-col justify-between w-[55%]">
              
              {/* Top: logos */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 max-w-fit backdrop-blur-md">
                  <img src="/Partners/Fundfy.png" alt="Fundfy" className="h-8 w-auto object-contain drop-shadow-lg" />
                  <span className="w-px h-6 bg-white/20" />
                  <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-8 w-auto object-contain brightness-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
                  <p className="text-[11px] font-black tracking-[0.4em] text-white/50 uppercase">
                    GLOBAL TALENT HUNT 2026
                  </p>
                </div>
              </div>

              {/* Middle: person info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase max-w-fit bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    {person.designation}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/40">
                    VIP ACCESS
                  </span>
                </div>

                <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-tight tracking-tight drop-shadow-sm">
                  {person.name}
                </h2>

                <div className="flex items-center gap-4 mt-2 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-fit backdrop-blur-sm">
                  <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-purple-500 to-orange-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase mb-0.5">Identification Number</span>
                    <span className="text-xl font-mono font-bold text-white tracking-widest">{person.employeeId}</span>
                  </div>
                </div>
              </div>

              {/* Bottom: sponsors */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-white/30" /> Powered By
                </p>
                <div className="flex items-center gap-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
                    alt="AWS" className="h-6 w-auto object-contain brightness-0 invert opacity-100 drop-shadow-sm" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" 
                    alt="Google Cloud" className="h-5 w-auto object-contain brightness-0 invert opacity-100 drop-shadow-sm" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" 
                    alt="IBM" className="h-6 w-auto object-contain brightness-0 invert opacity-100 drop-shadow-sm" />
                </div>
                <div className="flex items-center gap-5 mt-1">
                  <img src="/Partners/JobFinderAI.png" alt="JobFinderAI" className="h-5 w-auto object-contain opacity-100 drop-shadow-sm" />
                  <img src="/Partners/DiceArtFilms_v2.png" alt="Dice Art Films" className="h-5 w-auto object-contain opacity-100 drop-shadow-sm" />
                  <img src="/Partners/MoreYeahs.png" alt="MoreYeahs" className="h-4 w-auto object-contain opacity-100 drop-shadow-sm brightness-200" />
                  <img src="/Partners/TingoAI.png" alt="Tingo" className="h-4 w-auto object-contain opacity-100 drop-shadow-sm brightness-150" />
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - QR Code & Meta */}
            <div className="flex flex-col items-center justify-center gap-8 flex-1 border-l border-white/5 pl-10">
              
              {/* QR code scanner box */}
              <div className="flex flex-col items-center gap-5 w-full">
                <div className="relative group/qr">
                  {/* Scanner Corner Brackets */}
                  <div className="absolute -inset-4 border-2 border-purple-500/20 rounded-2xl transition-colors group-hover/qr:border-purple-500/50" />
                  <div className="absolute top-[-16px] left-[-16px] w-6 h-6 border-t-2 border-l-2 border-purple-400 rounded-tl-2xl" />
                  <div className="absolute top-[-16px] right-[-16px] w-6 h-6 border-t-2 border-r-2 border-purple-400 rounded-tr-2xl" />
                  <div className="absolute bottom-[-16px] left-[-16px] w-6 h-6 border-b-2 border-l-2 border-purple-400 rounded-bl-2xl" />
                  <div className="absolute bottom-[-16px] right-[-16px] w-6 h-6 border-b-2 border-r-2 border-purple-400 rounded-br-2xl" />
                  
                  <div className="bg-white rounded-xl p-3 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                    <img src={qrUrl} alt="Referral QR" className="w-[180px] h-[180px] rounded-lg" />
                  </div>
                  
                  {/* Scanner laser line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400 shadow-[0_0_10px_#a855f7] opacity-0 group-hover/qr:opacity-100 group-hover/qr:animate-scan" />
                </div>

                <div className="flex flex-col items-center gap-2 mt-2 text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full backdrop-blur-sm">
                  <p className="text-[10px] font-black tracking-[0.3em] text-purple-400 uppercase">Scan to Register</p>
                  <p className="text-[11px] font-mono font-medium text-white/70 truncate w-full">{referralUrl}</p>
                </div>
              </div>

              {/* Event info */}
              <div className="flex flex-col items-center gap-1.5 text-center mt-auto">
                <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">First Cohort</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500 tracking-widest">
                  30 AUG 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white/30 tracking-widest mt-2 uppercase bg-white/5 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> fundfy.app
                </span>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          50% { top: 100%; opacity: 1; }
          50.1% { top: 100%; opacity: 0; }
          100% { top: 0; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
