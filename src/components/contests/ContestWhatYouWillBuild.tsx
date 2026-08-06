import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContestWhatYouWillBuild({ data, theme }: { data: any, theme: any }) {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-20 md:py-32">
      
      {/* Background Graphic */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${theme.accentGradient} opacity-[0.04] blur-3xl -z-10`} />

      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Rotated Text Graphic */}
        <div className="hidden md:flex w-24 justify-center items-center h-full relative z-10">
          <motion.div 
            style={{ y: yPos }}
            className="whitespace-nowrap -rotate-90 origin-center text-[8rem] font-futuristic font-bold text-gray-100 tracking-tighter select-none mix-blend-multiply"
          >
            {data.visualText}
          </motion.div>
        </div>

        {/* Right Side: Immersive Glass Panel */}
        <div className="w-full flex-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`w-full ${theme.glassEffect} backdrop-blur-2xl border p-10 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-white/40 z-0" />
            
            <div className="relative z-10 flex flex-col items-start">
              <h3 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
                {data.title}
              </h3>
              
              <h2 className="text-2xl md:text-4xl font-sans font-semibold text-[#1e2335] leading-snug tracking-tight max-w-xl">
                {data.description}
              </h2>
            </div>

            {/* Abstract Graphic representing the build */}
            <div className="mt-12 w-full h-[200px] md:h-[300px] bg-gray-900/5 rounded-2xl border border-white/50 relative overflow-hidden flex items-center justify-center">
              {/* Animated rings */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className={`w-[400px] h-[400px] rounded-full border border-${theme.primaryAccent}/20 border-dashed absolute`}
              />
              <motion.div 
                animate={{ rotate: -360 }} 
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className={`w-[300px] h-[300px] rounded-full border border-${theme.secondaryAccent}/20 border-dotted absolute`}
              />
              <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${theme.accentGradient} opacity-20 blur-xl animate-pulse`} />
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.accentGradient} shadow-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700`}>
                <span className="text-white font-futuristic font-bold text-2xl">AI</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
