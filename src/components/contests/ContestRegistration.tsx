import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MotionButton } from '../ui/MotionButton';

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

          <MotionButton 
            onClick={onRegisterClick}
            label="REGISTER NOW"
          />
          <span className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.3em] mt-3 uppercase">Official Form</span>
        </div>
      </motion.div>
    </section>
  );
}
