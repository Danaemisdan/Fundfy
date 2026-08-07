import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe as GlobeIcon, ArrowUpRight, Trophy, Globe2, UserCheck, Gift, Rocket } from 'lucide-react';
import Globe from '../components/ui/globe';
import ContestShowcase from '../components/home/ContestShowcase';

const PARTNERS = [
  "/Partners/AWS.webp",
  "/Partners/Aurora OS.png",
  "/Partners/BrandForYou.png",
  "/Partners/DiceArtFilms.png",
  "/Partners/JobFinderAI.png",
  "/Partners/MoreYeahs.jpeg",
  "/Partners/XOXO Game Studios.png",
  "/Partners/Young Coders.png"
];

function RightGlobe() {
  return (
    <div className="absolute top-[55%] md:top-1/2 right-0 -translate-y-[45%] translate-x-[25%] md:translate-x-[15%] w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] max-w-[1000px] max-h-[1000px] pointer-events-none z-0 opacity-100 flex items-center justify-center">
      <Globe />
    </div>
  );
}

function Home() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');

  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone === 'Asia/Calcutta' || timeZone === 'Asia/Kolkata') {
        setCurrency('INR');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="w-full font-sans relative overflow-x-hidden bg-[#050505]">
      
      {/* ORIGINAL HOMEPAGE - 100vh EXACTLY AS IT WAS */}
      <div className="h-screen w-full bg-[#f8f9fc] flex flex-col justify-between overflow-hidden relative rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-blue-50/50 pointer-events-none z-0" />
        
        <RightGlobe />

        {/* HEADER */}
        <header className="relative z-10 flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 pt-6 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <GlobeIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-700 shrink-0" strokeWidth={1} />
            <div className="text-[10px] md:text-sm font-medium text-gray-600 leading-tight">
              One World. Endless Talent.<br />
              Limitless Opportunities.
            </div>
          </div>
          
          <Link to="/register" className="flex items-center justify-center px-6 py-3 md:py-3.5 bg-[#11131c] text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden border border-white/10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center gap-2 relative z-10">
              <span className="font-bold tracking-[0.2em] text-[10px] md:text-[12px] text-white">REGISTER NOW</span>
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </header>

        {/* MAIN CONTENT */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-8 lg:px-16 w-full max-w-7xl mx-auto mt-4 md:mt-0">
          <div className="relative max-w-3xl">
            <h1 className="font-futuristic font-bold text-6xl md:text-[9vh] lg:text-[11vh] leading-[0.9] tracking-tighter text-[#1e2335]">
              GLOBAL<br />
              <span className="text-gradient-purple-orange pr-2 pb-2 inline-block">TALENT</span><br />
              HUNT <span className="font-light text-gray-400 ml-1 md:ml-2">2026</span>
            </h1>
            
            <p className="mt-4 text-xs md:text-base lg:text-lg font-semibold tracking-[0.1em] md:tracking-[0.2em] text-gray-600">
              SHOWCASE. COMPETE. GET <span className="text-purple-600">DISCOVERED.</span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 relative z-20">
              <div className="flex items-center gap-4 md:gap-5 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl md:rounded-3xl pr-6 md:pr-8 shadow-sm">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-[2px] shrink-0">
                  <div className="w-full h-full bg-white/80 rounded-[14px] md:rounded-[22px] flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-6 h-6 md:w-10 md:h-10 text-purple-600" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="py-2">
                  <p className="text-[10px] md:text-sm font-semibold tracking-wider text-gray-500 uppercase">FIRST PRIZE</p>
                  <h2 className="text-3xl md:text-5xl font-bold font-futuristic text-[#1e2335] leading-none mt-1 flex items-baseline gap-3">
                    {currency === 'INR' ? '₹9,00,000' : '$10,000'}
                  </h2>
                </div>
              </div>
              
              {/* AWS Credits Pill */}
              <div className="sm:ml-2 flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-md border border-orange-200/50 rounded-full pr-3 md:pr-4 pl-1.5 py-1 shadow-sm hover:shadow transition-shadow">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden">
                  <img src="/Partners/AWS.webp" alt="AWS" className="w-full h-full object-contain mix-blend-multiply scale-[2.5]" />
                </div>
                <p className="text-[10px] md:text-xs font-bold text-gray-700 tracking-wide mt-0.5">
                  GIVING AWAY <span className="text-orange-500 text-[11px] md:text-sm">$5,000</span> IN CREDITS
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* BOTTOM SECTION */}
        <footer className="relative z-10 px-8 lg:px-16 pb-6 shrink-0 w-full max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* Powered By - Static */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col">
            <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-4 ml-2 uppercase text-center md:text-left">POWERED BY</p>
            <div className="grid grid-cols-4 md:flex md:flex-wrap md:justify-between items-center gap-6 md:gap-4 w-full px-2">
              {PARTNERS.map((src, i) => (
                <div key={i} className="h-10 md:h-12 lg:h-16 flex items-center justify-center shrink-0">
                  <img src={src} alt="Partner Logo" className="h-full w-auto max-w-[80px] md:max-w-[130px] object-contain mix-blend-multiply" />
                </div>
              ))}
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
      </div>

      {/* NEW SECTION BELOW ORIGINAL HOMEPAGE */}
      <ContestShowcase />

    </div>
  );
}

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

export default Home;
