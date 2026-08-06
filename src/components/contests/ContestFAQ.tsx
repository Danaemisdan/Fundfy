import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContestFAQ({ data, theme }: { data: any, theme: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-16 py-20 md:py-32">
      
      <div className="text-center mb-16">
        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">
          {data.title}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {data.faqs.map((faq: any, idx: number) => {
          const isActive = activeIndex === idx;
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`border border-gray-200 rounded-3xl overflow-hidden transition-colors duration-300 ${isActive ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-white/50'}`}
            >
              <button 
                onClick={() => setActiveIndex(isActive ? null : idx)}
                className="w-full px-6 md:px-8 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className={`text-base md:text-lg font-bold text-left transition-colors duration-300 ${isActive ? `text-${theme.primaryAccent}` : 'text-[#1e2335]'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 bg-gray-50' : ''}`}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 text-gray-600 font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
