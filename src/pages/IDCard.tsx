import React from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';
import Globe from '../components/ui/globe';

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
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-8 font-sans">

      {/* CR80 standard ID card: 1012×638px at 300dpi, scaled 2× = 1012×638 CSS px */}
      <div
        className="w-[1012px] h-[638px] relative overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #050510 100%)' }}
      >
        {/* Globe background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30 flex items-center justify-end">
          <div className="w-[700px] h-[700px] translate-x-[20%] translate-y-[10%]">
            <Globe />
          </div>
        </div>

        {/* Top gradient shimmer */}
        <div className="absolute top-0 left-0 w-full h-1 z-20"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #f97316, #7c3aed)' }} />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-0" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 flex h-full">

          {/* LEFT STRIPE — accent color */}
          <div className="w-[6px] h-full flex-shrink-0"
            style={{ background: 'linear-gradient(180deg, #7c3aed, #f97316)' }} />

          {/* LEFT SECTION */}
          <div className="flex flex-col justify-between py-10 px-10 w-[54%]">

            {/* Top: logos */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 max-w-fit shadow-lg">
                <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-7 w-auto object-contain" />
                <span className="text-black/20 font-light text-lg">|</span>
                <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-7 w-auto object-contain" />
              </div>

              <p className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase mt-1">
                PRESENTS · GLOBAL TALENT HUNT 2026
              </p>
            </div>

            {/* Middle: person info */}
            <div className="flex flex-col gap-3">
              {/* Designation badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase max-w-fit"
                style={{ background: 'linear-gradient(90deg,#7c3aed22,#f9731622)', border: '1px solid #7c3aed55', color: '#c4b5fd' }}>
                {person.designation}
              </span>

              <h2 className="text-[52px] font-black text-white leading-[1] tracking-tight">
                {person.name}
              </h2>

              <div className="flex items-center gap-3 mt-1">
                <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg,#7c3aed,#f97316)' }} />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase">Employee ID</span>
                  <span className="text-base font-black text-white tracking-widest">{person.employeeId}</span>
                </div>
              </div>
            </div>

            {/* Bottom: sponsors */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">Powered By</p>
              <div className="flex items-center gap-5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                  alt="AWS" className="h-5 w-auto object-contain brightness-0 invert opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
                  alt="Google Cloud" className="h-4 w-auto object-contain brightness-0 invert opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                  alt="IBM" className="h-5 w-auto object-contain brightness-0 invert opacity-70" />
              </div>
              <div className="flex items-center gap-5 mt-1">
                <img src="/Partners/JobFinderAI.png" alt="JobFinderAI" className="h-5 w-auto object-contain opacity-50" />
                <img src="/Partners/DiceArtFilms_v2.png" alt="Dice Art Films" className="h-5 w-auto object-contain opacity-50" />
                <img src="/Partners/MoreYeahs.png" alt="MoreYeahs" className="h-4 w-auto object-contain opacity-50" />
                <img src="/Partners/TingoAI.png" alt="Tingo" className="h-4 w-auto object-contain opacity-50" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-center justify-center gap-6 flex-1 pr-12">

            {/* QR code */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-black rounded-2xl p-3 border border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                <img src={qrUrl} alt="Referral QR" className="w-32 h-32 rounded-lg" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase">Scan to Register</p>
                <p className="text-[10px] font-bold text-purple-400 tracking-wide">{referralUrl}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-20 h-[1px] bg-white/10" />

            {/* Event info */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">First Cohort</span>
              <span className="text-base font-black text-white tracking-widest">30 AUG 2026</span>
              <span className="text-[9px] text-white/30 tracking-widest mt-1">fundfy.app</span>
            </div>
          </div>

        </div>

        {/* Bottom gradient shimmer */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] z-20"
          style={{ background: 'linear-gradient(90deg, #f97316, #7c3aed, #f97316)' }} />
      </div>
    </div>
  );
}
