import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [phase, setPhase] = useState(() => {
    return sessionStorage.getItem('hasSeenSplash') ? 3 : 0;
  });

  useEffect(() => {
    if (phase === 3) return;
    const t1 = setTimeout(() => setPhase(1), 300); // 0.3s
    const t2 = setTimeout(() => setPhase(2), 3500); // 3.5s
    const t3 = setTimeout(() => {
      setPhase(3);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 6000); // 6.0s
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  if (phase === 3) return null;

  return (
    <AnimatePresence>
      {phase !== 3 && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#f8f9fc] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          <AnimatePresence mode="wait">
            
            {/* Phase 1: Partners */}
            {phase === 1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, filter: 'blur(15px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full px-6 gap-24 relative z-10"
              >
                {/* Co-Presented By */}
                <div className="flex flex-col items-center gap-10 w-full">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs md:text-sm font-bold tracking-[0.4em] text-gray-400 uppercase"
                  >
                    CO-PRESENTED BY
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-y-12 gap-x-10 place-items-center md:flex md:items-center md:justify-center md:gap-12 lg:gap-16 w-full max-w-4xl"
                  >
                    <img src="/Partners/AWS_v2.png" alt="AWS" className="h-16 sm:h-20 md:h-20 lg:h-24 object-contain mix-blend-multiply opacity-90" />
                    <div className="w-[1px] h-16 bg-gray-300 hidden md:block"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-16 sm:h-20 md:h-20 lg:h-24 object-contain mix-blend-multiply opacity-90" />
                    <div className="w-[1px] h-16 bg-gray-300 hidden md:block"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-10 sm:h-14 md:h-16 lg:h-20 object-contain mix-blend-multiply opacity-90" />
                    <div className="w-[1px] h-16 bg-gray-300 hidden md:block"></div>
                    <img src="/Partners/Epic_Games_logo.svg.webp" alt="Epic Games" className="h-20 sm:h-24 md:h-24 lg:h-28 object-contain mix-blend-multiply opacity-90" />
                  </motion.div>
                </div>

                {/* Hosted By */}
                <div className="flex flex-col items-center gap-8 w-full">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xs md:text-sm font-bold tracking-[0.4em] text-gray-400 uppercase"
                  >
                    HOSTED BY
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    className="grid grid-cols-2 gap-y-12 gap-x-10 place-items-center md:flex md:flex-wrap md:items-center md:justify-center md:gap-16 max-w-5xl"
                  >
                    <img src="/Partners/Fundfy.png" alt="Fundfy" className="h-10 sm:h-14 md:h-14 lg:h-16 object-contain mix-blend-multiply opacity-90" />
                    <img src="/Partners/JobFinderAI.png?v=3" alt="JobFinderAI" className="h-10 sm:h-14 md:h-14 lg:h-16 object-contain mix-blend-multiply opacity-80" />
                    <img src="/Partners/DiceArtFilms_v2.png" alt="Dice Art Films" className="h-10 sm:h-14 md:h-14 lg:h-16 object-contain mix-blend-multiply opacity-80" />
                    <img src="/Partners/BrandForYou.png" alt="BrandForYou" className="h-10 sm:h-14 md:h-14 lg:h-16 object-contain opacity-80" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Title */}
            {phase === 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-full px-6 text-center relative z-10"
              >
                <h1 className="font-futuristic font-bold text-6xl md:text-[9vh] lg:text-[12vh] leading-[0.9] tracking-tighter text-[#1e2335]">
                  GLOBAL<br />
                  <span className="text-gradient-purple-orange pr-2 pb-2 inline-block">TALENT</span><br />
                  HUNT <span className="font-light text-gray-400 ml-1 md:ml-2">2026</span>
                </h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-xs md:text-base lg:text-xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-gray-500 uppercase"
                >
                  SHOWCASE. COMPETE. GET <span className="text-purple-600">DISCOVERED.</span>
                </motion.p>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-orange-100/40 blur-[100px] pointer-events-none rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
