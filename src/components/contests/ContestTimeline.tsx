import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContestTimeline({ data, theme }: { data: any, theme: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-16 py-24 md:py-32" ref={containerRef}>
      
      <div className="text-center mb-20">
        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
          {data.title}
        </h2>
      </div>

      <div className="relative w-full">
        {/* Center Line Background */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 md:-translate-x-1/2" />
        
        {/* Animated Center Line */}
        <motion.div 
          className={`absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b ${theme.accentGradient} md:-translate-x-1/2 origin-top`}
          style={{ height: lineHeight }}
        />

        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
          {data.steps.map((step: any, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase text-${theme.primaryAccent} mb-1 block`}>
                      {step.date}
                    </span>
                    <h3 className="text-2xl font-futuristic font-bold text-[#1e2335] leading-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Node */}
                <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-6 h-6 mt-1 md:mt-0">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className={`w-3 h-3 rounded-full bg-white border-2 border-${theme.primaryAccent} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                  />
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
