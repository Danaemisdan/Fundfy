import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MotionButton } from '../components/ui/MotionButton';
import { Globe as GlobeIcon, ArrowUpRight, Trophy, Globe2, UserCheck, Gift, Rocket, Wallet } from 'lucide-react';
import Globe from '../components/ui/globe';
import ContestShowcase from '../components/home/ContestShowcase';
import HomeContestDetails from '../components/home/HomeContestDetails';
import Footer from '../components/layout/Footer';

// Added for single page flow
import { getContestConfig } from '../data/contests';
import EventHero from '../components/contests/EventHero';
import EventAbout from '../components/contests/EventAbout';
import EventWhyParticipate from '../components/contests/EventWhyParticipate';
import EventResources from '../components/contests/EventResources';
import RegistrationSection from '../components/RegistrationSection';
const PARTNERS = [
  "/Partners/AWS_v2.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "/Partners/TechMahindra.png",
  "/Partners/Foxconn.svg",
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

  // Load config for Career Accelerator Program
  const config = getContestConfig('career-accelerator-program');
  useEffect(() => {
    // Tracking is handled globally by App.tsx
  }, [refCode]);

  const handleRegisterClick = () => {
    const el = document.getElementById('registration-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const delayBase = !sessionStorage.getItem('hasSeenSplash') ? 6.2 : 0;

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

  useEffect(() => {
    sessionStorage.setItem('hasVisitedHome', 'true');
    // Handle hash navigation
    if (window.location.hash === '#registration-section') {
      setTimeout(() => {
        const el = document.getElementById('registration-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Wait for render
    }
  }, []);

  return (
    <div className="w-full font-sans relative overflow-x-hidden bg-white">
      
      {/* ORIGINAL HOMEPAGE - 100vh EXACTLY AS IT WAS */}
      <div className="min-h-screen w-full bg-[#030303] animated-gradient-bg flex flex-col justify-between overflow-hidden relative z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-0" />
        

        <RightGlobe />

        {/* HEADER */}
        <header className="relative z-10 flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 pt-6 shrink-0">
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="flex items-center gap-1.5 md:gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <img src="/Partners/Fundfy.app.png" alt="Fundfy" className="h-4 md:h-7 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
              <span className="text-gray-400 font-medium text-xs md:text-sm">×</span>
              <img src="/Partners/Brandforyoufull.png" alt="Brand for you" className="h-4 md:h-7 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
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
              className="mt-10 mb-6 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 relative z-20"
            >
              <div className="flex items-center gap-3 md:gap-4 glass-panel rounded-full pr-6 md:pr-8 pl-2 py-2 border border-white/10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 p-[2px] shrink-0 border border-white/20">
                  <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Wallet className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex flex-col justify-center mt-0.5">
                  <p className="text-xs md:text-sm font-bold tracking-[0.15em] text-purple-400 uppercase mb-1">FUNDING TO FUEL YOUR STARTUP</p>
                  <h2 className="text-5xl md:text-6xl font-black font-futuristic text-white leading-none">
                    ₹50 Lakhs
                  </h2>
                </div>
              </div>
              
              {/* AWS Credits Pill */}
              <div className="flex items-center gap-3 md:gap-4 glass-panel rounded-full pr-5 md:pr-6 pl-2 py-2 border border-white/10">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden bg-white rounded-full shadow-inner shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-[75%] h-[75%] object-contain mt-1" />
                </div>
                <p className="text-[10px] md:text-xs font-bold text-white/90 tracking-wide mt-0.5">
                  GIVING AWAY <span className="text-orange-400 text-[11px] md:text-sm">₹5 Lakhs</span> IN CREDITS
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
          <div className="w-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl flex flex-col overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-black/50 tracking-wider mb-6 ml-2 uppercase text-center md:text-left">POWERED BY</p>
            <div className="flex flex-nowrap justify-between items-center gap-x-3 md:gap-x-4 lg:gap-x-5 w-full overflow-x-auto no-scrollbar px-2 md:px-0 pb-2">
              {PARTNERS.map((src, i) => {
                let scaleClass = '';
                if (src.includes('TingoAI')) scaleClass = 'scale-90';
                if (src.includes('AWS')) scaleClass = 'scale-[1.3]';
                if (src.includes('IBM')) scaleClass = 'scale-[0.65]';
                if (src.includes('TechMahindra')) scaleClass = 'scale-[1.5]';
                
                return (
                  <div key={i} className="h-4 sm:h-5 md:h-6 lg:h-7 flex items-center justify-center shrink-0">
                    <img src={src} alt="Partner Logo" className={`h-full w-auto max-w-[70px] md:max-w-[90px] lg:max-w-[110px] object-contain ${scaleClass}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-between gap-y-6 gap-x-4 p-4 md:p-6 lg:px-8 glass-card rounded-2xl relative z-20 items-center">
            <Feature icon={<Globe2 className="text-purple-400" />} title="GLOBAL EXPOSURE" desc="Get seen by industry leaders worldwide." />
            <Feature icon={<UserCheck className="text-purple-400" />} title="EXPERT MENTORSHIP" desc="Learn and grow with the best." />
            
            {/* The 5th Important Item */}
            <Feature 
              className="col-span-2 md:col-auto" 
              titleClassName="text-emerald-400 font-bold"
              iconWrapperClass="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              icon={<Trophy className="text-emerald-400" />} 
              title="EVERY PARTICIPANT GETS" 
              desc="Assured internships, interviews & lifetime tools." 
            />

            <Feature icon={<Gift className="text-purple-400" />} title="AMAZING REWARDS" desc="Win cash prizes and exciting perks." />
            <Feature icon={<Rocket className="text-purple-400" />} title="CAREER BOOST" desc="Opportunities that take you further." />
          </div>
        </motion.footer>
      </div>

      {/* Career Accelerator Program Content */}
      {config && (
        <main className="w-full relative z-10 flex flex-col bg-[#050505]">
          <EventHero data={config} theme={config.theme} onRegisterClick={handleRegisterClick} />
          <EventAbout data={config} />
          {config.whyParticipate && config.whyParticipate.length > 0 && (
            <EventWhyParticipate data={config} />
          )}
          {config.resources && config.resources.length > 0 && (
            <EventResources data={config} />
          )}
        </main>
      )}


      {/* Roadmap + Prize Pool — always shown */}
      <div className="relative z-10 w-full">
        <HomeContestDetails contestId={contestId} />
      </div>



      {/* Registration Section */}
      <RegistrationSection id="registration-section" />

      <Footer />
    </div>
  );
}

function Feature({ icon, title, desc, className = '', titleClassName = 'text-white', iconWrapperClass = 'bg-white/10 border-white/20 text-gray-100' }: { icon: React.ReactNode, title: string, desc: string, className?: string, titleClassName?: string, iconWrapperClass?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${iconWrapperClass}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' } as any)}
      </div>
      <div>
        <h3 className={`text-xs font-bold tracking-wider ${titleClassName}`}>{title}</h3>
        <p className="text-[10px] text-white/50 mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default Home;
