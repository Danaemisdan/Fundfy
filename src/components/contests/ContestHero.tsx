import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MotionButton } from '../ui/MotionButton';

export default function ContestHero({ data, theme, onRegisterClick }: { data: any, theme: any, onRegisterClick: () => void }) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 pt-10 md:pt-20 pb-16 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
      
      {/* Background Abstract Blob (using accent colors) */}
      <div className={`absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-gradient-to-br ${theme.accentGradient} opacity-[0.03] blur-3xl -z-10`} />
      
      {/* Left Content */}
      <div className="relative z-10 w-full md:w-[60%] flex flex-col items-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`px-4 py-1.5 rounded-full ${theme.glassEffect} backdrop-blur-md shadow-sm border mb-6 inline-flex items-center gap-2`}
        >
          <div className={`w-2 h-2 rounded-full bg-${theme.primaryAccent} animate-pulse`} />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-700 uppercase">{data.badge}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-futuristic font-bold text-6xl md:text-[8vh] lg:text-[10vh] leading-[0.9] tracking-tighter text-[#1e2335] uppercase"
        >
          {data.title}<br/>
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient} pr-2 pb-2 inline-block`}>
            {data.titleHighlight}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm md:text-lg font-semibold tracking-[0.1em] text-gray-500 max-w-md"
        >
          {data.tagline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MotionButton 
            onClick={onRegisterClick}
            label="REGISTER NOW"
          />
        </motion.div>
      </div>

      {/* Right Content - Floating Prize Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        className="relative z-10 w-full md:w-[40%] flex justify-end"
      >
        <div className={`${theme.glassEffect} backdrop-blur-xl border p-8 md:p-10 rounded-[2rem] shadow-2xl flex flex-col items-start w-full max-w-sm rotate-2 hover:rotate-0 transition-transform duration-500 group`}>
          <p className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">Status</p>
          <h2 className="text-4xl md:text-5xl font-futuristic font-bold text-[#1e2335] leading-none tracking-tighter">
            {typeof data.prizeHighlight === 'string' ? data.prizeHighlight : data.prizeHighlight?.value || 'Registration Open'}
          </h2>
          <div className="mt-8 w-full h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${theme.accentGradient} w-0 group-hover:w-full transition-all duration-1000 ease-out`} />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
