import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventFAQ({ data }: { data: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-32 md:py-48 relative z-20">
      <div className="max-w-4xl mx-auto px-6 md:px-16 flex flex-col items-center">
        
        <div className="mb-24 w-full">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-black tracking-tight text-center">
            FAQ
          </h2>
        </div>

        <div className="w-full flex flex-col border-t border-gray-200">
          {data.faqs.map((faq: any, idx: number) => {
            const isActive = activeIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-200">
                <button 
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                  className="w-full py-8 flex items-center justify-between focus:outline-none text-left group"
                >
                  <span className={`text-xl md:text-2xl font-sans font-bold transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
                    {faq.q}
                  </span>
                  <div className={`ml-6 shrink-0 transition-transform duration-500 ease-[0.16,1,0.3,1] ${isActive ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-lg text-gray-500 font-medium pr-12">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
