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
      <div id="id-card-element" className="relative group perspective-1000">
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-[2.5rem] blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-gradient-xy"
        />
        
        {/* Full complete gradient border wrapper */}
        <div className="relative p-[3px] rounded-[2rem] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 shadow-2xl">
          {/* CR80 standard ID card aspect ratio: 1012×638px at 300dpi */}
          <div className="w-[900px] h-[567px] relative bg-[#0a0a0a] backdrop-blur-3xl rounded-[calc(2rem-3px)] overflow-hidden flex flex-col">
            
            {/* Minimal Sheen Overlay */}

            {/* Animated Sheen/Glare Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-40 pointer-events-none" />

          {/* ── CONTENT ── */}
          <div className="relative z-10 flex h-full p-12">
            
            {/* LEFT SECTION */}
            <div className="flex flex-col w-[55%] h-full pr-8">
              
              {/* Top: logos */}
              <div className="flex items-center gap-6 mb-8">
                <img src="/Partners/Fundfy.png" alt="Fundfy" className="h-10 w-auto object-contain opacity-100" />
                <span className="w-px h-6 bg-white/20" />
                <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-10 w-auto object-contain opacity-100" />
              </div>

              {/* Title & Designation */}
              <div className="flex flex-col gap-3 mb-6">
                <p className="text-[11px] font-black tracking-[0.4em] text-white/80 uppercase">
                  GLOBAL TALENT HUNT 2026
                </p>
                <span className="inline-flex items-center text-[11px] font-black tracking-[0.3em] uppercase max-w-fit text-white">
                  {person.designation}
                </span>
              </div>

              {/* Name & ID */}
              <div className="flex flex-col mb-auto">
                <h2 className="text-[64px] font-black text-white leading-[1.1] tracking-tight">
                  {person.name}
                </h2>
                
                <div className="flex flex-col mt-8">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase mb-1.5">Identification Number</span>
                  <span className="text-2xl font-mono font-medium text-white tracking-widest">{person.employeeId}</span>
                </div>
              </div>

              {/* Bottom: sponsors */}
              <div className="flex flex-col gap-4 mt-auto bg-white px-6 py-5 rounded-[1.5rem] shadow-xl w-fit">
                <p className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-black/20" /> Powered By
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
                      alt="AWS" className="h-6 w-auto object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" 
                      alt="Google Cloud" className="h-5 w-auto object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" 
                      alt="IBM" className="h-6 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-5">
                    <img src="/Partners/JobFinderAI.png" alt="JobFinderAI" className="h-5 w-auto object-contain" />
                    <img src="/Partners/DiceArtFilms_v2.png" alt="Dice Art Films" className="h-5 w-auto object-contain" />
                    <img src="/Partners/MoreYeahs.png" alt="MoreYeahs" className="h-4 w-auto object-contain" />
                    <img src="/Partners/TingoAI.png" alt="Tingo" className="h-4 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - QR Code & Meta */}
            <div className="flex flex-col items-center justify-between h-full flex-1 border-l border-white/10 pl-10">
              
              {/* QR code */}
              <div className="flex flex-col items-center w-full mt-4">
                <div className="bg-white rounded-[2rem] p-5 shadow-2xl">
                  <img src={qrUrl} alt="Referral QR" className="w-[180px] h-[180px] rounded-xl" />
                </div>

                <div className="flex flex-col items-center gap-2 mt-6 text-center">
                  <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">Scan to Register</p>
                  <p className="text-[11px] font-mono font-medium text-white/80">{referralUrl}</p>
                </div>
              </div>

              {/* Event info */}
              <div className="flex flex-col items-center gap-1.5 text-center mb-2">
                <span className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">First Cohort</span>
                <span className="text-2xl font-black text-white tracking-widest mt-1">
                  30 AUG 2026
                </span>
                <span className="inline-flex items-center text-[10px] font-bold text-white/30 tracking-widest mt-3 uppercase bg-white/5 px-4 py-1.5 rounded-full">
                  fundfy.app
                </span>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

    </div>
  );
}
