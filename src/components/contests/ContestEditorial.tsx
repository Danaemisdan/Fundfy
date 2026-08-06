import React from 'react';
import { motion } from 'framer-motion';

export default function ContestEditorial({ data, theme }: { data: any, theme: any }) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Left Side: Giant Chapter Number */}
        <div className="md:col-span-4 flex md:block justify-start relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[12rem] md:text-[18rem] font-futuristic font-bold text-gray-100 leading-none tracking-tighter select-none -mt-10 md:-mt-20"
          >
            {data.chapterNumber}
          </motion.div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="md:col-span-8 relative z-10 md:pt-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-futuristic font-bold text-[#1e2335] leading-tight tracking-tight max-w-2xl mb-10"
          >
            {data.title}
          </motion.h2>

          <div className="space-y-6 text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mb-16">
            {data.paragraphs.map((p: string, i: number) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">Why You Should Participate</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {data.reasons.map((reason: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${theme.primaryAccent}`} />
                  <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
