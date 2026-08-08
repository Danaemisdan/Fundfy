import React from 'react';
import { Globe2, UserCheck, Gift, Rocket } from 'lucide-react';

const PARTNERS = [
  "/Partners/AWS_v2.png",
  "/Partners/Epic_Games_logo.svg.webp",
  "/Partners/Aurora OS.png?v=3",
  "/Partners/BrandForYou.png",
  "/Partners/DiceArtFilms.png?v=3",
  "/Partners/JobFinderAI.png?v=3",
  "/Partners/MoreYeahs.png?v=3",
  "/Partners/XOXO_v2.png",
  "/Partners/Young_v2.png",
  "/Partners/TingoAI.png"
];

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3 max-w-[200px]">
      <div className="text-gray-800 mt-1">
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5, className: 'w-5 h-5' } as any)}
      </div>
      <div>
        <h4 className="text-[10px] md:text-xs font-bold text-gray-900 mb-0.5 tracking-wide">{title}</h4>
        <p className="text-[10px] text-gray-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 md:px-8 lg:px-16 pb-6 shrink-0 w-full max-w-7xl mx-auto flex flex-col gap-4 mt-20">
      
      {/* Powered By with Marquee */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden flex flex-col">
        <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-4 ml-2 uppercase">POWERED BY</p>
        <div className="flex w-full overflow-hidden relative bg-white">
          <div className="flex w-max manual-marquee space-x-8 md:space-x-12 items-center pr-8 md:pr-12 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((src, i) => {
              let scaleClass = '';
              if (src.includes('TingoAI')) scaleClass = 'scale-75';
              if (src.includes('AWS')) scaleClass = 'scale-[1.1]';
              
              return (
                <div key={i} className="w-24 h-12 md:w-32 md:h-16 flex items-center justify-center shrink-0">
                  <img src={src} alt="Partner Logo" className={`max-w-full max-h-full object-contain transition-opacity mix-blend-multiply ${scaleClass}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Row */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-between gap-y-6 gap-x-4 p-4 md:p-6 lg:px-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm relative z-20">
        <Feature icon={<Globe2 />} title="GLOBAL EXPOSURE" desc="Get seen by industry leaders worldwide." />
        <Feature icon={<UserCheck />} title="EXPERT MENTORSHIP" desc="Learn and grow with the best." />
        <Feature icon={<Gift />} title="AMAZING REWARDS" desc="Win cash prizes and exciting perks." />
        <Feature icon={<Rocket />} title="CAREER BOOST" desc="Opportunities that take you further." />
      </div>

      {/* Bottom Pill */}
      <div className="w-full bg-[#11131c] rounded-full py-3 md:py-4 flex items-center justify-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/90 uppercase overflow-hidden relative">
        <span>TALENT HAS NO BOUNDARIES.</span>
        <span className="text-purple-400">THIS IS YOUR STAGE.</span>
      </div>
    </footer>
  );
}
