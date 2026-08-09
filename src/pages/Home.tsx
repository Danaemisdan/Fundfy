import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MotionButton } from '../components/ui/MotionButton';
import { Globe as GlobeIcon, ArrowUpRight, Trophy, Globe2, UserCheck, Gift, Rocket } from 'lucide-react';
import Globe from '../components/ui/globe';
import ContestShowcase from '../components/home/ContestShowcase';
const PARTNERS = [
  "/Partners/AWS_v2.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "/Partners/Epic_Games_logo.svg.webp",
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
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contest');
  const refCode = searchParams.get('ref');
  useEffect(() => {
    const trackClick = async () => {
      if (refCode) {
        // Prevent double tracking in same session
        if (sessionStorage.getItem('tracked_ref_' + refCode)) return;
        
        try {
          // Increment click count via rpc if available, otherwise just try to get the profile and update it
          const { data: profile } = await supabase.from('profiles').select('id, clicks').eq('referral_code', refCode.toUpperCase()).single();
          if (profile) {
            await supabase.from('profiles').update({ clicks: (profile.clicks || 0) + 1 }).eq('id', profile.id);
            sessionStorage.setItem('tracked_ref_' + refCode, 'true');
          }
        } catch (e) {
          console.error("Error tracking click", e);
        }
      }
    };
    trackClick();
  }, [refCode]);

  const handleRegisterClick = () => {
    if (contestId) {
      navigate(`/contests/${contestId}${refCode ? `?ref=${refCode}` : ''}`);
    } else {
      const el = document.getElementById('contests');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/register');
      }
    }
  };
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
    <div className="w-full font-sans relative overflow-x-hidden bg-white">
      
      {/* ORIGINAL HOMEPAGE - 100vh EXACTLY AS IT WAS */}
      <div className="h-screen w-full bg-[#030303] animated-gradient-bg flex flex-col justify-between overflow-hidden relative rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-0" />
        
        <RightGlobe />

        {/* HEADER */}
        <header className="relative z-10 flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 pt-6 shrink-0">
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="flex items-center gap-1.5 md:gap-3 glass-card px-4 py-2 rounded-full">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-4 md:h-7 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform brightness-0 invert" />
              <span className="text-white/30 font-light hidden md:block">|</span>
              <img src="/Partners/Brandforyoufull.png" alt="BrandForYou" className="h-5 md:h-9 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform brightness-0 invert" />
            </div>
            <div className="w-[1px] h-6 bg-white/30 hidden md:block opacity-50 ml-1"></div>
            <div className="hidden md:block text-[7px] md:text-[9px] font-bold text-gray-400 leading-tight group-hover:text-purple-400 transition-colors uppercase tracking-[0.2em]">
              PRESENTS<br />
              <span className="text-white group-hover:text-purple-400 text-[8px] md:text-[10px]">GLOBAL TALENT HUNT 2026</span>
            </div>
          </Link>
          
          <MotionButton 
            onClick={handleRegisterClick}
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
              className="font-futuristic font-bold text-6xl md:text-[9vh] lg:text-[11vh] leading-[0.9] tracking-tighter text-white"
            >
              GLOBAL<br />
              <span className="text-gradient-purple-orange pr-2 pb-2 inline-block">TALENT</span><br />
              HUNT <span className="font-light text-white/50 ml-1 md:ml-2">2026</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delayBase + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-xs md:text-base lg:text-lg font-semibold tracking-[0.1em] md:tracking-[0.2em] text-white/70"
            >
              SHOWCASE. COMPETE. GET <span className="text-purple-400">DISCOVERED.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delayBase + 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 relative z-20"
            >
              <div className="flex items-center gap-4 md:gap-5 glass-panel rounded-2xl md:rounded-3xl pr-6 md:pr-8">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/10 p-[2px] shrink-0 border border-white/20">
                  <div className="w-full h-full bg-black/20 rounded-[14px] md:rounded-[22px] flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-6 h-6 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="py-2">
                  <p className="text-[10px] md:text-sm font-semibold tracking-wider text-white/50 uppercase">PRIZE POOL</p>
                  <h2 className="text-3xl md:text-5xl font-bold font-futuristic text-white leading-none mt-1 flex items-baseline gap-3">
                    {currency === 'INR' ? '₹50 Lakhs' : '$10,000'}
                  </h2>
                </div>
              </div>
              
              {/* AWS Credits Pill */}
              <div className="sm:ml-2 flex items-center gap-2 md:gap-3 glass-panel rounded-full pr-3 md:pr-4 pl-1.5 py-1">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden bg-white/10 rounded-full">
                  <img src="/Partners/AWS.webp" alt="AWS" className="w-[80%] h-[80%] object-contain brightness-0 invert" />
                </div>
                <p className="text-[10px] md:text-xs font-bold text-white/90 tracking-wide mt-0.5">
                  GIVING AWAY <span className="text-orange-400 text-[11px] md:text-sm">$5,000</span> IN CREDITS
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
          <div className="w-full glass-panel border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm flex flex-col overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-white/50 tracking-wider mb-6 ml-2 uppercase text-center md:text-left">POWERED BY</p>
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-y-6 gap-x-4 md:gap-x-3 lg:gap-x-5 w-full px-2 md:px-0 opacity-80">
              {PARTNERS.map((src, i) => {
                let scaleClass = '';
                if (src.includes('TingoAI')) scaleClass = 'scale-75';
                if (src.includes('AWS')) scaleClass = 'scale-110';
                if (src.includes('IBM')) scaleClass = 'scale-75';
                if (src.includes('BrandForYou')) scaleClass = 'scale-125';
                
                return (
                  <div key={i} className="h-6 sm:h-7 md:h-8 lg:h-9 flex items-center justify-center shrink-0">
                    <img src={src} alt="Partner Logo" className={`h-full w-auto max-w-[80px] md:max-w-[80px] lg:max-w-[95px] object-contain brightness-0 invert ${scaleClass}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-between gap-y-6 gap-x-4 p-4 md:p-6 lg:px-8 glass-card rounded-2xl relative z-20">
            <Feature icon={<Globe2 className="text-purple-400" />} title="GLOBAL EXPOSURE" desc="Get seen by industry leaders worldwide." />
            <Feature icon={<UserCheck className="text-purple-400" />} title="EXPERT MENTORSHIP" desc="Learn and grow with the best." />
            <Feature icon={<Gift className="text-purple-400" />} title="AMAZING REWARDS" desc="Win cash prizes and exciting perks." />
            <Feature icon={<Rocket className="text-purple-400" />} title="CAREER BOOST" desc="Opportunities that take you further." />
          </div>

          {/* Bottom Pill */}
          <div className="w-full bg-[#11131c] rounded-full py-3 md:py-4 flex items-center justify-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/90 uppercase overflow-hidden relative">
            <span>TALENT HAS NO BOUNDARIES.</span>
            <span className="text-purple-400">THIS IS YOUR STAGE.</span>
          </div>
        </motion.footer>
      </div>

      {/* CONTESTS SHOWCASE (Scroll down) */}
      <div id="contests" className="relative z-10 w-full bg-white">
        <ContestShowcase />
      </div>

    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-100">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' } as any)}
      </div>
      <div>
        <h3 className="text-xs font-bold text-white tracking-wider">{title}</h3>
        <p className="text-[10px] text-white/50 mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default Home;
