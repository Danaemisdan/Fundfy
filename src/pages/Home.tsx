import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MotionButton } from '../components/ui/MotionButton';
import { Globe as GlobeIcon, ArrowUpRight, Trophy, Globe2, UserCheck, Gift, Rocket } from 'lucide-react';
import Globe from '../components/ui/globe';
import ContestShowcase from '../components/home/ContestShowcase';

const PARTNERS = [
  "/Partners/AWS_v2.png",
  "/Partners/Epic_Games_logo.svg.webp",
  "/Partners/Aurora OS.png?v=3",
  "/Partners/BrandForYou.png",
  "/Partners/DiceArtFilms_v2.png",
  "/Partners/JobFinderAI.png?v=3",
  "/Partners/MoreYeahs.png?v=3",
  "/Partners/XOXO_v2.png",
  "/Partners/Young_v2.png",
  "/Partners/TingoAI.png"
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
  const navigate = useNavigate();
  const delayBase = !sessionStorage.getItem('splashPlayed') ? 6.2 : 0;

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
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="flex items-center gap-2 md:gap-3">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-5 md:h-7 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
              <span className="text-gray-300 font-light hidden md:block">|</span>
              <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-7 md:h-9 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
            </div>
            <div className="w-[1px] h-6 bg-gray-300 hidden md:block opacity-50 ml-1"></div>
            <div className="text-[7px] md:text-[9px] font-bold text-gray-500 leading-tight group-hover:text-purple-500 transition-colors uppercase tracking-[0.2em]">
              PRESENTS<br />
              <span className="text-gray-900 group-hover:text-purple-500 text-[8px] md:text-[10px]">GLOBAL TALENT HUNT 2026</span>
            </div>
          </Link>
          
          <MotionButton 
            onClick={() => navigate('/register')}
            label="REGISTER NOW"
          />
        </header>

        {/* MAIN CONTENT */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-8 lg:px-16 w-full max-w-7xl mx-auto mt-4 md:mt-0">
          <div className="relative max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delayBase, ease: [0.16, 1, 0.3, 1] }}
              className="font-futuristic font-bold text-6xl md:text-[9vh] lg:text-[11vh] leading-[0.9] tracking-tighter text-[#1e2335]"
            >
              GLOBAL<br />
              <span className="text-gradient-purple-orange pr-2 pb-2 inline-block">TALENT</span><br />
              HUNT <span className="font-light text-gray-400 ml-1 md:ml-2">2026</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delayBase + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-xs md:text-base lg:text-lg font-semibold tracking-[0.1em] md:tracking-[0.2em] text-gray-600"
            >
              SHOWCASE. COMPETE. GET <span className="text-purple-600">DISCOVERED.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delayBase + 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 relative z-20"
            >
              <div className="flex items-center gap-4 md:gap-5 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl md:rounded-3xl pr-6 md:pr-8 shadow-sm">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-[2px] shrink-0">
                  <div className="w-full h-full bg-white/80 rounded-[14px] md:rounded-[22px] flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-6 h-6 md:w-10 md:h-10 text-purple-600" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="py-2">
                  <p className="text-[10px] md:text-sm font-semibold tracking-wider text-gray-500 uppercase">FIRST PRIZE</p>
                  <h2 className="text-3xl md:text-5xl font-bold font-futuristic text-[#1e2335] leading-none mt-1 flex items-baseline gap-3">
                    {currency === 'INR' ? '₹50,00,000' : '$10,000'}
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
            </motion.div>
          </div>
        </main>

        {/* BOTTOM SECTION */}
        <motion.footer 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delayBase + 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 px-8 lg:px-16 pb-6 shrink-0 w-full max-w-7xl mx-auto flex flex-col gap-4 mt-6 sm:mt-0"
        >
          
          {/* Powered By - Static */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm flex flex-col overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wider mb-6 ml-2 uppercase text-center md:text-left">POWERED BY</p>
            <div className="grid grid-cols-5 md:flex md:flex-nowrap justify-items-center md:justify-between items-center gap-y-6 gap-x-2 md:gap-2 lg:gap-4 w-full px-1 md:px-0">
              {PARTNERS.map((src, i) => {
                let scaleClass = '';
                if (src.includes('TingoAI')) scaleClass = 'scale-75';
                if (src.includes('AWS')) scaleClass = 'scale-[1.1]';
                
                return (
                  <div key={i} className="h-8 sm:h-10 md:h-10 lg:h-12 flex items-center justify-center shrink-0 md:shrink w-full">
                    <img src={src} alt="Partner Logo" className={`h-full w-auto max-w-full md:max-w-[100px] lg:max-w-[140px] object-contain mix-blend-multiply ${scaleClass}`} />
                  </div>
                );
              })}
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
        </motion.footer>
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
