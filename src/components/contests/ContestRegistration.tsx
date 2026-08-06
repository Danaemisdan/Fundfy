import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ContestRegistration({ data, theme, onRegisterClick }: { data: any, theme: any, onRegisterClick: () => void }) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-[3rem] overflow-hidden bg-[#11131c] text-white p-12 md:p-24 flex flex-col items-center text-center shadow-2xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.accentGradient} opacity-20`} />
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-futuristic font-bold leading-tight tracking-tighter mb-6">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-12">
            {data.subtitle}
          </p>

          <button 
            onClick={onRegisterClick}
            className="flex flex-col items-center justify-center px-10 py-5 rounded-full bg-white text-[#11131c] shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.accentGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="flex items-center gap-2 relative z-10">
              <span className="font-bold tracking-[0.2em] text-sm md:text-base uppercase">REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-[#11131c] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            
            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.3em] relative z-10 mt-1 uppercase">Official Form</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
